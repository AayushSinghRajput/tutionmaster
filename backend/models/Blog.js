const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
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
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  excerpt: {
    type: String,
    trim: true,
    default: '',
  },
  coverImage: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    default: 'TuitionMaster Team',
  },
  category: {
    type: String,
    default: 'General',
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  readingTime: {
    type: Number,
    default: 0,
  },
  wordCount: {
    type: Number,
    default: 0,
  },
  published: {
    type: Boolean,
    default: false,
    index: true,
  },
  publishedAt: {
    type: Date,
    default: null,
  },
  metaTitle: {
    type: String,
    default: '',
  },
  metaDescription: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Calculate word count, reading time, and publishedAt timestamp
blogSchema.pre('save', function (next) {
  if (this.isModified('content') && this.content) {
    const cleanText = this.content
      .replace(/<[^>]*>?/gm, ' ')
      .replace(/[#*_~`>\-|]/g, ' ');
    const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
    this.wordCount = words;
    this.readingTime = Math.max(1, Math.ceil(words / 200));
  }
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
