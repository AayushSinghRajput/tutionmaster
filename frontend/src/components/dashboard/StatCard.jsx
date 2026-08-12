const StatCard = ({ icon: Icon, label, sublabel, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-4 sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-500" />
        </div>
        <div className="ml-3 sm:ml-4 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">{label}</h3>
          <p className="text-xl sm:text-2xl font-serif font-semibold text-gray-900 truncate">{value}</p>
          <span className="text-sm text-gray-500 truncate block">{sublabel}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;