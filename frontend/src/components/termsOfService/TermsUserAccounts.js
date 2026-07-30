import React from 'react';

const TermsUserAccounts = () => {
  return (
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
  );
};

export default TermsUserAccounts;
