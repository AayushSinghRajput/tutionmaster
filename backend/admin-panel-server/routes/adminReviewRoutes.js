const express = require('express');
const { protectAdmin } = require('../middleware/adminAuth');
const Review = require('../../models/Review');
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');

const router = express.Router();

router.use(protectAdmin);

// @desc    Get all reviews (for moderation)
// @route   GET /api/admin/reviews
// @access  Private/Admin
router.get('/', asyncHandler(async (req, res, next) => {
  const reviews = await Review.find()
    .populate('teacher', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews
  });
}));

// @desc    Update review status
// @route   PUT /api/admin/reviews/:id/status
// @access  Private/Admin
router.put('/:id/status', asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  if (!['pending', 'published', 'hidden'].includes(status)) {
    return next(new ErrorResponse('Invalid status', 400));
  }

  let review = await Review.findById(req.params.id);
  if (!review) {
    return next(new ErrorResponse('Review not found', 404));
  }

  review.status = status;
  await review.save();

  res.status(200).json({
    success: true,
    data: review
  });
}));

// @desc    Delete review
// @route   DELETE /api/admin/reviews/:id
// @access  Private/Admin
router.delete('/:id', asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new ErrorResponse('Review not found', 404));
  }

  // Pre-remove hook will recalculate rating
  await review.deleteOne(); // or remove()

  res.status(200).json({
    success: true,
    data: {}
  });
}));

module.exports = router;
