import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import TeacherFilters from '../teachers/TeacherFilters';

const TeacherFilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden lg:sticky lg:top-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex flex-1 items-center justify-between text-left lg:pointer-events-none lg:cursor-default"
              aria-expanded={isOpen}
            >
              <h2 className="text-base sm:text-lg font-semibold text-white flex items-center">
                <svg
                  className="w-5 h-5 mr-2 sm:mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                  />
                </svg>
                Filter Teachers
              </h2>
              <ChevronDown
                size={18}
                className={`text-white ml-2 flex-shrink-0 transition-transform duration-200 lg:hidden ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <button
              onClick={onClearFilters}
              className="text-blue-100 hover:text-white text-xs sm:text-sm font-medium transition-colors duration-200 flex-shrink-0"
            >
              Clear All
            </button>
          </div>
        </div>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } lg:block p-4 sm:p-6 max-lg:[&>div]:!w-full max-lg:[&>div]:!static`}
        >
          <TeacherFilters
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherFilterSidebar;
