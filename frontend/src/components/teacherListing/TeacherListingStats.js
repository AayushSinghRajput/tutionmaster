import React from 'react';
import { listingStats } from '../../constants/teacherListing/teacherListingData';

const TeacherListingStats = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {listingStats.map((stat, index) => (
          <div
            key={index}
            className={`${
              index < listingStats.length - 1
                ? 'border-r border-blue-100 pr-6'
                : ''
            }`}
          >
            <div className="text-2xl font-bold text-blue-600">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherListingStats;
