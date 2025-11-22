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
  { _id: false }
);

const timeSlotSchema = new mongoose.Schema(
  {
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"],
    },
  },
  { _id: false }
);

const availabilitySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: [true, "Day is required"],
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    timeSlots: {
      type: [timeSlotSchema],
      required: [true, "Time slots are required"],
      validate: {
        validator: function(slots) {
          return slots && slots.length > 0;
        },
        message: "At least one time slot is required per day"
      }
    },
  },
  { _id: false }
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
        required: [true, "Street address is required"] 
      },
      city: { 
        type: String, 
        required: [true, "City is required"] 
      },
      state: { 
        type: String, 
        required: [true, "State is required"] 
      },
      zipCode: { 
        type: Number, 
        required: [true, "ZIP code is required"] 
      },
    },
    qualifications: {
      type: [qualificationSchema],
      required: [true, "At least one qualification is required"],
      validate: {
        validator: function(qualifications) {
          return qualifications && qualifications.length > 0;
        },
        message: "At least one qualification is required"
      }
    },
    contact: {
      email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email format"],
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\+?[\d\s\-\(\)]{10,}$/, "Invalid phone number format"],
      },
    },
    preferredSubjects: {
      type: [String],
      required: [true, "At least one subject is required"],
      validate: {
        validator: function(subjects) {
          return subjects && subjects.length > 0;
        },
        message: "At least one preferred subject is required"
      }
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      minlength: [50, "Bio must be at least 50 characters long"],
      maxlength: [1000, "Bio must be less than 1000 characters"],
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: [0, "Experience cannot be negative"],
      max: [50, "Experience cannot exceed 50 years"],
    },
    availability: {
      type: [availabilitySchema],
      required: [true, "Availability is required"],
      validate: {
        validator: function(availability) {
          return availability && availability.length > 0;
        },
        message: "At least one availability day is required"
      }
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Time validation middleware
teacherSchema.pre('save', function(next) {
  if (this.availability && this.availability.length > 0) {
    for (const slot of this.availability) {
      for (const timeSlot of slot.timeSlots) {
        const start = parseInt(timeSlot.startTime.replace(':', ''));
        const end = parseInt(timeSlot.endTime.replace(':', ''));
        
        if (start >= end) {
          return next(new Error(`End time must be after start time for ${slot.day}`));
        }
      }
    }
  }
  next();
});

teacherSchema.index({ "address.city": 1 });
teacherSchema.index({ preferredSubjects: 1 });
teacherSchema.index({ teachingMode: 1 });
teacherSchema.index({ userId: 1 });

module.exports = mongoose.model("Teacher", teacherSchema);