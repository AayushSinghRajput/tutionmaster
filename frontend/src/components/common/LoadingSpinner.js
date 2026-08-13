import PropTypes from 'prop-types';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 24, 
  text = "Loading...", 
  className = "",
  variant = "default",
  fullScreen = false 
}) => {
  const variants = {
    default: {
      spinner: "text-brand-600",
      text: "text-gray-600",
      background: ""
    },
    primary: {
      spinner: "text-white",
      text: "text-white",
      background: "bg-gradient-to-r from-brand-600 to-brand-700"
    },
    light: {
      spinner: "text-brand-500",
      text: "text-gray-500",
      background: "bg-brand-50 border border-brand-100"
    }
  };

  const currentVariant = variants[variant];

  const spinnerContent = (
    <div className={`flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl ${currentVariant.background} ${className}`}>
      <div className="relative">
        <Loader 
          size={size} 
          className={`animate-spin mb-4 ${currentVariant.spinner}`} 
        />
        {/* Optional: Add a pulsing dot in the center for more visual interest */}
        {variant === "primary" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      {text && (
        <div className="text-center">
          <span className={`text-sm font-medium ${currentVariant.text}`}>{text}</span>
          {/* Optional: Adding loading dots animation */}
          <div className="flex justify-center space-x-1 mt-2">
            <div className={`w-1 h-1 rounded-full ${currentVariant.text} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-1 h-1 rounded-full ${currentVariant.text} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-1 h-1 rounded-full ${currentVariant.text} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="transform scale-110">
          {spinnerContent}
        </div>
      </div>
    );
  }

  return spinnerContent;
};

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  text: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'light']),
  fullScreen: PropTypes.bool,
};

export default LoadingSpinner;