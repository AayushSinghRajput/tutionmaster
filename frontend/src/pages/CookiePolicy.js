import { useState } from 'react';
import {
  Cookie, Eye, Settings, MessageCircle, BarChart3, Users, Shield,
} from 'lucide-react';
import PolicyLayout from '../components/policy/PolicyLayout';
import PolicySection from '../components/policy/PolicySection';
import { cookieCategories } from '../constants/cookiePolicy/cookieData';
import SEO from '../components/seo/SEO';

const SECTIONS = [
  { id: 'understanding', label: 'Understanding Cookies',   icon: Cookie },
  { id: 'categories',   label: 'Cookie Categories',       icon: Eye },
  { id: 'management',   label: 'Managing Preferences',    icon: Settings },
  { id: 'contact',      label: 'Questions & Contact',     icon: MessageCircle },
];

/* ── Cookie Categories sub-section with filter tabs ── */
const CookieCategoriesPanel = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all'
    ? cookieCategories
    : cookieCategories.filter((c) => c.id === activeCategory);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            activeCategory === 'all'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'bg-stone-100 text-gray-600 hover:bg-stone-200'
          }`}
        >
          All
        </button>
        {cookieCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-stone-100 text-gray-600 hover:bg-stone-200'
            }`}
          >
            <cat.icon className="w-3.5 h-3.5" />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Category detail cards */}
      <div className="space-y-4">
        {filtered.map((cat) => (
          <div key={cat.id} className="border border-stone-200 rounded-xl overflow-hidden">
            <div className={`px-5 py-3 flex items-center justify-between ${
              cat.necessary ? 'bg-success-50 border-b border-success-200' : 'bg-brand-50 border-b border-brand-200'
            }`}>
              <div className="flex items-center gap-2">
                <cat.icon className={`w-4 h-4 ${cat.necessary ? 'text-success-600' : 'text-brand-600'}`} />
                <h3 className="font-semibold text-gray-900 text-sm">{cat.name}</h3>
                {cat.necessary && (
                  <span className="px-2 py-0.5 bg-success-100 text-success-700 text-xs font-medium rounded-full">Always Active</span>
                )}
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                cat.necessary ? 'bg-success-100 text-success-700' : 'bg-brand-100 text-brand-700'
              }`}>
                {cat.necessary ? 'Required' : 'Optional'}
              </span>
            </div>
            <div className="px-5 py-4">
              <p className="text-gray-500 text-xs mb-3">{cat.description}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-2 font-semibold text-gray-700 pr-4">Cookie</th>
                      <th className="text-left py-2 font-semibold text-gray-700 pr-4">Purpose</th>
                      <th className="text-left py-2 font-semibold text-gray-700">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {cat.cookies.map((cookie, i) => (
                      <tr key={i} className="hover:bg-stone-50 transition-colors">
                        <td className="py-2 font-mono text-brand-600 pr-4">{cookie.name}</td>
                        <td className="py-2 text-gray-600 pr-4">{cookie.purpose}</td>
                        <td className="py-2 text-gray-500">{cookie.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const CookiePolicy = () => (
  <>
    <SEO
      title="Cookie Policy | TuitionMaster"
      description="Learn how TuitionMaster uses cookies to enhance your experience and protect your privacy."
      canonicalUrl="https://www.tuitionmaster.guru/cookie-policy"
    />
    <PolicyLayout
      title="Cookie Policy"
      description="Learn how TuitionMaster uses cookies to enhance your experience and protect your privacy."
      icon={Cookie}
      badge="Legal · Cookies"
      sections={SECTIONS}
    >
      {/* Transparent usage banner */}
      <div className="px-6 sm:px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-700 rounded-t-2xl flex items-start gap-3">
        <Eye className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-white font-semibold text-sm">Transparent Cookie Usage</p>
          <p className="text-brand-100 text-xs mt-0.5">
            We believe in clear communication about how we use cookies to improve your experience.
          </p>
        </div>
      </div>

      {/* 1. Understanding Cookies */}
      <PolicySection id="understanding">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <Cookie className="w-5 h-5 text-brand-600 flex-shrink-0" />
          Understanding Cookies
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-3">
            <p className="text-gray-600 text-sm leading-relaxed">
              Cookies are small text files stored on your device that help us provide, protect, and improve
              TuitionMaster. They enable features like secure login, personalised experiences, and platform analytics.
            </p>
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4">
              <h3 className="font-semibold text-brand-800 mb-1 text-sm">Educational Focus</h3>
              <p className="text-brand-700 text-xs">
                Our primary use of cookies is to enhance your experience on the platform, keep you securely
                signed in, and maintain platform security.
              </p>
            </div>
          </div>
          <div className="bg-stone-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Key Benefits</h4>
            <ul className="space-y-2">
              {[
                'Personalised recommendations',
                'Secure authentication and session management',
                'Progress tracking and performance analytics',
                'Platform optimisation and bug detection',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
                  <div className="w-1.5 h-1.5 bg-brand-500 rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PolicySection>

      {/* 2. Cookie Categories */}
      <PolicySection id="categories">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <Eye className="w-5 h-5 text-brand-600 flex-shrink-0" />
          Cookie Categories
        </h2>
        <CookieCategoriesPanel />
      </PolicySection>

      {/* 3. Managing Preferences */}
      <PolicySection id="management">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
          <Settings className="w-5 h-5 text-brand-600 flex-shrink-0" />
          Managing Your Preferences
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4">
              <h4 className="font-semibold text-brand-800 mb-2 text-sm">Browser Settings</h4>
              <p className="text-brand-700 text-xs mb-3">You can control cookies through your web browser settings. Most browsers allow you to:</p>
              <ul className="space-y-1.5">
                {['View and delete existing cookies', 'Block cookies from specific sites', 'Set preferences for different cookie types'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-brand-700 text-xs">
                    <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-success-50 border border-success-200 rounded-xl p-4">
              <h4 className="font-semibold text-success-700 mb-1 text-sm">Essential Cookies Notice</h4>
              <p className="text-success-600 text-xs">
                Disabling essential cookies may affect platform functionality, including login capabilities and course progress tracking.
              </p>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Opt-Out Tools</h4>
            <p className="text-gray-500 text-xs mb-3">For analytics and marketing cookies, you can use these industry tools:</p>
            <div className="space-y-2">
              {[
                { icon: BarChart3, label: 'Google Analytics Opt-out Browser Add-on' },
                { icon: Users,     label: 'Digital Advertising Alliance Opt-out' },
                { icon: Settings,  label: 'Network Advertising Initiative Opt-out' },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700 text-xs">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </PolicySection>

      {/* 4. Contact */}
      <PolicySection id="contact" className="bg-brand-50 rounded-b-2xl">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="w-6 h-6 text-brand-600" />
          <h3 className="text-lg font-bold text-gray-900">Questions About Cookies?</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-xl p-4 border border-brand-100">
            <h4 className="font-semibold text-gray-900 mb-1 text-sm">Policy Updates</h4>
            <p className="text-gray-600 text-xs">
              We may update this Cookie Policy to reflect changes in technology, regulation, or our services.
              Significant changes will be communicated through platform notifications.
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-brand-100">
            <h4 className="font-semibold text-gray-900 mb-1 text-sm">Contact Our Team</h4>
            <p className="text-brand-600 text-sm font-medium mb-1">hello.tuitionmaster@gmail.com</p>
            <p className="text-gray-500 text-xs">Email us with any questions about cookie usage and your privacy rights.</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-white" />
            <p className="text-white text-sm font-semibold">Your current cookie preferences are saved and respected.</p>
          </div>
          <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white text-brand-600 rounded-lg text-sm font-semibold hover:bg-brand-50 transition-colors">
            <Settings className="w-4 h-4" />
            Update Preferences
          </button>
        </div>
      </PolicySection>
    </PolicyLayout>
  </>
);

export default CookiePolicy;