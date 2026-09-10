import { useState, useEffect, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  Mail,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ShareTutorModal({ teacher, onClose }) {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!teacher) return null;

  const publicBaseUrl =
    import.meta.env.VITE_PUBLIC_CLIENT_URL ||
    (window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : 'https://www.tuitionmaster.guru');

  const shareUrl = `${publicBaseUrl}/teachers/${teacher._id}`;
  const title = `Check out ${teacher.name}'s Tutor Profile on TuitionMaster!`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const sharePlatforms = [
    {
      name: 'WhatsApp',
      bg: '#25D366',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.185 1.564 5.938l-1.564 5.714 5.867-1.539c1.701.928 3.655 1.458 5.733 1.458 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'Facebook',
      bg: '#1877F2',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      bg: '#0A66C2',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'X / Twitter',
      bg: '#0f1419',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: 'Email',
      bg: '#ea580c',
      icon: <Mail size={18} color="#fff" />,
      url: `mailto:?subject=${encodedTitle}&body=I%20wanted%20to%20share%20this%20tutor%20profile%20from%20TuitionMaster:%20${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Public profile link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const initials = teacher.name?.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() || 'TM';

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="modal-box"
        style={{ maxWidth: '520px', padding: '24px' }}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Share2 size={16} color="var(--brand-400)" />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Share Tutor Profile
            </h3>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            style={{ padding: '4px', borderRadius: '50%' }}
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tutor Mini Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 14px',
            background: 'var(--bg-input)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            marginBottom: '20px',
          }}
        >
          {teacher.avatarUrl ? (
            <img
              src={teacher.avatarUrl}
              alt={teacher.name}
              style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }}
            />
          ) : (
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--brand-500), var(--brand-700))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '.85rem',
                color: '#fff',
              }}
            >
              {initials}
            </div>
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '.95rem', color: 'var(--text-primary)' }}>
                {teacher.name}
              </span>
              <span className={`badge ${teacher.isVisible ? 'badge-verified' : 'badge-pending'}`} style={{ fontSize: '.68rem' }}>
                {teacher.isVisible ? 'Public' : 'Hidden'}
              </span>
            </div>
            <div style={{ fontSize: '.78rem', color: 'var(--text-secondary)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {Array.isArray(teacher.preferredSubjects) && teacher.preferredSubjects.length > 0
                ? teacher.preferredSubjects.join(', ')
                : teacher.qualification || 'Verified Tutor'}
            </div>
          </div>
        </div>

        {/* Share on Social Platforms */}
        <div style={{ marginBottom: '22px' }}>
          <label className="form-label" style={{ marginBottom: '10px', textTransform: 'uppercase', fontSize: '.72rem', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Share via Channels
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
            {sharePlatforms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: p.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  {p.icon}
                </div>
                <span style={{ fontSize: '.7rem', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'center' }}>
                  {p.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Direct Link & Copy */}
        <div className="form-group" style={{ marginBottom: '16px' }}>
          <label className="form-label" style={{ textTransform: 'uppercase', fontSize: '.72rem', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Direct Public Profile Link
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              readOnly
              className="form-input"
              style={{ fontSize: '.82rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}
              value={shareUrl}
              onFocus={(e) => e.target.select()}
            />
            <button
              type="button"
              className={`btn btn-sm ${copied ? 'btn-success' : 'btn-primary'}`}
              onClick={handleCopy}
              style={{ flexShrink: 0, gap: '6px' }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Footer & Live Preview Action */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: '1px solid var(--border)',
            marginTop: '10px',
          }}
        >
          <span style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>
            Accessible to students without logging in
          </span>
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
            style={{ gap: '6px', fontSize: '.8rem' }}
          >
            <ExternalLink size={13} />
            <span>Open Public Page</span>
          </a>
        </div>
      </div>
    </div>
  );
}
