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
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
    <h3 className="font-bold text-gray-800 text-xl mb-6">Address Information</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Street Address */}
      <div className="md:col-span-2 w-full">
        <label htmlFor="street" className="block text-lg font-bold text-gray-800 mb-3">
          Street Address *
        </label>
        <input
          type="text"
          id="street"
          {...(register
            ? register("address.street", { required: "Street address is required" })
            : { value: data.address?.street || "", onChange: (e) => onChange?.("address.street", e.target.value) })}
          className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
            errors?.address?.street || formErrors?.address?.street ? "border-red-500 bg-red-50" : "border-blue-200 hover:border-blue-400"
          }`}
          placeholder="123 Main Street"
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
        <label htmlFor="state" className="block text-lg font-bold text-gray-800 mb-3">
          State/Province *
        </label>
        <select
          id="state"
          {...(register
            ? register("address.state", { required: "State is required" })
            : { value: data.address?.state || "", onChange: onStateChange || ((e) => onChange?.("address.state", e.target.value)) })}
          value={selectedState || stateValue || ""}
          className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
            errors?.address?.state || formErrors?.address?.state ? "border-red-500 bg-red-50" : "border-blue-200 hover:border-blue-400"
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
        <label htmlFor="city" className="block text-lg font-bold text-gray-800 mb-3">
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
          className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
            errors?.address?.city || formErrors?.address?.city ? "border-red-500 bg-red-50" : "border-blue-200 hover:border-blue-400"
          }`}
          placeholder="Enter your city"
        />
        {(errors?.address?.city || formErrors?.address?.city) && (
          <p className="mt-3 text-red-600 flex items-center text-base">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors?.address?.city?.message || formErrors?.address?.city}
          </p>
        )}
      </div>

      {/* ZIP Code */}
      <div className="w-full">
        <label htmlFor="zipCode" className="block text-lg font-bold text-gray-800 mb-3">
          ZIP Code *
        </label>
        <input
          type="number"
          id="zipCode"
          {...(register
            ? register("address.zipCode", {
                required: "ZIP code is required",
                min: { value: 10000, message: "ZIP code must be 5 digits" },
                max: { value: 99999, message: "ZIP code must be 5 digits" },
              })
            : { value: data.address?.zipCode || "", onChange: (e) => onChange?.("address.zipCode", e.target.value) })}
          className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
            errors?.address?.zipCode || formErrors?.address?.zipCode ? "border-red-500 bg-red-50" : "border-blue-200 hover:border-blue-400"
          }`}
          placeholder="44600"
          min="10000"
          max="99999"
        />
        {(errors?.address?.zipCode || formErrors?.address?.zipCode) && (
          <p className="mt-3 text-red-600 flex items-center text-base">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors?.address?.zipCode?.message || formErrors?.address?.zipCode}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default AddressInformation;
