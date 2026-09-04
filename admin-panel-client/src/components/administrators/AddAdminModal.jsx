import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { administratorService } from '../../services/adminServices';
import { CheckCircle2, UserCheck, Shield } from 'lucide-react';

export default function AddAdminModal({ onClose, onCreated }) {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await administratorService.getUsers();
      setUsers(res.data.data || []);
    } catch {
      // Non-blocking: user can still type manually
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleUserSelect = (e) => {
    const uId = e.target.value;
    setSelectedUserId(uId);
    if (!uId) {
      return;
    }
    const selected = users.find((u) => u.id === uId);
    if (selected) {
      setForm((prev) => ({
        ...prev,
        name: selected.name,
        email: selected.email,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await administratorService.create({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      toast.success('Administrator created successfully');
      onCreated(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create administrator');
    } finally {
      setLoading(false);
    }
  };

  const selectedUser = users.find((u) => u.id === selectedUserId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'rgba(138, 56, 97, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-300)',
            }}
          >
            <Shield size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Add Administrator</h3>
            <p style={{ margin: 0, fontSize: '.8rem', color: 'var(--text-muted)' }}>
              Grant platform administration privileges to a registered user
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
          <div className="modal-form-fields">
            {error && (
              <div
                style={{
                  color: 'var(--danger)',
                  background: 'var(--danger-bg)',
                  borderRadius: 'var(--radius)',
                  padding: '10px 14px',
                  fontSize: '.83rem',
                }}
              >
                {error}
              </div>
            )}

            {/* Select User Dropdown */}
            <div className="form-group">
              <label className="form-label" htmlFor="user-select-dropdown">
                Select Registered User (Full Name)
              </label>
              {loadingUsers ? (
                <div
                  style={{
                    padding: '8px 12px',
                    background: 'var(--bg-input)',
                    borderRadius: 'var(--radius)',
                    fontSize: '.84rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Loading registered users...
                </div>
              ) : (
                <select
                  id="user-select-dropdown"
                  className="form-select"
                  value={selectedUserId}
                  onChange={handleUserSelect}
                >
                  <option value="">-- Choose registered user to autofill details --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {selectedUser && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: 'rgba(47, 122, 94, 0.12)',
                  border: '1px solid rgba(47, 122, 94, 0.35)',
                  borderRadius: 'var(--radius)',
                  fontSize: '.82rem',
                  color: 'var(--text-primary)',
                }}
              >
                <CheckCircle2 size={16} color="var(--success-light)" />
                <span>
                  Selected User: <strong>{selectedUser.name}</strong> · Email autofilled
                </span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="new-admin-name">
                Full Name *
              </label>
              <input
                id="new-admin-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="e.g. Ramesh Karki"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="new-admin-email">
                Email Address (Auto-filled on selection) *
              </label>
              <input
                id="new-admin-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="admin@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="new-admin-pass">
                  Password *
                </label>
                <input
                  id="new-admin-pass"
                  name="password"
                  type="password"
                  className="form-input"
                  placeholder="Min 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="new-admin-confirm">
                  Confirm Password *
                </label>
                <input
                  id="new-admin-confirm"
                  name="confirm"
                  type="password"
                  className="form-input"
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal-actions" style={{ marginTop: '18px' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button id="create-admin-btn" type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner spinner-sm" /> : 'Create Administrator'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
