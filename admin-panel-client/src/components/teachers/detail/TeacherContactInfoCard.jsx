import { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Navigation, ExternalLink, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TeacherContactInfoCard({ teacher }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key, label) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const email = teacher.contact?.email;
  const phone = teacher.contact?.phone;
  const address = teacher.address || {};
  const fullAddress = [address.street, address.city, address.state, address.zipCode]
    .filter(Boolean)
    .join(', ');

  return (
    <>
      {/* Contact Channels Card */}
      <div className="detail-section-card">
        <div className="detail-card-header">
          <div className="detail-card-header-left">
            <div className="detail-card-header-icon">
              <Mail size={18} />
            </div>
            <h3 className="detail-card-title">Contact Channels</h3>
          </div>
        </div>

        <div className="detail-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Email Box */}
          <div className="contact-channel-card">
            <div className="contact-channel-header">
              <div className="contact-channel-label">
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: 'rgba(138, 56, 97, 0.2)',
                    color: 'var(--brand-300)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Mail size={14} />
                </div>
                <span>Email Address</span>
              </div>

              {email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <a
                    href={`mailto:${email}`}
                    className="btn btn-ghost btn-sm"
                    style={{ padding: '3px 8px', fontSize: '0.72rem', gap: 4 }}
                    title="Send Email"
                  >
                    <Send size={11} />
                    <span>Send</span>
                  </a>
                  <button
                    type="button"
                    className="copy-mini-btn"
                    onClick={() => handleCopy(email, 'email', 'Email')}
                    title="Copy Email"
                  >
                    {copiedKey === 'email' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  </button>
                </div>
              )}
            </div>

            <div className="contact-channel-value-row">
              {email ? (
                <a href={`mailto:${email}`} className="contact-channel-link">
                  {email}
                </a>
              ) : (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.86rem', fontStyle: 'italic' }}>
                  Not provided
                </span>
              )}
            </div>
          </div>

          {/* Phone Box */}
          <div className="contact-channel-card">
            <div className="contact-channel-header">
              <div className="contact-channel-label">
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: 'rgba(47, 122, 94, 0.2)',
                    color: 'var(--success-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Phone size={14} />
                </div>
                <span>Phone Number</span>
              </div>

              {phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <a
                    href={`tel:${phone}`}
                    className="btn btn-ghost btn-sm"
                    style={{ padding: '3px 8px', fontSize: '0.72rem', gap: 4 }}
                    title="Call Phone"
                  >
                    <ExternalLink size={11} />
                    <span>Call</span>
                  </a>
                  <button
                    type="button"
                    className="copy-mini-btn"
                    onClick={() => handleCopy(phone, 'phone', 'Phone')}
                    title="Copy Phone"
                  >
                    {copiedKey === 'phone' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  </button>
                </div>
              )}
            </div>

            <div className="contact-channel-value-row">
              {phone ? (
                <a href={`tel:${phone}`} className="contact-channel-link">
                  {phone}
                </a>
              ) : (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.86rem', fontStyle: 'italic' }}>
                  Not provided
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Location / Address Card */}
      <div className="detail-section-card">
        <div className="detail-card-header">
          <div className="detail-card-header-left">
            <div className="detail-card-header-icon">
              <MapPin size={18} />
            </div>
            <h3 className="detail-card-title">Address & Location</h3>
          </div>
        </div>

        <div className="detail-card-body">
          <div className="interactive-data-list">
            <div className="interactive-data-item">
              <div className="interactive-data-left">
                <Navigation size={15} />
                <span>Street</span>
              </div>
              <div className="interactive-data-value">
                {address.street || <span style={{ color: 'var(--text-muted)' }}>—</span>}
              </div>
            </div>

            <div className="interactive-data-item">
              <div className="interactive-data-left">
                <span>City</span>
              </div>
              <div className="interactive-data-value">
                {address.city || <span style={{ color: 'var(--text-muted)' }}>—</span>}
              </div>
            </div>

            <div className="interactive-data-item">
              <div className="interactive-data-left">
                <span>State / Province</span>
              </div>
              <div className="interactive-data-value">
                {address.state || <span style={{ color: 'var(--text-muted)' }}>—</span>}
              </div>
            </div>

            {address.zipCode && (
              <div className="interactive-data-item">
                <div className="interactive-data-left">
                  <span>Postal / ZIP</span>
                </div>
                <div className="interactive-data-value">{address.zipCode}</div>
              </div>
            )}
          </div>

          {fullAddress && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              style={{ width: '100%', marginTop: 12, justifyContent: 'center', gap: 6 }}
              onClick={() => handleCopy(fullAddress, 'address', 'Full address')}
            >
              {copiedKey === 'address' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>Copy Full Address</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
