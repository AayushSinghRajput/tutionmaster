import React, { useRef } from 'react';
import { AlertCircle, Upload, User } from 'lucide-react';

const Step1 = ({ 
  data, 
  errors, 
  formErrors,
  onChange, 
  onAvatarUpload,
  onAvatarRemove,
  onStateChange,
  onCityChange,
  avatarFile,
  availableCities,
  selectedState,
  register,
  watch,
  NEPAL_STATES
}) => {
  const stateValue = watch ? watch("address.state") : data.address?.state;
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onAvatarUpload) {
      // Create a URL for the selected file
      const fileUrl = URL.createObjectURL(file);
      onAvatarUpload({
        file,
        url: fileUrl,
        name: file.name
      });
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Personal Information
        </h2>
        <p className="text-gray-600 text-lg mt-3">
          Tell us about yourself and how students can contact you
        </p>
      </div>

      {/* Profile Picture Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
        <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
          <User className="w-6 h-6 text-blue-600 mr-3" />
          Profile Picture
        </h3>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        
        {/* Upload area */}
        {!avatarFile ? (
          <div 
            onClick={handleAvatarClick}
            className="border-2 border-dashed border-blue-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <p className="text-gray-700 text-lg font-semibold mb-2">
                Click to upload profile picture
              </p>
              <p className="text-gray-500 text-sm">
                Recommended: Square image, at least 400x400 pixels
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Supports JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative">
              <img 
                src={avatarFile.url} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Upload className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white px-4 py-3 rounded-xl border border-blue-200">
                <div className="text-left">
                  <p className="text-gray-700 font-medium">{avatarFile.name || 'profile.jpg'}</p>
                  <p className="text-gray-500 text-sm">Click camera icon to change</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={onAvatarRemove}
                className="flex items-center space-x-2 px-4 py-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-colors duration-200 border border-red-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="font-semibold">Remove</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Basic Information Grid */}
      <div className="grid grid-cols-1 gap-8 w-full">
        <div className="w-full">
          <label
            htmlFor="name"
            className="block text-lg font-bold text-gray-800 mb-3"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            {...(register ? register("name", { 
              required: "Name is required",
              maxLength: {
                value: 100,
                message: "Name must be less than 100 characters"
              }
            }) : {
              value: data.name || "",
              onChange: (e) => onChange?.("name", e.target.value)
            })}
            className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
              errors?.name || formErrors?.name
                ? "border-red-500 bg-red-50"
                : "border-blue-200 hover:border-blue-400"
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

      {/* Contact Information */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
        <h3 className="font-bold text-gray-800 text-xl mb-6">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-lg font-bold text-gray-800 mb-3"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              {...(register ? register("contact.email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email address",
                },
              }) : {
                value: data.contact?.email || "",
                onChange: (e) => onChange?.("contact.email", e.target.value)
              })}
              className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                errors?.contact?.email || formErrors?.contact?.email
                  ? "border-red-500 bg-red-50"
                  : "border-blue-200 hover:border-blue-400"
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

          <div className="w-full">
            <label
              htmlFor="phone"
              className="block text-lg font-bold text-gray-800 mb-3"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              {...(register ? register("contact.phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[\d\s\-\(\)]{10,}$/,
                  message: "Invalid phone number format",
                },
              }) : {
                value: data.contact?.phone || "",
                onChange: (e) => onChange?.("contact.phone", e.target.value)
              })}
              className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                errors?.contact?.phone || formErrors?.contact?.phone
                  ? "border-red-500 bg-red-50"
                  : "border-blue-200 hover:border-blue-400"
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

      {/* Address Information */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
        <h3 className="font-bold text-gray-800 text-xl mb-6">
          Address Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="md:col-span-2 w-full">
            <label
              htmlFor="street"
              className="block text-lg font-bold text-gray-800 mb-3"
            >
              Street Address *
            </label>
            <input
              type="text"
              id="street"
              {...(register ? register("address.street", {
                required: "Street address is required",
              }) : {
                value: data.address?.street || "",
                onChange: (e) => onChange?.("address.street", e.target.value)
              })}
              className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                errors?.address?.street || formErrors?.address?.street
                  ? "border-red-500 bg-red-50"
                  : "border-blue-200 hover:border-blue-400"
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

          <div className="w-full">
            <label
              htmlFor="state"
              className="block text-lg font-bold text-gray-800 mb-3"
            >
              State/Province *
            </label>
            <select
              id="state"
              {...(register ? register("address.state", {
                required: "State is required",
              }) : {
                value: data.address?.state || "",
                onChange: onStateChange || ((e) => onChange?.("address.state", e.target.value))
              })}
              value={selectedState || stateValue || ""}
              className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                errors?.address?.state || formErrors?.address?.state
                  ? "border-red-500 bg-red-50"
                  : "border-blue-200 hover:border-blue-400"
              }`}
            >
              <option value="">Select State/Province</option>
              {NEPAL_STATES?.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
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

          <div className="w-full">
            <label
              htmlFor="city"
              className="block text-lg font-bold text-gray-800 mb-3"
            >
              City *
            </label>
            <select
              id="city"
              {...(register ? register("address.city", {
                required: "City is required",
              }) : {
                value: data.address?.city || "",
                onChange: onCityChange || ((e) => onChange?.("address.city", e.target.value))
              })}
              disabled={!selectedState && !stateValue}
              className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                errors?.address?.city || formErrors?.address?.city
                  ? "border-red-500 bg-red-50"
                  : "border-blue-200 hover:border-blue-400"
              } ${
                (!selectedState && !stateValue) ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              <option value="">Select City</option>
              {availableCities?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {(errors?.address?.city || formErrors?.address?.city) && (
              <p className="mt-3 text-red-600 flex items-center text-base">
                <AlertCircle className="w-5 h-5 mr-2" />
                {errors?.address?.city?.message || formErrors?.address?.city}
              </p>
            )}
            {(!selectedState && !stateValue) && (
              <p className="mt-2 text-blue-600 text-base">
                Please select a state first to choose a city
              </p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="zipCode"
              className="block text-lg font-bold text-gray-800 mb-3"
            >
              ZIP Code *
            </label>
            <input
              type="number"
              id="zipCode"
              {...(register ? register("address.zipCode", {
                required: "ZIP code is required",
                min: {
                  value: 10000,
                  message: "ZIP code must be 5 digits"
                },
                max: {
                  value: 99999,
                  message: "ZIP code must be 5 digits"
                }
              }) : {
                value: data.address?.zipCode || "",
                onChange: (e) => onChange?.("address.zipCode", e.target.value)
              })}
              className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                errors?.address?.zipCode || formErrors?.address?.zipCode
                  ? "border-red-500 bg-red-50"
                  : "border-blue-200 hover:border-blue-400"
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
    </div>
  );
};

export default Step1;