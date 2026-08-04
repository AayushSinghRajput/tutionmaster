const logger = require("./logger");

// Retries a flaky async operation (e.g. a third-party API call) with a short
// linear backoff between attempts.
const withRetry = async (fn, { retries = 3, delayMs = 500, label = "operation" } = {}) => {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      logger.warn(`${label} failed (attempt ${attempt}/${retries}): ${error.message}`);
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
      }
    }
  }
  throw lastError;
};

module.exports = withRetry;
