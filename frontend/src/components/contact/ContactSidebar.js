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
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-6 h-6 text-gold-300" />
          <h3 className="text-xl font-bold">Need Instant Support?</h3>
        </div>
        <p className="text-brand-100 text-sm mb-5">
          Having trouble creating a profile or have questions about tuition jobs? Reach out directly via WhatsApp or phone.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/9779805981168?text=Hi%20TuitionMaster%20Support%2C%20I%20need%20assistance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-transform hover:-translate-y-0.5 text-xs sm:text-sm"
          >
            <span>💬 Chat on WhatsApp</span>
          </a>

          <a
            href="tel:+9779805981168"
            className="flex-1 bg-white hover:bg-stone-100 text-gray-900 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-transform hover:-translate-y-0.5 text-xs sm:text-sm"
          >
            <Phone className="w-4 h-4 text-brand-600" />
            <span>Call Support</span>
          </a>
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
