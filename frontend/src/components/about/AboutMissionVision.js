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
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Finding reliable, competent academic support has traditionally been a challenge for families in Nepal, often relying on word-of-mouth or unvetted local advertisements. TuitionMaster was founded to transform this reality by establishing a secure, transparent, and technology-driven standard for private education.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              Our mission is to bridge the educational gap by directly connecting passionate educators with eager learners through our verified marketplace. We are committed to making personalized tutoring accessible, accountable, and impactful for every student, regardless of their academic background or socioeconomic level.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-success-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Personalized Learning & Syllabus Mastery</h4>
                  <p className="text-gray-600">Tailored educational experiences for every student, aligned with Nepal's CDC, NEB, CBSE, and Cambridge A-Levels. Our tutors create structured, weekly learning milestones that address specific student weaknesses rather than applying generic teaching templates.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-success-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Vetted & Dedicated Educators</h4>
                  <p className="text-gray-600">Every teacher shares verifiable academic qualifications, institutional backgrounds, and certified CVs. Students and parents can transparently evaluate past student reviews, teaching styles, and hourly or monthly rates prior to booking a single session.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-success-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Direct Connections Without Hidden Intermediaries</h4>
                  <p className="text-gray-600">We eliminate high agency commissions and non-transparent broker fees. Students and tutors communicate directly to agree on schedules and expectations, ensuring affordable rates for families and dignified compensation for teachers.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              OUR VISION
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              Shaping the Future of Education in Nepal
            </h3>
            <p className="text-brand-100 leading-relaxed mb-4">
              We envision an educational landscape in Nepal where geography never limits a child's academic potential. By uniting in-person home tutoring with interactive digital classrooms, we empower students in both metropolitan centers and remote communities to learn from the nation's foremost subject matter experts.
            </p>
            <p className="text-brand-100/90 text-sm leading-relaxed mb-6">
              Through thoughtful AI-powered matching, rigorous profile verification, and ongoing community feedback, TuitionMaster is building the most trusted academic ecosystem in the Himalayan region.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8">
              <div className="text-center p-3 sm:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold">Nepal-Wide</div>
                <div className="text-brand-100 text-sm">Tutor Network</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold">100% Verified</div>
                <div className="text-brand-100 text-sm">Teacher Profiles</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold">1-on-1 & Group</div>
                <div className="text-brand-100 text-sm">Flexible Formats</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold">Zero Agency Cut</div>
                <div className="text-brand-100 text-sm">Direct Collaboration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMissionVision;
