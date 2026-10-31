import { Link } from 'react-router-dom';
import { ExternalLink, RefreshCw, XCircle, CheckCircle2, Mail } from 'lucide-react';

export default function ReviewDrawerFooter({
  teacherId,
  isVerified,
  showResubmitForm,
  showRejectForm,
  onRequestResubmit,
  onReject,
  onApprove,
  onResendNotification,
  submitting,
}) {
  return (
    <div
      className="drawer-footer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <Link
          to={`/teachers/${teacherId}`}
          className="btn btn-ghost btn-sm"
          target="_blank"
          style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          <ExternalLink size={14} />
          <span>Full Profile Editor</span>
        </Link>
        {isVerified && onResendNotification && (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            disabled={submitting}
            onClick={onResendNotification}
            title="Send or resend live profile email notification to tutor"
            style={{
              color: 'var(--gold-400)',
              borderColor: 'var(--border)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <Mail size={14} />
            <span>Resend Live Email</span>
          </button>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }}
      >
        {!showResubmitForm && !showRejectForm && (
          <>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              style={{
                color: 'var(--warning)',
                borderColor: 'var(--warning-border)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              onClick={onRequestResubmit}
            >
              <RefreshCw size={14} />
              <span>Request Resubmit</span>
            </button>

            <button
              type="button"
              className="btn btn-ghost btn-sm"
              style={{
                color: 'var(--danger)',
                borderColor: 'var(--danger-border)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              onClick={onReject}
            >
              <XCircle size={14} />
              <span>Reject</span>
            </button>

            <button
              type="button"
              className="btn btn-success btn-sm"
              disabled={submitting}
              onClick={onApprove}
              style={{
                whiteSpace: 'nowrap',
                flexShrink: 0,
                fontWeight: 600,
                padding: '8px 14px',
              }}
            >
              <CheckCircle2 size={16} />
              <span>{isVerified ? 'Re-Approve & Notify' : 'Approve & Publish'}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
