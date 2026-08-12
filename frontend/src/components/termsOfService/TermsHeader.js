import React from 'react';
import { BookOpen, AlertTriangle } from 'lucide-react';

const TermsHeader = () => {
  return (
    <>
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-brand-600" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Welcome to TuitionMaster. Please read these terms carefully before using our educational platform.
        </p>
        <div className="mt-6 text-sm text-brand-600 font-semibold">
          Effective date: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Important Notice Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-t-2xl">
        <div className="flex items-start sm:items-center text-white">
          <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold">Important Legal Notice</h2>
            <p className="text-brand-100 text-sm mt-1">
              By accessing TuitionMaster, you agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsHeader;
