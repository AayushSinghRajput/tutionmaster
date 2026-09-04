import { emailRegex, phoneRegex, zipCodeRegex, timeRegex } from "./regex";

const VALID_TEACHING_MODES = ["Online", "In-person", "Both"];

const isMissing = (value) =>
  value === null || value === undefined || String(value).trim() === "";

const fail = (message) => ({ isValid: false, message });
const pass = () => ({ isValid: true, message: "" });

/**
 * Validates an email address
 */
export const validateEmail = (email) => {
  if (!email) return fail("Email is required");
  if (!emailRegex.test(email)) return fail("Please enter a valid email address");
  return pass();
};

/**
 * Validates a password against configurable rules
 */
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 6,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false,
  } = options;

  if (!password) return fail("Password is required");
  if (password.length < minLength)
    return fail(`Password must be at least ${minLength} characters long`);
  if (requireUppercase && !/(?=.*[A-Z])/.test(password))
    return fail("Password must contain at least one uppercase letter");
  if (requireLowercase && !/(?=.*[a-z])/.test(password))
    return fail("Password must contain at least one lowercase letter");
  if (requireNumbers && !/(?=.*\d)/.test(password))
    return fail("Password must contain at least one number");
  if (
    requireSpecialChars &&
    !/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password)
  ) {
    return fail("Password must contain at least one special character");
  }
  return pass();
};

/**
 * Validates password confirmation
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) return fail("Please confirm your password");
  if (password !== confirmPassword) return fail("Passwords do not match");
  return pass();
};

/**
 * Validates a name field
 */
export const validateName = (name, fieldName = "Name") => {
  if (!name || name.trim() === "") return fail(`${fieldName} is required`);
  if (name.length > 100) return fail(`${fieldName} must be less than 100 characters`);
  if (!/^[a-zA-Z\s\-'.]+$/.test(name)) {
    return fail(`${fieldName} can only contain letters, spaces, hyphens, and apostrophes`);
  }
  return pass();
};

/**
 * Validates a phone number
 */
export const validatePhone = (phone) => {
  if (!phone) return fail("Phone number is required");

  const cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length < 10) return fail("Phone number must be at least 10 digits");
  if (cleanPhone.length > 15) return fail("Phone number is too long");
  if (!phoneRegex.test(phone)) return fail("Please enter a valid phone number");

  return pass();
};

/**
 * Validates an address object
 */
export const validateAddress = (address) => {
  const errors = {};

  if (!address.street?.trim()) errors.street = "Street address is required";
  else if (address.street.length > 200) errors.street = "Street address must be less than 200 characters";

  if (!address.city?.trim()) errors.city = "City is required";
  else if (address.city.length > 50) errors.city = "City must be less than 50 characters";

  if (!address.state?.trim()) errors.state = "State is required";
  else if (address.state.length > 50) errors.state = "State must be less than 50 characters";

  if (!address.zipCode?.trim()) errors.zipCode = "ZIP code is required";
  else if (!zipCodeRegex.test(address.zipCode)) errors.zipCode = "Please enter a valid ZIP code";

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors, message: isValid ? "" : "Please fix the address errors" };
};

/**
 * Validates years of teaching experience
 */
export const validateExperience = (experience) => {
  if (isMissing(experience)) return fail("Teaching experience is required");
  const exp = Number(experience);
  if (isNaN(exp)) return fail("Experience must be a number");
  if (exp < 0) return fail("Experience cannot be negative");
  if (exp > 50) return fail("Experience cannot exceed 50 years");
  if (!Number.isInteger(exp)) return fail("Experience must be a whole number");
  return pass();
};

/**
 * Validates a monthly fee / rate
 */
export const validateMonthlyRate = (rate) => {
  if (isMissing(rate)) return fail("Monthly fee is required");
  const numRate = Number(rate);
  if (isNaN(numRate)) return fail("Monthly fee must be a number");
  if (numRate < 500) return fail("Monthly fee must be at least ₨500");
  if (numRate > 200000) return fail("Monthly fee cannot exceed ₨2,00,000");
  return pass();
};

export const validateHourlyRate = (rate) => {
  return validateMonthlyRate(rate);
};

/**
 * Validates a bio / description
 */
export const validateBio = (bio) => {
  if (!bio?.trim()) return fail("Bio is required");
  if (bio.length < 50) return fail("Bio must be at least 50 characters long");
  if (bio.length > 1000) return fail("Bio must be less than 1000 characters");
  return pass();
};

/**
 * Validates an array of qualification objects
 */
export const validateQualifications = (qualifications) => {
  if (!qualifications?.length) {
    return { isValid: false, errors: [], message: "At least one qualification is required" };
  }

  const errors = [];

  qualifications.forEach((qual, index) => {
    const qualErrors = {};

    if (!qual.degree?.trim()) qualErrors.degree = "Degree is required";
    if (!qual.institution?.trim()) qualErrors.institution = "Institution is required";

    if (Object.keys(qualErrors).length > 0) {
      errors.push({ index, errors: qualErrors });
    }
  });

  const isValid = errors.length === 0;
  return { isValid, errors, message: isValid ? "" : "Please fix the qualification errors" };
};

/**
 * Validates preferred subjects
 */
export const validateSubjects = (subjects) => {
  if (!subjects?.length) return fail("At least one subject is required");
  if (subjects.length > 10) return fail("Cannot select more than 10 subjects");
  return pass();
};

/**
 * Validates an availability schedule array
 */
export const validateAvailability = (availability) => {
  if (!availability?.length) return { isValid: true, errors: [], message: "" };

  const errors = [];

  availability.forEach((slot, index) => {
    const slotErrors = {};

    if (!slot.day) slotErrors.day = "Day is required";

    if (!slot.timeSlots?.length) {
      slotErrors.timeSlots = "At least one time slot is required";
    } else {
      slot.timeSlots.forEach((timeSlot, timeIndex) => {
        const timeErrors = {};

        if (!timeSlot.start || !timeRegex.test(timeSlot.start)) {
          timeErrors.start = "Valid start time is required (HH:MM format)";
        }
        if (!timeSlot.end || !timeRegex.test(timeSlot.end)) {
          timeErrors.end = "Valid end time is required (HH:MM format)";
        }
        if (timeSlot.start && timeSlot.end) {
          const startMs = new Date(`2000-01-01T${timeSlot.start}`);
          const endMs = new Date(`2000-01-01T${timeSlot.end}`);
          if (endMs <= startMs) timeErrors.end = "End time must be after start time";
        }

        if (Object.keys(timeErrors).length > 0) {
          if (!slotErrors.timeSlots) slotErrors.timeSlots = [];
          slotErrors.timeSlots[timeIndex] = timeErrors;
        }
      });
    }

    if (Object.keys(slotErrors).length > 0) errors.push({ index, errors: slotErrors });
  });

  const isValid = errors.length === 0;
  return { isValid, errors, message: isValid ? "" : "Please fix the availability errors" };
};

/**
 * Validates teaching mode
 */
export const validateTeachingMode = (teachingMode) => {
  if (!teachingMode) return fail("Teaching mode is required");
  if (!VALID_TEACHING_MODES.includes(teachingMode)) return fail("Please select a valid teaching mode");
  return pass();
};
