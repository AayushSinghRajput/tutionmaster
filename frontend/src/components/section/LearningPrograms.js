import { BookOpen, Calculator, Cpu, Code, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const PROGRAMS = [
  {
    icon: BookOpen,
    iconBg: "bg-brand-100",
    iconText: "text-brand-600",
    title: "School Level (1–10)",
    description: "All Subjects: Nepali, English, Math, Science, Social",
    tags: [
      { label: "Class 1–5", className: "bg-brand-100 text-brand-700" },
      { label: "Class 6–8", className: "bg-success-100 text-success-600" },
      { label: "Class 9–10", className: "bg-gold-100 text-gold-700" },
    ],
  },
  {
    icon: Calculator,
    iconBg: "bg-success-100",
    iconText: "text-success-600",
    title: "+2 Level (Science/Management)",
    description: "Physics, Chemistry, Biology, Math, English, Nepali",
    tags: [
      { label: "Grade 11", className: "bg-success-100 text-success-600" },
      { label: "Grade 12", className: "bg-gold-100 text-gold-700" },
    ],
  },
  {
    icon: Cpu,
    iconBg: "bg-gold-100",
    iconText: "text-gold-600",
    title: "Engineering (Bachelor's)",
    description: "All semesters & subjects for Nepal Engineering colleges",
    tags: [
      { label: "Bachelor", className: "bg-gold-100 text-gold-700" },
      { label: "BE/BTech", className: "bg-brand-100 text-brand-700" },
    ],
  },
  {
    icon: Code,
    iconBg: "bg-brand-100",
    iconText: "text-brand-600",
    title: "Programming & IT",
    description: "JavaScript, Python, Web Development, Data Science",
    tags: [
      { label: "Beginner", className: "bg-success-100 text-success-600" },
      { label: "Advanced", className: "bg-gold-100 text-gold-700" },
    ],
  },
];

const EXAM_PREP = ["SEE Preparation", "+2 Entrance", "Engineering Entrance"];

const LearningPrograms = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <GraduationCap className="w-4 h-4" />
            LEARNING PROGRAMS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Complete Curriculum Coverage
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            From school to bachelor&apos;s level, find tutors for every subject
            and exam across Nepal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PROGRAMS.map(({ icon: Icon, iconBg, iconText, title, description, tags }) => (
            <div
              key={title}
              className="bg-stone-50 rounded-2xl p-5 sm:p-6 text-center border border-stone-200 hover:border-brand-200 hover:shadow-md transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${iconBg} rounded-xl mb-3`}>
                <Icon className={`w-6 h-6 ${iconText}`} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
              <div className="flex justify-center gap-1 mt-3 flex-wrap">
                {tags.map(({ label, className }) => (
                  <span key={label} className={`text-xs px-2 py-1 rounded-full ${className}`}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
          {EXAM_PREP.map((label) => (
            <Link
              key={label}
              to="/teachers"
              className="bg-stone-100 hover:bg-stone-200 transition-colors rounded-lg px-4 py-2.5 text-center border border-stone-200"
            >
              <span className="text-gray-700 text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPrograms;
