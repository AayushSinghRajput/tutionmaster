import { Link } from 'react-router-dom';
import { PlayCircle, ArrowRight } from 'lucide-react';

const TeacherDemoPromo = () => {
  return (
    <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
        <PlayCircle className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-2">New to Teaching Here?</h3>
      <p className="text-white/90 text-sm mb-6">
        See a step-by-step walkthrough of how tutors create their profile and get discovered by students.
      </p>
      <Link
        to="/how-it-works/teacher-profile"
        className="inline-flex items-center justify-center w-full bg-white text-gold-700 px-5 py-3 rounded-lg font-semibold hover:bg-gold-50 transition-colors group"
      >
        See How It Works
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default TeacherDemoPromo;
