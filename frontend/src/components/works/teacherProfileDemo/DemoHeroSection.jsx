import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';

const DemoHeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-brand-50 to-gold-50 py-12 sm:py-16 border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 text-center">

        {/* Icon badge */}
        <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <GraduationCap className="w-9 h-9 text-brand-600" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-4">
          Create Your Teacher Profile
        </h1>
        <p className="text-base sm:text-lg text-brand-700 max-w-2xl mx-auto">
          From signing in to becoming ready to connect with students —
          follow these simple steps.
        </p>
      </div>
    </div>
  );
};

export default DemoHeroSection;
