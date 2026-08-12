import React from 'react';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, Users, Eye, MessageCircle, Award } from 'lucide-react';

const ProfileStats = ({ teacher, completeness }) => {
  const stats = [
    {
      label: 'Profile Completeness',
      value: `${completeness}%`,
      description: completeness >= 80 ? 'Excellent profile!' : completeness >= 60 ? 'Good progress' : 'Needs improvement',
      status: completeness >= 80 ? 'excellent' : completeness >= 60 ? 'good' : 'poor',
      icon: <Award size={20} className="text-brand-600" />,
      gradient: completeness >= 80
        ? 'from-success-500 to-success-600'
        : completeness >= 60
        ? 'from-brand-500 to-brand-600'
        : 'from-gold-500 to-gold-600'
    },
    {
      label: 'Response Rate',
      value: 'N/A',
      description: 'Start receiving messages',
      status: 'na',
      icon: <MessageCircle size={20} className="text-brand-600" />,
      gradient: 'from-stone-300 to-stone-400'
    },
    {
      label: 'Student Reviews',
      value: '0',
      description: 'No reviews yet',
      status: 'na',
      icon: <Users size={20} className="text-brand-600" />,
      gradient: 'from-stone-300 to-stone-400'
    },
    {
      label: 'Profile Views',
      value: '0',
      description: 'This month',
      status: 'na',
      icon: <Eye size={20} className="text-brand-600" />,
      gradient: 'from-stone-300 to-stone-400'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle size={16} className="text-success-600" />;
      case 'good':
        return <AlertCircle size={16} className="text-brand-500" />;
      case 'poor':
        return <XCircle size={16} className="text-gold-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'text-success-700 bg-success-50 border-success-200';
      case 'good':
        return 'text-brand-600 bg-brand-50 border-brand-200';
      case 'poor':
        return 'text-gold-700 bg-gold-50 border-gold-200';
      default:
        return 'text-gray-600 bg-stone-50 border-stone-200';
    }
  };

  const getCompletenessTips = () => {
    const tips = [];

    if (!teacher.avatarPublicId) {
      tips.push({
        text: 'Add a professional profile picture',
        icon: '🖼️',
        priority: 'high'
      });
    }

    if (!teacher.cvPublicId) {
      tips.push({
        text: 'Upload your CV to showcase qualifications',
        icon: '📄',
        priority: 'high'
      });
    }

    if (teacher.preferredSubjects.length === 0) {
      tips.push({
        text: 'Add subjects you specialize in teaching',
        icon: '📚',
        priority: 'high'
      });
    }

    if (!teacher.availability || teacher.availability.length === 0) {
      tips.push({
        text: 'Set your teaching availability schedule',
        icon: '🕒',
        priority: 'medium'
      });
    }

    if (teacher.bio.length < 100) {
      tips.push({
        text: 'Write a detailed bio to attract students',
        icon: '✏️',
        priority: 'medium'
      });
    }

    if (!teacher.education || teacher.education.length === 0) {
      tips.push({
        text: 'Add your educational background',
        icon: '🎓',
        priority: 'medium'
      });
    }

    if (!teacher.hourlyRate) {
      tips.push({
        text: 'Set your hourly teaching rate',
        icon: '💰',
        priority: 'low'
      });
    }

    return tips;
  };

  const tips = getCompletenessTips();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 group min-w-0"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4 gap-2">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <div className="p-2 bg-brand-50 rounded-xl group-hover:bg-brand-100 transition-colors duration-300 flex-shrink-0">
                  {stat.icon}
                </div>
                <span className="text-sm font-semibold text-gray-700 break-words">{stat.label}</span>
              </div>
              <div className="flex-shrink-0">{getStatusIcon(stat.status)}</div>
            </div>

            {/* Value */}
            <div className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-2 truncate">{stat.value}</div>

            {/* Description */}
            <div className="text-sm text-gray-600 mb-4">{stat.description}</div>

            {/* Progress bar for completeness */}
            {stat.label === 'Profile Completeness' && (
              <div className="space-y-2">
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-1000 ease-out`}
                    style={{ width: `${completeness}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span className="font-semibold text-brand-600">{completeness}% Complete</span>
                  <span>100%</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Improvement Section */}
      {tips.length > 0 && completeness < 100 && (
        <div className="bg-gradient-to-br from-brand-50 to-gold-50 border border-brand-200 rounded-2xl p-4 sm:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-brand-100 rounded-xl flex-shrink-0">
              <TrendingUp size={20} className="text-brand-600" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-serif font-bold text-gray-900">Boost Your Profile</h4>
              <p className="text-sm sm:text-base text-gray-600">Complete these steps to improve your profile and attract more students</p>
            </div>
          </div>

          <div className="grid gap-4">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 bg-white rounded-xl border border-brand-100 hover:border-brand-200 transition-all duration-300 group hover:shadow-sm"
              >
                <div className="flex items-center gap-3 sm:contents">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center group-hover:bg-brand-100 transition-colors duration-300">
                    <span className="text-lg">{tip.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0 sm:hidden">
                    <span className="text-gray-800 font-medium">{tip.text}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0 hidden sm:block">
                  <span className="text-gray-800 font-medium">{tip.text}</span>
                </div>
                <div className={`self-start sm:self-auto flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                  tip.priority === 'high'
                    ? 'bg-gold-100 text-gold-800 border border-gold-300'
                    : tip.priority === 'medium'
                    ? 'bg-gold-50 text-gold-700 border border-gold-200'
                    : 'bg-brand-50 text-brand-600 border border-brand-200'
                }`}>
                  {tip.priority === 'high' ? 'High Priority' : tip.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Summary */}
          <div className="mt-6 p-4 bg-white rounded-xl border border-brand-200">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-gray-700 font-semibold">Profile Strength</span>
                <div className="text-sm text-gray-500">{completeness}% complete</div>
              </div>
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-serif font-bold text-brand-600">{completeness}%</div>
                <div className="text-sm text-gray-500">
                  {completeness >= 80 ? 'Excellent!' : completeness >= 60 ? 'Good Progress' : 'Keep Going'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Celebration */}
      {completeness === 100 && (
        <div className="bg-gradient-to-br from-success-50 to-success-100 border border-success-200 rounded-2xl p-6 sm:p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-success-100 rounded-2xl flex items-center justify-center mb-4">
              <Award size={32} className="text-success-600" />
            </div>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-success-700 mb-2">Profile Complete! 🎉</h4>
            <p className="text-success-700 text-base sm:text-lg mb-4 max-w-md">
              Your profile is fully optimized and ready to attract students. You're now more likely to be discovered!
            </p>
            <div className="flex items-center justify-center space-x-2 text-success-600">
              <CheckCircle size={20} />
              <span className="font-semibold">100% Complete</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats Summary */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-brand-600">{completeness}%</div>
            <div className="text-sm text-gray-600 font-medium">Profile Complete</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-gray-700">0</div>
            <div className="text-sm text-gray-600 font-medium">Students</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-gray-700">0</div>
            <div className="text-sm text-gray-600 font-medium">Reviews</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-gray-700">0</div>
            <div className="text-sm text-gray-600 font-medium">This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
