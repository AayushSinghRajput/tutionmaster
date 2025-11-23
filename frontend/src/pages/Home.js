
import { Link } from "react-router-dom";
import {
  Search,
  Users,
  Star,
  BookOpen,
  Play,
  GraduationCap,
  Code,
  Sparkles,
  Calendar,
  TrendingUp,
  Award,
  Shield,
  Clock,
  UserPlus,
  Calculator,
  Cpu,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold text-sm">
                  Trusted by 50,000+ students nationwide
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Find Your Perfect
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                  {" "}
                  Tutor
                </span>
              </h1>

              <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-lg">
                Connect with certified educators, master new skills, and achieve
                your academic goals with personalized 1-on-1 tutoring.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/teachers"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-2xl group"
                >
                  <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Find Tutors Now
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <Play className="w-5 h-5 mr-3" />
                  How It Works
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">5000+</div>
                  <div className="text-blue-200 text-sm font-medium">
                    Expert Tutors
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50K+</div>
                  <div className="text-blue-200 text-sm font-medium">
                    Happy Students
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">200+</div>
                  <div className="text-blue-200 text-sm font-medium">
                    Subjects
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-blue-200 text-sm font-medium">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Subjects Grid */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Comprehensive Learning Programs
                  </h3>
                  <p className="text-blue-100 text-sm">
                    Complete curriculum coverage for all educational levels in
                    Nepal
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* School Level (1-10) */}
                  <div className="bg-white rounded-xl p-6 text-center shadow-lg transform hover:scale-105 transition-all duration-300 group">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3 group-hover:bg-blue-200 transition-colors">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      School Level (1-10)
                    </h3>
                    <p className="text-sm text-gray-600">
                      All Subjects: Nepali, English, Math, Science, Social
                    </p>
                    <div className="flex justify-center gap-1 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        Class 1-5
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Class 6-8
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Class 9-10
                      </span>
                    </div>
                  </div>

                  {/* +2 Level */}
                  <div className="bg-white rounded-xl p-6 text-center shadow-lg transform hover:scale-105 transition-all duration-300 group">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-3 group-hover:bg-green-200 transition-colors">
                      <Calculator className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      +2 Level (Science/Management)
                    </h3>
                    <p className="text-sm text-gray-600">
                      Physics, Chemistry, Biology, Math, English, Nepali
                    </p>
                    <div className="flex justify-center gap-1 mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Grade 11
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Grade 12
                      </span>
                    </div>
                  </div>

                  {/* Engineering */}
                  <div className="bg-white rounded-xl p-6 text-center shadow-lg transform hover:scale-105 transition-all duration-300 group">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl mb-3 group-hover:bg-yellow-200 transition-colors">
                      <Cpu className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Engineering (Bachelor's)
                    </h3>
                    <p className="text-sm text-gray-600">
                      All semesters & subjects for Nepal Engineering colleges
                    </p>
                    <div className="flex justify-center gap-1 mt-2">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Bachelor
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        BE/BTech
                      </span>
                    </div>
                  </div>

                  {/* Programming & IT */}
                  <div className="bg-white rounded-xl p-6 text-center shadow-lg transform hover:scale-105 transition-all duration-300 group">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-3 group-hover:bg-purple-200 transition-colors">
                      <Code className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Programming & IT
                    </h3>
                    <p className="text-sm text-gray-600">
                      JavaScript, Python, Web Development, Data Science
                    </p>
                    <div className="flex justify-center gap-1 mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Beginner
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Advanced
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Programs Row */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="bg-white/20 rounded-lg p-3 text-center border border-white/30">
                    <span className="text-white text-sm font-medium">
                      SEE Preparation
                    </span>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center border border-white/30">
                    <span className="text-white text-sm font-medium">
                      +2 Entrance
                    </span>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center border border-white/30">
                    <span className="text-white text-sm font-medium">
                      +15 More Subjects
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              SIMPLE PROCESS
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How <span className="text-blue-600">TutionMaster</span> Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with your learning journey in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300 -z-10"></div>

            <div className="text-center p-8 bg-gradient-to-b from-white to-blue-25 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                1
              </div>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6 mt-4">
                <Search className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Find Your Tutor
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Browse verified tutors, compare profiles, and choose the perfect
                match for your learning needs
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-b from-white to-blue-25 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                2
              </div>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6 mt-4">
                <Calendar className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Schedule Sessions
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Book lessons at your convenience with flexible scheduling and
                personalized timing options
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-b from-white to-blue-25 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                3
              </div>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6 mt-4">
                <TrendingUp className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Learn & Excel
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Engage in interactive lessons, track your progress, and achieve
                your academic goals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-25 to-indigo-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              WHY CHOOSE US
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The <span className="text-blue-600">TutionMaster</span> Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience learning like never before with our comprehensive
              platform features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Expert Educators
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Carefully selected tutors with verified qualifications and
                teaching experience
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Safe & Secure
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Protected payments and secure platform ensuring your complete
                peace of mind
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Verified Reviews
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Authentic feedback from students to help you choose the right
                tutor confidently
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Flexible Learning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Learn at your own pace with customized schedules and
                personalized lesson plans
              </p>
            </div>
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
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful students who achieved their academic
            goals with personalized tutoring
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/teachers"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-2xl group"
            >
              <UserPlus className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Start Learning
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <GraduationCap className="w-5 h-5 mr-3" />
              Become a Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
