import React from "react";
import {
  Award,
  User,
  Search,
  Calendar,
  Clock,
  Phone,
  CheckCircle,
} from "lucide-react";

const Features = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-stone-50 to-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            WHY CHOOSE US
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-serif">
            The <span className="text-brand-600">TuitionMaster</span> Advantage
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A complete platform connecting qualified tutors with students
            seamlessly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-200 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Teacher Profiles
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Teachers create comprehensive profiles with qualifications,
              experience, and teaching subjects
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-200 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Browse &amp; Connect
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Students can view teacher profiles and contact directly via
              provided contact information — no account required
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-200 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Schedule &amp; Book
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Teachers set available time slots; students book tuition classes
              directly from teacher profiles
            </p>
          </div>
        </div>

        {/* Additional Feature Row */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Flexible Scheduling
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Teachers customize their availability
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Direct Communication
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Students connect with teachers directly
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Quality Education
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Well-qualified teachers ensure quality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
