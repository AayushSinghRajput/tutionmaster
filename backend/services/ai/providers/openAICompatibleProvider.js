const { OpenAI } = require("openai");
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

function toProviderError(error, providerName = "OpenAI-compatible") {
  if (error?.status) {
    return new AIProviderError(
      `${providerName} API error (${error.status}): ${error.message}`,
      categorizeStatus(error.status),
      error
    );
  }

  if (error?.code === "ETIMEDOUT" || error?.code === "ECONNRESET" || error?.name === "AbortError") {
    return new AIProviderError(`Network error contacting ${providerName} API`, AIProviderError.CATEGORIES.NETWORK, error);
  }

  return new AIProviderError(error?.message || `Unknown ${providerName} API error`, AIProviderError.CATEGORIES.UNKNOWN, error);
}

/**
 * Universal OpenAI-compatible provider.
 * Supports OpenAI, DeepSeek, Groq, and any OpenAI-spec API endpoint.
 */
class OpenAICompatibleProvider extends AIProvider {
  /**
   * @param {object} options
   * @param {string} options.apiKey
   * @param {string} options.model
   * @param {string} [options.baseURL]
   * @param {number} [options.temperature]
   * @param {number} [options.maxOutputTokens]
   * @param {'openai'|'deepseek'|'groq'} [options.providerType]
   */
  constructor({ apiKey, model, baseURL, temperature, maxOutputTokens, providerType = "openai" }) {
    super();
    if (!apiKey) {
      throw new Error(`OpenAICompatibleProvider (${providerType}) requires an apiKey`);
    }

    this.providerType = providerType;
    this.model = model;
    this.temperature = typeof temperature === "number" ? temperature : 0.3;
    this.maxOutputTokens = maxOutputTokens || 1024;

    let resolvedBaseURL = baseURL;
    if (!resolvedBaseURL) {
      if (providerType === "deepseek") {
        resolvedBaseURL = "https://api.deepseek.com";
      } else if (providerType === "groq") {
        resolvedBaseURL = "https://api.groq.com/openai/v1";
      }
    }

    this.client = new OpenAI({
      apiKey,
      baseURL: resolvedBaseURL || undefined,
    });
  }

  /**
   * Translates unified tool definitions to OpenAI tool declarations.
   */
  static formatTools(tools) {
    if (!tools || !tools.length) return undefined;
    return tools.map((tool) => ({
      type: "function",
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.parametersJsonSchema || tool.parameters || { type: "object", properties: {} },
      },
    }));
  }

  /**
   * Converts TuitionMaster internal contents shape into OpenAI chat messages.
   */
  static formatMessages(systemInstruction, contents) {
    const messages = [];

    if (systemInstruction) {
      messages.push({ role: "system", content: systemInstruction });
    }

    for (const turn of contents || []) {
      if (!turn) continue;

      // Handle standard message shape if already provided
      if (turn.role === "system" || turn.role === "tool") {
        messages.push(turn);
        continue;
      }

      const role = turn.role === "model" || turn.role === "assistant" ? "assistant" : "user";
      const parts = Array.isArray(turn.parts) ? turn.parts : [];

      if (!parts.length) {
        if (typeof turn.content === "string") {
          messages.push({ role, content: turn.content });
        }
        continue;
      }

      // Check for function responses (from user executing tools)
      const toolResponses = parts.filter((p) => p && p.functionResponse);
      if (toolResponses.length > 0) {
        for (const tr of toolResponses) {
          const resp = tr.functionResponse;
          messages.push({
            role: "tool",
            tool_call_id: resp.id || resp.name,
            content: typeof resp.response === "string" ? resp.response : JSON.stringify(resp.response || {}),
          });
        }
        continue;
      }

      // Check for function calls (from model)
      const functionCalls = parts.filter((p) => p && p.functionCall);
      if (functionCalls.length > 0) {
        messages.push({
          role: "assistant",
          content: null,
          tool_calls: functionCalls.map((fc, idx) => ({
            id: fc.functionCall.id || `call_${idx}_${Date.now()}`,
            type: "function",
            function: {
              name: fc.functionCall.name,
              arguments: JSON.stringify(fc.functionCall.args || {}),
            },
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
      const messages = OpenAICompatibleProvider.formatMessages(systemInstruction, contents);
      const formattedTools = OpenAICompatibleProvider.formatTools(tools);

      const requestPayload = {
        model: this.model,
        messages,
        temperature: this.temperature,
        max_tokens: this.maxOutputTokens,
      };

      if (formattedTools && formattedTools.length > 0) {
        requestPayload.tools = formattedTools;
        requestPayload.tool_choice = "auto";
      }

      const response = await this.client.chat.completions.create(requestPayload);
      const choice = response.choices?.[0];
      const message = choice?.message || {};

      const functionCalls = (message.tool_calls || []).map((call) => {
        let parsedArgs = {};
        try {
          parsedArgs = JSON.parse(call.function.arguments || "{}");
        } catch (e) {
          parsedArgs = {};
        }
        return {
          id: call.id,
          name: call.function.name,
          args: parsedArgs,
        };
      });

      // Maintain compatible parts representation for agent loop history
      const parts = functionCalls.length
        ? functionCalls.map((fc) => ({
            functionCall: { id: fc.id, name: fc.name, args: fc.args },
          }))
        : [{ text: message.content || "" }];

      return {
        text: functionCalls.length ? null : message.content || null,
        functionCalls,
        parts,
        usage: response.usage || null,
      };
    } catch (error) {
      const providerError = toProviderError(error, this.providerType);
      logger.error(`${this.providerType} API call failed [${providerError.category}]: ${providerError.message}`);
      throw providerError;
    }
  }
}

module.exports = OpenAICompatibleProvider;
