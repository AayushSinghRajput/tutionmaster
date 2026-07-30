const BenefitItem = ({ index, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
        <span className="text-blue-600 font-semibold text-sm">{index}</span>
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default BenefitItem;