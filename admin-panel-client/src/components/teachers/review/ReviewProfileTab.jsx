export default function ReviewProfileTab({ teacher }) {
  const monthlyRate = teacher.monthlyRate ?? (teacher.hourlyRate ? teacher.hourlyRate * 20 : 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Bio */}
      <div
        style={{
          padding: '16px',
          background: 'var(--bg-card-elevated)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            fontSize: '.78rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '6px',
          }}
        >
          Professional Bio
        </div>
        <p style={{ fontSize: '.9rem', lineHeight: 1.6, color: 'var(--text-primary)', margin: 0 }}>
          {teacher.bio || 'No biography provided yet.'}
        </p>
      </div>

      {/* Grid of Key Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div
          style={{
            padding: '14px',
            background: 'var(--bg-input)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
          }}
        >
          <div style={{ fontSize: '.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Teaching Mode
          </div>
          <div style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            {teacher.teachingMode || 'Both (Online & In-person)'}
          </div>
        </div>

        <div
          style={{
            padding: '14px',
            background: 'var(--bg-input)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
          }}
        >
          <div style={{ fontSize: '.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Monthly Fee
          </div>
          <div style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--gold-400)', marginTop: '4px' }}>
            ₨ {monthlyRate.toLocaleString()} / mo
          </div>
        </div>

        <div
          style={{
            padding: '14px',
            background: 'var(--bg-input)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
          }}
        >
          <div style={{ fontSize: '.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Experience
          </div>
          <div style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            {teacher.experience || 0} Years
          </div>
        </div>

        <div
          style={{
            padding: '14px',
            background: 'var(--bg-input)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
          }}
        >
          <div style={{ fontSize: '.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Location
          </div>
          <div style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            {teacher.address?.city || 'Nepal'}, {teacher.address?.state || ''}
          </div>
        </div>
      </div>
    </div>
  );
}
