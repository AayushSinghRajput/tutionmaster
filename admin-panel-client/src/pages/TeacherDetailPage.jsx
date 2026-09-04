import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { teacherService } from '../services/adminServices';
import ConfirmModal from '../components/common/ConfirmModal';
import toast from 'react-hot-toast';
import { Edit3, X } from 'lucide-react';

function DetailRow({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="detail-row">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function TeacherDetailPage() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [confirm, setConfirm] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    teacherService.get(id)
      .then(res => {
        const d = res.data.data;
        setTeacher(d);
        setEditForm({
          name: d.name || '',
          city: d.address?.city || '',
          state: d.address?.state || '',
          street: d.address?.street || '',
          email: d.contact?.email || '',
          phone: d.contact?.phone || '',
          preferredSubjects: Array.isArray(d.preferredSubjects) ? d.preferredSubjects.join(', ') : '',
          bio: d.bio || '',
          experience: d.experience || 0,
          monthlyRate: d.monthlyRate || (d.hourlyRate ? d.hourlyRate * 20 : 8000),
          hourlyRate: d.hourlyRate || Math.round((d.monthlyRate || 8000) / 20),
          teachingMode: d.teachingMode || 'In-person',
          avatarPublicId: d.avatarPublicId || '',
        });
      })
      .catch(() => setError('Teacher not found or failed to load.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await teacherService.update(id, editForm);
      setTeacher(res.data.data);
      setEditing(false);
      toast.success('Teacher profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async () => {
    setToggling(true);
    setConfirm(false);
    try {
      const newVal = !teacher.isVisible;
      await teacherService.setVisibility(id, newVal);
      setTeacher(t => ({ ...t, isVisible: newVal }));
      toast.success(newVal ? 'Profile is now public' : 'Profile is now hidden');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update visibility');
    } finally {
      setToggling(false);
    }
  };

  if (loading) return (
    <div className="state-center"><div className="spinner" /></div>
  );

  if (error) return (
    <div className="state-center">
      <div className="state-icon">⚠️</div>
      <p>{error}</p>
      <Link to="/teachers" className="btn btn-ghost btn-sm">← Back to Teachers</Link>
    </div>
  );

  const t = teacher;
  const initials = t.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/teachers">Teacher Profiles</Link>
        <span>/</span>
        <span>{t.name}</span>
      </div>

      {/* Hero */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="detail-hero">
          {t.avatarUrl
            ? <img src={t.avatarUrl} alt={t.name} className="hero-avatar" />
            : <div className="hero-initials">{initials}</div>
          }
          <div className="hero-info" style={{ flex: 1 }}>
            <h2>{t.name}</h2>
            <div className="meta">
              <span>📍 {t.address?.city}, {t.address?.state}</span>
              <span>💼 {t.experience} yr{t.experience !== 1 ? 's' : ''} exp.</span>
              <span>💰 ₨ {(t.monthlyRate ?? (t.hourlyRate ? t.hourlyRate * 20 : 0)).toLocaleString()}/month</span>
              {t.teachingMode && <span>🖥️ {t.teachingMode}</span>}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className={`badge ${t.isActive ? 'badge-green' : 'badge-red'}`}>
                {t.isActive ? 'Active' : 'Inactive'}
              </span>
              <span className={`badge ${t.isVisible ? 'badge-green' : 'badge-gray'}`}>
                {t.isVisible ? '👁️ Public' : '🙈 Hidden'}
              </span>

              <button
                id="toggle-visibility-btn"
                className={`btn btn-sm ${t.isVisible ? 'btn-danger' : 'btn-success'}`}
                onClick={() => setConfirm(true)}
                disabled={toggling}
              >
                {toggling
                  ? <span className="spinner spinner-sm" />
                  : t.isVisible ? '🙈 Hide Profile' : '👁️ Make Public'
                }
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setEditing(true)}
              >
                ✏️ Edit Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail grid */}
      <div className="detail-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Bio */}
          {t.bio && (
            <div className="card card-sm">
              <div className="detail-section">
                <h4>Bio</h4>
                <p style={{ fontSize: '.86rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>{t.bio}</p>
              </div>
            </div>
          )}

          {/* Subjects */}
          <div className="card card-sm">
            <div className="detail-section">
              <h4>Subjects</h4>
              <div className="chips">
                {(t.preferredSubjects || []).map(s => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Qualifications */}
          {t.qualifications?.length > 0 && (
            <div className="card card-sm">
              <div className="detail-section">
                <h4>Qualifications</h4>
                {t.qualifications.map((q, i) => (
                  <div key={i} style={{ marginBottom: '8px', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: '.84rem' }}>
                    <strong>{q.degree}</strong> — {q.institution}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Availability */}
          {t.availability?.length > 0 && (
            <div className="card card-sm">
              <div className="detail-section">
                <h4>Availability</h4>
                <div className="chips">
                  {t.availability.map(day => (
                    <span key={day} className="chip">{day}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card card-sm">
            <div className="detail-section">
              <h4>Contact</h4>
              <DetailRow label="Email"  value={t.contact?.email} />
              <DetailRow label="Phone"  value={t.contact?.phone} />
            </div>
          </div>

          <div className="card card-sm">
            <div className="detail-section">
              <h4>Address</h4>
              <DetailRow label="Street"  value={t.address?.street} />
              <DetailRow label="City"    value={t.address?.city} />
              <DetailRow label="State"   value={t.address?.state} />
              <DetailRow label="ZIP"     value={t.address?.zipCode} />
            </div>
          </div>

          <div className="card card-sm">
            <div className="detail-section">
              <h4>Profile Meta</h4>
              <DetailRow label="Created" value={t.createdAt ? new Date(t.createdAt).toLocaleDateString() : null} />
              <DetailRow label="Updated" value={t.updatedAt ? new Date(t.updatedAt).toLocaleDateString() : null} />
              {t.visibilityUpdatedAt && (
                <DetailRow label="Visibility set" value={new Date(t.visibilityUpdatedAt).toLocaleDateString()} />
              )}
            </div>
          </div>

          {t.cvUrl && (
            <a
              href={t.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ justifyContent: 'center' }}
            >
              📄 View CV
            </a>
          )}
        </div>
      </div>

      {/* Confirm modal */}
      {confirm && (
        <ConfirmModal
          title={t.isVisible ? 'Hide this profile?' : 'Make this profile public?'}
          message={
            t.isVisible
              ? `${t.name}'s profile will be hidden from the public /teachers page.`
              : `${t.name}'s profile will become visible on the public /teachers page.`
          }
          confirmLabel={t.isVisible ? 'Hide' : 'Make Public'}
          confirmClass={t.isVisible ? 'btn-danger' : 'btn-success'}
          onConfirm={handleToggle}
          onCancel={() => setConfirm(false)}
          loading={toggling}
        />
      )}

      {/* Edit Profile Modal */}
      {editing && (
        <div className="modal-backdrop" onClick={() => setEditing(false)}>
          <div
            className="modal-box"
            style={{ maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'rgba(138, 56, 97, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-300)',
                  }}
                >
                  <Edit3 size={20} />
                </div>
                <div>
                  <h3 className="modal-title" style={{ margin: 0, fontSize: '1.2rem' }}>
                    Edit Tutor Profile
                  </h3>
                  <p style={{ margin: 0, fontSize: '.8rem', color: 'var(--text-muted)' }}>
                    Update contact info, location, fee, and credentials for {t.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-icon"
                onClick={() => setEditing(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              {/* Personal & Contact Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Contact Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>
              </div>

              {/* Location Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editForm.city || ''}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    placeholder="e.g. Kathmandu"
                    required
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">State / Province</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editForm.state || ''}
                    onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                    placeholder="e.g. Bagmati Province"
                  />
                </div>
              </div>

              {/* Preferred Subjects */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Preferred Subjects (Comma-separated) *</label>
                <input
                  type="text"
                  className="form-input"
                  value={editForm.preferredSubjects || ''}
                  onChange={(e) => setEditForm({ ...editForm, preferredSubjects: e.target.value })}
                  placeholder="Mathematics, Physics, Science"
                  required
                />
              </div>

              {/* Teaching Mode, Monthly Fee, Experience */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Teaching Mode</label>
                  <select
                    className="form-select"
                    value={editForm.teachingMode || 'In-person'}
                    onChange={(e) => setEditForm({ ...editForm, teachingMode: e.target.value })}
                  >
                    <option value="In-person">In-person (Physical)</option>
                    <option value="Online">Online Only</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Monthly Fee (NPR / mo) *</label>
                  <input
                    type="number"
                    min="500"
                    max="200000"
                    step="500"
                    className="form-input"
                    value={editForm.monthlyRate ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditForm({
                        ...editForm,
                        monthlyRate: val,
                        hourlyRate: val ? Math.round(Number(val) / 20) : '',
                      });
                    }}
                    required
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Experience (Years)</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    className="form-input"
                    value={editForm.experience ?? ''}
                    onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                  />
                </div>
              </div>

              {/* Avatar Public ID */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Cloudinary Avatar Public ID / Image URL</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. tutionmaster/avatars/user123"
                  value={editForm.avatarPublicId || ''}
                  onChange={(e) => setEditForm({ ...editForm, avatarPublicId: e.target.value })}
                />
              </div>

              {/* Bio */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Bio / Summary</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={editForm.bio || ''}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Tutor's background, teaching philosophy, and specializations..."
                />
              </div>

              {/* Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
