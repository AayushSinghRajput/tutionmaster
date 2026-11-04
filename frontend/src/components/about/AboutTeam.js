import { Users } from 'lucide-react';
import { teamMembers } from "../../constants/about/teamMembers";

const AboutTeam = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-brand-50 to-gold-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Users className="w-4 h-4" />
            MEET OUR TEAM
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            The Minds Behind TuitionMaster
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            Built by engineers and former private tutors in Nepal who understand firsthand the challenges of modern academic mentorship.
          </p>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            Our founding team combines deep software engineering expertise with years of hands-on classroom and in-home teaching experience across Kathmandu and regional education hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-stone-200 text-center group flex flex-col items-center">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-brand-100 flex items-center justify-center group-hover:bg-brand-200 transition-colors shadow-inner">
                {member.image ? (
                  <img
                    loading="lazy"
                    src={member.image}
                    alt={`${member.name} - Team Member at TuitionMaster`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-12 h-12 text-brand-600" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <div className="text-brand-600 font-semibold text-sm mb-3">{member.role}</div>
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
