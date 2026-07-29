import StepHeader from "../step4/StepHeader";
import AvailabilitySection from "../step4/AvailabilitySection";
import CustomTimeSlotSection from "../step4/CustomTimeSlotSection";
import ProfileReadyBanner from "../step4/ProfileReadyBanner";

const Step4 = ({
  data,
  errors,
  formErrors,
  watchAvailability,
  isFormReady,
  onAvailabilityChange,
  register,
  setValue,
  availabilityPickerKey,
}) => {
  return (
    <div className="space-y-8 w-full">
      <StepHeader
        title="Availability &amp; Schedule"
        subtitle="Set your available days and times for teaching"
      />

      <AvailabilitySection
        availabilityPickerKey={availabilityPickerKey}
        watchAvailability={watchAvailability}
        onAvailabilityChange={onAvailabilityChange}
        formErrors={formErrors}
      />

      <CustomTimeSlotSection />

      <ProfileReadyBanner />
    </div>
  );
};

export default Step4;