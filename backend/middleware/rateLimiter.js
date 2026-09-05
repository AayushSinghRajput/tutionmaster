const rateLimit = require('express-rate-limit');

const isDevOrTest = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' || !process.env.NODE_ENV;

// Applied to every request
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDevOrTest ? 20000 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => isDevOrTest && (req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1'),
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});

// Stricter limiter for auth routes (login/register) to slow down brute force/credential stuffing
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDevOrTest ? 500 : 20,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  skip: (req) => isDevOrTest && (req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1'),
  message: {
    success: false,
    message: 'Too many attempts, please try again later.',
  },
});

// Each chat request can trigger one or more Gemini API calls, which cost
// money and are far slower than a typical DB-backed route — a tighter,
// dedicated limit here protects both the Gemini quota/bill and the event
// loop from being monopolized by chat traffic.
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDevOrTest ? 500 : 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many AI assistant requests, please try again later.',
  },
});

module.exports = { globalLimiter, authLimiter, aiLimiter };
