import React from "react";
import {
  Award,
  User,
  Shield,
  Search,
  Calendar,
  Clock,
  Phone,
  CheckCircle,
} from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-25 to-indigo-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            WHY CHOOSE US
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The <span className="text-blue-600">TutionMaster</span> Advantage
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A complete platform connecting verified tutors with students
            seamlessly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
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

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Admin Verification
            </h3>
            <p className="text-gray-600 leading-relaxed">
              All teacher profiles are verified by admins to ensure authenticity
              and quality standards
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Browse & Connect
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Students can view verified teacher profiles and contact directly
              via provided contact information
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Schedule & Book
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Teachers set available time slots; students book tuition classes
              directly from teacher profiles
            </p>
          </div>
        </div>

        {/* Additional Feature Row */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-blue-600" />
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

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6 text-blue-600" />
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

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Verified Quality
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Admin-verified profiles ensure reliability
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
