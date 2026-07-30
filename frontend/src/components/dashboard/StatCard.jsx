const StatCard = ({ icon: Icon, label, sublabel, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-900">{label}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <span className="text-sm text-gray-500">{sublabel}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;