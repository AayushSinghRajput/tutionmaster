// components/legal/PrivacyPolicy.jsx
import React from 'react';
import { Shield, Lock, Eye, UserCheck, MessageCircle, Server } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Protecting your privacy is fundamental to our mission at TutionMaster. Learn how we safeguard your information.
          </p>
          <div className="mt-6 text-sm text-blue-600 font-semibold">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Quick Navigation */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-white text-lg font-semibold mb-4">Quick Navigation</h2>
            <div className="flex flex-wrap gap-4">
              {['information', 'usage', 'sharing', 'security', 'rights', 'cookies'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
                >
                  {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </a>
              ))}
            </div>
          </div>

          <div className="px-8 py-12">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <UserCheck className="w-6 h-6 text-blue-600 mr-3" />
                Our Commitment to Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At TutionMaster, we believe that privacy is a fundamental right. As an educational platform, 
                we are committed to protecting the privacy of our educators, students, and institutional partners.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our platform and services.
              </p>
            </section>

            {/* Information We Collect */}
            <section id="information" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Eye className="w-6 h-6 text-blue-600 mr-3" />
                Information We Collect
              </h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 pl-6 py-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">Educational Data</h3>
                <p className="text-blue-700 text-sm">
                  We collect information necessary to provide personalized educational experiences, 
                  including course progress, assessment results, and learning preferences.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                  <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Name and contact details</li>
                    <li>• Professional credentials</li>
                    <li>• Institutional affiliation</li>
                    <li>• Profile information</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                  <h4 className="font-semibold text-gray-900 mb-3">Educational Information</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Course enrollment data</li>
                    <li>• Assessment results</li>
                    <li>• Learning progress</li>
                    <li>• Interaction data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section id="usage" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Personalized Learning",
                    description: "Tailor educational content and recommendations based on individual learning patterns"
                  },
                  {
                    title: "Progress Tracking",
                    description: "Monitor and report on educational progress to educators and students"
                  },
                  {
                    title: "Platform Improvement",
                    description: "Enhance our services and develop new educational features"
                  },
                  {
                    title: "Communication",
                    description: "Send important updates about courses, schedules, and educational resources"
                  }
                ].map((use, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">{use.title}</h4>
                      <p className="text-gray-700 text-sm mt-1">{use.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Sharing */}
            <section id="sharing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Sharing & Disclosure</h2>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="font-semibold text-orange-800 mb-3">Educational Purpose First</h3>
                <p className="text-orange-700 text-sm">
                  We only share educational data with authorized institutions and educators for legitimate 
                  educational purposes. We never sell personal information to third parties.
                </p>
              </div>
            </section>

            {/* Security */}
            <section id="security" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Lock className="w-6 h-6 text-blue-600 mr-3" />
                Data Security
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {[
                  { icon: Shield, title: "Encryption", desc: "End-to-end encryption for all data" },
                  { icon: Lock, title: "Access Control", desc: "Role-based access permissions" },
                  { icon: Server, title: "Secure Storage", desc: "Enterprise-grade infrastructure" }
                ].map((item, index) => (
                  <div key={index} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    <item.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-700 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section className="bg-blue-50 rounded-xl p-8 text-center">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Questions About Privacy?</h3>
              <p className="text-gray-700 mb-4">
                Our dedicated privacy team is here to help you understand our practices.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Contact Privacy Team
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;