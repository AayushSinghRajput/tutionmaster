// Pure Express app wiring — no env validation, no DB connect, no listen().
// Kept separate from server.js so tests can `require('./app')` and drive it
// with Supertest against an isolated in-memory database, without booting a
// real server or touching the real MongoDB.
require("dotenv").config();

const crypto = require("crypto");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const fileUpload = require("express-fileupload");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const errorHandler = require("./middleware/error");
const { globalLimiter, authLimiter } = require("./middleware/rateLimiter");
const logger = require("./utils/logger");
const newsletterRoute = require("./routes/newsletterRoute");
const uploadRoute = require("./routes/upload");
const teacherRoute = require("./routes/teachers");
const authRoute = require("./routes/auth");

const app = express();

// Security headers
app.use(helmet());

// Gzip responses
app.use(compression());

// Tag every request with an id so a single request can be traced across
// log lines (and returned to the client for support/bug reports).
app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  res.setHeader("X-Request-Id", req.id);
  next();
});

// Request logging (piped through winston), tagged with the request id
morgan.token("id", (req) => req.id);
const morganFormat =
  process.env.NODE_ENV === "production"
    ? ':id :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
    : ":id :method :url :status :response-time ms - :res[content-length]";
if (process.env.NODE_ENV !== "test") {
  app.use(
    morgan(morganFormat, {
      stream: { write: (message) => logger.info(message.trim()) },
    }),
  );
}

// Body parser middleware
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// Strip Mongo operators ($ and .) from user input to block NoSQL injection
app.use(mongoSanitize());

// Prevent HTTP parameter pollution
app.use(hpp());

// Enable CORS (restrict to the configured frontend origin)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  }),
);

app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    abortOnLimit: true,
  }),
);

// Rate limiting to protect against abuse/DoS
app.use(globalLimiter);

// Mount routers at both the legacy unversioned path and the versioned one.
// Same router instances, so this is purely additive — nothing that already
// calls /api/* breaks, and new/updated clients can move to /api/v1/*.
const mountRoutes = (prefix) => {
  app.use(`${prefix}/auth`, authLimiter, authRoute);
  app.use(`${prefix}/teachers`, teacherRoute);
  app.use(`${prefix}/upload`, uploadRoute);
  app.use(`${prefix}/newsletter`, newsletterRoute);
};
mountRoutes("/api");
mountRoutes("/api/v1");

// API documentation (read-only, public — safe to leave open)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check route — reflects real DB connectivity so the platform's
// health probe (see render.yaml healthCheckPath) can detect a degraded
// instance instead of always reporting healthy.
app.get("/api/health", (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(isDbConnected ? 200 : 503).json({
    success: isDbConnected,
    message: isDbConnected
      ? "TutionMaster API is running"
      : "Database unavailable",
    db: isDbConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.send(`Backend is running ...`);
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found - ${req.originalUrl}`,
  });
});

// Error handler middleware (should be last)
app.use(errorHandler);

module.exports = app;
