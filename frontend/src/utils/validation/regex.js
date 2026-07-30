/**
 * Regex constants used across validation utilities
 */

export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
export const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
export const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
export const zipCodeRegex = /^\d{5}(-\d{4})?$/;
