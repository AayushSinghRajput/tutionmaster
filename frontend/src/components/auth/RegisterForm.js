import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';
import GoogleAuthButton from './GoogleAuthButton';
import { Eye, EyeOff, Mail, Lock, UserPlus, User } from 'lucide-react';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student');
  const { register: registerUser } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await registerUser(data.username, data.email, data.password, role);
    setIsLoading(false);

    if (result.success) {
      toast.success('Registration successful! Welcome to TuitionMaster!');
    } else {
      toast.error(result.error);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="w-full">
      <div className="text-center mb-4 sm:mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Join TuitionMaster</h2>
        <p className="mt-1 text-xs sm:text-sm text-gray-600">
          {role === 'teacher' 
            ? 'Create your tutor profile and start hearing from students'
            : 'Join as a student to find your perfect tutor'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <label className={`flex items-center justify-center p-2.5 sm:p-3 border rounded-xl cursor-pointer transition-all duration-200 ${role === 'student' ? 'border-brand-500 bg-brand-50 shadow-sm ring-1 ring-brand-500/20' : 'border-gray-200 hover:border-gray-300'}`}>
          <input
            type="radio"
            name="role"
            value="student"
            checked={role === 'student'}
            onChange={(e) => setRole(e.target.value)}
            className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-gray-300"
          />
          <span className={`ml-2.5 text-xs sm:text-sm font-semibold ${role === 'student' ? 'text-brand-700' : 'text-gray-700'}`}>I am a Student</span>
        </label>
        
        <label className={`flex items-center justify-center p-2.5 sm:p-3 border rounded-xl cursor-pointer transition-all duration-200 ${role === 'teacher' ? 'border-brand-500 bg-brand-50 shadow-sm ring-1 ring-brand-500/20' : 'border-gray-200 hover:border-gray-300'}`}>
          <input
            type="radio"
            name="role"
            value="teacher"
            checked={role === 'teacher'}
            onChange={(e) => setRole(e.target.value)}
            className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-gray-300"
          />
          <span className={`ml-2.5 text-xs sm:text-sm font-semibold ${role === 'teacher' ? 'text-brand-700' : 'text-gray-700'}`}>I am a Teacher</span>
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-3.5">
        <div className="space-y-1">
          <label htmlFor="username" className="block text-xs font-semibold text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="username"
              className={`block w-full pl-9 pr-3 py-2 sm:py-2.5 text-sm border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 ${
                errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="Enter your full name"
              {...register('username', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                },
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: 'Name can only contain letters and spaces'
                }
              })}
            />
          </div>
          {errors.username && (
            <span className="text-xs text-red-600 flex items-center mt-0.5">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-xs font-semibold text-gray-700">
             Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              className={`block w-full pl-9 pr-3 py-2 sm:py-2.5 text-sm border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="your@email.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Please enter a valid email address'
                }
              })}
            />
          </div>
          {errors.email && (
            <span className="text-xs text-red-600 flex items-center mt-0.5">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-xs font-semibold text-gray-700">
             Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`block w-full pl-9 pr-10 py-2 sm:py-2.5 text-sm border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 ${
                errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="Minimum 6 characters"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-brand-600 transition-colors" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-brand-600 transition-colors" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-600 flex items-center mt-0.5">
              {errors.password.message}
            </span>
          )}
        </div>

        <p className="text-[11px] sm:text-xs text-center text-gray-500 py-0.5">
          By registering, you agree to our <a href="/terms-of-service" className="text-brand-600 font-medium underline">Terms</a> & <a href="/privacy-policy" className="text-brand-600 font-medium underline">Privacy Policy</a>
        </p>

        <button
          type="submit"
          className="w-full flex justify-center items-center py-2.5 sm:py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner size={18} text="Creating Account..." />
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              {role === 'teacher' ? 'Create Your Tutor Profile' : 'Create Student Account'}
            </>
          )}
        </button>
      </form>

      {/* Google Sign-Up */}
      <div className="mt-3.5 sm:mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-500 font-medium">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-2.5">
          <GoogleAuthButton role={role} />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;