const express = require('express');
const { getReviews, addReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

// We use mergeParams to access teacherId from the teacherRoute
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getReviews)
  .post(protect, addReview);

module.exports = router;
