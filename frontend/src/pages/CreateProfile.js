import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { teacherService } from '../services/teacherService';
import { useAuth } from '../context/AuthContext';
import { clearTeacherProfileDraft } from '../utils/formDraftStorage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProfilePageHeader from '../components/teachers/ProfilePageHeader';
import ProfileFormCard from '../components/teachers/ProfileFormCard';
import BenefitsSidebar from '../components/teachers/BenefitsSidebar';
import VideoOverlayBanner from '../components/video/VideoOverlayBanner';
import { PlayCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const CreateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Auto popup video guide once for first time profile creation
    const hasSeenGuide = localStorage.getItem('hasSeenProfileVideoGuide');
    if (!hasSeenGuide) {
      setShowVideoModal(true);
      localStorage.setItem('hasSeenProfileVideoGuide', 'true');
    }
  }, []);

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
      {showVideoModal && (
        <VideoOverlayBanner onClose={() => setShowVideoModal(false)} />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfilePageHeader onBack={handleCancel} />

        {/* Video Guide Callout Banner */}
        <div className="mb-6 bg-gradient-to-r from-brand-600 to-brand-800 text-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl shrink-0">
              <PlayCircle className="w-6 h-6 text-gold-300" />
            </div>
            <div>
              <h4 className="font-bold text-base">First Time Creating Your Tutor Profile?</h4>
              <p className="text-brand-100 text-xs sm:text-sm">Watch our step-by-step video guide to complete your profile in minutes.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowVideoModal(true)}
            className="w-full sm:w-auto shrink-0 bg-white text-brand-800 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-4 h-4 text-brand-600" />
            Watch Video Guide
          </button>
        </div>

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