import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import { BookOpen, Users, Calendar, DollarSign } from 'lucide-react';

const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <BookOpen className="mx-auto h-12 w-12 text-blue-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">
              Join TutionMaster
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Create your teacher account and start connecting with students
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Registration Form */}
            <div className="bg-white py-8 px-6 shadow sm:rounded-lg">
              <RegisterForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white py-8 px-6 shadow sm:rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Why join as a teacher?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Reach thousands of students</span>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Flexible teaching schedule</span>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Build your teaching brand</span>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Set your own rates</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Get Started Quickly</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Create your profile in minutes</li>
                  <li>• Set your availability and rates</li>
                  <li>• Start receiving student inquiries</li>
                  <li>• Grow your teaching business</li>
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