import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus } from 'lucide-react';
import LoginForm from '../auth/LoginForm';

const LoginCard = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-brand-100/50 transform transition-all duration-500 hover:shadow-brand-100/50">
      <LoginForm />

      <div className="mt-6 sm:mt-8 pt-5 border-t border-stone-200/80">
        <div className="bg-gradient-to-br from-stone-50 via-white to-brand-50/40 border border-brand-100/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-all duration-300 hover:border-brand-300 hover:shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 text-brand-600">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">New to TuitionMaster?</p>
              <p className="text-sm font-bold text-gray-900">Create your tutor profile</p>
            </div>
          </div>

          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-500/20 hover:shadow-lg transition-all duration-200 group shrink-0"
          >
            <span>Register Now</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;