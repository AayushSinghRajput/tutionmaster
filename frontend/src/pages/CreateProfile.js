import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { teacherService } from '../services/teacherService';
import TeacherForm from '../components/teachers/TeacherForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { toast } from 'react-toastify';
import { BookOpen, ArrowLeft, Star } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-25 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <button
            onClick={handleCancel}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Create Your Teacher Profile
              </h1>
              <p className="text-xl text-gray-600">
                Build your professional presence and start teaching
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Star className="w-6 h-6 mr-3" />
                  Profile Information
                </h2>
                <p className="text-blue-100 mt-2">
                  Complete all sections to create an engaging teacher profile
                </p>
              </div>
              
              <div className="p-8">
                <TeacherForm
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  submitButtonText={
                    <div className="flex items-center justify-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Create Professional Profile
                    </div>
                  }
                  cancelButtonText="Cancel"
                />
              </div>
            </div>
          </div>

          {/* Sidebar Benefits Section */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-blue-500" />
                Why Create a Profile?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Reach More Students</h4>
                    <p className="text-sm text-gray-600 mt-1">Get discovered by students worldwide</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Build Credibility</h4>
                    <p className="text-sm text-gray-600 mt-1">Showcase your expertise and qualifications</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Flexible Scheduling</h4>
                    <p className="text-sm text-gray-600 mt-1">Set your own availability and rates</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-blue-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Secure Payments</h4>
                    <p className="text-sm text-gray-600 mt-1">Get paid securely through our platform</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h4 className="font-semibold text-blue-900 text-sm mb-2">Quick Tips</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Upload a professional profile photo</li>
                  <li>• Write a compelling bio</li>
                  <li>• Highlight your specialties</li>
                  <li>• Add your teaching credentials</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;