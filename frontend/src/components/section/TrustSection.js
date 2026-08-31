import { ShieldCheck, MessageSquare, Tag, MapPinned } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Reviewed tutor profiles",
    description: "Verified profiles are clearly marked, so you know who you're talking to.",
  },
  {
    icon: MessageSquare,
    title: "Direct messaging",
    description: "Talk to tutors yourself — no middleman, no hidden agent fees.",
  },
  {
    icon: Tag,
    title: "Transparent rates & subjects",
    description: "See a tutor's subjects, experience, and rate before you reach out.",
  },
  {
    icon: MapPinned,
    title: "Tutors across Nepal",
    description: "From local city tutors to online sessions, wherever you're learning from.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Built to Make Tutoring Easier in Nepal
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A more reliable alternative to finding a tutor through random posts and contacts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TRUST_ITEMS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="text-center bg-stone-50 rounded-2xl p-5 sm:p-6 border border-stone-200"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-success-100 rounded-xl mb-3">
                <Icon className="w-6 h-6 text-success-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1.5">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
