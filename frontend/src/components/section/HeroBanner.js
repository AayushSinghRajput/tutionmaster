import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  TrendingUp,
  BookOpen,
  Calculator,
  Cpu,
  Code,
} from "lucide-react";

const HeroBanner = ({ scrollToHowItWorks }) => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-brand-100 via-brand-50 to-stone-50 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-stone-200 shadow-sm mb-6 text-sm font-semibold text-gray-700">
            Nepal-wide &middot; SEE to Bachelor&apos;s
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
            Learning goes further with the right person guiding it
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto">
            TuitionMaster connects students and parents across Nepal with
            qualified, subject-matched tutors — and gives tutors a real way
            to reach students.
          </p>
        </div>

        {/* Dual path cards */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm text-left">
            <div className="w-11 h-11 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
              <Search className="w-5 h-5 text-brand-600" />
            </div>
            <h2 className="font-bold text-gray-900 text-lg mb-1.5">
              I&apos;m looking for a tutor
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Browse qualified profiles by subject, level, and location —
              message a tutor directly, no account needed.
            </p>
            <Link to="/teachers" className="btn-brand-primary w-full">
              Find a Tutor <Search className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm text-left">
            <div className="w-11 h-11 rounded-xl bg-gold-100 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 text-gold-600" />
            </div>
            <h2 className="font-bold text-gray-900 text-lg mb-1.5">
              I want to teach
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Build a profile, set your subjects and rate, and start hearing
              from students in your area.
            </p>
            <Link to="/register" className="btn-brand-outline w-full">
              Become a Tutor <TrendingUp className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Curriculum programs — TuitionMaster's strongest, most locally-specific asset */}
        <div className="bg-white rounded-2xl p-5 sm:p-8 border border-stone-200 shadow-md">
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-serif">
              Comprehensive Learning Programs
            </h3>
            <p className="text-gray-600 text-sm">
              Complete curriculum coverage for all educational levels in
              Nepal
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-stone-50 rounded-xl p-4 sm:p-6 text-center border border-stone-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-100 rounded-xl mb-3">
                <BookOpen className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                School Level (1-10)
              </h3>
              <p className="text-sm text-gray-600">
                All Subjects: Nepali, English, Math, Science, Social
              </p>
              <div className="flex justify-center gap-1 mt-2 flex-wrap">
                <span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full">Class 1-5</span>
                <span className="text-xs bg-success-100 text-success-600 px-2 py-1 rounded-full">Class 6-8</span>
                <span className="text-xs bg-gold-100 text-gold-700 px-2 py-1 rounded-full">Class 9-10</span>
              </div>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 sm:p-6 text-center border border-stone-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-success-100 rounded-xl mb-3">
                <Calculator className="w-6 h-6 text-success-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                +2 Level (Science/Management)
              </h3>
              <p className="text-sm text-gray-600">
                Physics, Chemistry, Biology, Math, English, Nepali
              </p>
              <div className="flex justify-center gap-1 mt-2 flex-wrap">
                <span className="text-xs bg-success-100 text-success-600 px-2 py-1 rounded-full">Grade 11</span>
                <span className="text-xs bg-gold-100 text-gold-700 px-2 py-1 rounded-full">Grade 12</span>
              </div>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 sm:p-6 text-center border border-stone-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-100 rounded-xl mb-3">
                <Cpu className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Engineering (Bachelor&apos;s)
              </h3>
              <p className="text-sm text-gray-600">
                All semesters &amp; subjects for Nepal Engineering colleges
              </p>
              <div className="flex justify-center gap-1 mt-2 flex-wrap">
                <span className="text-xs bg-gold-100 text-gold-700 px-2 py-1 rounded-full">Bachelor</span>
                <span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full">BE/BTech</span>
              </div>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 sm:p-6 text-center border border-stone-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-100 rounded-xl mb-3">
                <Code className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Programming &amp; IT
              </h3>
              <p className="text-sm text-gray-600">
                JavaScript, Python, Web Development, Data Science
              </p>
              <div className="flex justify-center gap-1 mt-2 flex-wrap">
                <span className="text-xs bg-success-100 text-success-600 px-2 py-1 rounded-full">Beginner</span>
                <span className="text-xs bg-gold-100 text-gold-700 px-2 py-1 rounded-full">Advanced</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6">
            <button onClick={scrollToHowItWorks} className="bg-stone-100 hover:bg-stone-200 transition-colors rounded-lg p-2 sm:p-3 text-center border border-stone-200">
              <span className="text-gray-700 text-xs sm:text-sm font-medium">SEE Preparation</span>
            </button>
            <button onClick={scrollToHowItWorks} className="bg-stone-100 hover:bg-stone-200 transition-colors rounded-lg p-2 sm:p-3 text-center border border-stone-200">
              <span className="text-gray-700 text-xs sm:text-sm font-medium">+2 Entrance</span>
            </button>
            <button onClick={scrollToHowItWorks} className="bg-stone-100 hover:bg-stone-200 transition-colors rounded-lg p-2 sm:p-3 text-center border border-stone-200">
              <span className="text-gray-700 text-xs sm:text-sm font-medium">Engineering Entrance</span>
            </button>
          </div>
        </div>

        {/* Real, falsifiable stats — no unproven superlatives */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-14 max-w-2xl mx-auto text-center">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 font-serif">Nepal-Wide</div>
            <div className="text-gray-600 text-xs sm:text-sm">Tutor network</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 font-serif">40+</div>
            <div className="text-gray-600 text-xs sm:text-sm">Subjects listed</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 font-serif">All Levels</div>
            <div className="text-gray-600 text-xs sm:text-sm">School to Bachelor&apos;s</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 font-serif">1-on-1</div>
            <div className="text-gray-600 text-xs sm:text-sm">Personalized learning</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
