const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  jobType: {
    type: String,
    enum: ['Home Tuition', 'Online', 'Institute'],
    default: 'Home Tuition',
  },
  subject: {
    type: [String],
    default: [],
  },
  gradeLevel: {
    type: String,
    required: [true, 'Grade level is required'],
    trim: true,
  },
  salary: {
    type: String,
    default: 'Negotiable',
    trim: true,
  },
  schedule: {
    type: String,
    default: 'Flexible',
    trim: true,
  },
  requirements: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  contactInstructions: {
    type: String,
    default: '',
  },
  published: {
    type: Boolean,
    default: false,
    index: true,
  },
  status: {
    type: String,
    enum: ['Open', 'Urgent', 'Filled', 'Closed'],
    default: 'Open',
    index: true,
  },
  publishedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Auto-set publishedAt on first publish
jobSchema.pre('save', function (next) {
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Job', jobSchema);
