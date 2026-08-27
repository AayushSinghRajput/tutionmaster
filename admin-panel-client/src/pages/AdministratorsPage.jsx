import { useEffect, useState } from 'react';
import { administratorService } from '../services/adminServices';
import ConfirmModal from '../components/common/ConfirmModal';
import SuperAdminRoute from '../components/common/SuperAdminRoute';
import toast from 'react-hot-toast';

function AddAdminModal({ onClose, onCreated }) {
  const [form, setForm]     = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.'); return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.'); return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.'); return;
    }

    setLoading(true);
    try {
      const res = await administratorService.create({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      toast.success('Administrator created');
      onCreated(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create administrator');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 500 }} onClick={e => e.stopPropagation()}>
        <h3>Add Administrator</h3>
        <p>The new administrator will be able to manage teacher profiles.</p>

        <form onSubmit={handleSubmit}>
          <div className="modal-form-fields">
            {error && (
              <div style={{ color: 'var(--danger)', background: 'var(--danger-bg)', borderRadius: 'var(--radius)', padding: '10px 14px', fontSize: '.83rem' }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="new-admin-name">Full Name</label>
              <input id="new-admin-name" name="name" type="text" className="form-input"
                placeholder="John Doe" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="new-admin-email">Email Address</label>
              <input id="new-admin-email" name="email" type="email" className="form-input"
                placeholder="admin@example.com" value={form.email} onChange={handleChange} required />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="new-admin-pass">Password</label>
                <input id="new-admin-pass" name="password" type="password" className="form-input"
                  placeholder="Min 8 characters" value={form.password} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="new-admin-confirm">Confirm</label>
                <input id="new-admin-confirm" name="confirm" type="password" className="form-input"
                  placeholder="Repeat password" value={form.confirm} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>Cancel</button>
            <button id="create-admin-btn" type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner spinner-sm" /> : 'Create Administrator'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdministratorsPage() {
  const [admins, setAdmins]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showAdd, setShowAdd]     = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [removing, setRemoving]   = useState(false);

  const load = () => {
    setLoading(true);
    administratorService.list()
      .then(res => setAdmins(res.data.data))
      .catch(() => toast.error('Failed to load administrators'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCreated = (admin) => {
    setAdmins(prev => [...prev, admin]);
    setShowAdd(false);
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await administratorService.remove(removeTarget.id);
      toast.success(`${removeTarget.name} has been deactivated`);
      setAdmins(prev => prev.map(a =>
        a.id === removeTarget.id ? { ...a, isActive: false } : a
      ));
      setRemoveTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to remove administrator');
    } finally {
      setRemoving(false);
    }
  };

  return (
    <SuperAdminRoute>
      <>
        <div className="page-header">
          <div>
            <h1>Administrators</h1>
            <p>Manage who has access to the Admin Panel</p>
          </div>
          <button id="add-admin-btn" className="btn btn-primary" onClick={() => setShowAdd(true)}>
            ＋ Add Administrator
          </button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={7}><div className="state-center" style={{ padding: '40px' }}><div className="spinner" /></div></td></tr>
              )}
              {!loading && admins.length === 0 && (
                <tr><td colSpan={7}><div className="state-center"><div className="state-icon">🛡️</div><p>No administrators found</p></div></td></tr>
              )}
              {!loading && admins.map(a => (
                <tr key={a.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: a.isSuperAdmin
                          ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                          : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '.72rem', fontWeight: 700, color: '#fff', flexShrink: 0
                      }}>
                        {a.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <strong style={{ fontSize: '.88rem' }}>{a.name}</strong>
                    </div>
                  </td>
                  <td style={{ fontSize: '.83rem', color: 'var(--text-secondary)' }}>{a.email}</td>
                  <td>
                    <span className={`badge ${a.isSuperAdmin ? 'badge-yellow' : 'badge-blue'}`}>
                      {a.isSuperAdmin ? '⭐ Super Admin' : 'Admin'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${a.isActive ? 'badge-green' : 'badge-red'}`}>
                      {a.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>
                    {a.lastLoginAt ? new Date(a.lastLoginAt).toLocaleDateString() : 'Never'}
                  </td>
                  <td style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>
                    {new Date(a.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    {/* Never show Remove button for Super Admin */}
                    {!a.isSuperAdmin && a.isActive && (
                      <button
                        id={`remove-admin-${a.id}`}
                        className="btn btn-danger btn-sm"
                        onClick={() => setRemoveTarget(a)}
                      >
                        Remove
                      </button>
                    )}
                    {a.isSuperAdmin && (
                      <span style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>Root Admin</span>
                    )}
                    {!a.isSuperAdmin && !a.isActive && (
                      <span className="badge badge-red">Deactivated</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAdd && (
          <AddAdminModal onClose={() => setShowAdd(false)} onCreated={handleCreated} />
        )}

        {removeTarget && (
          <ConfirmModal
            title="Remove Administrator?"
            message={`${removeTarget.name} (${removeTarget.email}) will no longer be able to access the Admin Panel. This action can be reversed by contacting the Super Admin.`}
            confirmLabel="Deactivate"
            confirmClass="btn-danger"
            onConfirm={handleRemove}
            onCancel={() => setRemoveTarget(null)}
            loading={removing}
          />
        )}
      </>
    </SuperAdminRoute>
  );
}
