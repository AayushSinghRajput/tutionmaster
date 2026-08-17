import { useState,useEffect } from "react";
import { Plus, X, AlertCircle } from "lucide-react";

const SubjectsSection = ({ formErrors, value = [], onChange }) => {
  const [subjects, setSubjects] = useState(value);
  const [inputValue, setInputValue] = useState("");

  const addSubject = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !subjects.includes(trimmed)) {
      const newSubjects = [...subjects, trimmed];
      setSubjects(newSubjects);
      onChange?.([...newSubjects]);
      setInputValue("");
    }
  };

  const removeSubject = (subject) => {
    const newSubjects = subjects.filter((s) => s !== subject);
    setSubjects(newSubjects);
    onChange?.([...newSubjects]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSubject();
    }
  };

  useEffect(()=>{
    setSubjects(value || []);
  },[value]);

  return (
    <div className="bg-gradient-to-br from-brand-50 to-stone-100 rounded-2xl p-5 sm:p-8 border border-brand-200 w-full">
      <h3 className="font-serif font-bold text-gray-800 text-lg sm:text-xl mb-4 sm:mb-6">
        Subjects You Teach *
      </h3>
      <p className="text-gray-600 text-base sm:text-lg mb-4">
        Enter all subjects you are qualified to teach (at least 1).
      </p>

      {/* Input + Add button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a subject and press Enter or +"
          className="flex-1 min-w-0 px-4 py-3 text-base sm:text-lg border-2 border-brand-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300"
        />
        <button
          type="button"
          onClick={addSubject}
          className="bg-brand-600 text-white px-4 py-3 rounded-xl hover:bg-brand-700 transition-colors flex items-center justify-center shrink-0"
        >
          <Plus className="w-5 h-5 mr-1" /> Add
        </button>
      </div>

      {/* Subject tags */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {subjects.map((sub) => (
          <span
            key={sub}
            className="tag-subject flex items-center space-x-2 rounded-full"
          >
            <span>{sub}</span>
            <button
              type="button"
              onClick={() => removeSubject(sub)}
              className="hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>

      {/* Validation error */}
      {formErrors?.preferredSubjects && (
        <p className="mt-4 text-red-600 flex items-center text-base">
          <AlertCircle className="w-5 h-5 mr-2" />
          {formErrors.preferredSubjects}
        </p>
      )}
    </div>
  );
};

export default SubjectsSection;
