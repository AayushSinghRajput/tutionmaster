import { Link } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';

const LoginCard = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-blue-100/50 transform transition-all duration-500 hover:shadow-blue-100/50">
      <LoginForm />

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          New to TutionMaster?{' '}
          <Link
            to="/register"
            className="text-blue-600 font-bold hover:text-blue-700 transition-colors duration-200 underline underline-offset-4 hover:underline-offset-2"
          >
            Create your account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginCard;