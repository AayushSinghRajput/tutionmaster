// pages/PrivacyPolicy.js
import { Shield, UserCheck, Eye, Zap, Share2, Lock, MessageCircle } from 'lucide-react';
import PolicyLayout from '../components/policy/PolicyLayout';
import PolicySection from '../components/policy/PolicySection';
import InfoCategoryCard from '../components/policy/InfoCategoryCard';
import { PERSONAL_INFO_ITEMS, EDUCATIONAL_INFO_ITEMS, DATA_USAGE_ITEMS } from '../constants/policy/privacyPolicyData';
import SEO from '../components/seo/SEO';

const SECTIONS = [
  { id: 'commitment',  label: 'Our Commitment',       icon: UserCheck },
  { id: 'information', label: 'Information We Collect', icon: Eye },
  { id: 'usage',       label: 'How We Use Data',       icon: Zap },
  { id: 'sharing',     label: 'Data Sharing',          icon: Share2 },
  { id: 'security',    label: 'Data Security',         icon: Lock },
  { id: 'contact',     label: 'Contact Us',            icon: MessageCircle },
];

const SECURITY_FEATURES = [
  { icon: Shield, title: 'Encryption',      desc: 'End-to-end encryption for all data' },
  { icon: Lock,   title: 'Access Control',  desc: 'Role-based access permissions' },
  { icon: Eye,    title: 'Secure Storage',  desc: 'Enterprise-grade infrastructure' },
];

const PrivacyPolicy = () => (
  <>
    <SEO
      title="Privacy Policy | TuitionMaster"
      description="Learn how TuitionMaster collects, uses, and protects your personal information."
      canonicalUrl="https://www.tuitionmaster.guru/privacy-policy"
    />
    <PolicyLayout
      title="Privacy Policy"
      description="Protecting your privacy is fundamental to our mission. Learn how we safeguard your information."
      icon={Shield}
      badge="Legal · Privacy"
      sections={SECTIONS}
    >
      {/* 1. Our Commitment */}
      <PolicySection id="commitment">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <UserCheck className="w-5 h-5 text-brand-600 flex-shrink-0" />
          Our Commitment to Privacy
        </h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          At TuitionMaster, we believe that privacy is a fundamental right. As an educational platform,
          we are committed to protecting the privacy of our educators, students, and institutional partners.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information
          when you use our platform and services.
        </p>
      </PolicySection>

      {/* 2. Information We Collect */}
      <PolicySection id="information">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <Eye className="w-5 h-5 text-brand-600 flex-shrink-0" />
          Information We Collect
        </h2>
        <div className="bg-brand-50 border-l-4 border-brand-500 pl-5 py-3 mb-6 rounded-r-lg">
          <h3 className="font-semibold text-brand-800 mb-1">Educational Data</h3>
          <p className="text-brand-700 text-sm">
            We collect information necessary to provide personalised educational experiences,
            including course progress, assessment results, and learning preferences.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <InfoCategoryCard title="Personal Information" items={PERSONAL_INFO_ITEMS} />
          <InfoCategoryCard title="Educational Information" items={EDUCATIONAL_INFO_ITEMS} />
        </div>
      </PolicySection>

      {/* 3. How We Use Your Information */}
      <PolicySection id="usage">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <Zap className="w-5 h-5 text-brand-600 flex-shrink-0" />
          How We Use Your Information
        </h2>
        <div className="space-y-3">
          {DATA_USAGE_ITEMS.map((use, index) => (
            <div key={use.title} className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl hover:bg-brand-50 transition-colors">
              <div className="w-7 h-7 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-brand-600 font-bold text-xs">{index + 1}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{use.title}</h4>
                <p className="text-gray-600 text-sm mt-0.5">{use.description}</p>
              </div>
            </div>
          ))}
        </div>
      </PolicySection>

      {/* 4. Data Sharing */}
      <PolicySection id="sharing">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <Share2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
          Data Sharing &amp; Disclosure
        </h2>
        <div className="bg-gold-50 border border-gold-200 rounded-xl p-5">
          <h3 className="font-semibold text-gold-800 mb-2">Educational Purpose First</h3>
          <p className="text-gold-700 text-sm">
            We only share educational data with authorised institutions and educators for legitimate
            educational purposes. We never sell personal information to third parties.
          </p>
        </div>
      </PolicySection>

      {/* 5. Data Security */}
      <PolicySection id="security">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <Lock className="w-5 h-5 text-brand-600 flex-shrink-0" />
          Data Security
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {SECURITY_FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-5 border border-stone-200 rounded-xl text-center hover:shadow-md transition-shadow">
              <Icon className="w-7 h-7 text-brand-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">{title}</h4>
              <p className="text-gray-600 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </PolicySection>

      {/* 6. Contact */}
      <PolicySection id="contact" className="bg-brand-50 rounded-b-2xl">
        <div className="text-center">
          <MessageCircle className="w-10 h-10 text-brand-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Questions About Privacy?</h3>
          <p className="text-gray-600 text-sm mb-4">Our team is here to help you understand our practices.</p>
          <a
            href="mailto:hello.tuitionmaster@gmail.com"
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-700 transition-colors shadow-sm"
          >
            Contact Privacy Team
          </a>
        </div>
      </PolicySection>
    </PolicyLayout>
  </>
);

export default PrivacyPolicy;