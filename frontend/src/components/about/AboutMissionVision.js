import React from 'react';
import { Target, CheckCircle, Award } from 'lucide-react';

const AboutMissionVision = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Target className="w-4 h-4" />
              OUR MISSION
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-6">
              Empowering Learners Across Nepal
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Our mission is to bridge the educational gap by connecting passionate educators with
              eager learners through our innovative platform. We're committed to making quality
              education accessible, affordable, and effective for everyone.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-success-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Personalized Learning</h4>
                  <p className="text-gray-600">Tailored educational experiences for every student</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-success-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Passionate Educators</h4>
                  <p className="text-gray-600">Tutors share their qualifications and experience directly on their profiles</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-success-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Direct Connections</h4>
                  <p className="text-gray-600">Students and tutors connect directly, without unnecessary middlemen</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-6 sm:p-8 text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              OUR VISION
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              Shaping the Future of Education
            </h3>
            <p className="text-brand-100 leading-relaxed mb-6">
              We envision a world where every student has access to quality education regardless of
              their location, background, or circumstances. Through technology and innovation,
              we're building the future of learning today.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8">
              <div className="text-center p-3 sm:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold">Nepal-Wide</div>
                <div className="text-brand-100 text-sm">Tutor Network</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold">Qualified</div>
                <div className="text-brand-100 text-sm">Teacher Profiles</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold">1-on-1</div>
                <div className="text-brand-100 text-sm">Personalized Learning</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold">Flexible</div>
                <div className="text-brand-100 text-sm">Scheduling</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMissionVision;
