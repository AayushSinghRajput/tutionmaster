export const formatExperience = (years) => {
  if (years === 0) return "No experience";
  if (years === 1) return "1 year";
  return `${years} years`;
};

export const formatAvailability = (availability) => {
  if (!availability || availability.length === 0) return "Not specified";

  return availability
    .map(
      (item) =>
        `${item.day}: ${item.timeSlots
          .map((slot) => `${slot.startTime} - ${slot.endTime}`)
          .join(", ")}`,
    )
    .join("; ");
};

export const validateFile = (file, maxSize, allowedTypes) => {
  if (file.size > maxSize) {
    return `File size must be less than ${maxSize / (1024 * 1024)}MB`;
  }

  if (!allowedTypes.includes(file.type)) {
    return `File type must be ${allowedTypes.join(", ")}`;
  }

  return null;
};

// Convert 24-hour time to 12-hour AM/PM format
export const convertTo12Hour = (time24) => {
  if (!time24 || typeof time24 !== "string") return time24;

  const cleanTime = time24.trim();

  // Already AM/PM
  if (/am|pm/i.test(cleanTime)) {
    return formatTimeToAMPM(cleanTime);
  }

  const match = cleanTime.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return time24;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);

  if (hours > 23 || minutes > 59) return time24;

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// Normalize any time input into "hh:mm AM/PM"
export const formatTimeToAMPM = (timeStr) => {
  if (!timeStr || typeof timeStr !== "string") return timeStr;

  const cleanTime = timeStr.trim().replace(/\s+/g, " ");

  const match = cleanTime.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (match) {
    const h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    if (h < 1 || h > 12 || m > 59) return timeStr;
    return `${h}:${m.toString().padStart(2, "0")} ${match[3].toUpperCase()}`;
  }

  return convertTo12Hour(cleanTime);
};
