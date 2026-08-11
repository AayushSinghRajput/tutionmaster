import React from 'react';
import { Clock } from 'lucide-react';

const TeacherAvailabilitySection = ({ availability = [] }) => {
  if (!availability || availability.length === 0) return null;

  return (
    <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Availability</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {availability.map((slot, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4">
            <h4 className="font-semibold text-gray-900 mb-3">{slot.day}</h4>
            <div className="space-y-2">
              {slot.timeSlots.map((timeSlot, timeIndex) => (
                <div key={timeIndex} className="flex items-center space-x-2 text-gray-700">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{timeSlot.startTime} - {timeSlot.endTime}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeacherAvailabilitySection;
