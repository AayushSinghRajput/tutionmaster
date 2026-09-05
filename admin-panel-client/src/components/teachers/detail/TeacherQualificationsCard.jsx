import { GraduationCap, Building2, Calendar, FileCheck } from 'lucide-react';

export default function TeacherQualificationsCard({ teacher }) {
  const qualifications = teacher.qualifications || [];

  return (
    <div className="detail-section-card">
      <div className="detail-card-header">
        <div className="detail-card-header-left">
          <div className="detail-card-header-icon">
            <GraduationCap size={18} />
          </div>
          <h3 className="detail-card-title">Academic Qualifications & Credentials</h3>
        </div>
        <span className="badge badge-gold">{qualifications.length} Listed</span>
      </div>

      <div className="detail-card-body">
        {qualifications.length > 0 ? (
          <div className="qualification-timeline">
            {qualifications.map((q, idx) => (
              <div key={idx} className="qualification-card-item">
                <div className="qualification-icon-badge">
                  <GraduationCap size={18} />
                </div>
                <div className="qualification-content">
                  <div className="qualification-degree">{q.degree}</div>
                  <div className="qualification-institution">
                    <Building2 size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
                    {q.institution}
                  </div>
                  {(q.graduationYear || q.year || q.fieldOfStudy || q.field) && (
                    <div className="qualification-meta-row">
                      {(q.graduationYear || q.year) && (
                        <span>
                          <Calendar size={12} style={{ display: 'inline', marginRight: 3, verticalAlign: -1 }} />
                          Year: {q.graduationYear || q.year}
                        </span>
                      )}
                      {(q.fieldOfStudy || q.field) && (
                        <span>Field: {q.fieldOfStudy || q.field}</span>
                      )}
                    </div>
                  )}
                </div>
                {q.documentUrl && (
                  <a
                    href={q.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                    style={{ flexShrink: 0, gap: 4 }}
                  >
                    <FileCheck size={13} />
                    <span>Document</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', fontStyle: 'italic', margin: 0 }}>
            No formal qualifications recorded.
          </p>
        )}
      </div>
    </div>
  );
}
