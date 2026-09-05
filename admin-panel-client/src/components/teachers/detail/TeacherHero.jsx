import { MapPin, Briefcase, Laptop, Eye, EyeOff, Edit3, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import NepaliRupeeIcon from '../../common/NepaliRupeeIcon';

export default function TeacherHero({ teacher, onToggleVisibility, onOpenEdit, toggling }) {
  const initials = teacher.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'TM';
  const monthlyRate = teacher.monthlyRate ?? (teacher.hourlyRate ? teacher.hourlyRate * 20 : 0);

  return (
    <div className="teacher-hero-card">
      <div className="teacher-hero-content">
        {/* Avatar with Status Indicator */}
        <div className="teacher-avatar-container">
          {teacher.avatarUrl ? (
            <img src={teacher.avatarUrl} alt={teacher.name} className="teacher-avatar-img" />
          ) : (
            <div className="teacher-avatar-fallback">{initials}</div>
          )}
          <div className="teacher-avatar-status-badge">
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: teacher.isActive ? '#10b981' : '#ef4444',
                display: 'block',
              }}
              title={teacher.isActive ? 'Active Account' : 'Inactive Account'}
            />
          </div>
        </div>

        {/* Hero Details */}
        <div className="teacher-hero-details">
          <div className="teacher-hero-header-row">
            <div className="teacher-hero-name-wrap">
              <h2 className="teacher-hero-name">{teacher.name}</h2>
              <div className="teacher-hero-badges">
                <span className={`badge ${teacher.isActive ? 'badge-verified' : 'badge-danger'}`}>
                  {teacher.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className={`badge ${teacher.isVisible ? 'badge-verified' : 'badge-pending'}`}>
                  {teacher.isVisible ? '👁️ Public' : '🙈 Hidden'}
                </span>
                {teacher.isManuallyCreatedByAdmin && (
                  <span className="badge badge-gold">Admin Created</span>
                )}
              </div>
            </div>

            <Link to="/teachers" className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
              <ArrowLeft size={14} />
              <span>Back to List</span>
            </Link>
          </div>

          {/* Metadata Highlights */}
          <div className="teacher-hero-meta-row">
            {(teacher.address?.city || teacher.address?.state) && (
              <span className="teacher-hero-meta-item">
                <MapPin size={15} style={{ color: 'var(--brand-300)' }} />
                <span>{teacher.address?.city ? `${teacher.address.city}, ` : ''}{teacher.address?.state || 'Nepal'}</span>
              </span>
            )}
            <span className="teacher-hero-meta-item">
              <Briefcase size={15} style={{ color: 'var(--gold-400)' }} />
              <span>{teacher.experience} yr{teacher.experience !== 1 ? 's' : ''} exp.</span>
            </span>
            <span className="teacher-hero-meta-item">
              <NepaliRupeeIcon size={15} color="var(--success-light)" />
              <span>₨ {monthlyRate.toLocaleString()} / mo</span>
            </span>
            {teacher.teachingMode && (
              <span className="teacher-hero-meta-item">
                <Laptop size={15} style={{ color: 'var(--info)' }} />
                <span>{teacher.teachingMode}</span>
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="teacher-hero-actions">
            <button
              id="toggle-visibility-btn"
              type="button"
              className={`btn btn-sm ${teacher.isVisible ? 'btn-danger' : 'btn-success'}`}
              onClick={onToggleVisibility}
              disabled={toggling}
            >
              {toggling ? (
                <span className="spinner spinner-sm" />
              ) : teacher.isVisible ? (
                <>
                  <EyeOff size={14} />
                  <span>Hide from Public</span>
                </>
              ) : (
                <>
                  <Eye size={14} />
                  <span>Make Public</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenEdit}
            >
              <Edit3 size={14} />
              <span>Edit Profile</span>
            </button>

            {teacher.cvUrl && (
              <a
                href={teacher.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                <ExternalLink size={14} />
                <span>View CV</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
