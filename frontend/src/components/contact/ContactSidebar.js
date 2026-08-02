import { Clock, Shield, Phone, Mail, BookOpen } from 'lucide-react';
import { faqs, officeHours } from '../../constants/contact/contactData';

const ContactSidebar = () => {
  return (
    <div className="space-y-8">
      {/* Office Hours */}
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Office Hours</h3>
        </div>
        <div className="space-y-3">
          {officeHours.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-600">{item.days}</span>
              <span className="font-semibold text-gray-900">{item.hours}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Support */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-yellow-300" />
          <h3 className="text-xl font-bold">Urgent Support</h3>
        </div>
        <p className="text-blue-100 mb-4">
          Need immediate assistance with your account or an ongoing session?
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Emergency Hotline: +1 (555) 123-HELP</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>urgent@tutionmaster.com</span>
          </div>
        </div>
      </div>

      {/* FAQ Preview */}
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Common Questions</h3>
        </div>
        <div className="space-y-4">
          {faqs.slice(0, 3).map((faq, index) => (
            <div key={index} className="border-l-4 border-blue-200 pl-4">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {faq.question}
              </h4>
              <p className="text-gray-600 text-xs">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2 py-2">
          View All FAQs
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContactSidebar;
