import { useState } from 'react';
import { Outlet, Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import {
  Menu,
  Search,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  BookOpen,
  UserPlus,
  Briefcase,
  ShieldAlert,
} from 'lucide-react';

function Spinner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="spinner" />
    </div>
  );
}

export default function AdminLayout() {
  const { admin, loading } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (!admin) return <Navigate to="/login" replace />;

  const handleToggleSidebar = () => {
    if (window.innerWidth <= 900) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  const handleGlobalSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/teachers?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="admin-shell">
      <Sidebar
        isOpen={mobileSidebarOpen}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleSidebar}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className={`admin-main ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-left">
            <button
              className="btn btn-ghost btn-icon"
              onClick={handleToggleSidebar}
              title={isCollapsed ? "Expand Sidebar Menu" : "Collapse Sidebar Menu"}
              style={{ display: 'inline-flex' }}
            >
              <Menu size={18} />
            </button>

            {/* Global Search */}
            <div className="header-search-bar">
              <Search size={16} className="header-search-icon" />
              <input
                type="text"
                placeholder="Search tutors, subjects, email…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleGlobalSearch}
              />
              <span className="header-search-shortcut">↵</span>
            </div>
          </div>

          <div className="header-right">
            {/* Quick Action Button */}
            <div style={{ position: 'relative' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowQuickMenu(!showQuickMenu)}
              >
                <PlusCircle size={15} />
                <span>Quick Actions</span>
              </button>

              {showQuickMenu && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 120 }}
                    onClick={() => setShowQuickMenu(false)}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)',
                      width: '260px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius)',
                      boxShadow: 'var(--shadow)',
                      padding: '8px',
                      zIndex: 130,
                      animation: 'fadeIn .15s ease',
                    }}
                  >
                    <div style={{ padding: '6px 10px', fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Admin Shortcuts
                    </div>

                    <Link
                      to="/teachers?filter=pending"
                      className="sidebar-nav-item"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        fontSize: '.84rem',
                      }}
                      onClick={() => setShowQuickMenu(false)}
                    >
                      <CheckCircle2 size={16} color="var(--warning)" />
                      <span>Verify Pending Tutors</span>
                    </Link>

                    <Link
                      to="/curriculum"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        fontSize: '.84rem',
                      }}
                      onClick={() => setShowQuickMenu(false)}
                    >
                      <BookOpen size={16} color="var(--brand-300)" />
                      <span>Manage Curriculum</span>
                    </Link>

                    <Link
                      to="/teachers/create-manual"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        fontSize: '.84rem',
                      }}
                      onClick={() => setShowQuickMenu(false)}
                    >
                      <UserPlus size={16} color="var(--success-light)" />
                      <span>Onboard New Tutor</span>
                    </Link>

                    <Link
                      to="/jobs/new"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        fontSize: '.84rem',
                      }}
                      onClick={() => setShowQuickMenu(false)}
                    >
                      <Briefcase size={16} color="var(--info)" />
                      <span>Post Tuition Vacancy</span>
                    </Link>

                    <Link
                      to="/reviews"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        fontSize: '.84rem',
                      }}
                      onClick={() => setShowQuickMenu(false)}
                    >
                      <ShieldAlert size={16} color="var(--gold-400)" />
                      <span>Review Moderation</span>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Public website link */}
            <a
              href="https://tuitionmaster.guru"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
              title="Open Public TuitionMaster Site"
            >
              <ExternalLink size={15} />
              <span>Live Site</span>
            </a>
          </div>
        </header>

        {/* Content Body */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
