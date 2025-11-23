import { 
  Search, 
  UserCheck, 
  Calendar, 
  Video, 
  FileText, 
  Award, 
  Clock, 
  Shield,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Find Your Tutor",
      description: "Browse through our verified tutors and filter by subject, level, and availability",
      details: "Use our advanced search to find the perfect match based on qualifications, ratings, and teaching style"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Book a Session",
      description: "Select your preferred time slot and schedule your first session instantly",
      details: "View tutor availability in real-time and book sessions that fit your schedule"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Join Live Class",
      description: "Connect with your tutor through our interactive virtual classroom",
      details: "Access high-quality video, interactive whiteboard, and screen sharing features"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed progress reports and analytics",
      details: "Get regular assessments and personalized feedback to ensure continuous improvement"
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Tutors",
      description: "All tutors undergo rigorous background checks and qualification verification"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Scheduling",
      description: "Learn at your own pace with 24/7 availability across multiple time zones"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee with free replacement if not satisfied"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "1-on-1 Attention",
      description: "Personalized learning experience with individual attention from expert tutors"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Taught" },
    { number: "500+", label: "Expert Tutors" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-blue-900 mb-6">
          Start Your Learning Journey in 4 Simple Steps
        </h1>
        <p className="text-xl text-blue-700 max-w-2xl mx-auto mb-8">
          Join thousands of students who have transformed their academic performance with our personalized tutoring approach
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/teachers" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
            <UserCheck className="w-5 h-5 mr-2" />
            Find a Tutor
          </Link>
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Watch Demo
          </button>
        </div>
      </div>

      {/* Steps Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-blue-200 z-0"></div>
              )}
              
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{step.title}</h3>
                <p className="text-blue-700 mb-4">{step.description}</p>
                <p className="text-sm text-blue-600 bg-blue-50 rounded-lg p-3">
                  {step.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose TutionMaster?</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              We combine cutting-edge technology with proven teaching methodologies to deliver exceptional learning outcomes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-blue-800 rounded-2xl p-6 text-center hover:bg-blue-700 transition-colors">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-blue-200 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">{stat.number}</div>
                <div className="text-blue-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Join TutionMaster today and experience the difference personalized tutoring can make
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Speak to Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;