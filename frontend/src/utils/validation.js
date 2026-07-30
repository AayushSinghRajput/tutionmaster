/**
 * Validation utility functions for TutionMaster
 *
 * Master barrel file re-exporting modular validation sub-utilities.
 */

import * as regex from "./validation/regex";
import * as fieldValidators from "./validation/fieldValidators";
import * as fileValidators from "./validation/fileValidators";
import * as teacherValidators from "./validation/teacherValidators";
import * as sanitizers from "./validation/sanitizers";

// Re-export named exports for backwards compatibility
export * from "./validation/regex";
export * from "./validation/fieldValidators";
export * from "./validation/fileValidators";
export * from "./validation/teacherValidators";
export * from "./validation/sanitizers";

// Default export combining all utilities
export default {
  ...regex,
  ...fieldValidators,
  ...fileValidators,
  ...teacherValidators,
  ...sanitizers,
};