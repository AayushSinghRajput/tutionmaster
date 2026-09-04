import { useState } from 'react';
import { MapPin, Clock, BookOpen, Share2 } from 'lucide-react';
import { formatExperience } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import ShareModal from './ShareModal';

const TeacherHeader = ({ teacher }) => {
  const { user } = useAuth();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Strict ownership check: Only show share trigger to the owner of this profile
  const teacherUserIdStr = teacher.userId?._id ? teacher.userId._id.toString() : teacher.userId?.toString();
  const currentUserIdStr = user?.id?.toString() || user?._id?.toString();
  const isOwner = Boolean(
    user && 
    (currentUserIdStr === teacherUserIdStr || user.teacherId?.toString() === teacher._id?.toString())
  );

  const publicShareUrl = `${window.location.origin}/teachers/${teacher._id}`;

  return (
    <section className="bg-white border-b border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row items-center md:items-center text-center md:text-left space-y-4 sm:space-y-6 md:space-y-0 md:space-x-6">
          {teacher.avatarUrl && !teacher.avatarUrl.includes('sample.jpg') ? (
            <img
              src={teacher.avatarUrl}
              alt={teacher.name}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg shrink-0"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-serif font-bold text-2xl sm:text-3xl border-4 border-white shadow-lg shrink-0">
              {teacher.name ? teacher.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 mb-3 sm:mb-4">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 break-words">{teacher.name}</h1>
              {teacher.isVisible && (
                <span
                  className="inline-flex items-center text-xs sm:text-sm font-medium text-brand-700 bg-brand-50 px-2 py-1 rounded-md border border-brand-200"
                  title="Profile reviewed and approved by TuitionMaster"
                >
                  TuitionMaster Verified
                </span>
              )}

              {/* Ownership-gated Share button */}
              {isOwner && (
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-100 hover:bg-brand-200 rounded-lg border border-brand-300 transition-colors shadow-sm cursor-pointer"
                  title="Share your tutor profile"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Profile</span>
                </button>
              )}
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 text-sm sm:text-base">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0 text-brand-600" />
                <span>{teacher.address?.city}, {teacher.address?.state}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0 text-brand-600" />
                <span>{formatExperience(teacher.experience)} experience</span>
              </div>
              <div className="flex items-center text-gray-600 font-semibold">
                <span>Rs {teacher.hourlyRate}/hour</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0 text-brand-600" />
                <span>{teacher.teachingMode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render share modal dialog when owner clicks Share */}
      {isOwner && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          teacher={teacher}
          shareUrl={publicShareUrl}
        />
      )}
    </section>
  );
};

export default TeacherHeader;