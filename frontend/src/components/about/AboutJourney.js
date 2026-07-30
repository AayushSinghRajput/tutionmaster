import React from 'react';
import { BookOpen } from 'lucide-react';

const AboutJourney = () => {
  const milestones = [
    { year: "2020", event: "TutionMaster Founded", description: "Started with a vision to transform education" },
    { year: "2021", event: "10,000 Students", description: "Reached our first major milestone" },
    { year: "2022", event: "Global Expansion", description: "Expanded to 10+ countries worldwide" },
    { year: "2023", event: "Award Winning", description: "Recognized as top education platform" },
    { year: "2024", event: "50,000+ Users", description: "Growing community of learners and educators" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-25 to-indigo-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            OUR JOURNEY
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The TutionMaster Story
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From a simple idea to transforming thousands of educational journeys
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-300 to-blue-500"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 lg:px-8 mb-4 lg:mb-0">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                    <div className="text-blue-600 font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.event}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="lg:w-1/2 lg:px-8 flex justify-center">
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
                
                <div className="lg:w-1/2 lg:px-8">
                  {/* Empty space for alignment */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutJourney;
