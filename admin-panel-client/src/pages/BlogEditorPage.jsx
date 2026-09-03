import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { blogAdminService } from '../services/blogAdminService';

export default function BlogEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);
  const [showSeo, setShowSeo] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    coverImage: '',
    author: 'TuitionMaster Team',
    category: 'General',
    tags: '',
    published: false,
    metaTitle: '',
    metaDescription: '',
  });

  useEffect(() => {
    if (isEditing) {
      blogAdminService
        .getBlogById(id)
        .then((res) => {
          const b = res.data;
          setFormData({
            title: b.title || '',
            slug: b.slug || '',
            content: b.content || '',
            excerpt: b.excerpt || '',
            coverImage: b.coverImage || '',
            author: b.author || 'TuitionMaster Team',
            category: b.category || 'General',
            tags: Array.isArray(b.tags) ? b.tags.join(', ') : '',
            published: Boolean(b.published),
            metaTitle: b.metaTitle || '',
            metaDescription: b.metaDescription || '',
          });
          setAutoSlug(false);
        })
        .catch((err) => {
          toast.error('Failed to load blog post');
          navigate('/blogs');
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEditing, navigate]);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
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
      toast.error('Title is required');
      return;
    }
    if (!formData.content.trim()) {
      toast.error('Content is required');
      return;
    }

    setSubmitting(true);
    const payload = {
      ...formData,
      published: publishState !== undefined ? publishState : formData.published,
      tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    };

    try {
      if (isEditing) {
        await blogAdminService.updateBlog(id, payload);
        toast.success('Blog updated successfully!');
      } else {
        await blogAdminService.createBlog(payload);
        toast.success(payload.published ? 'Blog published successfully!' : 'Blog saved as draft!');
      }
      navigate('/blogs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save blog');
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
          <Link to="/blogs" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Blogs
          </Link>
          <h1 style={{ marginTop: '8px' }}>{isEditing ? '✏️ Edit Blog Post' : '➕ Create New Blog Post'}</h1>
        </div>
      </div>

      <div className="card" style={{ padding: '24px' }}>
        {/* Title */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ fontWeight: 600 }}>
            Blog Title <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. 10 Essential Tips for Mastering High School Physics"
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

        {/* Category & Author & Tags */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600 }}>Category</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Study Tips, Exam Prep"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600 }}>Author Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. TuitionMaster Team"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600 }}>Tags (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. physics, study, nepal"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>
        </div>

        {/* Cover Image URL */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ fontWeight: 600 }}>Cover Image URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="https://images.unsplash.com/photo-..."
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          />
          {formData.coverImage && (
            <div style={{ marginTop: '10px', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={formData.coverImage} alt="Cover preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        {/* Excerpt */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label className="form-label" style={{ fontWeight: 600, margin: 0 }}>Excerpt (Summary for cards & meta)</label>
            <span style={{ fontSize: '12px', color: formData.excerpt.length > 160 ? 'orange' : 'var(--text-muted)' }}>
              {formData.excerpt.length}/160 chars
            </span>
          </div>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Brief overview of the article content..."
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          />
        </div>

        {/* Content Body */}
        <div className="form-group" style={{ marginBottom: '24px' }}>
          <label className="form-label" style={{ fontWeight: 600 }}>
            Article Content (HTML / Markdown / Rich Text) <span style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            className="form-control"
            rows="12"
            placeholder="<p>Write your blog post HTML or formatted content here...</p>"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            style={{ fontFamily: 'monospace', fontSize: '14px' }}
          />
        </div>

        {/* SEO Collapsible Section */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '24px', overflow: 'hidden' }}>
          <button
            type="button"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'var(--bg-card)',
              border: 'none',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              fontWeight: 600,
              color: 'var(--text-main)',
            }}
            onClick={() => setShowSeo(!showSeo)}
          >
            <span>🔍 SEO Settings (Custom Meta Tags)</span>
            <span>{showSeo ? '▲' : '▼'}</span>
          </button>

          {showSeo && (
            <div style={{ padding: '16px', borderTop: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Meta Title (falls back to Title if empty)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Custom SEO Title"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Meta Description (falls back to Excerpt if empty)</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Custom SEO Description"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/blogs')}>
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
              🚀 {isEditing ? 'Update & Publish' : 'Publish Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
