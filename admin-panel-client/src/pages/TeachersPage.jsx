import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { teacherService } from '../services/adminServices';
import ConfirmModal from '../components/common/ConfirmModal';
import toast from 'react-hot-toast';

function VisibilityToggle({ teacher, onToggle }) {
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    setConfirm(false);
    try {
      await onToggle(teacher._id, !teacher.isVisible);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="toggle-wrap">
        <label className="toggle" title={teacher.isVisible ? 'Click to hide' : 'Click to make public'}>
          <input
            type="checkbox"
            checked={!!teacher.isVisible}
            onChange={() => setConfirm(true)}
            disabled={loading}
          />
          <div className="toggle-track" />
          <div className="toggle-thumb" />
        </label>
        <span style={{ fontSize: '.78rem', color: teacher.isVisible ? 'var(--success)' : 'var(--text-muted)' }}>
          {loading ? '…' : teacher.isVisible ? 'Public' : 'Hidden'}
        </span>
      </div>

      {confirm && (
        <ConfirmModal
          title={teacher.isVisible ? 'Hide Profile?' : 'Make Profile Public?'}
          message={
            teacher.isVisible
              ? `Hide ${teacher.name}'s profile from the public /teachers page?`
              : `Make ${teacher.name}'s profile publicly visible on the /teachers page?`
          }
          confirmLabel={teacher.isVisible ? 'Hide' : 'Make Public'}
          confirmClass={teacher.isVisible ? 'btn-danger' : 'btn-success'}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(false)}
        />
      )}
    </>
  );
}

function Avatar({ teacher }) {
  if (teacher.avatarUrl) {
    return <img src={teacher.avatarUrl} alt={teacher.name} className="avatar-img" />;
  }
  const initials = teacher.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';
  return <div className="avatar-initials">{initials}</div>;
}

export default function TeachersPage() {
  const [teachers, setTeachers]   = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [visFilter, setVisFilter] = useState('');
  const [page, setPage]           = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (search)    params.search   = search;
      if (visFilter) params.isVisible = visFilter;
      const res = await teacherService.list(params);
      setTeachers(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      toast.error('Failed to load teachers');
    } finally {
      setLoading(false);
    }
  }, [page, search, visFilter]);

  useEffect(() => { load(); }, [load]);

  // Debounced search
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const handleToggle = async (id, isVisible) => {
    try {
      await teacherService.setVisibility(id, isVisible);
      toast.success(isVisible ? 'Profile is now public' : 'Profile hidden');
      setTeachers(prev => prev.map(t => t._id === id ? { ...t, isVisible } : t));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update visibility');
    }
  };

  const { page: pg, totalPages, total } = pagination;

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Teacher Profiles</h1>
          <p>Manage visibility of all teacher profiles</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-row" style={{ marginBottom: '16px' }}>
        <div className="search-bar" style={{ flex: 1, minWidth: '220px', maxWidth: '400px' }}>
          <span>🔍</span>
          <input
            id="teacher-search"
            type="text"
            placeholder="Search by name, email, subject…"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </div>

        <select
          id="visibility-filter"
          className="form-input"
          style={{ width: 'auto', minWidth: '140px' }}
          value={visFilter}
          onChange={e => { setVisFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Profiles</option>
          <option value="true">Visible Only</option>
          <option value="false">Hidden Only</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Teacher</th>
              <th>Subjects</th>
              <th>Location</th>
              <th>Mode</th>
              <th>Rate</th>
              <th>Status</th>
              <th>Visible</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8}>
                  <div className="state-center" style={{ padding: '40px' }}>
                    <div className="spinner" />
                  </div>
                </td>
              </tr>
            )}
            {!loading && teachers.length === 0 && (
              <tr>
                <td colSpan={8}>
                  <div className="state-center">
                    <div className="state-icon">👩‍🏫</div>
                    <p>No teachers found</p>
                  </div>
                </td>
              </tr>
            )}
            {!loading && teachers.map(t => (
              <tr key={t._id}>
                <td>
                  <div className="teacher-cell">
                    <Avatar teacher={t} />
                    <div className="info">
                      <p>{t.name}</p>
                      <p>{t.contact?.email || t.userId?.email || '—'}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="chips">
                    {(t.preferredSubjects || []).slice(0, 2).map(s => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                    {(t.preferredSubjects?.length || 0) > 2 && (
                      <span className="chip">+{t.preferredSubjects.length - 2}</span>
                    )}
                  </div>
                </td>
                <td style={{ fontSize: '.82rem', color: 'var(--text-secondary)' }}>
                  {t.address?.city || '—'}
                </td>
                <td>
                  <span className={`badge ${t.teachingMode === 'Online' ? 'badge-blue' : t.teachingMode === 'In-person' ? 'badge-green' : 'badge-yellow'}`}>
                    {t.teachingMode || '—'}
                  </span>
                </td>
                <td style={{ fontSize: '.82rem' }}>₹{t.hourlyRate}/hr</td>
                <td>
                  <span className={`badge ${t.isActive ? 'badge-green' : 'badge-red'}`}>
                    {t.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <VisibilityToggle teacher={t} onToggle={handleToggle} />
                </td>
                <td>
                  <Link
                    to={`/teachers/${t._id}`}
                    className="btn btn-ghost btn-sm"
                    id={`view-teacher-${t._id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {!loading && total > 0 && (
          <div className="pagination">
            <span className="pagination-info">
              Showing {teachers.length} of {total} teachers — Page {pg} of {totalPages}
            </span>
            <div className="pagination-btns">
              <button
                className="btn btn-ghost btn-sm"
                disabled={pg <= 1}
                onClick={() => setPage(p => p - 1)}
              >
                ← Prev
              </button>
              <button
                className="btn btn-ghost btn-sm"
                disabled={pg >= totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
