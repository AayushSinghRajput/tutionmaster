import { Eye } from 'lucide-react';
import InfoCategoryCard from './InfoCategoryCard';
import { PERSONAL_INFO_ITEMS, EDUCATIONAL_INFO_ITEMS } from '../../constants/policy/privacyPolicyData';

const InformationSection = () => {
  return (
    <section id="information" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Eye className="w-6 h-6 text-brand-600 mr-3" />
        Information We Collect
      </h2>

      <div className="bg-brand-50 border-l-4 border-brand-500 pl-6 py-4 mb-6">
        <h3 className="font-semibold text-brand-800 mb-2">Educational Data</h3>
        <p className="text-brand-700 text-sm">
          We collect information necessary to provide personalized educational experiences,
          including course progress, assessment results, and learning preferences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCategoryCard title="Personal Information" items={PERSONAL_INFO_ITEMS} />
        <InfoCategoryCard title="Educational Information" items={EDUCATIONAL_INFO_ITEMS} />
      </div>
    </section>
  );
};

export default InformationSection;
