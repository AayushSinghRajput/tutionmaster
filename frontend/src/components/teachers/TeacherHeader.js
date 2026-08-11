import { MapPin, Clock, BookOpen, Star } from 'lucide-react';
import { formatExperience } from '../../utils/helpers';

const TeacherHeader = ({ teacher }) => {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row items-center md:items-center text-center md:text-left space-y-4 sm:space-y-6 md:space-y-0 md:space-x-6">
          <img
            src={teacher.avatarUrl || '/default-avatar.png'}
            alt={teacher.name}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 break-words">{teacher.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 text-sm sm:text-base">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
                <span>{teacher.address.city}, {teacher.address.state}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
                <span>{formatExperience(teacher.experience)} experience</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span>Rs {teacher.hourlyRate}/hour</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
                <span>{teacher.teachingMode}</span>
              </div>
              {teacher.averageRating && (
                <div className="flex items-center text-yellow-600">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 fill-current shrink-0" />
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

export default TeacherHeader;