import { STATS } from '../../constants/works/stats';

const StatsSection = () => {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-900 mb-2">{stat.number}</div>
              <div className="text-brand-700 font-medium text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
