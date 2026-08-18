// Normalized error shape so callers (agent.js, aiController.js) never need
// to know which provider raised it or parse provider-specific error bodies.
const CATEGORIES = Object.freeze({
  RATE_LIMIT: "RATE_LIMIT",
  AUTH: "AUTH",
  NETWORK: "NETWORK",
  INVALID_REQUEST: "INVALID_REQUEST",
  UNKNOWN: "UNKNOWN",
});

class AIProviderError extends Error {
  constructor(message, category = CATEGORIES.UNKNOWN, cause) {
    super(message);
    this.name = "AIProviderError";
    this.category = category;
    this.cause = cause;
  }
}

AIProviderError.CATEGORIES = CATEGORIES;

module.exports = AIProviderError;
