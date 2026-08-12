import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const GoogleAuthButton = () => {
  const { loginWithGoogle } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    const result = await loginWithGoogle(credentialResponse.credential);
    if (result.success) {
      toast.success('Signed in with Google successfully!');
    } else {
      toast.error(result.error || 'Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error('Google sign-in failed. Please try again.')}
        width="320"
        text="continue_with"
        shape="pill"
      />
    </div>
  );
};

export default GoogleAuthButton;
