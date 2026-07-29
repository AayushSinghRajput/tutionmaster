import { Clock } from "lucide-react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CustomTimeSlotSection = () => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
    <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
      <Clock className="w-6 h-6 text-blue-600 mr-3" />
      Add Custom Time Slot
    </h3>
    <p className="text-gray-600 text-lg mb-6">
      You can also add custom time slots manually
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* Day selector */}
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
          {DAYS.map((day) => (
            <option key={day} value={day.toLowerCase()}>
              {day}
            </option>
          ))}
        </select>
      </div>

      {/* Start Time */}
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
        <p className="mt-2 text-sm text-gray-500">Format: 09:00 AM or 2:30 PM</p>
      </div>

      {/* End Time */}
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
        <p className="mt-2 text-sm text-gray-500">Format: 05:00 PM or 11:30 AM</p>
      </div>
    </div>

    <button
      type="button"
      className="mt-6 w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-offset-2 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      Add Time Slot
    </button>
  </div>
);

export default CustomTimeSlotSection;
