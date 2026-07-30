import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../auth/RegisterForm';

const RegisterFormCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <h3 className="text-2xl font-bold text-white text-center">
          Get Started Today
        </h3>
        <p className="text-blue-100 text-center mt-2">
          Create your teacher account in 2 minutes
        </p>
      </div>
      <div className="p-8">
        <RegisterForm />

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 underline"
            >
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormCard;
