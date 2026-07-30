import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  RegisterHeader,
  RegisterFormCard,
  RegisterBenefits
} from '../components/register';

const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <RegisterHeader />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <RegisterFormCard />
            <RegisterBenefits />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;