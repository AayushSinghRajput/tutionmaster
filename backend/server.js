const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/error");
const { globalLimiter, authLimiter } = require("./middleware/rateLimiter");
const validateEnv = require("./utils/validateEnv");
const logger = require("./utils/logger");
const newsletterRoute = require("./routes/newsletterRoute");
const uploadRoute = require("./routes/upload");
const teacherRoute = require("./routes/teachers");
const authRoute = require("./routes/auth");


// Load env vars
dotenv.config();

// Fail fast if required config is missing
validateEnv();

// Connect to database
connectDB();

const app = express();

// Security headers
app.use(helmet());

// Gzip responses
app.use(compression());

// Request logging (piped through winston)
app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

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

// Mount routers
app.use("/api/auth", authLimiter, authRoute);
app.use("/api/teachers",teacherRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/newsletter", newsletterRoute);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "TutionMaster API is running",
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

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in http://localhost:${PORT}`);
});

// Guard against slow/hanging clients tying up connections
server.timeout = 30000;
server.keepAliveTimeout = 65000;

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Rejection: ${err.stack || err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught synchronous exceptions
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.stack || err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown on termination signals
const gracefulShutdown = (signal) => {
  logger.info(`${signal} received, shutting down gracefully...`);
  server.close(async () => {
    await mongoose.connection.close();
    logger.info("Closed out remaining connections.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
