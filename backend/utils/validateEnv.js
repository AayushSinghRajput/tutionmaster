const logger = require("./logger");

const REQUIRED_ENV_VARS = [
  "MONGODB_URI",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const validateEnv = () => {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    logger.error(
      `Missing required environment variable(s): ${missing.join(", ")}`,
    );
    process.exit(1);
  }
};

module.exports = validateEnv;
