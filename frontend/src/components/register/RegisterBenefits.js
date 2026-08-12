import React from 'react';
import { Star, Globe, Clock } from 'lucide-react';
import { teacherBenefits, quickStartSteps } from '../../constants/register/registerData';

const RegisterBenefits = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Main Benefits */}
      <div className="bg-white rounded-2xl shadow-xl border border-brand-100 p-5 sm:p-8">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-8 text-center flex items-center justify-center">
          <Star className="w-5 h-5 sm:w-6 sm:h-6 text-gold-500 mr-2 shrink-0" />
          Why Tutors Choose TuitionMaster
        </h3>

        <div className="grid gap-4">
          {teacherBenefits.map((benefit, index) => (
            <div
              key={index}
              className={`flex items-start p-3 sm:p-4 rounded-xl border transition-all duration-200 ${benefit.bgClass}`}
            >
              {benefit.icon}
              <div>
                <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats & Additional Info */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-4 sm:p-6 text-white text-center shadow-lg">
          <Globe className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-bold">Nepal-Wide</div>
          <div className="text-white/80 text-xs sm:text-sm">Student Reach</div>
        </div>

        <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl p-4 sm:p-6 text-white text-center shadow-lg">
          <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-bold">Flexible</div>
          <div className="text-white/80 text-xs sm:text-sm">Teaching Hours</div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg">
        <h4 className="font-bold text-base sm:text-lg mb-3 flex items-center">
          <Star className="w-5 h-5 mr-2 shrink-0" />
          Get Started in 3 Steps
        </h4>
        <ul className="space-y-2 text-white/80">
          {quickStartSteps.map((step, index) => (
            <li key={index} className="flex items-center text-sm sm:text-base">
              <div className="w-6 h-6 bg-white text-brand-600 rounded-full text-sm flex items-center justify-center font-bold mr-3 shrink-0">
                {index + 1}
              </div>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RegisterBenefits;
