import React from 'react';
import { BarChart3, Users, Settings } from 'lucide-react';

const CookieManagement = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Managing Your Preferences</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
            <h4 className="font-semibold text-brand-800 mb-3">Browser Settings</h4>
            <p className="text-brand-700 text-sm mb-4">
              You can control cookies through your web browser settings. Most browsers allow you to:
            </p>
            <ul className="text-brand-700 text-sm space-y-2">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                View and delete existing cookies
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                Block cookies from specific sites
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                Set preferences for different cookie types
              </li>
            </ul>
          </div>

          <div className="bg-success-50 border border-success-200 rounded-xl p-6">
            <h4 className="font-semibold text-success-700 mb-3">Essential Cookies Notice</h4>
            <p className="text-success-600 text-sm">
              Please note that disabling essential cookies may affect platform functionality,
              including login capabilities and course progress tracking.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-stone-200 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Opt-Out Tools</h4>
            <p className="text-gray-700 text-sm mb-4">
              For analytics and marketing cookies, you can use these industry tools:
            </p>
            <div className="space-y-3">
              <a href="#" className="flex items-center p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
                <BarChart3 className="w-4 h-4 text-gray-600 mr-3" />
                <span className="text-gray-700 text-sm">Google Analytics Opt-out Browser Add-on</span>
              </a>
              <a href="#" className="flex items-center p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
                <Users className="w-4 h-4 text-gray-600 mr-3" />
                <span className="text-gray-700 text-sm">Digital Advertising Alliance Opt-out</span>
              </a>
              <a href="#" className="flex items-center p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
                <Settings className="w-4 h-4 text-gray-600 mr-3" />
                <span className="text-gray-700 text-sm">Network Advertising Initiative Opt-out</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CookieManagement;
