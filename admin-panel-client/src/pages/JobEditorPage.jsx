import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jobAdminService } from '../services/jobAdminService';
import {
  JOB_TYPES,
  JOB_STATUS_OPTIONS as STATUS_OPTIONS,
  SALARY_PRESETS,
} from '../constants';
import {
  Briefcase,
  ArrowLeft,
  Save,
  Send,
  DollarSign,
  MapPin,
  FileText,
  Lock,
  Unlock,
} from 'lucide-react';

export default function JobEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!isEditing);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    location: 'Kathmandu',
    jobType: 'Home Tuition',
    subject: '',
    gradeLevel: 'Class 10 (SEE)',
    salary: 'Rs. 8,000 / month',
    schedule: '1 hour/day, 6 days/week',
    requirements: 'Experienced tutor with strong background in concept-based teaching.',
    description: 'Looking for a dedicated home tutor to provide comprehensive coaching and homework assistance.',
    contactInstructions: 'Apply via TuitionMaster portal or call verified support desk.',
    status: 'Open',
    published: true,
  });

  useEffect(() => {
    if (isEditing) {
      jobAdminService
        .getJobById(id)
        .then((res) => {
          const j = res.data;
          setFormData({
            title: j.title || '',
            slug: j.slug || '',
            location: j.location || '',
            jobType: j.jobType || 'Home Tuition',
            subject: Array.isArray(j.subject) ? j.subject.join(', ') : j.subject || '',
            gradeLevel: j.gradeLevel || '',
            salary: j.salary || 'Negotiable',
            schedule: j.schedule || '',
            requirements: j.requirements || '',
            description: j.description || '',
            contactInstructions: j.contactInstructions || '',
            status: j.status || 'Open',
            published: Boolean(j.published),
          });
          setAutoSlug(false);
        })
        .catch(() => {
          toast.error('Failed to load job details');
          navigate('/jobs');
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEditing, navigate]);

  const generateSlug = (text) => {
    const base = text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const shortHash = Math.random().toString(36).substring(2, 6);
    return base ? `${base}-${shortHash}` : '';
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: autoSlug ? generateSlug(val) : prev.slug,
    }));
  };

  const handleSubmit = async (publishState) => {
    if (!formData.title.trim()) {
      toast.error('Vacancy Title is required');
      return;
    }
    if (!formData.subject.trim()) {
      toast.error('Subject is required');
      return;
    }
    if (!formData.location.trim()) {
      toast.error('Location is required');
      return;
    }

    setSubmitting(true);
    const payload = {
      ...formData,
      published: publishState !== undefined ? publishState : formData.published,
      subject: formData.subject.split(',').map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (isEditing) {
        await jobAdminService.updateJob(id, payload);
        toast.success('Tuition vacancy updated successfully');
      } else {
        await jobAdminService.createJob(payload);
        toast.success('Tuition vacancy created successfully');
      }
      navigate('/jobs');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save job vacancy');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="state-center" style={{ minHeight: '50vh' }}>
        <div className="spinner" />
        <p>Loading vacancy details…</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div>
          <Link
            to="/jobs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '.82rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              marginBottom: '6px',
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Tuition Vacancies</span>
          </Link>
          <h1>{isEditing ? 'Edit Tuition Vacancy' : 'Post Tuition Vacancy'}</h1>
          <p>Publish student requirements and tuition job opportunities for verified tutors</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-ghost"
            disabled={submitting}
            onClick={() => handleSubmit(false)}
          >
            <Save size={15} />
            <span>Save as Draft</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={submitting}
            onClick={() => handleSubmit(true)}
          >
            <Send size={15} />
            <span>{isEditing ? 'Update & Publish' : 'Publish Vacancy'}</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '24px', alignItems: 'start' }}>
        {/* Main Content Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Card: Primary Vacancy Specs */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(138, 56, 97, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-300)' }}>
                <Briefcase size={18} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Vacancy Details</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Job / Vacancy Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Home Tutor for Grade 10 SEE Mathematics & Science"
                value={formData.title}
                onChange={handleTitleChange}
                required
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label className="form-label" style={{ margin: 0 }}>URL Slug</label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  style={{ fontSize: '.72rem', color: 'var(--brand-300)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {autoSlug ? <Lock size={12} /> : <Unlock size={12} />}
                  <span>{autoSlug ? 'Auto-generated' : 'Manual Slug'}</span>
                </button>
              </div>
              <input
                type="text"
                className="form-input"
                value={formData.slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  setFormData({ ...formData, slug: e.target.value });
                }}
                placeholder="home-tutor-grade-10-see"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Teaching Subject(s) *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Compulsory Math, Science"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Academic / Grade Level *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Class 10 (SEE), +2 Science, Bachelor's"
                  value={formData.gradeLevel}
                  onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Location / Area *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Baneshwor, Kathmandu"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tuition Mode</label>
                <select
                  className="form-select"
                  value={formData.jobType}
                  onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                >
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Card: Compensation & Schedule */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(189, 138, 46, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-300)' }}>
                <DollarSign size={18} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Salary & Class Schedule</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
              <div className="form-group">
                <label className="form-label">Remuneration / Salary</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Rs. 8,000 / month"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                  {SALARY_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({ ...formData, salary: p })}
                      style={{ fontSize: '.7rem', background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--gold-200)', padding: '2px 6px', cursor: 'pointer' }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Schedule & Duration</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 1 hour/day, 6 days/week (Morning)"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Card: Description & Requirements */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                <FileText size={18} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Description & Specifics</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Vacancy Description</label>
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Detailed overview of the student's current level, target goals, and background..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tutor Requirements & Qualifications</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="e.g. Must have completed +2 Science or Bachelor's with prior SEE tutoring track record."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Application & Contact Instructions</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Verified tutors can apply directly or contact support via WhatsApp"
                value={formData.contactInstructions}
                onChange={(e) => setFormData({ ...formData, contactInstructions: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <h3 style={{ fontSize: '.95rem', fontWeight: 700, marginBottom: '14px' }}>Publishing Status</h3>

            <div className="form-group">
              <label className="form-label">Lifecycle Stage</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              />
              <span style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Published on Public Vacancies Board
              </span>
            </label>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={submitting}
                onClick={() => handleSubmit(formData.published)}
              >
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          {/* Quick Preview Card */}
          <div className="card" style={{ background: 'var(--bg-input)' }}>
            <div style={{ fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Vacancy Card Preview
            </div>
            <div style={{ fontWeight: 700, fontSize: '.95rem', color: 'var(--text-primary)' }}>
              {formData.title || 'Tuition Vacancy Title'}
            </div>
            <div style={{ fontSize: '.8rem', color: 'var(--gold-400)', marginTop: '4px' }}>
              {formData.subject || 'Subjects'} · {formData.gradeLevel}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '.78rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
              <MapPin size={13} />
              <span>{formData.location || 'Location'}</span>
            </div>
            <div style={{ fontWeight: 700, color: 'var(--success-light)', fontSize: '.86rem', marginTop: '8px' }}>
              {formData.salary || 'Negotiable'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
