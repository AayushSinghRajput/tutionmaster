import React from 'react';
import { Cookie, Eye } from 'lucide-react';

const CookieHeader = () => {
  return (
    <>
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-100 rounded-full flex items-center justify-center">
            <Cookie className="w-8 h-8 sm:w-10 sm:h-10 text-brand-600" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Learn how TuitionMaster uses cookies to enhance your experience and protect your privacy.
        </p>
        <div className="mt-6 text-sm text-brand-600 font-semibold">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Quick Summary Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-start sm:items-center text-white">
          <Eye className="w-6 h-6 mr-3 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold">Transparent Cookie Usage</h2>
            <p className="text-brand-100 text-sm mt-1">
              We believe in clear communication about how we use cookies to improve your experience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieHeader;
