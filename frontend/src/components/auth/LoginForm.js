import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import LoadingSpinner from "../common/LoadingSpinner";
import GoogleAuthButton from "./GoogleAuthButton";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await login(data.email, data.password);
    setIsLoading(false);

    if (result.success) {
      toast.success("Logged In Successfully...", {
        position: "top-right",
        theme: "colored",
        className: "bg-brand-600",
      });
    } else {
      toast.error(result.error || "Login failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Log in to manage your tutor profile
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
        {/* Email Field */}
        <div className="space-y-3">
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
              className={`w-full pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 ${
                errors.email
                  ? "border-red-400 bg-red-25 focus:ring-red-200"
                  : "border-gray-200 hover:border-brand-300 group-focus-within:border-brand-400"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please enter a valid email address",
                },
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
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-brand-600">
              <Lock
                size={20}
                className="text-gray-400 group-focus-within:text-brand-500"
              />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className={`w-full pl-12 pr-12 py-3 sm:py-4 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 ${
                errors.password
                  ? "border-red-400 bg-red-25 focus:ring-red-200"
                  : "border-gray-200 hover:border-brand-300 group-focus-within:border-brand-400"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-brand-600 transition-colors duration-200"
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
            className="h-5 w-5 text-brand-600 focus:ring-brand-500 border-gray-300 rounded transition duration-200"
          />
          <label
            htmlFor="remember-me"
            className="ml-3 block text-sm text-gray-700 font-medium"
          >
            Keep me signed in
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold shadow-lg shadow-brand-500/25 focus:outline-none focus:ring-4 focus:ring-brand-200 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-3 group"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size={20} text="" />
              <span className="animate-pulse">Signing In...</span>
            </>
          ) : (
            <>
              <LogIn
                size={20}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              <span>Sign In to Continue</span>
            </>
          )}
        </button>
      </form>

      {/* Google Sign-In */}
      <div className="mt-6 sm:mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-4">
          <GoogleAuthButton />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
