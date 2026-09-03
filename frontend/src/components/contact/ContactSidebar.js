import { useState } from 'react';
import { Clock, Shield, Phone, Mail, BookOpen, PlayCircle } from 'lucide-react';
import { faqs, officeHours } from '../../constants/contact/contactData';
import VideoOverlayBanner from '../video/VideoOverlayBanner';

const ContactSidebar = () => {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 3);

  return (
    <div className="space-y-8">
      {showVideoModal && (
        <VideoOverlayBanner onClose={() => setShowVideoModal(false)} />
      )}

      {/* Office Hours */}
      <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-brand-600" />
          <h3 className="text-xl font-bold text-gray-900">Office Hours</h3>
        </div>
        <div className="space-y-3">
          {officeHours.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-600">{item.days}</span>
              <span className="font-semibold text-gray-900">{item.hours}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Support */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-gold-300" />
          <h3 className="text-xl font-bold">Need to Reach Us Quickly?</h3>
        </div>
        <p className="text-brand-100 mb-4">
          Have an urgent question about your account? Call or email us directly and we'll get back to you as soon as we can.
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+977 (980) 598-1168</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>hello.tuitionmaster@gmail.com</span>
          </div>
        </div>
      </div>

      {/* FAQ Preview */}
      <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-brand-600" />
          <h3 className="text-xl font-bold text-gray-900">Common Questions</h3>
        </div>
        <div className="space-y-4">
          {visibleFaqs.map((faq, index) => (
            <div key={index} className="border-l-4 border-brand-200 pl-4">
              <h4 className="font-semibold text-gray-900 text-sm mb-1 flex items-center gap-1.5">
                {faq.question}
              </h4>
              <p className="text-gray-600 text-xs mb-2">
                {faq.answer}
              </p>
              {faq.isVideoFaq && (
                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-brand-600" />
                  Watch Video Guide
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowAllFaqs((prev) => !prev)}
          className="w-full mt-4 text-brand-600 hover:text-brand-700 font-semibold text-sm flex items-center justify-center gap-2 py-2"
        >
          {showAllFaqs ? 'Show Less' : 'View All FAQs'}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${showAllFaqs ? '-rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContactSidebar;
