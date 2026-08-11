import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Search,
  Play,
  BookOpen,
  Calculator,
  Cpu,
  Code,
} from "lucide-react";

const HeroBanner = ({ scrollToHowItWorks }) => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Star className="w-5 h-5 text-yellow-300 shrink-0" />
              <span className="font-semibold text-sm">
                Connecting students with verified tutors across Nepal
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your Perfect
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                {" "}
                Tutor
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed mb-8 max-w-lg">
              Connect with qualified educators, master new skills, and achieve
              your academic goals with personalized 1-on-1 tutoring.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/teachers"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-2xl group"
              >
                <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                Find Tutors Now
              </Link>
              <button
                onClick={scrollToHowItWorks}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-white bg-transparent border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group"
              >
                <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                How It Works
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">Nepal-Wide</div>
                <div className="text-blue-200 text-sm font-medium">
                  Tutor Network
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">Qualified</div>
                <div className="text-blue-200 text-sm font-medium">
                  Tutor Profiles
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">All Levels</div>
                <div className="text-blue-200 text-sm font-medium">
                  School to Bachelor's
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">1-on-1</div>
                <div className="text-blue-200 text-sm font-medium">
                  Personalized Learning
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Subjects Grid */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  Comprehensive Learning Programs
                </h3>
                <p className="text-blue-100 text-sm">
                  Complete curriculum coverage for all educational levels in
                  Nepal
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* School Level (1-10) */}
                <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg transform hover:scale-105 transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3 group-hover:bg-blue-200 transition-colors">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    School Level (1-10)
                  </h3>
                  <p className="text-sm text-gray-600">
                    All Subjects: Nepali, English, Math, Science, Social
                  </p>
                  <div className="flex justify-center gap-1 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Class 1-5
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Class 6-8
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      Class 9-10
                    </span>
                  </div>
                </div>

                {/* +2 Level */}
                <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg transform hover:scale-105 transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-3 group-hover:bg-green-200 transition-colors">
                    <Calculator className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    +2 Level (Science/Management)
                  </h3>
                  <p className="text-sm text-gray-600">
                    Physics, Chemistry, Biology, Math, English, Nepali
                  </p>
                  <div className="flex justify-center gap-1 mt-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Grade 11
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      Grade 12
                    </span>
                  </div>
                </div>

                {/* Engineering */}
                <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg transform hover:scale-105 transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl mb-3 group-hover:bg-yellow-200 transition-colors">
                    <Cpu className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Engineering (Bachelor's)
                  </h3>
                  <p className="text-sm text-gray-600">
                    All semesters & subjects for Nepal Engineering colleges
                  </p>
                  <div className="flex justify-center gap-1 mt-2">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      Bachelor
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      BE/BTech
                    </span>
                  </div>
                </div>

                {/* Programming & IT */}
                <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg transform hover:scale-105 transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-3 group-hover:bg-purple-200 transition-colors">
                    <Code className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Programming & IT
                  </h3>
                  <p className="text-sm text-gray-600">
                    JavaScript, Python, Web Development, Data Science
                  </p>
                  <div className="flex justify-center gap-1 mt-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Beginner
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      Advanced
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Programs Row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6">
                <div className="bg-white/20 rounded-lg p-2 sm:p-3 text-center border border-white/30">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    SEE Preparation
                  </span>
                </div>
                <div className="bg-white/20 rounded-lg p-2 sm:p-3 text-center border border-white/30">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    +2 Entrance
                  </span>
                </div>
                <div className="bg-white/20 rounded-lg p-2 sm:p-3 text-center border border-white/30">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    Engineering Entrance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
