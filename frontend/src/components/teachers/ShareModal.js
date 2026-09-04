import { useState, useEffect, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  MessageCircle, 
  Facebook, 
  Linkedin, 
  Mail, 
  Twitter 
} from 'lucide-react';

const ShareModal = ({ isOpen, onClose, teacher, shareUrl }) => {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !teacher) return null;

  const title = `Check out ${teacher.name}'s Tutor Profile on TuitionMaster!`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  // Platform Share Configurations
  const sharePlatforms = [
    {
      name: 'WhatsApp',
      bgColor: 'bg-emerald-500 hover:bg-emerald-600 text-white',
      icon: <MessageCircle className="w-5 h-5" />,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'Facebook',
      bgColor: 'bg-blue-600 hover:bg-blue-700 text-white',
      icon: <Facebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      bgColor: 'bg-sky-700 hover:bg-sky-800 text-white',
      icon: <Linkedin className="w-5 h-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'X (Twitter)',
      bgColor: 'bg-gray-900 hover:bg-black text-white',
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: 'Email',
      bgColor: 'bg-amber-600 hover:bg-amber-700 text-white',
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=${encodedTitle}&body=I%20found%20this%20tutor%20profile%20on%20TuitionMaster:%20${encodedUrl}`,
    },
  ];

  // Clipboard copy handler with visual feedback
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy share link:', err);
    }
  };

  // Web Share API fallback
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: teacher.name,
          text: title,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      }}
    >
      <div 
        ref={modalRef}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-brand-600" />
            <h3 className="text-lg font-bold text-gray-900 font-serif">Share Your Tutor Profile</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
          {/* Quick Share Platforms */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Share via Social Media
            </label>
            <div className="grid grid-cols-5 gap-3">
              {sharePlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${platform.bgColor}`}>
                    {platform.icon}
                  </div>
                  <span className="text-[11px] font-medium text-gray-600 group-hover:text-gray-900 truncate">
                    {platform.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Web Share API option */}
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-gray-700 font-medium rounded-xl text-sm flex items-center justify-center space-x-2 transition-colors"
            >
              <Share2 className="w-4 h-4 text-stone-600" />
              <span>More Share Options</span>
            </button>
          )}

          {/* Direct Public Link Input & Copy Button */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Direct Public Profile Link
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 select-all"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center space-x-1.5 transition-all shrink-0 ${
                  copied 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 text-xs text-stone-500 text-center">
          Prospective students & parents can view your profile without logging in.
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
