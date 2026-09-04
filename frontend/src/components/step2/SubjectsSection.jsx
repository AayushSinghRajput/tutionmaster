import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Plus, X, AlertCircle, Search, ChevronDown, Check } from "lucide-react";
import { SUBJECT_CATEGORIES } from "../../constants/subjectData";

/**
 * Returns only categories containing subjects that match the search query
 * and have not already been selected.
 */
function getFilteredCategories(query, selectedSubjects) {
  const q = query.trim().toLowerCase();
  const selectedSet = new Set(
    selectedSubjects.map((subject) => subject.toLowerCase()),
  );
  return SUBJECT_CATEGORIES.map((category) => ({
    ...category,
    subjects: category.subjects.filter((subject) => {
      const matchesSearch = !q || subject.toLowerCase().includes(q);
      const notSelected = !selectedSet.has(subject.toLowerCase());
      return matchesSearch && notSelected;
    }),
  })).filter((category) => category.subjects.length > 0);
}

const SubjectsSection = ({ formErrors, value = [], onChange }) => {
  const [subjects, setSubjects] = useState(value || []);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [dropdownStyle, setDropdownStyle] = useState({});

  const containerRef = useRef(null);
  const inputBarRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Sync with parent
  useEffect(() => {
    setSubjects(value || []);
  }, [value]);

  // Filtered data
  const filteredCategories = useMemo(
    () => getFilteredCategories(inputValue, subjects),
    [inputValue, subjects],
  );

  // Flat list for keyboard navigation
  const flatOptions = useMemo(
    () => filteredCategories.flatMap((category) => category.subjects),
    [filteredCategories],
  );

  const trimmed = inputValue.trim();
  const isAlreadySelected =
    trimmed.length > 0 &&
    subjects.some(
      (subject) => subject.toLowerCase() === trimmed.toLowerCase(),
    );

  const isPredefinedSubject =
    trimmed.length > 0 &&
    SUBJECT_CATEGORIES.some((category) =>
      category.subjects.some(
        (subject) => subject.toLowerCase() === trimmed.toLowerCase(),
      ),
    );

  const showAddCustom =
    trimmed.length > 0 && !isAlreadySelected && !isPredefinedSubject;

  // Dropdown positioning calculation
  const updateDropdownPosition = useCallback(() => {
    if (!inputBarRef.current || !isOpen) {
      return;
    }

    const rect = inputBarRef.current.getBoundingClientRect();
    const viewportPadding = 12;
    const dropdownGap = 8;
    const isMobile = window.innerWidth < 640;

    const availableBelow =
      window.innerHeight - rect.bottom - viewportPadding;
    const availableAbove = rect.top - viewportPadding;
    const shouldOpenAbove =
      availableBelow < 260 && availableAbove > availableBelow;

    const maxHeight = Math.max(
      200,
      Math.min(
        isMobile ? 360 : 480,
        shouldOpenAbove
          ? availableAbove - dropdownGap
          : availableBelow - dropdownGap,
      ),
    );

    let width;
    let left;

    if (isMobile) {
      // Full responsive width on mobile devices with consistent padding
      width = window.innerWidth - viewportPadding * 2;
      left = viewportPadding;
    } else {
      // On desktop, match search box width with comfortable minimum
      width = Math.max(rect.width, 380);
      width = Math.min(width, window.innerWidth - viewportPadding * 2);
      left = rect.left;

      if (left + width > window.innerWidth - viewportPadding) {
        left = window.innerWidth - width - viewportPadding;
      }
      if (left < viewportPadding) {
        left = viewportPadding;
      }
    }

    setDropdownStyle({
      position: "fixed",
      left: `${left}px`,
      width: `${width}px`,
      maxHeight: `${maxHeight}px`,
      zIndex: 99999,
      ...(shouldOpenAbove
        ? {
            bottom: `${window.innerHeight - rect.top + dropdownGap}px`,
            top: "auto",
          }
        : { top: `${rect.bottom + dropdownGap}px`, bottom: "auto" }),
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    updateDropdownPosition();

    const handlePositionUpdate = () => {
      updateDropdownPosition();
    };

    window.addEventListener("resize", handlePositionUpdate);
    window.addEventListener("scroll", handlePositionUpdate, true);
    return () => {
      window.removeEventListener("resize", handlePositionUpdate);
      window.removeEventListener("scroll", handlePositionUpdate, true);
    };
  }, [isOpen, updateDropdownPosition]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handlePointerDown = (event) => {
      const target = event.target;
      const clickedInput = containerRef.current?.contains(target);
      const clickedDropdown = dropdownRef.current?.contains(target);
      if (!clickedInput && !clickedDropdown) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const commit = useCallback(
    (newSubjects) => {
      setSubjects(newSubjects);
      onChange?.(newSubjects);
    },
    [onChange],
  );

  const addSubject = useCallback(
    (subject) => {
      const normalizedSubject = subject.trim();
      if (!normalizedSubject) return;

      const alreadyExists = subjects.some(
        (existingSubject) =>
          existingSubject.toLowerCase() === normalizedSubject.toLowerCase(),
      );

      if (alreadyExists) {
        setInputValue("");
        setActiveIndex(-1);
        return;
      }

      commit([...subjects, normalizedSubject]);
      setInputValue("");
      setActiveIndex(-1);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    },
    [subjects, commit],
  );

  const removeSubject = useCallback(
    (subjectToRemove) => {
      commit(subjects.filter((subject) => subject !== subjectToRemove));
    },
    [subjects, commit],
  );

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (!isOpen) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex(flatOptions.length > 0 ? 0 : -1);
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (trimmed) {
          addSubject(trimmed);
        }
        return;
      }
      return;
    }

    const totalOptions = flatOptions.length + (showAddCustom ? 1 : 0);
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (totalOptions > 0) {
          setActiveIndex((current) => (current + 1) % totalOptions);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (totalOptions > 0) {
          setActiveIndex(
            (current) => (current - 1 + totalOptions) % totalOptions,
          );
        }
        break;
      case "Enter":
        event.preventDefault();
        if (activeIndex >= 0 && activeIndex < flatOptions.length) {
          addSubject(flatOptions[activeIndex]);
        } else if (activeIndex === flatOptions.length && showAddCustom) {
          addSubject(trimmed);
        } else if (trimmed) {
          addSubject(trimmed);
        }
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        break;
      default:
        break;
    }
  };

  const openDropdown = () => {
    setIsOpen(true);
    requestAnimationFrame(() => {
      updateDropdownPosition();
    });
  };

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-br from-brand-50 to-stone-100 rounded-2xl p-4 sm:p-6 lg:p-8 border border-brand-200 w-full"
    >
      {/* Header */}
      <div className="mb-3 sm:mb-4">
        <h3 className="font-serif font-bold text-gray-800 text-lg sm:text-xl">
          Subjects You Teach *
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mt-1">
          Select from popular subjects or type any subject and tap{" "}
          <span className="font-semibold text-brand-700">Add</span>.
        </p>
      </div>

      {/* Selected subjects */}
      {subjects.length > 0 && (
        <div
          className="flex flex-wrap gap-2 mb-4 p-3 bg-white/80 rounded-xl border border-brand-100 shadow-sm"
          role="list"
          aria-label="Selected subjects"
        >
          {subjects.map((subject) => (
            <span
              key={subject}
              role="listitem"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-brand-600 text-white shadow-sm transition-transform active:scale-95"
            >
              <Check className="w-3.5 h-3.5 text-gold-300 shrink-0" />
              <span>{subject}</span>
              <button
                type="button"
                onClick={() => removeSubject(subject)}
                aria-label={`Remove ${subject}`}
                className="rounded-full hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-white/60 p-0.5 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search & Selection Bar */}
      <div className="relative">
        <div
          ref={inputBarRef}
          className={`flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border-2 rounded-2xl shadow-sm transition-all duration-200 bg-white ${
            isOpen
              ? "border-brand-500 ring-4 ring-brand-200"
              : "border-brand-200 hover:border-brand-400"
          }`}
        >
          <Search
            className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 shrink-0"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            id="subject-search"
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-controls="subject-listbox"
            aria-activedescendant={
              activeIndex >= 0 ? `subject-option-${activeIndex}` : undefined
            }
            aria-label="Search or type a subject"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={openDropdown}
            onKeyDown={handleKeyDown}
            placeholder="Search or type subject (e.g. Mathematics)..."
            className="flex-1 min-w-0 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base"
          />

          {/* Add button */}
          <button
            type="button"
            onClick={() => addSubject(trimmed)}
            disabled={!trimmed || isAlreadySelected}
            aria-label="Add subject"
            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs sm:text-sm font-semibold hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>

          {/* Dropdown toggle */}
          <button
            type="button"
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
                setActiveIndex(-1);
              } else {
                openDropdown();
              }
            }}
            aria-label={isOpen ? "Close suggestions" : "Open suggestions"}
            className="shrink-0 p-1 text-brand-400 hover:text-brand-600 focus:outline-none rounded cursor-pointer"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Dropdown suggestions */}
        {isOpen && (
          <div
            ref={dropdownRef}
            id="subject-listbox"
            role="listbox"
            aria-label="Subject suggestions"
            aria-multiselectable="true"
            style={dropdownStyle}
            className="overflow-y-auto overscroll-contain bg-white rounded-2xl shadow-2xl border-2 border-brand-200/80 focus:outline-none divide-y divide-stone-100"
          >
            {/* Header bar with count and mobile close button */}
            <div className="sticky top-0 z-20 px-4 py-2.5 bg-brand-50/95 backdrop-blur-sm flex items-center justify-between border-b border-brand-100">
              <span className="text-xs font-bold text-brand-800 uppercase tracking-wider">
                {inputValue.trim()
                  ? `Matching subjects (${flatOptions.length})`
                  : "Select Subjects to Teach"}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-brand-700 hover:text-brand-900 bg-white/80 hover:bg-white px-2.5 py-1 rounded-lg border border-brand-200 shadow-2xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>

            {/* Empty state */}
            {filteredCategories.length === 0 && !showAddCustom && (
              <div className="px-5 py-8 text-center">
                <p className="text-sm font-medium text-gray-600">
                  No matching subjects found for "{inputValue}"
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Type any custom subject and tap "Add" above.
                </p>
              </div>
            )}

            {/* Categories */}
            {filteredCategories.map((category) => (
              <div key={category.category} className="p-3 sm:p-4">
                {/* Category heading & badge */}
                <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
                  <span className="text-xs font-bold text-brand-800 uppercase tracking-wide">
                    {category.category}
                  </span>
                  {category.badge && (
                    <span className="text-[11px] font-medium text-gray-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                      {category.badge}
                    </span>
                  )}
                </div>

                {/* Subject chips */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {category.subjects.map((subject) => {
                    const globalIndex = flatOptions.indexOf(subject);
                    const isActive = activeIndex === globalIndex;
                    return (
                      <button
                        key={subject}
                        id={`subject-option-${globalIndex}`}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onMouseEnter={() => setActiveIndex(globalIndex)}
                        onClick={() => addSubject(subject)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer active:scale-95 ${
                          isActive
                            ? "bg-brand-600 text-white shadow-sm"
                            : "bg-stone-50 hover:bg-brand-50 text-gray-800 hover:text-brand-900 border border-stone-200 hover:border-brand-300"
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5 text-brand-500" />
                        <span>{subject}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Custom subject prompt */}
            {showAddCustom && (
              <div className="p-3 bg-amber-50/50">
                <button
                  type="button"
                  id={`subject-option-${flatOptions.length}`}
                  role="option"
                  aria-selected={activeIndex === flatOptions.length}
                  onMouseEnter={() => setActiveIndex(flatOptions.length)}
                  onClick={() => addSubject(trimmed)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-left transition-colors cursor-pointer ${
                    activeIndex === flatOptions.length
                      ? "bg-brand-600 text-white"
                      : "bg-white hover:bg-brand-50 text-brand-800 border border-brand-200"
                  }`}
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-100 text-brand-700 shrink-0">
                    <Plus className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-normal text-gray-500">
                      Add Custom Subject
                    </span>
                    <span className="block truncate font-semibold">
                      Add &ldquo;{trimmed}&rdquo;
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Validation error */}
      {formErrors?.preferredSubjects && (
        <p className="mt-3 text-red-600 flex items-center text-xs sm:text-sm font-medium">
          <AlertCircle className="w-4 h-4 mr-1.5 shrink-0" />
          {formErrors.preferredSubjects}
        </p>
      )}
    </div>
  );
};

export default SubjectsSection;
