import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import AvailabilityPicker from './AvailabilityPicker';
import FileUpload from './FileUpload';
import { SUBJECTS, TEACHING_MODES } from '../../utils/constants';
import { validateTeacherProfile } from '../../utils/validation';
import { Plus, Trash2, Save, X, AlertCircle, ChevronRight, ChevronLeft, GraduationCap, User, BookOpen, Clock } from 'lucide-react';

const TeacherForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  submitButtonText = 'Save Profile',
  cancelButtonText = 'Cancel',
  isEdit = false,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: initialData || {
      name: '',
      contact: {
        email: '',
        phone: ''
      },
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      qualifications: [{
        degree: '',
        institution: '',
        year: new Date().getFullYear()
      }],
      preferredSubjects: [],
      bio: '',
      experience: 0,
      hourlyRate: 0,
      teachingMode: 'Both',
      availability: []
    }
  });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification
  } = useFieldArray({
    control,
    name: 'qualifications'
  });

  const watchSubjects = watch('preferredSubjects', []);
  const watchAvailability = watch('availability', []);
  const watchBio = watch('bio', '');

  // Initialize form with existing data
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      if (initialData.avatarPublicId) {
        setAvatarFile({ publicId: initialData.avatarPublicId, url: initialData.avatarUrl });
      }
      if (initialData.cvPublicId) {
        setCvFile({ publicId: initialData.cvPublicId, url: initialData.cvUrl });
      }
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    try {
      const validation = validateTeacherProfile(data);
      
      if (!validation.isValid) {
        setFormErrors(validation.errors);
        if (validation.errors.name || validation.errors.contact) {
          setCurrentStep(1);
        } else if (validation.errors.qualifications || validation.errors.preferredSubjects) {
          setCurrentStep(2);
        } else if (validation.errors.bio || validation.errors.experience) {
          setCurrentStep(3);
        }
        return;
      }

      setFormErrors({});

      const submitData = {
        ...data,
        avatarPublicId: avatarFile?.publicId || null,
        cvPublicId: cvFile?.publicId || null
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleAvatarUpload = (fileData) => {
    setAvatarFile(fileData);
  };

  const handleAvatarRemove = () => {
    setAvatarFile(null);
    setValue('avatarPublicId', null);
  };

  const handleCVUpload = (fileData) => {
    setCvFile(fileData);
  };

  const handleCVRemove = () => {
    setCvFile(null);
    setValue('cvPublicId', null);
  };

  const addQualification = () => {
    appendQualification({
      degree: '',
      institution: '',
      year: new Date().getFullYear()
    });
  };

  const handleSubjectToggle = (subject) => {
    const currentSubjects = watchSubjects || [];
    const updatedSubjects = currentSubjects.includes(subject)
      ? currentSubjects.filter(s => s !== subject)
      : [...currentSubjects, subject];
    
    setValue('preferredSubjects', updatedSubjects);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Personal information', icon: User },
    { number: 2, title: 'Qualifications', description: 'Education & subjects', icon: GraduationCap },
    { number: 3, title: 'Teaching Details', description: 'Experience & bio', icon: BookOpen },
    { number: 4, title: 'Availability', description: 'Schedule & preferences', icon: Clock }
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-blue-100 ${className}`}>
      {/* Progress Steps */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 rounded-t-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isEdit ? 'Update Teacher Profile' : 'Become a Teacher'}
            </h2>
            <p className="text-blue-100 mt-1">
              {isEdit ? 'Update your teaching profile information' : 'Join our community of expert educators'}
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2">
            <span className="text-white font-semibold">
              Step {currentStep} of {steps.length}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step.number 
                      ? currentStep > step.number 
                        ? 'bg-green-500 text-white shadow-lg' 
                        : 'bg-white text-blue-600 shadow-lg transform scale-110'
                      : 'bg-white bg-opacity-20 text-white'
                  }`}>
                    <IconComponent size={20} />
                  </div>
                  <div className="ml-3">
                    <div className={`font-semibold transition-colors duration-300 ${
                      currentStep >= step.number ? 'text-white' : 'text-blue-200'
                    }`}>
                      {step.title}
                    </div>
                    <div className={`text-sm transition-colors duration-300 ${
                      currentStep >= step.number ? 'text-blue-100' : 'text-blue-300'
                    }`}>
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-4 flex-1 h-1 rounded-full transition-all duration-300 ${
                    currentStep > step.number ? 'bg-green-400' : 'bg-white bg-opacity-30'
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Form Errors */}
      {Object.keys(formErrors).length > 0 && (
        <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-red-800">Please fix the following errors:</div>
            <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
              {Object.entries(formErrors).map(([key, error]) => (
                <li key={key}>{typeof error === 'object' ? JSON.stringify(error) : error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
              <p className="text-gray-600 mt-2">Tell us about yourself and how students can contact you</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 text-blue-600 mr-2" />
                Profile Picture
              </h4>
              <FileUpload
                type="avatar"
                onUploadComplete={handleAvatarUpload}
                onRemove={handleAvatarRemove}
                currentFile={avatarFile}
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name.message}
                </p>}
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('contact.email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Invalid email address'
                      }
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.contact?.email ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.contact?.email && <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.contact.email.message}
                  </p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('contact.phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\+?[\d\s\-\(\)]{10,}$/,
                        message: 'Invalid phone number'
                      }
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.contact?.phone ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                    }`}
                    placeholder="+977 98XXXXXXXX"
                  />
                  {errors.contact?.phone && <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.contact.phone.message}
                  </p>}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Address Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="street" className="block text-sm font-semibold text-gray-800 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="street"
                    {...register('address.street', { required: 'Street address is required' })}
                    className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.address?.street ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                    }`}
                    placeholder="123 Main Street"
                  />
                  {errors.address?.street && <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.address.street.message}
                  </p>}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-800 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    {...register('address.city', { required: 'City is required' })}
                    className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.address?.city ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                    }`}
                    placeholder="Kathmandu"
                  />
                  {errors.address?.city && <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.address.city.message}
                  </p>}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-semibold text-gray-800 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    {...register('address.state', { required: 'State is required' })}
                    className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.address?.state ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                    }`}
                    placeholder="Bagmati"
                  />
                  {errors.address?.state && <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.address.state.message}
                  </p>}
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-800 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    {...register('address.zipCode', { 
                      required: 'ZIP code is required',
                      pattern: {
                        value: /^\d{5}$/,
                        message: 'Invalid ZIP code format'
                      }
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.address?.zipCode ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                    }`}
                    placeholder="44600"
                  />
                  {errors.address?.zipCode && <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.address.zipCode.message}
                  </p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Qualifications */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">Qualifications & Subjects</h3>
              <p className="text-gray-600 mt-2">Showcase your education and what you teach</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                Education & Qualifications
              </h4>
              <div className="space-y-4">
                {qualificationFields.map((field, index) => (
                  <div key={field.id} className="bg-white p-6 border-2 border-blue-100 rounded-xl hover:border-blue-300 transition-all duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-gray-800">Qualification #{index + 1}</span>
                      {qualificationFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQualification(index)}
                          className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor={`degree-${index}`} className="block text-sm font-semibold text-gray-800 mb-2">
                          Degree/Certificate *
                        </label>
                        <input
                          type="text"
                          id={`degree-${index}`}
                          {...register(`qualifications.${index}.degree`, { 
                            required: 'Degree is required' 
                          })}
                          className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            errors.qualifications?.[index]?.degree ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                          }`}
                          placeholder="e.g., Bachelor of Science in Mathematics"
                        />
                        {errors.qualifications?.[index]?.degree && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.qualifications[index].degree.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor={`institution-${index}`} className="block text-sm font-semibold text-gray-800 mb-2">
                          Institution *
                        </label>
                        <input
                          type="text"
                          id={`institution-${index}`}
                          {...register(`qualifications.${index}.institution`, { 
                            required: 'Institution is required' 
                          })}
                          className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            errors.qualifications?.[index]?.institution ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                          }`}
                          placeholder="e.g., Tribhuvan University"
                        />
                        {errors.qualifications?.[index]?.institution && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.qualifications[index].institution.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor={`year-${index}`} className="block text-sm font-semibold text-gray-800 mb-2">
                          Year Completed *
                        </label>
                        <input
                          type="number"
                          id={`year-${index}`}
                          {...register(`qualifications.${index}.year`, { 
                            required: 'Year is required',
                            min: {
                              value: 1950,
                              message: 'Year must be 1950 or later'
                            },
                            max: {
                              value: new Date().getFullYear(),
                              message: `Year cannot be in the future`
                            }
                          })}
                          className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            errors.qualifications?.[index]?.year ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                          }`}
                          placeholder="2020"
                          min="1950"
                          max={new Date().getFullYear()}
                        />
                        {errors.qualifications?.[index]?.year && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.qualifications[index].year.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addQualification}
                  className="flex items-center space-x-3 w-full px-6 py-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">Add Another Qualification</span>
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-4">CV/Resume</h4>
              <FileUpload
                type="cv"
                onUploadComplete={handleCVUpload}
                onRemove={handleCVRemove}
                currentFile={cvFile}
              />
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Subjects You Teach *</h4>
              <p className="text-gray-600 mb-4">Select all subjects you're qualified to teach</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SUBJECTS.map(subject => (
                  <label key={subject} className="flex items-center space-x-3 p-3 bg-white border-2 border-blue-100 rounded-xl hover:border-blue-300 cursor-pointer transition-all duration-200">
                    <input
                      type="checkbox"
                      value={subject}
                      checked={watchSubjects.includes(subject)}
                      onChange={() => handleSubjectToggle(subject)}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    />
                    <span className="text-gray-700 font-medium">{subject}</span>
                  </label>
                ))}
              </div>
              {formErrors.preferredSubjects && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {formErrors.preferredSubjects}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Teaching Details */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">Teaching Details</h3>
              <p className="text-gray-600 mt-2">Describe your experience and teaching style</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="experience" className="block text-sm font-semibold text-gray-800 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    id="experience"
                    {...register('experience', { 
                      required: 'Experience is required',
                      min: {
                        value: 0,
                        message: 'Experience cannot be negative'
                      },
                      max: {
                        value: 50,
                        message: 'Experience cannot exceed 50 years'
                      }
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.experience ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                    }`}
                    placeholder="5"
                    min="0"
                    max="50"
                  />
                  {errors.experience && <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.experience.message}
                  </p>}
                </div>

                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-semibold text-gray-800 mb-2">
                    Hourly Rate (₨) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="hourlyRate"
                      {...register('hourlyRate', { 
                        required: 'Hourly rate is required',
                        min: {
                          value: 0,
                          message: 'Hourly rate cannot be negative'
                        },
                        max: {
                          value: 10000,
                          message: 'Hourly rate cannot exceed ₨10,000'
                        }
                      })}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                        errors.hourlyRate ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                      }`}
                      placeholder="500"
                      min="0"
                      max="10000"
                      step="50"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <span className="text-blue-600 font-semibold">₨</span>
                    </div>
                  </div>
                  {errors.hourlyRate && <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.hourlyRate.message}
                  </p>}
                </div>

                <div>
                  <label htmlFor="teachingMode" className="block text-sm font-semibold text-gray-800 mb-2">
                    Teaching Mode *
                  </label>
                  <select
                    id="teachingMode"
                    {...register('teachingMode', { required: 'Teaching mode is required' })}
                    className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.teachingMode ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                    }`}
                  >
                    {TEACHING_MODES.map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                  {errors.teachingMode && <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.teachingMode.message}
                  </p>}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                Bio & Teaching Philosophy *
              </h4>
              <p className="text-gray-600 mb-4">
                Write a compelling bio that showcases your teaching style, experience, 
                and what makes you a great teacher. Minimum 50 characters.
              </p>
              <div>
                <textarea
                  id="bio"
                  {...register('bio', { 
                    required: 'Bio is required',
                    minLength: {
                      value: 50,
                      message: 'Bio must be at least 50 characters long'
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Bio must be less than 1000 characters'
                    }
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.bio ? 'border-red-500 bg-red-50' : 'border-blue-100 hover:border-blue-300'
                  }`}
                  placeholder="Describe your teaching experience, methodology, and what students can expect from your lessons..."
                  rows="6"
                />
                {errors.bio && <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.bio.message}
                </p>}
                <div className="mt-2 text-sm text-blue-600 font-medium">
                  {watchBio.length}/1000 characters
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Availability */}
        {currentStep === 4 && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">Availability & Schedule</h3>
              <p className="text-gray-600 mt-2">Set your available days and times for teaching</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <AvailabilityPicker
                value={watchAvailability}
                onChange={(availability) => setValue('availability', availability)}
              />
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
              <h4 className="font-bold text-lg mb-2 flex items-center">
                <Save className="w-5 h-5 mr-2" />
                Ready to Complete Your Profile!
              </h4>
              <p className="text-blue-100">
                Review all your information before submitting. You can always come back 
                and update your profile later to keep it current and engaging for students.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-blue-200">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center space-x-3 px-6 py-3 text-gray-700 border-2 border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-semibold"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
            )}
          </div>

          <div className="flex space-x-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex items-center space-x-3 px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
              >
                <X className="w-5 h-5" />
                <span>{cancelButtonText}</span>
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                <span>Next Step</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                <Save className="w-5 h-5" />
                <span>{isSubmitting ? 'Saving...' : submitButtonText}</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeacherForm;