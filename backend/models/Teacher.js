const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, "Degree is required"],
    },
    institution: {
      type: String,
      required: [true, "Institution is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
  },
  { _id: false },
);


const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    avatarPublicId: {
      type: String,
      default: null,
    },
    cvPublicId: {
      type: String,
      default: null,
    },
    address: {
      street: {
        type: String,
        required: [true, "Street address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
    },
    qualifications: {
      type: [qualificationSchema],
      required: [true, "At least one qualification is required"],
      validate: {
        validator: function (qualifications) {
          return qualifications && qualifications.length > 0;
        },
        message: "At least one qualification is required",
      },
    },
    contact: {
      email: {
        type: String,
        required: [true, "Email is required"],
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          "Invalid email format",
        ],
      },
      phone: {
        type: String,
        default: null,
        match: [/^\+?[\d\s\-\(\)]{10,}$/, "Invalid phone number format"],
      },
    },
    preferredSubjects: {
      type: [String],
      required: [true, "At least one subject is required"],
      validate: {
        validator: function (subjects) {
          return subjects && subjects.length > 0;
        },
        message: "At least one preferred subject is required",
      },
    },
    bio: {
      type: String,
      default: null,
      validate: {
        validator: function (v) {
          if (!v || !v.trim()) return true; // Allow optional/empty bio
          return v.trim().length >= 20 && v.trim().length <= 1000;
        },
        message: "Bio must be at least 20 characters long and less than 1000 characters",
      },
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: [0, "Experience cannot be negative"],
      max: [50, "Experience cannot exceed 50 years"],
    },
    availability: {
      type: [String],
      required: [true, "Availability is required"],
      validate: {
        validator: function (availability) {
          const validDays = [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday",
          ];
          return (
            availability &&
            availability.length > 0 &&
            availability.every((d) => validDays.includes(d))
          );
        },
        message: "Availability must contain valid day names and at least one day must be selected",
      },
    },
    teachingMode: {
      type: String,
      enum: ["Online", "In-person", "Both"],
      required: [true, "Teaching mode is required"],
    },
    hourlyRate: {
      type: Number,
      required: [true, "Hourly rate is required"],
      min: [0, "Hourly rate cannot be negative"],
      max: [10000, "Hourly rate cannot exceed ₨10,000"],
    },
    profileViews: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must can not be more than 5']
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    viewedByUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    viewedByIps: [{
      type: String,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    // isVisible controls public listing visibility, managed by admins.
    // New profiles default to false so they require admin approval before
    // appearing on the public /teachers page.
    // Existing profiles that were already public retain their previous
    // behaviour via the migration script / seed.
    isVisible: {
      type: Boolean,
      default: false,
    },
    visibilityUpdatedAt: {
      type: Date,
      default: null,
    },
    visibilityUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Virtual for formatted availability (string[] of day names)
teacherSchema.virtual("formattedAvailability").get(function () {
  return this.availability;
});


teacherSchema.index({ "address.city": 1 });
teacherSchema.index({ preferredSubjects: 1 });
teacherSchema.index({ teachingMode: 1 });
teacherSchema.index({ userId: 1 });
teacherSchema.index({ isVisible: 1 });

module.exports = mongoose.model("Teacher", teacherSchema);
