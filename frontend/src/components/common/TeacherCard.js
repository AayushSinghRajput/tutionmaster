import { Link } from "react-router-dom";
import { MapPin, Clock, Star } from "lucide-react";
import { formatExperience } from "../../utils/helpers";

const TeacherCard = ({ teacher }) => {
  const {
    _id,
    name,
    avatarUrl,
    address,
    bio,
    experience,
    hourlyRate,
    preferredSubjects,
    teachingMode,
    averageRating,
  } = teacher;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-start space-x-4">
          <img
            src={avatarUrl || "/default-avatar.png"}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {name}
            </h3>
            <div className="flex items-center space-x-1 mt-1">
              <MapPin size={14} className="text-gray-500" />
              <span className="text-sm text-gray-600">
                {address.city}, {address.state}
              </span>
            </div>
            {averageRating && (
              <div className="flex items-center space-x-1 mt-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm text-gray-700 font-medium">
                  {averageRating}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="px-6 pb-4 flex-1">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {bio.substring(0, 120)}...
        </p>

        {/* Subjects */}
        <div className="flex flex-wrap gap-2 mb-4">
          {preferredSubjects.slice(0, 3).map((subject, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {subject}
            </span>
          ))}
          {preferredSubjects.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{preferredSubjects.length - 3} more
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock size={14} />
              <span>{formatExperience(experience)}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <span>Rs {hourlyRate}/hr</span>
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
            {teachingMode}
          </span>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <Link
          to={`/teachers/${_id}`}
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default TeacherCard;
