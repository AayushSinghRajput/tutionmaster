import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { teacherService } from '../../services/adminServices';
import { REASON_PRESETS } from '../../constants';
import {
  CheckCircle2,
  XCircle,
  FileText,
  ExternalLink,
  RefreshCw,
  X,
  Send,
  Download,
} from 'lucide-react';

export default function TutorReviewDrawer({ teacher, onClose, onVerified }) {
  const [activeTab, setActiveTab] = useState('documents'); // 'documents' | 'profile' | 'qualifications'
  const [submitting, setSubmitting] = useState(false);
  const [selectedReason, setSelectedReason] = useState(REASON_PRESETS[0]);
  const [customFeedback, setCustomFeedback] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [showResubmitForm, setShowResubmitForm] = useState(false);

  if (!teacher) return null;

  const handleAction = async (action) => {
    setSubmitting(true);
    try {
      const reason = showResubmitForm || showRejectForm ? selectedReason : undefined;
      const feedbackNotes = customFeedback.trim() || undefined;

      const res = await teacherService.verify(teacher._id, {
        action,
        reason,
        feedbackNotes,
      });

      toast.success(res.data.message || 'Verification status updated');
      onVerified(res.data.data);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update verification status');
    } finally {
      setSubmitting(false);
    }
  };

  const initials =
    teacher.name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'TM';

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {teacher.avatarUrl ? (
              <img
                src={teacher.avatarUrl}
                alt={teacher.name}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  objectFit: 'cover',
                  border: '1px solid var(--border)',
                }}
              />
            ) : (
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, var(--brand-600), var(--brand-700))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {initials}
              </div>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>{teacher.name}</h3>
                <span className={`badge ${teacher.isVisible ? 'badge-verified' : 'badge-pending'}`}>
                  {teacher.isVisible ? 'Verified & Public' : 'Pending Review'}
                </span>
              </div>
              <div style={{ fontSize: '.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {teacher.contact?.email} · {teacher.address?.city || 'Nepal'}
              </div>
            </div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-input)',
            padding: '0 24px',
          }}
        >
          <button
            onClick={() => setActiveTab('documents')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              color: activeTab === 'documents' ? 'var(--gold-400)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'documents' ? '2px solid var(--gold-400)' : '2px solid transparent',
              fontWeight: 600,
              fontSize: '.85rem',
              cursor: 'pointer',
            }}
          >
            Submitted Documents (CV / ID)
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              color: activeTab === 'profile' ? 'var(--gold-400)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'profile' ? '2px solid var(--gold-400)' : '2px solid transparent',
              fontWeight: 600,
              fontSize: '.85rem',
              cursor: 'pointer',
            }}
          >
            Profile & Bio
          </button>
          <button
            onClick={() => setActiveTab('qualifications')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              color: activeTab === 'qualifications' ? 'var(--gold-400)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'qualifications' ? '2px solid var(--gold-400)' : '2px solid transparent',
              fontWeight: 600,
              fontSize: '.85rem',
              cursor: 'pointer',
            }}
          >
            Qualifications & Subjects
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {activeTab === 'documents' && (
            <div>
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

              {/* Verification Checklist */}
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
          )}

          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                    Hourly Rate
                  </div>
                  <div style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--gold-400)', marginTop: '4px' }}>
                    ₨ {teacher.hourlyRate?.toLocaleString() || '0'} / hr
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
                    {teacher.address?.city}, {teacher.address?.state}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qualifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <div
                  style={{
                    fontSize: '.82rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '10px',
                  }}
                >
                  Teaching Subjects ({teacher.preferredSubjects?.length || 0})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(teacher.preferredSubjects || []).map((sub, i) => (
                    <span
                      key={i}
                      className="badge badge-subject"
                      style={{ fontSize: '.82rem', padding: '4px 10px' }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '.82rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '10px',
                  }}
                >
                  Academic Degrees & Qualifications
                </div>
                {(teacher.qualifications || []).map((q, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '14px',
                      background: 'var(--bg-card-elevated)',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--border)',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '.92rem', color: 'var(--text-primary)' }}>
                      {q.degree}
                    </div>
                    <div style={{ fontSize: '.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {q.institution} ({q.year})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Expansion: Resubmission or Rejection Reasons */}
          {(showResubmitForm || showRejectForm) && (
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
                  onClick={() => {
                    setShowRejectForm(false);
                    setShowResubmitForm(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${showRejectForm ? 'btn-danger' : 'btn-gold'}`}
                  disabled={submitting}
                  onClick={() => handleAction(showRejectForm ? 'REJECT' : 'REQUEST_RESUBMISSION')}
                >
                  <Send size={14} />
                  <span>{showRejectForm ? 'Confirm Rejection' : 'Send Resubmission Request'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="drawer-footer">
          <div>
            <Link to={`/teachers/${teacher._id}`} className="btn btn-ghost btn-sm" target="_blank">
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
                  onClick={() => {
                    setShowResubmitForm(true);
                    setShowRejectForm(false);
                  }}
                >
                  <RefreshCw size={14} />
                  <span>Request Resubmission</span>
                </button>

                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'var(--danger)', borderColor: 'var(--danger-border)' }}
                  onClick={() => {
                    setShowRejectForm(true);
                    setShowResubmitForm(false);
                  }}
                >
                  <XCircle size={14} />
                  <span>Reject</span>
                </button>

                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  disabled={submitting}
                  onClick={() => handleAction('APPROVE')}
                >
                  <CheckCircle2 size={16} />
                  <span>1-Click Approve & Publish</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
