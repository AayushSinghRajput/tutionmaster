const InfoCategoryCard = ({ title, items }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
      <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
      <ul className="text-gray-700 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
};

export default InfoCategoryCard;