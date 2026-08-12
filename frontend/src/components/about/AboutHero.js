import React from 'react';
import { Sparkles } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-gold-300" />
            <span className="font-semibold text-sm">ABOUT TUITIONMASTER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
            Transforming Education,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-400"> One Student at a Time</span>
          </h1>

          <p className="text-lg sm:text-xl text-brand-100 leading-relaxed mb-8 max-w-3xl mx-auto">
            TuitionMaster is changing the way students find teachers and teachers find students.
            We believe in making quality education accessible to everyone, everywhere in Nepal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
