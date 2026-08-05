import { Users } from 'lucide-react';
import { teamMembers } from "../../constants/about/teamMembers";

const AboutTeam = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-25 to-indigo-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Users className="w-4 h-4" />
            MEET OUR TEAM
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Minds Behind TutionMaster
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate educators and innovators dedicated to transforming learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 text-center group">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-12 h-12 text-blue-600" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              <div className="text-blue-600 font-semibold mb-3">{member.role}</div>
              <p className="text-gray-600 text-sm leading-relaxed">
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
