import React from 'react';

const CookieIntroduction = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Cookies</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Cookies are small text files stored on your device that help us provide, protect, and improve
            TuitionMaster. They enable features like secure login, personalized experiences, and platform analytics.
          </p>
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
            <h3 className="font-semibold text-brand-800 mb-2">Educational Focus</h3>
            <p className="text-brand-700 text-sm">
              Our primary use of cookies is to enhance your experience on the platform, keep you securely
              signed in, and maintain platform security.
            </p>
          </div>
        </div>
        <div className="bg-stone-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Key Benefits</h4>
          <ul className="text-gray-700 space-y-3">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-brand-500 rounded-full mr-3"></div>
              Personalized recommendations
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-brand-500 rounded-full mr-3"></div>
              Secure authentication and session management
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-brand-500 rounded-full mr-3"></div>
              Progress tracking and performance analytics
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-brand-500 rounded-full mr-3"></div>
              Platform optimization and bug detection
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CookieIntroduction;
