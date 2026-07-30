import React from 'react';
import { BookOpen, AlertTriangle } from 'lucide-react';

const TermsHeader = () => {
  return (
    <>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Welcome to TutionMaster. Please read these terms carefully before using our educational platform.
        </p>
        <div className="mt-6 text-sm text-blue-600 font-semibold">
          Effective date: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Important Notice Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 rounded-t-2xl">
        <div className="flex items-center text-white">
          <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold">Important Legal Notice</h2>
            <p className="text-blue-100 text-sm mt-1">
              By accessing TutionMaster, you agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsHeader;
