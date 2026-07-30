import React from 'react';
import { MapPin, Clock, BookOpen, Star } from 'lucide-react';
import { formatExperience } from '../../utils/helpers';

const TeacherDetailsHeader = ({ teacher }) => {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
          <img 
            src={teacher.avatarUrl || '/default-avatar.png'} 
            alt={teacher.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{teacher.name}</h1>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{teacher.address?.city}, {teacher.address?.state}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{formatExperience(teacher.experience)} experience</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span>Rs {teacher.hourlyRate}/hour</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>{teacher.teachingMode}</span>
              </div>
              {teacher.averageRating && (
                <div className="flex items-center text-yellow-600">
                  <Star className="w-5 h-5 mr-2 fill-current" />
                  <span>{teacher.averageRating} Rating</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherDetailsHeader;
