import { Link } from "react-router-dom";
import { UserCog, BookMarked, CalendarClock, Radar } from "lucide-react";

const TUTOR_BENEFITS = [
  {
    icon: UserCog,
    title: "Create your tutor profile",
    description: "Set up a profile that shows who you are and what you teach.",
  },
  {
    icon: BookMarked,
    title: "Showcase your subjects & expertise",
    description: "List the subjects, levels, and qualifications you teach best.",
  },
  {
    icon: CalendarClock,
    title: "Set your own preferences",
    description: "Choose your teaching mode, availability, and hourly rate.",
  },
  {
    icon: Radar,
    title: "Get discovered by students",
    description: "Students searching for your subjects can find and message you directly.",
  },
];

const TutorValueProp = () => {
  return (
    <section id="for-tutors" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gold-50 to-stone-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Ready to Teach? Find Students Who Need You.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            You want to teach, but finding students can be difficult. TuitionMaster
            connects you with students searching for your subjects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8 sm:mb-10">
          {TUTOR_BENEFITS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 bg-gold-100 rounded-xl mb-4">
                <Icon className="w-5 h-5 text-gold-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1.5">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/register" className="btn-brand-outline px-6 sm:px-8 py-3 text-base">
            Create Your Tutor Profile
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TutorValueProp;
