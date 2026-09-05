import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, AlertCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

import { teacherService } from '../services/adminServices';
import ConfirmModal from '../components/common/ConfirmModal';

import TeacherHero from '../components/teachers/detail/TeacherHero';
import TeacherStatsRibbon from '../components/teachers/detail/TeacherStatsRibbon';
import TeacherBioCard from '../components/teachers/detail/TeacherBioCard';
import TeacherQualificationsCard from '../components/teachers/detail/TeacherQualificationsCard';
import TeacherAvailabilityGrid from '../components/teachers/detail/TeacherAvailabilityGrid';
import TeacherContactInfoCard from '../components/teachers/detail/TeacherContactInfoCard';
import TeacherMetaSidebar from '../components/teachers/detail/TeacherMetaSidebar';
import TeacherEditModal from '../components/teachers/detail/TeacherEditModal';

export default function TeacherDetailPage() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    teacherService
      .get(id)
      .then((res) => {
        setTeacher(res.data.data);
      })
      .catch(() => setError('Teacher profile not found or failed to load.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleToggle = async () => {
    setToggling(true);
    setConfirm(false);
    try {
      const newVal = !teacher.isVisible;
      await teacherService.setVisibility(id, newVal);
      setTeacher((t) => ({ ...t, isVisible: newVal }));
      toast.success(newVal ? 'Profile is now public' : 'Profile is now hidden from public');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update visibility');
    } finally {
      setToggling(false);
    }
  };

  const handleSaveSuccess = (updatedData) => {
    setTeacher(updatedData);
  };

  if (loading) {
    return (
      <div className="state-center">
        <div className="spinner" />
      </div>
    );
  }

  if (error || !teacher) {
    return (
      <div className="state-center">
        <div className="state-icon">
          <AlertCircle size={36} color="var(--danger)" />
        </div>
        <p style={{ color: 'var(--text-secondary)', marginTop: 12 }}>{error || 'Teacher not found.'}</p>
        <Link to="/teachers" className="btn btn-ghost btn-sm" style={{ marginTop: 16 }}>
          <ArrowLeft size={14} style={{ marginRight: 6 }} />
          Back to Teachers
        </Link>
      </div>
    );
  }

  return (
    <div className="teacher-detail-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <Link to="/teachers">Teachers Directory</Link>
        <ChevronRight size={14} className="breadcrumb-separator" />
        <span className="breadcrumb-current">{teacher.name}</span>
      </nav>

      {/* Header Profile Hero */}
      <TeacherHero
        teacher={teacher}
        onToggleVisibility={() => setConfirm(true)}
        onOpenEdit={() => setEditing(true)}
        toggling={toggling}
      />

      {/* Key Metrics Stats Ribbon */}
      <TeacherStatsRibbon teacher={teacher} />

      {/* Two Column Detailed Breakdown */}
      <div className="teacher-detail-grid">
        {/* Left Column (Primary Content) */}
        <div className="teacher-detail-main-col">
          <TeacherBioCard teacher={teacher} />
          <TeacherQualificationsCard teacher={teacher} />
          <TeacherAvailabilityGrid teacher={teacher} />
        </div>

        {/* Right Column (Contact & Metadata Sidebar) */}
        <div className="teacher-detail-side-col">
          <TeacherContactInfoCard teacher={teacher} />
          <TeacherMetaSidebar teacher={teacher} />
        </div>
      </div>

      {/* Visibility Confirmation Modal */}
      {confirm && (
        <ConfirmModal
          title={teacher.isVisible ? 'Hide this profile?' : 'Make this profile public?'}
          message={
            teacher.isVisible
              ? `${teacher.name}'s profile will be hidden from the public /teachers page.`
              : `${teacher.name}'s profile will become visible on the public /teachers page.`
          }
          confirmLabel={teacher.isVisible ? 'Hide Profile' : 'Make Public'}
          confirmClass={teacher.isVisible ? 'btn-danger' : 'btn-success'}
          onConfirm={handleToggle}
          onCancel={() => setConfirm(false)}
          loading={toggling}
        />
      )}

      {/* Edit Profile Modal */}
      {editing && (
        <TeacherEditModal
          teacher={teacher}
          onClose={() => setEditing(false)}
          onSaveSuccess={handleSaveSuccess}
        />
      )}
    </div>
  );
}
