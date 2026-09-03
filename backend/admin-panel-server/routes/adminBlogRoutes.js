const express = require('express');
const {
  getAdminBlogs,
  getAdminBlogById,
  createBlog,
  updateBlog,
  togglePublishBlog,
  deleteBlog,
} = require('../../controllers/blogController');
const { protectAdmin } = require('../middleware/adminAuth');

const router = express.Router();

// Apply protectAdmin middleware to all admin blog routes
router.use(protectAdmin);

router.route('/')
  .get(getAdminBlogs)
  .post(createBlog);

router.route('/:id')
  .get(getAdminBlogById)
  .put(updateBlog)
  .delete(deleteBlog);

router.patch('/:id/publish', togglePublishBlog);

module.exports = router;
