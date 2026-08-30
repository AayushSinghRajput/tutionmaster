import { Link } from 'react-router-dom';
import { Search, UserPlus } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-6">
        How TuitionMaster Works
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-brand-700 max-w-2xl mx-auto mb-8">
        A smarter and simpler way for students to find the right tutor and for tutors to connect
        with students.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/teachers"
          className="w-full sm:w-auto bg-brand-600 text-white px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors flex items-center justify-center"
        >
          <Search className="w-5 h-5 mr-2" />
          Find a Tutor
        </Link>
        <Link
          to="/register"
          className="w-full sm:w-auto border-2 border-brand-600 text-brand-600 px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-brand-50 transition-colors flex items-center justify-center"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Become a Tutor
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
