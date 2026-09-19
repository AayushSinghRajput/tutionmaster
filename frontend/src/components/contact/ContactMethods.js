import React from 'react';
import { contactMethods } from '../../constants/contact/contactData';

const ContactMethods = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4">
            Multiple Ways to Reach Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the contact method that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => {
            const hasMultipleLinks = Array.isArray(method.links) && method.links.length > 0;
            const CardTag = hasMultipleLinks ? 'div' : 'a';
            const cardProps = hasMultipleLinks ? {} : { href: method.action };

            return (
              <CardTag
                key={index}
                {...cardProps}
                className="bg-gradient-to-b from-white to-stone-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-200 text-center group flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-100 rounded-xl mb-4 text-brand-600 group-hover:bg-brand-200 transition-colors">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {method.description}
                  </p>
                </div>
                <div className="text-brand-600 font-semibold text-sm">
                  {hasMultipleLinks ? (
                    <div className="flex flex-col gap-1">
                      {method.links.map((link, lIndex) => (
                        <a
                          key={lIndex}
                          href={link.action}
                          className="hover:underline hover:text-brand-700 block transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    method.details
                  )}
                </div>
              </CardTag>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;
