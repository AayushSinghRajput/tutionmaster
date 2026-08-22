const express = require('express');
const {
  getTeachers,
  getTeacher,
  searchTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getMyProfile,
  getAllSubjects,
  setTeacherStatus
} = require('../controllers/teacherController');
const {
  teacherProfileValidation,
  handleValidationErrors
} = require('../middleware/validation');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

/**
 * @openapi
 * /teachers:
 *   get:
 *     summary: List active teachers, with optional filters
 *     tags: [Teachers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10, maximum: 50 }
 *         description: Capped at 50 regardless of the value requested.
 *       - in: query
 *         name: subject
 *         schema: { type: string }
 *       - in: query
 *         name: subjects
 *         schema: { type: string }
 *         description: Comma-separated list of subjects.
 *       - in: query
 *         name: city
 *         schema: { type: string }
 *       - in: query
 *         name: teachingMode
 *         schema: { type: string, enum: [Online, In-person, Both] }
 *       - in: query
 *         name: minExperience
 *         schema: { type: integer }
 *       - in: query
 *         name: maxExperience
 *         schema: { type: integer }
 *       - in: query
 *         name: minRate
 *         schema: { type: number }
 *       - in: query
 *         name: maxRate
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: A page of teachers
 */
// Public routes
router.get('/', getTeachers);

/**
 * @openapi
 * /teachers/subject:
 *   get:
 *     summary: List every distinct subject taught (case-insensitively deduped, cached for 5 minutes)
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Sorted list of subject names
 */
router.get("/subject",getAllSubjects)

/**
 * @openapi
 * /teachers/search:
 *   get:
 *     summary: Free-text search across name, bio, and city, plus subject/city filters
 *     tags: [Teachers]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *       - in: query
 *         name: subject
 *         schema: { type: string }
 *       - in: query
 *         name: city
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Up to 20 matching teachers, most experienced first
 */
router.get('/search', searchTeachers);

/**
 * @openapi
 * /teachers/my-profile:
 *   get:
 *     summary: Get the logged-in user's own teacher profile
 *     tags: [Teachers]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: The caller's teacher profile
 *       404:
 *         description: No profile exists for this user yet
 */
// Specific route MUST be above :id
router.get('/my-profile', protect, getMyProfile);

/**
 * @openapi
 * /teachers/{id}:
 *   get:
 *     summary: Get a single teacher profile
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: The teacher profile
 *       404:
 *         description: Not found (or inactive, and caller isn't an admin)
 */
// This MUST come after specific paths
router.get('/:id', getTeacher);

// Protected routes
router.use(protect);

/**
 * @openapi
 * /teachers:
 *   post:
 *     summary: Create the caller's teacher profile (one per user)
 *     tags: [Teachers]
 *     security: [{ bearerAuth: [] }]
 *     description: Only a fixed set of profile fields are accepted from the request body — userId and isActive are always server-controlled and cannot be set by the client.
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error, or a profile already exists for this user
 */
router.post('/', protect, teacherProfileValidation, handleValidationErrors, createTeacher);

/**
 * @openapi
 * /teachers/{id}:
 *   put:
 *     summary: Update a teacher profile (owner only)
 *     tags: [Teachers]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Updated
 *       403:
 *         description: Not the owner of this profile
 *       404:
 *         description: Not found
 */
router.put('/:id', protect, teacherProfileValidation, handleValidationErrors, updateTeacher);

/**
 * @openapi
 * /teachers/{id}/status:
 *   patch:
 *     summary: Activate/deactivate a teacher profile (moderation)
 *     tags: [Teachers]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [isActive]
 *             properties:
 *               isActive: { type: boolean }
 *     responses:
 *       200:
 *         description: Updated status
 *       403:
 *         description: Caller is not an admin
 *       404:
 *         description: Not found
 */
router.patch('/:id/status', protect, authorize('admin'), setTeacherStatus);

/**
 * @openapi
 * /teachers/{id}:
 *   delete:
 *     summary: Delete a teacher profile (owner only)
 *     tags: [Teachers]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted
 *       403:
 *         description: Not the owner of this profile
 *       404:
 *         description: Not found
 */
router.delete('/:id', protect, deleteTeacher);

module.exports = router;
