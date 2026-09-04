import { X, CheckCircle2 } from 'lucide-react';

export default function TutorAssignModal({
  matchingModalReq,
  loadingTutors,
  availableTutors,
  onClose,
  onAssignTutor,
}) {
  if (!matchingModalReq) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <div>
            <div className="modal-title">Match Tutor to Lead</div>
            <p style={{ fontSize: '.84rem', color: 'var(--text-secondary)', margin: 0 }}>
              Assigning for: <strong>{matchingModalReq.subject}</strong> ({matchingModalReq.location || 'Nepal'})
            </p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {loadingTutors && (
          <div className="state-center" style={{ padding: '30px' }}>
            <div className="spinner" />
            <p>Searching verified tutors...</p>
          </div>
        )}

        {!loadingTutors && availableTutors.length === 0 && (
          <div className="state-center" style={{ padding: '30px' }}>
            <p>No verified tutors directly matched for "{matchingModalReq.subject}".</p>
          </div>
        )}

        {!loadingTutors && availableTutors.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxHeight: '360px',
              overflowY: 'auto',
              margin: '16px 0',
            }}
          >
            {availableTutors.map((tutor) => (
              <div
                key={tutor._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)' }}>
                    {tutor.name}
                  </div>
                  <div style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>
                    {tutor.address?.city} · ₨ {tutor.hourlyRate || '0'}/hr · {tutor.teachingMode}
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onAssignTutor(tutor)}
                >
                  <CheckCircle2 size={14} />
                  <span>Assign Tutor</span>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
