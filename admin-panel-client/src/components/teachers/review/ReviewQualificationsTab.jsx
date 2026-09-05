export default function ReviewQualificationsTab({ teacher }) {
  const preferredSubjects = teacher.preferredSubjects || [];
  const qualifications = teacher.qualifications || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Subjects */}
      <div>
        <div
          style={{
            fontSize: '.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '10px',
          }}
        >
          Teaching Subjects ({preferredSubjects.length})
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {preferredSubjects.map((sub, i) => (
            <span
              key={i}
              className="badge badge-subject"
              style={{ fontSize: '.82rem', padding: '4px 10px' }}
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* Qualifications */}
      <div>
        <div
          style={{
            fontSize: '.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '10px',
          }}
        >
          Academic Degrees & Qualifications
        </div>
        {qualifications.map((q, i) => (
          <div
            key={i}
            style={{
              padding: '14px',
              background: 'var(--bg-card-elevated)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              marginBottom: '8px',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '.92rem', color: 'var(--text-primary)' }}>
              {q.degree}
            </div>
            <div style={{ fontSize: '.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {q.institution}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
