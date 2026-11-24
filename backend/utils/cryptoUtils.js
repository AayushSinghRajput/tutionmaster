const crypto = require("crypto");

// 32-byte key derived deterministically from environment secret.
// Uses ENCRYPTION_KEY if present, falling back to ADMIN_JWT_SECRET or JWT_SECRET.
function getDerivedKey() {
  const secret =
    process.env.ENCRYPTION_KEY ||
    process.env.ADMIN_JWT_SECRET ||
    process.env.JWT_SECRET ||
    "tuitionmaster-default-dev-secret-key-change-in-prod";
  return crypto.scryptSync(secret, "tuitionmaster-llm-salt", 32);
}

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // Recommended for GCM

/**
 * Encrypt plaintext string with AES-256-GCM.
 * @param {string} plaintext
 * @returns {string} iv:authTag:encryptedHex
 */
function encrypt(plaintext) {
  if (!plaintext || typeof plaintext !== "string") {
    throw new Error("Plaintext must be a non-empty string");
  }

  const key = getDerivedKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

/**
 * Decrypt ciphertext produced by encrypt().
 * @param {string} cipherPayload - format: iv:authTag:encryptedHex
 * @returns {string} plaintext
 */
function decrypt(cipherPayload) {
  if (!cipherPayload || typeof cipherPayload !== "string") {
    throw new Error("Cipher payload must be a string");
  }

  const parts = cipherPayload.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid cipher payload format");
  }

  const [ivHex, authTagHex, encryptedHex] = parts;
  const key = getDerivedKey();
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

/**
 * Mask an API key so it can be safely displayed in the Admin UI without leaking.
 * e.g. "sk-ant-api03-1234567890abcdef" -> "sk-an...cdef"
 * @param {string} key
 * @returns {string}
 */
function maskApiKey(key) {
  if (!key || typeof key !== "string") return "****";
  const trimmed = key.trim();
  if (trimmed.length <= 8) return "********";
  const start = trimmed.slice(0, 5);
  const end = trimmed.slice(-4);
  return `${start}...${end}`;
}

module.exports = {
  encrypt,
  decrypt,
  maskApiKey,
};
