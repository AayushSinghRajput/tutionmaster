import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const VideoOverlayBanner = ({ onClose }) => {
  useEffect(() => {
    // Lock background scroll when video modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
      style={{ zIndex: 999999 }}
      role="dialog"
      aria-modal="true"
    >
      {/* Dark Opaque Backdrop - completely covers all background form elements */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        style={{ zIndex: 1 }}
      />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-4xl bg-stone-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all border border-brand-500/30"
        style={{ zIndex: 2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-700 px-5 py-4 flex justify-between items-center text-white border-b border-brand-600/40">
          <div>
            <h3 className="font-serif text-lg font-bold">Welcome to TuitionMaster!</h3>
            <p className="text-brand-100 text-sm mt-0.5">
              Watch this quick guide to learn how to create your teacher profile.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-brand-100 hover:text-white hover:bg-brand-600 transition-colors focus:outline-none cursor-pointer"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video w-full bg-black">
          <iframe
            src="https://www.youtube.com/embed/oSeMIfUGT3s?autoplay=1&rel=0"
            title="How to Create Your Teacher Profile"
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : modalContent;
};

export default VideoOverlayBanner;
