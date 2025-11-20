import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTeacher } from '../../context/TeacherContext';
import { useAuth } from '../../context/AuthContext';
import ProfileStats from './ProfileStats';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  User, 
  Edit, 
  Plus, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  Eye,
  Trash2,
  Settings,
  MessageCircle,
  Star,
  Download,
  ChevronRight,
  MapPin,
  Clock,
  Award,
  Bell,
  Shield,
  GraduationCap,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { currentTeacher, loadingTeacher, fetchMyProfile, deleteTeacherProfile } = useTeacher();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Refresh profile data when component mounts
    fetchMyProfile();
  }, []);

  const handleDeleteProfile = async () => {
    if (!currentTeacher) return;

    try {
      await deleteTeacherProfile(currentTeacher._id);
      toast.success('Profile deleted successfully');
      setDeleteConfirm(false);
      // Profile will be cleared from context automatically
    } catch (error) {
      toast.error('Failed to delete profile');
    }
  };

  const handleViewPublicProfile = () => {
    if (currentTeacher) {
      navigate(`/teachers/${currentTeacher._id}`);
    }
  };

  const handleEditProfile = () => {
    if (currentTeacher) {
      navigate('/edit-profile');
    } else {
      navigate('/create-profile');
    }
  };

  // Calculate profile completeness
  const calculateProfileCompleteness = () => {
    if (!currentTeacher) return 0;

    const requiredFields = [
      'name',
      'bio',
      'contact.email',
      'contact.phone',
      'address.city',
      'address.state',
      'experience',
      'teachingMode',
      'hourlyRate',
      'preferredSubjects',
      'qualifications'
    ];

    let completedFields = 0;

    requiredFields.forEach(field => {
      const value = getNestedValue(currentTeacher, field);
      if (Array.isArray(value)) {
        if (value.length > 0) completedFields++;
      } else if (value !== '' && value !== null && value !== undefined) {
        completedFields++;
      }
    });

    // Check for profile picture and CV (bonus points)
    if (currentTeacher.avatarPublicId) completedFields += 0.5;
    if (currentTeacher.cvPublicId) completedFields += 0.5;

    return Math.round((completedFields / requiredFields.length) * 100);
  };

  // Helper function to get nested object values
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => {
      return current ? current[key] : undefined;
    }, obj);
  };

  if (loadingTeacher) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <LoadingSpinner text="Loading your dashboard..." />
      </div>
    );
  }

  const profileCompleteness = calculateProfileCompleteness();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-25 via-white to-indigo-25 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
                  <BookOpen size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold">Teacher Dashboard</h1>
                  <p className="text-blue-100 text-lg mt-2">Welcome back, {user?.email}</p>
                </div>
              </div>
              {currentTeacher && (
                <div className="flex items-center space-x-4 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{currentTeacher.address?.city}, {currentTeacher.address?.state}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{currentTeacher.experience} years experience</span>
                  </div>
                </div>
              )}
            </div>
            {currentTeacher && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleViewPublicProfile}
                  className="flex items-center justify-center space-x-3 px-6 py-3 border-2 border-white border-opacity-30 rounded-xl text-white bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 font-semibold backdrop-blur-sm hover:scale-105"
                >
                  <Eye size={18} />
                  <span>View Public Profile</span>
                </button>
                <button 
                  onClick={handleEditProfile}
                  className="flex items-center justify-center space-x-3 px-6 py-3 border border-transparent rounded-xl text-blue-600 bg-white hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Edit size={18} />
                  <span>Edit Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {!currentTeacher ? (
          /* Enhanced No Profile State */
          <div className="flex items-center justify-center py-16">
            <div className="text-center max-w-3xl">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl">
                <BookOpen size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Your Teacher Profile</h2>
              <p className="text-gray-600 text-xl mb-8 leading-relaxed">
                Start your teaching journey by creating a professional profile that showcases your expertise and connects you with eager students.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 text-left">
                {[
                  { icon: User, text: 'Reach thousands of potential students', color: 'text-blue-500' },
                  { icon: DollarSign, text: 'Set your own competitive hourly rates', color: 'text-green-500' },
                  { icon: Calendar, text: 'Flexible teaching schedule on your terms', color: 'text-purple-500' },
                  { icon: Star, text: 'Build your teaching reputation and reviews', color: 'text-yellow-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <item.icon size={20} className={item.color} />
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link 
                to="/create-profile" 
                className="inline-flex items-center space-x-3 px-8 py-4 border border-transparent rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus size={22} />
                <span className="text-lg">Create Your Teaching Profile</span>
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        ) : (
          /* Enhanced Profile Exists State */
          <div className="space-y-8">
            {/* Profile Stats */}
            <ProfileStats 
              teacher={currentTeacher}
              completeness={profileCompleteness}
            />

            {/* Enhanced Main Content Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
              <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <nav className="flex -mb-px">
                  {[
                    { id: 'overview', label: 'Overview', icon: TrendingUp },
                    { id: 'profile', label: 'Profile Details', icon: User },
                    { id: 'settings', label: 'Settings', icon: Settings }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-5 px-6 text-center font-semibold border-b-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600 bg-white shadow-sm'
                          : 'border-transparent text-gray-600 hover:text-blue-500 hover:bg-white hover:bg-opacity-50'
                      }`}
                    >
                      <tab.icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-8">
                {activeTab === 'overview' && (
                  <OverviewTab 
                    teacher={currentTeacher}
                    onEditProfile={handleEditProfile}
                    onViewProfile={handleViewPublicProfile}
                  />
                )}

                {activeTab === 'profile' && (
                  <ProfileTab teacher={currentTeacher} />
                )}

                {activeTab === 'settings' && (
                  <SettingsTab 
                    teacher={currentTeacher}
                    onDeleteProfile={() => setDeleteConfirm(true)}
                    deleteConfirm={deleteConfirm}
                    onCancelDelete={() => setDeleteConfirm(false)}
                    onConfirmDelete={handleDeleteProfile}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Overview Tab Component
const OverviewTab = ({ teacher, onEditProfile, onViewProfile }) => {
  const stats = [
    {
      icon: Eye,
      label: 'Profile Views',
      value: '0',
      description: 'This month',
      trend: '+0%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: MessageCircle,
      label: 'Messages',
      value: '0',
      description: 'Waiting for reply',
      trend: '+0%',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Star,
      label: 'Student Reviews',
      value: '0',
      description: 'Average rating',
      trend: '+0%',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Download,
      label: 'CV Downloads',
      value: teacher.cvPublicId ? '0' : 'Not available',
      description: 'Total downloads',
      trend: '+0%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <span className="text-sm font-semibold text-green-500">{stat.trend}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <span className="text-xs text-gray-500 font-medium">{stat.description}</span>
          </div>
        ))}
      </div>

      {/* Enhanced Quick Actions */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <Zap size={24} className="text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Edit,
              title: 'Edit Profile',
              description: 'Update your information and photos',
              action: onEditProfile,
              color: 'from-blue-500 to-blue-600'
            },
            {
              icon: Eye,
              title: 'View Public Profile',
              description: 'See how students view your profile',
              action: onViewProfile,
              color: 'from-green-500 to-green-600'
            },
            {
              icon: Calendar,
              title: 'Update Availability',
              description: 'Set your teaching schedule',
              action: () => {},
              color: 'from-purple-500 to-purple-600'
            },
            {
              icon: Settings,
              title: 'Profile Settings',
              description: 'Manage privacy and notifications',
              action: () => {},
              color: 'from-orange-500 to-orange-600'
            }
          ].map((action, index) => (
            <button 
              key={index}
              onClick={action.action}
              className="text-left p-6 bg-gradient-to-br from-white to-blue-25 rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon size={24} className="text-white" />
              </div>
              <span className="block font-bold text-gray-900 mb-2">{action.title}</span>
              <p className="text-sm text-gray-600 leading-relaxed">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Recent Activity */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <Target size={24} className="text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-dashed border-blue-200 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <BookOpen size={32} className="text-blue-400" />
          </div>
          <p className="text-gray-700 font-semibold text-lg mb-2">Your teaching journey begins here</p>
          <span className="text-gray-600">
            Profile views, messages, and student inquiries will appear here as you grow your presence
          </span>
        </div>
      </div>
    </div>
  );
};

// Enhanced Profile Tab Component
const ProfileTab = ({ teacher }) => {
  const {
    name,
    bio,
    contact,
    address,
    experience,
    hourlyRate,
    teachingMode,
    preferredSubjects,
    qualifications,
    availability
  } = teacher;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Personal Information */}
        <div className="bg-gradient-to-br from-white to-blue-25 rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <User size={20} className="text-blue-600" />
            <h4 className="text-lg font-bold text-gray-900">Personal Information</h4>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Full Name', value: name },
              { label: 'Email', value: contact.email },
              { label: 'Phone', value: contact.phone },
              { label: 'Location', value: `${address.city}, ${address.state}` }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-blue-50 last:border-b-0">
                <strong className="text-gray-700 font-semibold">{item.label}:</strong>
                <span className="text-gray-900 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Professional Information */}
        <div className="bg-gradient-to-br from-white to-blue-25 rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Award size={20} className="text-blue-600" />
            <h4 className="text-lg font-bold text-gray-900">Professional Information</h4>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Teaching Experience', value: `${experience} years` },
              { label: 'Hourly Rate', value: `$${hourlyRate}/hour` },
              { label: 'Teaching Mode', value: teachingMode }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-blue-50 last:border-b-0">
                <strong className="text-gray-700 font-semibold">{item.label}:</strong>
                <span className="text-gray-900 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Subjects */}
        <div className="bg-gradient-to-br from-white to-blue-25 rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <GraduationCap size={20} className="text-blue-600" />
            <h4 className="text-lg font-bold text-gray-900">Subjects Taught</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {preferredSubjects.map((subject, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Qualifications */}
        <div className="bg-gradient-to-br from-white to-blue-25 rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen size={20} className="text-blue-600" />
            <h4 className="text-lg font-bold text-gray-900">Qualifications</h4>
          </div>
          <div className="space-y-4">
            {qualifications.map((qual, index) => (
              <div key={index} className="py-3 border-b border-blue-50 last:border-b-0">
                <strong className="block text-gray-900 font-semibold text-lg">{qual.degree}</strong>
                <span className="text-gray-600 font-medium">{qual.institution} ({qual.year})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Bio */}
      <div className="bg-gradient-to-br from-white to-blue-25 rounded-2xl p-6 border border-blue-100 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <User size={20} className="text-blue-600" />
          <h4 className="text-lg font-bold text-gray-900">Bio & Teaching Philosophy</h4>
        </div>
        <div className="text-gray-700 leading-relaxed text-lg">
          <p>{bio}</p>
        </div>
      </div>

      {/* Enhanced Availability */}
      {availability && availability.length > 0 && (
        <div className="bg-gradient-to-br from-white to-blue-25 rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar size={20} className="text-blue-600" />
            <h4 className="text-lg font-bold text-gray-900">Teaching Availability</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availability.map((slot, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-blue-100 hover:border-blue-200 transition-all duration-300">
                <strong className="block text-gray-900 font-bold text-lg mb-3">{slot.day}:</strong>
                <div className="space-y-2">
                  {slot.timeSlots.map((timeSlot, timeIndex) => (
                    <div key={timeIndex} className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2">
                      <span className="text-blue-700 font-semibold">{timeSlot.start}</span>
                      <span className="text-blue-500 mx-2">→</span>
                      <span className="text-blue-700 font-semibold">{timeSlot.end}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Settings Tab Component
const SettingsTab = ({ 
  teacher, 
  onDeleteProfile, 
  deleteConfirm, 
  onCancelDelete, 
  onConfirmDelete 
}) => {
  return (
    <div className="space-y-8">
      {/* Enhanced Profile Visibility */}
      <div className="bg-gradient-to-br from-white to-blue-25 rounded-2xl p-6 border border-blue-100 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <Eye size={20} className="text-blue-600" />
          <h4 className="text-lg font-bold text-gray-900">Profile Visibility</h4>
        </div>
        <p className="text-gray-600 mb-6">Your profile is currently <strong className="text-green-600">public</strong> and visible to all students searching for tutors.</p>
        <label className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-200 cursor-pointer hover:border-blue-300 transition-colors duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Eye size={16} className="text-green-600" />
            </div>
            <div>
              <span className="block font-semibold text-gray-900">Public Profile</span>
              <span className="text-sm text-gray-600">Visible to all students</span>
            </div>
          </div>
          <div className="relative">
            <input type="checkbox" className="sr-only" defaultChecked />
            <div className="w-12 h-6 bg-green-500 rounded-full"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 transform translate-x-6"></div>
          </div>
        </label>
      </div>

      {/* Enhanced Notification Settings */}
      <div className="bg-gradient-to-br from-white to-blue-25 rounded-2xl p-6 border border-blue-100 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <Bell size={20} className="text-blue-600" />
          <h4 className="text-lg font-bold text-gray-900">Notification Settings</h4>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Email notifications for new messages', defaultChecked: true },
            { label: 'Email notifications for profile views', defaultChecked: true },
            { label: 'Weekly teaching summary emails', defaultChecked: false }
          ].map((setting, index) => (
            <label key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-200 cursor-pointer hover:border-blue-300 transition-colors duration-300">
              <span className="text-gray-700 font-medium">{setting.label}</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" defaultChecked={setting.defaultChecked} />
                <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  setting.defaultChecked ? 'bg-blue-500' : 'bg-gray-300'
                }`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                  setting.defaultChecked ? 'transform translate-x-6' : ''
                }`}></div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Enhanced Danger Zone */}
      <div className="bg-gradient-to-br from-red-50 to-red-25 rounded-2xl p-6 border border-red-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <Shield size={20} className="text-red-600" />
          <h4 className="text-lg font-bold text-red-900">Account Management</h4>
        </div>
        <p className="text-red-700 mb-6 leading-relaxed">
          Once you delete your teaching profile, all your data including student connections, reviews, and profile information will be permanently removed. This action cannot be undone.
        </p>
        
        {!deleteConfirm ? (
          <button 
            onClick={onDeleteProfile}
            className="flex items-center space-x-3 px-6 py-3 border border-transparent rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Trash2 size={18} />
            <span>Delete Teaching Profile</span>
          </button>
        ) : (
          <div className="bg-white p-6 rounded-xl border border-red-300 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield size={20} className="text-red-600" />
              </div>
              <h5 className="text-lg font-bold text-red-900">Confirm Profile Deletion</h5>
            </div>
            <p className="text-red-700 font-medium mb-6">Are you absolutely sure you want to delete your teaching profile? This action cannot be reversed.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onCancelDelete}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 font-semibold hover:scale-105"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirmDelete}
                className="flex-1 px-6 py-3 border border-transparent rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold hover:scale-105"
              >
                Yes, Delete My Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;