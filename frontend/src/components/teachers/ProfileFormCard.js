import { Star, BookOpen } from 'lucide-react';
import TeacherForm from './TeacherForm';

const ProfileFormCard = ({ onSubmit, onCancel }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Star className="w-6 h-6 mr-3" />
          Profile Information
        </h2>
        <p className="text-blue-100 mt-2">
          Complete all sections to create an engaging teacher profile
        </p>
      </div>

      <div className="p-8">
        <TeacherForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          submitButtonText={
            <div className="flex items-center justify-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Create Professional Profile
            </div>
          }
          cancelButtonText="Cancel"
        />
      </div>
    </div>
  );
};

export default ProfileFormCard;