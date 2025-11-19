import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ size = 24, text = "Loading...", className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <Loader 
        size={size} 
        className="animate-spin text-blue-600 mb-4" 
      />
      {text && (
        <span className="text-gray-600 text-sm font-medium">{text}</span>
      )}
    </div>
  );
};

export default LoadingSpinner;