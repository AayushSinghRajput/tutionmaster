import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
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
  } = teacher;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Header Section */}
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <img
            src={avatarUrl || "/default-avatar.png"}
            alt={name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-stone-100 flex-shrink-0"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate max-w-full">
                {name}
              </h3>
              {teacher.isVisible && (
                <span
                  className="inline-flex items-center text-[10px] sm:text-xs font-medium text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200"
                  title="Profile reviewed and approved by TuitionMaster"
                >
                  TuitionMaster Verified
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <MapPin size={14} className="text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-600 truncate">
                {address.city}, {address.state}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="px-4 sm:px-6 pb-4 flex-1">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {bio.substring(0, 120)}...
        </p>

        {/* Subjects */}
        <div className="flex flex-wrap gap-2 mb-4">
          {preferredSubjects.slice(0, 3).map((subject, index) => (
            <span key={index} className="tag-subject">
              {subject}
            </span>
          ))}
          {preferredSubjects.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-gray-600">
              +{preferredSubjects.length - 3} more
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock size={14} />
              <span>{formatExperience(experience)}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <span>Rs {hourlyRate}/hr</span>
            </div>
            {teacher.averageRating && (
              <div className="flex items-center space-x-1 text-yellow-600">
                <span className="text-yellow-500">⭐</span>
                <span className="font-medium">{teacher.averageRating.toFixed(1)}</span>
                <span className="text-gray-500 text-xs">({teacher.totalReviews})</span>
              </div>
            )}
          </div>
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-success-100 text-success-700">
            {teachingMode}
          </span>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-4 sm:px-6 py-4 bg-stone-50 border-t border-stone-100">
        <Link
          to={`/teachers/${_id}`}
          className="btn-brand-primary w-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

TeacherCard.propTypes = {
  teacher: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    address: PropTypes.shape({
      city: PropTypes.string,
      state: PropTypes.string,
    }).isRequired,
    bio: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    hourlyRate: PropTypes.number.isRequired,
    preferredSubjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    teachingMode: PropTypes.string.isRequired,
  }).isRequired,
};

export default TeacherCard;
