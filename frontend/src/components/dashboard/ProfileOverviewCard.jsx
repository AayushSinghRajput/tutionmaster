import { Link } from 'react-router-dom';
import { Eye, Edit } from 'lucide-react';

const ProfileOverviewCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-stone-200">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-gray-900 mb-2 sm:mb-0">Profile Overview</h2>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex items-start space-x-4 min-w-0">
            <img
              src={profile.avatarUrl || '/default-avatar.png'}
              alt={profile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">{profile.name}</h3>
              <p className="text-gray-600 mt-1 break-words">
                {profile.address.city}, {profile.address.state}
              </p>
              <p className="text-gray-600">{profile.experience} years of experience</p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Teaching Mode</h4>
              <p className="text-gray-600">{profile.teachingMode}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {profile.preferredSubjects.map((subject, index) => (
                  <span
                    key={index}
                    className="tag-subject"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Bio</h4>
              <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverviewCard;