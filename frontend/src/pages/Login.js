import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import { BookOpen, GraduationCap, Users, Star, Shield, Clock, Award } from 'lucide-react';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-25 via-white to-indigo-25 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-full">
            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-2xl shadow-lg">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    TutionMaster
                  </h1>
                  <p className="text-sm text-gray-500 -mt-1 font-medium">Empowering Educators & Students</p>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Continue Your <span className="text-blue-600">Learning Journey</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Access your personalized dashboard, connect with your community, and continue making progress in your educational goals.
                </p>
              </div>
            </div>

            {/* Login Card */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-blue-100/50 transform transition-all duration-500 hover:shadow-blue-100/50">
              <LoginForm />

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  New to TutionMaster?{' '}
                  <Link
                    to="/register"
                    className="text-blue-600 font-bold hover:text-blue-700 transition-colors duration-200 underline underline-offset-4 hover:underline-offset-2"
                  >
                    Create your account
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Features & Benefits */}
          <div className="hidden lg:block space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Users className="w-8 h-8 mx-auto mb-3" />
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-blue-100 text-sm font-medium">Active Users</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Award className="w-8 h-8 mx-auto mb-3" />
                <div className="text-2xl font-bold">1K+</div>
                <div className="text-blue-100 text-sm font-medium">Expert Tutors</div>
              </div>
            </div>

            {/* Features List */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-500" />
                Why Learn With Us?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-200 group">
                  <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure & Trusted</h4>
                    <p className="text-gray-600 text-sm mt-1">Your data and privacy are our top priority</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-200 group">
                  <Clock className="w-6 h-6 text-green-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">24/7 Access</h4>
                    <p className="text-gray-600 text-sm mt-1">Learn anytime, anywhere at your own pace</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-200 group">
                  <GraduationCap className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Expert Educators</h4>
                    <p className="text-gray-600 text-sm mt-1">Learn from qualified and experienced teachers</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-200 group">
                  <BookOpen className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Quality Content</h4>
                    <p className="text-gray-600 text-sm mt-1">Curriculum designed by education experts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-300" />
                  </div>
                </div>
                <div>
                  <p className="italic text-blue-100">
                    "TutionMaster transformed how I teach. The platform is intuitive and my students love the interactive features!"
                  </p>
                  <p className="font-semibold mt-3">- Aayush Singh Rajput, Math Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;