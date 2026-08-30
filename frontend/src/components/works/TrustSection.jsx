import { ShieldCheck } from 'lucide-react';
import { TRUST_POINTS } from '../../constants/works/trust';

const TrustSection = () => {
  return (
    <div className="bg-stone-50 border-y border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-success-100 text-success-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" />
            TRUST & TRANSPARENCY
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-4">
            Make Informed Decisions
          </h2>
          <p className="text-brand-700 max-w-2xl mx-auto">
            Clear, detailed tutor information is available so you can decide with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {TRUST_POINTS.map((point) => (
            <div
              key={point.id}
              className="bg-white rounded-2xl p-6 shadow-md border border-stone-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mb-4">
                <point.icon className="w-6 h-6 text-success-600" />
              </div>
              <h3 className="font-bold text-brand-900 mb-2">{point.title}</h3>
              <p className="text-brand-700 text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSection;
