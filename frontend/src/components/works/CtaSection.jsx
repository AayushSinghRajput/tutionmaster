import { Link } from 'react-router-dom';
import { Search, UserPlus, ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <div className="bg-gradient-to-r from-brand-600 to-brand-800 text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 rounded-2xl p-6 sm:p-8 text-center backdrop-blur-sm border border-white/20">
            <Search className="w-8 h-8 mx-auto mb-4 text-white" />
            <h3 className="text-xl font-serif font-bold mb-2">Ready to find the right tutor?</h3>
            <p className="text-brand-100 text-sm mb-6">
              Browse tutor profiles and connect with the one that fits your needs.
            </p>
            <Link
              to="/teachers"
              className="w-full inline-flex items-center justify-center bg-white text-brand-600 px-6 py-3 rounded-lg font-medium hover:bg-brand-50 transition-colors group"
            >
              Find a Tutor
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 sm:p-8 text-center backdrop-blur-sm border border-white/20">
            <UserPlus className="w-8 h-8 mx-auto mb-4 text-white" />
            <h3 className="text-xl font-serif font-bold mb-2">Ready to start teaching?</h3>
            <p className="text-brand-100 text-sm mb-6">
              Create your tutor profile and get discovered by students.
            </p>
            <Link
              to="/register"
              className="w-full inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-brand-600 transition-colors group"
            >
              Create Your Tutor Profile
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
