import { Trash2, AlertCircle } from "lucide-react";

const QualificationCard = ({
  field,
  index,
  totalCount,
  errors,
  formErrors,
  register,
  data,
  onQualificationRemove,
  onQualificationAdd,
}) => {
  return (
    <div className="bg-white p-5 sm:p-8 border-2 border-brand-200 rounded-2xl hover:border-brand-400 transition-all duration-300 shadow-sm w-full">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6 w-full gap-2">
        <span className="font-bold text-gray-800 text-base sm:text-lg">
          Qualification #{index + 1}
        </span>
        {totalCount > 1 && (
          <button
            type="button"
            onClick={() => onQualificationRemove(index)}
            className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 sm:px-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200 border border-red-200 shrink-0"
          >
            <Trash2 className="w-5 h-5" />
            <span className="font-semibold text-sm sm:text-base">Remove</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 sm:gap-6 w-full">
        {/* Degree Field */}
        <div className="w-full">
          <label
            htmlFor={`degree-${index}`}
            className="block text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3"
          >
            Degree/Certificate *
          </label>
          <input
            type="text"
            id={`degree-${index}`}
            {...(register
              ? register(`qualifications.${index}.degree`, {
                  required: "Degree is required",
                })
              : {
                  value: data.qualifications?.[index]?.degree || "",
                  onChange: (e) =>
                    onQualificationAdd?.(index, "degree", e.target.value),
                })}
            className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 ${
              errors?.qualifications?.[index]?.degree ||
              formErrors?.qualifications?.[index]?.degree
                ? "border-red-500 bg-red-50"
                : "border-brand-200 hover:border-brand-400"
            }`}
            placeholder="e.g., Bachelor of Science in Mathematics"
          />
          {(errors?.qualifications?.[index]?.degree ||
            formErrors?.qualifications?.[index]?.degree) && (
            <p className="mt-3 text-red-600 flex items-center text-base">
              <AlertCircle className="w-5 h-5 mr-2" />
              {errors?.qualifications?.[index]?.degree?.message ||
                formErrors?.qualifications?.[index]?.degree}
            </p>
          )}
        </div>

        {/* Institution Field */}
        <div className="w-full">
          <label
            htmlFor={`institution-${index}`}
            className="block text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3"
          >
            Institution Name *
          </label>
          <input
            type="text"
            id={`institution-${index}`}
            {...(register
              ? register(`qualifications.${index}.institution`, {
                  required: "Institution is required",
                })
              : {
                  value: data.qualifications?.[index]?.institution || "",
                  onChange: (e) =>
                    onQualificationAdd?.(index, "institution", e.target.value),
                })}
            className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 ${
              errors?.qualifications?.[index]?.institution ||
              formErrors?.qualifications?.[index]?.institution
                ? "border-red-500 bg-red-50"
                : "border-brand-200 hover:border-brand-400"
            }`}
            placeholder="e.g., Tribhuvan University"
          />
          {(errors?.qualifications?.[index]?.institution ||
            formErrors?.qualifications?.[index]?.institution) && (
            <p className="mt-3 text-red-600 flex items-center text-base">
              <AlertCircle className="w-5 h-5 mr-2" />
              {errors?.qualifications?.[index]?.institution?.message ||
                formErrors?.qualifications?.[index]?.institution}
            </p>
          )}
        </div>

        {/* Year Field */}
        <div className="w-full">
          <label
            htmlFor={`year-${index}`}
            className="block text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3"
          >
            Year Completed *
          </label>
          <input
            type="number"
            id={`year-${index}`}
            {...(register
              ? register(`qualifications.${index}.year`, {
                  required: "Year is required",
                })
              : {
                  value:
                    data.qualifications?.[index]?.year ||
                    new Date().getFullYear(),
                  onChange: (e) =>
                    onQualificationAdd?.(index, "year", e.target.value),
                })}
            className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 ${
              errors?.qualifications?.[index]?.year ||
              formErrors?.qualifications?.[index]?.year
                ? "border-red-500 bg-red-50"
                : "border-brand-200 hover:border-brand-400"
            }`}
            placeholder="2020"
          />
          {(errors?.qualifications?.[index]?.year ||
            formErrors?.qualifications?.[index]?.year) && (
            <p className="mt-3 text-red-600 flex items-center text-base">
              <AlertCircle className="w-5 h-5 mr-2" />
              {errors?.qualifications?.[index]?.year?.message ||
                formErrors?.qualifications?.[index]?.year}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QualificationCard;
