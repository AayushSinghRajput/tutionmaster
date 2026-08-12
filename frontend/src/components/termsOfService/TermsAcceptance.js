import React from 'react';
import { Users } from 'lucide-react';

const TermsAcceptance = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Users className="w-6 h-6 text-brand-600 mr-3" />
        1. Acceptance of Terms
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        By accessing and using TuitionMaster's educational platform, you acknowledge that you have read,
        understood, and agree to be bound by these Terms of Service.
      </p>
      <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
        <h3 className="font-semibold text-brand-800 mb-2">Educational Purpose</h3>
        <p className="text-brand-700 text-sm">
          TuitionMaster is designed exclusively for educational purposes. Commercial use without
          explicit authorization is prohibited.
        </p>
      </div>
    </section>
  );
};

export default TermsAcceptance;
