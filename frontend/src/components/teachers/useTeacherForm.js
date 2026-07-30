import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { NEPAL_STATES } from "../../utils/constants";
import { validateTeacherProfile } from "../../utils/validation";

// ---------------------------------------------------------------------------
// Helper: convert 24-hour time string to 12-hour AM/PM
// ---------------------------------------------------------------------------
const convertTo12Hour = (time24) => {
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// ---------------------------------------------------------------------------
// Helper: ensure a time string is in proper AM/PM format
// ---------------------------------------------------------------------------
const formatTimeToAMPM = (timeStr) => {
  if (!timeStr) return timeStr;
  if (timeStr.includes("AM") || timeStr.includes("PM")) {
    return timeStr.toUpperCase();
  }
  if (timeStr.includes(":") && !timeStr.includes("AM") && !timeStr.includes("PM")) {
    return convertTo12Hour(timeStr);
  }
  return timeStr;
};

// ---------------------------------------------------------------------------
// Custom hook – encapsulates all TeacherForm state & business logic
// ---------------------------------------------------------------------------
const useTeacherForm = ({ initialData, onSubmit, isEdit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const [isFormReady, setIsFormReady] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      contact: { email: "", phone: "" },
      address: { street: "", city: "", state: "", zipCode: "" },
      qualifications: [{ degree: "", institution: "", year: new Date().getFullYear() }],
      preferredSubjects: [],
      bio: "",
      experience: 0,
      hourlyRate: 0,
      teachingMode: "Both",
      availability: [],
    },
  });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({ control, name: "qualifications" });

  const watchSubjects = watch("preferredSubjects", []);
  const watchAvailability = watch("availability", []);
  const watchBio = watch("bio", "");
  const watchState = watch("address.state");

  const availabilityPickerKey = `availability-${watchAvailability?.length}-${isFormReady}`;

  // Initialize form with server data (edit mode)
  useEffect(() => {
    if (initialData && !isFormReady) {
      console.log("🔄 INITIALIZING FORM WITH DATA:", initialData);

      const transformedAvailability =
        initialData.availability?.map((daySlot) => ({
          day: daySlot.day,
          timeSlots: daySlot.timeSlots?.map((timeSlot) => {
            let startTime = timeSlot.startTime;
            let endTime = timeSlot.endTime;
            if (startTime.includes(":") && !startTime.includes("AM") && !startTime.includes("PM")) {
              startTime = convertTo12Hour(startTime);
            }
            if (endTime.includes(":") && !endTime.includes("AM") && !endTime.includes("PM")) {
              endTime = convertTo12Hour(endTime);
            }
            return {
              startTime: startTime.toUpperCase(),
              endTime: endTime.toUpperCase(),
            };
          }) || [],
        })) || [];

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
          zipCode: initialData.address?.zipCode || "",
        },
        qualifications: initialData.qualifications || [
          { degree: "", institution: "", year: new Date().getFullYear() },
        ],
        preferredSubjects: initialData.preferredSubjects || [],
        bio: initialData.bio || "",
        experience: initialData.experience || 0,
        hourlyRate: initialData.hourlyRate || 0,
        teachingMode: initialData.teachingMode || "Both",
        availability: transformedAvailability,
      };

      console.log("📅 FORM DATA WITH TRANSFORMED AVAILABILITY:", formData);
      reset(formData);

      setTimeout(() => {
        if (initialData.avatarPublicId) {
          setAvatarFile({ publicId: initialData.avatarPublicId, url: initialData.avatarUrl });
        }
        if (initialData.cvPublicId) {
          setCvFile({ publicId: initialData.cvPublicId, url: initialData.cvUrl });
        }
        if (initialData.address?.state) {
          setSelectedState(initialData.address.state);
        }
        setIsFormReady(true);
        console.log("✅ FORM INITIALIZATION COMPLETE");
      }, 100);
    }
  }, [initialData, reset, setValue, isFormReady]);

  // Sync available cities when state changes
  useEffect(() => {
    if (watchState) {
      const state = NEPAL_STATES.find((s) => s.name === watchState);
      setAvailableCities(state ? state.cities : []);
      setSelectedState(watchState);
    } else {
      setAvailableCities([]);
    }
  }, [watchState, setValue]);

  // ------------------------------------------------------------------
  // File handlers
  // ------------------------------------------------------------------
  const handleAvatarUpload = (fileData) => setAvatarFile(fileData);
  const handleAvatarRemove = () => setAvatarFile(null);
  const handleCVUpload = (fileData) => setCvFile(fileData);
  const handleCVRemove = () => setCvFile(null);

  // ------------------------------------------------------------------
  // Qualification handlers
  // ------------------------------------------------------------------
  const addQualification = () =>
    appendQualification({ degree: "", institution: "", year: new Date().getFullYear() });

  // ------------------------------------------------------------------
  // Subject handler
  // ------------------------------------------------------------------
  const handleSubjectToggle = (subject) => {
    const currentSubjects = watchSubjects || [];
    const updatedSubjects = currentSubjects.includes(subject)
      ? currentSubjects.filter((s) => s !== subject)
      : [...currentSubjects, subject];
    setValue("preferredSubjects", updatedSubjects);
  };

  // ------------------------------------------------------------------
  // Address handlers
  // ------------------------------------------------------------------
  const handleStateChange = (e) => {
    const newState = e.target.value;
    setValue("address.state", newState);
    setSelectedState(newState);
  };

  const handleCityChange = (e) => {
    setValue("address.city", e.target.value);
  };

  // ------------------------------------------------------------------
  // Availability handler
  // ------------------------------------------------------------------
  const handleAvailabilityChange = (availability) => {
    console.log("🔄 Availability changed:", availability);
    setValue("availability", availability, { shouldValidate: true });
  };

  // ------------------------------------------------------------------
  // Step navigation
  // ------------------------------------------------------------------
  const nextStep = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger([
        "name",
        "contact.email",
        "contact.phone",
        "address.street",
        "address.state",
        "address.city",
        "address.zipCode",
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger(["qualifications", "preferredSubjects"]);
    } else if (currentStep === 3) {
      isValid = await trigger(["experience", "hourlyRate", "teachingMode", "bio"]);
    } else {
      const availability = watchAvailability || [];
      console.log("🔍 CHECKING AVAILABILITY FOR VALIDATION:", availability);

      isValid =
        availability.length > 0 &&
        availability.some((day) => day.timeSlots && day.timeSlots.length > 0);

      if (!isValid) {
        setFormErrors((prev) => ({
          ...prev,
          availability: "Please set at least one availability time slot",
        }));
      } else {
        const timeSlotErrors = {};
        availability.forEach((daySlot, index) => {
          daySlot.timeSlots.forEach((timeSlot, slotIndex) => {
            const startTime = formatTimeToAMPM(timeSlot.startTime);
            const endTime = formatTimeToAMPM(timeSlot.endTime);

            if (!/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(startTime)) {
              if (!timeSlotErrors[index]) timeSlotErrors[index] = {};
              timeSlotErrors[index][slotIndex] = { startTime: "Start time must be in HH:MM AM/PM format" };
            }

            if (!/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(endTime)) {
              if (!timeSlotErrors[index]) timeSlotErrors[index] = {};
              if (!timeSlotErrors[index][slotIndex]) timeSlotErrors[index][slotIndex] = {};
              timeSlotErrors[index][slotIndex].endTime = "End time must be in HH:MM AM/PM format";
            }
          });
        });

        if (Object.keys(timeSlotErrors).length > 0) {
          setFormErrors((prev) => ({ ...prev, availability: timeSlotErrors }));
          isValid = false;
        }
      }
    }

    if (isValid) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.availability;
        return newErrors;
      });
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // ------------------------------------------------------------------
  // Form submission
  // ------------------------------------------------------------------
  const handleFormSubmit = async (data) => {
    try {
      console.log("📤 FORM SUBMISSION DATA:", data);
      console.log("📅 AVAILABILITY BEING SUBMITTED:", data.availability);

      const cleanedData = {
        ...data,
        availability: data.availability.map((daySlot) => ({
          day: daySlot.day,
          timeSlots: daySlot.timeSlots.map((timeSlot) => ({
            startTime: formatTimeToAMPM(timeSlot.startTime),
            endTime: formatTimeToAMPM(timeSlot.endTime),
          })),
        })),
        experience: Number(data.experience),
        hourlyRate: Number(data.hourlyRate),
        qualifications: data.qualifications.map((qual) => ({
          ...qual,
          year: Number(qual.year),
        })),
        address: { ...data.address, zipCode: Number(data.address.zipCode) },
      };

      console.log("🧹 CLEANED DATA FOR VALIDATION:", cleanedData);

      const validation = validateTeacherProfile(cleanedData);

      if (!validation.isValid) {
        console.log("❌ VALIDATION ERRORS:", validation.errors);
        setFormErrors(validation.errors);

        if (validation.errors.name || validation.errors.contact || validation.errors.address) {
          setCurrentStep(1);
        } else if (validation.errors.qualifications || validation.errors.preferredSubjects) {
          setCurrentStep(2);
        } else if (
          validation.errors.bio ||
          validation.errors.experience ||
          validation.errors.hourlyRate ||
          validation.errors.teachingMode
        ) {
          setCurrentStep(3);
        } else if (validation.errors.availability) {
          setCurrentStep(4);
        }
        return;
      }

      setFormErrors({});

      const submitData = {
        ...cleanedData,
        avatarPublicId: avatarFile?.publicId || null,
        cvPublicId: cvFile?.publicId || null,
      };

      console.log("✅ FINAL SUBMIT DATA:", submitData);
      await onSubmit(submitData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return {
    // form state
    currentStep,
    formErrors,
    avatarFile,
    cvFile,
    selectedState,
    availableCities,
    isFormReady,
    // react-hook-form
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    isSubmitting,
    // field array
    qualificationFields,
    removeQualification,
    // watched values
    watchSubjects,
    watchAvailability,
    watchBio,
    availabilityPickerKey,
    // handlers
    handleAvatarUpload,
    handleAvatarRemove,
    handleCVUpload,
    handleCVRemove,
    addQualification,
    handleSubjectToggle,
    handleStateChange,
    handleCityChange,
    handleAvailabilityChange,
    nextStep,
    prevStep,
    handleFormSubmit,
  };
};

export default useTeacherForm;
