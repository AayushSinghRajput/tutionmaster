import { X } from 'lucide-react';
import { REQUIREMENT_STATUS_OPTIONS } from '../../constants';

export default function RequirementDetailModal({
  selectedReq,
  editingStatus,
  setEditingStatus,
  editingNotes,
  setEditingNotes,
  savingUpdate,
  onClose,
  onSave,
}) {
  if (!selectedReq) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
          }}
        >
          <div className="modal-title">Student Inquiry Details</div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div
          style={{
            padding: '16px',
            background: 'var(--bg-input)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            marginBottom: '18px',
          }}
        >
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {selectedReq.subject} ({selectedReq.academicLevel || 'All Levels'})
          </div>
          <div style={{ fontSize: '.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Contact: {selectedReq.contactPhone || selectedReq.contactEmail || 'None provided'}
          </div>
          {selectedReq.additionalRequirements && (
            <div
              style={{
                fontSize: '.85rem',
                color: 'var(--text-muted)',
                marginTop: '8px',
                padding: '8px 12px',
                background: 'var(--bg-card)',
                borderRadius: 6,
              }}
            >
              "{selectedReq.additionalRequirements}"
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Pipeline Progress Stage</label>
          <select
            className="form-select"
            value={editingStatus}
            onChange={(e) => setEditingStatus(e.target.value)}
          >
            {REQUIREMENT_STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Admin Follow-up Notes</label>
          <textarea
            className="form-textarea"
            rows={3}
            placeholder="Log phone calls with parent, special requirements, demo class schedule, etc..."
            value={editingNotes}
            onChange={(e) => setEditingNotes(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" disabled={savingUpdate} onClick={onSave}>
            Save Updates
          </button>
        </div>
      </div>
    </div>
  );
}
