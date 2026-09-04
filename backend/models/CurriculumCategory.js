const mongoose = require("mongoose");

const subjectItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
    grades: [{ type: String }],
    isVisible: { type: Boolean, default: true },
    searchTags: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const curriculumCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    badge: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    icon: { type: String, default: "BookOpen" },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    subjects: [subjectItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CurriculumCategory", curriculumCategorySchema);
