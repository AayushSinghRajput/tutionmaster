import { Mail, Phone } from 'lucide-react';

const ContactActionsCard = ({ teacher }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h3 className="font-serif text-lg font-semibold text-gray-900 mb-3">Get in Touch</h3>
      <p className="text-gray-600 mb-4">Interested in lessons? Contact this teacher directly.</p>
      <div className="space-y-3">
        <a
          href={`mailto:${teacher.contact.email}`}
          className="btn-brand-primary w-full"
        >
          <Mail className="w-5 h-5" />
          <span>Send Email</span>
        </a>
        <a
          href={`tel:${teacher.contact.phone}`}
          className="btn-brand-ghost w-full"
        >
          <Phone className="w-5 h-5" />
          <span>Call Now</span>
        </a>
      </div>
    </div>
  );
};

export default ContactActionsCard;