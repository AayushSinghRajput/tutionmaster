const Review = require('../models/Review');
const Teacher = require('../models/Teacher');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get published reviews for a teacher
// @route   GET /api/teachers/:teacherId/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({ teacher: req.params.teacherId, status: 'published' })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews
  });
});

// @desc    Add a review
// @route   POST /api/teachers/:teacherId/reviews
// @access  Private (Authenticated users can review)
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.teacher = req.params.teacherId;
  req.body.reviewerName = req.user.username;
  req.body.reviewerEmail = req.user.email;
  const { reviewerName, reviewerEmail } = req.body;

  if (req.user.role !== 'student') {
    return next(new ErrorResponse(`Only students are allowed to write reviews.`, 403));
  }

  if (!reviewerName || !reviewerEmail) {
    return next(new ErrorResponse(`Please provide your name and email`, 400));
  }

  const teacher = await Teacher.findById(req.params.teacherId);
  if (!teacher) {
    return next(new ErrorResponse(`No teacher with the id of ${req.params.teacherId}`, 404));
  }

  // Prevent submitting multiple reviews
  const existingReview = await Review.findOne({ teacher: req.params.teacherId, reviewerEmail });
  if (existingReview) {
    return next(new ErrorResponse(`You have already submitted a review for this teacher using this email.`, 400));
  }

  // Review status defaults to 'pending' as defined in the model
  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
    message: 'Your review has been submitted and is pending moderation.'
  });
});
