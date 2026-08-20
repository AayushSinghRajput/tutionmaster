const { GoogleGenAI, ApiError } = require("@google/genai");
const AIProvider = require("./AIProvider");
const AIProviderError = require("../AIProviderError");
const logger = require("../../../utils/logger");

// Maps Gemini's HTTP status codes to our normalized error categories so the
// agent/controller can react consistently (friendly message, retry, etc.)
// without knowing anything Gemini-specific.
function categorizeStatus(status) {
  if (status === 429) return AIProviderError.CATEGORIES.RATE_LIMIT;
  if (status === 401 || status === 403) return AIProviderError.CATEGORIES.AUTH;
  if (status === 400) return AIProviderError.CATEGORIES.INVALID_REQUEST;
  if (status >= 500) return AIProviderError.CATEGORIES.NETWORK;
  return AIProviderError.CATEGORIES.UNKNOWN;
}

function toProviderError(error) {
  if (error instanceof ApiError) {
    return new AIProviderError(
      `Gemini API error (${error.status}): ${error.message}`,
      categorizeStatus(error.status),
      error,
    );
  }

  // Network-level failures (DNS, timeout, connection reset) surface as plain
  // Node/fetch errors rather than ApiError instances.
  if (error?.code === "ETIMEDOUT" || error?.code === "ECONNRESET" || error?.name === "AbortError") {
    return new AIProviderError("Network error contacting Gemini API", AIProviderError.CATEGORIES.NETWORK, error);
  }

  return new AIProviderError(error?.message || "Unknown Gemini API error", AIProviderError.CATEGORIES.UNKNOWN, error);
}

class GeminiProvider extends AIProvider {
  constructor({ apiKey, model, temperature, maxOutputTokens }) {
    super();
    if (!apiKey) {
      throw new Error("GeminiProvider requires an apiKey");
    }
    this.model = model;
    this.temperature = temperature;
    this.maxOutputTokens = maxOutputTokens;
    this.client = new GoogleGenAI({ apiKey });
  }

  async generate({ systemInstruction, contents, tools }) {
    try {
      const response = await this.client.models.generateContent({
        model: this.model,
        contents,
        config: {
          systemInstruction,
          temperature: this.temperature,
          maxOutputTokens: this.maxOutputTokens,
          tools: tools?.length ? [{ functionDeclarations: tools }] : undefined,
        },
      });

      const functionCalls = (response.functionCalls || []).map((call) => ({
        name: call.name,
        args: call.args || {},
        id: call.id,
      }));

      const parts = response.candidates?.[0]?.content?.parts || [];

      return {
        text: functionCalls.length ? null : response.text || null,
        functionCalls,
        parts,
        usage: response.usageMetadata || null,
      };
    } catch (error) {
      const providerError = toProviderError(error);
      logger.error(`Gemini API call failed [${providerError.category}]: ${providerError.message}`);
      throw providerError;
    }
  }
}

module.exports = GeminiProvider;
