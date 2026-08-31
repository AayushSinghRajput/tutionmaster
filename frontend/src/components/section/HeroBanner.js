import { Link } from "react-router-dom";
import {
  Search,
  TrendingUp,
  MapPin,
  Clock,
  Wallet,
  Sparkles,
  Star,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";

const TRUST_POINTS = [
  "Match by subject, level & location",
  "Flexible schedules & budgets",
  "Tutors across Nepal",
  "Message tutors directly",
];

const FILTER_CHIPS = [
  { icon: MapPin, label: "Kathmandu" },
  { icon: Clock, label: "Online" },
  { icon: Wallet, label: "NPR 300–500/hr" },
];

const HeroVisual = () => (
  <div className="relative max-w-md mx-auto lg:max-w-none w-full">
    <div className="absolute -top-8 -right-6 w-40 h-40 bg-gold-200/50 rounded-full blur-3xl" aria-hidden="true" />
    <div className="absolute -bottom-10 -left-8 w-48 h-48 bg-brand-200/40 rounded-full blur-3xl" aria-hidden="true" />

    <div className="relative bg-white rounded-3xl border border-stone-200 shadow-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] sm:text-xs font-bold text-gray-400 tracking-wider">
          FIND A TUTOR
        </span>
        <div className="flex gap-1" aria-hidden="true">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-200" />
          <span className="w-1.5 h-1.5 rounded-full bg-stone-200" />
          <span className="w-1.5 h-1.5 rounded-full bg-stone-200" />
        </div>
      </div>

      <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 mb-3">
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <span className="text-sm sm:text-base text-gray-700 font-medium truncate">
          Mathematics tutor in Kathmandu
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
        {FILTER_CHIPS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium bg-brand-50 text-brand-700 border border-brand-100 px-2.5 py-1 rounded-full"
          >
            <Icon className="w-3 h-3" />
            {label}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-gold-700 mb-3 sm:mb-4">
        <Sparkles className="w-3.5 h-3.5 shrink-0" />
        MATCHING YOU WITH TUTORS
        <span className="flex-1 h-px bg-stone-200" />
      </div>

      <div className="relative flex items-center gap-3 bg-brand-50/40 border-2 border-brand-300 rounded-2xl p-3 sm:p-4 mb-3 shadow-sm">
        <span className="absolute -top-2.5 left-3 inline-flex items-center gap-1 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          <BadgeCheck className="w-3 h-3" />
          Best Match
        </span>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-700 shrink-0">
          SK
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-gray-900 text-sm sm:text-base truncate">
              Sujata K.
            </span>
            <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500 shrink-0" />
            <span className="text-xs text-gray-500 font-medium">4.9</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-500 truncate">
            Mathematics · Kathmandu
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm sm:text-base font-bold text-gray-900">NPR 300</div>
          <div className="text-[10px] sm:text-xs text-gray-400">per hour</div>
        </div>
      </div>

      <div className="relative flex items-center gap-3 bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 opacity-80">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold-100 flex items-center justify-center font-bold text-gold-700 shrink-0">
          BT
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-gray-900 text-sm sm:text-base truncate">
              Bikash T.
            </span>
            <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500 shrink-0" />
            <span className="text-xs text-gray-500 font-medium">4.8</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-500 truncate">
            Physics · Mathematics · Lalitpur
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm sm:text-base font-bold text-gray-900">NPR 450</div>
          <div className="text-[10px] sm:text-xs text-gray-400">per hour</div>
        </div>
      </div>
    </div>

    <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-white border border-stone-200 rounded-2xl shadow-lg px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-success-100 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-4 h-4 text-success-600" />
      </div>
      <div>
        <div className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">Perfect Match</div>
        <div className="text-[10px] sm:text-xs text-gray-500 leading-tight">Ready to connect</div>
      </div>
    </div>
  </div>
);

const HeroBanner = () => {
  return (
    <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 bg-gradient-to-b from-brand-100 via-brand-50 to-stone-50 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur border border-brand-200 text-brand-700 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-sm">
              <MapPin className="w-3.5 h-3.5" />
              Tutors Across Nepal
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-4 sm:mb-5">
              Find the Right Tutor.
              <br />
              Start Learning.
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              Tell us your subject, level, location, schedule, and budget —
              we&apos;ll help you find tutors who match, so you can connect
              and start learning sooner.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10">
              <Link
                to="/teachers"
                className="btn-brand-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5 shadow-lg shadow-brand-600/20"
              >
                Find a Tutor <Search className="w-5 h-5 shrink-0" />
              </Link>
              <Link
                to="/register"
                className="btn-brand-outline text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5"
              >
                Teach on TuitionMaster <TrendingUp className="w-5 h-5 shrink-0" />
              </Link>
            </div>

          </div>

          <HeroVisual />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-x-4 gap-y-3 max-w-xl mx-auto lg:mx-0 text-left">
            {TRUST_POINTS.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success-600 shrink-0" />
                <span className="text-sm text-gray-700 font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
