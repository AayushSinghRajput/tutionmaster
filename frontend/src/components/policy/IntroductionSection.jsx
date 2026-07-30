import { UserCheck } from 'lucide-react';

const IntroductionSection = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <UserCheck className="w-6 h-6 text-blue-600 mr-3" />
        Our Commitment to Privacy
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        At TutionMaster, we believe that privacy is a fundamental right. As an educational platform,
        we are committed to protecting the privacy of our educators, students, and institutional partners.
      </p>
      <p className="text-gray-700 leading-relaxed">
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information
        when you use our platform and services.
      </p>
    </section>
  );
};

export default IntroductionSection;