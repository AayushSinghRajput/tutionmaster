import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jobAdminService } from '../services/jobAdminService';

export default function JobListPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [publishedFilter, setPublishedFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalCount: 0 });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobAdminService.getJobs({
        search,
        status: statusFilter,
        published: publishedFilter,
        page,
        limit: 10,
      });
      setJobs(data.jobs || []);
      setPagination(data.pagination || { currentPage: 1, totalPages: 1, totalCount: 0 });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch tuition jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, statusFilter, publishedFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchJobs();
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await jobAdminService.togglePublish(id);
      toast.success(currentStatus ? 'Job unpublished' : 'Job published live!');
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update visibility');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await jobAdminService.updateStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await jobAdminService.deleteJob(id);
      toast.success('Job deleted successfully');
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete job');
    }
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>💼 Tuition Vacancies</h1>
          <p>Create and manage home, online, and institute tutor requests.</p>
        </div>
        <Link to="/jobs/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          ➕ Post New Vacancy
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: '20px', padding: '16px' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search title, subject, area..."
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
            style={{ width: '150px' }}
          >
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Urgent">Urgent</option>
            <option value="Filled">Filled</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            className="form-control"
            value={publishedFilter}
            onChange={(e) => {
              setPublishedFilter(e.target.value);
              setPage(1);
            }}
            style={{ width: '150px' }}
          >
            <option value="">All Visibility</option>
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
        ) : jobs.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No tuition job vacancies found.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Job Title & Location</th>
                  <th>Subject & Grade</th>
                  <th>Type & Salary</th>
                  <th>Status</th>
                  <th>Visibility</th>
                  <th>Posted</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{j.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>📍 {j.location}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '13px', fontWeight: 500 }}>
                        {Array.isArray(j.subject) ? j.subject.join(', ') : j.subject}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>🎓 {j.gradeLevel}</div>
                    </td>
                    <td>
                      <span className="badge badge-info">{j.jobType}</span>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>💵 {j.salary}</div>
                    </td>
                    <td>
                      <select
                        className="form-control"
                        value={j.status}
                        onChange={(e) => handleStatusChange(j._id, e.target.value)}
                        style={{
                          fontSize: '12px',
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontWeight: 600,
                          backgroundColor:
                            j.status === 'Urgent'
                              ? '#fef2f2'
                              : j.status === 'Open'
                              ? '#f0fdf4'
                              : j.status === 'Filled'
                              ? '#eff6ff'
                              : '#f3f4f6',
                          color:
                            j.status === 'Urgent'
                              ? '#dc2626'
                              : j.status === 'Open'
                              ? '#16a34a'
                              : j.status === 'Filled'
                              ? '#2563eb'
                              : '#4b5563',
                        }}
                      >
                        <option value="Open">🟢 Open</option>
                        <option value="Urgent">🔴 Urgent</option>
                        <option value="Filled">🔵 Filled</option>
                        <option value="Closed">⚫ Closed</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleTogglePublish(j._id, j.published)}
                        className={`badge ${j.published ? 'badge-success' : 'badge-warning'}`}
                        style={{ cursor: 'pointer', border: 'none', padding: '6px 12px', borderRadius: '12px' }}
                      >
                        {j.published ? '🟢 Public' : '🔴 Hidden'}
                      </button>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {new Date(j.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <a
                          href={`http://localhost:3000/jobs/${j.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-ghost"
                          title="View on site"
                          style={{ padding: '4px 8px' }}
                        >
                          👁️
                        </a>
                        <button
                          onClick={() => navigate(`/jobs/${j._id}/edit`)}
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px' }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(j._id, j.title)}
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
              Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalCount} vacancies)
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
