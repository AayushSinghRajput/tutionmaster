// Interface every LLM provider must implement. The rest of the application
// (agent.js, tools, controller) only ever talks to this shape — never to
// Gemini's SDK directly — so a future provider (OpenAI, a local model, ...)
// can be dropped in by implementing this same method.
class AIProvider {
  /**
   * @param {object} params
   * @param {string} params.systemInstruction
   * @param {Array<{role: 'user'|'model', parts: Array<object>}>} params.contents
   * @param {Array<object>} params.tools - function declarations, provider-format
   * @returns {Promise<{text: string|null, functionCalls: Array<{name: string, args: object, id?: string}>}>}
   */
  // eslint-disable-next-line no-unused-vars
  async generate({ systemInstruction, contents, tools }) {
    throw new Error("AIProvider.generate() must be implemented by a subclass");
  }
}

module.exports = AIProvider;
