import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import {
  LayoutDashboard,
  UserCheck,
  FileQuestion,
  BookOpen,
  Briefcase,
  FileText,
  Star,
  LifeBuoy,
  Shield,
  LogOut,
  UserPlus,
  Sparkles,
} from 'lucide-react';

const NAV_GROUPS = [
  {
    title: 'Overview',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    title: 'Tutors & Matching',
    items: [
      { to: '/teachers', icon: UserCheck, label: 'Tutor Profiles & Verification' },
      { to: '/requirements', icon: FileQuestion, label: 'Student Inquiries & Leads' },
      { to: '/teachers/create-manual', icon: UserPlus, label: 'Manual Tutor Entry' },
    ],
  },
  {
    title: 'Curriculum & Content',
    items: [
      { to: '/curriculum', icon: BookOpen, label: 'Curriculum & Subjects' },
      { to: '/jobs', icon: Briefcase, label: 'Tuition Vacancies' },
      { to: '/blogs', icon: FileText, label: 'Blog & Articles' },
    ],
  },
  {
    title: 'Quality & Support',
    items: [
      { to: '/reviews', icon: Star, label: 'Review Moderation' },
      { to: '/support-tickets', icon: LifeBuoy, label: 'Support Tickets' },
    ],
  },
];

const SUPER_ADMIN_ITEMS = [
  { to: '/administrators', icon: Shield, label: 'Administrator Access' },
];

export default function Sidebar({ isOpen, isCollapsed, onToggleCollapse, onClose }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login', { replace: true });
  };

  const initials = admin?.name
    ? admin.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : 'TM';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className="sidebar-mobile-backdrop" onClick={onClose} />}

      <aside className={`admin-sidebar ${isOpen ? 'mobile-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-brand-mark">
            <div
              className="logo-icon-badge"
              title="TuitionMaster Admin"
              onClick={isCollapsed ? onToggleCollapse : undefined}
              style={{ cursor: isCollapsed ? 'pointer' : 'default' }}
            >
              <Sparkles size={20} />
            </div>
            {!isCollapsed && (
              <div className="logo-texts">
                <h2>Tuition<span>Master</span></h2>
                <p>Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <div className="nav-section-title">{group.title}</div>
              {group.items.map(({ to, icon: Icon, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end !== undefined ? end : to === '/teachers'}
                  title={label}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={onClose}
                >
                  <div className="nav-item-left">
                    <Icon size={18} />
                    <span>{label}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          ))}

          {admin?.isSuperAdmin && (
            <div>
              <div className="nav-section-title">System Governance</div>
              {SUPER_ADMIN_ITEMS.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  title={label}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={onClose}
                >
                  <div className="nav-item-left">
                    <Icon size={18} />
                    <span>{label}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-admin-card" title={admin?.name || 'Administrator'}>
            <div className="admin-avatar-sm">{initials}</div>
            <div className="admin-meta">
              <div className="admin-meta-name">{admin?.name || 'Administrator'}</div>
              <div className="admin-meta-role">
                {admin?.isSuperAdmin ? '⭐ Super Admin' : 'Admin'}
              </div>
            </div>
          </div>
          <button
            className="btn btn-ghost"
            style={{ width: '100%' }}
            onClick={handleLogout}
            title="Sign Out"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
