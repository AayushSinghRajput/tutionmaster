import { useState } from 'react';
import { Users, PlayCircle } from 'lucide-react';
import JourneyStepCard from './JourneyStepCard';
import { TUTOR_JOURNEY } from '../../constants/works/tutorJourney';
import VideoOverlayBanner from '../video/VideoOverlayBanner';

const TutorJourneySection = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="bg-stone-50 border-y border-stone-200">
      {showVideoModal && (
        <VideoOverlayBanner onClose={() => setShowVideoModal(false)} />
      )}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Users className="w-4 h-4" />
            FOR TUTORS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-4">
            Start Teaching With TuitionMaster
          </h2>
          <p className="text-brand-700 max-w-2xl mx-auto">
            From creating your profile to your first class — here's how tutors use the platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {TUTOR_JOURNEY.map((step, index) => (
            <div key={step.id}>
              <JourneyStepCard
                step={step}
                index={index}
                isLast={index === TUTOR_JOURNEY.length - 1}
                accent="gold"
              />
              {index === 0 && (
                <div className="pl-[68px] sm:pl-[76px] pb-6">
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(true)}
                    className="relative z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-100/80 hover:bg-gold-200 text-sm font-bold text-gold-800 transition-colors shadow-sm cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4 text-gold-700" />
                    See how profile creation works (Watch Video)
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorJourneySection;
