import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ProfileStats = ({ teacher, completeness }) => {
  const stats = [
    {
      label: 'Profile Completeness',
      value: `${completeness}%`,
      description: completeness >= 80 ? 'Excellent!' : completeness >= 60 ? 'Good' : 'Needs improvement',
      status: completeness >= 80 ? 'excellent' : completeness >= 60 ? 'good' : 'poor'
    },
    {
      label: 'Response Rate',
      value: 'N/A',
      description: 'Start receiving messages',
      status: 'na'
    },
    {
      label: 'Student Reviews',
      value: '0',
      description: 'No reviews yet',
      status: 'na'
    },
    {
      label: 'Profile Views',
      value: '0',
      description: 'This month',
      status: 'na'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'good':
        return <AlertCircle size={16} className="text-yellow-500" />;
      case 'poor':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <AlertCircle size={16} className="text-gray-400" />;
    }
  };

  const getBorderColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'border-l-green-500';
      case 'good':
        return 'border-l-yellow-500';
      case 'poor':
        return 'border-l-red-500';
      default:
        return 'border-l-gray-400';
    }
  };

  const getCompletenessTips = () => {
    const tips = [];
    
    if (!teacher.avatarPublicId) {
      tips.push('Add a profile picture to make your profile more personal');
    }
    
    if (!teacher.cvPublicId) {
      tips.push('Upload your CV to showcase your qualifications');
    }
    
    if (teacher.preferredSubjects.length === 0) {
      tips.push('Add subjects you want to teach');
    }
    
    if (!teacher.availability || teacher.availability.length === 0) {
      tips.push('Set your availability to let students know when you\'re free');
    }
    
    if (teacher.bio.length < 100) {
      tips.push('Write a more detailed bio to attract students');
    }
    
    return tips;
  };

  const tips = getCompletenessTips();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-lg p-6 border-l-4 ${getBorderColor(stat.status)} border border-gray-200 shadow-sm`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              {getStatusIcon(stat.status)}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.description}</div>
            
            {/* Progress bar for completeness */}
            {stat.label === 'Profile Completeness' && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completeness}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Improvement Tips */}
      {tips.length > 0 && completeness < 100 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-4">Improve Your Profile</h4>
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                <span className="text-blue-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion Celebration */}
      {completeness === 100 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center">
            <CheckCircle size={24} className="text-green-500 mb-2" />
            <h4 className="text-lg font-semibold text-green-900 mb-2">Profile Complete!</h4>
            <p className="text-green-700">Your profile is 100% complete and optimized for student discovery.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileStats;