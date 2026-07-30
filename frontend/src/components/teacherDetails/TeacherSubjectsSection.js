import React from 'react';
import { BookOpen } from 'lucide-react';

const TeacherSubjectsSection = ({ preferredSubjects = [] }) => {
  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subjects I Teach</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {preferredSubjects.map((subject, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span className="text-gray-700 font-medium">{subject}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeacherSubjectsSection;
