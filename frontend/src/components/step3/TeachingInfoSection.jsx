import { AlertCircle } from "lucide-react";

const TeachingInfoSection = ({
  data,
  errors,
  formErrors,
  register,
  onChange,
  TEACHING_MODES,
}) => (
  <div className="bg-gradient-to-br from-brand-50 to-stone-100 rounded-2xl p-5 sm:p-8 border border-brand-200 w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full">
      {/* Years of Experience */}
      <div className="w-full">
        <label
          htmlFor="experience"
          className="flex items-end min-h-[3rem] sm:min-h-[3.5rem] text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3"
        >
          Years of Experience *
        </label>
        <input
          type="number"
          id="experience"
          {...(register
            ? register("experience", {
                required: "Experience is required",
                min: { value: 0, message: "Experience cannot be negative" },
                max: {
                  value: 50,
                  message: "Experience cannot exceed 50 years",
                },
              })
            : {
                value: data.experience || 0,
                onChange: (e) => onChange?.("experience", e.target.value),
              })}
          className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 ${
            errors?.experience || formErrors?.experience
              ? "border-red-500 bg-red-50"
              : "border-brand-200 hover:border-brand-400"
          }`}
          placeholder="5"
          min="0"
          max="50"
        />
        {(errors?.experience || formErrors?.experience) && (
          <p className="mt-3 text-red-600 flex items-center text-base">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors?.experience?.message || formErrors?.experience}
          </p>
        )}
      </div>

      {/* Monthly Fee */}
      <div className="w-full">
        <label
          htmlFor="monthlyRate"
          className="flex items-end min-h-[3rem] sm:min-h-[3.5rem] text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3"
        >
          Monthly Fee (₨) *
        </label>
        <div className="relative w-full">
          <input
            type="number"
            id="monthlyRate"
            {...(register
              ? register("monthlyRate", {
                  required: "Monthly fee is required",
                  min: { value: 500, message: "Monthly fee cannot be less than ₨500" },
                  max: {
                    value: 200000,
                    message: "Monthly fee cannot exceed ₨2,00,000",
                  },
                })
              : {
                  value: data.monthlyRate ?? (data.hourlyRate ? data.hourlyRate * 20 : 8000),
                  onChange: (e) => onChange?.("monthlyRate", e.target.value),
                })}
            className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg pr-16 sm:pr-20 border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 ${
              errors?.monthlyRate || formErrors?.monthlyRate || errors?.hourlyRate || formErrors?.hourlyRate
                ? "border-red-500 bg-red-50"
                : "border-brand-200 hover:border-brand-400"
            }`}
            placeholder="8000"
            min="500"
            max="200000"
            step="500"
          />
          <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2">
            <span className="text-brand-600 font-bold text-sm sm:text-base">₨/month</span>
          </div>
        </div>
        {(errors?.monthlyRate || formErrors?.monthlyRate || errors?.hourlyRate || formErrors?.hourlyRate) && (
          <p className="mt-3 text-red-600 flex items-center text-base">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors?.monthlyRate?.message || formErrors?.monthlyRate || errors?.hourlyRate?.message || formErrors?.hourlyRate}
          </p>
        )}
      </div>

      {/* Teaching Mode */}
      <div className="w-full">
        <label
          htmlFor="teachingMode"
          className="flex items-end min-h-[3rem] sm:min-h-[3.5rem] text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3"
        >
          Teaching Mode *
        </label>
        <select
          id="teachingMode"
          {...(register
            ? register("teachingMode", {
                required: "Teaching mode is required",
              })
            : {
                value: data.teachingMode || "Both",
                onChange: (e) => onChange?.("teachingMode", e.target.value),
              })}
          className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 ${
            errors?.teachingMode || formErrors?.teachingMode
              ? "border-red-500 bg-red-50"
              : "border-brand-200 hover:border-brand-400"
          }`}
        >
          {TEACHING_MODES?.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
        {(errors?.teachingMode || formErrors?.teachingMode) && (
          <p className="mt-3 text-red-600 flex items-center text-base">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors?.teachingMode?.message || formErrors?.teachingMode}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default TeachingInfoSection;
