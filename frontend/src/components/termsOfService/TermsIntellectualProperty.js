import React from 'react';
import { GraduationCap } from 'lucide-react';

const TermsIntellectualProperty = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
        3. Educational Content & Intellectual Property
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 text-lg">User-Generated Content</h4>
          <ul className="text-gray-700 space-y-3">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>You retain ownership of educational materials you create</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Grant TutionMaster license to display and distribute your content</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Ensure all content complies with copyright laws</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 text-lg">Platform Content</h4>
          <ul className="text-gray-700 space-y-3">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>TutionMaster owns platform software and infrastructure</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Licensed educational content is subject to separate agreements</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Unauthorized distribution of platform content is prohibited</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TermsIntellectualProperty;
