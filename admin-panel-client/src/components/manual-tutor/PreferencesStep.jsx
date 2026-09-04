import { Clock } from 'lucide-react';
import { DAYS_OF_WEEK } from '../../constants';

export default function PreferencesStep({ formData, setFormData, onDayToggle }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: 'rgba(47, 122, 94, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--success-light)',
          }}
        >
          <Clock size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
            Step 4: Availability, Pricing & Publishing
          </h3>
          <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Days available for tutoring, rate per hour, and initial visibility status
          </p>
        </div>
      </div>

      {/* Days of Week (Initial 6 days except Saturday preselected) */}
      <div className="form-group" style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}
        >
          <label className="form-label" style={{ margin: 0 }}>
            Available Days of the Week *
          </label>
          <span style={{ fontSize: '.76rem', color: 'var(--text-muted)' }}>
            ({formData.availability.length} of 7 days selected)
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = formData.availability.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => onDayToggle(day)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius)',
                  fontSize: '.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isSelected
                    ? '1px solid var(--brand-500)'
                    : '1px solid var(--border)',
                  background: isSelected
                    ? 'linear-gradient(135deg, var(--brand-700), var(--brand-800))'
                    : 'var(--bg-input)',
                  color: isSelected ? '#fff' : 'var(--text-secondary)',
                  transition: 'var(--transition)',
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <div className="form-group">
          <label className="form-label">Teaching Mode</label>
          <select
            className="form-select"
            value={formData.teachingMode}
            onChange={(e) => setFormData({ ...formData, teachingMode: e.target.value })}
          >
            <option value="Both">Both (Home & Online Tuition)</option>
            <option value="Physical">Physical (Home Tuition Only)</option>
            <option value="Online">Online Only</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Monthly Fee (NPR / month) *</label>
          <input
            type="number"
            className="form-input"
            value={formData.monthlyRate ?? (formData.hourlyRate ? formData.hourlyRate * 20 : 8000)}
            onChange={(e) => setFormData({ ...formData, monthlyRate: e.target.value, hourlyRate: Math.round(Number(e.target.value) / 20) })}
            placeholder="8000"
            min={500}
            max={200000}
            step={500}
            required
          />
        </div>
      </div>

      {/* Admin Quick Options */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '14px',
          background: 'var(--bg-input)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
        }}
      >
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={formData.publishImmediately}
            onChange={(e) =>
              setFormData({ ...formData, publishImmediately: e.target.checked })
            }
          />
          <span style={{ fontSize: '.84rem', fontWeight: 600 }}>
            Immediately Verify & Publish Profile (Visible to Public Searches)
          </span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={formData.sendNotification}
            onChange={(e) =>
              setFormData({ ...formData, sendNotification: e.target.checked })
            }
          />
          <span style={{ fontSize: '.84rem', color: 'var(--text-secondary)' }}>
            Send welcome confirmation notification to teacher's email address
          </span>
        </label>
      </div>
    </div>
  );
}
