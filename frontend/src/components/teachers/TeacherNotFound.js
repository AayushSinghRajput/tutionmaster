import { Link } from 'react-router-dom';

const TeacherNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Teacher Not Found</h1>
          <p className="text-gray-600 mb-6">
            The teacher profile you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/teachers"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Teachers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherNotFound;