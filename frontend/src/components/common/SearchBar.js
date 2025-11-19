import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Filter } from 'lucide-react';

const SearchBar = ({ 
  searchQuery = '',
  onSearchChange,
  onFiltersToggle,
  filterCount = 0,
  placeholder = 'Search teachers by name, subject, or location...',
  className = '',
  showFiltersButton = true,
  autoFocus = false,
  debounceMs = 300
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
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
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            className="block w-full pl-10 pr-20 py-3 border border-gray-300 rounded-xl bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            autoFocus={autoFocus}
            aria-label="Search teachers"
          />

          {/* Clear Button */}
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-12 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}

          {/* Filters Button */}
          {showFiltersButton && onFiltersToggle && (
            <button
              type="button"
              onClick={onFiltersToggle}
              className={`absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200 ${
                filterCount > 0 ? 'text-blue-600' : ''
              }`}
              aria-label={`Open filters ${filterCount > 0 ? `(${filterCount} active)` : ''}`}
            >
              <Filter size={16} />
              {filterCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {filterCount}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Search Button (for mobile accessibility) */}
        <button 
          type="submit" 
          className="md:hidden mt-3 w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          aria-label="Perform search"
        >
          <Search size={16} className="mr-2" />
          Search
        </button>
      </form>

      {/* Search Suggestions */}
      {localQuery && (
        <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          <div className="mb-2">
            Try searching for: <strong>{localQuery}</strong>
          </div>
          <div>
            Or try: "Math tutors in New York", "Online English teachers", etc.
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;