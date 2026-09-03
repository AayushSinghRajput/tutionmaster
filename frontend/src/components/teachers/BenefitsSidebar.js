import { useState } from 'react';
import { Star, PlayCircle } from 'lucide-react';
import BenefitItem from './BenefitItem';
import { PROFILE_BENEFITS, PROFILE_QUICK_TIPS } from '../../constants/profile/profileBenefits';
import VideoOverlayBanner from '../video/VideoOverlayBanner';

const BenefitsSidebar = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-5 sm:p-6 lg:sticky lg:top-8">
      {showVideoModal && (
        <VideoOverlayBanner onClose={() => setShowVideoModal(false)} />
      )}

      {/* Video Guide Card */}
      <div className="mb-6 bg-brand-50 p-4 rounded-xl border border-brand-200 text-center">
        <h4 className="font-bold text-gray-900 text-sm mb-1">Need help with registration?</h4>
        <p className="text-xs text-gray-600 mb-3">Watch our 2-minute video walkthrough</p>
        <button
          type="button"
          onClick={() => setShowVideoModal(true)}
          className="w-full btn-brand-primary py-2 text-xs font-bold gap-1.5 justify-center"
        >
          <PlayCircle className="w-4 h-4" />
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

      <div className="mt-6 p-4 bg-gold-50 rounded-xl border border-gold-200">
        <h4 className="font-semibold text-gold-800 text-sm mb-2">Quick Tips</h4>
        <ul className="text-xs text-gold-700 space-y-1">
          {PROFILE_QUICK_TIPS.map((tip) => (
            <li key={tip}>• {tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BenefitsSidebar;