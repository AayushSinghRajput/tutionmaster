import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export const contactMethods = [
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

export const faqs = [
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

export const officeHours = [
  { days: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
  { days: "Saturday", hours: "9:00 AM - 2:00 PM" },
  { days: "Sunday", hours: "Emergency Support Only" }
];
