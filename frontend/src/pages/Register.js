import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  RegisterHeader,
  RegisterFormCard,
  RegisterBenefits
} from '../components/register';

const Register = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  useEffect(() => {
    if (isAuthenticated && user) {
      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === 'student') {
        navigate('/teachers', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, from]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-brand-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <RegisterHeader />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <RegisterFormCard />
            <RegisterBenefits />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;