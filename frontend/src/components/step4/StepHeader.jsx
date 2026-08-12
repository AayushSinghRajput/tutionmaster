const StepHeader = ({ title, subtitle }) => (
  <div className="text-center mb-6 sm:mb-8 px-2">
    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">{title}</h2>
    <p className="text-gray-600 text-base sm:text-lg mt-2 sm:mt-3">{subtitle}</p>
  </div>
);

export default StepHeader;
