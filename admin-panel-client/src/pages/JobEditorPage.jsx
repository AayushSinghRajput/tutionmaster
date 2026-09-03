import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jobAdminService } from '../services/jobAdminService';

export default function JobEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    location: '',
    jobType: 'Home Tuition',
    subject: '',
    gradeLevel: '',
    salary: 'Rs. 8,000 / month',
    schedule: '1 hour/day, 6 days/week',
    requirements: '',
    description: '',
    contactInstructions: '',
    status: 'Open',
    published: false,
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
        .catch((err) => {
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

  const handleSlugChange = (e) => {
    setAutoSlug(false);
    setFormData((prev) => ({ ...prev, slug: e.target.value }));
  };

  const handleSubmit = async (publishState) => {
    if (!formData.title.trim()) {
      toast.error('Job Title is required');
      return;
    }
    if (!formData.location.trim()) {
      toast.error('Location is required');
      return;
    }
    if (!formData.gradeLevel.trim()) {
      toast.error('Grade Level is required');
      return;
    }

    setSubmitting(true);
    const payload = {
      ...formData,
      published: publishState !== undefined ? publishState : formData.published,
      subject: formData.subject ? formData.subject.split(',').map((s) => s.trim()).filter(Boolean) : [],
    };

    try {
      if (isEditing) {
        await jobAdminService.updateJob(id, payload);
        toast.success('Tuition vacancy updated successfully!');
      } else {
        await jobAdminService.createJob(payload);
        toast.success(payload.published ? 'Tuition vacancy published live!' : 'Tuition vacancy saved as draft!');
      }
      navigate('/jobs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save job');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/jobs" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Tuition Vacancies
          </Link>
          <h1 style={{ marginTop: '8px' }}>{isEditing ? '✏️ Edit Tuition Vacancy' : '➕ Post New Tuition Vacancy'}</h1>
        </div>
      </div>

      <div className="card" style={{ padding: '24px' }}>
        {/* Title */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ fontWeight: 600 }}>
            Job Title <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Grade 10 Math & Science Tutor Needed in Baneshwor"
            value={formData.title}
            onChange={handleTitleChange}
          />
        </div>

        {/* Slug */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label className="form-label" style={{ fontWeight: 600, margin: 0 }}>
              URL Slug <span style={{ color: 'red' }}>*</span>
            </label>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ fontSize: '12px', padding: '2px 8px' }}
              onClick={() => {
                setAutoSlug(true);
                setFormData((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
              }}
            >
              🔄 Auto-generate
            </button>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="slug-url-format"
            value={formData.slug}
            onChange={handleSlugChange}
          />
        </div>

        {/* Location, Job Type, Status */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600 }}>
              Location / Area <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. New Baneshwor, Kathmandu"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600 }}>Tuition Type</label>
            <select
              className="form-control"
              value={formData.jobType}
              onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
            >
              <option value="Home Tuition">Home Tuition</option>
              <option value="Online">Online Tuition</option>
              <option value="Institute">Institute / Coaching</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600 }}>Vacancy Status</label>
            <select
              className="form-control"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Open">🟢 Open</option>
              <option value="Urgent">🔴 Urgent</option>
              <option value="Filled">🔵 Filled</option>
              <option value="Closed">⚫ Closed</option>
            </select>
          </div>
        </div>

        {/* Subjects & Grade Level & Salary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600 }}>Subject(s) (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Mathematics, Science, English"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600 }}>
              Grade Level / Class <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Class 10 / SEE or Grade 8"
              value={formData.gradeLevel}
              onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600 }}>Salary / Remuneration</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Rs. 10,000 / month"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
          </div>
        </div>

        {/* Timing & Schedule */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ fontWeight: 600 }}>Timing & Schedule</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Morning 6:30 AM - 7:30 AM (5 days a week)"
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
          />
        </div>

        {/* Tutor Requirements */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ fontWeight: 600 }}>Tutor Requirements & Qualifications</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="e.g. Prefer female tutor with B.Sc background and 2+ years of teaching experience..."
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ fontWeight: 600 }}>Full Job Description & Student Context</label>
          <textarea
            className="form-control"
            rows="5"
            placeholder="Provide context on student goals, upcoming exams, or specific focus areas..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Contact & Application Instructions */}
        <div className="form-group" style={{ marginBottom: '24px' }}>
          <label className="form-label" style={{ fontWeight: 600 }}>
            Application Instructions / Direct Contact Info (Visible ONLY to Logged-in Tutors)
          </label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="e.g. Direct Contact: 980-XXXX-XXX or Call Coordinator at 9841XXXXXX with Job ID."
            value={formData.contactInstructions}
            onChange={(e) => setFormData({ ...formData, contactInstructions: e.target.value })}
          />
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/jobs')}>
            Cancel
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              disabled={submitting}
              onClick={() => handleSubmit(false)}
            >
              💾 Save as Draft
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={submitting}
              onClick={() => handleSubmit(true)}
            >
              🚀 {isEditing ? 'Update & Publish' : 'Publish Live'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
