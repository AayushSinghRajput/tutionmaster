import { useEffect, useState } from 'react';
import { dashboardService } from '../services/adminServices';
import { useAuth } from '../context/AuthContext';

function StatCard({ icon, value, label, color = 'var(--brand-500)' }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value" style={{ color }}>{value ?? '—'}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  const { admin } = useAuth();
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');

  useEffect(() => {
    dashboardService.stats()
      .then(res => setStats(res.data.data))
      .catch(() => setError('Failed to load dashboard statistics.'))
      .finally(() => setLoading(false));
  }, []);

  const t = stats?.teachers;
  const a = stats?.admins;

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, <strong>{admin?.name}</strong>
            {admin?.isSuperAdmin && ' ⭐'}
          </p>
        </div>
      </div>

      {loading && (
        <div className="state-center">
          <div className="spinner" />
          <p>Loading statistics…</p>
        </div>
      )}

      {error && (
        <div style={{ color: 'var(--danger)', padding: '16px', background: 'var(--danger-bg)', borderRadius: 'var(--radius)', fontSize: '.88rem' }}>
          {error}
        </div>
      )}

      {stats && (
        <>
          <h3 style={{ fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text-muted)', marginBottom: '14px', fontWeight: 600 }}>
            Teacher Profiles
          </h3>
          <div className="stats-grid" style={{ marginBottom: '28px' }}>
            <StatCard icon="👩‍🏫" value={t?.total}          label="Total Teachers"   />
            <StatCard icon="✅" value={t?.visible}        label="Publicly Visible"  color="var(--success)" />
            <StatCard icon="🙈" value={t?.hidden}         label="Hidden Profiles"   color="var(--text-muted)" />
            <StatCard icon="⏳" value={t?.pendingReview}  label="Pending Review"    color="var(--warning)" />
            <StatCard icon="🚫" value={t?.inactive}       label="Inactive"          color="var(--danger)" />
            <StatCard icon="🆕" value={t?.recentlyAdded}  label="Added This Week"   color="var(--info)" />
          </div>

          {admin?.isSuperAdmin && (
            <>
              <h3 style={{ fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text-muted)', marginBottom: '14px', fontWeight: 600 }}>
                Administrators
              </h3>
              <div className="stats-grid">
                <StatCard icon="🛡️" value={a?.total}  label="Total Admins"  />
                <StatCard icon="✅" value={a?.active} label="Active Admins" color="var(--success)" />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
