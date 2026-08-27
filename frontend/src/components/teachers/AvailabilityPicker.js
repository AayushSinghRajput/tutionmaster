import { Calendar, Check } from "lucide-react";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Days selected by default (Mon–Fri; Saturday is deselected)
const DEFAULT_SELECTED_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday",
];

/**
 * AvailabilityPicker
 *
 * Simplified day-only selector. No time slots.
 *
 * `value` shape: string[]  — array of selected day names,
 *   e.g. ["Monday", "Tuesday", "Friday"]
 *
 * `onChange` receives the updated string[] array.
 */
const AvailabilityPicker = ({ value = [], onChange }) => {
  const toggleDay = (day) => {
    const isSelected = value.includes(day);
    const updated = isSelected
      ? value.filter((d) => d !== day)
      : [...value, day];
    onChange(updated);
  };

  const selectedCount = value.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h3 className="font-bold text-lg sm:text-xl flex items-center">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-brand-600 shrink-0" />
          Weekly Availability
        </h3>

        <div className="bg-brand-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap font-medium text-brand-700">
          {selectedCount} {selectedCount === 1 ? "day" : "days"} selected
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Select the days you are available for teaching. You can update this
        anytime from your dashboard.
      </p>

      {/* Day Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {DAYS_OF_WEEK.map((day) => {
          const isSelected = value.includes(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`
                relative p-4 rounded-2xl border-2 flex items-center justify-between
                transition-all duration-200 font-medium text-sm sm:text-base
                ${
                  isSelected
                    ? "border-brand-500 bg-brand-50 text-brand-700 shadow-sm"
                    : "border-stone-200 bg-white text-gray-600 hover:border-brand-300 hover:bg-brand-50/40"
                }
              `}
            >
              <span>{day}</span>

              <span
                className={`
                  w-5 h-5 rounded-full flex items-center justify-center shrink-0
                  transition-all duration-200
                  ${isSelected ? "bg-brand-500" : "bg-stone-200"}
                `}
              >
                {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </span>
            </button>
          );
        })}
      </div>

      {/* Helper note */}
      {selectedCount === 0 && (
        <p className="text-amber-600 text-sm font-medium flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 shrink-0" />
          Please select at least one available day.
        </p>
      )}
    </div>
  );
};

export default AvailabilityPicker;