import React from 'react';
import { SUBJECTS, TEACHING_MODES } from '../../utils/constants';

const TeacherFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const handleSubjectChange = (subject) => {
    const updatedSubjects = filters.subjects.includes(subject)
      ? filters.subjects.filter(s => s !== subject)
      : [...filters.subjects, subject];
    
    onFilterChange('subjects', updatedSubjects);
  };

  return (
    <div className="w-80 bg-white shadow-lg rounded-lg p-6 h-fit sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
        <button 
          onClick={onClearFilters} 
          className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Subject Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Subjects</h4>
        <div className="space-y-2">
          {SUBJECTS.map(subject => (
            <label key={subject} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.subjects.includes(subject)}
                onChange={() => handleSubjectChange(subject)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-600">{subject}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Teaching Mode Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Teaching Mode</h4>
        <select
          value={filters.teachingMode}
          onChange={(e) => onFilterChange('teachingMode', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Modes</option>
          {TEACHING_MODES.map(mode => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </select>
      </div>

      {/* Experience Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Experience (years)</h4>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minExperience}
            onChange={(e) => onFilterChange('minExperience', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            max="50"
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxExperience}
            onChange={(e) => onFilterChange('maxExperience', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            max="50"
          />
        </div>
      </div>

      {/* Hourly Rate Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Hourly Rate ($)</h4>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minRate}
            onChange={(e) => onFilterChange('minRate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            max="1000"
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxRate}
            onChange={(e) => onFilterChange('maxRate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            max="1000"
          />
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Location</h4>
        <input
          type="text"
          placeholder="City or State"
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default TeacherFilters;