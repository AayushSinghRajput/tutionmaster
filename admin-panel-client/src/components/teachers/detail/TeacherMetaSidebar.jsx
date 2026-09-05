import { useState } from 'react';
import { Info, Calendar, Clock, Eye, FileText, ExternalLink, Hash, Check, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TeacherMetaSidebar({ teacher }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key, label) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formatDate = (d) => {
    if (!d) return null;
    return new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* CV Box if exists */}
      {teacher.cvUrl && (
        <div className="cv-action-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(138, 56, 97, 0.25)',
                color: 'var(--brand-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>
                Curriculum Vitae (CV)
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Uploaded PDF / Document
              </div>
            </div>
          </div>

          <a
            href={teacher.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            style={{ gap: 6, flexShrink: 0 }}
          >
            <ExternalLink size={13} />
            <span>Open</span>
          </a>
        </div>
      )}

      {/* System Metadata Card */}
      <div className="detail-section-card">
        <div className="detail-card-header">
          <div className="detail-card-header-left">
            <div className="detail-card-header-icon">
              <Info size={18} />
            </div>
            <h3 className="detail-card-title">System & Audit Info</h3>
          </div>
        </div>

        <div className="detail-card-body">
          <div className="interactive-data-list">
            {/* Teacher Mongo ID */}
            <div className="interactive-data-item">
              <div className="interactive-data-left">
                <Hash size={15} />
                <span>Profile ID</span>
              </div>
              <div className="interactive-data-value">
                <span style={{ fontSize: '0.76rem', fontFamily: 'monospace' }}>
                  {teacher._id?.slice(-8)}
                </span>
                <button
                  type="button"
                  className="copy-mini-btn"
                  onClick={() => handleCopy(teacher._id, 'profileId', 'Profile ID')}
                  title="Copy full ID"
                >
                  {copiedKey === 'profileId' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Created At */}
            <div className="interactive-data-item">
              <div className="interactive-data-left">
                <Calendar size={15} />
                <span>Created</span>
              </div>
              <div className="interactive-data-value">
                {formatDate(teacher.createdAt) || '—'}
              </div>
            </div>

            {/* Updated At */}
            <div className="interactive-data-item">
              <div className="interactive-data-left">
                <Clock size={15} />
                <span>Last Updated</span>
              </div>
              <div className="interactive-data-value">
                {formatDate(teacher.updatedAt) || '—'}
              </div>
            </div>

            {/* Visibility Updated At */}
            {teacher.visibilityUpdatedAt && (
              <div className="interactive-data-item">
                <div className="interactive-data-left">
                  <Eye size={15} />
                  <span>Visibility Set</span>
                </div>
                <div className="interactive-data-value">
                  {formatDate(teacher.visibilityUpdatedAt)}
                </div>
              </div>
            )}

            {/* Profile Views */}
            <div className="interactive-data-item">
              <div className="interactive-data-left">
                <Eye size={15} />
                <span>Total Views</span>
              </div>
              <div className="interactive-data-value">
                {teacher.profileViews || 0}
              </div>
            </div>

            {/* Creation Source */}
            <div className="interactive-data-item">
              <div className="interactive-data-left">
                <span>Source</span>
              </div>
              <div className="interactive-data-value">
                <span className={`badge ${teacher.isManuallyCreatedByAdmin ? 'badge-gold' : 'badge-verified'}`}>
                  {teacher.isManuallyCreatedByAdmin ? 'Manual Admin Entry' : 'Teacher Self-Register'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
