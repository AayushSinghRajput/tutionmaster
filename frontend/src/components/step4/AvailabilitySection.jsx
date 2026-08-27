import { AlertCircle } from "lucide-react";
import AvailabilityPicker from "../teachers/AvailabilityPicker";

const AvailabilitySection = ({
  availabilityPickerKey,
  watchAvailability,
  onAvailabilityChange,
  formErrors,
}) => (
  <div className="bg-gradient-to-br from-brand-50 to-stone-100 rounded-2xl p-4 sm:p-8 border border-brand-200 w-full overflow-hidden">
    <AvailabilityPicker
      key={availabilityPickerKey}
      value={watchAvailability || []}
      onChange={onAvailabilityChange}
    />

    {formErrors?.availability && typeof formErrors.availability === "string" && (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
        <p className="text-red-600 font-semibold flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {formErrors.availability}
        </p>
      </div>
    )}
  </div>
);

export default AvailabilitySection;