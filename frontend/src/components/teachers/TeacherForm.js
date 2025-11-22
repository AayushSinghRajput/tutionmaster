import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import AvailabilityPicker from "./AvailabilityPicker";
import FileUpload from "./FileUpload";
import { SUBJECTS, TEACHING_MODES } from "../../utils/constants";
import { validateTeacherProfile } from "../../utils/validation";
import {
  Plus,
  Trash2,
  Save,
  X,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  User,
  BookOpen,
  Clock,
  Star,
  CheckCircle,
} from "lucide-react";

const NEPAL_STATES = [
  {
    name: "Koshi Province",
    cities: [
      "Biratnagar",
      "Itahari",
      "Dharan",
      "Bhadrapur",
      "Mechinagar",
      "Damak",
      "Rajbiraj",
      "Inaruwa",
      "Birtamod",
      "Dhankuta",
      "Kankai",
      "Bhojpur",
      "Terhathum",
      "Panchthar",
      "Ilam",
      "Jhapa",
      "Morang",
      "Sunsari",
      "Saptari",
      "Udayapur",
    ],
  },
  {
    name: "Madhesh Province",
    cities: [
      "Janakpur",
      "Birgunj",
      "Kalaiya",
      "Gaur",
      "Malangwa",
      "Jaleshwar",
      "Bardibas",
      "Siraha",
      "Lahan",
      "Dhanusha",
      "Mahottari",
      "Sarlahi",
      "Rautahat",
      "Bara",
      "Parsa",
    ],
  },
  {
    name: "Bagmati Province",
    cities: [
      "Kathmandu",
      "Lalitpur",
      "Bhaktapur",
      "Pokhara",
      "Hetauda",
      "Bharatpur",
      "Dhulikhel",
      "Banepa",
      "Panauti",
      "Kirtipur",
      "Madhyapur Thimi",
      "Budhanilkantha",
      "Gokarneshwar",
      "Chandragiri",
      "Tokha",
      "Suryabinayak",
      "Nagarkot",
      "Dhading",
      "Nuwakot",
      "Rasuwa",
      "Sindhupalchok",
      "Dolakha",
      "Ramechhap",
      "Sindhuli",
      "Makwanpur",
      "Chitwan",
    ],
  },
  {
    name: "Gandaki Province",
    cities: [
      "Pokhara",
      "Gorkha",
      "Lekhnath",
      "Kusma",
      "Baglung",
      "Besisahar",
      "Damauli",
      "Waling",
      "Beni",
      "Jomsom",
      "Kawasoti",
      "Gaindakot",
      "Bharatpur",
      "Putalibazar",
      "Syangja",
      "Chapakot",
      "Galyang",
      "Ramgram",
    ],
  },
  {
    name: "Lumbini Province",
    cities: [
      "Butwal",
      "Nepalgunj",
      "Tansen",
      "Gulariya",
      "Banganga",
      "Shivaraj",
      "Kapilvastu",
      "Buddhabhumi",
      "Sandhikharka",
      "Tamghas",
      "Pyuthan",
      "Salyan",
      "Rolpa",
      "Rukum",
      "Dang",
      "Banke",
      "Bardiya",
    ],
  },
  {
    name: "Karnali Province",
    cities: [
      "Birendranagar",
      "Manma",
      "Jumla",
      "Dunai",
      "Chandannath",
      "Mahabu",
      "Thuli Bheri",
      "Narayan",
      "Bheri",
      "Chhedagad",
      "Aathbiskot",
      "Musikot",
      "Chhayanath",
      "Tribeni",
    ],
  },
  {
    name: "Sudurpashchim Province",
    cities: [
      "Dhangadhi",
      "Mahendranagar",
      "Tikapur",
      "Ghodaghodi",
      "Lamki Chuha",
      "Bhimdatta",
      "Punarbas",
      "Belauri",
      "Amargadhi",
      "Dasharathchand",
      "Melauli",
      "Purchaudi",
      "Jogbudha",
    ],
  },
];

const TeacherForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  submitButtonText = "Save Profile",
  cancelButtonText = "Cancel",
  isEdit = false,
  className = "",
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const [isFormReady, setIsFormReady] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      contact: {
        email: "",
        phone: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      qualifications: [
        {
          degree: "",
          institution: "",
          year: new Date().getFullYear(),
        },
      ],
      preferredSubjects: [],
      bio: "",
      experience: 0,
      hourlyRate: 0,
      teachingMode: "Both",
      availability: [],
    },
  });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "qualifications",
  });

  const watchSubjects = watch("preferredSubjects", []);
  const watchAvailability = watch("availability", []);
  const watchBio = watch("bio", "");

  // SIMPLIFIED INITIALIZATION - This is the key fix
  // FIXED INITIALIZATION - Set everything in one reset()
  useEffect(() => {
    if (initialData && !isFormReady) {
      console.log("🔄 INITIALIZING FORM WITH DATA:", initialData);

      // Prepare the complete data object with availability included
      const formData = {
        name: initialData.name || "",
        contact: {
          email: initialData.contact?.email || "",
          phone: initialData.contact?.phone || "",
        },
        address: {
          street: initialData.address?.street || "",
          city: initialData.address?.city || "",
          state: initialData.address?.state || "",
          zipCode: initialData.address?.zipCode || "",
        },
        qualifications: initialData.qualifications || [
          {
            degree: "",
            institution: "",
            year: new Date().getFullYear(),
          },
        ],
        preferredSubjects: initialData.preferredSubjects || [],
        bio: initialData.bio || "",
        experience: initialData.experience || 0,
        hourlyRate: initialData.hourlyRate || 0,
        teachingMode: initialData.teachingMode || "Both",
        availability: initialData.availability || [],
      };

      console.log("📅 FORM DATA WITH AVAILABILITY:", formData);

      // Reset form with ALL data including availability
      reset(formData);

      // Set states AFTER reset
      setTimeout(() => {
        if (initialData.avatarPublicId) {
          setAvatarFile({
            publicId: initialData.avatarPublicId,
            url: initialData.avatarUrl,
          });
        }
        if (initialData.cvPublicId) {
          setCvFile({
            publicId: initialData.cvPublicId,
            url: initialData.cvUrl,
          });
        }
        if (initialData.address?.state) {
          setSelectedState(initialData.address.state);
          // Ensure city is set after state
          if (initialData.address?.city) {
            setValue("address.city", initialData.address.city);
          }
        }

        setIsFormReady(true);
        console.log("✅ FORM INITIALIZATION COMPLETE");
      }, 100);

      setIsFormReady(true);
      console.log("✅ FORM INITIALIZATION COMPLETE");
    }
  }, [initialData, reset, setValue, isFormReady]);

  // Monitor availability changes
  useEffect(() => {
    if (watchAvailability.length > 0) {
      console.log("👀 CURRENT AVAILABILITY:", watchAvailability);
      console.log("📊 AVAILABILITY LENGTH:", watchAvailability.length);
    }
  }, [watchAvailability]);

  // Update available cities when state changes
  useEffect(() => {
    if (selectedState) {
      const state = NEPAL_STATES.find((s) => s.name === selectedState);
      setAvailableCities(state ? state.cities : []);

      const currentCity = watch("address.city");
      if (currentCity && state && !state.cities.includes(currentCity)) {
        setValue("address.city", "");
      }
    } else {
      setAvailableCities([]);
      setValue("address.city", "");
    }
  }, [selectedState, setValue, watch]);

  const handleFormSubmit = async (data) => {
    try {
      console.log("📤 FORM SUBMISSION DATA:", data);
      console.log("📅 AVAILABILITY BEING SUBMITTED:", data.availability);

      const validation = validateTeacherProfile(data);

      if (!validation.isValid) {
        console.log("❌ VALIDATION ERRORS:", validation.errors);
        setFormErrors(validation.errors);
        if (validation.errors.name || validation.errors.contact) {
          setCurrentStep(1);
        } else if (
          validation.errors.qualifications ||
          validation.errors.preferredSubjects
        ) {
          setCurrentStep(2);
        } else if (validation.errors.bio || validation.errors.experience) {
          setCurrentStep(3);
        } else if (validation.errors.availability) {
          setCurrentStep(4);
        }
        return;
      }

      setFormErrors({});

      const submitData = {
        ...data,
        avatarPublicId: avatarFile?.publicId || null,
        cvPublicId: cvFile?.publicId || null,
      };

      console.log("✅ FINAL SUBMIT DATA:", submitData);
      await onSubmit(submitData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleAvatarUpload = (fileData) => {
    setAvatarFile(fileData);
  };

  const handleAvatarRemove = () => {
    setAvatarFile(null);
    setValue("avatarPublicId", null);
  };

  const handleCVUpload = (fileData) => {
    setCvFile(fileData);
  };

  const handleCVRemove = () => {
    setCvFile(null);
    setValue("cvPublicId", null);
  };

  const addQualification = () => {
    appendQualification({
      degree: "",
      institution: "",
      year: new Date().getFullYear(),
    });
  };

  const handleSubjectToggle = (subject) => {
    const currentSubjects = watchSubjects || [];
    const updatedSubjects = currentSubjects.includes(subject)
      ? currentSubjects.filter((s) => s !== subject)
      : [...currentSubjects, subject];

    setValue("preferredSubjects", updatedSubjects);
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setValue("address.state", newState);
  };

  const handleCityChange = (e) => {
    setValue("address.city", e.target.value);
  };

  const nextStep = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger([
        "name",
        "contact.email",
        "contact.phone",
        "address.street",
        "address.state",
        "address.city",
        "address.zipCode",
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger(["qualifications", "preferredSubjects"]);
    } else if (currentStep === 3) {
      isValid = await trigger([
        "experience",
        "hourlyRate",
        "teachingMode",
        "bio",
      ]);
    } else {
      const availability = watchAvailability || [];
      console.log("🔍 CHECKING AVAILABILITY FOR VALIDATION:", availability);
      isValid =
        availability.length > 0 &&
        availability.some(
          (slot) => slot.timeSlots && slot.timeSlots.length > 0
        );
      if (!isValid) {
        setFormErrors((prev) => ({
          ...prev,
          availability: "Please set at least one availability time slot",
        }));
      }
    }

    if (isValid) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.availability;
        return newErrors;
      });
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const steps = [
    {
      number: 1,
      title: "Basic Info",
      description: "Personal details",
      icon: User,
    },
    {
      number: 2,
      title: "Qualifications",
      description: "Education & subjects",
      icon: GraduationCap,
    },
    {
      number: 3,
      title: "Teaching Details",
      description: "Experience & bio",
      icon: BookOpen,
    },
    {
      number: 4,
      title: "Availability",
      description: "Schedule setup",
      icon: Clock,
    },
  ];

  // Show loading until form is ready
  if (!isFormReady && isEdit) {
    return (
      <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
        <div className="p-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading form data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden ${className}`}
    >
      {/* Enhanced Progress Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-10 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isEdit ? "Update Teacher Profile" : "Create Teacher Profile"}
              </h1>
              <p className="text-blue-100 text-lg mt-1">
                {isEdit
                  ? "Update your teaching profile"
                  : "Join our community of expert educators"}
              </p>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-2xl px-6 py-3 backdrop-blur-sm">
            <span className="text-white font-bold text-lg">
              Step {currentStep} of {steps.length}
            </span>
          </div>
        </div>

        {/* Enhanced Progress Steps */}
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div key={step.number} className="flex items-center flex-1 z-10">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 transform ${
                      isCompleted
                        ? "bg-green-500 text-white shadow-lg scale-110"
                        : isCurrent
                        ? "bg-white text-blue-600 shadow-2xl scale-110 border-2 border-blue-200"
                        : "bg-white bg-opacity-20 text-white border-2 border-white border-opacity-30"
                    }`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <div className="mt-3">
                    <div
                      className={`font-bold text-sm transition-colors duration-300 ${
                        isCompleted || isCurrent
                          ? "text-white"
                          : "text-blue-200"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div
                      className={`text-xs transition-colors duration-300 mt-1 ${
                        isCompleted || isCurrent
                          ? "text-blue-100"
                          : "text-blue-300"
                      }`}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 relative">
                    <div
                      className={`h-1 rounded-full transition-all duration-500 ${
                        isCompleted ? "bg-green-400" : "bg-white bg-opacity-30"
                      }`}
                    ></div>
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-400 absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 rounded-full" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Form Errors */}
      {Object.keys(formErrors).length > 0 && (
        <div className="mx-10 mt-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-4 shadow-sm">
          <AlertCircle className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-bold text-red-800 text-lg">
              Please fix the following errors:
            </div>
            <ul className="mt-2 text-red-700 space-y-1">
              {Object.entries(formErrors).map(([key, error]) => (
                <li key={key} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span>
                    {typeof error === "object"
                      ? Object.values(error)
                          .flat()
                          .filter((val) => val)
                          .join(", ")
                      : error}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-10">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
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
              <FileUpload
                type="avatar"
                onUploadComplete={handleAvatarUpload}
                onRemove={handleAvatarRemove}
                currentFile={avatarFile}
              />
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
                  {...register("name", { required: "Name is required" })}
                  className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                    errors.name
                      ? "border-red-500 bg-red-50"
                      : "border-blue-200 hover:border-blue-400"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-3 text-red-600 flex items-center text-base">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {errors.name.message}
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
                    {...register("contact.email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                      errors.contact?.email
                        ? "border-red-500 bg-red-50"
                        : "border-blue-200 hover:border-blue-400"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.contact?.email && (
                    <p className="mt-3 text-red-600 flex items-center text-base">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors.contact.email.message}
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
                    {...register("contact.phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\+?[\d\s\-\(\)]{10,}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                      errors.contact?.phone
                        ? "border-red-500 bg-red-50"
                        : "border-blue-200 hover:border-blue-400"
                    }`}
                    placeholder="98XXXXXXXX"
                  />
                  {errors.contact?.phone && (
                    <p className="mt-3 text-red-600 flex items-center text-base">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors.contact.phone.message}
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
                    {...register("address.street", {
                      required: "Street address is required",
                    })}
                    className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                      errors.address?.street
                        ? "border-red-500 bg-red-50"
                        : "border-blue-200 hover:border-blue-400"
                    }`}
                    placeholder="123 Main Street"
                  />
                  {errors.address?.street && (
                    <p className="mt-3 text-red-600 flex items-center text-base">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors.address.street.message}
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
                    {...register("address.state", {
                      required: "State is required",
                    })}
                    onChange={handleStateChange}
                    value={selectedState}
                    className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                      errors.address?.state
                        ? "border-red-500 bg-red-50"
                        : "border-blue-200 hover:border-blue-400"
                    }`}
                  >
                    <option value="">Select State/Province</option>
                    {NEPAL_STATES.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors.address?.state && (
                    <p className="mt-3 text-red-600 flex items-center text-base">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors.address.state.message}
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
                    {...register("address.city", {
                      required: "City is required",
                    })}
                    onChange={handleCityChange}
                    disabled={!selectedState}
                    className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                      errors.address?.city
                        ? "border-red-500 bg-red-50"
                        : "border-blue-200 hover:border-blue-400"
                    } ${
                      !selectedState ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="">Select City</option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.address?.city && (
                    <p className="mt-3 text-red-600 flex items-center text-base">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors.address.city.message}
                    </p>
                  )}
                  {!selectedState && (
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
                    type="text"
                    id="zipCode"
                    {...register("address.zipCode", {
                      required: "ZIP code is required",
                    })}
                    className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                      errors.address?.zipCode
                        ? "border-red-500 bg-red-50"
                        : "border-blue-200 hover:border-blue-400"
                    }`}
                    placeholder="44600"
                  />
                  {errors.address?.zipCode && (
                    <p className="mt-3 text-red-600 flex items-center text-base">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors.address.zipCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Qualifications */}
        {currentStep === 2 && (
          <div className="space-y-8 w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Qualifications & Subjects
              </h2>
              <p className="text-gray-600 text-lg mt-3">
                Showcase your education and what you teach
              </p>
            </div>

            {/* Education & Qualifications */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
              <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                Education & Qualifications
              </h3>
              <div className="space-y-6 w-full">
                {qualificationFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-white p-8 border-2 border-blue-200 rounded-2xl hover:border-blue-400 transition-all duration-300 shadow-sm w-full"
                  >
                    <div className="flex justify-between items-center mb-6 w-full">
                      <span className="font-bold text-gray-800 text-lg">
                        Qualification #{index + 1}
                      </span>
                      {qualificationFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQualification(index)}
                          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200 border border-red-200"
                        >
                          <Trash2 className="w-5 h-5" />
                          <span className="font-semibold">Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 w-full">
                      <div className="w-full">
                        <label
                          htmlFor={`degree-${index}`}
                          className="block text-lg font-bold text-gray-800 mb-3"
                        >
                          Degree/Certificate *
                        </label>
                        <input
                          type="text"
                          id={`degree-${index}`}
                          {...register(`qualifications.${index}.degree`, {
                            required: "Degree is required",
                          })}
                          className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                            errors.qualifications?.[index]?.degree
                              ? "border-red-500 bg-red-50"
                              : "border-blue-200 hover:border-blue-400"
                          }`}
                          placeholder="e.g., Bachelor of Science in Mathematics"
                        />
                        {errors.qualifications?.[index]?.degree && (
                          <p className="mt-3 text-red-600 flex items-center text-base">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {errors.qualifications[index].degree.message}
                          </p>
                        )}
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor={`institution-${index}`}
                          className="block text-lg font-bold text-gray-800 mb-3"
                        >
                          Institution *
                        </label>
                        <input
                          type="text"
                          id={`institution-${index}`}
                          {...register(`qualifications.${index}.institution`, {
                            required: "Institution is required",
                          })}
                          className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                            errors.qualifications?.[index]?.institution
                              ? "border-red-500 bg-red-50"
                              : "border-blue-200 hover:border-blue-400"
                          }`}
                          placeholder="e.g., Tribhuvan University"
                        />
                        {errors.qualifications?.[index]?.institution && (
                          <p className="mt-3 text-red-600 flex items-center text-base">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {errors.qualifications[index].institution.message}
                          </p>
                        )}
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor={`year-${index}`}
                          className="block text-lg font-bold text-gray-800 mb-3"
                        >
                          Year Completed *
                        </label>
                        <input
                          type="number"
                          id={`year-${index}`}
                          {...register(`qualifications.${index}.year`, {
                            required: "Year is required",
                          })}
                          className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                            errors.qualifications?.[index]?.year
                              ? "border-red-500 bg-red-50"
                              : "border-blue-200 hover:border-blue-400"
                          }`}
                          placeholder="2020"
                        />
                        {errors.qualifications?.[index]?.year && (
                          <p className="mt-3 text-red-600 flex items-center text-base">
                            <AlertCircle className="w-5 h-5 mr-2" />
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
                  className="flex items-center space-x-4 w-full px-8 py-6 border-2 border-dashed border-blue-400 rounded-2xl text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all duration-300 bg-white"
                >
                  <Plus className="w-6 h-6" />
                  <span className="font-bold text-lg">
                    Add Another Qualification
                  </span>
                </button>
              </div>
            </div>

            {/* CV/Resume */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
              <h3 className="font-bold text-gray-800 text-xl mb-6">
                CV/Resume
              </h3>
              <FileUpload
                type="cv"
                onUploadComplete={handleCVUpload}
                onRemove={handleCVRemove}
                currentFile={cvFile}
              />
            </div>

            {/* Subjects */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
              <h3 className="font-bold text-gray-800 text-xl mb-6">
                Subjects You Teach *
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                Select all subjects you're qualified to teach
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {SUBJECTS.map((subject) => (
                  <label
                    key={subject}
                    className="flex items-center space-x-4 p-4 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 cursor-pointer transition-all duration-300 shadow-sm w-full"
                  >
                    <input
                      type="checkbox"
                      value={subject}
                      checked={watchSubjects.includes(subject)}
                      onChange={() => handleSubjectToggle(subject)}
                      className="w-6 h-6 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:ring-offset-2 flex-shrink-0"
                    />
                    <span className="text-gray-700 font-semibold text-lg break-words flex-1 min-w-0">
                      {subject}
                    </span>
                  </label>
                ))}
              </div>
              {formErrors.preferredSubjects && (
                <p className="mt-4 text-red-600 flex items-center text-base">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {formErrors.preferredSubjects}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Teaching Details */}
        {currentStep === 3 && (
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
                    Years of Experience*
                  </label>
                  <input
                    type="number"
                    id="experience"
                    {...register("experience", {
                      required: "Experience is required",
                      min: {
                        value: 0,
                        message: "Experience cannot be negative",
                      },
                      max: {
                        value: 50,
                        message: "Experience cannot exceed 50 years",
                      },
                    })}
                    className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                      errors.experience
                        ? "border-red-500 bg-red-50"
                        : "border-blue-200 hover:border-blue-400"
                    }`}
                    placeholder="5"
                    min="0"
                    max="50"
                  />
                  {errors.experience && (
                    <p className="mt-3 text-red-600 flex items-center text-base">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors.experience.message}
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
                      {...register("hourlyRate", {
                        required: "Hourly rate is required",
                        min: {
                          value: 0,
                          message: "Hourly rate cannot be negative",
                        },
                        max: {
                          value: 10000,
                          message: "Hourly rate cannot exceed ₨10,000",
                        },
                      })}
                      className={`w-full px-5 py-4 text-lg pr-16 border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                        errors.hourlyRate
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
                  {errors.hourlyRate && (
                    <p className="mt-3 text-red-600 flex items-center text-base">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors.hourlyRate.message}
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
                    {...register("teachingMode", {
                      required: "Teaching mode is required",
                    })}
                    className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                      errors.teachingMode
                        ? "border-red-500 bg-red-50"
                        : "border-blue-200 hover:border-blue-400"
                    }`}
                  >
                    {TEACHING_MODES.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                  {errors.teachingMode && (
                    <p className="mt-3 text-red-600 flex items-center text-base">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors.teachingMode.message}
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
                  {...register("bio", {
                    required: "Bio is required",
                    minLength: {
                      value: 50,
                      message: "Bio must be at least 50 characters long",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Bio must be less than 1000 characters",
                    },
                  })}
                  className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 resize-none ${
                    errors.bio
                      ? "border-red-500 bg-red-50"
                      : "border-blue-200 hover:border-blue-400"
                  }`}
                  placeholder="Describe your teaching experience, methodology, and what students can expect from your lessons..."
                  rows="8"
                />
                {errors.bio && (
                  <p className="mt-3 text-red-600 flex items-center text-base">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {errors.bio.message}
                  </p>
                )}
                <div
                  className={`mt-3 text-lg font-semibold ${
                    watchBio.length < 50 ? "text-red-600" : "text-blue-600"
                  }`}
                >
                  {watchBio.length}/1000 characters
                  {watchBio.length < 50 &&
                    ` (minimum ${50 - watchBio.length} more characters needed)`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Availability */}
        {currentStep === 4 && (
          <div className="space-y-8 w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Availability & Schedule
              </h2>
              <p className="text-gray-600 text-lg mt-3">
                Set your available days and times for teaching
              </p>
            </div>

            {/* DEBUG: Check if step 4 is rendering */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-800 font-bold">
                ✅ Step 4 IS rendering! Availability data:{" "}
                {watchAvailability?.length} slots
              </p>
            </div>

            {/* Debug info */}
            {process.env.NODE_ENV === "development" && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Debug Info:</strong>
                  Availability slots loaded: {watchAvailability?.length || 0}
                  {watchAvailability?.length > 0 && (
                    <span> - First slot: {watchAvailability[0]?.day}</span>
                  )}
                </p>
              </div>
            )}

            {/* Availability Picker */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
              <AvailabilityPicker
                key={`availability-${watchAvailability?.length}-${isFormReady}`}
                value={watchAvailability || []}
                onChange={(availability) => {
                  console.log("🔄 Availability changed:", availability);
                  setValue("availability", availability, {
                    shouldValidate: true,
                  });
                }}
              />
              {formErrors.availability && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 flex items-center text-base">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {typeof formErrors.availability === "string"
                      ? formErrors.availability
                      : "Please fix availability errors above"}
                  </p>
                </div>
              )}
            </div>

            {/* Final Call to Action */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-lg w-full">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-2xl mb-3">
                Ready to Complete Your Profile!
              </h3>
              <p className="text-green-100 text-lg">
                Review all your information before submitting. You can always
                come back and update your profile later to keep it current and
                engaging for students.
              </p>
            </div>
          </div>
        )}

        {/* Enhanced Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-blue-200 w-full">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center space-x-3 px-8 py-4 text-gray-700 border-2 border-blue-300 rounded-2xl hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 font-bold text-lg shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
                <span>Previous</span>
              </button>
            )}
          </div>

          <div className="flex space-x-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex items-center space-x-3 px-8 py-4 text-gray-700 border-2 border-gray-400 rounded-2xl hover:bg-gray-50 hover:border-gray-500 transition-all duration-300 font-bold text-lg shadow-sm"
              >
                <X className="w-6 h-6" />
                <span>{cancelButtonText}</span>
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-offset-2 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Next Step</span>
                <ChevronRight className="w-6 h-6" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Save className="w-6 h-6" />
                <span>
                  {isSubmitting ? "Creating Profile..." : submitButtonText}
                </span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeacherForm;
