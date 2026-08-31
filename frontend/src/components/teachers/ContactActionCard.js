import { Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const ContactActionsCard = ({ teacher }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 relative overflow-hidden">
      <h3 className="font-serif text-lg font-semibold text-gray-900 mb-3">Get in Touch</h3>
      <p className="text-gray-600 mb-4">Interested in lessons? Contact this teacher directly.</p>
      
      <div className={`space-y-3 ${!isAuthenticated ? 'blur-[2px] opacity-60 select-none' : ''}`}>
        <a
          href={isAuthenticated ? `mailto:${teacher.contact.email}` : '#'}
          className="btn-brand-primary w-full"
          onClick={(e) => !isAuthenticated && e.preventDefault()}
        >
          <Mail className="w-5 h-5" />
          <span>Send Email</span>
        </a>
        <a
          href={isAuthenticated ? `tel:${teacher.contact.phone}` : '#'}
          className="btn-brand-ghost w-full"
          onClick={(e) => !isAuthenticated && e.preventDefault()}
        >
          <Phone className="w-5 h-5" />
          <span>Call Now</span>
        </a>
      </div>

      {!isAuthenticated && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px] z-10">
          <Lock className="w-6 h-6 text-brand-600 mb-2" />
          <Link to="/login" state={{ from: location }} className="btn-brand-primary text-sm px-4 py-2">
            Log in to contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default ContactActionsCard;