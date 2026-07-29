import { AlertCircle, Clock } from "lucide-react";
import AvailabilityPicker from "../teachers/AvailabilityPicker";

const AvailabilitySection = ({
  availabilityPickerKey,
  watchAvailability,
  onAvailabilityChange,
  formErrors,
}) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
    <AvailabilityPicker
      key={availabilityPickerKey}
      value={watchAvailability || []}
      onChange={onAvailabilityChange}
      timeFormat="12h"
    />

    {/* Detailed slot errors */}
    {formErrors?.availability &&
      typeof formErrors.availability === "object" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 font-semibold mb-2">
            Please fix the following time slot errors:
          </p>
          {Object.entries(formErrors.availability).map(
            ([dayIndex, dayErrors]) => (
              <div key={dayIndex} className="mb-2">
                {Object.entries(dayErrors).map(([slotIndex, slotErrors]) => (
                  <div key={slotIndex} className="text-red-600 text-sm ml-4">
                    {slotErrors.startTime && (
                      <p>
                        • Day {parseInt(dayIndex) + 1}, Slot{" "}
                        {parseInt(slotIndex) + 1}: {slotErrors.startTime}
                      </p>
                    )}
                    {slotErrors.endTime && (
                      <p>
                        • Day {parseInt(dayIndex) + 1}, Slot{" "}
                        {parseInt(slotIndex) + 1}: {slotErrors.endTime}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}

    {/* Simple string error */}
    {formErrors?.availability &&
      typeof formErrors.availability === "string" && (
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
