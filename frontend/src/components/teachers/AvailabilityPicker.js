import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Clock, Calendar } from 'lucide-react';

const AvailabilityPicker = ({ 
  value = [], 
  onChange,
  className = ''
}) => {
  const [availability, setAvailability] = useState([]);

  const DAYS_OF_WEEK = [
    'Monday',
    'Tuesday', 
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const TIME_SLOTS = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  // Initialize from props
  useEffect(() => {
    if (value && value.length > 0) {
      setAvailability([...value]);
    }
  }, [value]);

  // Notify parent of changes
  useEffect(() => {
    onChange(availability);
  }, [availability]);

  const addDay = () => {
    const availableDays = availability.map(item => item.day);
    const nextAvailableDay = DAYS_OF_WEEK.find(day => !availableDays.includes(day));
    
    if (nextAvailableDay) {
      setAvailability(prev => [
        ...prev,
        {
          day: nextAvailableDay,
          timeSlots: []
        }
      ]);
    }
  };

  const removeDay = (dayIndex) => {
    setAvailability(prev => prev.filter((_, index) => index !== dayIndex));
  };

  const addTimeSlot = (dayIndex) => {
    setAvailability(prev => {
      const updated = [...prev];
      updated[dayIndex].timeSlots = [
        ...updated[dayIndex].timeSlots,
        { start: '09:00', end: '10:00' }
      ];
      return updated;
    });
  };

  const removeTimeSlot = (dayIndex, slotIndex) => {
    setAvailability(prev => {
      const updated = [...prev];
      updated[dayIndex].timeSlots = updated[dayIndex].timeSlots.filter(
        (_, index) => index !== slotIndex
      );
      return updated;
    });
  };

  const updateTimeSlot = (dayIndex, slotIndex, field, value) => {
    setAvailability(prev => {
      const updated = [...prev];
      updated[dayIndex].timeSlots[slotIndex][field] = value;
      return updated;
    });
  };

  const updateDay = (index, day) => {
    setAvailability(prev => {
      const updated = [...prev];
      updated[index].day = day;
      return updated;
    });
  };

  const getAvailableDays = (currentDay) => {
    const usedDays = availability.map(item => item.day).filter(day => day !== currentDay);
    return DAYS_OF_WEEK.filter(day => !usedDays.includes(day));
  };

  const validateTimeSlot = (start, end) => {
    if (!start || !end) return false;
    
    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);
    
    return endTime > startTime;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Calendar size={20} className="text-blue-600" />
          <h4 className="text-lg font-semibold text-gray-900">Weekly Availability</h4>
        </div>
        <p className="text-gray-600">Set your available days and time slots for teaching</p>
      </div>

      {/* Empty State */}
      {availability.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <Clock size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium mb-2">No availability set</p>
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            Add your available days and time slots to let students know when you're free for lessons.
          </p>
          <button 
            type="button"
            onClick={addDay}
            className="inline-flex items-center space-x-2 px-4 py-2 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <Plus size={16} />
            <span>Add Your First Day</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Days List */}
          {availability.map((daySchedule, dayIndex) => (
            <div key={dayIndex} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <select
                  value={daySchedule.day}
                  onChange={(e) => updateDay(dayIndex, e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {getAvailableDays(daySchedule.day).map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                  <option value={daySchedule.day}>{daySchedule.day}</option>
                </select>
                
                <button
                  type="button"
                  onClick={() => removeDay(dayIndex)}
                  className="flex items-center space-x-2 px-3 py-2 border border-red-300 rounded-lg text-red-700 bg-white hover:bg-red-50 transition-colors duration-200 font-medium"
                >
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>

              {/* Time Slots */}
              <div className="space-y-4">
                {daySchedule.timeSlots.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    <p>No time slots added for {daySchedule.day}</p>
                  </div>
                ) : (
                  daySchedule.timeSlots.map((slot, slotIndex) => {
                    const isValid = validateTimeSlot(slot.start, slot.end);
                    
                    return (
                      <div 
                        key={slotIndex} 
                        className={`flex flex-col sm:flex-row sm:items-end gap-4 p-4 bg-white rounded-lg border ${
                          !isValid ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Start Time
                            </label>
                            <select
                              value={slot.start}
                              onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'start', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {TIME_SLOTS.map(time => (
                                <option key={`start-${time}`} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-center text-gray-500 font-medium h-10">
                            to
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              End Time
                            </label>
                            <select
                              value={slot.end}
                              onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'end', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {TIME_SLOTS.map(time => (
                                <option key={`end-${time}`} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        {!isValid && (
                          <div className="text-red-600 text-sm">
                            End time must be after start time
                          </div>
                        )}
                        
                        <button
                          type="button"
                          onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                          className="flex items-center justify-center w-10 h-10 border border-red-300 rounded-lg text-red-700 bg-white hover:bg-red-50 transition-colors duration-200"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })
                )}
                
                <button
                  type="button"
                  onClick={() => addTimeSlot(dayIndex)}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  <Plus size={14} />
                  <span>Add Time Slot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Another Day Button */}
      {availability.length > 0 && availability.length < DAYS_OF_WEEK.length && (
        <div className="text-center">
          <button 
            type="button"
            onClick={addDay}
            className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            <Plus size={16} />
            <span>Add Another Day</span>
          </button>
        </div>
      )}

      {/* Summary */}
      {availability.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h5 className="text-lg font-semibold text-blue-900 mb-4">Availability Summary</h5>
          <div className="space-y-3">
            {availability.map((daySchedule, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-2">
                <strong className="text-blue-900 min-w-24">{daySchedule.day}:</strong>
                <div className="flex-1">
                  {daySchedule.timeSlots.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {daySchedule.timeSlots.map((slot, slotIndex) => (
                        <span 
                          key={slotIndex} 
                          className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                        >
                          {slot.start} - {slot.end}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-blue-700 italic">No time slots</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityPicker;