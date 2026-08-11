import { useState, useEffect, useRef } from 'react';
import { X, Filter, Sparkles } from 'lucide-react';

const SearchBar = ({
  searchQuery = '',
  onSearchChange = () => { },
  onFiltersToggle = () => { },
  filterCount = 0,
  placeholder = 'Search for subjects, teachers, or topics...',
  className = '',
  showFiltersButton = true,
  autoFocus = false,
  debounceMs = 300
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Sync local state with prop changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Handle input change with debounce
  const handleInputChange = (value) => {
    setLocalQuery(value);

    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout for debounced search
    debounceRef.current = setTimeout(() => {
      onSearchChange(value);
    }, debounceMs);
  };

  // Clear search
  const handleClear = () => {
    setLocalQuery('');
    onSearchChange('');
    inputRef.current?.focus();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear debounce and trigger immediate search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    onSearchChange(localQuery);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={`block w-full pl-10 sm:pl-12 pr-20 sm:pr-24 py-3 sm:py-4 border-2 rounded-2xl bg-white placeholder-blue-300 text-gray-900 focus:outline-none transition-all duration-200 shadow-lg text-sm sm:text-base ${isFocused
              ? 'border-blue-500 shadow-blue-100'
              : 'border-blue-200 hover:border-blue-300'
              }`}
            autoFocus={autoFocus}
            aria-label="Search teachers"
          />

          {/* Clear Button */}
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-16 flex items-center px-3 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}

          {/* Filters Button */}
          {showFiltersButton && onFiltersToggle && (
            <div className="absolute inset-y-0 right-0 flex items-center">
              <div className="h-8 w-px bg-blue-200 mr-3"></div>
              <button
                type="button"
                onClick={onFiltersToggle}
                className={`flex items-center space-x-2 px-2.5 sm:px-4 py-2 mr-1 sm:mr-2 rounded-xl transition-all duration-200 font-medium ${filterCount > 0
                  ? 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                  : 'text-blue-500 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                aria-label={`Open filters ${filterCount > 0 ? `(${filterCount} active)` : ''}`}
              >
                <Filter size={16} className="flex-shrink-0" />
                {filterCount > 0 && (
                  <span className="flex items-center justify-center min-w-5 h-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full px-1">
                    {filterCount}
                  </span>
                )}
                <span className="hidden sm:inline text-sm">Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Search Suggestions */}
        {localQuery && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white border-2 border-blue-100 rounded-2xl shadow-xl z-10 overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-blue-50">
              <div className="flex items-center text-sm text-blue-600 font-medium mb-2">
                <Sparkles size={16} className="mr-2 text-blue-400 flex-shrink-0" />
                Search suggestions for:
              </div>
              <div className="text-base sm:text-lg font-semibold text-gray-900 truncate">"{localQuery}"</div>
            </div>
            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <button
                  className="text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-100 transition-colors duration-200"
                  onClick={() => handleInputChange(`${localQuery} tutors`)}
                >
                  <div className="font-medium text-blue-900">{localQuery} tutors</div>
                  <div className="text-blue-600 mt-1">Find specialized tutors</div>
                </button>
                <button
                  className="text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-100 transition-colors duration-200"
                  onClick={() => handleInputChange(`${localQuery} online`)}
                >
                  <div className="font-medium text-blue-900">{localQuery} online</div>
                  <div className="text-blue-600 mt-1">Virtual learning options</div>
                </button>
                <button
                  className="text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-100 transition-colors duration-200"
                  onClick={() => handleInputChange(`Advanced ${localQuery}`)}
                >
                  <div className="font-medium text-blue-900">Advanced {localQuery}</div>
                  <div className="text-blue-600 mt-1">Higher level courses</div>
                </button>
                <button
                  className="text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-100 transition-colors duration-200"
                  onClick={() => handleInputChange(`${localQuery} for beginners`)}
                >
                  <div className="font-medium text-blue-900">{localQuery} for beginners</div>
                  <div className="text-blue-600 mt-1">Start learning basics</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Popular Searches */}
        {!localQuery && isFocused && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white border-2 border-blue-100 rounded-2xl shadow-xl z-10 p-4 sm:p-6">
            <div className="flex items-center text-sm text-blue-600 font-medium mb-4">
              <Sparkles size={16} className="mr-2 text-blue-400 flex-shrink-0" />
              Popular searches
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {['Math', 'Physics', 'Computer', 'English', 'JavaScript'].map((term) => (
                <button
                  key={term}
                  onClick={() => handleInputChange(term)}
                  className="px-3 sm:px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-blue-700 font-medium text-sm transition-all duration-200 hover:scale-105 hover:shadow-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;