import { MessageCircle } from 'lucide-react';

const ContactSection = ({ onContactClick }) => {
  return (
    <section className="bg-blue-50 rounded-xl p-6 sm:p-8 text-center">
      <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-900 mb-2">Questions About Privacy?</h3>
      <p className="text-gray-700 mb-4">
        Our dedicated privacy team is here to help you understand our practices.
      </p>
      <button
        onClick={onContactClick}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Contact Privacy Team
      </button>
    </section>
  );
};

export default ContactSection;