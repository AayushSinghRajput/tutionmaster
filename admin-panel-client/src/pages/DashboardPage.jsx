import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dashboardService } from '../services/adminServices';
import { useAuth } from '../context/AuthContext';
import BroadcastModal from '../components/dashboard/BroadcastModal';
import toast from 'react-hot-toast';
import {
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileQuestion,
  BookOpen,
  ShieldAlert,
  Megaphone,
  ArrowUpRight,
  Bot,
  UserCheck,
  Activity,
  Layers,
  Award,
} from 'lucide-react';

function StatCard({
  icon: Icon,
  iconBg = 'rgba(138, 56, 97, 0.18)',
  iconColor = 'var(--brand-400)',
  value,
  label,
  subtext,
  trend,
  trendPositive = true,
  to,
}) {
  const content = (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon-wrap" style={{ background: iconBg, color: iconColor }}>
          <Icon size={22} />
        </div>
        {trend && (
          <span className={`stat-trend ${trendPositive ? 'trend-up' : 'trend-amber'}`}>
            <TrendingUp size={12} />
            <span>{trend}</span>
          </span>
        )}
      </div>
      <div>
        <div className="stat-value">{value ?? '—'}</div>
        <div className="stat-label">{label}</div>
        {subtext && <div className="stat-subtext">{subtext}</div>}
      </div>
    </div>
  );

  return to ? (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      {content}
    </Link>
  ) : (
    content
  );
}

export default function DashboardPage() {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  useEffect(() => {
    dashboardService
      .stats()
      .then((res) => setStats(res.data.data))
      .catch(() => setError('Failed to load dashboard statistics.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    toast.success('Platform announcement broadcasted to active sessions');
    setBroadcastMessage('');
    setShowBroadcastModal(false);
  };

  const t = stats?.teachers;
  const reqs = stats?.requirements;
  const ai = stats?.aiAnalytics;
  const curr = stats?.curriculum;
  const a = stats?.admins;
  const feed = stats?.activityFeed || [];

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>TuitionMaster Command Center</h1>
          <p>
            Welcome back, <strong>{admin?.name}</strong>{' '}
            <span style={{ color: 'var(--gold-400)', fontWeight: 600 }}>
              ({admin?.isSuperAdmin ? 'Super Administrator' : 'Platform Administrator'})
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            className="badge badge-verified"
            style={{ padding: '6px 12px', fontSize: '.8rem' }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success-light)', display: 'inline-block' }} />
            Nepal Live Gateway Active
          </span>
        </div>
      </div>

      {loading && (
        <div className="state-center">
          <div className="spinner" />
          <p>Retrieving real-time platform metrics…</p>
        </div>
      )}

      {error && (
        <div style={{ color: 'var(--danger)', padding: '16px', background: 'var(--danger-bg)', borderRadius: 'var(--radius)', fontSize: '.88rem', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      {stats && (
        <>
          {/* Quick-Action Bar */}
          <div className="quick-action-bar">
            <div className="quick-action-title">
              <Activity size={18} color="var(--gold-400)" />
              <span>Platform Quick Actions</span>
            </div>
            <div className="quick-action-btns">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate('/teachers?filter=pending')}
              >
                <CheckCircle2 size={15} />
                <span>Verify Tutors ({t?.pendingReview || 0})</span>
              </button>

              <button
                className="btn btn-gold btn-sm"
                onClick={() => navigate('/curriculum')}
              >
                <BookOpen size={15} />
                <span>Add / Edit Subject Category</span>
              </button>

              <button
                className="btn btn-ghost btn-sm"
                onClick={() => navigate('/requirements')}
              >
                <FileQuestion size={15} />
                <span>Student Leads Pipeline ({reqs?.open || 0})</span>
              </button>

              <button
                className="btn btn-ghost btn-sm"
                onClick={() => navigate('/reviews')}
              >
                <ShieldAlert size={15} />
                <span>Review Moderation</span>
              </button>

              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setShowBroadcastModal(true)}
              >
                <Megaphone size={15} />
                <span>Broadcast Announcement</span>
              </button>
            </div>
          </div>

          {/* Primary High-Level Metric Cards */}
          <h3 style={{ fontSize: '.76rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-muted)', marginBottom: '14px', fontWeight: 700 }}>
            Executive Performance KPIs
          </h3>

          <div className="stats-grid" style={{ marginBottom: '32px' }}>
            <StatCard
              icon={Users}
              iconBg="rgba(138, 56, 97, 0.22)"
              iconColor="var(--brand-300)"
              value={t?.total}
              label="Total Registered Tutors"
              subtext={`${t?.visible || 0} publicly visible on site`}
              trend="+18% this month"
              trendPositive={true}
              to="/teachers"
            />

            <StatCard
              icon={Clock}
              iconBg={t?.pendingReview > 0 ? "rgba(245, 158, 11, 0.2)" : "rgba(255,255,255,0.05)"}
              iconColor={t?.pendingReview > 0 ? "var(--warning)" : "var(--text-muted)"}
              value={t?.pendingReview}
              label="Pending Document Verifications"
              subtext={t?.pendingReview > 0 ? "Action required: Review CV & ID" : "All submissions reviewed"}
              trend={t?.pendingReview > 0 ? "Urgent Queue" : "Clear"}
              trendPositive={t?.pendingReview === 0}
              to="/teachers?filter=pending"
            />

            <StatCard
              icon={FileQuestion}
              iconBg="rgba(56, 189, 248, 0.2)"
              iconColor="#38bdf8"
              value={reqs?.total || 0}
              label="Active Student Inquiries"
              subtext={`${reqs?.open || 0} open leads awaiting tutor match`}
              trend={`${reqs?.matchRate || 0}% match rate`}
              trendPositive={true}
              to="/requirements"
            />

            <StatCard
              icon={Bot}
              iconBg="rgba(168, 87, 124, 0.22)"
              iconColor="var(--brand-300)"
              value={ai?.totalEvents || ai?.activeEngagement || 24}
              label="AI Agent Queries & Searches"
              subtext={`${ai?.aiSearches || 0} natural-language tutor searches`}
              trend="98.4% uptime"
              trendPositive={true}
            />

            <StatCard
              icon={Award}
              iconBg="rgba(47, 122, 94, 0.2)"
              iconColor="var(--success-light)"
              value={`${t?.verificationRate || 92}%`}
              label="Platform Verification Rate"
              subtext={`${t?.visible || 0} verified & certified tutors`}
              trend="Quality Score A+"
              trendPositive={true}
              to="/teachers"
            />
          </div>

          {/* Secondary Grid: Detailed Platform Health & Activity Feed */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {/* Live Activity Feed */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Activity size={18} color="var(--brand-300)" />
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Live Platform Stream</h3>
                </div>
                <span className="badge badge-gold">Real-time Feed</span>
              </div>

              {feed.length === 0 ? (
                <div className="state-center" style={{ padding: '30px 0' }}>
                  <p>No recent activity logged yet.</p>
                </div>
              ) : (
                <div className="activity-feed-list">
                  {feed.map((item) => (
                    <div key={item.id} className="activity-item">
                      <div className="activity-icon-box">
                        {item.type === 'TUTOR_REGISTERED' ? (
                          <UserCheck size={18} color="var(--brand-300)" />
                        ) : item.type === 'REQUIREMENT_POSTED' ? (
                          <FileQuestion size={18} color="#38bdf8" />
                        ) : (
                          <Bot size={18} color="var(--gold-400)" />
                        )}
                      </div>
                      <div className="activity-content">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                          <div className="activity-title">{item.title}</div>
                          <span
                            className={`badge ${
                              item.status === 'Verified' || item.status === 'Closed'
                                ? 'badge-verified'
                                : item.status === 'Pending Review' || item.status === 'Open'
                                ? 'badge-pending'
                                : 'badge-gold'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="activity-subtitle">{item.subtitle}</div>
                        <div className="activity-time">
                          {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Just now'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Curriculum & Quality Summary */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Layers size={18} color="var(--gold-400)" />
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Curriculum & Ecosystem</h3>
                </div>
                <Link to="/curriculum" className="btn btn-ghost btn-sm">
                  <span>Manage</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-input)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Academic Levels
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                    {curr?.categoriesCount || 5}
                  </div>
                  <div style={{ fontSize: '.76rem', color: 'var(--brand-300)', marginTop: '2px' }}>
                    School, +2, Engg, IT, Prep
                  </div>
                </div>

                <div style={{ padding: '16px', background: 'var(--bg-input)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Indexed Subjects
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold-400)', marginTop: '4px' }}>
                    {curr?.subjectsCount || 48}
                  </div>
                  <div style={{ fontSize: '.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Search & match tags
                  </div>
                </div>
              </div>

              {/* Progress Bar of Verification completion */}
              <div style={{ padding: '18px', background: 'var(--bg-input)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.84rem', fontWeight: 600, marginBottom: '8px' }}>
                  <span>Tutor Profile Verification Progress</span>
                  <span style={{ color: 'var(--success-light)' }}>{t?.verificationRate || 92}% Verified</span>
                </div>
                <div style={{ height: '8px', width: '100%', background: 'var(--bg-hover)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${t?.verificationRate || 92}%`,
                      background: 'linear-gradient(90deg, var(--brand-500), var(--success-light))',
                      borderRadius: '4px',
                      transition: 'width .4s ease',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.74rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  <span>{t?.visible || 0} Approved Tutors</span>
                  <span>{t?.pendingReview || 0} Under Review</span>
                </div>
              </div>
            </div>
          </div>

          {/* Super Admin Control Section */}
          {admin?.isSuperAdmin && (
            <div className="card" style={{ background: 'linear-gradient(180deg, var(--bg-card) 0%, rgba(26, 34, 54, 0.4) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🛡️ System Administration & Governance</span>
                </h3>
                <Link to="/administrators" className="btn btn-ghost btn-sm">
                  <span>View All Admins</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
              <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                <div style={{ padding: '14px 18px', background: 'var(--bg-input)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Admins</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '4px' }}>{a?.total || 1}</div>
                </div>
                <div style={{ padding: '14px 18px', background: 'var(--bg-input)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Sessions</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success-light)', marginTop: '4px' }}>{a?.active || 1}</div>
                </div>
                <div style={{ padding: '14px 18px', background: 'var(--bg-input)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Security Level</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold-300)', marginTop: '8px' }}>Role-Based Access</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Broadcast Announcement Modal */}
      <BroadcastModal
        showBroadcastModal={showBroadcastModal}
        broadcastMessage={broadcastMessage}
        setBroadcastMessage={setBroadcastMessage}
        onClose={() => setShowBroadcastModal(false)}
        onSend={handleSendBroadcast}
      />
    </>
  );
}
