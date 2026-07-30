import { Link } from 'react-router-dom';
import { UserCheck } from 'lucide-react';

const HeroSection = ({ onWatchDemo }) => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold text-blue-900 mb-6">
        Start Your Learning Journey in 4 Simple Steps
      </h1>
      <p className="text-xl text-blue-700 max-w-2xl mx-auto mb-8">
        Join thousands of students who have transformed their academic performance with our
        personalized tutoring approach
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/teachers"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
        >
          <UserCheck className="w-5 h-5 mr-2" />
          Find a Tutor
        </Link>
        <button
          onClick={onWatchDemo}
          className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
        >
          Watch Demo
        </button>
      </div>
    </div>
  );
};

export default HeroSection;