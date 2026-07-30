import { Link } from 'react-router-dom';
import { Edit, Eye, User } from 'lucide-react';

const QuickActionsCard = ({ profileId, onViewProfile, onDeleteProfile }) => {
  return (
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
          onClick={onViewProfile}
          className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
        >
          <Eye className="h-6 w-6 text-gray-400 mr-3" />
          <span className="text-gray-900 font-medium">View Public Profile</span>
        </button>

        <button
          onClick={onDeleteProfile}
          className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors text-left"
        >
          <User className="h-6 w-6 text-red-400 mr-3" />
          <span className="text-red-700 font-medium">Delete Profile</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActionsCard;