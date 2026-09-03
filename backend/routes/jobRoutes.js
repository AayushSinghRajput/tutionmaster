const express = require('express');
const { getPublicJobs, getPublicJobBySlug } = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public listing of active jobs
router.get('/', getPublicJobs);

// Protected detail view (requires logged in user)
router.get('/slug/:slug', protect, getPublicJobBySlug);

module.exports = router;
