/**
 * File upload validation helpers
 */

const fail = (message) => ({ isValid: false, message });
const pass = () => ({ isValid: true, message: "" });

/**
 * Validates a file upload against size, MIME type, and extension rules
 * @param {File} file
 * @param {{ maxSize?, allowedTypes?, allowedExtensions? }} options
 * @returns {{ isValid: boolean, message: string }}
 */
export const validateFileUpload = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5 MB
    allowedTypes = [],
    allowedExtensions = [],
  } = options;

  if (!file) return fail("File is required");

  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return fail(`File size must be less than ${maxSizeMB}MB`);
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return fail(`File type must be: ${allowedTypes.join(", ")}`);
  }

  if (allowedExtensions.length > 0) {
    const ext = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return fail(`File extension must be: ${allowedExtensions.join(", ")}`);
    }
  }

  return pass();
};

/**
 * Validates an image file (JPEG / PNG / WebP / AVIF, max 5 MB)
 * @param {File} file
 */
export const validateImageFile = (file) =>
  validateFileUpload(file, {
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"],
    allowedExtensions: ["jpg", "jpeg", "png", "webp", "avif"],
  });

/**
 * Validates a PDF file (max 10 MB)
 * @param {File} file
 */
export const validatePdfFile = (file) =>
  validateFileUpload(file, {
    maxSize: 10 * 1024 * 1024,
    allowedTypes: ["application/pdf"],
    allowedExtensions: ["pdf"],
  });
