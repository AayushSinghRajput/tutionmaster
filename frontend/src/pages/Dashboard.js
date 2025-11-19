import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { teacherService } from '../services/teacherService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { User, Edit, Plus, BookOpen, Calendar, DollarSign, Eye } from 'lucide-react';
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
          <p className="text-lg text-gray-600">Welcome back, {user?.email}</p>
        </div>

        {!profile ? (
          /* No Profile State */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Create Your Teacher Profile
              </h2>
              <p className="text-gray-600 mb-6">
                Start your journey by creating a professional profile to attract students
              </p>
              <Link 
                to="/create-profile" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Profile
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Eye className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Profile Views</h3>
                    <p className="text-2xl font-semibold text-gray-900">0</p>
                    <span className="text-sm text-gray-500">This month</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Availability</h3>
                    <p className="text-2xl font-semibold text-gray-900">
                      {profile.availability?.length || 0}
                    </p>
                    <span className="text-sm text-gray-500">Days per week</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Subjects</h3>
                    <p className="text-2xl font-semibold text-gray-900">
                      {profile.preferredSubjects?.length || 0}
                    </p>
                    <span className="text-sm text-gray-500">Subjects taught</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Hourly Rate</h3>
                    <p className="text-2xl font-semibold text-gray-900">${profile.hourlyRate}</p>
                    <span className="text-sm text-gray-500">Per hour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
                    Profile Overview
                  </h2>
                  <div className="flex space-x-3">
                    <Link 
                      to={`/teachers/${profile._id}`}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Public Profile
                    </Link>
                    <Link 
                      to="/edit-profile"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-6">
                  {/* Profile Basic Info */}
                  <div className="flex items-start space-x-4">
                    <img 
                      src={profile.avatarUrl || '/default-avatar.png'} 
                      alt={profile.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
                      <p className="text-gray-600 mt-1">
                        {profile.address.city}, {profile.address.state}
                      </p>
                      <p className="text-gray-600">
                        {profile.experience} years of experience
                      </p>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Teaching Mode</h4>
                      <p className="text-gray-600">{profile.teachingMode}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.preferredSubjects.map((subject, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Bio</h4>
                      <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  to="/edit-profile"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <Edit className="h-6 w-6 text-gray-400 mr-3" />
                  <span className="text-gray-900 font-medium">Edit Profile</span>
                </Link>
                
                <button 
                  onClick={() => navigate(`/teachers/${profile._id}`)}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
                >
                  <Eye className="h-6 w-6 text-gray-400 mr-3" />
                  <span className="text-gray-900 font-medium">View Public Profile</span>
                </button>
                
                <button 
                  onClick={handleDeleteProfile}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors text-left"
                >
                  <User className="h-6 w-6 text-red-400 mr-3" />
                  <span className="text-red-700 font-medium">Delete Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;