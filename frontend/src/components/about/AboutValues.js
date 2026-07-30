import React from 'react';
import { GraduationCap, Heart, Shield, Sparkles } from 'lucide-react';

const AboutValues = () => {
  const values = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Educational Excellence",
      description: "We maintain the highest standards in teaching quality and learning outcomes"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Student Success",
      description: "Every decision we make is focused on student achievement and growth"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Safety",
      description: "Creating a secure environment for learning and teaching"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Innovation",
      description: "Continuously improving our platform with cutting-edge technology"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Heart className="w-4 h-4" />
            OUR VALUES
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Drives Us Forward
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The core principles that guide everything we do at TutionMaster
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-gradient-to-b from-white to-blue-25 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 text-blue-600 group-hover:bg-blue-200 transition-colors">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
