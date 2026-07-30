const COLOR_CLASSES = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', hoverBorder: 'hover:border-blue-300', icon: 'text-blue-600' },
  green: { bg: 'bg-green-50', border: 'border-green-200', hoverBorder: 'hover:border-green-300', icon: 'text-green-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', hoverBorder: 'hover:border-purple-300', icon: 'text-purple-600' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', hoverBorder: 'hover:border-orange-300', icon: 'text-orange-600' },
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