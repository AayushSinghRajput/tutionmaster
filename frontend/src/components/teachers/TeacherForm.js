import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import AvailabilityPicker from './AvailabilityPicker';
import FileUpload from './FileUpload';
import { SUBJECTS, TEACHING_MODES } from '../../utils/constants';
import { validateTeacherProfile } from '../../utils/validation';
import { Plus, Trash2, Save, X, AlertCircle } from 'lucide-react';

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
    { number: 1, title: 'Basic Info', description: 'Personal and contact information' },
    { number: 2, title: 'Qualifications', description: 'Education and subjects' },
    { number: 3, title: 'Teaching Details', description: 'Experience and bio' },
    { number: 4, title: 'Availability', description: 'Schedule and preferences' }
  ];

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Progress Steps */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.number 
                  ? currentStep > step.number 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{step.title}</div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`mx-6 w-12 h-0.5 ${
                currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Global Form Errors */}
      {Object.keys(formErrors).length > 0 && (
        <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-red-800">Please fix the following errors:</div>
            <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
              {Object.entries(formErrors).map(([key, error]) => (
                <li key={key}>{typeof error === 'object' ? JSON.stringify(error) : error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              <p className="text-gray-600">Tell us about yourself and how students can contact you</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-3">Profile Picture</h4>
              <FileUpload
                type="avatar"
                onUploadComplete={handleAvatarUpload}
                onRemove={handleAvatarRemove}
                currentFile={avatarFile}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-3">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.contact?.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.contact?.email && <p className="mt-1 text-sm text-red-600">{errors.contact.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.contact?.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.contact?.phone && <p className="mt-1 text-sm text-red-600">{errors.contact.phone.message}</p>}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-3">Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="street"
                    {...register('address.street', { required: 'Street address is required' })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.address?.street ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123 Main Street"
                  />
                  {errors.address?.street && <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    {...register('address.city', { required: 'City is required' })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.address?.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="New York"
                  />
                  {errors.address?.city && <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    {...register('address.state', { required: 'State is required' })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.address?.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="NY"
                  />
                  {errors.address?.state && <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>}
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    {...register('address.zipCode', { 
                      required: 'ZIP code is required',
                      pattern: {
                        value: /^\d{5}(-\d{4})?$/,
                        message: 'Invalid ZIP code format'
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.address?.zipCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="10001"
                  />
                  {errors.address?.zipCode && <p className="mt-1 text-sm text-red-600">{errors.address.zipCode.message}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Qualifications */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Qualifications & Subjects</h3>
              <p className="text-gray-600">Showcase your education and what you teach</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-3">Education & Qualifications</h4>
              <div className="space-y-4">
                {qualificationFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-700">Qualification #{index + 1}</span>
                      {qualificationFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQualification(index)}
                          className="flex items-center space-x-1 px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Degree/Certificate *
                        </label>
                        <input
                          type="text"
                          id={`degree-${index}`}
                          {...register(`qualifications.${index}.degree`, { 
                            required: 'Degree is required' 
                          })}
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.qualifications?.[index]?.degree ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g., Bachelor of Science in Mathematics"
                        />
                        {errors.qualifications?.[index]?.degree && (
                          <p className="mt-1 text-sm text-red-600">{errors.qualifications[index].degree.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Institution *
                        </label>
                        <input
                          type="text"
                          id={`institution-${index}`}
                          {...register(`qualifications.${index}.institution`, { 
                            required: 'Institution is required' 
                          })}
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.qualifications?.[index]?.institution ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g., University of Example"
                        />
                        {errors.qualifications?.[index]?.institution && (
                          <p className="mt-1 text-sm text-red-600">{errors.qualifications[index].institution.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor={`year-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
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
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.qualifications?.[index]?.year ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="2020"
                          min="1950"
                          max={new Date().getFullYear()}
                        />
                        {errors.qualifications?.[index]?.year && (
                          <p className="mt-1 text-sm text-red-600">{errors.qualifications[index].year.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addQualification}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Qualification</span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-3">CV/Resume</h4>
              <FileUpload
                type="cv"
                onUploadComplete={handleCVUpload}
                onRemove={handleCVRemove}
                currentFile={cvFile}
              />
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-3">Subjects You Teach *</h4>
              <p className="text-gray-600 mb-3">Select all subjects you're qualified to teach</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SUBJECTS.map(subject => (
                  <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={subject}
                      checked={watchSubjects.includes(subject)}
                      onChange={() => handleSubjectToggle(subject)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{subject}</span>
                  </label>
                ))}
              </div>
              {formErrors.preferredSubjects && (
                <p className="mt-1 text-sm text-red-600">{formErrors.preferredSubjects}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Teaching Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Teaching Details</h3>
              <p className="text-gray-600">Describe your experience and teaching style</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Teaching Experience *
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
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.experience ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="5"
                  min="0"
                  max="50"
                />
                {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>}
              </div>

              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Hourly Rate ($) *
                </label>
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
                      value: 1000,
                      message: 'Hourly rate cannot exceed $1000'
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.hourlyRate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="50"
                  min="0"
                  max="1000"
                  step="5"
                />
                {errors.hourlyRate && <p className="mt-1 text-sm text-red-600">{errors.hourlyRate.message}</p>}
              </div>

              <div>
                <label htmlFor="teachingMode" className="block text-sm font-medium text-gray-700 mb-1">
                  Teaching Mode *
                </label>
                <select
                  id="teachingMode"
                  {...register('teachingMode', { required: 'Teaching mode is required' })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.teachingMode ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {TEACHING_MODES.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
                {errors.teachingMode && <p className="mt-1 text-sm text-red-600">{errors.teachingMode.message}</p>}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-3">Bio & Teaching Philosophy *</h4>
              <p className="text-gray-600 mb-3">
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
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.bio ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your teaching experience, methodology, and what students can expect from your lessons..."
                  rows="6"
                />
                {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>}
                <div className="mt-1 text-sm text-gray-500">
                  {watchBio.length}/1000 characters
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Availability */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Availability & Schedule</h3>
              <p className="text-gray-600">Set your available days and times for teaching</p>
            </div>

            <div>
              <AvailabilityPicker
                value={watchAvailability}
                onChange={(availability) => setValue('availability', availability)}
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Almost Done!</h4>
              <p className="text-blue-700">
                Review all your information before submitting. You can always come back 
                and update your profile later.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Previous
              </button>
            )}
          </div>

          <div className="flex space-x-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
                <span>{cancelButtonText}</span>
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
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