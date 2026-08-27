import { Calendar } from 'lucide-react';

const AvailabilitySection = ({ availability }) => {
  if (!availability || availability.length === 0) return null;

  // New format: string[] of day names
  const isStringArray = typeof availability[0] === 'string';

  return (
    <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Availability</h2>
      {isStringArray ? (
        <div className="flex flex-wrap gap-2">
          {availability.map((day, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 border border-brand-200 text-brand-700 rounded-lg text-sm font-medium"
            >
              <Calendar className="w-3.5 h-3.5" />
              {day}
            </span>
          ))}
        </div>
      ) : (
        // Legacy format: [{day, timeSlots}]
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {availability.map((slot, index) => (
            <div key={index} className="border border-stone-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">{slot.day}</h4>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AvailabilitySection;