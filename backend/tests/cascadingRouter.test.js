const agent = require("../services/ai/agent");
const keyRouter = require("../services/ai/keyRouter");
const AIProviderError = require("../services/ai/AIProviderError");

describe("AI Agent Dynamic Cascading & Circuit Breaker", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    keyRouter.invalidateCache();
  });

  it("cascades from rate-limited Provider A (Priority 1) to Provider B (Priority 2)", async () => {
    // Mock Provider A (e.g. DeepSeek that returns 429 Rate Limit)
    const providerA = {
      generate: jest.fn().mockRejectedValue(
        new AIProviderError("DeepSeek rate limited", AIProviderError.CATEGORIES.RATE_LIMIT)
      ),
    };

    // Mock Provider B (e.g. Gemini that succeeds)
    const providerB = {
      generate: jest.fn().mockResolvedValue({
        text: "Hello from Provider B (Fallback)",
        functionCalls: [],
      }),
    };

    // Spy on getAvailableCandidate to simulate router returning Provider A first, then Provider B
    let callCount = 0;
    jest.spyOn(keyRouter, "getAvailableCandidate").mockImplementation(async (excludeIds = []) => {
      if (!excludeIds.includes("key_deepseek")) {
        return {
          id: "key_deepseek",
          provider: providerA,
          label: "DeepSeek Primary",
          model: "deepseek-chat",
          providerName: "deepseek",
        };
      }
      if (!excludeIds.includes("key_gemini")) {
        return {
          id: "key_gemini",
          provider: providerB,
          label: "Gemini Secondary",
          model: "gemini-2.5-flash",
          providerName: "gemini",
        };
      }
      return null;
    });

    const recordFailureSpy = jest.spyOn(keyRouter, "recordFailure").mockResolvedValue();
    const recordSuccessSpy = jest.spyOn(keyRouter, "recordSuccess").mockResolvedValue();

    const result = await agent.chat({ message: "Hello" });

    // Verify Provider A was attempted and failed
    expect(providerA.generate).toHaveBeenCalledTimes(1);
    expect(recordFailureSpy).toHaveBeenCalledWith("key_deepseek", expect.any(Object));

    // Verify Provider B was cascaded to and succeeded
    expect(providerB.generate).toHaveBeenCalledTimes(1);
    expect(recordSuccessSpy).toHaveBeenCalledWith("key_gemini");

    // Result should be from Provider B
    expect(result.message).toBe("Hello from Provider B (Fallback)");
  });

  it("invokes local rule engine when all remote candidates are rate-limited or fail", async () => {
    const failingProvider = {
      generate: jest.fn().mockRejectedValue(
        new AIProviderError("All providers down", AIProviderError.CATEGORIES.NETWORK)
      ),
    };

    jest.spyOn(keyRouter, "getAvailableCandidate").mockImplementation(async (excludeIds = []) => {
      if (excludeIds.length === 0) {
        return {
          id: "key_1",
          provider: failingProvider,
          label: "Failing Provider",
          model: "model-x",
          providerName: "openai",
        };
      }
      return null;
    });

    jest.spyOn(keyRouter, "recordFailure").mockResolvedValue();

    // Send a query that matches tutor search
    const result = await agent.chat({ message: "Find a tutor for Math in Kathmandu" });

    // Should return graceful fallback response instead of crashing
    expect(result).toBeDefined();
    expect(typeof result.message).toBe("string");
    expect(result.message.length).toBeGreaterThan(0);
  });
});
