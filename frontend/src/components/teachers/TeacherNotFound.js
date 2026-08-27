import { Link } from 'react-router-dom';

const TeacherNotFound = ({ customMessage }) => {
  const isUnderReview = customMessage?.toLowerCase().includes("under review");
  const title = isUnderReview ? "Profile Under Review" : "Teacher Not Found";
  const defaultMessage = "The teacher profile you're looking for doesn't exist or has been removed.";

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            {customMessage || defaultMessage}
          </p>
          <Link
            to="/teachers"
            className="btn-brand-primary w-full sm:w-auto"
          >
            Browse All Teachers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherNotFound;