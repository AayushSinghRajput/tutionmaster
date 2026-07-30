import { User, IndianRupee, BookOpen } from 'lucide-react';
import { formatExperience } from '../../utils/helpers';

const TeachingDetailsCard = ({ teacher }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Teaching Details</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <div>
            <div className="font-medium text-gray-900">Experience</div>
            <div className="text-gray-600">{formatExperience(teacher.experience)}</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <IndianRupee className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <div>
            <div className="font-medium text-gray-900">Hourly Rate</div>
            <div className="text-gray-600">Rs {teacher.hourlyRate}</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <BookOpen className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <div>
            <div className="font-medium text-gray-900">Teaching Mode</div>
            <div className="text-gray-600">{teacher.teachingMode}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingDetailsCard;