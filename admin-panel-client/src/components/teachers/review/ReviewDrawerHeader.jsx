import { X } from 'lucide-react';

export default function ReviewDrawerHeader({ teacher, onClose }) {
  const initials =
    teacher.name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'TM';

  return (
    <div className="drawer-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {teacher.avatarUrl ? (
          <img
            src={teacher.avatarUrl}
            alt={teacher.name}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              objectFit: 'cover',
              border: '1px solid var(--border)',
            }}
          />
        ) : (
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, var(--brand-600), var(--brand-700))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            {initials}
          </div>
        )}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>{teacher.name}</h3>
            <span className={`badge ${teacher.isVisible ? 'badge-verified' : 'badge-pending'}`}>
              {teacher.isVisible ? 'Verified & Public' : 'Pending Review'}
            </span>
          </div>
          <div style={{ fontSize: '.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {teacher.contact?.email} · {teacher.address?.city || 'Nepal'}
          </div>
        </div>
      </div>
      <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close Drawer">
        <X size={18} />
      </button>
    </div>
  );
}
