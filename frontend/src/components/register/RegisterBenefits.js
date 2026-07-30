import React from 'react';
import { Star, Globe, Clock } from 'lucide-react';
import { teacherBenefits, quickStartSteps } from '../../constants/register/registerData';

const RegisterBenefits = () => {
  return (
    <div className="space-y-8">
      {/* Main Benefits */}
      <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
          <Star className="w-6 h-6 text-yellow-500 mr-2" />
          Why Teachers Love TutionMaster
        </h3>
        
        <div className="grid gap-4">
          {teacherBenefits.map((benefit, index) => (
            <div
              key={index}
              className={`flex items-start p-4 rounded-xl border transition-all duration-200 ${benefit.bgClass}`}
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
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center shadow-lg">
          <Globe className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">50K+</div>
          <div className="text-blue-100 text-sm">Students Worldwide</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white text-center shadow-lg">
          <Clock className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">10K+</div>
          <div className="text-blue-100 text-sm">Teaching Hours</div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <h4 className="font-bold text-lg mb-3 flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Get Started in 3 Steps
        </h4>
        <ul className="space-y-2 text-blue-100">
          {quickStartSteps.map((step, index) => (
            <li key={index} className="flex items-center">
              <div className="w-6 h-6 bg-white text-blue-600 rounded-full text-sm flex items-center justify-center font-bold mr-3">
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
