import { Star } from 'lucide-react';
import BenefitItem from './BenefitItem';
import { PROFILE_BENEFITS, PROFILE_QUICK_TIPS } from '../../constants/profile/profileBenefits';

const BenefitsSidebar = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Star className="w-5 h-5 mr-2 text-blue-500" />
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

      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <h4 className="font-semibold text-blue-900 text-sm mb-2">Quick Tips</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          {PROFILE_QUICK_TIPS.map((tip) => (
            <li key={tip}>• {tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BenefitsSidebar;