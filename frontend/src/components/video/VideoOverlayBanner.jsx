import { X } from "lucide-react";

const VideoOverlayBanner = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all animate-fade-in-up">
        {/* Header */}
        <div className="bg-brand-600 px-5 py-4 flex justify-between items-center text-white">
          <div>
            <h3 className="font-serif text-lg font-bold">Welcome to TuitionMaster!</h3>
            <p className="text-brand-100 text-sm mt-0.5">Watch this quick guide to learn how to create your teacher profile.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-brand-100 hover:text-white hover:bg-brand-700 transition-colors focus:outline-none"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Container */}
        <div className="aspect-video w-full bg-stone-900">
          <iframe
            src="https://www.youtube.com/embed/oSeMIfUGT3s?rel=0"
            title="How to Create Your Teacher Profile"
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-0 w-full h-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoOverlayBanner;
