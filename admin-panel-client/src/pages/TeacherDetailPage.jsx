import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { teacherService } from '../services/adminServices';
import ConfirmModal from '../components/common/ConfirmModal';
import toast from 'react-hot-toast';

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
          hourlyRate: d.hourlyRate || 0,
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
              <span>💰 ₹{t.hourlyRate}/hr</span>
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
                    <strong>{q.degree}</strong> — {q.institution} ({q.year})
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ maxWidth: '650px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '24px' }}>
            <h3 style={{ marginBottom: '16px' }}>✏️ Edit Tutor Profile</h3>
            <form onSubmit={handleSaveEdit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label className="form-label" style={{ fontWeight: 600 }}>Full Name</label>
                  <input type="text" className="form-control" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} required />
                </div>
                <div>
                  <label className="form-label" style={{ fontWeight: 600 }}>Phone</label>
                  <input type="text" className="form-control" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label className="form-label" style={{ fontWeight: 600 }}>City</label>
                  <input type="text" className="form-control" value={editForm.city} onChange={e => setEditForm({ ...editForm, city: e.target.value })} required />
                </div>
                <div>
                  <label className="form-label" style={{ fontWeight: 600 }}>State / Region</label>
                  <input type="text" className="form-control" value={editForm.state} onChange={e => setEditForm({ ...editForm, state: e.target.value })} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Preferred Subjects (comma-separated)</label>
                <input type="text" className="form-control" value={editForm.preferredSubjects} onChange={e => setEditForm({ ...editForm, preferredSubjects: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label className="form-label" style={{ fontWeight: 600 }}>Teaching Mode</label>
                  <select className="form-control" value={editForm.teachingMode} onChange={e => setEditForm({ ...editForm, teachingMode: e.target.value })}>
                    <option value="In-person">In-person</option>
                    <option value="Online">Online</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" style={{ fontWeight: 600 }}>Hourly Rate (₨)</label>
                  <input type="number" className="form-control" value={editForm.hourlyRate} onChange={e => setEditForm({ ...editForm, hourlyRate: e.target.value })} />
                </div>
                <div>
                  <label className="form-label" style={{ fontWeight: 600 }}>Experience (Yrs)</label>
                  <input type="number" className="form-control" value={editForm.experience} onChange={e => setEditForm({ ...editForm, experience: e.target.value })} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Cloudinary Avatar Public ID / Image URL</label>
                <input type="text" className="form-control" placeholder="e.g. tutionmaster/avatars/user123" value={editForm.avatarPublicId} onChange={e => setEditForm({ ...editForm, avatarPublicId: e.target.value })} />
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Bio / Summary</label>
                <textarea className="form-control" rows="3" value={editForm.bio} onChange={e => setEditForm({ ...editForm, bio: e.target.value })} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
