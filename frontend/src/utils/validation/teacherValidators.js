import { emailRegex, phoneRegex, timeRegex } from "./regex";

const VALID_TEACHING_MODES = ["Online", "In-person", "Both"];

const setNestedError = (errors, ...pathAndMessage) => {
  const message = pathAndMessage.pop();
  let node = errors;
  pathAndMessage.forEach((key, i) => {
    if (node[key] === undefined || typeof node[key] === "string") {
      node[key] = {};
    }
    if (i < pathAndMessage.length - 1) node = node[key];
  });
  const lastKey = pathAndMessage[pathAndMessage.length - 1];
  node[lastKey] = message;
};

const validateContactFields = (contact, errors) => {
  if (!contact?.email?.trim()) {
    errors.contact = { ...errors.contact, email: "Email is required" };
  } else if (!emailRegex.test(contact.email)) {
    errors.contact = { ...errors.contact, email: "Invalid email address" };
  }

  if (!contact?.phone?.trim()) {
    errors.contact = { ...errors.contact, phone: "Phone number is required" };
  } else if (!phoneRegex.test(contact.phone)) {
    errors.contact = { ...errors.contact, phone: "Invalid phone number" };
  }
};

const validateAddressFields = (address, errors) => {
  const required = { street: "Street address", state: "State", city: "City" };
  Object.entries(required).forEach(([key, label]) => {
    if (!address?.[key]?.trim()) {
      errors.address = { ...errors.address, [key]: `${label} is required` };
    }
  });
  if (!address?.zipCode) {
    errors.address = { ...errors.address, zipCode: "ZIP code is required" };
  }
};

const validateQualificationsFields = (qualifications, errors) => {
  if (!qualifications?.length) {
    errors.qualifications = "At least one qualification is required";
    return;
  }

  const currentYear = new Date().getFullYear();

  qualifications.forEach((qual, index) => {
    const addError = (field, msg) => {
      if (typeof errors.qualifications !== "object") errors.qualifications = {};
      errors.qualifications[index] = errors.qualifications[index] || {};
      errors.qualifications[index][field] = msg;
    };

    if (!qual.degree?.trim()) addError("degree", "Degree is required");
    if (!qual.institution?.trim()) addError("institution", "Institution is required");

    if (!qual.year) {
      addError("year", "Year is required");
    } else if (qual.year < 1900 || qual.year > currentYear) {
      addError("year", "Invalid year");
    }
  });
};

const validateAvailabilityFields = (availability, errors) => {
  if (!availability?.length) {
    errors.availability = "At least one availability day is required";
    return;
  }

  availability.forEach((slot, dayIdx) => {
    if (!slot.day) {
      setNestedError(errors, "availability", dayIdx, "day", "Day is required");
    }

    if (!slot.timeSlots?.length) {
      setNestedError(errors, "availability", dayIdx, "timeSlots", "At least one time slot is required");
      return;
    }

    slot.timeSlots.forEach((timeSlot, slotIdx) => {
      const addTimeError = (field, msg) => {
        if (!errors.availability || typeof errors.availability === "string") errors.availability = {};
        if (!errors.availability[dayIdx]) errors.availability[dayIdx] = {};
        if (!errors.availability[dayIdx].timeSlots) errors.availability[dayIdx].timeSlots = {};
        if (!errors.availability[dayIdx].timeSlots[slotIdx]) errors.availability[dayIdx].timeSlots[slotIdx] = {};
        errors.availability[dayIdx].timeSlots[slotIdx][field] = msg;
      };

      if (!timeSlot.startTime) {
        addTimeError("startTime", "Start time is required");
      } else if (!timeRegex.test(timeSlot.startTime)) {
        addTimeError("startTime", "Invalid time format (HH:MM)");
      }

      if (!timeSlot.endTime) {
        addTimeError("endTime", "End time is required");
      } else if (!timeRegex.test(timeSlot.endTime)) {
        addTimeError("endTime", "Invalid time format (HH:MM)");
      }

      if (timeSlot.startTime && timeSlot.endTime) {
        const start = parseInt(timeSlot.startTime.replace(":", ""));
        const end = parseInt(timeSlot.endTime.replace(":", ""));
        if (start >= end) addTimeError("timeLogic", "End time must be after start time");
      }
    });
  });
};

/**
 * Comprehensive teacher profile validation
 * @param {Object} data - Teacher profile data
 * @returns {{ isValid: boolean, errors: Object }}
 */
export const validateTeacherProfile = (data) => {
  const errors = {};

  if (!data.name?.trim()) errors.name = "Name is required";

  validateContactFields(data.contact, errors);
  validateAddressFields(data.address, errors);
  validateQualificationsFields(data.qualifications, errors);

  if (!data.preferredSubjects?.length) {
    errors.preferredSubjects = "At least one subject is required";
  }

  if (data.experience === undefined || data.experience === null) {
    errors.experience = "Experience is required";
  } else if (data.experience < 0) {
    errors.experience = "Experience cannot be negative";
  } else if (data.experience > 50) {
    errors.experience = "Experience cannot exceed 50 years";
  }

  if (data.hourlyRate === undefined || data.hourlyRate === null) {
    errors.hourlyRate = "Hourly rate is required";
  } else if (data.hourlyRate < 0) {
    errors.hourlyRate = "Hourly rate cannot be negative";
  } else if (data.hourlyRate > 10000) {
    errors.hourlyRate = "Hourly rate cannot exceed ₨10,000";
  }

  if (!data.teachingMode) {
    errors.teachingMode = "Teaching mode is required";
  } else if (!VALID_TEACHING_MODES.includes(data.teachingMode)) {
    errors.teachingMode = "Invalid teaching mode";
  }

  if (!data.bio?.trim()) errors.bio = "Bio is required";
  else if (data.bio.length < 50) errors.bio = "Bio must be at least 50 characters long";
  else if (data.bio.length > 1000) errors.bio = "Bio must be less than 1000 characters";

  validateAvailabilityFields(data.availability, errors);

  return { isValid: Object.keys(errors).length === 0, errors };
};
