import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Target, 
  Award, 
  GraduationCap, 
  Heart, 
  Sparkles, 
  TrendingUp,
  Shield,
  Clock,
  Star,
  Globe,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const About = () => {
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

  const milestones = [
    { year: "2020", event: "TutionMaster Founded", description: "Started with a vision to transform education" },
    { year: "2021", event: "10,000 Students", description: "Reached our first major milestone" },
    { year: "2022", event: "Global Expansion", description: "Expanded to 10+ countries worldwide" },
    { year: "2023", event: "Award Winning", description: "Recognized as top education platform" },
    { year: "2024", event: "50,000+ Users", description: "Growing community of learners and educators" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-25 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="font-semibold text-sm">ABOUT TUTIONMASTER</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transforming Education, 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400"> One Student at a Time</span>
            </h1>
            
            <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-3xl mx-auto">
              TutionMaster is revolutionizing the way students learn and teachers teach. 
              We believe in making quality education accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Target className="w-4 h-4" />
                OUR MISSION
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Empowering Learners Worldwide
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
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-blue-200 text-sm">Students Helped</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold">5K+</div>
                  <div className="text-blue-200 text-sm">Expert Tutors</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-blue-200 text-sm">Success Rate</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold">20+</div>
                  <div className="text-blue-200 text-sm">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
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

      {/* Our Values */}
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

      {/* Team Section */}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Join the Educational Revolution
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Be part of our mission to make quality education accessible to learners worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-2xl group"
            >
              Start Learning Today
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/become-tutor" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Become a Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;