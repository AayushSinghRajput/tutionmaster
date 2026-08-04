const winston = require("winston");

const isProduction = process.env.NODE_ENV === "production";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    isProduction
      ? winston.format.json()
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(
            ({ timestamp, level, message, stack }) =>
              `${timestamp} ${level}: ${stack || message}`,
          ),
        ),
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
