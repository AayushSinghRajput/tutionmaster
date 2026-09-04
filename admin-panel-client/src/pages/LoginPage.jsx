import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  GraduationCap,
} from 'lucide-react';

export default function LoginPage() {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Already logged in — go to dashboard
  if (admin) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please provide both your administrator email and password.');
      return;
    }
    setLoading(true);
    try {
      await login(form.email.trim(), form.password);
      toast.success('Welcome back, Administrator!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.error || 'Invalid credentials or inactive account.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Brand Header */}
        <div className="login-brand">
          <div className="login-logo-badge">
            <GraduationCap size={28} />
          </div>
          <h1 className="login-title">TuitionMaster</h1>
          <div className="login-subtitle">
            <ShieldCheck size={14} color="var(--gold-400)" />
            <span>Admin Management Console</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} id="admin-login-form">
          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'var(--danger-bg)',
                color: 'var(--danger)',
                border: '1px solid var(--danger-border)',
                borderRadius: 'var(--radius)',
                padding: '11px 14px',
                fontSize: '.84rem',
                marginBottom: '18px',
              }}
            >
              <AlertCircle size={17} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Email Address */}
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label" htmlFor="login-email">
              Administrator Email
            </label>
            <div className="login-input-wrapper">
              <span className="login-input-icon">
                <Mail size={17} />
              </span>
              <input
                id="login-email"
                type="email"
                name="email"
                className="login-input"
                placeholder="admin@tuitionmaster.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <div className="login-input-wrapper">
              <span className="login-input-icon">
                <Lock size={17} />
              </span>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="login-input"
                placeholder="••••••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="login-submit-btn"
            type="submit"
            className="login-btn-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner spinner-sm" />
                <span>Authenticating…</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Secure Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Security Notice */}
        <div className="login-footer-badge">
          <ShieldCheck size={13} color="var(--gold-400)" />
          <span>Restricted Admin Portal · 256-Bit Encrypted Session</span>
        </div>
      </div>
    </div>
  );
}
