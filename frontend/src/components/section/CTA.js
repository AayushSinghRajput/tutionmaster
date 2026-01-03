import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, UserPlus, GraduationCap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20 group hover:scale-110 transition-transform duration-300">
          <BookOpen className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Ready to Transform Your Learning?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of successful students who achieved their academic
          goals with personalized tutoring
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/teachers"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-2xl group"
          >
            <UserPlus className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Start Learning
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group hover:scale-105 transition-transform duration-300"
          >
            <GraduationCap className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Become a Tutor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
