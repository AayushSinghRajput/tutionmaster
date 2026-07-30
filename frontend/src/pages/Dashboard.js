import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { teacherService } from '../services/teacherService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import NoProfileState from '../components/dashboard/NoProfileState';
import StatsGrid from '../components/dashboard/StatsGrid';
import ProfileOverviewCard from '../components/dashboard/ProfileOverviewCard';
import QuickActionsCard from '../components/dashboard/QuickActionsCard';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await teacherService.getMyProfile();
      setProfile(response.data.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setProfile(null);
      } else {
        toast.error('Failed to load profile');
        console.error('Error fetching profile:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (!window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      return;
    }

    try {
      await teacherService.deleteProfile(profile._id);
      toast.success('Profile deleted successfully');
      setProfile(null);
    } catch (error) {
      toast.error('Failed to delete profile');
      console.error('Error deleting profile:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader username={user?.username} />

        {!profile ? (
          <NoProfileState />
        ) : (
          <div className="space-y-8">
            <StatsGrid profile={profile} />
            <ProfileOverviewCard profile={profile} />
            <QuickActionsCard
              profileId={profile._id}
              onViewProfile={() => navigate(`/teachers/${profile._id}`)}
              onDeleteProfile={handleDeleteProfile}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;