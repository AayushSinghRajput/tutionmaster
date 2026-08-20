const mongoose = require("mongoose");
const logger = require("../utils/logger");

const MAX_RETRIES = 5;
const INITIAL_DELAY_MS = 2000;

mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

const connectDB = async (retriesLeft = MAX_RETRIES, delay = INITIAL_DELAY_MS) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const dbUri = isProduction
      ? process.env.MONGODB_URI
      : (process.env.MONGODB_URI_LOCAL || "mongodb://127.0.0.1:27017/tutionmaster");

    logger.info(`Connecting to MongoDB (env: ${process.env.NODE_ENV || "development"})...`);
    await mongoose.connect(dbUri, {
      maxPoolSize: 10,
    });
    logger.info("MongoDB Connected ...");
  } catch (error) {
    if (retriesLeft > 0) {
      logger.warn(
        `Database connection failed (${error.message}). Retrying in ${delay}ms... (${retriesLeft} attempt(s) left)`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return connectDB(retriesLeft - 1, delay * 2);
    }
    logger.error(`Database connection failed after ${MAX_RETRIES} attempts: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
