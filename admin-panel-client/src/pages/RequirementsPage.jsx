import { useEffect, useState, useCallback } from 'react';
import { requirementService, teacherService } from '../services/adminServices';
import { REQUIREMENT_STATUS_OPTIONS as STATUS_OPTIONS } from '../constants';
import TutorAssignModal from '../components/requirements/TutorAssignModal';
import RequirementDetailModal from '../components/requirements/RequirementDetailModal';
import toast from 'react-hot-toast';
import {
  FileQuestion,
  Search,
  RefreshCw,
  UserCheck,
  CheckCircle2,
  MapPin,
  Sparkles,
  Bot,
  Edit3,
} from 'lucide-react';

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(1);

  // Modals / Drawers
  const [selectedReq, setSelectedReq] = useState(null);
  const [matchingModalReq, setMatchingModalReq] = useState(null);
  const [availableTutors, setAvailableTutors] = useState([]);
  const [tutorSearch, setTutorSearch] = useState('');
  const [loadingTutors, setLoadingTutors] = useState(false);

  // Status & Note update form state
  const [editingStatus, setEditingStatus] = useState('');
  const [editingNotes, setEditingNotes] = useState('');
  const [savingUpdate, setSavingUpdate] = useState(false);

  const loadRequirements = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (search) params.search = search;
      if (statusFilter !== 'ALL') params.status = statusFilter;

      const res = await requirementService.list(params);
      setRequirements(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      toast.error('Failed to load student inquiries');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    loadRequirements();
  }, [loadRequirements]);

  // Debounced search
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const handleOpenDetail = (req) => {
    setSelectedReq(req);
    setEditingStatus(req.status || 'Open');
    setEditingNotes(req.adminNotes || '');
  };

  const handleSaveDetail = async () => {
    if (!selectedReq) return;
    setSavingUpdate(true);
    try {
      const res = await requirementService.update(selectedReq._id, {
        status: editingStatus,
        adminNotes: editingNotes,
      });
      toast.success('Inquiry status and notes saved');
      setRequirements((prev) =>
        prev.map((r) => (r._id === selectedReq._id ? res.data.data : r))
      );
      setSelectedReq(null);
    } catch {
      toast.error('Failed to update requirement');
    } finally {
      setSavingUpdate(false);
    }
  };

  const handleOpenMatchModal = async (req) => {
    setMatchingModalReq(req);
    setLoadingTutors(true);
    try {
      const res = await teacherService.list({ search: req.subject, limit: 10, isVisible: 'true' });
      setAvailableTutors(res.data.data);
    } catch {
      toast.error('Failed to fetch matching tutors');
    } finally {
      setLoadingTutors(false);
    }
  };

  const handleAssignTutor = async (tutor) => {
    if (!matchingModalReq) return;
    try {
      const res = await requirementService.update(matchingModalReq._id, {
        assignedTutorId: tutor._id,
        status: 'Matched',
      });
      toast.success(`Matched ${tutor.name} to ${matchingModalReq.subject} inquiry`);
      setRequirements((prev) =>
        prev.map((r) => (r._id === matchingModalReq._id ? res.data.data : r))
      );
      setMatchingModalReq(null);
    } catch {
      toast.error('Failed to assign tutor');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Open':
        return 'badge-pending';
      case 'Matched':
        return 'badge-gold';
      case 'Connected':
      case 'Class Started':
      case 'Closed':
        return 'badge-verified';
      default:
        return 'badge-gold';
    }
  };

  const { page: pg, totalPages, total } = pagination;

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Student Requirements & Lead Pipeline</h1>
          <p>Track student tutor inquiries generated through the AI agent & website</p>
        </div>
        <div>
          <button className="btn btn-ghost" onClick={loadRequirements}>
            <RefreshCw size={15} />
            <span>Refresh Leads</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-input-wrap">
          <Search size={16} className="header-search-icon" />
          <input
            type="text"
            placeholder="Search by subject, student name, location or phone…"
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
          <option value="ALL">All Pipeline Stages</option>
          {STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="state-center">
          <div className="spinner" />
          <p>Loading student inquiries…</p>
        </div>
      )}

      {!loading && requirements.length === 0 && (
        <div className="card state-center" style={{ padding: '50px 20px' }}>
          <FileQuestion size={44} color="var(--text-muted)" />
          <h3 style={{ fontSize: '1.1rem', margin: '8px 0 4px' }}>No student inquiries found</h3>
          <p style={{ fontSize: '.85rem', color: 'var(--text-secondary)' }}>
            Inquiries submitted via the AI Tutor Matcher or parent request form will appear here.
          </p>
        </div>
      )}

      {/* Leads Table */}
      {!loading && requirements.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Subject & Academic Level</th>
                <th>Contact Details</th>
                <th>Location & Mode</th>
                <th>Budget & Timing</th>
                <th>Lead Source</th>
                <th>Pipeline Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((req) => (
                <tr key={req._id}>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: '.92rem', color: 'var(--text-primary)' }}>
                      {req.subject}
                    </div>
                    <div style={{ fontSize: '.76rem', color: 'var(--brand-300)', marginTop: '2px' }}>
                      {req.academicLevel || 'Class 1–10'}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontSize: '.84rem', color: 'var(--text-primary)' }}>
                      {req.contactName || req.userId?.name || 'Parent / Student'}
                    </div>
                    <div style={{ fontSize: '.76rem', color: 'var(--text-muted)' }}>
                      {req.contactPhone || req.contactEmail || req.userId?.email || '—'}
                    </div>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '.84rem' }}>
                      <MapPin size={13} color="var(--text-muted)" />
                      <span>{req.location || 'Kathmandu Valley'}</span>
                    </div>
                    <span className="badge badge-mode" style={{ marginTop: '4px' }}>
                      {req.teachingMode || 'Home Tuition'}
                    </span>
                  </td>

                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--gold-400)', fontSize: '.84rem' }}>
                      {req.budget ? `₨ ${req.budget}` : 'Standard Rate'}
                    </div>
                    <div style={{ fontSize: '.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {req.preferredTime || 'Flexible Time'}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        req.source === 'AI Agent' ? 'badge-subject' : 'badge-gold'
                      }`}
                    >
                      {req.source === 'AI Agent' ? <Bot size={12} /> : <Sparkles size={12} />}
                      <span>{req.source || 'Web Form'}</span>
                    </span>
                  </td>

                  <td>
                    <span className={`badge ${getStatusBadgeClass(req.status)}`}>
                      {req.status || 'Open'}
                    </span>
                    {req.assignedTutorId && (
                      <div style={{ fontSize: '.74rem', color: 'var(--success-light)', marginTop: '4px' }}>
                        Tutor: {req.assignedTutorId.name}
                      </div>
                    )}
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleOpenMatchModal(req)}
                        title="Match with Qualified Registered Tutor"
                      >
                        <UserCheck size={14} />
                        <span>Match Tutor</span>
                      </button>

                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleOpenDetail(req)}
                        title="View In-Depth Details & Notes"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      {!loading && totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', fontSize: '.85rem', color: 'var(--text-secondary)' }}>
          <div>
            Showing Page <strong>{pg}</strong> of <strong>{totalPages}</strong> ({total} inquiries total)
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

      {/* Lead Status & Notes Detail Modal */}
      <RequirementDetailModal
        selectedReq={selectedReq}
        editingStatus={editingStatus}
        setEditingStatus={setEditingStatus}
        editingNotes={editingNotes}
        setEditingNotes={setEditingNotes}
        savingUpdate={savingUpdate}
        onClose={() => setSelectedReq(null)}
        onSave={handleSaveDetail}
      />

      {/* Match Tutor Modal */}
      <TutorAssignModal
        matchingModalReq={matchingModalReq}
        loadingTutors={loadingTutors}
        availableTutors={availableTutors}
        onClose={() => setMatchingModalReq(null)}
        onAssignTutor={handleAssignTutor}
      />
    </>
  );
}
