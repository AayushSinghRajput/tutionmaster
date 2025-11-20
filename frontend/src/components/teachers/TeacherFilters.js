import { SUBJECTS, TEACHING_MODES } from '../../utils/constants';
import { Filter, X, GraduationCap, Monitor, MapPin, Clock, Search } from 'lucide-react';

const TeacherFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const handleSubjectChange = (subject) => {
    const updatedSubjects = filters.subjects.includes(subject)
      ? filters.subjects.filter(s => s !== subject)
      : [...filters.subjects, subject];
    
    onFilterChange('subjects', updatedSubjects);
  };

  const hasActiveFilters = () => {
    return filters.subjects.length > 0 ||
           filters.teachingMode !== '' ||
           filters.minExperience !== '' ||
           filters.maxExperience !== '' ||
           filters.minRate !== '' ||
           filters.maxRate !== '' ||
           filters.location !== '';
  };

  // Professional blue color palette
  const colors = {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    accent: {
      50: '#f0f9ff',
      500: '#0ea5e9',
      600: '#0284c7'
    }
  };

  return (
    <div className="w-80 bg-white rounded-2xl shadow-xl border border-blue-50 h-fit sticky top-8 transition-all duration-300 hover:shadow-2xl">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 px-6 py-6 rounded-t-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full -translate-x-12 translate-y-8"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-2xl shadow-lg backdrop-blur-sm">
              <Filter size={22} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Refine Search</h3>
              <p className="text-blue-100 text-sm font-medium mt-1">Find your ideal educator</p>
            </div>
          </div>
          {hasActiveFilters() && (
            <button 
              onClick={onClearFilters} 
              className="p-2.5 text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-15 rounded-xl transition-all duration-200 shadow-sm backdrop-blur-sm border border-white border-opacity-20"
              title="Clear all filters"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-7 bg-gradient-to-b from-white to-blue-50 rounded-b-2xl">
        {/* Enhanced Subject Filter */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <GraduationCap size={18} className="text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-800 text-lg">Subjects & Courses</h4>
          </div>
          <div className="max-h-72 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {SUBJECTS.map(subject => (
              <label key={subject} className="flex items-center space-x-3 cursor-pointer group p-2 rounded-xl transition-all duration-200 hover:bg-blue-50">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={filters.subjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200 group-hover:border-blue-400 shadow-sm"
                  />
                  {filters.subjects.includes(subject) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className={`text-gray-700 group-hover:text-blue-800 transition-colors duration-200 flex-1 ${
                  filters.subjects.includes(subject) ? 'font-semibold text-blue-700' : 'font-medium'
                }`}>
                  {subject}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-blue-100 pt-6 space-y-7">
          {/* Enhanced Teaching Mode Filter */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Monitor size={18} className="text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-800 text-lg">Teaching Format</h4>
            </div>
            <div className="relative">
              <select
                value={filters.teachingMode}
                onChange={(e) => onFilterChange('teachingMode', e.target.value)}
                className="w-full px-4 py-3.5 pl-11 border-2 border-blue-100 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 shadow-sm appearance-none"
              >
                <option value="" className="text-gray-400">All Teaching Formats</option>
                {TEACHING_MODES.map(mode => (
                  <option key={mode} value={mode} className="text-gray-700">{mode}</option>
                ))}
              </select>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                <Search size={16} />
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Enhanced Experience Filter */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock size={18} className="text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-800 text-lg">Teaching Experience</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Min years"
                    value={filters.minExperience}
                    onChange={(e) => onFilterChange('minExperience', e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-blue-100 rounded-xl bg-white placeholder-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 shadow-sm"
                    min="0"
                    max="50"
                  />
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">→</span>
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Max years"
                    value={filters.maxExperience}
                    onChange={(e) => onFilterChange('maxExperience', e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-blue-100 rounded-xl bg-white placeholder-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 shadow-sm"
                    min="0"
                    max="50"
                  />
                </div>
              </div>
              <div className="text-xs text-blue-600 font-semibold text-center bg-blue-50 py-1.5 rounded-lg">
                Years of professional experience
              </div>
            </div>
          </div>

          {/* Enhanced Hourly Rate Filter */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm">
                <span className="text-white font-bold text-sm">₨</span>
              </div>
              <h4 className="font-bold text-gray-800 text-lg">Hourly Rate Range</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="number"
                    placeholder="Minimum rate"
                    value={filters.minRate}
                    onChange={(e) => onFilterChange('minRate', e.target.value)}
                    className="w-full px-4 py-3.5 pl-11 border-2 border-blue-100 rounded-xl bg-white placeholder-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 shadow-sm"
                    min="0"
                    max="10000"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-blue-500 text-sm font-bold">₨</span>
                  </div>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">→</span>
                </div>
                <div className="flex-1 relative">
                  <input
                    type="number"
                    placeholder="Maximum rate"
                    value={filters.maxRate}
                    onChange={(e) => onFilterChange('maxRate', e.target.value)}
                    className="w-full px-4 py-3.5 pl-11 border-2 border-blue-100 rounded-xl bg-white placeholder-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 shadow-sm"
                    min="0"
                    max="10000"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-blue-500 text-sm font-bold">₨</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-blue-600 font-semibold text-center bg-blue-50 py-1.5 rounded-lg">
                Nepali Rupee (₨) per hour
              </div>
            </div>
          </div>

          {/* Enhanced Location Filter */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin size={18} className="text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-800 text-lg">Location Preference</h4>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by city or region..."
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="w-full px-4 py-3.5 pl-11 border-2 border-blue-100 rounded-xl bg-white placeholder-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 shadow-sm"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                <Search size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Clear Filters Button */}
        {hasActiveFilters() && (
          <button
            onClick={onClearFilters}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
          >
            <X size={18} className="transition-transform duration-200 group-hover:rotate-90" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #bfdbfe;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #93c5fd;
        }
      `}</style>
    </div>
  );
};

export default TeacherFilters;