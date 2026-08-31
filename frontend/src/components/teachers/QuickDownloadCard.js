import { Download, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const QuickDownloadCard = ({ onDownload }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-lg shadow-lg p-5 sm:p-6 text-white relative overflow-hidden">
      <div className={`transition-all ${!isAuthenticated ? 'blur-sm opacity-50 select-none' : ''}`}>
        <div className="flex items-center space-x-3 mb-4">
          <Download className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold">Download CV</h3>
            <p className="text-brand-100 text-sm">Save for offline reference</p>
          </div>
        </div>
        <button
          onClick={isAuthenticated ? onDownload : undefined}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF</span>
        </button>
        <p className="text-brand-200 text-sm text-center mt-3">PDF document</p>
      </div>
      
      {!isAuthenticated && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-900/40 backdrop-blur-[2px] z-10 p-4 text-center">
          <Lock className="w-6 h-6 text-white mb-3 shadow-sm" />
          <p className="text-sm text-brand-50 mb-4 font-medium">Authentication Required</p>
          <Link to="/login" state={{ from: location }} className="w-full px-4 py-2.5 bg-white text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-colors">
            Log in to Download
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuickDownloadCard;