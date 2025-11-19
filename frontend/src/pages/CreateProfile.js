import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { teacherService } from '../services/teacherService';
import TeacherForm from '../components/teachers/TeacherForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { toast } from 'react-toastify';

const CreateProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (profileData) => {
    setLoading(true);
    try {
      await teacherService.createTeacher(profileData);
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
    navigate('/dashboard');
  };

  if (loading) {
    return <LoadingSpinner text="Creating your profile..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Teacher Profile
            </h1>
            <p className="text-lg text-gray-600">
              Complete your profile to start attracting students
            </p>
          </div>

          <TeacherForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Create Profile"
            cancelButtonText="Back to Dashboard"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;