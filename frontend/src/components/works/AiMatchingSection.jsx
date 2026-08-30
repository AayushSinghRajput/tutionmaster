import { Sparkles, ArrowRight, ArrowDown } from 'lucide-react';
import { AI_MATCHING_FLOW } from '../../constants/works/aiMatching';

const AiMatchingSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          AI-POWERED DISCOVERY
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-4">
          Smarter Tutor Discovery With AI
        </h2>
        <p className="text-brand-700 max-w-2xl mx-auto">
          Our AI helps you discover tutors who best fit your requirements and preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-3 lg:gap-4 max-w-6xl mx-auto">
        {AI_MATCHING_FLOW.map((stage, index) => (
          <div key={stage.id} className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 flex-1">
            <div className="w-full bg-white rounded-2xl p-6 shadow-md border border-stone-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 mx-auto bg-brand-100 rounded-2xl flex items-center justify-center mb-4">
                <stage.icon className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="font-bold text-brand-900 mb-2">{stage.title}</h3>
              <p className="text-sm text-brand-700">{stage.description}</p>
            </div>
            {index !== AI_MATCHING_FLOW.length - 1 && (
              <>
                <ArrowDown className="w-5 h-5 text-brand-300 lg:hidden flex-shrink-0" />
                <ArrowRight className="w-5 h-5 text-brand-300 hidden lg:block flex-shrink-0" />
              </>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-brand-600 text-sm mt-8 max-w-xl mx-auto">
        Our AI helps narrow down the search — you still explore profiles and make the final choice.
      </p>
    </div>
  );
};

export default AiMatchingSection;
