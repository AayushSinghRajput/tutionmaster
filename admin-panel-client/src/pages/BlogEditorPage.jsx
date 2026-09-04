import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { blogAdminService } from '../services/blogAdminService';
import { BLOG_CATEGORIES as CATEGORIES } from '../constants';
import {
  FileText,
  ArrowLeft,
  Save,
  Send,
  Image,
  Tag,
  Lock,
  Unlock,
  Eye,
  Globe,
  Bold,
  Italic,
  Heading2,
  List,
  Quote,
  Code,
  Link2,
} from 'lucide-react';

export default function BlogEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!isEditing);
  const [showSeo, setShowSeo] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    coverImage: '',
    author: 'TuitionMaster Editorial',
    category: 'Tutoring Tips & Guides',
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
            author: b.author || 'TuitionMaster Editorial',
            category: b.category || 'Tutoring Tips & Guides',
            tags: Array.isArray(b.tags) ? b.tags.join(', ') : b.tags || '',
            published: Boolean(b.published),
            metaTitle: b.metaTitle || '',
            metaDescription: b.metaDescription || '',
          });
          setAutoSlug(false);
        })
        .catch(() => {
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

  const insertMarkdown = (syntaxBefore, syntaxAfter = '') => {
    const textarea = document.getElementById('blog-content-area');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = formData.content.substring(start, end);
    const replacement = syntaxBefore + selected + syntaxAfter;
    const newContent =
      formData.content.substring(0, start) + replacement + formData.content.substring(end);
    setFormData((prev) => ({ ...prev, content: newContent }));
  };

  const handleSubmit = async (publishState) => {
    if (!formData.title.trim()) {
      toast.error('Article Title is required');
      return;
    }
    if (!formData.content.trim()) {
      toast.error('Article Content is required');
      return;
    }

    setSubmitting(true);
    const payload = {
      ...formData,
      published: publishState !== undefined ? publishState : formData.published,
      tags: formData.tags
        ? formData.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    };

    try {
      if (isEditing) {
        await blogAdminService.updateBlog(id, payload);
        toast.success('Blog post updated successfully');
      } else {
        await blogAdminService.createBlog(payload);
        toast.success('Blog post created successfully');
      }
      navigate('/blogs');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save blog post');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="state-center" style={{ minHeight: '50vh' }}>
        <div className="spinner" />
        <p>Loading editorial post…</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div>
          <Link
            to="/blogs"
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
            <span>Back to Articles</span>
          </Link>
          <h1>{isEditing ? 'Edit Editorial Article' : 'Write New Article'}</h1>
          <p>Create educational content, student resources, and tutor guidelines</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-ghost"
            disabled={submitting}
            onClick={() => handleSubmit(false)}
          >
            <Save size={15} />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={submitting}
            onClick={() => handleSubmit(true)}
          >
            <Send size={15} />
            <span>{isEditing ? 'Update & Publish' : 'Publish Article'}</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '24px', alignItems: 'start' }}>
        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Card: Title & Slug */}
          <div className="card">
            <div className="form-group">
              <label className="form-label">Article Title *</label>
              <input
                type="text"
                className="form-input"
                style={{ fontSize: '1.1rem', fontWeight: 600 }}
                placeholder="e.g. 10 Proven Strategies to Excel in SEE Optional Mathematics"
                value={formData.title}
                onChange={handleTitleChange}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
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
                placeholder="proven-strategies-see-opt-maths"
              />
            </div>
          </div>

          {/* Card: Excerpt & Cover Image */}
          <div className="card">
            <div className="form-group">
              <label className="form-label">Cover Image URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://images.unsplash.com/... or Cloudinary URL"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              />
              {formData.coverImage && (
                <div style={{ marginTop: '10px', borderRadius: 'var(--radius)', overflow: 'hidden', height: '160px', border: '1px solid var(--border)' }}>
                  <img
                    src={formData.coverImage}
                    alt="Cover Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <label className="form-label" style={{ margin: 0 }}>Excerpt / Short Summary</label>
                <span style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>
                  {formData.excerpt.length} characters
                </span>
              </div>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="Brief 1-2 sentence teaser shown on blog card listings..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>
          </div>

          {/* Card: Article Content Editor */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label className="form-label" style={{ margin: 0 }}>Article Content (Markdown Supported) *</label>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '4px 8px' }}
                  onClick={() => insertMarkdown('**', '**')}
                  title="Bold"
                >
                  <Bold size={13} />
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '4px 8px' }}
                  onClick={() => insertMarkdown('*', '*')}
                  title="Italic"
                >
                  <Italic size={13} />
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '4px 8px' }}
                  onClick={() => insertMarkdown('## ')}
                  title="Heading 2"
                >
                  <Heading2 size={13} />
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '4px 8px' }}
                  onClick={() => insertMarkdown('- ')}
                  title="Bullet List"
                >
                  <List size={13} />
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '4px 8px' }}
                  onClick={() => insertMarkdown('> ')}
                  title="Quote"
                >
                  <Quote size={13} />
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '4px 8px' }}
                  onClick={() => insertMarkdown('`', '`')}
                  title="Code"
                >
                  <Code size={13} />
                </button>
              </div>
            </div>

            <textarea
              id="blog-content-area"
              className="form-textarea"
              rows={14}
              placeholder="Write comprehensive article content in markdown format..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          {/* Card: Collapsible SEO & Social Meta */}
          <div className="card">
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
              onClick={() => setShowSeo(!showSeo)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={18} color="var(--gold-400)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Search Engine Optimization (SEO)</h3>
              </div>
              <span style={{ fontSize: '.78rem', color: 'var(--brand-300)' }}>
                {showSeo ? 'Hide Meta' : 'Configure Meta'}
              </span>
            </div>

            {showSeo && (
              <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">SEO Meta Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Custom Google title tag (defaults to article title)"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">SEO Meta Description</label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    placeholder="Custom Google meta description..."
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  />
                </div>

                {/* Google Snippet Simulator */}
                <div style={{ padding: '14px', background: 'var(--bg-input)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Google Search Preview
                  </div>
                  <div style={{ fontSize: '.84rem', color: '#60a5fa', fontWeight: 600 }}>
                    {formData.metaTitle || formData.title || 'Article Title'} · TuitionMaster
                  </div>
                  <div style={{ fontSize: '.72rem', color: 'var(--success-light)', margin: '2px 0' }}>
                    https://tuitionmaster.guru/blog/{formData.slug || 'article-slug'}
                  </div>
                  <div style={{ fontSize: '.78rem', color: 'var(--text-secondary)' }}>
                    {formData.metaDescription || formData.excerpt || 'Article summary description snippet...'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <h3 style={{ fontSize: '.95rem', fontWeight: 700, marginBottom: '14px' }}>Publishing Settings</h3>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Author Byline</label>
              <input
                type="text"
                className="form-input"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="TuitionMaster Editorial"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tags (Comma-separated)</label>
              <input
                type="text"
                className="form-input"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="SEE, Mathematics, Exam Prep"
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              />
              <span style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Published on Live Website
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
                <span>Save Article</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
