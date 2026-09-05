import { Clock, Award, Star, Calendar, Laptop } from 'lucide-react';
import NepaliRupeeIcon from '../../common/NepaliRupeeIcon';

export default function TeacherStatsRibbon({ teacher }) {
  const monthlyRate = teacher.monthlyRate ?? (teacher.hourlyRate ? teacher.hourlyRate * 20 : 0);
  const hourlyRate = teacher.hourlyRate ?? (monthlyRate ? Math.round(monthlyRate / 20) : 0);
  const availabilityCount = teacher.availability?.length || 0;
  const rating = teacher.averageRating ? Number(teacher.averageRating).toFixed(1) : 'New';
  const reviewsCount = teacher.totalReviews || 0;

  const stats = [
    {
      icon: <NepaliRupeeIcon size={22} color="var(--gold-300)" />,
      iconBg: 'rgba(189, 138, 46, 0.14)',
      label: 'Monthly Fee',
      value: `₨ ${monthlyRate.toLocaleString()}`,
      subtext: `~₨ ${hourlyRate.toLocaleString()} / hr`,
    },
    {
      icon: <Award size={20} style={{ color: 'var(--brand-300)' }} />,
      iconBg: 'rgba(138, 56, 97, 0.16)',
      label: 'Experience',
      value: `${teacher.experience || 0} Years`,
      subtext: teacher.experience > 5 ? 'Senior Tutor' : 'Tutor',
    },
    {
      icon: <Laptop size={20} style={{ color: 'var(--info)' }} />,
      iconBg: 'rgba(56, 189, 248, 0.14)',
      label: 'Teaching Mode',
      value: teacher.teachingMode || 'In-person',
      subtext: 'Flexible Delivery',
    },
    {
      icon: <Calendar size={20} style={{ color: 'var(--success-light)' }} />,
      iconBg: 'rgba(47, 122, 94, 0.16)',
      label: 'Schedule',
      value: `${availabilityCount} Day${availabilityCount !== 1 ? 's' : ''}`,
      subtext: 'Weekly Availability',
    },
    {
      icon: <Star size={20} style={{ color: '#fbbf24' }} />,
      iconBg: 'rgba(251, 191, 36, 0.14)',
      label: 'Rating & Reviews',
      value: rating === 'New' ? 'No rating' : `★ ${rating}`,
      subtext: `${reviewsCount} review${reviewsCount !== 1 ? 's' : ''}`,
    },
  ];

  return (
    <div className="teacher-stats-ribbon">
      {stats.map((stat, idx) => (
        <div key={idx} className="teacher-stat-box">
          <div className="teacher-stat-icon-wrapper" style={{ background: stat.iconBg }}>
            {stat.icon}
          </div>
          <div className="teacher-stat-content">
            <span className="teacher-stat-label">{stat.label}</span>
            <span className="teacher-stat-value">{stat.value}</span>
            <span className="teacher-stat-subtext">{stat.subtext}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
