import { Users, Award } from 'lucide-react';

const STAT_ICONS = {
  users: Users,
  tutors: Award,
};

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {stats.map((stat) => {
        const Icon = STAT_ICONS[stat.id];
        return (
          <div
            key={stat.id}
            className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 text-white text-center shadow-lg transform hover:scale-105 transition-transform duration-300`}
          >
            <Icon className="w-8 h-8 mx-auto mb-3" />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;