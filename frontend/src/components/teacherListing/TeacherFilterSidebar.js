import { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import TeacherFilters from '../teachers/TeacherFilters';

const TeacherFilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full lg:w-80 flex-shrink-0">
      {/* Mobile-only collapse toggle. TeacherFilters owns the single visible header. */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden w-full flex items-center justify-between gap-2 bg-white rounded-xl border border-stone-200 shadow-sm px-4 sm:px-6 py-3 sm:py-4 mb-3"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 font-semibold text-gray-800 text-sm sm:text-base">
          <SlidersHorizontal size={18} className="text-brand-600 flex-shrink-0" />
          Filter Teachers
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-500 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <TeacherFilters
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />
      </div>
    </div>
  );
};

export default TeacherFilterSidebar;
