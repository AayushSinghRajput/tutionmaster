// pages/PrivacyPolicy.js
import PolicyHeader from '../components/policy/PolicyHeader';
import QuickNav from '../components/policy/QuickNav';
import IntroductionSection from '../components/policy/IntroductionSection';
import InformationSection from '../components/policy/InformationSection';
import UsageSection from '../components/policy/UsageSection';
import DataSharingSection from '../components/policy/DataSharingSection';
import SecuritySection from '../components/policy/SecuritySection';
import ContactSection from '../components/policy/ContactSection';
import { QUICK_NAV_ITEMS } from '../constants/policy/privacyPolicyData';

const PrivacyPolicy = () => {
  const handleContactClick = () => {
  window.location.href = 'mailto:privacy@tutionmaster.com';
};

  return (
    <div className="min-h-screen bg-stone-100 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PolicyHeader
          title="Privacy Policy"
          description="Protecting your privacy is fundamental to our mission at TuitionMaster. Learn how we safeguard your information."
        />

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <QuickNav items={QUICK_NAV_ITEMS} />

          <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <IntroductionSection />
            <InformationSection />
            <UsageSection />
            <DataSharingSection />
            <SecuritySection />
            <ContactSection onContactClick={handleContactClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;