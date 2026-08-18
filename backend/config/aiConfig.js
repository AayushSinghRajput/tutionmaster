// Central place for AI provider configuration. Nothing here is hardcoded —
// every value comes from the environment so switching Gemini models, tuning
// generation params, or moving from the free tier to a paid one is a config
// change, not a code change. GEMINI_API_KEY is deliberately NOT in
// utils/validateEnv.js's required list (same pattern as GOOGLE_CLIENT_ID) —
// the rest of the platform must keep working if the AI feature isn't
// configured yet.
const DEFAULT_MODEL = "gemini-2.0-flash";
const DEFAULT_TEMPERATURE = 0.3;
const DEFAULT_MAX_OUTPUT_TOKENS = 1024;

const aiConfig = {
  get apiKey() {
    return process.env.GEMINI_API_KEY || null;
  },
  get isEnabled() {
    return Boolean(process.env.GEMINI_API_KEY);
  },
  get model() {
    return process.env.GEMINI_MODEL || DEFAULT_MODEL;
  },
  get temperature() {
    const parsed = Number(process.env.GEMINI_TEMPERATURE);
    return Number.isFinite(parsed) ? parsed : DEFAULT_TEMPERATURE;
  },
  get maxOutputTokens() {
    const parsed = Number(process.env.GEMINI_MAX_OUTPUT_TOKENS);
    return Number.isFinite(parsed) ? parsed : DEFAULT_MAX_OUTPUT_TOKENS;
  },
};

module.exports = aiConfig;
