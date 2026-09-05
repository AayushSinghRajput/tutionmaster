import { Link } from 'react-router-dom';
import { ExternalLink, RefreshCw, XCircle, CheckCircle2 } from 'lucide-react';

export default function ReviewDrawerFooter({
  teacherId,
  showResubmitForm,
  showRejectForm,
  onRequestResubmit,
  onReject,
  onApprove,
  submitting,
}) {
  return (
    <div className="drawer-footer">
      <div>
        <Link to={`/teachers/${teacherId}`} className="btn btn-ghost btn-sm" target="_blank">
          <ExternalLink size={14} />
          <span>Full Profile Editor</span>
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        {!showResubmitForm && !showRejectForm && (
          <>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              style={{ color: 'var(--warning)', borderColor: 'var(--warning-border)' }}
              onClick={onRequestResubmit}
            >
              <RefreshCw size={14} />
              <span>Request Resubmission</span>
            </button>

            <button
              type="button"
              className="btn btn-ghost btn-sm"
              style={{ color: 'var(--danger)', borderColor: 'var(--danger-border)' }}
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
            >
              <CheckCircle2 size={16} />
              <span>1-Click Approve & Publish</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
