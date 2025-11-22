import { useState, useEffect } from 'react';
import { Clock, Plus, Trash2, AlertCircle } from 'lucide-react';

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00'
];

const AvailabilityPicker = ({ value = [], onChange }) => {
  const [expandedDay, setExpandedDay] = useState(null);

  // Debug effect to see what data is received
  useEffect(() => {
    console.log("📅 AvailabilityPicker received value:", value);
    console.log("📊 AvailabilityPicker data length:", value.length);
    if (value.length > 0) {
      console.log("🔍 First availability slot:", value[0]);
    }
  }, [value]);

  // Auto-expand the first day with time slots when data loads
  useEffect(() => {
    if (value && value.length > 0 && !expandedDay) {
      const firstDayWithSlots = value.find(day => day.timeSlots && day.timeSlots.length > 0);
      if (firstDayWithSlots) {
        console.log("🎯 Auto-expanding day:", firstDayWithSlots.day);
        setExpandedDay(firstDayWithSlots.day);
      } else if (value[0]) {
        console.log("🎯 Auto-expanding first day:", value[0].day);
        setExpandedDay(value[0].day);
      }
    }
  }, [value, expandedDay]);

  const addDay = (day) => {
    const newAvailability = [...value, { day, timeSlots: [] }];
    onChange(newAvailability);
    setExpandedDay(day);
  };

  const removeDay = (dayToRemove) => {
    const newAvailability = value.filter(item => item.day !== dayToRemove);
    onChange(newAvailability);
    if (expandedDay === dayToRemove) {
      setExpandedDay(null);
    }
  };

  const addTimeSlot = (day) => {
    const newAvailability = value.map(item => {
      if (item.day === day) {
        const currentTimeSlots = item.timeSlots || [];
        return {
          ...item,
          timeSlots: [...currentTimeSlots, { startTime: '09:00', endTime: '10:00' }]
        };
      }
      return item;
    });
    onChange(newAvailability);
  };

  const updateTimeSlot = (day, index, field, newValue) => {
    const newAvailability = value.map(item => {
      if (item.day === day) {
        const updatedTimeSlots = (item.timeSlots || []).map((slot, slotIndex) => {
          if (slotIndex === index) {
            return { ...slot, [field]: newValue };
          }
          return slot;
        });
        return { ...item, timeSlots: updatedTimeSlots };
      }
      return item;
    });
    onChange(newAvailability);
  };

  const removeTimeSlot = (day, index) => {
    const newAvailability = value.map(item => {
      if (item.day === day) {
        const currentTimeSlots = item.timeSlots || [];
        const updatedTimeSlots = currentTimeSlots.filter((_, slotIndex) => slotIndex !== index);
        return { ...item, timeSlots: updatedTimeSlots };
      }
      return item;
    });
    onChange(newAvailability);
  };

  const isDaySelected = (day) => {
    return value.some(item => item.day === day);
  };

  const getDayAvailability = (day) => {
    return value.find(item => item.day === day);
  };

  const validateTimeSlot = (startTime, endTime) => {
    if (!startTime || !endTime) return false;
    const start = parseInt(startTime.replace(':', ''));
    const end = parseInt(endTime.replace(':', ''));
    return start < end;
  };

  // Safe getter for time slots
  const getTimeSlots = (day) => {
    const dayAvailability = getDayAvailability(day);
    return dayAvailability?.timeSlots || [];
  };

  return (
    <div className="space-y-6">
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 text-sm">
            <strong>Debug Info:</strong> 
            Days with availability: {value.length}
            {value.length > 0 && ` - Expanded: ${expandedDay}`}
            {value.length > 0 && ` - First day: ${value[0]?.day}`}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-800 text-xl flex items-center">
          <Clock className="w-6 h-6 text-blue-600 mr-3" />
          Weekly Availability
        </h3>
        <div className="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-xl">
          {value.length} day(s) selected
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="relative">
            <button
              type="button"
              onClick={() => isDaySelected(day) ? setExpandedDay(expandedDay === day ? null : day) : addDay(day)}
              className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-300 ${
                isDaySelected(day)
                  ? expandedDay === day 
                    ? 'border-blue-600 bg-blue-100 text-blue-800 shadow-md'
                    : 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-25'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{day}</span>
                {isDaySelected(day) ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Added</span>
                  </div>
                ) : (
                  <Plus className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {isDaySelected(day) && getTimeSlots(day).length > 0 && (
                <div className="mt-2 text-xs text-gray-600">
                  {getTimeSlots(day).length} time slot(s)
                </div>
              )}
            </button>

            {isDaySelected(day) && (
              <button
                type="button"
                onClick={() => removeDay(day)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {expandedDay && getDayAvailability(expandedDay) && (
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            Time Slots for {expandedDay}
          </h4>

          {getTimeSlots(expandedDay).length === 0 ? (
            <div className="text-center py-6 bg-yellow-50 border border-yellow-200 rounded-xl">
              <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-yellow-700 font-medium">No time slots added</p>
              <p className="text-yellow-600 text-sm mt-1">
                Add at least one time slot for students to book sessions
              </p>
            </div>
          ) : (
            getTimeSlots(expandedDay).map((slot, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <select
                      value={slot.startTime}
                      onChange={(e) => updateTimeSlot(expandedDay, index, 'startTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    >
                      {TIME_SLOTS.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <select
                      value={slot.endTime}
                      onChange={(e) => updateTimeSlot(expandedDay, index, 'endTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    >
                      {TIME_SLOTS.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {!validateTimeSlot(slot.startTime, slot.endTime) && (
                  <div className="flex items-center text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Invalid
                  </div>
                )}

                {getTimeSlots(expandedDay).length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTimeSlot(expandedDay, index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))
          )}

          <button
            type="button"
            onClick={() => addTimeSlot(expandedDay)}
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-blue-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Time Slot</span>
          </button>
        </div>
      )}

      {value.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">No availability set</p>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Select days from above to set your teaching schedule. Students will only be able to book sessions during your available times.
          </p>
        </div>
      )}
    </div>
  );
};

export default AvailabilityPicker;