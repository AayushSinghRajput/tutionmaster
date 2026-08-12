import { BookOpen, ArrowLeft } from 'lucide-react';

const ProfilePageHeader = ({ onBack }) => {
  return (
    <div className="text-center mb-8 sm:mb-12 px-2">
      <button
        onClick={onBack}
        className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 mb-4 sm:mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-3 sm:gap-0">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-100 rounded-2xl flex items-center justify-center sm:mr-4 shrink-0">
          <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-brand-600" />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mb-1 sm:mb-2">
            Create Your Teacher Profile
          </h1>
          <p className="text-base sm:text-xl text-gray-600">
            Build your professional presence and start teaching
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageHeader;