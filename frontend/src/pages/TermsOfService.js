// components/legal/TermsOfService.jsx
import React from 'react';
import { BookOpen, Users, GraduationCap, AlertTriangle, Clock, Mail } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to TutionMaster. Please read these terms carefully before using our educational platform.
          </p>
          <div className="mt-6 text-sm text-blue-600 font-semibold">
            Effective date: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Important Notice */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <div className="flex items-center text-white">
              <AlertTriangle className="w-6 h-6 mr-3" />
              <div>
                <h2 className="text-lg font-semibold">Important Legal Notice</h2>
                <p className="text-blue-100 text-sm mt-1">
                  By accessing TutionMaster, you agree to be bound by these Terms of Service.
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 py-12">
            {/* Acceptance of Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using TutionMaster's educational platform, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms of Service.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-800 mb-2">Educational Purpose</h3>
                <p className="text-blue-700 text-sm">
                  TutionMaster is designed exclusively for educational purposes. Commercial use without 
                  explicit authorization is prohibited.
                </p>
              </div>
            </section>

            {/* User Accounts */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. User Accounts & Responsibilities</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <h4 className="font-semibold text-gray-900 mb-2">Account Eligibility</h4>
                  <p className="text-gray-700 text-sm">
                    You must be at least 13 years old to create an account. Educators must provide valid 
                    professional credentials.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6 py-2">
                  <h4 className="font-semibold text-gray-900 mb-2">Account Security</h4>
                  <p className="text-gray-700 text-sm">
                    You are responsible for maintaining the confidentiality of your login credentials and 
                    for all activities under your account.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6 py-2">
                  <h4 className="font-semibold text-gray-900 mb-2">Professional Conduct</h4>
                  <p className="text-gray-700 text-sm">
                    Users must maintain professional and respectful communication in all educational interactions.
                  </p>
                </div>
              </div>
            </section>

            {/* Educational Content */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                3. Educational Content & Intellectual Property
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">User-Generated Content</h4>
                  <ul className="text-gray-700 space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>You retain ownership of educational materials you create</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Grant TutionMaster license to display and distribute your content</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Ensure all content complies with copyright laws</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">Platform Content</h4>
                  <ul className="text-gray-700 space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>TutionMaster owns platform software and infrastructure</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Licensed educational content is subject to separate agreements</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Unauthorized distribution of platform content is prohibited</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Prohibited Activities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Prohibited Activities</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-red-800 mb-3">Zero Tolerance Policy</h3>
                <p className="text-red-700 text-sm">
                  The following activities will result in immediate account termination and may lead to legal action.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Academic dishonesty or plagiarism",
                  "Harassment or inappropriate conduct",
                  "Unauthorized commercial activities",
                  "Platform manipulation or hacking",
                  "Distribution of malicious content",
                  "Impersonation of educators or staff"
                ].map((activity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-semibold text-xs">!</span>
                    </div>
                    <span className="text-gray-700 text-sm ml-3">{activity}</span>
                  </div>
                ))}
              </div>
            </section>

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

            {/* Contact Information */}
            <section className="bg-blue-50 rounded-xl p-8 mb-8">
              <div className="flex items-center mb-4">
                <Mail className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Legal & Support Contact</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Inquiries</h4>
                  <p className="text-gray-700 text-sm">legal@tutionmaster.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Educator Support</h4>
                  <p className="text-gray-700 text-sm">support@tutionmaster.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Billing Questions</h4>
                  <p className="text-gray-700 text-sm">billing@tutionmaster.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">General Inquiries</h4>
                  <p className="text-gray-700 text-sm">hello@tutionmaster.com</p>
                </div>
              </div>
            </section>

            {/* Agreement */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-center">
              <p className="text-white font-semibold text-lg">
                By using TutionMaster, you acknowledge that you have read, understood, and agree to these Terms of Service.
              </p>
              <p className="text-blue-100 text-sm mt-2">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;