import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import { BookOpen, Users, Calendar, DollarSign, Star, Shield, Clock, Globe } from 'lucide-react';

const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-white p-3 rounded-2xl shadow-lg">
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="ml-4 text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                TutionMaster
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Your Teaching Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join our platform of dedicated educators and transform students' lives through quality education
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Registration Form Card */}
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

            {/* Benefits Section */}
            <div className="space-y-8">
              {/* Main Benefits */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-500 mr-2" />
                  Why Teachers Love TutionMaster
                </h3>
                
                <div className="grid gap-4">
                  <div className="flex items-start p-4 bg-blue-50 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-200">
                    <Users className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Global Student Reach</h4>
                      <p className="text-gray-600 text-sm mt-1">Connect with thousands of students worldwide</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-green-50 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-200">
                    <Calendar className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Flexible Schedule</h4>
                      <p className="text-gray-600 text-sm mt-1">Teach on your own terms and availability</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-purple-50 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-200">
                    <DollarSign className="w-6 h-6 text-purple-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Competitive Earnings</h4>
                      <p className="text-gray-600 text-sm mt-1">Set your rates and maximize your income</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-orange-50 rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-200">
                    <Shield className="w-6 h-6 text-orange-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Secure Platform</h4>
                      <p className="text-gray-600 text-sm mt-1">Safe and reliable payment processing</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats & Additional Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center shadow-lg">
                  <Globe className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-blue-100 text-sm">Students Worldwide</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white text-center shadow-lg">
                  <Clock className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-blue-100 text-sm">Teaching Hours</div>
                </div>
              </div>

              {/* Quick Start Guide */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                <h4 className="font-bold text-lg mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Get Started in 3 Steps
                </h4>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-center">
                    <div className="w-6 h-6 bg-white text-blue-600 rounded-full text-sm flex items-center justify-center font-bold mr-3">1</div>
                    Create your profile
                  </li>
                  <li className="flex items-center">
                    <div className="w-6 h-6 bg-white text-blue-600 rounded-full text-sm flex items-center justify-center font-bold mr-3">2</div>
                    Set your availability
                  </li>
                  <li className="flex items-center">
                    <div className="w-6 h-6 bg-white text-blue-600 rounded-full text-sm flex items-center justify-center font-bold mr-3">3</div>
                    Start teaching
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;