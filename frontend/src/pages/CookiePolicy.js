// components/legal/CookiePolicy.jsx
import React, { useState } from 'react';
import { Cookie, Shield, Settings, Eye, BarChart3, Users, MessageCircle } from 'lucide-react';

const CookiePolicy = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const cookieCategories = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      icon: Shield,
      description: 'Required for basic website functionality and security',
      necessary: true,
      cookies: [
        { name: 'auth_token', purpose: 'Maintains your login session', duration: 'Session' },
        { name: 'csrf_token', purpose: 'Protects against cross-site request forgery', duration: 'Session' },
        { name: 'consent_status', purpose: 'Remembers your cookie preferences', duration: '1 year' }
      ]
    },
    {
      id: 'performance',
      name: 'Performance Cookies',
      icon: BarChart3,
      description: 'Help us understand how visitors interact with our platform',
      necessary: false,
      cookies: [
        { name: 'google_analytics', purpose: 'Tracks website usage and performance', duration: '2 years' },
        { name: 'hotjar_session', purpose: 'Analyzes user behavior and interactions', duration: '1 year' },
        { name: 'performance_metrics', purpose: 'Monitors page load times and errors', duration: '30 days' }
      ]
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      icon: Settings,
      description: 'Remember your preferences and enhance user experience',
      necessary: false,
      cookies: [
        { name: 'language_pref', purpose: 'Remembers your preferred language', duration: '1 year' },
        { name: 'theme_preference', purpose: 'Saves your theme selection (light/dark)', duration: '1 year' },
        { name: 'recent_courses', purpose: 'Remembers your recently viewed courses', duration: '30 days' }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      icon: Users,
      description: 'Used to deliver relevant educational content and offers',
      necessary: false,
      cookies: [
        { name: 'facebook_pixel', purpose: 'Enables Facebook advertising campaigns', duration: '90 days' },
        { name: 'google_ads', purpose: 'Tracks conversions for Google Ads', duration: '90 days' },
        { name: 'affiliate_tracking', purpose: 'Tracks referrals from partner sites', duration: '60 days' }
      ]
    }
  ];

  const filteredCategories = activeCategory === 'all' 
    ? cookieCategories 
    : cookieCategories.filter(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Cookie className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn how TutionMaster uses cookies to enhance your educational experience and protect your privacy.
          </p>
          <div className="mt-6 text-sm text-blue-600 font-semibold">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Quick Summary */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <div className="flex items-center text-white">
              <Eye className="w-6 h-6 mr-3" />
              <div>
                <h2 className="text-lg font-semibold">Transparent Cookie Usage</h2>
                <p className="text-blue-100 text-sm mt-1">
                  We believe in clear communication about how we use cookies to improve your learning experience.
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 py-12">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Cookies</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Cookies are small text files stored on your device that help us provide, protect, and improve 
                    TutionMaster. They enable features like secure login, personalized learning paths, and platform analytics.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-800 mb-2">Educational Focus</h3>
                    <p className="text-blue-700 text-sm">
                      Our primary use of cookies is to enhance your educational experience, track learning progress, 
                      and maintain platform security.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Benefits</h4>
                  <ul className="text-gray-700 space-y-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Personalized learning recommendations
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Secure authentication and session management
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Progress tracking and performance analytics
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Platform optimization and bug detection
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookie Categories Filter */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookie Categories</h2>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeCategory === 'all'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Categories
                </button>
                {cookieCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <category.icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Cookie Details */}
              <div className="space-y-6">
                {filteredCategories.map((category) => (
                  <div key={category.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className={`px-6 py-4 ${
                      category.necessary ? 'bg-green-50 border-b border-green-200' : 'bg-blue-50 border-b border-blue-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <category.icon className={`w-5 h-5 mr-3 ${
                            category.necessary ? 'text-green-600' : 'text-blue-600'
                          }`} />
                          <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                          {category.necessary && (
                            <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              Always Active
                            </span>
                          )}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          category.necessary 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {category.necessary ? 'Required' : 'Optional'}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-2 ml-8">{category.description}</p>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Cookies in this category:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 font-semibold text-gray-900">Cookie Name</th>
                              <th className="text-left py-3 font-semibold text-gray-900">Purpose</th>
                              <th className="text-left py-3 font-semibold text-gray-900">Duration</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {category.cookies.map((cookie, index) => (
                              <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 font-mono text-blue-600">{cookie.name}</td>
                                <td className="py-3 text-gray-700">{cookie.purpose}</td>
                                <td className="py-3 text-gray-600">{cookie.duration}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Cookie Management */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Managing Your Preferences</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-800 mb-3">Browser Settings</h4>
                    <p className="text-blue-700 text-sm mb-4">
                      You can control cookies through your web browser settings. Most browsers allow you to:
                    </p>
                    <ul className="text-blue-700 text-sm space-y-2">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                        View and delete existing cookies
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                        Block cookies from specific sites
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                        Set preferences for different cookie types
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-green-800 mb-3">Essential Cookies Notice</h4>
                    <p className="text-green-700 text-sm">
                      Please note that disabling essential cookies may affect platform functionality, 
                      including login capabilities and course progress tracking.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Opt-Out Tools</h4>
                    <p className="text-gray-700 text-sm mb-4">
                      For analytics and marketing cookies, you can use these industry tools:
                    </p>
                    <div className="space-y-3">
                      <a href="#" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <BarChart3 className="w-4 h-4 text-gray-600 mr-3" />
                        <span className="text-gray-700 text-sm">Google Analytics Opt-out Browser Add-on</span>
                      </a>
                      <a href="#" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Users className="w-4 h-4 text-gray-600 mr-3" />
                        <span className="text-gray-700 text-sm">Digital Advertising Alliance Opt-out</span>
                      </a>
                      <a href="#" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Settings className="w-4 h-4 text-gray-600 mr-3" />
                        <span className="text-gray-700 text-sm">Network Advertising Initiative Opt-out</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Updates & Contact */}
            <section className="bg-blue-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Questions About Cookies?</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Policy Updates</h4>
                  <p className="text-gray-700 text-sm">
                    We may update this Cookie Policy to reflect changes in technology, regulation, or our services. 
                    Significant changes will be communicated through platform notifications.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Our Team</h4>
                  <p className="text-gray-700 text-sm mb-2">privacy@tutionmaster.com</p>
                  <p className="text-gray-600 text-xs">
                    Our privacy team is available to answer any questions about cookie usage and your privacy rights.
                  </p>
                </div>
              </div>
            </section>

            {/* Consent Status */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-center">
              <div className="flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-white mr-2" />
                <p className="text-white font-semibold">
                  Your current cookie preferences are saved and respected.
                </p>
              </div>
              <button className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Update Cookie Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;