import React from 'react';
import { BookOpen } from 'lucide-react';

const RegisterHeader = () => {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <div className="flex justify-center items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-lg shrink-0">
          <BookOpen className="w-7 h-7 sm:w-10 sm:h-10 text-brand-600" />
        </div>
        <h1 className="sm:ml-4 text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
          TuitionMaster
        </h1>
      </div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
        Create Your Tutor Profile
      </h2>
      <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
        Create a profile once, and let students across Nepal find and contact you directly
      </p>
    </div>
  );
};

export default RegisterHeader;
