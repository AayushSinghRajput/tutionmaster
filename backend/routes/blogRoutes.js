const express = require('express');
const { getPublicBlogs, getPublicBlogBySlug } = require('../controllers/blogController');

const router = express.Router();

router.get('/', getPublicBlogs);
router.get('/slug/:slug', getPublicBlogBySlug);

module.exports = router;
