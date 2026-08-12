const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <div className="bg-brand-800 rounded-2xl p-5 sm:p-6 text-center hover:bg-brand-700 transition-colors">
      <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
      <p className="text-brand-200 text-sm">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;
