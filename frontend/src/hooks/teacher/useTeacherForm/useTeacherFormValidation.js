import { validateTeacherProfile } from "../../../utils/validation";
import { toast } from "react-toastify";

const useTeacherFormValidation = ({
  watchAvailability,
  watchSubjects,
  setFormErrors,
  setCurrentStep,
  avatarFile,
  cvFile,
  onSubmit,
}) => {
  const validateStep = async (currentStep, trigger) => {
    let valid = false;

    setFormErrors({});

    if (currentStep === 1) {
      const fieldsValid = await trigger([
        "name",
        "contact.email",
        "address.street",
        "address.state",
        "address.city",
      ]);

      if (!fieldsValid) return false;

      if (!avatarFile) {
        toast.error("Profile picture is required");

        return false;
      }

      valid = true;
    } else if (currentStep === 2) {
      const fieldsValid = await trigger(["qualifications"]);

      if (!fieldsValid) return false;

      if (!watchSubjects?.length) {
        setFormErrors({
          preferredSubjects: "At least one subject is required",
        });

        return false;
      }

      valid = true;
    } else if (currentStep === 3) {
      valid = await trigger([
        "experience",
        "monthlyRate",
        "teachingMode",
      ]);
      // bio is optional — only validate format if it has content
      const bioValid = await trigger(["bio"]);
      if (!bioValid) return false;
      valid = true;
    } else {
      const availability = watchAvailability || [];

      if (!availability.length) {
        setFormErrors({
          availability: "Please select at least one available day",
        });

        return false;
      }

      valid = true;
    }

    return valid;
  };

  const handleFormSubmit = async (data) => {
    if (!avatarFile) {
      toast.error("Profile picture is required");

      return;
    }

    const validation = validateTeacherProfile(data);

    if (Object.keys(validation.errors).length) {
      setFormErrors(validation.errors);

      return;
    }

    await onSubmit({
      ...data,

      avatarPublicId: avatarFile?.publicId || null,

      cvPublicId: cvFile?.publicId || null,
    });
  };

  return {
    validateStep,

    handleFormSubmit,
  };
};

export default useTeacherFormValidation;
