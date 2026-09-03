import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const NAV = [
  { to: '/dashboard',      icon: '📊', label: 'Dashboard' },
  { to: '/teachers',       icon: '👩‍🏫', label: 'Teacher Profiles' },
  { to: '/blogs',          icon: '📝', label: 'Blog Posts' },
  { to: '/jobs',           icon: '💼', label: 'Tuition Vacancies' },
  { to: '/reviews',        icon: '⭐', label: 'Review Moderation' },
];

const SUPER_ADMIN_NAV = [
  { to: '/administrators', icon: '🛡️',  label: 'Administrators' },
];

export default function Sidebar() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/login', { replace: true });
  };

  const initials = admin?.name
    ? admin.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <h2>TuitionMaster</h2>
        <p>Admin Panel</p>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="nav-icon">{icon}</span>
            {label}
          </NavLink>
        ))}

        {admin?.isSuperAdmin && (
          <>
            <div style={{ margin: '8px 0', borderTop: '1px solid var(--border)' }} />
            {SUPER_ADMIN_NAV.map(({ to, icon, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="nav-icon">{icon}</span>
                {label}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-admin-info">
          <p>{admin?.name || '—'}</p>
          <p className={`role-badge ${admin?.isSuperAdmin ? 'role-super' : 'role-admin'}`}>
            {admin?.isSuperAdmin ? '⭐ Super Admin' : 'Admin'}
          </p>
        </div>
        <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
