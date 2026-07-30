import React from 'react';
import { Clock } from 'lucide-react';

const TermsTerminationAndPayments = () => {
  return (
    <>
      {/* Termination */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="w-6 h-6 text-blue-600 mr-3" />
          5. Termination & Suspension
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Voluntary Termination</h4>
            <p className="text-gray-700 text-sm">
              You may delete your account at any time through account settings. Educational data 
              will be anonymized per our data retention policy.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Platform Termination</h4>
            <p className="text-gray-700 text-sm">
              We reserve the right to suspend or terminate accounts that violate these terms or 
              engage in harmful activities.
            </p>
          </div>
        </div>
      </section>

      {/* Payments & Refunds */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Payments & Refunds</h2>
        
        <div className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-6 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">Subscription Plans</h4>
            <p className="text-gray-700 text-sm">
              Premium features require a subscription. Fees are clearly displayed before purchase 
              and automatically renew unless canceled.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-6 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">Refund Policy</h4>
            <p className="text-gray-700 text-sm">
              Refunds are available within 14 days of purchase for unused services. Contact our 
              support team for refund requests.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-6 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">Price Changes</h4>
            <p className="text-gray-700 text-sm">
              We reserve the right to adjust subscription prices with 30 days notice to current subscribers.
            </p>
          </div>
        </div>
      </section>

      {/* Limitation of Liability */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Limitation of Liability</h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="font-semibold text-yellow-800 mb-3">Educational Disclaimer</h3>
          <p className="text-yellow-700 text-sm">
            TutionMaster provides educational tools and platforms. We are not responsible for individual 
            learning outcomes or academic performance. Users are responsible for their educational progress 
            and the content they create and share.
          </p>
        </div>
      </section>

      {/* Changes to Terms */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Changes to Terms</h2>
        
        <div className="p-6 border border-gray-200 rounded-xl">
          <p className="text-gray-700 mb-4">
            We may update these Terms of Service to reflect changes in our practices or legal requirements. 
            Continued use of TutionMaster after changes constitutes acceptance of the modified terms.
          </p>
          <div className="flex items-center text-sm text-blue-600">
            <Clock className="w-4 h-4 mr-2" />
            Users will be notified of significant changes 30 days in advance
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsTerminationAndPayments;
