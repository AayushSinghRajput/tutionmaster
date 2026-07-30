import { BookOpen, ArrowLeft } from 'lucide-react';

const ProfilePageHeader = ({ onBack }) => {
  return (
    <div className="text-center mb-12">
      <button
        onClick={onBack}
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
          <BookOpen className="h-8 w-8 text-blue-600" />
        </div>
        <div className="text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create Your Teacher Profile
          </h1>
          <p className="text-xl text-gray-600">
            Build your professional presence and start teaching
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageHeader;