const aiConfig = require("../../config/aiConfig");
const GeminiProvider = require("./providers/geminiProvider");
const { buildSystemPrompt } = require("./systemPrompt");
const toolRegistry = require("./tools");
const AIProviderError = require("./AIProviderError");
const logger = require("../../utils/logger");

// A tool-calling round trip is: model asks for a tool -> we run it -> model
// gets the result -> model may ask for another tool. Cap the loop so a
// confused model can't spin forever (and rack up API cost) on one request.
const MAX_TOOL_ITERATIONS = 4;

// Client-sent history is untrusted input size-wise — cap how much of it we
// forward to Gemini regardless of what the frontend sends.
const MAX_HISTORY_MESSAGES = 20;

let cachedProvider = null;

// Lazily built (and memoized) so importing this module never throws when
// GEMINI_API_KEY isn't set — the rest of the backend must keep working.
function getDefaultProvider() {
  if (!aiConfig.isEnabled) return null;
  if (!cachedProvider) {
    cachedProvider = new GeminiProvider({
      apiKey: aiConfig.apiKey,
      model: aiConfig.model,
      temperature: aiConfig.temperature,
      maxOutputTokens: aiConfig.maxOutputTokens,
    });
  }
  return cachedProvider;
}

function toGeminiRole(role) {
  return role === "assistant" || role === "model" ? "model" : "user";
}

function buildContents(history, message) {
  const trimmedHistory = (history || []).slice(-MAX_HISTORY_MESSAGES);
  const historyContents = trimmedHistory
    .filter((turn) => turn && typeof turn.content === "string" && turn.content.trim())
    .map((turn) => ({ role: toGeminiRole(turn.role), parts: [{ text: turn.content }] }));

  return [...historyContents, { role: "user", parts: [{ text: message }] }];
}

function friendlyErrorMessage(error) {
  if (error instanceof AIProviderError) {
    switch (error.category) {
      case AIProviderError.CATEGORIES.RATE_LIMIT:
        return "I'm getting a lot of requests right now — please try again in a moment.";
      case AIProviderError.CATEGORIES.AUTH:
        logger.error("Gemini auth error — check that GEMINI_API_KEY is valid.");
        return "The AI assistant is temporarily unavailable. Please try again later.";
      case AIProviderError.CATEGORIES.NETWORK:
        return "I'm having trouble connecting right now. Please try again shortly.";
      default:
        return "Something went wrong while processing that. Please try again.";
    }
  }
  logger.error(`Unexpected AI agent error: ${error.stack || error.message}`);
  return "Something went wrong while processing that. Please try again.";
}

/**
 * @param {object} params
 * @param {string} params.message - the user's new message
 * @param {Array<{role: string, content: string}>} [params.history] - prior turns, client-supplied
 * @param {object} [params.user] - the authenticated User document, or undefined for a guest
 * @param {object} [params.provider] - injectable AIProvider, for tests. Defaults to the Gemini provider.
 */
async function chat({ message, history, user, provider } = {}) {
  const activeProvider = provider || getDefaultProvider();

  if (!activeProvider) {
    return {
      message: "The AI assistant isn't configured yet. Please try again later.",
      results: [],
    };
  }

  const contents = buildContents(history, message);
  const systemInstruction = buildSystemPrompt({ user });
  const collectedResults = [];

  for (let iteration = 0; iteration < MAX_TOOL_ITERATIONS; iteration += 1) {
    let response;
    try {
      // eslint-disable-next-line no-await-in-loop
      response = await activeProvider.generate({
        systemInstruction,
        contents,
        tools: toolRegistry.definitions,
      });
    } catch (error) {
      return { message: friendlyErrorMessage(error), results: collectedResults };
    }

    if (!response.functionCalls.length) {
      return {
        message: response.text || "I'm not sure how to help with that — could you rephrase?",
        results: collectedResults,
      };
    }

    contents.push({
      role: "model",
      parts: response.parts || response.functionCalls.map((call) => ({
        functionCall: { name: call.name, args: call.args },
      })),
    });

    const responseParts = [];
    for (const call of response.functionCalls) {
      // eslint-disable-next-line no-await-in-loop
      const result = await toolRegistry.execute(call.name, call.args, { user });
      if (result.publicResults?.length) collectedResults.push(...result.publicResults);
      responseParts.push({
        functionResponse: { id: call.id, name: call.name, response: result.forModel },
      });
    }

    contents.push({ role: "user", parts: responseParts });
  }

  return {
    message: "That request needed more steps than I can safely take at once — could you narrow it down?",
    results: collectedResults,
  };
}

module.exports = { chat };
