/**
 * Validation utility functions for TutionMaster
 */

// Email validation regex
export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// Phone validation regex (supports international formats)
export const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;

// URL validation regex
export const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

// Time format validation (HH:MM)
export const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

// ZIP code validation (US format)
export const zipCodeRegex = /^\d{5}(-\d{4})?$/;

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {Object} Validation result
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates a password
 * @param {string} password - Password to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 6,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false
  } = options;

  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < minLength) {
    return { 
      isValid: false, 
      message: `Password must be at least ${minLength} characters long` 
    };
  }

  if (requireUppercase && !/(?=.*[A-Z])/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one uppercase letter' 
    };
  }

  if (requireLowercase && !/(?=.*[a-z])/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one lowercase letter' 
    };
  }

  if (requireNumbers && !/(?=.*\d)/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one number' 
    };
  }

  if (requireSpecialChars && !/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one special character' 
    };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates password confirmation
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {Object} Validation result
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates a name
 * @param {string} name - Name to validate
 * @param {string} fieldName - Field name for error messages
 * @returns {Object} Validation result
 */
export const validateName = (name, fieldName = 'Name') => {
  if (!name || name.trim() === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }

  if (name.length > 100) {
    return { isValid: false, message: `${fieldName} must be less than 100 characters` };
  }

  // Check for only letters, spaces, hyphens, and apostrophes
  if (!/^[a-zA-Z\s\-'.]+$/.test(name)) {
    return { isValid: false, message: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates a phone number
 * @param {string} phone - Phone number to validate
 * @returns {Object} Validation result
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, message: 'Phone number is required' };
  }

  // Remove all non-digit characters for validation
  const cleanPhone = phone.replace(/\D/g, '');

  if (cleanPhone.length < 10) {
    return { isValid: false, message: 'Phone number must be at least 10 digits' };
  }

  if (cleanPhone.length > 15) {
    return { isValid: false, message: 'Phone number is too long' };
  }

  if (!phoneRegex.test(phone)) {
    return { isValid: false, message: 'Please enter a valid phone number' };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates an address
 * @param {Object} address - Address object to validate
 * @returns {Object} Validation result
 */
export const validateAddress = (address) => {
  const errors = {};

  if (!address.street || address.street.trim() === '') {
    errors.street = 'Street address is required';
  } else if (address.street.length > 200) {
    errors.street = 'Street address must be less than 200 characters';
  }

  if (!address.city || address.city.trim() === '') {
    errors.city = 'City is required';
  } else if (address.city.length > 50) {
    errors.city = 'City must be less than 50 characters';
  }

  if (!address.state || address.state.trim() === '') {
    errors.state = 'State is required';
  } else if (address.state.length > 50) {
    errors.state = 'State must be less than 50 characters';
  }

  if (!address.zipCode || address.zipCode.trim() === '') {
    errors.zipCode = 'ZIP code is required';
  } else if (!zipCodeRegex.test(address.zipCode)) {
    errors.zipCode = 'Please enter a valid ZIP code';
  }

  const isValid = Object.keys(errors).length === 0;
  
  return {
    isValid,
    errors,
    message: isValid ? '' : 'Please fix the address errors'
  };
};

/**
 * Validates teaching experience
 * @param {number} experience - Years of experience
 * @returns {Object} Validation result
 */
export const validateExperience = (experience) => {
  if (experience === null || experience === undefined || experience === '') {
    return { isValid: false, message: 'Teaching experience is required' };
  }

  const exp = Number(experience);

  if (isNaN(exp)) {
    return { isValid: false, message: 'Experience must be a number' };
  }

  if (exp < 0) {
    return { isValid: false, message: 'Experience cannot be negative' };
  }

  if (exp > 50) {
    return { isValid: false, message: 'Experience cannot exceed 50 years' };
  }

  if (!Number.isInteger(exp)) {
    return { isValid: false, message: 'Experience must be a whole number' };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates hourly rate
 * @param {number} rate - Hourly rate
 * @returns {Object} Validation result
 */
export const validateHourlyRate = (rate) => {
  if (rate === null || rate === undefined || rate === '') {
    return { isValid: false, message: 'Hourly rate is required' };
  }

  const numRate = Number(rate);

  if (isNaN(numRate)) {
    return { isValid: false, message: 'Hourly rate must be a number' };
  }

  if (numRate < 0) {
    return { isValid: false, message: 'Hourly rate cannot be negative' };
  }

  if (numRate > 1000) {
    return { isValid: false, message: 'Hourly rate cannot exceed $1000' };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates bio/description
 * @param {string} bio - Bio text to validate
 * @returns {Object} Validation result
 */
export const validateBio = (bio) => {
  if (!bio || bio.trim() === '') {
    return { isValid: false, message: 'Bio is required' };
  }

  if (bio.length < 50) {
    return { isValid: false, message: 'Bio must be at least 50 characters long' };
  }

  if (bio.length > 1000) {
    return { isValid: false, message: 'Bio must be less than 1000 characters' };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates qualifications array
 * @param {Array} qualifications - Qualifications array
 * @returns {Object} Validation result
 */
export const validateQualifications = (qualifications) => {
  if (!qualifications || qualifications.length === 0) {
    return { isValid: false, message: 'At least one qualification is required' };
  }

  const errors = [];
  
  qualifications.forEach((qual, index) => {
    const qualErrors = {};
    
    if (!qual.degree || qual.degree.trim() === '') {
      qualErrors.degree = 'Degree is required';
    }

    if (!qual.institution || qual.institution.trim() === '') {
      qualErrors.institution = 'Institution is required';
    }

    if (!qual.year) {
      qualErrors.year = 'Year is required';
    } else {
      const year = Number(qual.year);
      const currentYear = new Date().getFullYear();
      
      if (isNaN(year)) {
        qualErrors.year = 'Year must be a number';
      } else if (year < 1950) {
        qualErrors.year = 'Year cannot be before 1950';
      } else if (year > currentYear) {
        qualErrors.year = `Year cannot be in the future (max ${currentYear})`;
      }
    }

    if (Object.keys(qualErrors).length > 0) {
      errors.push({ index, errors: qualErrors });
    }
  });

  const isValid = errors.length === 0;
  
  return {
    isValid,
    errors,
    message: isValid ? '' : 'Please fix the qualification errors'
  };
};

/**
 * Validates preferred subjects
 * @param {Array} subjects - Subjects array
 * @returns {Object} Validation result
 */
export const validateSubjects = (subjects) => {
  if (!subjects || subjects.length === 0) {
    return { isValid: false, message: 'At least one subject is required' };
  }

  if (subjects.length > 10) {
    return { isValid: false, message: 'Cannot select more than 10 subjects' };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates availability schedule
 * @param {Array} availability - Availability array
 * @returns {Object} Validation result
 */
export const validateAvailability = (availability) => {
  if (!availability || availability.length === 0) {
    return { isValid: true, message: '' }; // Availability is optional
  }

  const errors = [];
  
  availability.forEach((slot, index) => {
    const slotErrors = {};
    
    if (!slot.day) {
      slotErrors.day = 'Day is required';
    }

    if (!slot.timeSlots || slot.timeSlots.length === 0) {
      slotErrors.timeSlots = 'At least one time slot is required';
    } else {
      slot.timeSlots.forEach((timeSlot, timeIndex) => {
        const timeErrors = {};
        
        if (!timeSlot.start || !timeRegex.test(timeSlot.start)) {
          timeErrors.start = 'Valid start time is required (HH:MM format)';
        }

        if (!timeSlot.end || !timeRegex.test(timeSlot.end)) {
          timeErrors.end = 'Valid end time is required (HH:MM format)';
        }

        if (timeSlot.start && timeSlot.end) {
          const startTime = new Date(`2000-01-01T${timeSlot.start}`);
          const endTime = new Date(`2000-01-01T${timeSlot.end}`);
          
          if (endTime <= startTime) {
            timeErrors.end = 'End time must be after start time';
          }
        }

        if (Object.keys(timeErrors).length > 0) {
          if (!slotErrors.timeSlots) {
            slotErrors.timeSlots = [];
          }
          slotErrors.timeSlots[timeIndex] = timeErrors;
        }
      });
    }

    if (Object.keys(slotErrors).length > 0) {
      errors.push({ index, errors: slotErrors });
    }
  });

  const isValid = errors.length === 0;
  
  return {
    isValid,
    errors,
    message: isValid ? '' : 'Please fix the availability errors'
  };
};

/**
 * Validates teaching mode
 * @param {string} teachingMode - Teaching mode
 * @returns {Object} Validation result
 */
export const validateTeachingMode = (teachingMode) => {
  const validModes = ['Online', 'In-person', 'Both'];
  
  if (!teachingMode) {
    return { isValid: false, message: 'Teaching mode is required' };
  }

  if (!validModes.includes(teachingMode)) {
    return { isValid: false, message: 'Please select a valid teaching mode' };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates a file upload
 * @param {File} file - File object
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export const validateFileUpload = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = [],
    allowedExtensions = []
  } = options;

  if (!file) {
    return { isValid: false, message: 'File is required' };
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return { 
      isValid: false, 
      message: `File size must be less than ${maxSizeMB}MB` 
    };
  }

  // Check MIME type
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      message: `File type must be: ${allowedTypes.join(', ')}` 
    };
  }

  // Check file extension
  if (allowedExtensions.length > 0) {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return { 
        isValid: false, 
        message: `File extension must be: ${allowedExtensions.join(', ')}` 
      };
    }
  }

  return { isValid: true, message: '' };
};

/**
 * Validates image file specifically
 * @param {File} file - Image file
 * @returns {Object} Validation result
 */
export const validateImageFile = (file) => {
  return validateFileUpload(file, {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    allowedExtensions: ['jpg', 'jpeg', 'png', 'webp']
  });
};

/**
 * Validates PDF file specifically
 * @param {File} file - PDF file
 * @returns {Object} Validation result
 */
export const validatePdfFile = (file) => {
  return validateFileUpload(file, {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf'],
    allowedExtensions: ['pdf']
  });
};

/**
 * Comprehensive teacher profile validation
 * @param {Object} profile - Teacher profile data
 * @returns {Object} Validation result with errors
 */
export const validateTeacherProfile = (profile) => {
  const errors = {};

  // Validate basic information
  const nameValidation = validateName(profile.name, 'Full name');
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message;
  }

  const bioValidation = validateBio(profile.bio);
  if (!bioValidation.isValid) {
    errors.bio = bioValidation.message;
  }

  // Validate contact information
  const emailValidation = validateEmail(profile.contact?.email);
  if (!emailValidation.isValid) {
    errors.contact = { ...errors.contact, email: emailValidation.message };
  }

  const phoneValidation = validatePhone(profile.contact?.phone);
  if (!phoneValidation.isValid) {
    errors.contact = { ...errors.contact, phone: phoneValidation.message };
  }

  // Validate address
  const addressValidation = validateAddress(profile.address);
  if (!addressValidation.isValid) {
    errors.address = addressValidation.errors;
  }

  // Validate professional information
  const experienceValidation = validateExperience(profile.experience);
  if (!experienceValidation.isValid) {
    errors.experience = experienceValidation.message;
  }

  const hourlyRateValidation = validateHourlyRate(profile.hourlyRate);
  if (!hourlyRateValidation.isValid) {
    errors.hourlyRate = hourlyRateValidation.message;
  }

  const subjectsValidation = validateSubjects(profile.preferredSubjects);
  if (!subjectsValidation.isValid) {
    errors.preferredSubjects = subjectsValidation.message;
  }

  const teachingModeValidation = validateTeachingMode(profile.teachingMode);
  if (!teachingModeValidation.isValid) {
    errors.teachingMode = teachingModeValidation.message;
  }

  // Validate qualifications
  const qualificationsValidation = validateQualifications(profile.qualifications);
  if (!qualificationsValidation.isValid) {
    errors.qualifications = qualificationsValidation;
  }

  // Validate availability (optional)
  if (profile.availability && profile.availability.length > 0) {
    const availabilityValidation = validateAvailability(profile.availability);
    if (!availabilityValidation.isValid) {
      errors.availability = availabilityValidation;
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    message: isValid ? 'Profile is valid' : 'Please fix the validation errors'
  };
};

/**
 * Sanitizes input by removing potentially dangerous characters
 * @param {string} input - Input string to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

/**
 * Sanitizes object properties recursively
 * @param {Object} obj - Object to sanitize
 * @returns {Object} Sanitized object
 */
export const sanitizeObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return sanitizeInput(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  const sanitized = {};
  
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'string') {
      sanitized[key] = sanitizeInput(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitized[key] = sanitizeObject(obj[key]);
    } else {
      sanitized[key] = obj[key];
    }
  });

  return sanitized;
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param {*} value - Value to check
 * @returns {boolean} True if empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim() === '';
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
};

/**
 * Formats validation errors for display
 * @param {Object} errors - Validation errors object
 * @returns {Array} Array of error messages
 */
export const formatValidationErrors = (errors) => {
  const messages = [];

  const extractMessages = (errorObj, prefix = '') => {
    Object.keys(errorObj).forEach(key => {
      const value = errorObj[key];
      
      if (typeof value === 'string') {
        messages.push(prefix + value);
      } else if (typeof value === 'object' && value !== null) {
        const newPrefix = prefix ? `${prefix} -> ${key}` : key;
        extractMessages(value, newPrefix);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'object') {
            extractMessages(item, `${prefix} -> ${key}[${index}]`);
          }
        });
      }
    });
  };

  extractMessages(errors);
  return messages;
};

export default {
  emailRegex,
  phoneRegex,
  urlRegex,
  timeRegex,
  zipCodeRegex,
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validateName,
  validatePhone,
  validateAddress,
  validateExperience,
  validateHourlyRate,
  validateBio,
  validateQualifications,
  validateSubjects,
  validateAvailability,
  validateTeachingMode,
  validateFileUpload,
  validateImageFile,
  validatePdfFile,
  validateTeacherProfile,
  sanitizeInput,
  sanitizeObject,
  isEmpty,
  formatValidationErrors
};