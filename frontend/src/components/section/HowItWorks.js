import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  UserPlus,
  Search,
  CalendarCheck,
  ChevronUp,
  ChevronDown,
  User,
  Calendar,
} from "lucide-react";

const HowItWorks = ({ howItWorksRef }) => {
  const [activeStep, setActiveStep] = useState(0);

  const howitworkssteps = [
    {
      number: "1",
      icon: UserPlus,
      title: "Teacher Creates Profile",
      description:
        "Teachers sign up and create detailed profiles with their qualifications, subjects, and available time schedules for teaching.",
    },
    {
      number: "2",
      icon: Search,
      title: "Student Browsing",
      description:
        "Students browse through qualified teacher profiles, view their availability, and subjects to find the perfect tutor.",
    },
    {
      number: "3",
      icon: CalendarCheck,
      title: "Book & Connect Directly",
      description:
        "Students contact the teacher directly via provided contact information and book tuition classes from available time slots.",
    },
  ];

  return (
    <section ref={howItWorksRef} className="py-12 sm:py-16 md:py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Play className="w-4 h-4" />
            GET STARTED
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-serif">
            How <span className="text-brand-600">TuitionMaster</span> Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Search, compare, and connect with a tutor in three simple steps
          </p>
        </div>

        {/* Desktop Steps */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          <div className="hidden lg:block absolute top-16 left-1/4 right-3/4 h-0.5 bg-gradient-to-r from-brand-200 to-brand-300 -z-10"></div>
          <div className="hidden lg:block absolute top-16 left-1/2 right-1/4 h-0.5 bg-gradient-to-r from-brand-200 to-brand-300 -z-10"></div>
          <div className="hidden lg:block absolute top-16 left-3/4 right-1/4 h-0.5 bg-gradient-to-r from-brand-200 to-brand-300 -z-10"></div>

          {howitworkssteps.map((step, index) => (
            <div
              key={step.number}
              className="text-center p-8 bg-gradient-to-b from-white to-stone-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-200 relative cursor-pointer group"
              onMouseEnter={() => setActiveStep(step.number)}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {step.number}
              </div>

              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-100 rounded-2xl mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-10 h-10 text-brand-600" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 to-brand-700 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Mobile Steps */}
        <div className="md:hidden space-y-4">
          {howitworkssteps.map((step) => (
            <div
              key={step.number}
              className="bg-gradient-to-b from-white to-stone-50 rounded-2xl shadow-lg border border-stone-200 overflow-hidden"
            >
              <button
                className="w-full p-6 text-left flex items-center justify-between group"
                onClick={() =>
                  setActiveStep(activeStep === step.number ? 0 : step.number)
                }
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                      {step.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <step.icon className="w-4 h-4 text-brand-500" />
                      <span className="text-sm text-gray-500">
                        Tap to expand
                      </span>
                    </div>
                  </div>
                </div>
                {activeStep === step.number ? (
                  <ChevronUp className="w-5 h-5 text-brand-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-brand-600" />
                )}
              </button>

              {activeStep === step.number && (
                <div className="px-6 pb-8 border-t border-stone-200 pt-6">
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-2xl">
                      <step.icon className="w-8 h-8 text-brand-600" />
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-center text-base">
                    {step.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Platform Flow Diagram */}
        <div className="mt-10 sm:mt-12 bg-gradient-to-r from-brand-50 to-gold-50 rounded-2xl p-5 sm:p-8 border border-stone-200">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center font-serif">
            Platform Flow
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-stone-200">
              <div className="w-12 h-12 mx-auto bg-brand-100 rounded-full flex items-center justify-center mb-3">
                <User className="w-6 h-6 text-brand-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">
                Teacher Sign Up
              </h4>
            </div>

            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-stone-200">
              <div className="w-12 h-12 mx-auto bg-gold-100 rounded-full flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-gold-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">
                Student Search
              </h4>
            </div>

            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-stone-200">
              <div className="w-12 h-12 mx-auto bg-success-100 rounded-full flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-success-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">
                Book Class
              </h4>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Complete process from profile creation to class booking
          </p>
        </div>

        {/* CTA below steps */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/teachers"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl hover:from-brand-700 hover:to-brand-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Browse Tutors
          </Link>
          <p className="mt-4 text-gray-600">
            View profiles, check availability, and message your first tutor today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
