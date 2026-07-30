const COLOR_CLASSES = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', title: 'text-blue-800', text: 'text-blue-700' },
  green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', title: 'text-green-800', text: 'text-green-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', title: 'text-purple-800', text: 'text-purple-700' },
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