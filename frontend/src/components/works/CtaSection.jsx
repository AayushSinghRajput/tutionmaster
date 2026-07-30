import { Calendar } from 'lucide-react';

const CtaSection = ({ onBookTrial, onSpeakToAdvisor }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-8">
          Join TutionMaster today and experience the difference personalized tutoring can make
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onBookTrial}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Free Trial
          </button>
          <button
            onClick={onSpeakToAdvisor}
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
          >
            Speak to Advisor
          </button>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;