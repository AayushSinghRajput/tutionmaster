import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, AlertCircle, Send } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import { supportService } from '../../services/supportService';
import { trackMetaEvent } from '../../analytics/metaPixel';

export const CONTACT_SUBJECT_CONFIG = {
  tutoring: {
    label: 'Tutoring Services (Tuition Enquiry)',
    category: 'General',
    metaEvent: 'Lead',
  },
  general: {
    label: 'General Inquiry',
    category: 'General',
    metaEvent: 'Contact',
  },
  technical: {
    label: 'Technical Support',
    category: 'Technical Support',
    metaEvent: 'Contact',
  },
  billing: {
    label: 'Billing & Payments',
    category: 'General',
    metaEvent: 'Contact',
  },
  partnership: {
    label: 'Partnership',
    category: 'General',
    metaEvent: 'Contact',
  },
  other: {
    label: 'Other',
    category: 'General',
    metaEvent: 'Contact',
  },
};

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const successTimerRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitError('');
    setIsSubmitted(false);
    setSubmittedTicketId(null);

    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }

    const subjectConfig = CONTACT_SUBJECT_CONFIG[data.subject] || CONTACT_SUBJECT_CONFIG.other;
    const payload = {
      name: `${data.firstName.trim()} ${data.lastName.trim()}`,
      contactEmail: data.email.trim(),
      contactPhone: data.phone ? data.phone.trim() : '',
      category: subjectConfig.category,
      subject: subjectConfig.label,
      message: data.message.trim(),
    };

    try {
      const response = await supportService.createTicket(payload);
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || 'Failed to send your message. Please try again.');
      }

      const ticketId = response.data?.data?.ticketId || null;

      trackMetaEvent(subjectConfig.metaEvent, {
        content_name: subjectConfig.label,
        content_category: subjectConfig.metaEvent === 'Lead' ? 'tuition_enquiry' : data.subject,
      });

      setSubmittedTicketId(ticketId);
      setIsSubmitted(true);
      reset();

      successTimerRef.current = setTimeout(() => {
        setIsSubmitted(false);
        setSubmittedTicketId(null);
      }, 8000);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to send your message. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 p-6">
        <h3 className="text-2xl font-serif font-bold text-white text-center">
          Send Us a Message
        </h3>
        <p className="text-brand-100 text-center mt-2">
          We typically respond within 2 hours
        </p>
      </div>

      <div className="p-5 sm:p-8">
        {isSubmitted && (
          <div
            role="status"
            className="mb-6 bg-success-50 border border-success-200 rounded-xl p-4 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-success-700">Message Sent Successfully!</div>
              <div className="text-success-600 text-sm">
                {submittedTicketId
                  ? `Ticket ${submittedTicketId} created. We'll get back to you within 2 hours.`
                  : "We'll get back to you within 2 hours."}
              </div>
            </div>
          </div>
        )}

        {submitError && (
          <div
            role="alert"
            className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-red-700">Unable to Send Message</div>
              <div className="text-red-600 text-sm">{submitError}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-800">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300 ${
                  errors.firstName
                    ? 'border-red-400 bg-red-25 focus:ring-red-200'
                    : 'border-gray-200 hover:border-brand-300'
                }`}
                placeholder="Your first name"
                {...register('firstName', { required: 'First name is required' })}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-800">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300 ${
                  errors.lastName
                    ? 'border-red-400 bg-red-25 focus:ring-red-200'
                    : 'border-gray-200 hover:border-brand-300'
                }`}
                placeholder="Your last name"
                {...register('lastName', { required: 'Last name is required' })}
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300 ${
                errors.email
                  ? 'border-red-400 bg-red-25 focus:ring-red-200'
                  : 'border-gray-200 hover:border-brand-300'
              }`}
              placeholder="your@email.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Please enter a valid email address'
                }
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-800">
              Phone / WhatsApp (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300 border-gray-200 hover:border-brand-300"
              placeholder="+977 98XXXXXXXX"
              {...register('phone')}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-800">
              Subject *
            </label>
            <select
              id="subject"
              className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300 ${
                errors.subject
                  ? 'border-red-400 bg-red-25 focus:ring-red-200'
                  : 'border-gray-200 hover:border-brand-300'
              }`}
              {...register('subject', { required: 'Please select a subject' })}
            >
              <option value="">Select a topic</option>
              {Object.entries(CONTACT_SUBJECT_CONFIG).map(([value, config]) => (
                <option key={value} value={value}>
                  {config.label}
                </option>
              ))}
            </select>
            {errors.subject && (
              <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-800">
              Message *
            </label>
            <textarea
              id="message"
              rows={6}
              className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300 resize-none ${
                errors.message
                  ? 'border-red-400 bg-red-25 focus:ring-red-200'
                  : 'border-gray-200 hover:border-brand-300'
              }`}
              placeholder="Tell us how we can help you..."
              {...register('message', {
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters'
                }
              })}
            />
            {errors.message && (
              <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold shadow-lg shadow-brand-500/25 focus:outline-none focus:ring-4 focus:ring-brand-200 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-3 group"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size={20} text="" />
                <span className="animate-pulse">Sending Message...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
