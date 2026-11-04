import { Link } from 'react-router-dom';
import { Search, UserPlus } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-6">
        How TuitionMaster Works
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-brand-700 max-w-3xl mx-auto mb-4 leading-relaxed">
        A transparent, merit-driven marketplace designed specifically for Nepal's educational ecosystem. We connect motivated students with experienced home and online tutors without broker commissions or non-transparent middleman agencies.
      </p>
      <p className="text-sm sm:text-base text-brand-600 max-w-2xl mx-auto mb-8 leading-relaxed">
        From primary school foundational mastery to intensive SEE, +2 board exam revisions, and university entrance coaching, learn how our streamlined platform simplifies your search.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/teachers"
          className="w-full sm:w-auto bg-brand-600 text-white px-6 sm:px-8 py-3.5 rounded-xl font-bold hover:bg-brand-700 transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
        >
          <Search className="w-5 h-5 mr-2" />
          Find a Verified Tutor
        </Link>
        <Link
          to="/register"
          className="w-full sm:w-auto border-2 border-brand-600 text-brand-600 px-6 sm:px-8 py-3.5 rounded-xl font-bold hover:bg-brand-50 transition-colors flex items-center justify-center"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Join as an Educator
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
