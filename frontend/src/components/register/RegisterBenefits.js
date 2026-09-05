import React from 'react';
import { Link } from 'react-router-dom';
import { Star, PlayCircle, ArrowRight } from 'lucide-react';
import { teacherBenefits } from '../../constants/register/registerData';

const RegisterBenefits = () => {
  return (
    <div className="h-full flex flex-col justify-between gap-4 sm:gap-5">
      {/* Main Benefits */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-brand-100/50 p-5 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 text-center flex items-center justify-center">
          <Star className="w-5 h-5 sm:w-6 sm:h-6 text-gold-500 mr-2 shrink-0" />
          Why Tutors Choose TuitionMaster
        </h3>

        <div className="grid gap-3 sm:gap-3.5 flex-1 content-between">
          {teacherBenefits.map((benefit, index) => (
            <div
              key={index}
              className={`flex items-start p-3 sm:p-3.5 rounded-xl border transition-all duration-200 ${benefit.bgClass}`}
            >
              <div className="shrink-0 mr-3 mt-0.5 text-brand-600">
                {benefit.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base">{benefit.title}</h4>
                <p className="text-gray-600 text-xs sm:text-sm mt-0.5 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Profile Demo Promo */}
      <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-lg shrink-0">
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <PlayCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-base sm:text-lg leading-tight">New to Teaching Here?</h4>
            <p className="text-white/80 text-xs">Step-by-step profile walkthrough</p>
          </div>
        </div>
        <p className="text-white/95 text-xs sm:text-sm mb-3.5 leading-relaxed">
          See how verified tutors create their profile, set tuition rates, and start getting contacted by students across Nepal.
        </p>
        <Link
          to="/how-it-works/teacher-profile"
          className="inline-flex items-center justify-center w-full bg-white text-gold-800 px-4 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-gold-50 hover:shadow-md transition-all duration-200 group"
        >
          <span>See How It Works</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default RegisterBenefits;
