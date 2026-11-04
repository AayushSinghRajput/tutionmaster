import { Award, Sparkles, Target, Search, ClipboardCheck, ShieldCheck, Globe } from "lucide-react";

const WHY_CHOOSE_FEATURES = [
  {
    icon: Sparkles,
    gradient: "from-brand-600 to-brand-700",
    title: "Intelligent Tutor Discovery",
    description:
      "Tell our AI assistant what your child needs help with—from SEE compulsory math to university entrance physics. It instantly analyzes subject matter, syllabus level, and tutor expertise to surface the best mentors.",
  },
  {
    icon: Target,
    gradient: "from-gold-500 to-gold-600",
    title: "100% Tailored Instruction",
    description:
      "One-on-one sessions adapted to each student's unique learning pace. Tutors build targeted practice problem sets, address conceptual blindspots, and guide exam revisions without rushing.",
  },
  {
    icon: Search,
    gradient: "from-success-500 to-success-600",
    title: "Multi-Filter Search Precision",
    description:
      "Filter by specific academic subjects, your city or neighborhood in Nepal, budget per hour or month, and teaching format. Find exactly the educator who fits your family's schedule.",
  },
  {
    icon: ClipboardCheck,
    gradient: "from-brand-600 to-brand-700",
    title: "Comprehensive Tutor CVs",
    description:
      "Inspect authentic academic qualifications, college degrees, teaching certificates, and verified subject specializations directly on each tutor's public profile before reaching out.",
  },
  {
    icon: ShieldCheck,
    gradient: "from-gold-500 to-gold-600",
    title: "Verified Community Reviews",
    description:
      "Read genuine, moderated feedback from Nepali parents and students. We maintain a zero-tolerance policy for fabricated ratings, giving you total confidence in your choice.",
  },
  {
    icon: Globe,
    gradient: "from-success-500 to-success-600",
    title: "In-Person Home & Virtual Classes",
    description:
      "Choose in-person home tutoring across the Kathmandu Valley and major cities, or opt for interactive digital tutoring to learn from premier instructors anywhere across Nepal.",
  },
];

const Features = () => {
  return (
    <section id="why-tuitionmaster" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-stone-50 to-brand-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            WHY CHOOSE US
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Why Students & Parents Trust <span className="text-brand-600">TuitionMaster</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Eliminating broker fees, unvetted tutors, and mismatched teaching styles. We provide a transparent, merit-first platform where every Nepali student can thrive under expert academic mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_FEATURES.map(({ icon: Icon, gradient, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-stone-200 hover:border-brand-200 group"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
