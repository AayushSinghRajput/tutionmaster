import React from 'react';
import { GraduationCap, Heart, Shield, Sparkles } from 'lucide-react';

const AboutValues = () => {
  const values = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Educational Excellence",
      description: "We uphold strict benchmarks for pedagogical quality and measurable academic progress. Every tutor profile features verified academic credentials, and our community review system ensures students consistently receive clear, concept-first instruction aligned with Nepal's CDC, NEB, and entrance examinations."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Student-Centered Mentorship",
      description: "Every architectural feature of TuitionMaster serves student confidence and mastery. We understand that every learner digests concepts at their own pace, so we prioritize tutors who provide empathetic guidance, positive reinforcement, and practical problem-solving drills."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Uncompromising Trust & Safety",
      description: "Creating a secure environment for home and virtual learning is our foundation. We review teacher verification documents, maintain transparent contact channels, and empower parents to review tutor CVs, past ratings, and credentials before inviting a mentor into their home."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Practical Innovation",
      description: "We deploy technology to solve real educational friction in Nepal. From our intelligent AI tutor matching engine that parses curriculum requirements to low-bandwidth mobile optimization, our engineering directly improves the daily learning experience of our users."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Heart className="w-4 h-4" />
            OUR CORE VALUES
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            The Principles Guiding TuitionMaster
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Education is a personal journey that shapes lives. Our team is guided by four foundational commitments that influence how we develop our marketplace, screen educators, and safeguard the educational journey of every Nepali student.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-stone-200 text-center group flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-2xl mb-6 text-brand-600 group-hover:bg-brand-200 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
