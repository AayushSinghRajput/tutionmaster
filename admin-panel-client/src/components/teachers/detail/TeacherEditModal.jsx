import { useState, useEffect, useRef } from 'react';
import {
  Edit3,
  X,
  User,
  MapPin,
  BookOpen,
  Image as ImageIcon,
  FileText,
  Upload,
  Trash2,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { teacherService } from '../../../services/adminServices';
import NepaliRupeeIcon from '../../common/NepaliRupeeIcon';

export default function TeacherEditModal({ teacher, onClose, onSaveSuccess }) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    street: '',
    email: '',
    phone: '',
    preferredSubjects: '',
    bio: '',
    experience: 0,
    monthlyRate: 8000,
    hourlyRate: 400,
    teachingMode: 'In-person',
    avatarPublicId: '',
    cvPublicId: '',
  });

  // Local file state
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  const avatarInputRef = useRef(null);
  const cvInputRef = useRef(null);

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || '',
        city: teacher.address?.city || '',
        state: teacher.address?.state || '',
        street: teacher.address?.street || '',
        email: teacher.contact?.email || '',
        phone: teacher.contact?.phone || '',
        preferredSubjects: Array.isArray(teacher.preferredSubjects)
          ? teacher.preferredSubjects.join(', ')
          : '',
        bio: teacher.bio || '',
        experience: teacher.experience ?? 0,
        monthlyRate: teacher.monthlyRate ?? (teacher.hourlyRate ? teacher.hourlyRate * 20 : 8000),
        hourlyRate: teacher.hourlyRate ?? Math.round((teacher.monthlyRate || 8000) / 20),
        teachingMode: teacher.teachingMode || 'In-person',
        avatarPublicId: teacher.avatarPublicId || '',
        cvPublicId: teacher.cvPublicId || '',
      });
      setAvatarPreview(teacher.avatarUrl || null);
    }
  }, [teacher]);

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be under 5MB.');
      return;
    }

    setAvatarFile(file);
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);
  };

  const handleClearAvatarFile = () => {
    setAvatarFile(null);
    setAvatarPreview(teacher.avatarUrl || null);
    if (avatarInputRef.current) avatarInputRef.current.value = '';
  };

  // Handle CV file selection
  const handleCvChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      toast.error('Please select a valid PDF document for the CV.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('CV file size must be under 10MB.');
      return;
    }

    setCvFile(file);
  };

  const handleClearCvFile = () => {
    setCvFile(null);
    if (cvInputRef.current) cvInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Build FormData payload
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('city', formData.city);
      payload.append('state', formData.state);
      payload.append('street', formData.street);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('preferredSubjects', formData.preferredSubjects);
      payload.append('bio', formData.bio);
      payload.append('experience', formData.experience);
      payload.append('monthlyRate', formData.monthlyRate);
      payload.append('hourlyRate', formData.hourlyRate);
      payload.append('teachingMode', formData.teachingMode);

      if (formData.avatarPublicId) {
        payload.append('avatarPublicId', formData.avatarPublicId);
      }
      if (formData.cvPublicId) {
        payload.append('cvPublicId', formData.cvPublicId);
      }

      // Append files if selected
      if (avatarFile) {
        payload.append('avatar', avatarFile);
      }
      if (cvFile) {
        payload.append('cv', cvFile);
      }

      const res = await teacherService.update(teacher._id, payload);
      toast.success('Teacher profile, photo & CV updated successfully!');
      onSaveSuccess(res.data.data);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        style={{
          maxWidth: '780px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '12px',
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
              <h3 className="modal-title" style={{ margin: 0, fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>
                Edit Tutor Profile & Media
              </h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Update info, replace profile picture, and upload new CV for {teacher.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Section: Profile Picture & CV Uploaders */}
          <div
            style={{
              padding: '16px',
              background: 'var(--bg-input)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold-400)', letterSpacing: '0.04em' }}>
              Media & Documents (Avatar & CV)
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {/* Profile Picture Uploader */}
              <div
                style={{
                  padding: '14px',
                  background: 'var(--bg-card-elevated)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>
                  <ImageIcon size={15} color="var(--brand-300)" />
                  <span>Profile Photo / Avatar</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Preview Container */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 14,
                          objectFit: 'cover',
                          border: '2px solid var(--brand-400)',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 14,
                          background: 'var(--bg-hover)',
                          border: '1px dashed var(--border-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <ImageIcon size={22} />
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 0 }}>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/jpg"
                      onChange={handleAvatarChange}
                      style={{ display: 'none' }}
                      id="avatar-file-upload"
                    />

                    <label
                      htmlFor="avatar-file-upload"
                      className="btn btn-ghost btn-sm"
                      style={{ cursor: 'pointer', justifyContent: 'center', gap: 6 }}
                    >
                      <Upload size={13} />
                      <span>{avatarFile ? 'Change Photo' : 'Upload New Photo'}</span>
                    </label>

                    {avatarFile && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--success-light)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          ✓ {avatarFile.name}
                        </span>
                        <button
                          type="button"
                          className="copy-mini-btn"
                          onClick={handleClearAvatarFile}
                          title="Cancel photo selection"
                        >
                          <Trash2 size={13} color="var(--danger)" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CV Document Uploader */}
              <div
                style={{
                  padding: '14px',
                  background: 'var(--bg-card-elevated)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>
                    <FileText size={15} color="var(--gold-400)" />
                    <span>Curriculum Vitae (PDF)</span>
                  </div>

                  {teacher.cvUrl && !cvFile && (
                    <a
                      href={teacher.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.74rem', color: 'var(--gold-300)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 3 }}
                    >
                      <span>Current CV</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <input
                    ref={cvInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleCvChange}
                    style={{ display: 'none' }}
                    id="cv-file-upload"
                  />

                  <label
                    htmlFor="cv-file-upload"
                    className="btn btn-ghost btn-sm"
                    style={{ cursor: 'pointer', justifyContent: 'center', gap: 6 }}
                  >
                    <Upload size={13} />
                    <span>{cvFile ? 'Replace PDF File' : 'Upload New CV (PDF)'}</span>
                  </label>

                  {cvFile ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--success-light)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        ✓ {cvFile.name} ({(cvFile.size / 1024).toFixed(0)} KB)
                      </span>
                      <button
                        type="button"
                        className="copy-mini-btn"
                        onClick={handleClearCvFile}
                        title="Cancel CV selection"
                      >
                        <Trash2 size={13} color="var(--danger)" />
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {teacher.cvPublicId ? '✓ Existing CV document uploaded' : 'No CV currently on file'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Personal & Contact Information */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <User size={14} color="var(--brand-300)" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tutor's Full Name"
                required
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Contact Phone</label>
              <input
                type="tel"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+977 98XXXXXXXX"
              />
            </div>
          </div>

          {/* Location Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={14} color="var(--gold-300)" />
                <span>City *</span>
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Kathmandu"
                required
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">State / Province</label>
              <input
                type="text"
                className="form-input"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="e.g. Bagmati Province"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Street Address</label>
              <input
                type="text"
                className="form-input"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="e.g. Baneshwor"
              />
            </div>
          </div>

          {/* Preferred Subjects */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <BookOpen size={14} color="var(--brand-300)" />
              <span>Preferred Subjects (Comma-separated) *</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.preferredSubjects}
              onChange={(e) => setFormData({ ...formData, preferredSubjects: e.target.value })}
              placeholder="e.g. Mathematics, Physics, Chemistry, Science"
              required
            />
          </div>

          {/* Teaching Mode, Monthly Fee, Experience */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Teaching Mode</label>
              <select
                className="form-select"
                value={formData.teachingMode}
                onChange={(e) => setFormData({ ...formData, teachingMode: e.target.value })}
              >
                <option value="In-person">In-person (Physical)</option>
                <option value="Online">Online Only</option>
                <option value="Both">Both (Hybrid)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <NepaliRupeeIcon size={14} color="var(--success-light)" />
                <span>Monthly Fee (₨ / mo) *</span>
              </label>
              <input
                type="number"
                min="500"
                max="200000"
                step="500"
                className="form-input"
                value={formData.monthlyRate}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({
                    ...formData,
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
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </div>
          </div>

          {/* Bio / Summary */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <FileText size={14} color="var(--gold-400)" />
              <span>Bio & Summary</span>
            </label>
            <textarea
              className="form-textarea"
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tutor's background, teaching philosophy, and specializations..."
            />
          </div>

          {/* Form Actions */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              paddingTop: '16px',
              marginTop: '8px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
              style={{ gap: 6 }}
            >
              {saving ? (
                <>
                  <span className="spinner spinner-sm" />
                  <span>Uploading & Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={15} />
                  <span>Save Profile Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
