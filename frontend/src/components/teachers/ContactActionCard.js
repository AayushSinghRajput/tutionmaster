import { Mail, Phone } from 'lucide-react';

const ContactActionsCard = ({ teacher }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Get in Touch</h3>
      <p className="text-gray-600 mb-4">Interested in lessons? Contact this teacher directly.</p>
      <div className="space-y-3">
        <a
          href={`mailto:${teacher.contact.email}`}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span>Send Email</span>
        </a>
        <a
          href={`tel:${teacher.contact.phone}`}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span>Call Now</span>
        </a>
      </div>
    </div>
  );
};

export default ContactActionsCard;