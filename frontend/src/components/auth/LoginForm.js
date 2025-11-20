import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';
import { Eye, EyeOff, Mail, Lock, LogIn, BookOpen } from 'lucide-react';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await login(data.email, data.password);
    setIsLoading(false);

    if (result.success) {
      toast.success('🎉 Welcome back! Redirecting to your dashboard...', {
        position: "top-center",
        theme: "colored",
        className: "bg-blue-600"
      });
    } else {
      toast.error(result.error || 'Login failed. Please try again.', {
        position: "top-center"
      });
    }
  };

  const fillDemoCredentials = (role) => {
    if (role === 'teacher') {
      document.getElementById('email').value = 'teacher@demo.com';
      document.getElementById('password').value = 'demo123';
    } 
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
          <LogIn className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Continue your educational journey with us</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-3">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-blue-600">
              <Mail size={20} className="text-gray-400 group-focus-within:text-blue-500" />
            </div>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                errors.email 
                  ? 'border-red-400 bg-red-25 focus:ring-red-200' 
                  : 'border-gray-200 hover:border-blue-300 group-focus-within:border-blue-400'
              }`}
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
            <p className="text-red-600 text-sm font-medium flex items-center gap-2 animate-pulse">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Forgot password?
            </a>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-blue-600">
              <Lock size={20} className="text-gray-400 group-focus-within:text-blue-500" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                errors.password 
                  ? 'border-red-400 bg-red-25 focus:ring-red-200' 
                  : 'border-gray-200 hover:border-blue-300 group-focus-within:border-blue-400'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm font-medium flex items-center gap-2 animate-pulse">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition duration-200"
          />
          <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 font-medium">
            Keep me signed in
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-3 group"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size={20} text="" />
              <span className="animate-pulse">Signing In...</span>
            </>
          ) : (
            <>
              <LogIn size={20} className="group-hover:scale-110 transition-transform duration-200" />
              <span>Sign In to Continue</span>
            </>
          )}
        </button>
      </form>

      {/* Demo Access */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">Quick Demo Access</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 gap-3">
          <button
            onClick={() => fillDemoCredentials('teacher')}
            className="flex items-center justify-center gap-3 px-4 py-3 border-2 border-blue-200 rounded-xl text-blue-700 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
          >
            <BookOpen size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-semibold text-sm">Teacher</div>
              <div className="text-xs text-gray-500">Demo account</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;