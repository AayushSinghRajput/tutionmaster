import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { SUBJECTS, TEACHING_MODES, NEPAL_STATES } from "../../utils/constants";
import { validateTeacherProfile } from "../../utils/validation";
import {
  Save,
  X,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  User,
  BookOpen,
  Clock,
  CheckCircle,
} from "lucide-react";
import Step1 from "../steps/Step1";
import Step2 from "../steps/Step2";
import Step3 from "../steps/Step3";
import Step4 from "../steps/Step4";

const TeacherForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  submitButtonText = "Save Profile",
  cancelButtonText = "Cancel",
  isEdit = false,
  className = "",
}) => {
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
      contact: {
        email: "",
        phone: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      qualifications: [
        {
          degree: "",
          institution: "",
          year: new Date().getFullYear(),
        },
      ],
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
  } = useFieldArray({
    control,
    name: "qualifications",
  });

  const watchSubjects = watch("preferredSubjects", []);
  const watchAvailability = watch("availability", []);
  const watchBio = watch("bio", "");
  const watchState = watch("address.state");

  // Move availabilityPickerKey declaration HERE (after watchAvailability)
  const availabilityPickerKey = `availability-${watchAvailability?.length}-${isFormReady}`;

  // Initialize form with data
  useEffect(() => {
    if (initialData && !isFormReady) {
      console.log("🔄 INITIALIZING FORM WITH DATA:", initialData);

      // Transform availability data to ensure proper structure
      const transformedAvailability =
        initialData.availability?.map((daySlot) => ({
          day: daySlot.day,
          timeSlots:
            daySlot.timeSlots?.map((timeSlot) => {
              let startTime = timeSlot.startTime;
              let endTime = timeSlot.endTime;

              // Convert 24-hour format to 12-hour AM/PM if needed
              if (
                startTime.includes(":") &&
                !startTime.includes("AM") &&
                !startTime.includes("PM")
              ) {
                startTime = convertTo12Hour(startTime);
              }
              if (
                endTime.includes(":") &&
                !endTime.includes("AM") &&
                !endTime.includes("PM")
              ) {
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
          {
            degree: "",
            institution: "",
            year: new Date().getFullYear(),
          },
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
        console.log("✅ FORM INITIALIZATION COMPLETE");
      }, 100);
    }
  }, [initialData, reset, setValue, isFormReady]);

  // Helper function to convert 24-hour to 12-hour format
  const convertTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Update available cities when state changes
  useEffect(() => {
    if (watchState) {
      const state = NEPAL_STATES.find((s) => s.name === watchState);
      setAvailableCities(state ? state.cities : []);
      setSelectedState(watchState);
    } else {
      setAvailableCities([]);
    }
  }, [watchState, setValue]);

  const handleFormSubmit = async (data) => {
    try {
      console.log("📤 FORM SUBMISSION DATA:", data);
      console.log("📅 AVAILABILITY BEING SUBMITTED:", data.availability);

      // Clean and transform the data before validation
      const cleanedData = {
        ...data,
        // Ensure availability has proper structure
        availability: data.availability.map((daySlot) => ({
          day: daySlot.day,
          timeSlots: daySlot.timeSlots.map((timeSlot) => ({
            startTime: formatTimeToAMPM(timeSlot.startTime),
            endTime: formatTimeToAMPM(timeSlot.endTime),
          })),
        })),
        // Ensure numeric fields are numbers
        experience: Number(data.experience),
        hourlyRate: Number(data.hourlyRate),
        // Ensure qualifications years are numbers
        qualifications: data.qualifications.map((qual) => ({
          ...qual,
          year: Number(qual.year),
        })),
        // Ensure zipCode is number
        address: {
          ...data.address,
          zipCode: Number(data.address.zipCode),
        },
      };

      console.log("🧹 CLEANED DATA FOR VALIDATION:", cleanedData);

      const validation = validateTeacherProfile(cleanedData);

      if (!validation.isValid) {
        console.log("❌ VALIDATION ERRORS:", validation.errors);
        setFormErrors(validation.errors);

        // Navigate to the step with errors
        if (
          validation.errors.name ||
          validation.errors.contact ||
          validation.errors.address
        ) {
          setCurrentStep(1);
        } else if (
          validation.errors.qualifications ||
          validation.errors.preferredSubjects
        ) {
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

  // Helper function to ensure time is in proper AM/PM format
  const formatTimeToAMPM = (timeStr) => {
    if (!timeStr) return timeStr;

    // If already in AM/PM format, return as uppercase
    if (timeStr.includes("AM") || timeStr.includes("PM")) {
      return timeStr.toUpperCase();
    }

    // If in 24-hour format, convert to 12-hour AM/PM
    if (
      timeStr.includes(":") &&
      !timeStr.includes("AM") &&
      !timeStr.includes("PM")
    ) {
      return convertTo12Hour(timeStr);
    }

    return timeStr;
  };

  const handleAvatarUpload = (fileData) => {
    setAvatarFile(fileData);
  };

  const handleAvatarRemove = () => {
    setAvatarFile(null);
  };

  const handleCVUpload = (fileData) => {
    setCvFile(fileData);
  };

  const handleCVRemove = () => {
    setCvFile(null);
  };

  const addQualification = () => {
    appendQualification({
      degree: "",
      institution: "",
      year: new Date().getFullYear(),
    });
  };

  const handleSubjectToggle = (subject) => {
    const currentSubjects = watchSubjects || [];
    const updatedSubjects = currentSubjects.includes(subject)
      ? currentSubjects.filter((s) => s !== subject)
      : [...currentSubjects, subject];

    setValue("preferredSubjects", updatedSubjects);
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setValue("address.state", newState);
    setSelectedState(newState);
  };

  const handleCityChange = (e) => {
    setValue("address.city", e.target.value);
  };

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
      isValid = await trigger([
        "experience",
        "hourlyRate",
        "teachingMode",
        "bio",
      ]);
    } else {
      const availability = watchAvailability || [];
      console.log("🔍 CHECKING AVAILABILITY FOR VALIDATION:", availability);

      // Check if availability has at least one day with time slots
      isValid =
        availability.length > 0 &&
        availability.some((day) => day.timeSlots && day.timeSlots.length > 0);

      if (!isValid) {
        setFormErrors((prev) => ({
          ...prev,
          availability: "Please set at least one availability time slot",
        }));
      } else {
        // Validate individual time slots
        const timeSlotErrors = {};
        availability.forEach((daySlot, index) => {
          daySlot.timeSlots.forEach((timeSlot, slotIndex) => {
            const startTime = formatTimeToAMPM(timeSlot.startTime);
            const endTime = formatTimeToAMPM(timeSlot.endTime);

            if (!/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(startTime)) {
              if (!timeSlotErrors[index]) timeSlotErrors[index] = {};
              timeSlotErrors[index][slotIndex] = {
                startTime: "Start time must be in HH:MM AM/PM format",
              };
            }

            if (!/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(endTime)) {
              if (!timeSlotErrors[index]) timeSlotErrors[index] = {};
              if (!timeSlotErrors[index][slotIndex])
                timeSlotErrors[index][slotIndex] = {};
              timeSlotErrors[index][slotIndex].endTime =
                "End time must be in HH:MM AM/PM format";
            }
          });
        });

        if (Object.keys(timeSlotErrors).length > 0) {
          setFormErrors((prev) => ({
            ...prev,
            availability: timeSlotErrors,
          }));
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

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const steps = [
    {
      number: 1,
      title: "Basic Info",
      description: "Personal details",
      icon: User,
    },
    {
      number: 2,
      title: "Qualifications",
      description: "Education & subjects",
      icon: GraduationCap,
    },
    {
      number: 3,
      title: "Teaching Details",
      description: "Experience & bio",
      icon: BookOpen,
    },
    {
      number: 4,
      title: "Availability",
      description: "Schedule setup",
      icon: Clock,
    },
  ];

  // Show loading until form is ready
  if (!isFormReady && isEdit) {
    return (
      <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
        <div className="p-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading form data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden ${className}`}
    >
      {/* Enhanced Progress Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-10 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isEdit ? "Update Teacher Profile" : "Create Teacher Profile"}
              </h1>
              <p className="text-blue-100 text-lg mt-1">
                {isEdit
                  ? "Update your teaching profile"
                  : "Join our community of expert educators"}
              </p>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-2xl px-6 py-3 backdrop-blur-sm">
            <span className="text-white font-bold text-lg">
              Step {currentStep} of {steps.length}
            </span>
          </div>
        </div>

        {/* Enhanced Progress Steps */}
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div key={step.number} className="flex items-center flex-1 z-10">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 transform ${
                      isCompleted
                        ? "bg-green-500 text-white shadow-lg scale-110"
                        : isCurrent
                          ? "bg-white text-blue-600 shadow-2xl scale-110 border-2 border-blue-200"
                          : "bg-white bg-opacity-20 text-white border-2 border-white border-opacity-30"
                    }`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <div className="mt-3">
                    <div
                      className={`font-bold text-sm transition-colors duration-300 ${
                        isCompleted || isCurrent
                          ? "text-white"
                          : "text-blue-200"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div
                      className={`text-xs transition-colors duration-300 mt-1 ${
                        isCompleted || isCurrent
                          ? "text-blue-100"
                          : "text-blue-300"
                      }`}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 relative">
                    <div
                      className={`h-1 rounded-full transition-all duration-500 ${
                        isCompleted ? "bg-green-400" : "bg-white bg-opacity-30"
                      }`}
                    ></div>
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-400 absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 rounded-full" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Form Errors */}
      {Object.keys(formErrors).length > 0 && (
        <div className="mx-10 mt-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-4 shadow-sm">
          <AlertCircle className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-bold text-red-800 text-lg">
              Please fix the following errors:
            </div>
            <ul className="mt-2 text-red-700 space-y-1">
              {Object.entries(formErrors).map(([key, error]) => (
                <li key={key} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span>
                    {typeof error === "object"
                      ? JSON.stringify(error, null, 2)
                      : error}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-10">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Step1
            data={{
              name: watch("name"),
              contact: watch("contact"),
              address: watch("address"),
            }}
            errors={errors}
            formErrors={formErrors}
            register={register}
            watch={watch}
            avatarFile={avatarFile}
            availableCities={availableCities}
            selectedState={selectedState}
            onAvatarUpload={handleAvatarUpload}
            onAvatarRemove={handleAvatarRemove}
            onStateChange={handleStateChange}
            onCityChange={handleCityChange}
            NEPAL_STATES={NEPAL_STATES}
          />
        )}

        {/* Step 2: Qualifications */}
        {currentStep === 2 && (
          <Step2
            data={{
              qualifications: watch("qualifications"),
              preferredSubjects: watchSubjects,
            }}
            errors={errors}
            formErrors={formErrors}
            qualificationFields={qualificationFields}
            watchSubjects={watchSubjects}
            cvFile={cvFile}
            onCVUpload={handleCVUpload}
            onCVRemove={handleCVRemove}
            onSubjectToggle={handleSubjectToggle}
            onQualificationAdd={addQualification}
            onQualificationRemove={removeQualification}
            register={register}
            SUBJECTS={SUBJECTS}
          />
        )}

        {/* Step 3: Teaching Details */}
        {currentStep === 3 && (
          <Step3
            data={{
              experience: watch("experience"),
              hourlyRate: watch("hourlyRate"),
              teachingMode: watch("teachingMode"),
              bio: watchBio,
            }}
            errors={errors}
            formErrors={formErrors}
            watchBio={watchBio}
            register={register}
            watch={watch}
            TEACHING_MODES={TEACHING_MODES}
          />
        )}

        {/* Step 4: Availability */}
        {currentStep === 4 && (
          <Step4
            data={{
              availability: watchAvailability,
            }}
            errors={errors}
            formErrors={formErrors}
            watchAvailability={watchAvailability}
            isFormReady={isFormReady}
            onAvailabilityChange={(availability) => {
              console.log("🔄 Availability changed:", availability);
              setValue("availability", availability, {
                shouldValidate: true,
              });
            }}
            register={register}
            setValue={setValue}
            availabilityPickerKey={availabilityPickerKey}
          />
        )}

        {/* Enhanced Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-blue-200 w-full">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center space-x-3 px-8 py-4 text-gray-700 border-2 border-blue-300 rounded-2xl hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 font-bold text-lg shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
                <span>Previous</span>
              </button>
            )}
          </div>

          <div className="flex space-x-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex items-center space-x-3 px-8 py-4 text-gray-700 border-2 border-gray-400 rounded-2xl hover:bg-gray-50 hover:border-gray-500 transition-all duration-300 font-bold text-lg shadow-sm"
              >
                <X className="w-6 h-6" />
                <span>{cancelButtonText}</span>
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-offset-2 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Next Step</span>
                <ChevronRight className="w-6 h-6" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Save className="w-6 h-6" />
                <span>
                  {isSubmitting ? "Creating Profile..." : submitButtonText}
                </span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeacherForm;
