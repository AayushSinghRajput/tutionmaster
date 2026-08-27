import { AlertCircle } from "lucide-react";

const AddressInformation = ({
  data,
  errors,
  formErrors,
  onChange,
  onStateChange,
  onCityChange,
  selectedState,
  stateValue,
  register,
  NEPAL_STATES,
}) => (
  <div className="bg-gradient-to-br from-brand-50 to-stone-100 rounded-2xl p-5 sm:p-8 border border-brand-200 w-full">
    <h3 className="font-serif font-bold text-gray-800 text-lg sm:text-xl mb-4 sm:mb-6">
      Address Information
    </h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full">
      {/* Street Address */}
      <div className="sm:col-span-2 w-full">
        <label
          htmlFor="street"
          className="block text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3"
        >
          Street Address *
        </label>
        <input
          type="text"
          id="street"
          {...(register
            ? register("address.street", {
                required: "Street address is required",
              })
            : {
                value: data.address?.street || "",
                onChange: (e) => onChange?.("address.street", e.target.value),
              })}
          className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 ${
            errors?.address?.street || formErrors?.address?.street
              ? "border-red-500 bg-red-50"
              : "border-brand-200 hover:border-brand-400"
          }`}
          placeholder="Tinkune"
        />
        {(errors?.address?.street || formErrors?.address?.street) && (
          <p className="mt-3 text-red-600 flex items-center text-base">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors?.address?.street?.message || formErrors?.address?.street}
          </p>
        )}
      </div>

      {/* State */}
      <div className="w-full">
        <label
          htmlFor="state"
          className="block text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3"
        >
          State/Province *
        </label>
        <select
          id="state"
          {...(register
            ? register("address.state", { required: "State is required" })
            : {
                value: selectedState || stateValue || data.address?.state || "",
                onChange:
                  onStateChange ||
                  ((e) => onChange?.("address.state", e.target.value)),
              })}
          className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 ${
            errors?.address?.state || formErrors?.address?.state
              ? "border-red-500 bg-red-50"
              : "border-brand-200 hover:border-brand-400"
          }`}
        >
          <option value="">Select State/Province</option>
          {NEPAL_STATES?.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {(errors?.address?.state || formErrors?.address?.state) && (
          <p className="mt-3 text-red-600 flex items-center text-base">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors?.address?.state?.message || formErrors?.address?.state}
          </p>
        )}
      </div>

      {/* City */}
      <div className="w-full">
        <label
          htmlFor="city"
          className="block text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3"
        >
          City *
        </label>
        <input
          type="text"
          id="city"
          {...(register
            ? register("address.city", { required: "City is required" })
            : {
                value: data.address?.city || "",
                onChange: (e) => {
                  onChange?.("address.city", e.target.value);
                  onCityChange?.(e.target.value);
                },
              })}
          className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 ${
            errors?.address?.city || formErrors?.address?.city
              ? "border-red-500 bg-red-50"
              : "border-brand-200 hover:border-brand-400"
          }`}
          placeholder="Kathmandu"
        />
        {(errors?.address?.city || formErrors?.address?.city) && (
          <p className="mt-3 text-red-600 flex items-center text-base">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors?.address?.city?.message || formErrors?.address?.city}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default AddressInformation;
