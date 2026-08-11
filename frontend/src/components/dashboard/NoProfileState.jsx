import { Link } from 'react-router-dom';
import { BookOpen, Plus, ShieldCheck } from 'lucide-react';

const NoProfileState = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300">
      <div className="max-w-md mx-auto">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Create Your Teacher Profile</h2>
        <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
          Start your teaching journey by creating a professional profile to showcase your
          expertise and attract students worldwide.
        </p>
        <Link
          to="/create-profile"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
          Create Profile
        </Link>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 flex items-center justify-center text-center">
            <ShieldCheck className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
            Verified profiles get 3x more student inquiries
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoProfileState;