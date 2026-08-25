import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Plus, X, AlertCircle, Search, ChevronDown } from "lucide-react";
import { SUBJECT_CATEGORIES } from "../../constants/subjectData";
/* ────────────────────────────────────────────────────────────────────────── * Helpers * ──────────────────────────────────────────────────────────────────────── */ /** * Returns only categories containing subjects that match the search query * and have not already been selected. */ function getFilteredCategories(
  query,
  selectedSubjects,
) {
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
/* ────────────────────────────────────────────────────────────────────────── * Component * ──────────────────────────────────────────────────────────────────────── */ const SubjectsSection =
  ({ formErrors, value = [], onChange }) => {
    const [subjects, setSubjects] = useState(value || []);
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    /* * Dropdown position is calculated relative to the viewport. * Using a fixed dropdown prevents parent overflow/hidden containers * from clipping the suggestions. */ const [
      dropdownStyle,
      setDropdownStyle,
    ] = useState({});
    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    /* ────────────────────────────────────────────────────────────────────── * Sync with parent * ──────────────────────────────────────────────────────────────────── */ useEffect(() => {
      setSubjects(value || []);
    }, [value]);
    /* ────────────────────────────────────────────────────────────────────── * Filtered data * ──────────────────────────────────────────────────────────────────── */ const filteredCategories =
      useMemo(
        () => getFilteredCategories(inputValue, subjects),
        [inputValue, subjects],
      );
    /* * Flat list is used only for keyboard navigation. */ const flatOptions =
      useMemo(
        () => filteredCategories.flatMap((category) => category.subjects),
        [filteredCategories],
      );
    const trimmed = inputValue.trim();
    const isAlreadySelected =
      trimmed.length > 0 &&
      subjects.some(
        (subject) => subject.toLowerCase() === trimmed.toLowerCase(),
      );
    /* * Check against the entire catalogue rather than only the * currently visible filtered options. * * This prevents a predefined subject from accidentally being * treated as a custom subject. */ const isPredefinedSubject =
      trimmed.length > 0 &&
      SUBJECT_CATEGORIES.some((category) =>
        category.subjects.some(
          (subject) => subject.toLowerCase() === trimmed.toLowerCase(),
        ),
      );
    const showAddCustom =
      trimmed.length > 0 && !isAlreadySelected && !isPredefinedSubject;
    /* ────────────────────────────────────────────────────────────────────── * Dropdown positioning * ──────────────────────────────────────────────────────────────────── */ const updateDropdownPosition =
      useCallback(() => {
        if (!inputRef.current || !isOpen) {
          return;
        }
        const rect = inputRef.current.getBoundingClientRect();
        const viewportPadding = 12;
        const dropdownGap = 8;
        const availableBelow =
          window.innerHeight - rect.bottom - viewportPadding;
        const availableAbove = rect.top - viewportPadding;
        /* * Prefer opening below. * If there isn't enough room below but there is more room above, * open upward. */ const shouldOpenAbove =
          availableBelow < 300 && availableAbove > availableBelow;
        const maxHeight = Math.max(
          220,
          Math.min(
            520,
            shouldOpenAbove
              ? availableAbove - dropdownGap
              : availableBelow - dropdownGap,
          ),
        );
        const width = Math.min(
          rect.width,
          window.innerWidth - viewportPadding * 2,
        );
        let left = rect.left;
        /* * Keep dropdown inside viewport horizontally. */ if (
          left + width >
          window.innerWidth - viewportPadding
        ) {
          left = window.innerWidth - width - viewportPadding;
        }
        if (left < viewportPadding) {
          left = viewportPadding;
        }
        setDropdownStyle({
          position: "fixed",
          left: `${left}px`,
          width: `${width}px`,
          maxHeight: `${maxHeight}px`,
          ...(shouldOpenAbove
            ? {
                bottom: `${window.innerHeight - rect.top + dropdownGap}px`,
                top: "auto",
              }
            : { top: `${rect.bottom + dropdownGap}px`, bottom: "auto" }),
        });
      }, [isOpen]);
    /* * Recalculate position whenever the dropdown opens, * page scrolls, or browser size changes. */ useEffect(() => {
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
    /* ────────────────────────────────────────────────────────────────────── * Close dropdown when clicking outside * ──────────────────────────────────────────────────────────────────── */ useEffect(() => {
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
    /* ────────────────────────────────────────────────────────────────────── * Commit changes * ──────────────────────────────────────────────────────────────────── */ const commit =
      useCallback(
        (newSubjects) => {
          setSubjects(newSubjects);
          onChange?.(newSubjects);
        },
        [onChange],
      );
    /* ────────────────────────────────────────────────────────────────────── * Add subject * ──────────────────────────────────────────────────────────────────── */ const addSubject =
      useCallback(
        (subject) => {
          const normalizedSubject = subject.trim();
          if (!normalizedSubject) {
            return;
          }
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
          /* * Keep focus inside the input so the teacher can * immediately add another subject. */ requestAnimationFrame(
            () => {
              inputRef.current?.focus();
            },
          );
        },
        [subjects, commit],
      );
    /* ────────────────────────────────────────────────────────────────────── * Remove subject * ──────────────────────────────────────────────────────────────────── */ const removeSubject =
      useCallback(
        (subjectToRemove) => {
          commit(subjects.filter((subject) => subject !== subjectToRemove));
        },
        [subjects, commit],
      );
    /* ────────────────────────────────────────────────────────────────────── * Input change * ──────────────────────────────────────────────────────────────────── */ const handleInputChange =
      (event) => {
        setInputValue(event.target.value);
        setIsOpen(true);
        setActiveIndex(-1);
      };
    /* ────────────────────────────────────────────────────────────────────── * Keyboard navigation * ──────────────────────────────────────────────────────────────────── */ const handleKeyDown =
      (event) => {
        /* * Open suggestions with ArrowDown when closed. */ if (!isOpen) {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setIsOpen(true);
            setActiveIndex(flatOptions.length > 0 ? 0 : -1);
            return;
          }
          /* * Enter while closed: * add whatever the teacher typed. */ if (
            event.key === "Enter"
          ) {
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
              /* * If no option is highlighted, Enter should * still add the typed subject. */ addSubject(
                trimmed,
              );
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
    /* ────────────────────────────────────────────────────────────────────── * Open dropdown * ──────────────────────────────────────────────────────────────────── */ const openDropdown =
      () => {
        setIsOpen(true);
        /* * Position after the dropdown has entered the DOM. */ requestAnimationFrame(
          () => {
            updateDropdownPosition();
          },
        );
      };
    /* ────────────────────────────────────────────────────────────────────── * Render * ──────────────────────────────────────────────────────────────────── */ return (
      <div
        ref={containerRef}
        className="bg-gradient-to-br from-brand-50 to-stone-100 rounded-2xl p-5 sm:p-8 border border-brand-200 w-full"
      >
        {" "}
        {/* ── Header ───────────────────────────────────────────────────── */}{" "}
        <h3 className="font-serif font-bold text-gray-800 text-lg sm:text-xl mb-1 sm:mb-2">
          {" "}
          Subjects You Teach *{" "}
        </h3>{" "}
        <p className="text-gray-600 text-sm sm:text-base mb-4">
          {" "}
          Select from popular subjects or type any subject and press{" "}
          <kbd className="px-1.5 py-0.5 text-xs rounded bg-stone-200 border border-stone-300 font-mono">
            {" "}
            Enter{" "}
          </kbd>{" "}
          to add it.{" "}
        </p>{" "}
        {/* ── Selected subjects ────────────────────────────────────────── */}{" "}
        {subjects.length > 0 && (
          <div
            className="flex flex-wrap gap-2 mb-4"
            role="list"
            aria-label="Selected subjects"
          >
            {" "}
            {subjects.map((subject) => (
              <span
                key={subject}
                role="listitem"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-brand-600 text-white shadow-sm"
              >
                {" "}
                <span>{subject}</span>{" "}
                <button
                  type="button"
                  onClick={() => removeSubject(subject)}
                  aria-label={`Remove ${subject}`}
                  className="rounded-full hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-white/60 p-0.5 transition-colors"
                >
                  {" "}
                  <X className="w-3.5 h-3.5" />{" "}
                </button>{" "}
              </span>
            ))}{" "}
          </div>
        )}{" "}
        {/* ── Input ────────────────────────────────────────────────────── */}{" "}
        <div className="relative">
          {" "}
          <div
            className={`flex items-center gap-2 px-4 py-3 text-base border-2 rounded-2xl shadow-sm transition-all duration-200 bg-white ${isOpen ? "border-brand-500 ring-4 ring-brand-200" : "border-brand-200 hover:border-brand-400"}`}
          >
            {" "}
            <Search
              className="w-4 h-4 text-brand-400 shrink-0"
              aria-hidden="true"
            />{" "}
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
              placeholder="Search or type a subject…"
              className="flex-1 min-w-0 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
            />{" "}
            {/* Add button */}{" "}
            <button
              type="button"
              onClick={() => addSubject(trimmed)}
              disabled={!trimmed || isAlreadySelected}
              aria-label="Add subject"
              className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1"
            >
              {" "}
              <Plus className="w-4 h-4" />{" "}
              <span className="hidden sm:inline"> Add </span>{" "}
            </button>{" "}
            {/* Dropdown toggle */}{" "}
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
              className="shrink-0 text-brand-400 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded"
            >
              {" "}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />{" "}
            </button>{" "}
          </div>{" "}
          {/* ───────────────────────────────────────────────────────────── * Dropdown * * IMPORTANT: * This is position: fixed and has its OWN overflow-y-auto. * Therefore it won't be clipped by parent containers. * ─────────────────────────────────────────────────────────── */}{" "}
          {isOpen && (
            <div
              ref={dropdownRef}
              id="subject-listbox"
              role="listbox"
              aria-label="Subject suggestions"
              aria-multiselectable="true"
              style={dropdownStyle}
              className="z-[9999] overflow-y-auto overscroll-contain bg-white rounded-2xl shadow-2xl border border-brand-100 focus:outline-none"
            >
              {" "}
              {/* Dropdown header */}{" "}
              <div className="sticky top-0 z-30 px-4 py-3 bg-white/95 backdrop-blur-sm border-b border-stone-100">
                {" "}
                <p className="text-xs font-semibold text-gray-500">
                  {" "}
                  {inputValue.trim()
                    ? "Matching subjects"
                    : "Popular subjects"}{" "}
                </p>{" "}
              </div>{" "}
              {/* No predefined results */}{" "}
              {filteredCategories.length === 0 && !showAddCustom && (
                <div className="px-5 py-6 text-center">
                  {" "}
                  <p className="text-sm text-gray-500">
                    {" "}
                    No matching subjects found.{" "}
                  </p>{" "}
                  <p className="text-xs text-gray-400 mt-1">
                    {" "}
                    Type a subject and press Enter to add it.{" "}
                  </p>{" "}
                </div>
              )}{" "}
              {/* ───────────────────────────────────────────────────────── * Categories * ─────────────────────────────────────────────────────── */}{" "}
              {filteredCategories.map((category, categoryIndex) => {
                return (
                  <div
                    key={category.category}
                    className={
                      categoryIndex > 0 ? "border-t border-stone-100" : ""
                    }
                  >
                    {" "}
                    {/* Category heading */}{" "}
                    <div className="px-4 pt-4 pb-2 bg-stone-50">
                      {" "}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {" "}
                        <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                          {" "}
                          {category.category}{" "}
                        </span>{" "}
                        {category.badge && (
                          <span className="text-xs text-brand-400 font-medium">
                            {" "}
                            · {category.badge}{" "}
                          </span>
                        )}{" "}
                      </div>{" "}
                    </div>{" "}
                    {/* Subjects */}{" "}
                    <div className="px-4 py-3 flex flex-wrap gap-2">
                      {" "}
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
                            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500 ${isActive ? "bg-brand-600 text-white border-brand-600 shadow-sm" : "bg-brand-50 text-brand-800 border-brand-200 hover:bg-brand-100 hover:border-brand-400"}`}
                          >
                            {" "}
                            {subject}{" "}
                          </button>
                        );
                      })}{" "}
                    </div>{" "}
                  </div>
                );
              })}{" "}
              {/* ───────────────────────────────────────────────────────── * Custom subject * ─────────────────────────────────────────────────────── */}{" "}
              {showAddCustom && (
                <div className="border-t border-stone-100 p-3 bg-white">
                  {" "}
                  <button
                    type="button"
                    id={`subject-option-${flatOptions.length}`}
                    role="option"
                    aria-selected={activeIndex === flatOptions.length}
                    onMouseEnter={() => setActiveIndex(flatOptions.length)}
                    onClick={() => addSubject(trimmed)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 ${activeIndex === flatOptions.length ? "bg-brand-600 text-white" : "bg-brand-50 hover:bg-brand-100 text-brand-700"}`}
                  >
                    {" "}
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/80 text-brand-600 shrink-0">
                      {" "}
                      <Plus className="w-4 h-4" />{" "}
                    </span>{" "}
                    <span className="min-w-0">
                      {" "}
                      <span className="block text-xs font-medium opacity-70 mb-0.5">
                        {" "}
                        Custom subject{" "}
                      </span>{" "}
                      <span className="block truncate">
                        {" "}
                        Add &ldquo;{trimmed}&rdquo;{" "}
                      </span>{" "}
                    </span>{" "}
                  </button>{" "}
                </div>
              )}{" "}
              {/* Bottom spacing */} <div className="h-2" />{" "}
            </div>
          )}{" "}
        </div>{" "}
        {/* ── Validation error ─────────────────────────────────────────── */}{" "}
        {formErrors?.preferredSubjects && (
          <p className="mt-4 text-red-600 flex items-center text-sm">
            {" "}
            <AlertCircle className="w-5 h-5 mr-2 shrink-0" />{" "}
            {formErrors.preferredSubjects}{" "}
          </p>
        )}{" "}
      </div>
    );
  };
export default SubjectsSection;
