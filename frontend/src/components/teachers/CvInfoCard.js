const COLOR_CLASSES = {
  blue: { bg: 'bg-brand-50', border: 'border-brand-200', icon: 'text-brand-600', title: 'text-brand-800', text: 'text-brand-700' },
  green: { bg: 'bg-success-50', border: 'border-success-200', icon: 'text-success-600', title: 'text-success-700', text: 'text-success-600' },
  purple: { bg: 'bg-gold-50', border: 'border-gold-200', icon: 'text-gold-600', title: 'text-gold-700', text: 'text-gold-600' },
};

const CvInfoCard = ({ color, title, description, icon }) => {
  const classes = COLOR_CLASSES[color];

  return (
    <div className={`${classes.bg} border ${classes.border} rounded-lg p-4`}>
      <div className="flex items-center space-x-3">
        <svg className={`w-5 h-5 ${classes.icon} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d={icon} clipRule="evenodd" />
        </svg>
        <div>
          <div className={`font-semibold ${classes.title}`}>{title}</div>
          <div className={`${classes.text} text-sm`}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default CvInfoCard;