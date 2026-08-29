const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  reviewerName: {
    type: String,
    required: [true, 'Please provide your name']
  },
  reviewerEmail: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  reviewText: {
    type: String,
    required: [true, 'Please add a review text'],
    maxlength: 1000
  },
  status: {
    type: String,
    enum: ['pending', 'published', 'hidden'],
    default: 'pending' // Reviews must be admin-approved by default
  }
}, {
  timestamps: true
});

// Prevent user from submitting more than one review per teacher based on email
reviewSchema.index({ teacher: 1, reviewerEmail: 1 }, { unique: true });

// Static method to get avg rating and save
reviewSchema.statics.getAverageRating = async function(teacherId) {
  const obj = await this.aggregate([
    {
      $match: { teacher: teacherId, status: 'published' }
    },
    {
      $group: {
        _id: '$teacher',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    if (obj[0]) {
      await this.model('Teacher').findByIdAndUpdate(teacherId, {
        averageRating: Math.round(obj[0].averageRating * 10) / 10,
        totalReviews: obj[0].totalReviews
      });
    } else {
      await this.model('Teacher').findByIdAndUpdate(teacherId, {
        averageRating: undefined,
        totalReviews: 0
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
reviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.teacher);
});

// Call getAverageRating before remove
reviewSchema.pre('remove', function() {
  this.constructor.getAverageRating(this.teacher);
});

module.exports = mongoose.model('Review', reviewSchema);
