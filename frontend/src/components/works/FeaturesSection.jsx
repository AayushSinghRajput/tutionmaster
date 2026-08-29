import FeatureCard from './FeatureCard';
import { FEATURES } from '../../constants/works/features';

const FeaturesSection = () => {
  return (
    <div className="bg-brand-900 text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Why Choose TuitionMaster?</h2>
          <p className="text-brand-200 text-sm sm:text-base max-w-2xl mx-auto">
            Find the right tutor faster with personalized recommendations, transparent
            profiles, and flexible learning options — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
