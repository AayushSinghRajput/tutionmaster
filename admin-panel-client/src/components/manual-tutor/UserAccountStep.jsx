import { UserCheck, CheckCircle2 } from 'lucide-react';

export default function UserAccountStep({
  loadingUsers,
  unonboardedUsers,
  selectedUserId,
  onUserChange,
  selectedUserData,
}) {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: 'rgba(138, 56, 97, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-300)',
          }}
        >
          <UserCheck size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
            Step 1: Link Unonboarded User Account
          </h3>
          <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Select an existing registered account with role 'teacher' that hasn't completed profile onboarding
          </p>
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '14px' }}>
        <label className="form-label">Select User Account *</label>
        {loadingUsers ? (
          <div className="state-loading" style={{ padding: '10px 0' }}>
            <span className="spinner spinner-sm" /> Loading accounts...
          </div>
        ) : unonboardedUsers.length === 0 ? (
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(189, 138, 46, 0.1)',
              border: '1px solid rgba(189, 138, 46, 0.3)',
              borderRadius: 'var(--radius)',
              fontSize: '.85rem',
              color: 'var(--gold-300)',
            }}
          >
            No unonboarded teacher accounts found. All registered users currently have completed profiles or none are registered yet.
          </div>
        ) : (
          <select
            className="form-select"
            value={selectedUserId}
            onChange={onUserChange}
            required
          >
            {unonboardedUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email}) — Registered {new Date(u.createdAt).toLocaleDateString()}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedUserData && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            background: 'rgba(47, 122, 94, 0.12)',
            border: '1px solid rgba(47, 122, 94, 0.35)',
            borderRadius: 'var(--radius)',
            fontSize: '.82rem',
            color: 'var(--text-primary)',
          }}
        >
          <CheckCircle2 size={16} color="var(--success-light)" />
          <span>
            Account Linked: <strong>{selectedUserData.name}</strong> ({selectedUserData.email}) · Created on{' '}
            {new Date(selectedUserData.createdAt).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
}
