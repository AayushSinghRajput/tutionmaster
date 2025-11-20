import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  BookOpen,
  Users,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Contact = () => {
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

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Send us an email anytime",
      details: "support@tutionmaster.com",
      action: "mailto:support@tutionmaster.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Mon to Fri from 8am to 5pm",
      details: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      description: "Come say hello at our office",
      details: "123 Education Street, Learning City",
      action: "https://maps.google.com"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Instant help from our team",
      details: "Available 24/7 for urgent queries",
      action: "#chat"
    }
  ];

  const faqs = [
    {
      question: "How do I become a tutor on TutionMaster?",
      answer: "Visit our 'Become a Tutor' page, complete the application form, and our team will review your qualifications within 2-3 business days."
    },
    {
      question: "What subjects do you offer tutoring for?",
      answer: "We offer tutoring for all major academic subjects from K-12 to college level, including STEM, languages, business, and test preparation."
    },
    {
      question: "How are tutors vetted and verified?",
      answer: "All tutors undergo a rigorous verification process including background checks, qualification verification, and teaching experience assessment."
    },
    {
      question: "Can I schedule sessions outside regular hours?",
      answer: "Yes! Our platform offers flexible scheduling, including evenings and weekends, to accommodate different time zones and schedules."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-25 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <MessageCircle className="w-4 h-4 text-yellow-300" />
              <span className="font-semibold text-sm">GET IN TOUCH</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              We're Here to 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400"> Help You Learn</span>
            </h1>
            
            <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-3xl mx-auto">
              Have questions about our platform, tutoring services, or need technical support? 
              Our dedicated team is ready to assist you on your educational journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the contact method that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="bg-gradient-to-b from-white to-blue-25 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4 text-blue-600 group-hover:bg-blue-200 transition-colors">
                  {method.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {method.description}
                </p>
                <div className="text-blue-600 font-semibold text-sm">
                  {method.details}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-to-br from-blue-25 to-indigo-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
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

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold text-gray-900">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold text-gray-900">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold text-gray-900">Emergency Support Only</span>
                  </div>
                </div>
              </div>

              {/* Quick Support */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-bold">Urgent Support</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  Need immediate assistance with your account or an ongoing session?
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Emergency Hotline: +1 (555) 123-HELP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>urgent@tutionmaster.com</span>
                  </div>
                </div>
              </div>

              {/* FAQ Preview */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Common Questions</h3>
                </div>
                <div className="space-y-4">
                  {faqs.slice(0, 3).map((faq, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 text-xs">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2 py-2">
                  View All FAQs
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Location Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visit Our Headquarters
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Located in the heart of the education district
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
                <div className="w-full h-64 bg-blue-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-blue-600">
                    <MapPin className="w-12 h-12 mx-auto mb-3" />
                    <p className="font-semibold">Interactive Map</p>
                    <p className="text-sm text-blue-500">123 Education Street, Learning City</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">TutionMaster HQ</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      123 Education Street<br />
                      Learning City, LC 12345
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      +1 (555) 123-4567
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      hello@tutionmaster.com
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-25 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Parking & Access</h4>
                  <p className="text-sm text-gray-600">
                    Free parking available in the adjacent lot. Our building is wheelchair accessible with elevator access to all floors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;