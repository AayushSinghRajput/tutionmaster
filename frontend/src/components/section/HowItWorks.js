import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  UserPlus,
  ShieldCheck,
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
    <section ref={howItWorksRef} className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Play className="w-4 h-4" />
            GET STARTED
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How <span className="text-blue-600">TutionMaster</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with verified tutors in four simple steps
          </p>
        </div>

        {/* Desktop Steps - Updated to 4 columns */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* Connecting Lines */}
          <div className="hidden lg:block absolute top-16 left-1/4 right-3/4 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300 -z-10"></div>
          <div className="hidden lg:block absolute top-16 left-1/2 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300 -z-10"></div>
          <div className="hidden lg:block absolute top-16 left-3/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300 -z-10"></div>

          {howitworkssteps.map((step, index) => (
            <div
              key={step.number}
              className="text-center p-8 bg-gradient-to-b from-white to-blue-25 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 relative cursor-pointer group"
              onMouseEnter={() => setActiveStep(step.number)}
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {step.number}
              </div>

              {/* Icon Container */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-10 h-10 text-blue-600" />
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Mobile Steps - Updated for 4 steps */}
        <div className="md:hidden space-y-4">
          {howitworkssteps.map((step) => (
            <div
              key={step.number}
              className="bg-gradient-to-b from-white to-blue-25 rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
            >
              <button
                className="w-full p-6 text-left flex items-center justify-between group"
                onClick={() =>
                  setActiveStep(activeStep === step.number ? 0 : step.number)
                }
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <step.icon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-500">
                        Tap to expand
                      </span>
                    </div>
                  </div>
                </div>
                {activeStep === step.number ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                )}
              </button>

              {activeStep === step.number && (
                <div className="px-6 pb-8 border-t border-blue-100 pt-6">
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl">
                      <step.icon className="w-8 h-8 text-blue-600" />
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

        {/* Platform Flow Diagram - Mobile Optimized */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Platform Flow
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-blue-100">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">
                Teacher Sign Up
              </h4>
            </div>

            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-blue-100">
              <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">
                Student Search
              </h4>
            </div>

            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-blue-100">
              <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-orange-600" />
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
        <div className="text-center mt-12">
          <Link
            to="/teachers"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Browse Verified Tutors
          </Link>
          <p className="mt-4 text-gray-600">
            View profiles, check availability, and book your first class today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
