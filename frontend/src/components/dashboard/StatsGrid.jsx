import StatCard from './StatCard';
import { STATS_CONFIG } from '../../constants/dashboard/statsConfig';

const StatsGrid = ({ profile }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      {STATS_CONFIG.map((stat) => (
        <StatCard
          key={stat.id}
          icon={stat.icon}
          label={stat.label}
          sublabel={stat.sublabel}
          value={stat.getValue(profile)}
        />
      ))}
    </div>
  );
};

export default StatsGrid;