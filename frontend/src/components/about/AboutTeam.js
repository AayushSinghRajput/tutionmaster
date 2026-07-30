import React from 'react';
import { Users } from 'lucide-react';

const AboutTeam = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      bio: "Former Education Professor with 15+ years in educational technology",
      image: "/team/sarah.jpg"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Tutoring",
      bio: "Education specialist with expertise in curriculum development",
      image: "/team/michael.jpg"
    },
    {
      name: "Dr. Emily Watson",
      role: "Academic Director",
      bio: "PhD in Educational Psychology and learning methodologies",
      image: "/team/emily.jpg"
    },
    {
      name: "James Kim",
      role: "Technology Lead",
      bio: "Software engineer passionate about educational innovation",
      image: "/team/james.jpg"
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 text-center group">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Users className="w-12 h-12 text-blue-600" />
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
