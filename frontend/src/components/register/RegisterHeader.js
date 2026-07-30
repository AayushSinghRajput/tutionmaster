import React from 'react';
import { BookOpen } from 'lucide-react';

const RegisterHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center items-center mb-6">
        <div className="bg-white p-3 rounded-2xl shadow-lg">
          <BookOpen className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="ml-4 text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          TutionMaster
        </h1>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Start Your Teaching Journey
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Join our platform of dedicated educators and transform students' lives through quality education
      </p>
    </div>
  );
};

export default RegisterHeader;
