import React from 'react';
import { prohibitedActivities } from '../../constants/termsOfService/termsData';

const TermsProhibitedActivities = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Prohibited Activities</h2>

      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-red-800 mb-3">Zero Tolerance Policy</h3>
        <p className="text-red-700 text-sm">
          The following activities will result in immediate account termination and may lead to legal action.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {prohibitedActivities.map((activity, index) => (
          <div key={index} className="flex items-center p-3 bg-stone-50 rounded-lg">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-red-600 font-semibold text-xs">!</span>
            </div>
            <span className="text-gray-700 text-sm ml-3">{activity}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TermsProhibitedActivities;
