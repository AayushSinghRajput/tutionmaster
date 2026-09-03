const asyncHandler = require('express-async-handler');
const Blog = require('../models/Blog');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Get all published blogs with pagination (limit 9 per page)
 * @route   GET /api/v1/blogs
 * @access  Public
 */
exports.getPublicBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = 9; // Exactly 9 blogs per page
  const skip = (page - 1) * limit;

  const query = { published: true };

  const totalCount = await Blog.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const blogs = await Blog.find(query)
    .sort({ publishedAt: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  res.status(200).json({
    success: true,
    count: blogs.length,
    blogs,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNextPage,
      hasPrevPage,
    },
  });
});

/**
 * @desc    Get single published blog by slug
 * @route   GET /api/v1/blogs/slug/:slug
 * @access  Public
 */
exports.getPublicBlogBySlug = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findOne({
    slug: req.params.slug,
    published: true,
  }).lean();

  if (!blog) {
    return next(new ErrorResponse('Blog post not found', 404));
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

/**
 * @desc    Get all blogs for Admin (with search, category, status filter, pagination)
 * @route   GET /api/admin/blogs
 * @access  Private (Admin)
 */
exports.getAdminBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const query = {};

  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: 'i' };
  }

  if (req.query.published !== undefined && req.query.published !== '') {
    query.published = req.query.published === 'true';
  }

  if (req.query.category) {
    query.category = req.query.category;
  }

  const totalCount = await Blog.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    count: blogs.length,
    blogs,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
    },
  });
});

/**
 * @desc    Get single blog by ID for Admin
 * @route   GET /api/admin/blogs/:id
 * @access  Private (Admin)
 */
exports.getAdminBlogById = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorResponse('Blog post not found', 404));
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

/**
 * @desc    Create new blog post
 * @route   POST /api/admin/blogs
 * @access  Private (Admin)
 */
exports.createBlog = asyncHandler(async (req, res, next) => {
  const { title, slug, content, excerpt, coverImage, author, category, tags, published, metaTitle, metaDescription } = req.body;

  // Verify slug uniqueness
  const existingSlug = await Blog.findOne({ slug });
  if (existingSlug) {
    return next(new ErrorResponse('Slug already in use. Please use a unique slug.', 400));
  }

  const blogData = {
    title,
    slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    content,
    excerpt: excerpt || '',
    coverImage: coverImage || '',
    author: author || req.admin?.name || 'TuitionMaster Team',
    category: category || 'General',
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
    published: Boolean(published),
    publishedAt: published ? new Date() : null,
    metaTitle: metaTitle || '',
    metaDescription: metaDescription || '',
  };

  const blog = await Blog.create(blogData);

  res.status(201).json({
    success: true,
    data: blog,
  });
});

/**
 * @desc    Update blog post
 * @route   PUT /api/admin/blogs/:id
 * @access  Private (Admin)
 */
exports.updateBlog = asyncHandler(async (req, res, next) => {
  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorResponse('Blog post not found', 404));
  }

  const { title, slug, content, excerpt, coverImage, author, category, tags, published, metaTitle, metaDescription } = req.body;

  if (slug && slug !== blog.slug) {
    const existingSlug = await Blog.findOne({ slug, _id: { $ne: req.params.id } });
    if (existingSlug) {
      return next(new ErrorResponse('Slug already in use by another post.', 400));
    }
  }

  blog.title = title !== undefined ? title : blog.title;
  blog.slug = slug !== undefined ? slug : blog.slug;
  blog.content = content !== undefined ? content : blog.content;
  blog.excerpt = excerpt !== undefined ? excerpt : blog.excerpt;
  blog.coverImage = coverImage !== undefined ? coverImage : blog.coverImage;
  blog.author = author !== undefined ? author : blog.author;
  blog.category = category !== undefined ? category : blog.category;
  if (tags !== undefined) {
    blog.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
  }

  if (published !== undefined) {
    const wasPublished = blog.published;
    blog.published = Boolean(published);
    if (blog.published && (!wasPublished || !blog.publishedAt)) {
      blog.publishedAt = new Date();
    }
  }

  blog.metaTitle = metaTitle !== undefined ? metaTitle : blog.metaTitle;
  blog.metaDescription = metaDescription !== undefined ? metaDescription : blog.metaDescription;

  await blog.save();

  res.status(200).json({
    success: true,
    data: blog,
  });
});

/**
 * @desc    Toggle blog published status instantly
 * @route   PATCH /api/admin/blogs/:id/publish
 * @access  Private (Admin)
 */
exports.togglePublishBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorResponse('Blog post not found', 404));
  }

  blog.published = !blog.published;
  if (blog.published && !blog.publishedAt) {
    blog.publishedAt = new Date();
  }

  await blog.save();

  res.status(200).json({
    success: true,
    data: blog,
  });
});

/**
 * @desc    Delete blog post
 * @route   DELETE /api/admin/blogs/:id
 * @access  Private (Admin)
 */
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorResponse('Blog post not found', 404));
  }

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Blog post removed successfully',
  });
});
