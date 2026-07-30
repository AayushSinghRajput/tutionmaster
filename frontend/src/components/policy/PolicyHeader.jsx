import { Shield } from 'lucide-react';

const PolicyHeader = ({ title, description }) => {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <Shield className="w-10 h-10 text-blue-600" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
      <div className="mt-6 text-sm text-blue-600 font-semibold">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default PolicyHeader;