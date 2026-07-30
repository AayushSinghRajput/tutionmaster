import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, AlertCircle, Send } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSubmitted(true);
    reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <h3 className="text-2xl font-bold text-white text-center">
          Send Us a Message
        </h3>
        <p className="text-blue-100 text-center mt-2">
          We typically respond within 2 hours
        </p>
      </div>
      
      <div className="p-8">
        {isSubmitted && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-pulse">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-green-800">Message Sent Successfully!</div>
              <div className="text-green-700 text-sm">We'll get back to you within 2 hours.</div>
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
                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                  errors.firstName 
                    ? 'border-red-400 bg-red-25 focus:ring-red-200' 
                    : 'border-gray-200 hover:border-blue-300'
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
                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                  errors.lastName 
                    ? 'border-red-400 bg-red-25 focus:ring-red-200' 
                    : 'border-gray-200 hover:border-blue-300'
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
              className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                errors.email 
                  ? 'border-red-400 bg-red-25 focus:ring-red-200' 
                  : 'border-gray-200 hover:border-blue-300'
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
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-800">
              Subject *
            </label>
            <select
              id="subject"
              className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                errors.subject 
                  ? 'border-red-400 bg-red-25 focus:ring-red-200' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              {...register('subject', { required: 'Please select a subject' })}
            >
              <option value="">Select a topic</option>
              <option value="general">General Inquiry</option>
              <option value="technical">Technical Support</option>
              <option value="billing">Billing & Payments</option>
              <option value="tutoring">Tutoring Services</option>
              <option value="partnership">Partnership</option>
              <option value="other">Other</option>
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
              className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none ${
                errors.message 
                  ? 'border-red-400 bg-red-25 focus:ring-red-200' 
                  : 'border-gray-200 hover:border-blue-300'
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
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-3 group"
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
