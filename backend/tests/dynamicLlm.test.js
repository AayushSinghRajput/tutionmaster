const { encrypt, decrypt, maskApiKey } = require("../utils/cryptoUtils");
const OpenAICompatibleProvider = require("../services/ai/providers/openAICompatibleProvider");
const ClaudeProvider = require("../services/ai/providers/claudeProvider");

describe("Dynamic LLM Provider & Security Suite", () => {
  describe("cryptoUtils — AES-256-GCM Encryption & Masking", () => {
    it("successfully encrypts and decrypts API keys", () => {
      const originalKey = "sk-deepseek-9876543210abcdefABCDEF";
      const encrypted = encrypt(originalKey);

      expect(encrypted).not.toEqual(originalKey);
      expect(encrypted).toContain(":"); // iv:authTag:cipherHex

      const decrypted = decrypt(encrypted);
      expect(decrypted).toBe(originalKey);
    });

    it("masks keys safely for frontend display", () => {
      expect(maskApiKey("sk-ant-api03-abcdef1234567890XYZW")).toBe("sk-an...XYZW");
      expect(maskApiKey("AIzaSyB1234567890abcdef")).toBe("AIzaS...cdef");
      expect(maskApiKey("short")).toBe("********");
      expect(maskApiKey(null)).toBe("****");
    });
  });

  describe("OpenAICompatibleProvider — Tool & Message Formatting", () => {
    it("formats tools into standard OpenAI function definitions", () => {
      const mockTools = [
        {
          name: "searchTeachers",
          description: "Search for teachers",
          parametersJsonSchema: {
            type: "object",
            properties: {
              query: { type: "string" },
            },
            required: ["query"],
          },
        },
      ];

      const formatted = OpenAICompatibleProvider.formatTools(mockTools);
      expect(formatted).toHaveLength(1);
      expect(formatted[0].type).toBe("function");
      expect(formatted[0].function.name).toBe("searchTeachers");
      expect(formatted[0].function.parameters.type).toBe("object");
      expect(formatted[0].function.parameters.properties.query).toBeDefined();
    });

    it("translates multi-turn contents and system instructions into OpenAI chat messages", () => {
      const systemInstruction = "You are a helpful education assistant.";
      const contents = [
        { role: "user", parts: [{ text: "Hello there" }] },
        {
          role: "model",
          parts: [{ functionCall: { id: "call_123", name: "checkTeacher", args: { name: "John" } } }],
        },
        {
          role: "user",
          parts: [{ functionResponse: { id: "call_123", name: "checkTeacher", response: { exists: true } } }],
        },
      ];

      const messages = OpenAICompatibleProvider.formatMessages(systemInstruction, contents);

      expect(messages[0]).toEqual({ role: "system", content: systemInstruction });
      expect(messages[1]).toEqual({ role: "user", content: "Hello there" });
      expect(messages[2].role).toBe("assistant");
      expect(messages[2].tool_calls).toHaveLength(1);
      expect(messages[2].tool_calls[0].function.name).toBe("checkTeacher");
      expect(messages[3].role).toBe("tool");
      expect(messages[3].tool_call_id).toBe("call_123");
    });
  });

  describe("ClaudeProvider — Tool & Message Formatting", () => {
    it("formats tools into Anthropic input_schema format", () => {
      const mockTools = [
        {
          name: "getSubjects",
          description: "Get subjects list",
          parametersJsonSchema: {
            type: "object",
            properties: {},
          },
        },
      ];

      const formatted = ClaudeProvider.formatTools(mockTools);
      expect(formatted).toHaveLength(1);
      expect(formatted[0].name).toBe("getSubjects");
      expect(formatted[0].input_schema).toBeDefined();
    });

    it("formats tool calls and tool results for Anthropic Messages API", () => {
      const contents = [
        { role: "user", parts: [{ text: "Find tutor" }] },
        {
          role: "model",
          parts: [{ functionCall: { id: "tool_use_1", name: "getSubjects", args: {} } }],
        },
        {
          role: "user",
          parts: [{ functionResponse: { id: "tool_use_1", name: "getSubjects", response: ["Math", "Physics"] } }],
        },
      ];

      const messages = ClaudeProvider.formatMessages(contents);

      expect(messages[0]).toEqual({ role: "user", content: "Find tutor" });
      expect(messages[1].role).toBe("assistant");
      expect(messages[1].content[0].type).toBe("tool_use");
      expect(messages[1].content[0].name).toBe("getSubjects");
      expect(messages[2].role).toBe("user");
      expect(messages[2].content[0].type).toBe("tool_result");
      expect(messages[2].content[0].tool_use_id).toBe("tool_use_1");
    });
  });
});
