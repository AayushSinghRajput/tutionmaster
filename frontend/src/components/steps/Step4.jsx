import React from 'react';
import { Clock, Star, AlertCircle } from 'lucide-react';
import AvailabilityPicker from '../teachers/AvailabilityPicker';

const Step4 = ({ 
  data, 
  errors, 
  formErrors,
  watchAvailability,
  isFormReady,
  onAvailabilityChange,
  register,
  setValue,
  availabilityPickerKey
}) => {
  return (
    <div className="space-y-8 w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Availability & Schedule
        </h2>
        <p className="text-gray-600 text-lg mt-3">
          Set your available days and times for teaching
        </p>
      </div>

      {/* Availability Picker */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
        <AvailabilityPicker
          key={availabilityPickerKey}
          value={watchAvailability || []}
          onChange={onAvailabilityChange}
          timeFormat="12h"
        />
        
        {/* Display specific availability errors */}
        {formErrors?.availability && typeof formErrors.availability === 'object' && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 font-semibold mb-2">
              Please fix the following time slot errors:
            </p>
            {Object.entries(formErrors.availability).map(([dayIndex, dayErrors]) => (
              <div key={dayIndex} className="mb-2">
                {Object.entries(dayErrors).map(([slotIndex, slotErrors]) => (
                  <div key={slotIndex} className="text-red-600 text-sm ml-4">
                    {slotErrors.startTime && (
                      <p>• Day {parseInt(dayIndex) + 1}, Slot {parseInt(slotIndex) + 1}: {slotErrors.startTime}</p>
                    )}
                    {slotErrors.endTime && (
                      <p>• Day {parseInt(dayIndex) + 1}, Slot {parseInt(slotIndex) + 1}: {slotErrors.endTime}</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        
        {/* Display simple availability error */}
        {formErrors?.availability && typeof formErrors.availability === 'string' && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 font-semibold flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {formErrors.availability}
            </p>
          </div>
        )}
      </div>

      {/* Manual Time Input Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
        <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
          <Clock className="w-6 h-6 text-blue-600 mr-3" />
          Add Custom Time Slot
        </h3>
        <p className="text-gray-600 text-lg mb-6">
          You can also add custom time slots manually
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="w-full">
            <label
              htmlFor="day-select"
              className="block text-lg font-bold text-gray-800 mb-3"
            >
              Day
            </label>
            <select
              id="day-select"
              className="w-full px-5 py-4 text-lg border-2 border-blue-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300"
            >
              <option value="">Select Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
          
          <div className="w-full">
            <label
              htmlFor="start-time"
              className="block text-lg font-bold text-gray-800 mb-3"
            >
              Start Time
            </label>
            <div className="relative">
              <input
                type="text"
                id="start-time"
                placeholder="HH:MM AM/PM"
                className="w-full px-5 py-4 text-lg border-2 border-blue-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 pr-16"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 font-semibold">
                12h
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Format: 09:00 AM or 2:30 PM
            </p>
          </div>
          
          <div className="w-full">
            <label
              htmlFor="end-time"
              className="block text-lg font-bold text-gray-800 mb-3"
            >
              End Time
            </label>
            <div className="relative">
              <input
                type="text"
                id="end-time"
                placeholder="HH:MM AM/PM"
                className="w-full px-5 py-4 text-lg border-2 border-blue-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 pr-16"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 font-semibold">
                12h
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Format: 05:00 PM or 11:30 AM
            </p>
          </div>
        </div>
        
        <button
          type="button"
          className="mt-6 w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-offset-2 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Add Time Slot
        </button>
      </div>

      {/* Final Call to Action */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-lg w-full">
        <Star className="w-12 h-12 mx-auto mb-4" />
        <h3 className="font-bold text-2xl mb-3">
          Ready to Complete Your Profile!
        </h3>
        <p className="text-green-100 text-lg">
          Review all your information before submitting. You can always
          come back and update your profile later to keep it current and
          engaging for students.
        </p>
      </div>
    </div>
  );
};

export default Step4;