import { Download } from 'lucide-react';

const QuickDownloadCard = ({ onDownload }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center space-x-3 mb-4">
        <Download className="w-8 h-8" />
        <div>
          <h3 className="text-lg font-semibold">Download CV</h3>
          <p className="text-blue-100 text-sm">Save for offline reference</p>
        </div>
      </div>
      <button
        onClick={onDownload}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
      >
        <Download className="w-5 h-5" />
        <span>Download PDF</span>
      </button>
      <p className="text-blue-200 text-sm text-center mt-3">High-quality PDF • Secure document</p>
    </div>
  );
};

export default QuickDownloadCard;