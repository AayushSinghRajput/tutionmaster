import React, { useState } from 'react';
import { cookieCategories } from '../../constants/cookiePolicy/cookieData';

const CookieCategories = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories = activeCategory === 'all'
    ? cookieCategories
    : cookieCategories.filter(cat => cat.id === activeCategory);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookie Categories</h2>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-brand-600 text-white shadow-md'
              : 'bg-stone-100 text-gray-700 hover:bg-stone-200'
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
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-stone-100 text-gray-700 hover:bg-stone-200'
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
          <div key={category.id} className="border border-stone-200 rounded-xl overflow-hidden">
            <div className={`px-6 py-4 ${
              category.necessary ? 'bg-success-50 border-b border-success-200' : 'bg-brand-50 border-b border-brand-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <category.icon className={`w-5 h-5 mr-3 ${
                    category.necessary ? 'text-success-600' : 'text-brand-600'
                  }`} />
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  {category.necessary && (
                    <span className="ml-3 px-2 py-1 bg-success-100 text-success-700 text-xs font-medium rounded-full">
                      Always Active
                    </span>
                  )}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  category.necessary
                    ? 'bg-success-100 text-success-700'
                    : 'bg-brand-100 text-brand-800'
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
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-3 font-semibold text-gray-900">Cookie Name</th>
                      <th className="text-left py-3 font-semibold text-gray-900">Purpose</th>
                      <th className="text-left py-3 font-semibold text-gray-900">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {category.cookies.map((cookie, index) => (
                      <tr key={index} className="hover:bg-stone-50 transition-colors">
                        <td className="py-3 font-mono text-brand-600">{cookie.name}</td>
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
  );
};

export default CookieCategories;
