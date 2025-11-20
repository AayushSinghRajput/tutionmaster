import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Clock, Calendar, ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';

const AvailabilityPicker = ({ 
  value = [], 
  onChange,
  className = ''
}) => {
  const [availability, setAvailability] = useState([]);
  const [expandedDays, setExpandedDays] = useState(new Set());

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
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00'
  ];

  // Initialize from props
  useEffect(() => {
    if (value && value.length > 0) {
      setAvailability([...value]);
      // Expand all days by default
      setExpandedDays(new Set(value.map((_, index) => index)));
    }
  }, [value]);

  // Notify parent of changes
  useEffect(() => {
    onChange(availability);
  }, [availability]);

  const toggleDayExpansion = (dayIndex) => {
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dayIndex)) {
        newSet.delete(dayIndex);
      } else {
        newSet.add(dayIndex);
      }
      return newSet;
    });
  };

  const addDay = () => {
    const availableDays = availability.map(item => item.day);
    const nextAvailableDay = DAYS_OF_WEEK.find(day => !availableDays.includes(day));
    
    if (nextAvailableDay) {
      const newIndex = availability.length;
      setAvailability(prev => [
        ...prev,
        {
          day: nextAvailableDay,
          timeSlots: []
        }
      ]);
      setExpandedDays(prev => new Set([...prev, newIndex]));
    }
  };

  const removeDay = (dayIndex) => {
    setAvailability(prev => prev.filter((_, index) => index !== dayIndex));
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      newSet.delete(dayIndex);
      return newSet;
    });
  };

  const addTimeSlot = (dayIndex) => {
    setAvailability(prev => {
      const updated = [...prev];
      if (!updated[dayIndex].timeSlots) {
        updated[dayIndex].timeSlots = [];
      }
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

  const getTotalHours = () => {
    return availability.reduce((total, day) => {
      return total + day.timeSlots.reduce((dayTotal, slot) => {
        const start = new Date(`2000-01-01T${slot.start}`);
        const end = new Date(`2000-01-01T${slot.end}`);
        return dayTotal + (end - start) / (1000 * 60 * 60);
      }, 0);
    }, 0);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Enhanced Header */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
            <Calendar size={24} className="text-white" />
          </div>
          <h4 className="text-2xl font-bold">Teaching Availability</h4>
        </div>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Set your weekly teaching schedule to help students find the perfect time for lessons
        </p>
      </div>

      {/* Empty State */}
      {availability.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-blue-200 rounded-2xl bg-gradient-to-br from-blue-50 to-white">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
            <Clock size={32} className="text-blue-600" />
          </div>
          <p className="text-gray-800 font-semibold text-xl mb-3">No availability set yet</p>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Add your available days and time slots to let students know when you're free for lessons.
          </p>
          <button 
            type="button"
            onClick={addDay}
            className="inline-flex items-center space-x-3 px-8 py-4 border border-transparent rounded-2xl text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus size={20} />
            <span className="text-lg">Add Your First Day</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Days List */}
          {availability.map((daySchedule, dayIndex) => (
            <div key={dayIndex} className="bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              {/* Day Header - Always Visible */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-75 px-6 py-4 border-b border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleDayExpansion(dayIndex)}
                      className="p-2 hover:bg-white hover:bg-opacity-50 rounded-xl transition-all duration-200"
                    >
                      <ChevronDown 
                        size={20} 
                        className={`text-blue-600 transition-transform duration-300 ${
                          expandedDays.has(dayIndex) ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    <select
                      value={daySchedule.day}
                      onChange={(e) => updateDay(dayIndex, e.target.value)}
                      className="px-4 py-2.5 border border-blue-200 rounded-xl bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    >
                      {getAvailableDays(daySchedule.day).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                      <option value={daySchedule.day}>{daySchedule.day}</option>
                    </select>
                    
                    {/* Time slots count badge */}
                    {daySchedule.timeSlots.length > 0 && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        {daySchedule.timeSlots.length} time slot{daySchedule.timeSlots.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeDay(dayIndex)}
                    className="flex items-center space-x-2 px-4 py-2.5 border border-red-200 rounded-xl text-red-700 bg-white hover:bg-red-50 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                  >
                    <Trash2 size={16} />
                    <span>Remove Day</span>
                  </button>
                </div>
              </div>

              {/* Collapsible Time Slots Content */}
              {expandedDays.has(dayIndex) && (
                <div className="p-6 bg-gradient-to-br from-white to-blue-25">
                  <div className="space-y-4">
                    {daySchedule.timeSlots.length === 0 ? (
                      <div className="text-center py-8 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200">
                        <Clock size={32} className="mx-auto text-blue-400 mb-3" />
                        <p className="text-gray-600 font-medium">No time slots added for {daySchedule.day}</p>
                        <p className="text-gray-500 text-sm mt-1">Add your available teaching times</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {daySchedule.timeSlots.map((slot, slotIndex) => {
                          const isValid = validateTimeSlot(slot.start, slot.end);
                          
                          return (
                            <div 
                              key={slotIndex} 
                              className={`flex flex-col lg:flex-row lg:items-center gap-4 p-5 rounded-xl border-2 transition-all duration-300 ${
                                !isValid 
                                  ? 'border-red-200 bg-red-50' 
                                  : 'border-blue-100 bg-white hover:border-blue-200 hover:shadow-sm'
                              }`}
                            >
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Start Time
                                  </label>
                                  <div className="relative">
                                    <select
                                      value={slot.start}
                                      onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'start', e.target.value)}
                                      className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none shadow-sm"
                                    >
                                      {TIME_SLOTS.map(time => (
                                        <option key={`start-${time}`} value={time}>
                                          {time}
                                        </option>
                                      ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                      <ChevronDown size={16} className="text-blue-400" />
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-center h-10">
                                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600 font-bold text-sm">→</span>
                                  </div>
                                </div>
                                
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    End Time
                                  </label>
                                  <div className="relative">
                                    <select
                                      value={slot.end}
                                      onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'end', e.target.value)}
                                      className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none shadow-sm"
                                    >
                                      {TIME_SLOTS.map(time => (
                                        <option key={`end-${time}`} value={time}>
                                          {time}
                                        </option>
                                      ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                      <ChevronDown size={16} className="text-blue-400" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                {!isValid && (
                                  <div className="flex items-center space-x-1 text-red-600 text-sm font-medium">
                                    <AlertCircle size={16} />
                                    <span>Invalid time</span>
                                  </div>
                                )}
                                
                                <button
                                  type="button"
                                  onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                                  className="flex items-center justify-center w-12 h-12 border border-red-200 rounded-xl text-red-700 bg-white hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md"
                                  title="Remove time slot"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => addTimeSlot(dayIndex)}
                      className="flex items-center space-x-3 px-6 py-3.5 border-2 border-dashed border-blue-200 rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 transition-all duration-300 font-semibold w-full justify-center group"
                    >
                      <Plus size={18} className="group-hover:scale-110 transition-transform duration-200" />
                      <span>Add Time Slot</span>
                    </button>
                  </div>
                </div>
              )}
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
            className="inline-flex items-center space-x-3 px-6 py-3.5 border-2 border-blue-200 rounded-xl text-blue-700 bg-white hover:bg-blue-50 transition-all duration-300 font-semibold shadow-sm hover:shadow-md transform hover:scale-105"
          >
            <Plus size={18} />
            <span>Add Another Day</span>
          </button>
        </div>
      )}

      {/* Enhanced Summary */}
      {availability.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-xl font-bold text-blue-900">Weekly Schedule Summary</h5>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm">
              <CheckCircle size={18} className="text-green-500" />
              <span className="text-blue-800 font-semibold">
                {getTotalHours().toFixed(1)} total hours
              </span>
            </div>
          </div>
          
          <div className="grid gap-4">
            {availability.map((daySchedule, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="lg:w-48">
                    <strong className="text-blue-900 font-bold text-lg">{daySchedule.day}</strong>
                    <div className="text-blue-600 text-sm font-medium mt-1">
                      {daySchedule.timeSlots.length} time slot{daySchedule.timeSlots.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="flex-1">
                    {daySchedule.timeSlots.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {daySchedule.timeSlots.map((slot, slotIndex) => {
                          const isValid = validateTimeSlot(slot.start, slot.end);
                          return (
                            <span 
                              key={slotIndex} 
                              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                                isValid 
                                  ? 'bg-blue-500 text-white shadow-sm' 
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {!isValid && <AlertCircle size={14} />}
                              <span>{slot.start} - {slot.end}</span>
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-blue-600 italic font-medium">No time slots scheduled</span>
                    )}
                  </div>
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