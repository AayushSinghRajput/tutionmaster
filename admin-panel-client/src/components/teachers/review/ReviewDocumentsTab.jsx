import { FileText, Download, CheckCircle2 } from 'lucide-react';

export default function ReviewDocumentsTab({ teacher }) {
  return (
    <div>
      {/* CV Section */}
      <div
        style={{
          marginBottom: '20px',
          padding: '16px',
          background: 'var(--bg-card-elevated)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--brand-300)" />
            <span style={{ fontWeight: 700, fontSize: '.9rem' }}>Curriculum Vitae (CV)</span>
          </div>
          {teacher.cvDownloadUrl && (
            <a
              href={teacher.cvDownloadUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          )}
        </div>

        {teacher.cvUrl ? (
          <div
            style={{
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: '#fff',
              height: '420px',
            }}
          >
            <iframe
              src={teacher.cvUrl}
              title="CV Preview"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </div>
        ) : (
          <div
            className="state-center"
            style={{ padding: '30px', background: 'var(--bg-input)', borderRadius: 'var(--radius)' }}
          >
            <FileText size={32} color="var(--text-muted)" />
            <p style={{ margin: '8px 0 0', fontSize: '.84rem' }}>
              No PDF CV uploaded for this profile yet.
            </p>
          </div>
        )}
      </div>

      {/* Verification Audit Checklist */}
      <div
        style={{
          padding: '16px',
          background: 'var(--bg-input)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            fontSize: '.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '10px',
          }}
        >
          Verification Audit Checklist
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '.84rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2
              size={16}
              color={teacher.avatarUrl ? 'var(--success-light)' : 'var(--warning)'}
            />
            <span>Avatar / Photograph: {teacher.avatarUrl ? 'Uploaded' : 'Missing photo'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2
              size={16}
              color={teacher.cvPublicId ? 'var(--success-light)' : 'var(--warning)'}
            />
            <span>CV Document: {teacher.cvPublicId ? 'Submitted for review' : 'Pending upload'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2
              size={16}
              color={teacher.qualifications?.length > 0 ? 'var(--success-light)' : 'var(--danger)'}
            />
            <span>
              Academic Degrees: {teacher.qualifications?.length || 0} degree(s) declared
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
