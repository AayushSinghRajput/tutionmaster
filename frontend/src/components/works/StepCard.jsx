const StepCard = ({ step, index, isLast }) => {
  const Icon = step.icon;

  return (
    <div className="relative">
      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-brand-200 z-0"></div>
      )}

      <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600">
            <Icon className="w-8 h-8" />
          </div>
          <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
            {index + 1}
          </div>
        </div>
        <h3 className="text-xl font-bold text-brand-900 mb-3">{step.title}</h3>
        <p className="text-brand-700">{step.description}</p>
      </div>
    </div>
  );
};

export default StepCard;
