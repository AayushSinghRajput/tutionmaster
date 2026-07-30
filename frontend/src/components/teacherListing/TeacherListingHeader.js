import React from 'react';

const TeacherListingHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-6 shadow-lg">
        <svg
          className="w-10 h-10 text-white"
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
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
        Discover Expert Educators
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Connect with qualified tutors who inspire and transform learning
        experiences
      </p>
    </div>
  );
};

export default TeacherListingHeader;
