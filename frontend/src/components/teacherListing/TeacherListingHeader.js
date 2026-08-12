import React from 'react';

const TeacherListingHeader = () => {
  return (
    <div className="text-center mb-8 sm:mb-12 px-2">
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl mb-4 sm:mb-6 shadow-lg">
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9 5m9-5v9"
          />
        </svg>
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
        Discover Expert Educators
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Connect with qualified tutors who inspire and transform learning
        experiences
      </p>
    </div>
  );
};

export default TeacherListingHeader;
