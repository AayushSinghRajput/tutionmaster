import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/works/HeroSection';
import StepsSection from '../components/works/StepsSection';
import FeaturesSection from '../components/works/FeaturesSection';
import StatsSection from '../components/works/StatsSection';
import CtaSection from '../components/works/CtaSection';

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleWatchDemo = () => {
    navigate('/how-it-works/teacher-profile');
  };

  const handleBookTrial = () => {
    // navigate to booking flow
  };

  const handleSpeakToAdvisor = () => {
    // open contact/chat widget, or navigate to advisor page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-gold-50">
      <HeroSection onWatchDemo={handleWatchDemo} />
      <StepsSection />
      <FeaturesSection />
      <StatsSection />
      <CtaSection onBookTrial={handleBookTrial} onSpeakToAdvisor={handleSpeakToAdvisor} />
    </div>
  );
};

export default HowItWorks;