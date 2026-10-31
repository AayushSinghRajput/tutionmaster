import { useState, useEffect } from 'react';
import { FileText, Download, CheckCircle2, Maximize2, Minimize2, ExternalLink, X } from 'lucide-react';

export default function ReviewDocumentsTab({ teacher }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsFullScreen(false);
    };
    if (isFullScreen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFullScreen]);

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
            marginBottom: '12px',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--brand-300)" />
            <span style={{ fontWeight: 700, fontSize: '.9rem' }}>Curriculum Vitae (CV)</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {teacher.cvUrl && (
              <>
                <button
                  type="button"
                  onClick={() => setIsFullScreen(true)}
                  className="btn btn-secondary btn-sm"
                  title="View CV in Full Screen Modal"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Maximize2 size={14} />
                  <span>Full Screen View</span>
                </button>

                <a
                  href={teacher.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost btn-sm"
                  title="Open CV in a new browser tab"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <ExternalLink size={14} />
                  <span>Open Tab</span>
                </a>
              </>
            )}

            {teacher.cvDownloadUrl && (
              <a
                href={teacher.cvDownloadUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-sm"
                title="Download original CV PDF"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={14} />
                <span>Download</span>
              </a>
            )}
          </div>
        </div>

        {teacher.cvUrl ? (
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: '#1e293b',
              height: '460px',
            }}
          >
            <iframe
              src={teacher.cvUrl}
              title="CV Preview"
              width="100%"
              height="100%"
              style={{ border: 'none', display: 'block' }}
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

      {/* Full Screen Lightbox Modal for CV */}
      {isFullScreen && teacher.cvUrl && (
        <div className="doc-fullscreen-backdrop" onClick={() => setIsFullScreen(false)}>
          <div className="doc-fullscreen-card" onClick={(e) => e.stopPropagation()}>
            <div className="doc-fullscreen-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={20} color="var(--gold-400)" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
                    CV Document Preview — {teacher.name}
                  </h3>
                  <span style={{ fontSize: '.76rem', color: 'var(--text-secondary)' }}>
                    Press Esc or click close to exit full screen
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {teacher.cvDownloadUrl && (
                  <a
                    href={teacher.cvDownloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost btn-sm"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </a>
                )}
                <a
                  href={teacher.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <ExternalLink size={14} />
                  <span>Open Tab</span>
                </a>
                <button
                  type="button"
                  className="btn btn-ghost btn-icon"
                  onClick={() => setIsFullScreen(false)}
                  title="Close Full Screen (Esc)"
                  style={{ marginLeft: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="doc-fullscreen-body">
              <iframe
                src={teacher.cvUrl}
                title="CV Full Screen"
                width="100%"
                height="100%"
                style={{ border: 'none', display: 'block' }}
              />
            </div>
          </div>
        </div>
      )}

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
