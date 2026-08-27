import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';

function Spinner() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh' }}>
      <div className="spinner" />
    </div>
  );
}

export default function AdminLayout() {
  const { admin, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!admin)  return <Navigate to="/login" replace />;

  return (
    <div className="admin-shell">
      <Sidebar />
      <div className="admin-main">
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
