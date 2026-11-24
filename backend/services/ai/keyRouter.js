const LLMKey = require("../../models/LLMKey");
const { decrypt } = require("../../utils/cryptoUtils");
const GeminiProvider = require("./providers/geminiProvider");
const OpenAICompatibleProvider = require("./providers/openAICompatibleProvider");
const ClaudeProvider = require("./providers/claudeProvider");
const AIProviderError = require("./AIProviderError");
const aiConfig = require("../../config/aiConfig");
const logger = require("../../utils/logger");

const CACHE_TTL_MS = 30 * 1000; // 30 seconds
let cachedEntries = null;
let lastCacheUpdate = 0;
let roundRobinCounters = {};

/**
 * Instantiate an AIProvider for a specific LLM key configuration.
 */
function createProviderInstance({ provider, apiKey, model, baseUrl, temperature, maxOutputTokens }) {
  switch (provider) {
    case "gemini":
      return new GeminiProvider({
        apiKey,
        model,
        temperature,
        maxOutputTokens,
      });

    case "openai":
    case "deepseek":
    case "groq":
      return new OpenAICompatibleProvider({
        apiKey,
        model,
        baseURL: baseUrl || undefined,
        temperature,
        maxOutputTokens,
        providerType: provider,
      });

    case "claude":
      return new ClaudeProvider({
        apiKey,
        model,
        baseURL: baseUrl || undefined,
        temperature,
        maxOutputTokens,
      });

    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}

/**
 * Refresh the in-memory pool of active keys from MongoDB.
 */
async function refreshPool() {
  try {
    const keys = await LLMKey.find({ isActive: true })
      .select("+encryptedKey")
      .sort({ priority: 1, weight: -1, createdAt: 1 })
      .lean();

    const pool = [];

    for (const keyDoc of keys) {
      try {
        const clearApiKey = decrypt(keyDoc.encryptedKey);
        const providerInstance = createProviderInstance({
          provider: keyDoc.provider,
          apiKey: clearApiKey,
          model: keyDoc.model,
          baseUrl: keyDoc.baseUrl,
        });

        pool.push({
          id: keyDoc._id.toString(),
          provider: keyDoc.provider,
          label: keyDoc.label,
          model: keyDoc.model,
          priority: keyDoc.priority || 1,
          weight: keyDoc.weight || 1,
          status: keyDoc.status,
          cooldownUntil: keyDoc.cooldownUntil ? new Date(keyDoc.cooldownUntil) : null,
          providerInstance,
          keyDoc,
        });
      } catch (err) {
        logger.error(`Failed to initialize LLM key "${keyDoc.label}" (${keyDoc.provider}): ${err.message}`);
      }
    }

    cachedEntries = pool;
    lastCacheUpdate = Date.now();
  } catch (err) {
    logger.error(`Error refreshing LLM key pool from database: ${err.message}`);
    // If DB fails and cache doesn't exist, initialize empty array
    if (!cachedEntries) cachedEntries = [];
  }
}

/**
 * Invalidate cache to force reload on next call (e.g. after admin updates).
 */
function invalidateCache() {
  cachedEntries = null;
  lastCacheUpdate = 0;
  roundRobinCounters = {};
}

/**
 * Get an active candidate provider instance according to priority and round-robin.
 * @param {Array<string>} excludeIds - IDs of keys that already failed in the current request turn.
 * @returns {Promise<{ id: string, provider: object, label: string, model: string, isEnvFallback?: boolean } | null>}
 */
async function getAvailableCandidate(excludeIds = []) {
  const now = Date.now();

  if (!cachedEntries || now - lastCacheUpdate > CACHE_TTL_MS) {
    await refreshPool();
  }

  // Filter keys that are active and not in cooldown and not excluded
  const validCandidates = (cachedEntries || []).filter((entry) => {
    if (excludeIds.includes(entry.id)) return false;
    if (entry.cooldownUntil && entry.cooldownUntil.getTime() > now) return false;
    if (entry.status === "invalid" || entry.status === "quota_exceeded") return false;
    return true;
  });

  if (validCandidates.length > 0) {
    // Find the minimum priority (highest precedence, e.g. 1)
    const minPriority = Math.min(...validCandidates.map((c) => c.priority));
    const topTierCandidates = validCandidates.filter((c) => c.priority === minPriority);

    // Round-robin selection among candidates with equal top priority
    const priorityKey = `p_${minPriority}`;
    roundRobinCounters[priorityKey] = (roundRobinCounters[priorityKey] || 0) % topTierCandidates.length;
    const selected = topTierCandidates[roundRobinCounters[priorityKey]];
    roundRobinCounters[priorityKey] += 1;

    return {
      id: selected.id,
      provider: selected.providerInstance,
      label: selected.label,
      model: selected.model,
      providerName: selected.provider,
    };
  }

  // Fallback to legacy environment variable (process.env.GEMINI_API_KEY) if configured
  if (aiConfig.isEnabled && !excludeIds.includes("env_gemini")) {
    const envProvider = new GeminiProvider({
      apiKey: aiConfig.apiKey,
      model: aiConfig.model,
      temperature: aiConfig.temperature,
      maxOutputTokens: aiConfig.maxOutputTokens,
    });

    return {
      id: "env_gemini",
      provider: envProvider,
      label: "Environment Gemini Key",
      model: aiConfig.model,
      providerName: "gemini",
      isEnvFallback: true,
    };
  }

  return null;
}

/**
 * Mark a successful execution for stats.
 */
async function recordSuccess(candidateId) {
  if (!candidateId || candidateId === "env_gemini") return;

  // Update in memory
  if (cachedEntries) {
    const entry = cachedEntries.find((e) => e.id === candidateId);
    if (entry) {
      entry.status = "active";
      entry.cooldownUntil = null;
    }
  }

  // Update in database asynchronously
  LLMKey.findByIdAndUpdate(candidateId, {
    $inc: { "stats.totalCalls": 1, "stats.successCalls": 1 },
    $set: {
      "stats.lastUsedAt": new Date(),
      "stats.lastSuccessAt": new Date(),
      status: "active",
      cooldownUntil: null,
    },
  }).catch((err) => logger.warn(`Failed to update LLMKey success stats: ${err.message}`));
}

/**
 * Record a failure and place the key in temporary cooldown so next calls skip it.
 */
async function recordFailure(candidateId, error) {
  if (!candidateId || candidateId === "env_gemini") return;

  const category = error?.category || AIProviderError.CATEGORIES.UNKNOWN;
  let cooldownMs = 60 * 1000; // default 60s for rate limit
  let newStatus = "rate_limited";

  if (category === AIProviderError.CATEGORIES.AUTH) {
    newStatus = "invalid";
    cooldownMs = 24 * 60 * 60 * 1000; // 24 hours until admin re-checks
  } else if (category === AIProviderError.CATEGORIES.NETWORK) {
    cooldownMs = 30 * 1000; // 30s
    newStatus = "error";
  }

  const cooldownUntil = new Date(Date.now() + cooldownMs);

  // Update in-memory entry immediately
  if (cachedEntries) {
    const entry = cachedEntries.find((e) => e.id === candidateId);
    if (entry) {
      entry.status = newStatus;
      entry.cooldownUntil = cooldownUntil;
    }
  }

  // Update in database asynchronously
  LLMKey.findByIdAndUpdate(candidateId, {
    $inc: { "stats.totalCalls": 1, "stats.failedCalls": 1 },
    $set: {
      "stats.lastUsedAt": new Date(),
      status: newStatus,
      cooldownUntil,
      "stats.lastError": {
        message: error?.message || "Unknown error",
        category,
        at: new Date(),
      },
    },
  }).catch((err) => logger.warn(`Failed to update LLMKey failure status: ${err.message}`));
}

/**
 * Isolated test helper for Admin UI to verify key validity without saving yet.
 */
async function testKeyConnection({ provider, apiKey, model, baseUrl }) {
  const startedAt = Date.now();
  try {
    const instance = createProviderInstance({
      provider,
      apiKey,
      model,
      baseUrl,
      maxOutputTokens: 50,
      temperature: 0.1,
    });

    const testResult = await instance.generate({
      systemInstruction: "You are a test ping bot. Respond with 'OK' and nothing else.",
      contents: [{ role: "user", parts: [{ text: "ping" }] }],
    });

    const latencyMs = Date.now() - startedAt;
    return {
      success: true,
      latencyMs,
      message: testResult.text || "Connected successfully",
    };
  } catch (error) {
    return {
      success: false,
      latencyMs: Date.now() - startedAt,
      error: error.message || "Failed to connect to provider",
      category: error.category || "UNKNOWN",
    };
  }
}

module.exports = {
  createProviderInstance,
  getAvailableCandidate,
  recordSuccess,
  recordFailure,
  invalidateCache,
  testKeyConnection,
};
