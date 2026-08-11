import React from 'react';
import {
  CookieHeader,
  CookieIntroduction,
  CookieCategories,
  CookieManagement,
  CookieSupportNotice
} from '../components/cookiePolicy';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CookieHeader />
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <CookieIntroduction />
            <CookieCategories />
            <CookieManagement />
            <CookieSupportNotice />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;