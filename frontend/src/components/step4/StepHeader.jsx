const StepHeader = ({ title, subtitle }) => (
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
    <p className="text-gray-600 text-lg mt-3">{subtitle}</p>
  </div>
);

export default StepHeader;
