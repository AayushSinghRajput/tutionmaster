import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import { BookOpen, GraduationCap } from 'lucide-react';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="bg-blue-500 p-3 rounded-xl shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                TutionMaster
              </h1>
              <p className="text-sm text-gray-500 -mt-1">Learn without limits</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your TutionMaster account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 transform transition-all duration-300 hover:shadow-2xl">
          <LoginForm />

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Quick access</span>
            </div>
          </div>

          {/* Demo Access */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                // Auto-fill demo teacher credentials
                document.getElementById('email').value = 'teacher@demo.com';
                document.getElementById('password').value = 'demo123';
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors text-sm"
            >
              <GraduationCap size={16} />
              Teacher Demo
            </button>
            <button
              onClick={() => {
                // Auto-fill demo student credentials
                document.getElementById('email').value = 'student@demo.com';
                document.getElementById('password').value = 'demo123';
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors text-sm"
            >
              <BookOpen size={16} />
              Student Demo
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors underline underline-offset-2"
            >
              Create account
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link
              to="/forgot-password"
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;