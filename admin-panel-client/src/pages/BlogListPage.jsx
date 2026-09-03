import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { blogAdminService } from '../services/blogAdminService';

export default function BlogListPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalCount: 0 });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await blogAdminService.getBlogs({
        search,
        published: statusFilter,
        page,
        limit: 10,
      });
      setBlogs(data.blogs || []);
      setPagination(data.pagination || { currentPage: 1, totalPages: 1, totalCount: 0 });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBlogs();
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await blogAdminService.togglePublish(id);
      toast.success(currentStatus ? 'Blog post unpublished' : 'Blog post published!');
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await blogAdminService.deleteBlog(id);
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete blog');
    }
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>📝 Blog Management</h1>
          <p>Create, publish, edit, and manage public blog articles.</p>
        </div>
        <Link to="/blogs/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          ➕ New Blog Post
        </Link>
      </div>

      {/* Filter Strip */}
      <div className="card" style={{ marginBottom: '20px', padding: '16px' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '200px' }}
          />

          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            style={{ width: '160px' }}
          >
            <option value="">All Statuses</option>
            <option value="true">Public</option>
            <option value="false">Hidden / Draft</option>
          </select>

          <button type="submit" className="btn btn-secondary">
            🔍 Search
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div className="spinner" />
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No blog posts found.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Created At</th>
                  <th>Visibility</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/{b.slug}</div>
                    </td>
                    <td>
                      <span className="badge badge-info">{b.category || 'General'}</span>
                    </td>
                    <td>{b.author}</td>
                    <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleTogglePublish(b._id, b.published)}
                        className={`badge ${b.published ? 'badge-success' : 'badge-warning'}`}
                        style={{ cursor: 'pointer', border: 'none', padding: '6px 12px', borderRadius: '12px' }}
                      >
                        {b.published ? '🟢 Public' : '🔴 Hidden'}
                      </button>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <a
                          href={`http://localhost:3000/blog/${b.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-ghost"
                          title="View on site"
                          style={{ padding: '4px 8px' }}
                        >
                          👁️
                        </a>
                        <button
                          onClick={() => navigate(`/blogs/${b._id}/edit`)}
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px' }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(b._id, b.title)}
                          className="btn btn-danger"
                          style={{ padding: '4px 8px' }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalCount} posts)
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn btn-secondary"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <button
                className="btn btn-secondary"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
