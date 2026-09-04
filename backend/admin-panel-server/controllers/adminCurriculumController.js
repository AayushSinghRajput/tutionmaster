const CurriculumCategory = require("../../models/CurriculumCategory");
const asyncHandler = require("../../middleware/asyncHandler");
const ErrorResponse = require("../../utils/errorResponse");

const DEFAULT_CATEGORIES = [
  {
    name: "School Level",
    slug: "school-level",
    badge: "Class 1–10",
    description: "Curriculum aligned with CDC Nepal for school grades 1 through 10 / SEE",
    icon: "GraduationCap",
    order: 1,
    isVisible: true,
    subjects: [
      { name: "Nepali", grades: ["1-5", "6-8", "9-10"], isVisible: true, searchTags: ["nepali", "bhasa", "see"] },
      { name: "English", grades: ["1-5", "6-8", "9-10"], isVisible: true, searchTags: ["grammar", "comprehension", "see"] },
      { name: "Compulsory Mathematics", grades: ["1-5", "6-8", "9-10"], isVisible: true, searchTags: ["maths", "algebra", "geometry", "see"] },
      { name: "Optional Mathematics", grades: ["9-10"], isVisible: true, searchTags: ["opt math", "trigonometry", "matrices", "see"] },
      { name: "Science & Technology", grades: ["1-5", "6-8", "9-10"], isVisible: true, searchTags: ["physics", "chemistry", "biology", "see"] },
      { name: "Social Studies", grades: ["1-5", "6-8", "9-10"], isVisible: true, searchTags: ["samajik", "civics", "history"] },
      { name: "Computer Science", grades: ["4-8", "9-10"], isVisible: true, searchTags: ["qbasic", "html", "hardware"] },
      { name: "Health & Physical Education", grades: ["6-8", "9-10"], isVisible: true, searchTags: ["health", "hpe"] },
      { name: "Accountancy (School)", grades: ["9-10"], isVisible: true, searchTags: ["bookkeeping", "accounting"] },
    ],
  },
  {
    name: "+2 Level",
    slug: "plus-two-level",
    badge: "Grade 11–12 · NEB",
    description: "National Examination Board (NEB) Science, Management, and Humanities courses",
    icon: "BookOpen",
    order: 2,
    isVisible: true,
    subjects: [
      { name: "Physics", grades: ["11", "12"], isVisible: true, searchTags: ["mechanics", "electromagnetism", "optics", "neb"] },
      { name: "Chemistry", grades: ["11", "12"], isVisible: true, searchTags: ["organic", "inorganic", "physical", "neb"] },
      { name: "Biology", grades: ["11", "12"], isVisible: true, searchTags: ["botany", "zoology", "neb"] },
      { name: "Mathematics (+2)", grades: ["11", "12"], isVisible: true, searchTags: ["calculus", "vectors", "probability", "neb"] },
      { name: "Accountancy (+2)", grades: ["11", "12"], isVisible: true, searchTags: ["financial accounting", "costing", "neb"] },
      { name: "Economics", grades: ["11", "12"], isVisible: true, searchTags: ["microeconomics", "macroeconomics", "neb"] },
      { name: "Business Studies", grades: ["11", "12"], isVisible: true, searchTags: ["management", "commerce"] },
      { name: "Computer Science (+2)", grades: ["11", "12"], isVisible: true, searchTags: ["c programming", "rdbms", "web technology"] },
      { name: "Business Mathematics", grades: ["11", "12"], isVisible: true, searchTags: ["business math", "statistics"] },
      { name: "English (+2)", grades: ["11", "12"], isVisible: true, searchTags: ["neb english", "heritage of words"] },
    ],
  },
  {
    name: "Engineering",
    slug: "engineering",
    badge: "Bachelor's · IOE / TU / KU / PU",
    description: "Undergraduate engineering courses across Computer, Civil, Electrical, and Mechanical",
    icon: "Cpu",
    order: 3,
    isVisible: true,
    subjects: [
      { name: "Engineering Mathematics I / II / III", grades: ["Bachelor's"], isVisible: true, searchTags: ["calculus", "differential equations", "laplace"] },
      { name: "Engineering Physics", grades: ["Bachelor's"], isVisible: true, searchTags: ["waves", "quantum", "lasers"] },
      { name: "Engineering Chemistry", grades: ["Bachelor's"], isVisible: true, searchTags: ["electrochemistry", "polymers"] },
      { name: "Data Structures & Algorithms", grades: ["Bachelor's"], isVisible: true, searchTags: ["dsa", "trees", "graphs", "sorting"] },
      { name: "Object Oriented Programming (C++/Java)", grades: ["Bachelor's"], isVisible: true, searchTags: ["oop", "classes", "inheritance"] },
      { name: "Database Management Systems", grades: ["Bachelor's"], isVisible: true, searchTags: ["dbms", "sql", "normalization"] },
      { name: "Digital Logic", grades: ["Bachelor's"], isVisible: true, searchTags: ["k-maps", "combinational circuits", "flip flops"] },
      { name: "Computer Architecture", grades: ["Bachelor's"], isVisible: true, searchTags: ["pipeline", "mips", "assembly"] },
      { name: "Theory of Computation (TOC)", grades: ["Bachelor's"], isVisible: true, searchTags: ["automata", "turing machine", "cfg"] },
      { name: "Operating Systems", grades: ["Bachelor's"], isVisible: true, searchTags: ["concurrency", "memory management", "linux"] },
      { name: "Applied Mechanics", grades: ["Bachelor's"], isVisible: true, searchTags: ["statics", "dynamics", "trusses"] },
      { name: "Structural Analysis", grades: ["Bachelor's"], isVisible: true, searchTags: ["civil", "beams", "moment distribution"] },
      { name: "Thermodynamics", grades: ["Bachelor's"], isVisible: true, searchTags: ["heat transfer", "entropy", "carnot"] },
    ],
  },
  {
    name: "Programming & IT",
    slug: "programming-it",
    badge: "Practical Skills · Industry Ready",
    description: "Hands-on software development, web frameworks, and modern technologies",
    icon: "Code",
    order: 4,
    isVisible: true,
    subjects: [
      { name: "Python Programming", grades: ["All Levels"], isVisible: true, searchTags: ["python", "scripts", "oop"] },
      { name: "Full-Stack Web Development (MERN)", grades: ["All Levels"], isVisible: true, searchTags: ["react", "node", "express", "mongodb"] },
      { name: "JavaScript & TypeScript", grades: ["All Levels"], isVisible: true, searchTags: ["js", "es6", "ts", "async"] },
      { name: "C & C++ Programming", grades: ["All Levels"], isVisible: true, searchTags: ["pointers", "memory", "stl"] },
      { name: "Java & Spring Boot", grades: ["All Levels"], isVisible: true, searchTags: ["enterprise", "rest api", "hibernate"] },
      { name: "Mobile App Dev (Flutter / React Native)", grades: ["All Levels"], isVisible: true, searchTags: ["android", "ios", "cross-platform"] },
      { name: "Data Science & Machine Learning", grades: ["All Levels"], isVisible: true, searchTags: ["pandas", "scikit-learn", "deep learning"] },
      { name: "SQL & Relational Databases", grades: ["All Levels"], isVisible: true, searchTags: ["postgres", "mysql", "indexing"] },
      { name: "Git, GitHub & DevOps Basics", grades: ["All Levels"], isVisible: true, searchTags: ["version control", "ci/cd", "docker"] },
    ],
  },
  {
    name: "Entrance & Competitive Exams",
    slug: "entrance-exams",
    badge: "IOE · CEE · CMAT · KUUMAT",
    description: "Entrance test preparation modules for engineering, medical, and management",
    icon: "Target",
    order: 5,
    isVisible: true,
    subjects: [
      { name: "IOE Engineering Entrance (Maths/Physics/Chem/English)", grades: ["Entrance"], isVisible: true, searchTags: ["ioe entrance", "pulchowk", "pea"] },
      { name: "CEE Medical Entrance (Biology/Physics/Chem/MAT)", grades: ["Entrance"], isVisible: true, searchTags: ["mbbs entrance", "name", "vibrant"] },
      { name: "CMAT / KUUMAT (BBA / BIM / BBM)", grades: ["Entrance"], isVisible: true, searchTags: ["verbal", "quantitative", "logical"] },
      { name: "IELTS & PTE Academic", grades: ["Test Prep"], isVisible: true, searchTags: ["listening", "reading", "writing", "speaking"] },
    ],
  },
];

// Seed default categories if empty
async function ensureDefaultCategories() {
  const count = await CurriculumCategory.countDocuments({});
  if (count === 0) {
    await CurriculumCategory.insertMany(DEFAULT_CATEGORIES);
  }
}

// @desc    Get full curriculum categories and subject hierarchy
// @route   GET /api/admin/curriculum
// @access  Admin
exports.adminGetCurriculum = asyncHandler(async (req, res) => {
  await ensureDefaultCategories();
  const categories = await CurriculumCategory.find().sort({ order: 1, createdAt: 1 }).lean();
  res.json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

// @desc    Create new curriculum category
// @route   POST /api/admin/curriculum/categories
// @access  Admin
exports.adminCreateCategory = asyncHandler(async (req, res, next) => {
  const { name, badge, description, icon, isVisible, order } = req.body;

  if (!name || !badge) {
    return next(new ErrorResponse("Category name and badge are required", 400));
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const existing = await CurriculumCategory.findOne({ slug });
  if (existing) {
    return next(new ErrorResponse("Category with this name already exists", 400));
  }

  const category = await CurriculumCategory.create({
    name,
    slug,
    badge,
    description,
    icon: icon || "BookOpen",
    isVisible: isVisible !== undefined ? isVisible : true,
    order: order || 0,
    subjects: [],
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

// @desc    Update curriculum category
// @route   PUT /api/admin/curriculum/categories/:id
// @access  Admin
exports.adminUpdateCategory = asyncHandler(async (req, res, next) => {
  const { name, badge, description, icon, isVisible, order } = req.body;

  const category = await CurriculumCategory.findById(req.params.id);
  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }

  if (name !== undefined) category.name = name;
  if (badge !== undefined) category.badge = badge;
  if (description !== undefined) category.description = description;
  if (icon !== undefined) category.icon = icon;
  if (isVisible !== undefined) category.isVisible = isVisible;
  if (order !== undefined) category.order = order;

  await category.save();

  res.json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
});

// @desc    Delete curriculum category
// @route   DELETE /api/admin/curriculum/categories/:id
// @access  Admin
exports.adminDeleteCategory = asyncHandler(async (req, res, next) => {
  const category = await CurriculumCategory.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }

  res.json({
    success: true,
    message: "Category deleted successfully",
  });
});

// @desc    Add subject to category
// @route   POST /api/admin/curriculum/categories/:id/subjects
// @access  Admin
exports.adminAddSubject = asyncHandler(async (req, res, next) => {
  const { name, code, grades, isVisible, searchTags, order } = req.body;

  if (!name) {
    return next(new ErrorResponse("Subject name is required", 400));
  }

  const category = await CurriculumCategory.findById(req.params.id);
  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }

  category.subjects.push({
    name,
    code,
    grades: Array.isArray(grades) ? grades : grades ? [grades] : [],
    isVisible: isVisible !== undefined ? isVisible : true,
    searchTags: Array.isArray(searchTags)
      ? searchTags
      : searchTags
      ? searchTags.split(",").map((t) => t.trim())
      : [],
    order: order || category.subjects.length + 1,
  });

  await category.save();

  res.status(201).json({
    success: true,
    message: "Subject added successfully",
    data: category,
  });
});

// @desc    Update or toggle subject inside category
// @route   PUT /api/admin/curriculum/categories/:id/subjects/:subId
// @access  Admin
exports.adminUpdateSubject = asyncHandler(async (req, res, next) => {
  const { name, code, grades, isVisible, searchTags, order } = req.body;

  const category = await CurriculumCategory.findById(req.params.id);
  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }

  const subject = category.subjects.id(req.params.subId);
  if (!subject) {
    return next(new ErrorResponse("Subject not found", 404));
  }

  if (name !== undefined) subject.name = name;
  if (code !== undefined) subject.code = code;
  if (grades !== undefined) {
    subject.grades = Array.isArray(grades) ? grades : grades ? [grades] : [];
  }
  if (isVisible !== undefined) subject.isVisible = isVisible;
  if (searchTags !== undefined) {
    subject.searchTags = Array.isArray(searchTags)
      ? searchTags
      : searchTags
      ? searchTags.split(",").map((t) => t.trim())
      : [];
  }
  if (order !== undefined) subject.order = order;

  await category.save();

  res.json({
    success: true,
    message: "Subject updated successfully",
    data: category,
  });
});

// @desc    Delete subject from category
// @route   DELETE /api/admin/curriculum/categories/:id/subjects/:subId
// @access  Admin
exports.adminDeleteSubject = asyncHandler(async (req, res, next) => {
  const category = await CurriculumCategory.findById(req.params.id);
  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }

  category.subjects.pull({ _id: req.params.subId });
  await category.save();

  res.json({
    success: true,
    message: "Subject removed successfully",
    data: category,
  });
});
