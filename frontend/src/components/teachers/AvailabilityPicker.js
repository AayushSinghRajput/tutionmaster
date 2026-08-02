import { useState, useEffect } from 'react';
import { Clock, Plus, Trash2, AlertCircle } from 'lucide-react';

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const DEFAULT_SLOT = { startTime: '09:00 AM', endTime: '05:00 PM' };

// Splits "09:00 AM" -> { time: "09:00", period: "AM" }. Falls back gracefully
// for partial/invalid input while the user is still typing.
const splitTime = (full) => {
  const match = /^(.*?)\s*(AM|PM)?$/i.exec((full || '').trim());
  const time = match?.[1]?.trim() || '';
  const period = match?.[2]?.toUpperCase() || 'AM';
  return { time, period };
};

const joinTime = (time, period) => `${time} ${period}`.trim();

// "9:00 AM" -> minutes since midnight, or null if not parseable yet
const toMinutes = (full) => {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec((full || '').trim());
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const period = m[3].toUpperCase();
  if (h < 1 || h > 12 || min < 0 || min > 59) return null;
  if (period === 'AM') { if (h === 12) h = 0; } else { if (h !== 12) h += 12; }
  return h * 60 + min;
};

const isValidTimeFormat = (full) => toMinutes(full) !== null;

// ---------------------------------------------------------------------------
// Free-text time field: user types HH:MM, picks AM/PM with a toggle
// ---------------------------------------------------------------------------
const TimeField = ({ label, value, onChange }) => {
  const { time, period } = splitTime(value);
  const [localTime, setLocalTime] = useState(time);

  useEffect(() => setLocalTime(time), [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const commit = (newTime, newPeriod) => onChange(joinTime(newTime, newPeriod));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-stretch gap-2">
        <input
          type="text"
          value={localTime}
          placeholder="09:00"
          onChange={(e) => {
            setLocalTime(e.target.value);
            commit(e.target.value, period);
          }}
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
        />
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          {['AM', 'PM'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => commit(localTime, p)}
              className={`px-3 py-2 text-sm font-semibold transition-colors ${
                period === p ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      {localTime && !isValidTimeFormat(joinTime(localTime, period)) && (
        <p className="mt-1 text-xs text-red-600 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" /> Use HH:MM, e.g. 9:00 or 09:30
        </p>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// value: [{ day, timeSlots }] — every selected day shares the same timeSlots
// ---------------------------------------------------------------------------
const AvailabilityPicker = ({ value = [], onChange }) => {
  const selectedDays = value.map((v) => v.day);
  const timeSlots = value[0]?.timeSlots?.length ? value[0].timeSlots : [];

  const rebuild = (days, slots) => days.map((day) => ({ day, timeSlots: slots }));

  const toggleDay = (day) => {
    const isSelected = selectedDays.includes(day);
    const newDays = isSelected
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    const slotsToApply = timeSlots.length > 0 ? timeSlots : [DEFAULT_SLOT];
    onChange(rebuild(newDays, slotsToApply));
  };

  const addTimeSlot = () => onChange(rebuild(selectedDays, [...timeSlots, { ...DEFAULT_SLOT }]));

  const updateTimeSlot = (index, field, newValue) => {
    const newSlots = timeSlots.map((slot, i) =>
      i === index ? { ...slot, [field]: newValue } : slot
    );
    onChange(rebuild(selectedDays, newSlots));
  };

  const removeTimeSlot = (index) =>
    onChange(rebuild(selectedDays, timeSlots.filter((_, i) => i !== index)));

  const slotOrderInvalid = (slot) => {
    const start = toMinutes(slot.startTime);
    const end = toMinutes(slot.endTime);
    if (start === null || end === null) return false; // format error already shown separately
    return start >= end;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-800 text-xl flex items-center">
          <Clock className="w-6 h-6 text-blue-600 mr-3" />
          Weekly Availability
        </h3>
        <div className="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-xl">
          {selectedDays.length} day(s) selected
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-3">
          Select the days you're available. The same hours below apply to every day you pick.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = selectedDays.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-300 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-100 text-blue-800 shadow-md'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-25'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{day}</span>
                  {isSelected ? (
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDays.length > 0 && (
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            Time Slots (applies to all selected days)
          </h4>

          {timeSlots.length === 0 ? (
            <div className="text-center py-6 bg-yellow-50 border border-yellow-200 rounded-xl">
              <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-yellow-700 font-medium">No time slots added</p>
              <p className="text-yellow-600 text-sm mt-1">
                Add at least one time slot for students to book sessions
              </p>
            </div>
          ) : (
            timeSlots.map((slot, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <TimeField
                    label="Start Time"
                    value={slot.startTime}
                    onChange={(v) => updateTimeSlot(index, 'startTime', v)}
                  />
                  <TimeField
                    label="End Time"
                    value={slot.endTime}
                    onChange={(v) => updateTimeSlot(index, 'endTime', v)}
                  />
                </div>

                {slotOrderInvalid(slot) && (
                  <div className="flex items-center text-red-600 text-sm whitespace-nowrap">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    End must be after start
                  </div>
                )}

                {timeSlots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTimeSlot(index)}
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
            onClick={addTimeSlot}
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-blue-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Time Slot</span>
          </button>
        </div>
      )}

      {selectedDays.length === 0 && (
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