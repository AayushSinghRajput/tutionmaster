import { BookOpen, User, Sparkles } from 'lucide-react';

export default function TeacherBioCard({ teacher }) {
  const subjects = teacher.preferredSubjects || [];

  return (
    <div className="detail-section-card">
      <div className="detail-card-header">
        <div className="detail-card-header-left">
          <div className="detail-card-header-icon">
            <User size={18} />
          </div>
          <h3 className="detail-card-title">About & Teaching Profile</h3>
        </div>
      </div>

      <div className="detail-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Bio */}
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Biography & Background
          </div>
          {teacher.bio ? (
            <div className="teacher-bio-quote">
              {teacher.bio}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', fontStyle: 'italic', margin: 0 }}>
              No detailed biography provided for this tutor yet.
            </p>
          )}
        </div>

        {/* Subjects */}
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Preferred Subjects & Specializations
          </div>
          {subjects.length > 0 ? (
            <div className="subject-badges-wrap">
              {subjects.map((subject, idx) => (
                <span key={idx} className="subject-badge-item">
                  <BookOpen size={13} />
                  <span>{subject}</span>
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', fontStyle: 'italic', margin: 0 }}>
              No subjects listed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
