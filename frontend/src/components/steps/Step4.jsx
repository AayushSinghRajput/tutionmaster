import StepHeader from "../step4/StepHeader";
import AvailabilitySection from "../step4/AvailabilitySection";

const Step4 = ({
  formErrors,
  watchAvailability,
  onAvailabilityChange,
  availabilityPickerKey,
}) => {
  return (
    <div className="space-y-6 sm:space-y-8 w-full">
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
    </div>
  );
};

export default Step4;