import { Sparkles, ArrowRight, ArrowDown } from 'lucide-react';
import { AI_MATCHING_FLOW } from '../../constants/works/aiMatching';

const AiMatchingSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          INTELLIGENT TUTOR MATCHING
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-4">
          Smarter Tutor Discovery Powered by AI
        </h2>
        <p className="text-brand-700 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Instead of scrolling through hundreds of generic listings, simply describe your learning goals, current grade level, curriculum requirements, or difficult exam topics to our integrated AI assistant.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-3 lg:gap-4 max-w-6xl mx-auto">
        {AI_MATCHING_FLOW.map((stage, index) => (
          <div key={stage.id} className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 flex-1">
            <div className="w-full bg-white rounded-2xl p-6 shadow-md border border-stone-200 text-center hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 mx-auto bg-brand-100 rounded-2xl flex items-center justify-center mb-4">
                  <stage.icon className="w-7 h-7 text-brand-600" />
                </div>
                <h3 className="font-bold text-brand-900 mb-2 font-serif text-lg">{stage.title}</h3>
                <p className="text-sm text-brand-700 leading-relaxed">{stage.description}</p>
              </div>
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

      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 max-w-3xl mx-auto mt-10 text-center">
        <h4 className="font-serif font-bold text-brand-900 mb-2 text-base sm:text-lg">
          Human Control Meets Algorithmic Precision
        </h4>
        <p className="text-brand-700 text-sm leading-relaxed">
          Our AI algorithm assists by ranking tutors whose verified expertise matches your exact curriculum syllabus and availability. You always retain complete autonomy to inspect resumes, read reviews, and interview tutors directly before beginning classes.
        </p>
      </div>
    </div>
  );
};

export default AiMatchingSection;
