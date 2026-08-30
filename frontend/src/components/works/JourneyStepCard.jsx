const ACCENTS = {
  brand: {
    numberBg: 'bg-gradient-to-br from-brand-600 to-brand-700',
    iconBg: 'bg-brand-100',
    iconText: 'text-brand-600',
    tagBg: 'bg-brand-50 text-brand-700 border-brand-200',
    line: 'bg-brand-200',
  },
  gold: {
    numberBg: 'bg-gradient-to-br from-gold-600 to-gold-700',
    iconBg: 'bg-gold-100',
    iconText: 'text-gold-700',
    tagBg: 'bg-gold-50 text-gold-800 border-gold-200',
    line: 'bg-gold-200',
  },
};

const JourneyStepCard = ({ step, index, isLast, accent = 'brand' }) => {
  const Icon = step.icon;
  const colors = ACCENTS[accent];

  return (
    <div className="relative flex gap-5 sm:gap-6 pb-10 last:pb-0">
      {!isLast && (
        <div className={`absolute left-6 top-14 bottom-0 w-0.5 ${colors.line}`} />
      )}

      <div
        className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${colors.numberBg}`}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="flex-1 bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-stone-200 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.iconBg}`}>
            <Icon className={`w-5 h-5 ${colors.iconText}`} />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{step.title}</h3>
        </div>
        <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
        {step.tags && (
          <div className="flex flex-wrap gap-2">
            {step.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${colors.tagBg}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneyStepCard;
