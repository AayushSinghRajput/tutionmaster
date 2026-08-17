import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { teacherService } from '../services/teacherService';
import { useAuth } from '../context/AuthContext';
import { clearTeacherProfileDraft } from '../utils/formDraftStorage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProfilePageHeader from '../components/teachers/ProfilePageHeader';
import ProfileFormCard from '../components/teachers/ProfileFormCard';
import BenefitsSidebar from '../components/teachers/BenefitsSidebar';
import { toast } from 'react-toastify';

const CreateProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (profileData) => {
    setLoading(true);
    try {
      await teacherService.createTeacher(profileData);
      clearTeacherProfileDraft(user?.id);
      toast.success('Profile created successfully!');
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create profile';
      toast.error(message);
      console.error('Error creating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    clearTeacherProfileDraft(user?.id);
    navigate('/dashboard');
  };

  if (loading) {
    return <LoadingSpinner text="Creating your profile..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-stone-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfilePageHeader onBack={handleCancel} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-8">
            <ProfileFormCard onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>

          <div className="lg:col-span-4">
            <BenefitsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;