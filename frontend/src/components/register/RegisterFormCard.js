import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LogIn } from 'lucide-react';
import RegisterForm from '../auth/RegisterForm';

const RegisterFormCard = () => {
  return (
    <div className="w-full max-w-md mx-auto lg:max-w-full bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-brand-100/50 p-5 sm:p-7">
      <RegisterForm />

      <div className="mt-5 pt-4 border-t border-stone-200/80">
        <div className="bg-gradient-to-br from-stone-50 via-white to-brand-50/40 border border-brand-100/80 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-all duration-300 hover:border-brand-300 hover:shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 text-brand-600">
              <LogIn className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider truncate">Already registered?</p>
              <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">Sign in to your account</p>
            </div>
          </div>

          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-1 px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-lg shadow-sm shadow-brand-500/20 hover:shadow transition-all duration-200 group shrink-0"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormCard;
