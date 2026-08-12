import { BookOpen } from 'lucide-react';

const LoginBrandHeader = () => {
  return (
    <div className="text-center lg:text-left mb-6 sm:mb-8">
      <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-gradient-to-br from-brand-600 to-brand-700 p-2.5 sm:p-3 rounded-2xl shadow-lg shrink-0">
          <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
            TuitionMaster
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 -mt-1 font-medium">
            Nepal's Platform for Tutors
          </p>
        </div>
      </div>

      <div className="hidden lg:block">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Log in to manage your <span className="text-brand-600">tutor profile</span>
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Update your profile, adjust your subjects and rates, and stay reachable to
          students searching for a tutor like you.
        </p>
      </div>
    </div>
  );
};

export default LoginBrandHeader;