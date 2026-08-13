// Load env vars first — modules required below (e.g. config/cloudinary.js,
// controllers/authController.js, ./app.js) read process.env at require-time,
// so this must run before any local module is imported.
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/database");
const validateEnv = require("./utils/validateEnv");
const logger = require("./utils/logger");
const app = require("./app");

// Fail fast if required config is missing
validateEnv();

// Connect to database
connectDB();

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
