const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: [true, 'Degree is required']
  },
  institution: {
    type: String,
    required: [true, 'Institution is required']
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: 1950,
    max: new Date().getFullYear()
  }
}, { _id: false });

const timeSlotSchema = new mongoose.Schema({
  start: {
    type: String,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
  },
  end: {
    type: String,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
  }
}, { _id: false });

const availabilitySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  timeSlots: [timeSlotSchema]
}, { _id: false });

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  avatarPublicId: {
    type: String,
    default: null
  },
  cvPublicId: {
    type: String,
    default: null
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  qualifications: [qualificationSchema],
  contact: {
    email: {
      type: String,
      required: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
    },
    phone: {
      type: String,
      required: true,
      match: [/^\+?[\d\s\-\(\)]{10,}$/, 'Invalid phone number']
    }
  },
  preferredSubjects: [{
    type: String,
    required: true,
    enum: [
      'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
      'History', 'Geography', 'Computer Science', 'Economics',
      'Business Studies', 'Psychology', 'Languages', 'Art', 'Music'
    ]
  }],
  bio: {
    type: String,
    required: true,
    maxlength: 1000
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
    max: 50
  },
  availability: [availabilitySchema],
  teachingMode: {
    type: String,
    enum: ['Online', 'In-person', 'Both'],
    required: true
  },
  hourlyRate: {
    type: Number,
    min: 0,
    max: 1000
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

teacherSchema.index({ 'address.city': 1 });
teacherSchema.index({ preferredSubjects: 1 });
teacherSchema.index({ teachingMode: 1 });

module.exports = mongoose.model('Teacher', teacherSchema);