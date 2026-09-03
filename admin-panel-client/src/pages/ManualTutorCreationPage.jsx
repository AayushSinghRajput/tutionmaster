import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { teacherService } from '../services/adminServices';

export default function ManualTutorCreationPage() {
  const navigate = useNavigate();
  const [unonboardedUsers, setUnonboardedUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userSearch, setUserSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: 'Kathmandu',
    state: 'Bagmati',
    degree: 'Bachelors in Education',
    institution: 'Tribhuvan University',
    year: 2022,
    preferredSubjects: 'Mathematics, Science',
    bio: 'Dedicated tutor with experience in interactive teaching and personalized academic support for students.',
    experience: 2,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    teachingMode: 'In-person',
    hourlyRate: 600,
    publishImmediately: true,
    sendNotification: true,
  });

  useEffect(() => {
    fetchUnonboardedUsers();
  }, []);

  const fetchUnonboardedUsers = async (query = '') => {
    setLoadingUsers(true);
    try {
      const res = await teacherService.getUnonboardedUsers({ search: query });
      setUnonboardedUsers(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load unonboarded users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleUserSelect = (u) => {
    setSelectedUser(u);
    setFormData((prev) => ({
      ...prev,
      name: u.name,
      email: u.email,
    }));
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const exists = prev.availability.includes(day);
      return {
        ...prev,
        availability: exists
          ? prev.availability.filter((d) => d !== day)
          : [...prev.availability, day],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      toast.error('Please select an unonboarded user account first');
      return;
    }
    if (!formData.name.trim()) {
      toast.error('Full Name is required');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        userId: selectedUser.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        street: formData.street || 'Central Area',
        city: formData.city,
        state: formData.state,
        qualifications: [
          {
            degree: formData.degree,
            institution: formData.institution,
            year: Number(formData.year) || 2022,
          },
        ],
        preferredSubjects: formData.preferredSubjects
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        bio: formData.bio,
        experience: Number(formData.experience) || 1,
        availability: formData.availability,
        teachingMode: formData.teachingMode,
        hourlyRate: Number(formData.hourlyRate) || 500,
        publishImmediately: formData.publishImmediately,
        sendNotification: formData.sendNotification,
      };

      await teacherService.createManual(payload);
      toast.success(
        formData.sendNotification
          ? 'Tutor profile created & notification email sent!'
          : 'Tutor profile created successfully!'
      );
      navigate('/teachers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create tutor profile');
    } finally {
      setSubmitting(false);
    }
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/teachers" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Teachers
          </Link>
          <h1 style={{ marginTop: '8px' }}>🛠️ Create Tutor Profile for Registered User</h1>
          <p>Manually onboard registered users who haven't completed their tutor profile.</p>
        </div>
      </div>

      <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>1. Select Registered Unonboarded User</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search unonboarded user by name or email..."
            value={userSearch}
            onChange={(e) => {
              setUserSearch(e.target.value);
              fetchUnonboardedUsers(e.target.value);
            }}
          />
        </div>

        {loadingUsers ? (
          <div style={{ padding: '20px', textAlign: 'center' }}><div className="spinner" /></div>
        ) : unonboardedUsers.length === 0 ? (
          <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
            No unonboarded user accounts found. All registered users have tutor profiles!
          </div>
        ) : (
          <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '8px' }}>
            {unonboardedUsers.map((u) => {
              const isSelected = selectedUser?.id === u.id;
              return (
                <div
                  key={u.id}
                  onClick={() => handleUserSelect(u)}
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>{u.name}</strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.email}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className={`badge ${u.authProvider === 'google' ? 'badge-info' : 'badge-secondary'}`}>
                      {u.authProvider === 'google' ? '🌐 Google OAuth' : '✉️ Email/Password'}
                    </span>
                    {isSelected && <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓ Selected</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedUser && (
        <form onSubmit={handleSubmit} className="card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '16px', borderBottom: '1px solid var(--border)', pb: '8px' }}>
            2. Complete Tutor Profile Details
          </h3>

          {/* Personal Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Tutor Full Name *</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Email Address (Read-only)</label>
              <input type="email" className="form-control" value={formData.email} disabled />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="+977 98XXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Location */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>City *</label>
              <input
                type="text"
                className="form-control"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>State / Region</label>
              <input
                type="text"
                className="form-control"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Street / Neighborhood</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Baneshwor"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              />
            </div>
          </div>

          {/* Academic Qualifications */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Degree / Qualification *</label>
              <input
                type="text"
                className="form-control"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Institution *</label>
              <input
                type="text"
                className="form-control"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Graduation Year</label>
              <input
                type="number"
                className="form-control"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              />
            </div>
          </div>

          {/* Teaching Parameters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Preferred Subjects (comma-separated) *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Mathematics, Physics, Chemistry"
                value={formData.preferredSubjects}
                onChange={(e) => setFormData({ ...formData, preferredSubjects: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Teaching Mode</label>
              <select
                className="form-control"
                value={formData.teachingMode}
                onChange={(e) => setFormData({ ...formData, teachingMode: e.target.value })}
              >
                <option value="In-person">In-person (Home Tuition)</option>
                <option value="Online">Online Only</option>
                <option value="Both">Both (In-person & Online)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Hourly Rate (NPR / hr) *</label>
              <input
                type="number"
                className="form-control"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Experience (Years)</label>
              <input
                type="number"
                className="form-control"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </div>
          </div>

          {/* Availability */}
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ fontWeight: 600 }}>Weekly Availability</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
              {daysOfWeek.map((day) => {
                const checked = formData.availability.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day)}
                    className={`btn ${checked ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '13px', padding: '6px 12px' }}
                  >
                    {checked ? '✓ ' : ''}{day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bio */}
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ fontWeight: 600 }}>Bio / Summary</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          {/* Admin Action Controls */}
          <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: '8px', marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>⚙️ Publication & Notification Settings</h4>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.publishImmediately}
                onChange={(e) => setFormData({ ...formData, publishImmediately: e.target.checked })}
              />
              <span>Publish profile immediately to public tutor list (`isVisible: true`)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.sendNotification}
                onChange={(e) => setFormData({ ...formData, sendNotification: e.target.checked })}
              />
              <span>Send automated onboarding email to tutor with custom login instructions</span>
            </label>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" className="btn btn-ghost" onClick={() => navigate('/teachers')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              🚀 {submitting ? 'Creating Profile...' : 'Create & Publish Tutor Profile'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
