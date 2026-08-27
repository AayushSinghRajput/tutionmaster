import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfoCard = ({ teacher }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Mail className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700 break-all">{teacher.contact.email}</span>
        </div>
        {teacher.contact.phone && (
          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{teacher.contact.phone}</span>
          </div>
        )}
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700">
            {teacher.address.street}, {teacher.address.city}, {teacher.address.state}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;