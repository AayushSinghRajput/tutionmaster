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
  Download
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
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading your dashboard..." />
      </div>
    );
  }

  const profileCompleteness = calculateProfileCompleteness();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.email}</p>
          </div>
          {currentTeacher && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleViewPublicProfile}
                className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                <Eye size={16} />
                <span>View Public Profile</span>
              </button>
              <button 
                onClick={handleEditProfile}
                className="flex items-center justify-center space-x-2 px-4 py-2 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <Edit size={16} />
                <span>Edit Profile</span>
              </button>
            </div>
          )}
        </div>

        {!currentTeacher ? (
          /* No Profile State */
          <div className="flex items-center justify-center py-16">
            <div className="text-center max-w-2xl">
              <BookOpen size={80} className="mx-auto text-gray-400 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your Teacher Profile</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Start connecting with students by creating a professional profile. 
                Showcase your qualifications, experience, and teaching style to attract the right students.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
                <div className="flex items-center space-x-3 text-gray-600">
                  <User size={20} className="text-blue-500" />
                  <span>Reach thousands of potential students</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <DollarSign size={20} className="text-blue-500" />
                  <span>Set your own hourly rates</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar size={20} className="text-blue-500" />
                  <span>Flexible teaching schedule</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Star size={20} className="text-blue-500" />
                  <span>Build your teaching reputation</span>
                </div>
              </div>
              <Link 
                to="/create-profile" 
                className="inline-flex items-center space-x-2 px-6 py-3 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <Plus size={20} />
                <span>Create Your Profile</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Profile Exists State */
          <div className="space-y-8">
            {/* Profile Stats */}
            <ProfileStats 
              teacher={currentTeacher}
              completeness={profileCompleteness}
            />

            {/* Main Content Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'profile', label: 'Profile Details' },
                    { id: 'settings', label: 'Settings' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-4 px-6 text-center font-medium border-b-2 transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
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

// Overview Tab Component
const OverviewTab = ({ teacher, onEditProfile, onViewProfile }) => {
  const stats = [
    {
      icon: Eye,
      label: 'Profile Views',
      value: '0',
      description: 'This month'
    },
    {
      icon: MessageCircle,
      label: 'Messages',
      value: '0',
      description: 'Waiting for reply'
    },
    {
      icon: Star,
      label: 'Student Reviews',
      value: '0',
      description: 'Average rating'
    },
    {
      icon: Download,
      label: 'CV Downloads',
      value: teacher.cvPublicId ? '0' : 'Not available',
      description: 'Total downloads'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <stat.icon size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <span className="text-xs text-gray-500">{stat.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={onEditProfile}
            className="text-left p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
          >
            <Edit size={24} className="text-blue-600 mb-2" />
            <span className="block font-medium text-gray-900">Edit Profile</span>
            <p className="text-sm text-gray-600 mt-1">Update your information and photos</p>
          </button>
          
          <button 
            onClick={onViewProfile}
            className="text-left p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
          >
            <Eye size={24} className="text-blue-600 mb-2" />
            <span className="block font-medium text-gray-900">View Public Profile</span>
            <p className="text-sm text-gray-600 mt-1">See how students view your profile</p>
          </button>
          
          <button className="text-left p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200">
            <Calendar size={24} className="text-blue-600 mb-2" />
            <span className="block font-medium text-gray-900">Update Availability</span>
            <p className="text-sm text-gray-600 mt-1">Set your teaching schedule</p>
          </button>
          
          <button className="text-left p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200">
            <Settings size={24} className="text-blue-600 mb-2" />
            <span className="block font-medium text-gray-900">Profile Settings</span>
            <p className="text-sm text-gray-600 mt-1">Manage privacy and notifications</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <BookOpen size={40} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium">Your recent activity will appear here</p>
          <span className="text-sm text-gray-500">
            This could include profile views, messages, and student inquiries
          </span>
        </div>
      </div>
    </div>
  );
};

// Profile Tab Component
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Personal Information</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <strong className="text-gray-700">Full Name:</strong>
              <span className="text-gray-900">{name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <strong className="text-gray-700">Email:</strong>
              <span className="text-gray-900">{contact.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <strong className="text-gray-700">Phone:</strong>
              <span className="text-gray-900">{contact.phone}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <strong className="text-gray-700">Location:</strong>
              <span className="text-gray-900">{address.city}, {address.state}</span>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Professional Information</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <strong className="text-gray-700">Teaching Experience:</strong>
              <span className="text-gray-900">{experience} years</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <strong className="text-gray-700">Hourly Rate:</strong>
              <span className="text-gray-900">${hourlyRate}/hour</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <strong className="text-gray-700">Teaching Mode:</strong>
              <span className="text-gray-900">{teachingMode}</span>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Subjects Taught</h4>
          <div className="flex flex-wrap gap-2">
            {preferredSubjects.map((subject, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Qualifications */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Qualifications</h4>
          <div className="space-y-3">
            {qualifications.map((qual, index) => (
              <div key={index} className="py-2 border-b border-gray-100 last:border-b-0">
                <strong className="block text-gray-900">{qual.degree}</strong>
                <span className="text-sm text-gray-600">{qual.institution} ({qual.year})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Bio & Teaching Philosophy</h4>
        <div className="text-gray-700 leading-relaxed">
          <p>{bio}</p>
        </div>
      </div>

      {/* Availability */}
      {availability && availability.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Availability</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availability.map((slot, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <strong className="block text-gray-900 mb-2">{slot.day}:</strong>
                <div className="space-y-1">
                  {slot.timeSlots.map((timeSlot, timeIndex) => (
                    <span key={timeIndex} className="block text-sm text-gray-600">
                      {timeSlot.start} - {timeSlot.end}
                    </span>
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

// Settings Tab Component
const SettingsTab = ({ 
  teacher, 
  onDeleteProfile, 
  deleteConfirm, 
  onCancelDelete, 
  onConfirmDelete 
}) => {
  return (
    <div className="space-y-8">
      {/* Profile Visibility */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h4>
        <p className="text-gray-600 mb-4">Your profile is currently <strong>public</strong> and visible to all students.</p>
        <label className="flex items-center space-x-3 cursor-pointer">
          <div className="relative">
            <input type="checkbox" className="sr-only" defaultChecked />
            <div className="w-10 h-6 bg-blue-600 rounded-full"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-4"></div>
          </div>
          <span className="text-gray-700 font-medium">Make profile visible to students</span>
        </label>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h4>
        <div className="space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" defaultChecked />
              <div className="w-10 h-6 bg-blue-600 rounded-full"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-4"></div>
            </div>
            <span className="text-gray-700">Email notifications for new messages</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" defaultChecked />
              <div className="w-10 h-6 bg-blue-600 rounded-full"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-4"></div>
            </div>
            <span className="text-gray-700">Email notifications for profile views</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-6 bg-gray-300 rounded-full"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200"></div>
            </div>
            <span className="text-gray-700">Weekly summary emails</span>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h4>
        <p className="text-red-700 mb-4">Once you delete your profile, there is no going back. Please be certain.</p>
        
        {!deleteConfirm ? (
          <button 
            onClick={onDeleteProfile}
            className="flex items-center space-x-2 px-4 py-2 border border-transparent rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            <Trash2 size={16} />
            <span>Delete Profile</span>
          </button>
        ) : (
          <div className="bg-white p-4 rounded-lg border border-red-300">
            <p className="text-red-700 font-medium mb-4">Are you sure you want to delete your profile? This action cannot be undone.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={onCancelDelete}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirmDelete}
                className="flex-1 px-4 py-2 border border-transparent rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 font-medium"
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