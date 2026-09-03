const express = require('express');
const {
  getAdminJobs,
  getAdminJobById,
  createJob,
  updateJob,
  togglePublishJob,
  updateJobStatus,
  deleteJob,
} = require('../../controllers/jobController');
const { protectAdmin } = require('../middleware/adminAuth');

const router = express.Router();

router.use(protectAdmin);

router.route('/')
  .get(getAdminJobs)
  .post(createJob);

router.route('/:id')
  .get(getAdminJobById)
  .put(updateJob)
  .delete(deleteJob);

router.patch('/:id/publish', togglePublishJob);
router.patch('/:id/status', updateJobStatus);

module.exports = router;
