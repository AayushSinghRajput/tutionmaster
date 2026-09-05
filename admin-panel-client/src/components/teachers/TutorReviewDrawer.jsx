import { useState } from 'react';
import toast from 'react-hot-toast';
import { teacherService } from '../../services/adminServices';
import { REASON_PRESETS } from '../../constants';

import ReviewDrawerHeader from './review/ReviewDrawerHeader';
import ReviewDocumentsTab from './review/ReviewDocumentsTab';
import ReviewProfileTab from './review/ReviewProfileTab';
import ReviewQualificationsTab from './review/ReviewQualificationsTab';
import ReviewActionForm from './review/ReviewActionForm';
import ReviewDrawerFooter from './review/ReviewDrawerFooter';

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

  const tabs = [
    { key: 'documents', label: 'Submitted Documents (CV / ID)' },
    { key: 'profile', label: 'Profile & Bio' },
    { key: 'qualifications', label: 'Qualifications & Subjects' },
  ];

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <ReviewDrawerHeader teacher={teacher} onClose={onClose} />

        {/* Tab Selector */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-input)',
            padding: '0 24px',
            overflowX: 'auto',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '12px 16px',
                border: 'none',
                background: 'none',
                color: activeTab === tab.key ? 'var(--gold-400)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab.key ? '2px solid var(--gold-400)' : '2px solid transparent',
                fontWeight: 600,
                fontSize: '.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {activeTab === 'documents' && <ReviewDocumentsTab teacher={teacher} />}
          {activeTab === 'profile' && <ReviewProfileTab teacher={teacher} />}
          {activeTab === 'qualifications' && <ReviewQualificationsTab teacher={teacher} />}

          {/* Action Expansion: Resubmission or Rejection Reasons */}
          {(showResubmitForm || showRejectForm) && (
            <ReviewActionForm
              showRejectForm={showRejectForm}
              selectedReason={selectedReason}
              setSelectedReason={setSelectedReason}
              customFeedback={customFeedback}
              setCustomFeedback={setCustomFeedback}
              onCancel={() => {
                setShowRejectForm(false);
                setShowResubmitForm(false);
              }}
              onSubmit={() => handleAction(showRejectForm ? 'REJECT' : 'REQUEST_RESUBMISSION')}
              submitting={submitting}
            />
          )}
        </div>

        {/* Drawer Footer Actions */}
        <ReviewDrawerFooter
          teacherId={teacher._id}
          showResubmitForm={showResubmitForm}
          showRejectForm={showRejectForm}
          onRequestResubmit={() => {
            setShowResubmitForm(true);
            setShowRejectForm(false);
          }}
          onReject={() => {
            setShowRejectForm(true);
            setShowResubmitForm(false);
          }}
          onApprove={() => handleAction('APPROVE')}
          submitting={submitting}
        />
      </div>
    </div>
  );
}
