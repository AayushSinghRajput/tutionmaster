import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Eye, EyeOff, CheckCircle2, AlertTriangle, ArrowLeft, Key } from 'lucide-react';
import { toast } from 'react-toastify';
import { authService } from '../services/authSerive';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch('password', '');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await authService.resetPassword(token, data.password);
      setIsResetSuccess(true);
      toast.success(response.data?.message || 'Password reset successfully!');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 3000);
    } catch (err) {
      const message = err.response?.data?.error || 'Password reset failed. The link may have expired.';
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-stone-50 via-white to-brand-50 pt-3.5 sm:pt-5 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-brand-100/50">
          
          {/* Header Icon */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-200/60 shadow-inner">
              <Key className="w-7 h-7 text-brand-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {isResetSuccess ? 'Password Reset Complete' : 'Set New Password'}
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              {isResetSuccess
                ? 'Your password has been successfully updated.'
                : 'Please choose a strong password for your TuitionMaster account.'}
            </p>
          </div>

          {/* Success State */}
          {isResetSuccess ? (
            <div className="space-y-6 text-center">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-emerald-800 text-sm flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                <p className="font-semibold text-base">All Set!</p>
                <p className="text-emerald-700 text-xs leading-relaxed">
                  Redirecting to the login page in a few seconds...
                </p>
              </div>

              <Link
                to="/login"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold shadow-lg shadow-brand-500/20 text-center text-sm flex items-center justify-center gap-2 transition-all"
              >
                Sign In Now
              </Link>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-sm flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">Reset Failed</p>
                    <p className="text-red-700 text-xs mt-1 leading-relaxed">
                      {errorMessage}
                    </p>
                    <div className="mt-3">
                      <Link
                        to="/forgot-password"
                        className="text-xs font-semibold text-red-800 underline hover:text-red-900"
                      >
                        Request a new reset link &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* New Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  New Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-brand-600">
                    <Lock
                      size={20}
                      className="text-gray-400 group-focus-within:text-brand-500"
                    />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter new password"
                    className={`w-full pl-12 pr-12 py-3 sm:py-3.5 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 text-sm sm:text-base ${
                      errors.password
                        ? 'border-red-400 bg-red-25 focus:ring-red-200'
                        : 'border-gray-200 hover:border-brand-300 group-focus-within:border-brand-400'
                    }`}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-brand-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm font-medium flex items-center gap-2 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Password Requirements helper */}
              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs text-stone-600 space-y-1">
                <p className="font-semibold text-stone-700">Password Checklist:</p>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${passwordValue.length >= 6 ? 'bg-emerald-500' : 'bg-stone-400'}`}></span>
                  <span className={passwordValue.length >= 6 ? 'text-emerald-700 font-medium' : 'text-stone-500'}>
                    At least 6 characters
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold shadow-lg shadow-brand-500/25 focus:outline-none focus:ring-4 focus:ring-brand-200 focus:ring-offset-2 transform hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size={20} text="" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <span>Reset Password</span>
                )}
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-600 font-medium transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Log In
                </Link>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
