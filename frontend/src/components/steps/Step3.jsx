import { BookOpen, AlertCircle } from 'lucide-react';

const Step3 = ({ 
  data, 
  errors, 
  formErrors,
  register,
  watch,
  TEACHING_MODES
}) => {
  const bioValue = watch ? watch("bio") : data.bio;
  const bioLength = bioValue?.length || 0;

  return (
    <div className="space-y-8 w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Teaching Details
        </h2>
        <p className="text-gray-600 text-lg mt-3">
          Describe your experience and teaching style
        </p>
      </div>

      {/* Teaching Information */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="w-full">
            <label
              htmlFor="experience"
              className="block text-lg font-bold text-gray-800 mb-3"
            >
              Years of Experience *
            </label>
            <input
              type="number"
              id="experience"
              {...(register ? register("experience", {
                required: "Experience is required",
                min: {
                  value: 0,
                  message: "Experience cannot be negative",
                },
                max: {
                  value: 50,
                  message: "Experience cannot exceed 50 years",
                },
              }) : {
                value: data.experience || 0,
                onChange: (e) => onChange?.("experience", e.target.value)
              })}
              className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                errors?.experience || formErrors?.experience
                  ? "border-red-500 bg-red-50"
                  : "border-blue-200 hover:border-blue-400"
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

          <div className="w-full">
            <label
              htmlFor="hourlyRate"
              className="block text-lg font-bold text-gray-800 mb-3"
            >
              Hourly Rate (₨) *
            </label>
            <div className="relative w-full">
              <input
                type="number"
                id="hourlyRate"
                {...(register ? register("hourlyRate", {
                  required: "Hourly rate is required",
                  min: {
                    value: 0,
                    message: "Hourly rate cannot be negative",
                  },
                  max: {
                    value: 10000,
                    message: "Hourly rate cannot exceed ₨10,000",
                  },
                }) : {
                  value: data.hourlyRate || 0,
                  onChange: (e) => onChange?.("hourlyRate", e.target.value)
                })}
                className={`w-full px-5 py-4 text-lg pr-16 border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                  errors?.hourlyRate || formErrors?.hourlyRate
                    ? "border-red-500 bg-red-50"
                    : "border-blue-200 hover:border-blue-400"
                }`}
                placeholder="500"
                min="0"
                max="10000"
                step="50"
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <span className="text-blue-600 font-bold text-lg">
                  ₨/hr
                </span>
              </div>
            </div>
            {(errors?.hourlyRate || formErrors?.hourlyRate) && (
              <p className="mt-3 text-red-600 flex items-center text-base">
                <AlertCircle className="w-5 h-5 mr-2" />
                {errors?.hourlyRate?.message || formErrors?.hourlyRate}
              </p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="teachingMode"
              className="block text-lg font-bold text-gray-800 mb-3"
            >
              Teaching Mode *
            </label>
            <select
              id="teachingMode"
              {...(register ? register("teachingMode", {
                required: "Teaching mode is required",
              }) : {
                value: data.teachingMode || "Both",
                onChange: (e) => onChange?.("teachingMode", e.target.value)
              })}
              className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                errors?.teachingMode || formErrors?.teachingMode
                  ? "border-red-500 bg-red-50"
                  : "border-blue-200 hover:border-blue-400"
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

      {/* Bio Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
        <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
          <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
          Bio & Teaching Philosophy *
        </h3>
        <p className="text-gray-600 text-lg mb-6">
          Write a compelling bio that showcases your teaching style,
          experience, and what makes you a great teacher. Minimum 50
          characters.
        </p>
        <div className="w-full">
          <textarea
            id="bio"
            {...(register ? register("bio", {
              required: "Bio is required",
              minLength: {
                value: 50,
                message: "Bio must be at least 50 characters long",
              },
              maxLength: {
                value: 1000,
                message: "Bio must be less than 1000 characters",
              },
            }) : {
              value: data.bio || "",
              onChange: (e) => onChange?.("bio", e.target.value)
            })}
            className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 resize-none ${
              errors?.bio || formErrors?.bio
                ? "border-red-500 bg-red-50"
                : "border-blue-200 hover:border-blue-400"
            }`}
            placeholder="Describe your teaching experience, methodology, and what students can expect from your lessons..."
            rows="8"
          />
          {(errors?.bio || formErrors?.bio) && (
            <p className="mt-3 text-red-600 flex items-center text-base">
              <AlertCircle className="w-5 h-5 mr-2" />
              {errors?.bio?.message || formErrors?.bio}
            </p>
          )}
          <div
            className={`mt-3 text-lg font-semibold ${
              bioLength < 50 ? "text-red-600" : "text-blue-600"
            }`}
          >
            {bioLength}/1000 characters
            {bioLength < 50 &&
              ` (minimum ${50 - bioLength} more characters needed)`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;