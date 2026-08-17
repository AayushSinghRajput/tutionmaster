import { AlertCircle } from "lucide-react";

const BasicInformation = ({ data, errors, formErrors, onChange, register }) => (
  <div className="grid grid-cols-1 gap-8 w-full">
    <div className="w-full">
      <label htmlFor="name" className="block text-base sm:text-lg font-bold text-gray-800 mb-1">
        Enter Your Full Name *
      </label>
      <p className="text-sm text-gray-500 mb-2 sm:mb-3">
        Pre-filled from your account — feel free to change it.
      </p>
      <input
        type="text"
        id="name"
        {...(register
          ? register("name", {
              required: "Name is required",
              maxLength: { value: 100, message: "Name must be less than 100 characters" },
            })
          : { value: data.name || "", onChange: (e) => onChange?.("name", e.target.value) })}
        className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 ${
          errors?.name || formErrors?.name ? "border-red-500 bg-red-50" : "border-brand-200 hover:border-brand-400"
        }`}
        placeholder="Enter your full name"
      />
      {(errors?.name || formErrors?.name) && (
        <p className="mt-3 text-red-600 flex items-center text-base">
          <AlertCircle className="w-5 h-5 mr-2" />
          {errors?.name?.message || formErrors?.name}
        </p>
      )}
    </div>
  </div>
);

export default BasicInformation;
