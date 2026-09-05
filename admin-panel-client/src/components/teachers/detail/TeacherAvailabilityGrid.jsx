import { Calendar, Check, X } from 'lucide-react';

const ALL_DAYS = [
  { key: 'Monday', short: 'Mon' },
  { key: 'Tuesday', short: 'Tue' },
  { key: 'Wednesday', short: 'Wed' },
  { key: 'Thursday', short: 'Thu' },
  { key: 'Friday', short: 'Fri' },
  { key: 'Saturday', short: 'Sat' },
  { key: 'Sunday', short: 'Sun' },
];

export default function TeacherAvailabilityGrid({ teacher }) {
  const teacherDays = Array.isArray(teacher.availability) ? teacher.availability : [];

  return (
    <div className="detail-section-card">
      <div className="detail-card-header">
        <div className="detail-card-header-left">
          <div className="detail-card-header-icon">
            <Calendar size={18} />
          </div>
          <h3 className="detail-card-title">Weekly Tutoring Availability</h3>
        </div>
        <span className="badge badge-verified">
          {teacherDays.length} / 7 Days Active
        </span>
      </div>

      <div className="detail-card-body">
        <div className="availability-week-grid">
          {ALL_DAYS.map((day) => {
            const isAvailable = teacherDays.some(
              (d) => d.toLowerCase() === day.key.toLowerCase()
            );

            return (
              <div
                key={day.key}
                className={`day-schedule-card ${
                  isAvailable ? 'day-active' : 'day-inactive'
                }`}
              >
                <span className="day-name-label">{day.short}</span>
                <div className="day-status-indicator">
                  {isAvailable ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <X size={14} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 14, fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span>Selected: {teacherDays.join(', ') || 'None'}</span>
          <span style={{ color: 'var(--text-muted)' }}>* Regular schedule availability</span>
        </div>
      </div>
    </div>
  );
}
