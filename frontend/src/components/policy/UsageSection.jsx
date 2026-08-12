import { DATA_USAGE_ITEMS } from '../../constants/policy/privacyPolicyData';

const UsageSection = () => {
  return (
    <section id="usage" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
      <div className="space-y-4">
        {DATA_USAGE_ITEMS.map((use, index) => (
          <div key={use.title} className="flex items-start p-4 bg-stone-50 rounded-lg hover:bg-brand-50 transition-colors">
            <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-brand-600 font-semibold text-sm">{index + 1}</span>
            </div>
            <div className="ml-4">
              <h4 className="font-semibold text-gray-900">{use.title}</h4>
              <p className="text-gray-700 text-sm mt-1">{use.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UsageSection;
