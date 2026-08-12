import { Star, Shield, Clock, GraduationCap, BookOpen } from 'lucide-react';
import FeatureItem from './FeatureItem';
import { FEATURES } from '../../constants/login/loginPageData';

const FEATURE_ICONS = {
  secure: Shield,
  access: Clock,
  educators: GraduationCap,
  content: BookOpen,
};

const FeaturesList = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-brand-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Star className="w-6 h-6 text-gold-500" />
        Why Tutors Choose TuitionMaster
      </h3>

      <div className="space-y-4">
        {FEATURES.map((feature) => (
          <FeatureItem
            key={feature.id}
            icon={FEATURE_ICONS[feature.id]}
            title={feature.title}
            description={feature.description}
            color={feature.color}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesList;