import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, ArrowLeft, CheckCircle2, KeyRound, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import { authService } from '../services/authSerive';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(data.email);
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast.success(response.data.message || 'Reset link sent successfully!');
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to send reset link. Please try again.';
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
              <KeyRound className="w-7 h-7 text-brand-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {isSubmitted ? 'Check Your Email' : 'Forgot Password?'}
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              {isSubmitted
                ? `We've sent a password reset link to`
                : 'Enter your registered email address and we will send you a link to reset your password.'}
            </p>
            {isSubmitted && (
              <p className="text-sm font-semibold text-brand-700 mt-1 break-all bg-brand-50/80 py-1 px-3 rounded-lg border border-brand-100 inline-block">
                {submittedEmail}
              </p>
            )}
          </div>

          {/* Success State */}
          {isSubmitted ? (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Reset link dispatched!</p>
                  <p className="text-emerald-700 text-xs mt-1 leading-relaxed">
                    Please check your inbox (and spam folder). The link is active for <strong>15 minutes</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-xs text-stone-600 space-y-2">
                <div className="flex items-center gap-2 font-medium text-stone-700">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  <span>Didn't receive the email?</span>
                </div>
                <p>
                  Make sure you entered the correct email associated with your TuitionMaster account, or check your spam / junk directory.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-3 px-4 rounded-xl border-2 border-brand-200 text-brand-700 font-semibold hover:bg-brand-50/50 hover:border-brand-300 transition-colors text-sm"
                >
                  Try another email
                </button>

                <Link
                  to="/login"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold shadow-lg shadow-brand-500/20 text-center text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <ArrowLeft size={16} />
                  Back to Log In
                </Link>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-brand-600">
                    <Mail
                      size={20}
                      className="text-gray-400 group-focus-within:text-brand-500"
                    />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    autoFocus
                    className={`w-full pl-12 pr-4 py-3 sm:py-3.5 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 text-sm sm:text-base ${
                      errors.email
                        ? 'border-red-400 bg-red-25 focus:ring-red-200'
                        : 'border-gray-200 hover:border-brand-300 group-focus-within:border-brand-400'
                    }`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm font-medium flex items-center gap-2 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold shadow-lg shadow-brand-500/25 focus:outline-none focus:ring-4 focus:ring-brand-200 focus:ring-offset-2 transform hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size={20} text="" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <span>Send Reset Link</span>
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

export default ForgotPassword;
