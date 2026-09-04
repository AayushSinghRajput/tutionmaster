import { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { teacherService } from '../services/adminServices';
import ConfirmModal from '../components/common/ConfirmModal';
import TutorReviewDrawer from '../components/teachers/TutorReviewDrawer';
import toast from 'react-hot-toast';
import {
  Search,
  Eye,
  CheckCircle2,
  MapPin,
  UserPlus,
  RefreshCw,
} from 'lucide-react';

export default function TeachersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [teachers, setTeachers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('filter') || 'ALL'); // 'ALL' | 'pending' | 'verified' | 'hidden'
  const [modeFilter, setModeFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [selectedTeacherForReview, setSelectedTeacherForReview] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (search) params.search = search;
      if (statusFilter === 'pending') {
        params.isVisible = 'false';
        params.isActive = 'true';
      } else if (statusFilter === 'verified') {
        params.isVisible = 'true';
      } else if (statusFilter === 'hidden') {
        params.isVisible = 'false';
      }
      if (modeFilter !== 'ALL') {
        params.teachingMode = modeFilter;
      }

      const res = await teacherService.list(params);
      setTeachers(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      toast.error('Failed to load teacher profiles');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, modeFilter]);

  useEffect(() => {
    load();
  }, [load]);

  // Debounced search
  const [searchInput, setSearchInput] = useState(search);
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const handleToggle = async (id, isVisible) => {
    try {
      await teacherService.setVisibility(id, isVisible);
      toast.success(isVisible ? 'Profile is now publicly visible' : 'Profile hidden from public directory');
      setTeachers((prev) =>
        prev.map((t) => (t._id === id ? { ...t, isVisible } : t))
      );
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update visibility');
    }
  };

  const handleTeacherVerified = (updatedTeacher) => {
    setTeachers((prev) =>
      prev.map((t) => (t._id === updatedTeacher._id ? updatedTeacher : t))
    );
  };

  const { page: pg, totalPages, total } = pagination;

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Tutor Profiles & Verification</h1>
          <p>Review credentials, verify identity documents, and manage platform listings</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/teachers/create-manual" className="btn btn-primary">
            <UserPlus size={16} />
            <span>Manual Tutor Onboarding</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs & Faceted Controls */}
      <div className="filter-bar">
        <div className="filter-input-wrap">
          <Search size={16} className="header-search-icon" />
          <input
            type="text"
            placeholder="Search by tutor name, email, subject, or district…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="ALL">All Verification Statuses</option>
          <option value="pending">⏳ Pending Review (Action Needed)</option>
          <option value="verified">✅ Verified & Public</option>
          <option value="hidden">🙈 Hidden / Draft Profiles</option>
        </select>

        <select
          className="filter-select"
          value={modeFilter}
          onChange={(e) => {
            setModeFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="ALL">All Teaching Modes</option>
          <option value="In-person">Home / In-person Only</option>
          <option value="Online">Online Only</option>
          <option value="Both">Both (Home & Online)</option>
        </select>

        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            setSearchInput('');
            setStatusFilter('ALL');
            setModeFilter('ALL');
            setPage(1);
          }}
          title="Reset Filters"
        >
          <RefreshCw size={14} />
          <span>Reset</span>
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="state-center">
          <div className="spinner" />
          <p>Loading tutors data…</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && teachers.length === 0 && (
        <div className="card state-center" style={{ padding: '50px 20px' }}>
          <GraduationCap size={44} color="var(--text-muted)" />
          <h3 style={{ fontSize: '1.1rem', margin: '8px 0 4px' }}>No tutor profiles found</h3>
          <p style={{ fontSize: '.85rem', color: 'var(--text-secondary)' }}>
            Try adjusting your search keywords or status filters.
          </p>
        </div>
      )}

      {/* Data Table */}
      {!loading && teachers.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tutor Profile</th>
                <th>City / Location</th>
                <th>Teaching Subjects</th>
                <th>Mode</th>
                <th>Hourly Rate</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => {
                const initials = teacher.name?.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() || 'TM';
                return (
                  <tr key={teacher._id}>
                    <td>
                      <div className="table-avatar-cell">
                        {teacher.avatarUrl ? (
                          <img src={teacher.avatarUrl} alt={teacher.name} className="table-avatar" />
                        ) : (
                          <div className="table-avatar">{initials}</div>
                        )}
                        <div>
                          <div className="table-name-primary">
                            <span>{teacher.name}</span>
                            {teacher.isManuallyCreatedByAdmin && (
                              <span style={{ fontSize: '.65rem', background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4, color: 'var(--text-muted)' }}>
                                Manual
                              </span>
                            )}
                          </div>
                          <div className="table-name-secondary">
                            {teacher.contact?.email || '—'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '.84rem' }}>
                        <MapPin size={13} color="var(--text-muted)" />
                        <span>{teacher.address?.city || 'Nepal'}</span>
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '240px' }}>
                        {(teacher.preferredSubjects || []).slice(0, 3).map((sub, i) => (
                          <span key={i} className="badge badge-subject">
                            {sub}
                          </span>
                        ))}
                        {(teacher.preferredSubjects || []).length > 3 && (
                          <span style={{ fontSize: '.7rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                            +{teacher.preferredSubjects.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-mode">
                        {teacher.teachingMode || 'Both'}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--gold-400)' }}>
                        ₨ {teacher.hourlyRate ? teacher.hourlyRate.toLocaleString() : '—'}
                        <span style={{ fontSize: '.72rem', color: 'var(--text-muted)', fontWeight: 400 }}> /hr</span>
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span className={`badge ${teacher.isVisible ? 'badge-verified' : 'badge-pending'}`}>
                          {teacher.isVisible ? 'Verified & Public' : 'Pending Review'}
                        </span>
                        {!teacher.isActive && (
                          <span className="badge badge-rejected" style={{ fontSize: '.65rem' }}>
                            Inactive Account
                          </span>
                        )}
                      </div>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setSelectedTeacherForReview(teacher)}
                          title="Open Document Review & Verification Drawer"
                        >
                          <CheckCircle2 size={14} />
                          <span>Review & Verify</span>
                        </button>

                        <Link
                          to={`/teachers/${teacher._id}`}
                          className="btn btn-ghost btn-sm"
                          title="Edit Profile"
                        >
                          <Eye size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      {!loading && totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', fontSize: '.85rem', color: 'var(--text-secondary)' }}>
          <div>
            Showing Page <strong>{pg}</strong> of <strong>{totalPages}</strong> ({total} tutors total)
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-ghost btn-sm"
              disabled={pg <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <button
              className="btn btn-ghost btn-sm"
              disabled={pg >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Slide-out Document Verification Drawer */}
      {selectedTeacherForReview && (
        <TutorReviewDrawer
          teacher={selectedTeacherForReview}
          onClose={() => setSelectedTeacherForReview(null)}
          onVerified={handleTeacherVerified}
        />
      )}
    </>
  );
}
