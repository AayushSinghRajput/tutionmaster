import { Link } from "react-router-dom";
import { Target, GitCompare, SlidersHorizontal, MessageCircle } from "lucide-react";

const STUDENT_BENEFITS = [
  {
    icon: Target,
    title: "Find tutors based on your needs",
    description: "Search by the subject and level you're actually struggling with.",
  },
  {
    icon: SlidersHorizontal,
    title: "Choose what fits you",
    description: "Filter by subject, level, location, schedule, and rate — together.",
  },
  {
    icon: GitCompare,
    title: "Compare before you choose",
    description: "Review profiles side by side to find the tutor who's the best fit.",
  },
  {
    icon: MessageCircle,
    title: "Connect directly",
    description: "Message a tutor yourself — no middleman, no waiting on a callback.",
  },
];

const StudentValueProp = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Learning becomes easier when you find the right tutor.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            TuitionMaster gives you the tools to find learning support that actually
            fits your requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {STUDENT_BENEFITS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 bg-brand-100 rounded-xl mb-4">
                <Icon className="w-5 h-5 text-brand-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1.5">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link to="/teachers" className="btn-brand-primary px-6 sm:px-8 py-3 text-base">
            Find a Tutor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StudentValueProp;
