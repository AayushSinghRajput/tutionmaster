import TeacherFilters from '../teachers/TeacherFilters';

const TeacherFilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  return (
    <div className="lg:w-70 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden sticky top-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <svg
                className="w-5 h-5 mr-3"
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
            <button
              onClick={onClearFilters}
              className="text-blue-100 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
        </div>
        <div className="p-6">
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
