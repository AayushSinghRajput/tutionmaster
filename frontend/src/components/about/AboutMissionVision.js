import React from 'react';
import { Target, CheckCircle, Award } from 'lucide-react';

const AboutMissionVision = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Target className="w-4 h-4" />
              OUR MISSION
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Empowering Learners Across Nepal
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Our mission is to bridge the educational gap by connecting passionate educators with 
              eager learners through our innovative platform. We're committed to making quality 
              education accessible, affordable, and effective for everyone.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Personalized Learning</h4>
                  <p className="text-gray-600">Tailored educational experiences for every student</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Expert Educators</h4>
                  <p className="text-gray-600">Carefully vetted teachers with proven expertise</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Proven Results</h4>
                  <p className="text-gray-600">Track record of improved academic performance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              OUR VISION
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Shaping the Future of Education
            </h3>
            <p className="text-blue-100 leading-relaxed mb-6">
              We envision a world where every student has access to quality education regardless of 
              their location, background, or circumstances. Through technology and innovation, 
              we're building the future of learning today.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-2xl font-bold">Nepal-Wide</div>
                <div className="text-blue-200 text-sm">Tutor Network</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-2xl font-bold">Qualified</div>
                <div className="text-blue-200 text-sm">Teacher Profiles</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-2xl font-bold">1-on-1</div>
                <div className="text-blue-200 text-sm">Personalized Learning</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-blue-200 text-sm">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMissionVision;
