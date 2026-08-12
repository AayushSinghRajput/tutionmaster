import React from "react";
import { Link } from "react-router-dom";
import { UserPlus, GraduationCap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-brand-600 via-brand-700 to-brand-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20 p-2 sm:p-2.5">
          <img src="/logo.png" alt="TuitionMaster" className="w-full h-full rounded-xl object-cover" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-serif">
          Ready to Find Your Tutor?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-brand-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          Whether you're looking for the right tutor or ready to start
          teaching, TuitionMaster connects you directly — no middleman, no
          waiting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/teachers"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-brand-700 bg-white rounded-xl hover:bg-brand-50 transition-all duration-300 shadow-2xl group"
          >
            <UserPlus className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Find a Tutor
          </Link>
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-white bg-transparent border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group"
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
