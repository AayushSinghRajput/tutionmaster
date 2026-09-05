import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({
  title,
  message,
  confirmLabel = 'Confirm',
  confirmClass = 'btn-danger',
  onConfirm,
  onCancel,
  loading,
}) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                background: confirmClass.includes('btn-danger')
                  ? 'rgba(239, 68, 68, 0.18)'
                  : 'rgba(47, 122, 94, 0.2)',
                color: confirmClass.includes('btn-danger') ? 'var(--danger)' : 'var(--success-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <h3 className="modal-title" style={{ margin: 0 }}>
              {title}
            </h3>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onCancel}
            disabled={loading}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`btn ${confirmClass}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? <span className="spinner spinner-sm" /> : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
