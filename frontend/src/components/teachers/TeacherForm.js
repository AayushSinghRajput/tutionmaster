import { TEACHING_MODES, NEPAL_STATES } from "../../utils/constants";
import Step1 from "../steps/Step1";
import Step2 from "../steps/Step2";
import Step3 from "../steps/Step3";
import Step4 from "../steps/Step4";
import FormLoadingSpinner from "./FormLoadingSpinner";
import FormProgressHeader from "./FormProgressHeader";
import FormErrorBanner from "./FormErrorBanner";
import FormNavigation from "./FormNavigation";
import useTeacherForm from "../../hooks/teacher/useTeacherForm";
import STEPS from "./formSteps";

const TeacherForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  submitButtonText = "Save Profile",
  cancelButtonText = "Cancel",
  isEdit = false,
  className = "",
}) => {
  const {
    currentStep,
    isNavigating,
    formErrors,
    avatarFile,
    cvFile,
    selectedState,
    availableCities,
    isFormReady,
    register,
    handleSubmit,
    watch,
    errors,
    isSubmitting,
    qualificationFields,
    removeQualification,
    watchSubjects,
    watchAvailability,
    availabilityPickerKey,
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
  } = useTeacherForm({ initialData, onSubmit, isEdit });

  if (!isFormReady && isEdit) {
    return <FormLoadingSpinner />;
  }



  return (
    <div
      className={`w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-brand-100 overflow-hidden ${className}`}
    >
      <FormProgressHeader
        isEdit={isEdit}
        currentStep={currentStep}
        steps={STEPS}
      />

      <FormErrorBanner formErrors={formErrors} />

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
            value={watchSubjects}
            onChange={handleSubjectToggle}
          />
        )}

        {/* Step 3: Teaching Details */}
        {currentStep === 3 && (
          <Step3
            data={{
              experience: watch("experience"),
              hourlyRate: watch("hourlyRate"),
              teachingMode: watch("teachingMode"),
              bio: watch("bio"),
            }}
            errors={errors}
            formErrors={formErrors}
            register={register}
            watch={watch}
            TEACHING_MODES={TEACHING_MODES}
          />
        )}

        {/* Step 4: Availability */}
        {currentStep === 4 && (
          <Step4
            data={{ availability: watchAvailability }}
            errors={errors}
            formErrors={formErrors}
            watchAvailability={watchAvailability}
            isFormReady={isFormReady}
            onAvailabilityChange={handleAvailabilityChange}
            register={register}
            availabilityPickerKey={availabilityPickerKey}
          />
        )}

        <FormNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          isSubmitting={isSubmitting}
          isNavigating={isNavigating}
          submitButtonText={submitButtonText}
          cancelButtonText={cancelButtonText}
          onPrev={prevStep}
          onNext={nextStep}
          onCancel={onCancel}
        />
      </form>
    </div>
  );
};

export default TeacherForm;
