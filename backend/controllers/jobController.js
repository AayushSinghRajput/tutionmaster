const asyncHandler = require('express-async-handler');
const Job = require('../models/Job');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Get all published & active jobs with pagination (limit 9 per page)
 * @route   GET /api/v1/jobs
 * @access  Public
 */
exports.getPublicJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = 9; // Exactly 9 jobs per page
  const skip = (page - 1) * limit;

  const query = {
    published: true,
    status: { $ne: 'Closed' },
  };

  if (req.query.search) {
    query.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { location: { $regex: req.query.search, $options: 'i' } },
      { subject: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  if (req.query.jobType) {
    query.jobType = req.query.jobType;
  }

  const totalCount = await Job.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const jobs = await Job.find(query)
    .sort({ publishedAt: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  res.status(200).json({
    success: true,
    count: jobs.length,
    jobs,
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
 * @desc    Get single job by slug (Strictly protected for authenticated tutors/users)
 * @route   GET /api/v1/jobs/slug/:slug
 * @access  Private (Authenticated User)
 */
exports.getPublicJobBySlug = asyncHandler(async (req, res, next) => {
  const job = await Job.findOne({
    slug: req.params.slug,
    published: true,
  }).lean();

  if (!job) {
    return next(new ErrorResponse('Tuition job vacancy not found', 404));
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

/**
 * @desc    Get all jobs for Admin (with search, status filter, pagination)
 * @route   GET /api/admin/jobs
 * @access  Private (Admin)
 */
exports.getAdminJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const query = {};

  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: 'i' };
  }

  if (req.query.status) {
    query.status = req.query.status;
  }

  if (req.query.published !== undefined && req.query.published !== '') {
    query.published = req.query.published === 'true';
  }

  const totalCount = await Job.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const jobs = await Job.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    count: jobs.length,
    jobs,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
    },
  });
});

/**
 * @desc    Get single job by ID for Admin
 * @route   GET /api/admin/jobs/:id
 * @access  Private (Admin)
 */
exports.getAdminJobById = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorResponse('Tuition job vacancy not found', 404));
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

/**
 * @desc    Create new job post
 * @route   POST /api/admin/jobs
 * @access  Private (Admin)
 */
exports.createJob = asyncHandler(async (req, res, next) => {
  const {
    title,
    slug,
    location,
    jobType,
    subject,
    gradeLevel,
    salary,
    schedule,
    requirements,
    description,
    contactInstructions,
    published,
    status,
  } = req.body;

  let finalSlug = slug;
  if (!finalSlug && title) {
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const shortHash = Math.random().toString(36).substring(2, 6);
    finalSlug = `${baseSlug}-${shortHash}`;
  }

  const existingSlug = await Job.findOne({ slug: finalSlug });
  if (existingSlug) {
    return next(new ErrorResponse('Slug already in use. Please use a unique slug.', 400));
  }

  const jobData = {
    title,
    slug: finalSlug,
    location,
    jobType: jobType || 'Home Tuition',
    subject: Array.isArray(subject) ? subject : (subject ? subject.split(',').map(s => s.trim()) : []),
    gradeLevel,
    salary: salary || 'Negotiable',
    schedule: schedule || 'Flexible',
    requirements: requirements || '',
    description: description || '',
    contactInstructions: contactInstructions || '',
    published: Boolean(published),
    status: status || 'Open',
    publishedAt: published ? new Date() : null,
  };

  const job = await Job.create(jobData);

  res.status(201).json({
    success: true,
    data: job,
  });
});

/**
 * @desc    Update job post
 * @route   PUT /api/admin/jobs/:id
 * @access  Private (Admin)
 */
exports.updateJob = asyncHandler(async (req, res, next) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorResponse('Tuition job vacancy not found', 404));
  }

  const {
    title,
    slug,
    location,
    jobType,
    subject,
    gradeLevel,
    salary,
    schedule,
    requirements,
    description,
    contactInstructions,
    published,
    status,
  } = req.body;

  if (slug && slug !== job.slug) {
    const existingSlug = await Job.findOne({ slug, _id: { $ne: req.params.id } });
    if (existingSlug) {
      return next(new ErrorResponse('Slug already in use by another job.', 400));
    }
  }

  job.title = title !== undefined ? title : job.title;
  job.slug = slug !== undefined ? slug : job.slug;
  job.location = location !== undefined ? location : job.location;
  job.jobType = jobType !== undefined ? jobType : job.jobType;
  if (subject !== undefined) {
    job.subject = Array.isArray(subject) ? subject : subject.split(',').map(s => s.trim());
  }
  job.gradeLevel = gradeLevel !== undefined ? gradeLevel : job.gradeLevel;
  job.salary = salary !== undefined ? salary : job.salary;
  job.schedule = schedule !== undefined ? schedule : job.schedule;
  job.requirements = requirements !== undefined ? requirements : job.requirements;
  job.description = description !== undefined ? description : job.description;
  job.contactInstructions = contactInstructions !== undefined ? contactInstructions : job.contactInstructions;
  job.status = status !== undefined ? status : job.status;

  if (published !== undefined) {
    const wasPublished = job.published;
    job.published = Boolean(published);
    if (job.published && (!wasPublished || !job.publishedAt)) {
      job.publishedAt = new Date();
    }
  }

  await job.save();

  res.status(200).json({
    success: true,
    data: job,
  });
});

/**
 * @desc    Toggle job published status
 * @route   PATCH /api/admin/jobs/:id/publish
 * @access  Private (Admin)
 */
exports.togglePublishJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorResponse('Tuition job vacancy not found', 404));
  }

  job.published = !job.published;
  if (job.published && !job.publishedAt) {
    job.publishedAt = new Date();
  }

  await job.save();

  res.status(200).json({
    success: true,
    data: job,
  });
});

/**
 * @desc    Update job status (Open, Urgent, Filled, Closed)
 * @route   PATCH /api/admin/jobs/:id/status
 * @access  Private (Admin)
 */
exports.updateJobStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ['Open', 'Urgent', 'Filled', 'Closed'];

  if (!validStatuses.includes(status)) {
    return next(new ErrorResponse('Invalid job status', 400));
  }

  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorResponse('Tuition job vacancy not found', 404));
  }

  job.status = status;
  await job.save();

  res.status(200).json({
    success: true,
    data: job,
  });
});

/**
 * @desc    Delete job post
 * @route   DELETE /api/admin/jobs/:id
 * @access  Private (Admin)
 */
exports.deleteJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorResponse('Tuition job vacancy not found', 404));
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Tuition job deleted successfully',
  });
});
