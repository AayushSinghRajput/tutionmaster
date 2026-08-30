import HeroSection from '../components/works/HeroSection';
import StatsSection from '../components/works/StatsSection';
import StudentJourneySection from '../components/works/StudentJourneySection';
import TutorJourneySection from '../components/works/TutorJourneySection';
import AiMatchingSection from '../components/works/AiMatchingSection';
import FeaturesSection from '../components/works/FeaturesSection';
import TrustSection from '../components/works/TrustSection';
import CtaSection from '../components/works/CtaSection';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-gold-50">
      <HeroSection />
      <StatsSection />
      <StudentJourneySection />
      <TutorJourneySection />
      <AiMatchingSection />
      <FeaturesSection />
      <TrustSection />
      <CtaSection />
    </div>
  );
};

export default HowItWorks;
