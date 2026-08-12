import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginBrandHeader from '../components/login/LoginBrandHeader';
import LoginCard from '../components/login/LoginCard';
import LoginSidebar from '../components/login/LoginSidebar';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-brand-50 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-full">
            <LoginBrandHeader />
            <LoginCard />
          </div>

          <LoginSidebar />
        </div>
      </div>
    </div>
  );
};

export default Login;