import React from 'react';
import { MessageCircle, Shield, Settings } from 'lucide-react';

const CookieSupportNotice = () => {
  return (
    <>
      {/* Updates & Contact */}
      <section className="bg-brand-50 rounded-xl p-6 sm:p-8 mb-8">
        <div className="flex items-center mb-4">
          <MessageCircle className="w-8 h-8 text-brand-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Questions About Cookies?</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Policy Updates</h4>
            <p className="text-gray-700 text-sm">
              We may update this Cookie Policy to reflect changes in technology, regulation, or our services.
              Significant changes will be communicated through platform notifications.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Contact Our Team</h4>
            <p className="text-gray-700 text-sm mb-2">privacy@tutionmaster.com</p>
            <p className="text-gray-600 text-xs">
              Email us with any questions about cookie usage and your privacy rights.
            </p>
          </div>
        </div>
      </section>

      {/* Consent Status */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl text-center">
        <div className="flex items-center justify-center mb-3">
          <Shield className="w-5 h-5 text-white mr-2" />
          <p className="text-white font-semibold">
            Your current cookie preferences are saved and respected.
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-white text-brand-600 rounded-lg font-semibold hover:bg-brand-50 transition-colors">
          <Settings className="w-4 h-4 mr-2" />
          Update Cookie Preferences
        </button>
      </div>
    </>
  );
};

export default CookieSupportNotice;
