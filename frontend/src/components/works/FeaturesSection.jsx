import FeatureCard from './FeatureCard';
import { FEATURES } from '../../constants/works/features';

const FeaturesSection = () => {
  return (
    <div className="bg-brand-900 text-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold mb-4">
            Platform Architecture & Quality Controls
          </h2>
          <p className="text-brand-200 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            TuitionMaster is built on transparent data, AI-driven discovery, and rigorous credential verification to ensure high-standard academic outcomes across Nepal.
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
