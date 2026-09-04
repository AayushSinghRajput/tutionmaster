import { GraduationCap } from 'lucide-react';
import { POPULAR_SUBJECTS } from '../../constants';

export default function QualificationsStep({ formData, setFormData, onAddSubjectChip }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: 'rgba(99, 102, 241, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#818cf8',
          }}
        >
          <GraduationCap size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
            Step 3: Academic Qualifications & Teaching Subjects
          </h3>
          <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Highest educational degree and subjects the tutor is qualified to teach
          </p>
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
          <label className="form-label">Primary Degree *</label>
          <input
            type="text"
            className="form-input"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            placeholder="e.g. B.Sc. Physics / B.E. Computer"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">University / Institution *</label>
          <input
            type="text"
            className="form-input"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            placeholder="e.g. Tribhuvan University (IOE / IOST)"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Years of Experience</label>
          <input
            type="number"
            className="form-input"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            min={0}
            max={40}
          />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '16px' }}>
        <label className="form-label">Preferred Subjects (Comma separated) *</label>
        <input
          type="text"
          className="form-input"
          value={formData.preferredSubjects}
          onChange={(e) => setFormData({ ...formData, preferredSubjects: e.target.value })}
          placeholder="Mathematics, Physics, Chemistry, Computer Science"
          required
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
          <span style={{ fontSize: '.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
            Quick Add:
          </span>
          {POPULAR_SUBJECTS.map((sub) => (
            <button
              key={sub}
              type="button"
              className="badge"
              style={{
                background: 'var(--bg-card-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '.75rem',
              }}
              onClick={() => onAddSubjectChip(sub)}
            >
              + {sub}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Tutor Bio / Description</label>
        <textarea
          className="form-textarea"
          rows={3}
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Detailed description of teaching philosophy, exam prep track record, and strengths..."
        />
      </div>
    </div>
  );
}
