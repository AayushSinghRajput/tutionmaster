const COLOR_CLASSES = {
  brand: { bg: 'bg-brand-50', border: 'border-brand-200', hoverBorder: 'hover:border-brand-300', icon: 'text-brand-600' },
  gold: { bg: 'bg-gold-50', border: 'border-gold-200', hoverBorder: 'hover:border-gold-300', icon: 'text-gold-600' },
};

const FeatureItem = ({ icon: Icon, title, description, color }) => {
  const classes = COLOR_CLASSES[color];

  return (
    <div
      className={`flex items-start gap-4 p-4 ${classes.bg} rounded-xl border ${classes.border} ${classes.hoverBorder} transition-all duration-200 group`}
    >
      <Icon className={`w-6 h-6 ${classes.icon} mt-1 flex-shrink-0 group-hover:scale-110 transition-transform`} />
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;