import {
  BookOpen, Users, GraduationCap, ShieldOff, Clock,
  CreditCard, AlertCircle, RefreshCw, Mail,
} from 'lucide-react';
import PolicyLayout from '../components/policy/PolicyLayout';
import PolicySection from '../components/policy/PolicySection';
import { prohibitedActivities, legalContacts } from '../constants/termsOfService/termsData';
import SEO from '../components/seo/SEO';

const SECTIONS = [
  { id: 'acceptance',    label: '1. Acceptance of Terms',     icon: Users },
  { id: 'accounts',     label: '2. User Accounts',           icon: BookOpen },
  { id: 'ip',           label: '3. Intellectual Property',   icon: GraduationCap },
  { id: 'prohibited',   label: '4. Prohibited Activities',   icon: ShieldOff },
  { id: 'termination',  label: '5. Termination',             icon: Clock },
  { id: 'payments',     label: '6. Payments & Refunds',      icon: CreditCard },
  { id: 'liability',    label: '7. Liability',               icon: AlertCircle },
  { id: 'changes',      label: '8. Changes to Terms',        icon: RefreshCw },
  { id: 'contact',      label: 'Contact',                    icon: Mail },
];

const TermsOfService = () => (
  <>
    <SEO
      title="Terms of Service | TuitionMaster"
      description="Read TuitionMaster's Terms of Service to understand your rights and responsibilities on our educational platform."
      canonicalUrl="https://www.tuitionmaster.guru/terms-of-service"
    />
    <PolicyLayout
      title="Terms of Service"
      description="Please read these terms carefully before using our educational platform."
      icon={BookOpen}
      badge="Legal · Terms"
      sections={SECTIONS}
    >
      {/* Important Legal Notice banner */}
      <div className="px-6 sm:px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-700 rounded-t-2xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-white font-semibold text-sm">Important Legal Notice</p>
          <p className="text-brand-100 text-xs mt-0.5">
            By accessing TuitionMaster, you agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>

      {/* 1. Acceptance */}
      <PolicySection id="acceptance">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <Users className="w-5 h-5 text-brand-600 flex-shrink-0" />
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          By accessing and using TuitionMaster's educational platform, you acknowledge that you have read,
          understood, and agree to be bound by these Terms of Service.
        </p>
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-4">
          <h3 className="font-semibold text-brand-800 mb-1 text-sm">Educational Purpose</h3>
          <p className="text-brand-700 text-sm">
            TuitionMaster is designed exclusively for educational purposes. Commercial use without
            explicit authorisation is prohibited.
          </p>
        </div>
      </PolicySection>

      {/* 2. User Accounts */}
      <PolicySection id="accounts">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <BookOpen className="w-5 h-5 text-brand-600 flex-shrink-0" />
          2. User Accounts &amp; Responsibilities
        </h2>
        <div className="space-y-4">
          {[
            { color: 'brand', title: 'Account Eligibility', body: 'You must be at least 13 years old to create an account. Educators must provide valid professional credentials.' },
            { color: 'success', title: 'Account Security', body: 'You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.' },
            { color: 'gold', title: 'Professional Conduct', body: 'Users must maintain professional and respectful communication in all educational interactions.' },
          ].map(({ color, title, body }) => (
            <div key={title} className={`border-l-4 border-${color}-500 pl-5 py-2`}>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">{title}</h4>
              <p className="text-gray-600 text-sm">{body}</p>
            </div>
          ))}
        </div>
      </PolicySection>

      {/* 3. Intellectual Property */}
      <PolicySection id="ip">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <GraduationCap className="w-5 h-5 text-brand-600 flex-shrink-0" />
          3. Educational Content &amp; Intellectual Property
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: 'User-Generated Content',
              items: [
                'You retain ownership of educational materials you create',
                'Grant TuitionMaster licence to display and distribute your content',
                'Ensure all content complies with copyright laws',
              ],
            },
            {
              title: 'Platform Content',
              items: [
                'TuitionMaster owns platform software and infrastructure',
                'Licensed educational content is subject to separate agreements',
                'Unauthorised distribution of platform content is prohibited',
              ],
            },
          ].map(({ title, items }) => (
            <div key={title}>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PolicySection>

      {/* 4. Prohibited Activities */}
      <PolicySection id="prohibited">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <ShieldOff className="w-5 h-5 text-brand-600 flex-shrink-0" />
          4. Prohibited Activities
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
          <h3 className="font-semibold text-red-800 mb-1 text-sm">Zero Tolerance Policy</h3>
          <p className="text-red-700 text-sm">
            The following activities will result in immediate account termination and may lead to legal action.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {prohibitedActivities.map((activity, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold text-xs">!</span>
              </div>
              <span className="text-gray-700 text-sm">{activity}</span>
            </div>
          ))}
        </div>
      </PolicySection>

      {/* 5. Termination */}
      <PolicySection id="termination">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <Clock className="w-5 h-5 text-brand-600 flex-shrink-0" />
          5. Termination &amp; Suspension
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Voluntary Termination', body: 'You may delete your account at any time through account settings. Educational data will be anonymised per our data retention policy.' },
            { title: 'Platform Termination', body: 'We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful activities.' },
          ].map(({ title, body }) => (
            <div key={title} className="p-4 border border-stone-200 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">{title}</h4>
              <p className="text-gray-600 text-sm">{body}</p>
            </div>
          ))}
        </div>
      </PolicySection>

      {/* 6. Payments */}
      <PolicySection id="payments">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <CreditCard className="w-5 h-5 text-brand-600 flex-shrink-0" />
          6. Payments &amp; Refunds
        </h2>
        <div className="space-y-4">
          {[
            { color: 'gold',    title: 'Subscription Plans', body: 'Premium features require a subscription. Fees are clearly displayed before purchase and automatically renew unless cancelled.' },
            { color: 'success', title: 'Refund Policy',      body: 'Refunds are available within 14 days of purchase for unused services. Contact our support team for refund requests.' },
            { color: 'brand',   title: 'Price Changes',      body: 'We reserve the right to adjust subscription prices with 30 days notice to current subscribers.' },
          ].map(({ color, title, body }) => (
            <div key={title} className={`border-l-4 border-${color}-500 pl-5 py-2`}>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">{title}</h4>
              <p className="text-gray-600 text-sm">{body}</p>
            </div>
          ))}
        </div>
      </PolicySection>

      {/* 7. Liability */}
      <PolicySection id="liability">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <AlertCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
          7. Limitation of Liability
        </h2>
        <div className="bg-gold-50 border border-gold-200 rounded-xl p-5">
          <h3 className="font-semibold text-gold-800 mb-2 text-sm">Educational Disclaimer</h3>
          <p className="text-gold-700 text-sm">
            TuitionMaster provides educational tools and platforms. We are not responsible for individual
            learning outcomes or academic performance. Users are responsible for their educational progress
            and the content they create and share.
          </p>
        </div>
      </PolicySection>

      {/* 8. Changes */}
      <PolicySection id="changes">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <RefreshCw className="w-5 h-5 text-brand-600 flex-shrink-0" />
          8. Changes to Terms
        </h2>
        <div className="p-5 border border-stone-200 rounded-xl">
          <p className="text-gray-600 text-sm mb-3">
            We may update these Terms of Service to reflect changes in our practices or legal requirements.
            Continued use of TuitionMaster after changes constitutes acceptance of the modified terms.
          </p>
          <div className="flex items-center gap-2 text-sm text-brand-600 font-medium">
            <Clock className="w-4 h-4" />
            Users will be notified of significant changes 30 days in advance
          </div>
        </div>
      </PolicySection>

      {/* Contact */}
      <PolicySection id="contact" className="bg-brand-50 rounded-b-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6 text-brand-600" />
          <h3 className="text-lg font-bold text-gray-900">Legal &amp; Support Contact</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {legalContacts.map((contact, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-brand-100">
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">{contact.title}</h4>
              <p className="text-brand-600 text-sm">{contact.email}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl p-4 text-center">
          <p className="text-white font-semibold text-sm">
            By using TuitionMaster, you acknowledge that you have read, understood, and agree to these Terms of Service.
          </p>
          <p className="text-brand-100 text-xs mt-1">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </PolicySection>
    </PolicyLayout>
  </>
);

export default TermsOfService;