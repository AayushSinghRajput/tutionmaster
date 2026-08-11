import SearchBar from '../common/SearchBar';

const TeacherListingSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-6 sm:mb-8 px-2 sm:px-0">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />

          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherListingSearch;