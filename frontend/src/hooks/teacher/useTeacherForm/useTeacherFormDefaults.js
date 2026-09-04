import { useEffect } from "react";

// Default days pre-selected: Mon–Fri + Sunday (Saturday excluded)
const DEFAULT_AVAILABILITY_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday",
];

/**
 * Transforms availability stored in DB (array of {day, timeSlots} objects,
 * or an array of day-name strings) into the new simplified string[] format.
 */
const transformAvailability = (availability = []) => {
  if (!Array.isArray(availability) || availability.length === 0) {
    return DEFAULT_AVAILABILITY_DAYS;
  }

  // New format: already a string array
  if (typeof availability[0] === "string") {
    return availability;
  }

  // Old format: [{day, timeSlots}] — extract just the day names
  return availability.map((slot) => slot.day).filter(Boolean);
};

const useTeacherFormDefaults = ({
  initialData,
  reset,
  setAvatarFile,
  setCvFile,
  setSelectedState,
  setIsFormReady,
}) => {
  useEffect(() => {
    if (!initialData) return;

    const formData = {
      name: initialData.name || "",

      contact: {
        email: initialData.contact?.email || "",
        phone: initialData.contact?.phone || "",
      },

      address: {
        street: initialData.address?.street || "",
        city: initialData.address?.city || "",
        state: initialData.address?.state || "",
      },

      qualifications:
        initialData.qualifications || [
          {
            degree: "",
            institution: "",
          },
        ],

      preferredSubjects: initialData.preferredSubjects || [],

      bio: initialData.bio || "",

      monthlyRate:
        initialData.monthlyRate ||
        (initialData.hourlyRate ? initialData.hourlyRate * 20 : 8000),

      hourlyRate: initialData.hourlyRate || 0,

      teachingMode: initialData.teachingMode || "Both",

      availability: transformAvailability(initialData.availability),
    };

    reset(formData);

    if (initialData.avatarPublicId) {
      setAvatarFile({
        publicId: initialData.avatarPublicId,
        url: initialData.avatarUrl,
      });
    }

    if (initialData.cvPublicId) {
      setCvFile({
        publicId: initialData.cvPublicId,
        url: initialData.cvUrl,
      });
    }

    if (initialData.address?.state) {
      setSelectedState(initialData.address.state);
    }

    setIsFormReady(true);
  }, [initialData]);
};

export default useTeacherFormDefaults;