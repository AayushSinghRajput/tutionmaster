import { useState } from 'react';
import { Star, PlayCircle } from 'lucide-react';
import BenefitItem from './BenefitItem';
import { PROFILE_BENEFITS } from '../../constants/profile/profileBenefits';
import VideoOverlayBanner from '../video/VideoOverlayBanner';

const BenefitsSidebar = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-5 sm:p-6 lg:sticky lg:top-8">
      {showVideoModal && (
        <VideoOverlayBanner onClose={() => setShowVideoModal(false)} />
      )}

      {/* Video Guide Card */}
      <div className="mb-6 bg-gradient-to-br from-brand-50 via-brand-100/50 to-gold-50/40 p-5 sm:p-6 rounded-2xl border-2 border-brand-300 shadow-sm text-center">
        <div className="w-11 h-11 mx-auto mb-3 bg-brand-600 text-gold-300 rounded-xl flex items-center justify-center shadow-sm">
          <PlayCircle className="w-6 h-6" />
        </div>
        <h4 className="font-serif font-bold text-gray-900 text-lg sm:text-xl mb-1.5 leading-snug">
          Need help with registration?
        </h4>
        <p className="text-sm sm:text-base text-gray-700 font-medium mb-4 leading-relaxed">
          Watch our 2-minute step-by-step video walkthrough to complete your profile quickly.
        </p>
        <button
          type="button"
          onClick={() => setShowVideoModal(true)}
          className="w-full bg-gradient-to-r from-brand-600 to-brand-800 hover:from-brand-700 hover:to-brand-900 text-white py-3 px-4 rounded-xl text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <PlayCircle className="w-5 h-5 text-gold-300" />
          Watch Video Guide
        </button>
      </div>
      <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4 flex items-center">
        <Star className="w-5 h-5 mr-2 text-gold-500" />
        Why Create a Profile?
      </h3>

      <div className="space-y-4">
        {PROFILE_BENEFITS.map((benefit, index) => (
          <BenefitItem
            key={benefit.id}
            index={index + 1}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </div>
  );
};

export default BenefitsSidebar;