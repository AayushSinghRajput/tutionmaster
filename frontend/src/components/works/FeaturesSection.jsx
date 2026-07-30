import FeatureCard from './FeatureCard';
import { FEATURES } from '../../constants/works/features';

const FeaturesSection = () => {
  return (
    <div className="bg-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose TutionMaster?</h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            We combine cutting-edge technology with proven teaching methodologies to deliver
            exceptional learning outcomes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;