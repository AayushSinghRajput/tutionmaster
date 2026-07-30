import { STATS } from '../../constants/works/stats';

const StatsSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">{stat.number}</div>
              <div className="text-blue-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;