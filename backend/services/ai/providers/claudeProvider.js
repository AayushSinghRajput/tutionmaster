const Anthropic = require("@anthropic-ai/sdk");
const AIProvider = require("./AIProvider");
const AIProviderError = require("../AIProviderError");
const logger = require("../../../utils/logger");

function categorizeStatus(status) {
  if (status === 429) return AIProviderError.CATEGORIES.RATE_LIMIT;
  if (status === 401 || status === 403) return AIProviderError.CATEGORIES.AUTH;
  if (status === 400) return AIProviderError.CATEGORIES.INVALID_REQUEST;
  if (status >= 500) return AIProviderError.CATEGORIES.NETWORK;
  return AIProviderError.CATEGORIES.UNKNOWN;
}

function toProviderError(error) {
  if (error?.status) {
    return new AIProviderError(
      `Claude API error (${error.status}): ${error.message}`,
      categorizeStatus(error.status),
      error
    );
  }

  if (error?.code === "ETIMEDOUT" || error?.code === "ECONNRESET" || error?.name === "AbortError") {
    return new AIProviderError("Network error contacting Claude API", AIProviderError.CATEGORIES.NETWORK, error);
  }

  return new AIProviderError(error?.message || "Unknown Claude API error", AIProviderError.CATEGORIES.UNKNOWN, error);
}

class ClaudeProvider extends AIProvider {
  /**
   * @param {object} options
   * @param {string} options.apiKey
   * @param {string} options.model
   * @param {string} [options.baseURL]
   * @param {number} [options.temperature]
   * @param {number} [options.maxOutputTokens]
   */
  constructor({ apiKey, model, baseURL, temperature, maxOutputTokens }) {
    super();
    if (!apiKey) {
      throw new Error("ClaudeProvider requires an apiKey");
    }

    this.model = model || "claude-3-5-haiku-20241022";
    this.temperature = typeof temperature === "number" ? temperature : 0.3;
    this.maxOutputTokens = maxOutputTokens || 1024;

    this.client = new Anthropic({
      apiKey,
      baseURL: baseURL || undefined,
    });
  }

  static formatTools(tools) {
    if (!tools || !tools.length) return undefined;
    return tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      input_schema: tool.parametersJsonSchema || tool.parameters || { type: "object", properties: {} },
    }));
  }

  static formatMessages(contents) {
    const messages = [];

    for (const turn of contents || []) {
      if (!turn) continue;

      const role = turn.role === "model" || turn.role === "assistant" ? "assistant" : "user";
      const parts = Array.isArray(turn.parts) ? turn.parts : [];

      if (!parts.length) {
        if (typeof turn.content === "string") {
          messages.push({ role, content: turn.content });
        }
        continue;
      }

      // Check for tool response parts from user
      const toolResponses = parts.filter((p) => p && p.functionResponse);
      if (toolResponses.length > 0) {
        messages.push({
          role: "user",
          content: toolResponses.map((tr) => ({
            type: "tool_result",
            tool_use_id: tr.functionResponse.id || tr.functionResponse.name,
            content:
              typeof tr.functionResponse.response === "string"
                ? tr.functionResponse.response
                : JSON.stringify(tr.functionResponse.response || {}),
          })),
        });
        continue;
      }

      // Check for function calls from assistant
      const functionCalls = parts.filter((p) => p && p.functionCall);
      if (functionCalls.length > 0) {
        messages.push({
          role: "assistant",
          content: functionCalls.map((fc, idx) => ({
            type: "tool_use",
            id: fc.functionCall.id || `call_${idx}_${Date.now()}`,
            name: fc.functionCall.name,
            input: fc.functionCall.args || {},
          })),
        });
        continue;
      }

      // Standard text parts
      const text = parts
        .map((p) => (typeof p === "string" ? p : p.text || ""))
        .join("")
        .trim();

      if (text) {
        messages.push({ role, content: text });
      }
    }

    return messages;
  }

  async generate({ systemInstruction, contents, tools }) {
    try {
      const messages = ClaudeProvider.formatMessages(contents);
      const formattedTools = ClaudeProvider.formatTools(tools);

      const requestPayload = {
        model: this.model,
        messages,
        system: systemInstruction || undefined,
        temperature: this.temperature,
        max_tokens: this.maxOutputTokens,
      };

      if (formattedTools && formattedTools.length > 0) {
        requestPayload.tools = formattedTools;
      }

      const response = await this.client.messages.create(requestPayload);

      const functionCalls = [];
      let textContent = "";

      for (const block of response.content || []) {
        if (block.type === "text") {
          textContent += block.text;
        } else if (block.type === "tool_use") {
          functionCalls.push({
            id: block.id,
            name: block.name,
            args: block.input || {},
          });
        }
      }

      const parts = functionCalls.length
        ? functionCalls.map((fc) => ({
            functionCall: { id: fc.id, name: fc.name, args: fc.args },
          }))
        : [{ text: textContent }];

      return {
        text: functionCalls.length ? null : textContent || null,
        functionCalls,
        parts,
        usage: response.usage || null,
      };
    } catch (error) {
      const providerError = toProviderError(error);
      logger.error(`Claude API call failed [${providerError.category}]: ${providerError.message}`);
      throw providerError;
    }
  }
}

module.exports = ClaudeProvider;
