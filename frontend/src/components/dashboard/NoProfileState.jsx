import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, ShieldCheck, PlayCircle } from 'lucide-react';
import VideoOverlayBanner from '../video/VideoOverlayBanner';

const NoProfileState = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300 relative">
      {showVideoModal && (
        <VideoOverlayBanner onClose={() => setShowVideoModal(false)} />
      )}
      <div className="max-w-md mx-auto">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-brand-50 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-brand-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-4">Create Your Teacher Profile</h2>
        <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
          Start your teaching journey by creating a professional profile to showcase your
          expertise and attract students worldwide.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/create-profile"
            className="btn-brand-primary w-full sm:w-auto text-base sm:text-lg px-6 py-3"
          >
            <Plus className="w-5 h-5" />
            Create Profile
          </Link>
          <button
            type="button"
            onClick={() => setShowVideoModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-brand-200 text-brand-700 hover:bg-brand-50 px-6 py-3 rounded-xl font-bold text-base transition-colors"
          >
            <PlayCircle className="w-5 h-5 text-brand-600" />
            Watch Video Guide
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100">
          <p className="text-sm text-gray-500 flex items-center justify-center text-center">
            <ShieldCheck className="w-4 h-4 mr-2 text-success-600 flex-shrink-0" />
            Complete profiles get more student inquiries
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoProfileState;
