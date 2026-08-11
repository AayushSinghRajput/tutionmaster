const StepCard = ({ step, index, isLast }) => {
  const Icon = step.icon;

  return (
    <div className="relative">
      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-blue-200 z-0"></div>
      )}

      <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <Icon className="w-8 h-8" />
          </div>
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
            {index + 1}
          </div>
        </div>
        <h3 className="text-xl font-bold text-blue-900 mb-3">{step.title}</h3>
        <p className="text-blue-700 mb-4">{step.description}</p>
        <p className="text-sm text-blue-600 bg-blue-50 rounded-lg p-3">{step.details}</p>
      </div>
    </div>
  );
};

export default StepCard;