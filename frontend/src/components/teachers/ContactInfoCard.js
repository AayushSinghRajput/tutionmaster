import { Mail, Phone, MapPin, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const ContactInfoCard = ({ teacher }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const maskEmail = (email) => {
    if (!email) return '';
    const [name, domain] = email.split('@');
    if (!name || !domain) return '***';
    return `${name.substring(0, 2)}***@${domain}`;
  };

  const maskPhone = (phone) => {
    if (!phone) return '';
    return phone.substring(0, 4) + '******';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 relative overflow-hidden">
      <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
      
      <div className={`space-y-3 ${!isAuthenticated ? 'blur-[2px] opacity-60 select-none' : ''}`}>
        <div className="flex items-start space-x-3">
          <Mail className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700 break-all">
            {isAuthenticated ? teacher.contact.email : maskEmail(teacher.contact.email)}
          </span>
        </div>
        {teacher.contact.phone && (
          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">
              {isAuthenticated ? teacher.contact.phone : maskPhone(teacher.contact.phone)}
            </span>
          </div>
        )}
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700">
            {teacher.address.street}, {teacher.address.city}, {teacher.address.state}
          </span>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px] z-10">
          <Lock className="w-6 h-6 text-brand-600 mb-2" />
          <Link to="/login" state={{ from: location }} className="btn-brand-primary text-sm px-4 py-2">
            Log in to view details
          </Link>
        </div>
      )}
    </div>
  );
};

export default ContactInfoCard;