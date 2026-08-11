import { AlertCircle } from "lucide-react";

const ContactInformation = ({ data, errors, formErrors, onChange, register }) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 sm:p-8 border border-blue-200 w-full">
    <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-4 sm:mb-6">Contact Information</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full">
      {/* Email */}
      <div className="w-full">
        <label htmlFor="email" className="block text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          {...(register
            ? register("contact.email", {
                required: "Email is required",
                pattern: { value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: "Invalid email address" },
              })
            : { value: data.contact?.email || "", onChange: (e) => onChange?.("contact.email", e.target.value) })}
          className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
            errors?.contact?.email || formErrors?.contact?.email ? "border-red-500 bg-red-50" : "border-blue-200 hover:border-blue-400"
          }`}
          placeholder="your.email@example.com"
        />
        {(errors?.contact?.email || formErrors?.contact?.email) && (
          <p className="mt-3 text-red-600 flex items-center text-base">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors?.contact?.email?.message || formErrors?.contact?.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="w-full">
        <label htmlFor="phone" className="block text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          {...(register
            ? register("contact.phone", {
                required: "Phone number is required",
                pattern: { value: /^\+?[\d\s\-\(\)]{10,}$/, message: "Invalid phone number format" },
              })
            : { value: data.contact?.phone || "", onChange: (e) => onChange?.("contact.phone", e.target.value) })}
          className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
            errors?.contact?.phone || formErrors?.contact?.phone ? "border-red-500 bg-red-50" : "border-blue-200 hover:border-blue-400"
          }`}
          placeholder="98XXXXXXXX"
        />
        {(errors?.contact?.phone || formErrors?.contact?.phone) && (
          <p className="mt-3 text-red-600 flex items-center text-base">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors?.contact?.phone?.message || formErrors?.contact?.phone}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default ContactInformation;
