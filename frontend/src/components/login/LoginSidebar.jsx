import StatsGrid from './StatsGrid';
import FeaturesList from './FeaturesList';
import TestimonialCard from './TestimonialCard';
import { STATS, TESTIMONIAL } from '../../constants/login/loginPageData';

const LoginSidebar = () => {
  return (
    <div className="hidden lg:block space-y-8">
      <StatsGrid stats={STATS} />
      <FeaturesList />
      <TestimonialCard quote={TESTIMONIAL.quote} author={TESTIMONIAL.author} />
    </div>
  );
};

export default LoginSidebar;