import React from 'react';
import { Mail } from 'lucide-react';
import { legalContacts } from '../../constants/termsOfService/termsData';

const TermsContactAndAgreement = () => {
  return (
    <>
      {/* Contact Information */}
      <section className="bg-brand-50 rounded-xl p-6 sm:p-8 mb-8">
        <div className="flex items-center mb-4">
          <Mail className="w-8 h-8 text-brand-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Legal & Support Contact</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {legalContacts.map((contact, index) => (
            <div key={index}>
              <h4 className="font-semibold text-gray-900 mb-2">{contact.title}</h4>
              <p className="text-gray-700 text-sm">{contact.email}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agreement */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl text-center">
        <p className="text-white font-semibold text-lg">
          By using TuitionMaster, you acknowledge that you have read, understood, and agree to these Terms of Service.
        </p>
        <p className="text-brand-100 text-sm mt-2">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </>
  );
};

export default TermsContactAndAgreement;
