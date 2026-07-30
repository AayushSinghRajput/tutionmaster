/**
 * Input sanitization & formatting helpers
 */

/**
 * Sanitizes a string by escaping HTML special characters
 * @param {string} input
 * @returns {string}
 */
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
};

/**
 * Recursively sanitizes all string values in an object or array
 * @param {Object|Array|*} obj
 * @returns {Object|Array|*}
 */
export const sanitizeObject = (obj) => {
  if (typeof obj !== "object" || obj === null) return sanitizeInput(obj);
  if (Array.isArray(obj)) return obj.map((item) => sanitizeObject(item));

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, sanitizeObject(value)])
  );
};

/**
 * Returns true when a value is null, undefined, empty string, empty array, or empty object
 * @param {*} value
 * @returns {boolean}
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};

/**
 * Flattens a nested errors object into a flat array of human-readable messages
 * @param {Object} errors
 * @returns {string[]}
 */
export const formatValidationErrors = (errors) => {
  const messages = [];

  const extract = (errorObj, prefix = "") => {
    Object.entries(errorObj).forEach(([key, value]) => {
      if (typeof value === "string") {
        messages.push(prefix + value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "object") extract(item, `${prefix} -> ${key}[${index}]`);
        });
      } else if (typeof value === "object" && value !== null) {
        extract(value, prefix ? `${prefix} -> ${key}` : key);
      }
    });
  };

  extract(errors);
  return messages;
};
