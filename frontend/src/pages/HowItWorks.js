import HeroSection from '../components/works/HeroSection';
import StatsSection from '../components/works/StatsSection';
import StudentJourneySection from '../components/works/StudentJourneySection';
import TutorJourneySection from '../components/works/TutorJourneySection';
import AiMatchingSection from '../components/works/AiMatchingSection';
import FeaturesSection from '../components/works/FeaturesSection';
import TrustSection from '../components/works/TrustSection';
import CtaSection from '../components/works/CtaSection';

import SEO from '../components/seo/SEO';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-gold-50">
      <SEO 
        title="How It Works | TuitionMaster"
        description="Learn how TuitionMaster connects students with the perfect tutor using our advanced matching algorithm. Discover the journey for both students and tutors."
        canonicalUrl="https://www.tuitionmaster.guru/how-it-works"
      />
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
