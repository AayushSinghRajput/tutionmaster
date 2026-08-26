import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Wrap any route that requires Super Admin.
 * Shows an "Access Denied" screen to normal admins instead of redirecting.
 */
export default function SuperAdminRoute({ children }) {
  const { admin } = useAuth();

  if (!admin?.isSuperAdmin) {
    return (
      <div className="access-denied">
        <div className="icon">🔒</div>
        <h2>Access Denied</h2>
        <p>This page is only accessible to the Super Administrator.</p>
      </div>
    );
  }

  return children;
}
