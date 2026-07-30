import {
  TermsHeader,
  TermsAcceptance,
  TermsUserAccounts,
  TermsIntellectualProperty,
  TermsProhibitedActivities,
  TermsTerminationAndPayments,
  TermsContactAndAgreement
} from '../components/termsOfService';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <TermsHeader />
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-12">
            <TermsAcceptance />
            <TermsUserAccounts />
            <TermsIntellectualProperty />
            <TermsProhibitedActivities />
            <TermsTerminationAndPayments />
            <TermsContactAndAgreement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;