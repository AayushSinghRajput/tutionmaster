import { Send } from 'lucide-react';
import { REASON_PRESETS } from '../../../constants';

export default function ReviewActionForm({
  showRejectForm,
  selectedReason,
  setSelectedReason,
  customFeedback,
  setCustomFeedback,
  onCancel,
  onSubmit,
  submitting,
}) {
  return (
    <div
      style={{
        marginTop: '24px',
        padding: '18px',
        background: 'var(--bg-card-elevated)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border-light)',
        animation: 'fadeIn .2s ease',
      }}
    >
      <div
        style={{
          fontSize: '.9rem',
          fontWeight: 700,
          color: showRejectForm ? 'var(--danger)' : 'var(--warning)',
          marginBottom: '10px',
        }}
      >
        {showRejectForm ? 'Specify Reason for Rejection' : 'Select Resubmission Requirement'}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
        {REASON_PRESETS.map((preset) => (
          <label
            key={preset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '.82rem',
              cursor: 'pointer',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              background: selectedReason === preset ? 'var(--bg-hover)' : 'transparent',
            }}
          >
            <input
              type="radio"
              name="presetReason"
              checked={selectedReason === preset}
              onChange={() => setSelectedReason(preset)}
            />
            <span>{preset}</span>
          </label>
        ))}
      </div>

      <div className="form-group" style={{ marginBottom: '12px' }}>
        <label className="form-label" style={{ fontSize: '.78rem' }}>
          Additional Feedback Notes (Optional)
        </label>
        <textarea
          className="form-textarea"
          rows={2}
          placeholder="Additional guidance for the tutor on what needs correction..."
          value={customFeedback}
          onChange={(e) => setCustomFeedback(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`btn btn-sm ${showRejectForm ? 'btn-danger' : 'btn-gold'}`}
          disabled={submitting}
          onClick={onSubmit}
        >
          <Send size={14} />
          <span>{showRejectForm ? 'Confirm Rejection' : 'Send Resubmission Request'}</span>
        </button>
      </div>
    </div>
  );
}
