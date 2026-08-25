/**
 * Curated subject catalogue for the TuitionMaster subject-selection component.
 *
 * Each entry has:
 *   category     – display label shown as a group heading
 *   badge        – compact sub-level label shown next to the heading
 *   subjects     – ordered list of commonly-taught subjects in that category
 *
 * Keep this list to a reasonable size – the goal is quick selection of popular
 * subjects, not an exhaustive curriculum catalogue.
 */

export const SUBJECT_CATEGORIES = [
  {
    category: "School Level",
    badge: "Class 1–10",
    subjects: [
      "Nepali",
      "English",
      "Mathematics",
      "Science",
      "Social Studies",
      "Computer",
      "Optional Mathematics",
      "Health & Physical Education",
      "Moral Science",
      "Arts",
    ],
  },
  {
    category: "+2 Level",
    badge: "Grade 11–12 · Science & Management",
    subjects: [
      "Physics",
      "Chemistry",
      "Biology",
      "Mathematics",
      "English",
      "Nepali",
      "Accountancy",
      "Economics",
      "Business Studies",
      "Computer Science",
      "Statistics",
    ],
  },
  {
    category: "Engineering",
    badge: "Bachelor's · BE / BTech",
    subjects: [
      "Engineering Mathematics",
      "Engineering Physics",
      "Engineering Chemistry",
      "Programming",
      "Data Structures & Algorithms",
      "Digital Logic",
      "Computer Architecture",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Engineering Drawing",
      "Electrical Circuits",
      "Electronics",
      "Thermodynamics",
      "Engineering Mechanics",
    ],
  },
  {
    category: "Programming & IT",
    badge: "Beginner · Intermediate · Advanced",
    subjects: [
      "Python",
      "JavaScript",
      "Java",
      "C",
      "C++",
      "HTML & CSS",
      "React",
      "Node.js",
      "Web Development",
      "Mobile App Development",
      "Data Science",
      "Machine Learning",
      "Artificial Intelligence",
      "SQL",
      "Database",
      "Git & GitHub",
    ],
  },
];

/** Flat list of every predefined subject name (lower-cased for fast lookup). */
export const ALL_SUBJECT_NAMES = new Set(
  SUBJECT_CATEGORIES.flatMap((c) => c.subjects.map((s) => s.toLowerCase()))
);
