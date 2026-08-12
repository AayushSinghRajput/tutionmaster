import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export const contactMethods = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    description: "Send us an email anytime",
    details: "aayushsinghrajput3003@gmail.com",
    action: "mailto:aayushsinghrajput3003@gmail.com"
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    description: "Mon to Fri from 8am to 5pm",
    details: "+977 (980) 598-1168",
    action: "tel:+9779805981168"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Visit Us",
    description: "Come say hello at our office",
    details: "Kathmandu, Nepal",
    action: "https://maps.google.com"
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Message Us",
    description: "Send us a message anytime",
    details: "We usually reply within a day",
    action: "mailto:aayushsinghrajput3003@gmail.com"
  }
];

export const faqs = [
  {
    question: "How do I become a tutor on TuitionMaster?",
    answer: "Visit our 'Become a Tutor' page and complete your profile — subjects, qualifications, and availability. Once submitted, your profile is live and visible to students right away."
  },
  {
    question: "What subjects do you offer tutoring for?",
    answer: "We cover subjects across school level (Class 1-10), +2 (Science/Management), Bachelor's/Engineering, and programming & IT, plus SEE and entrance-exam preparation."
  },
  {
    question: "How are tutors verified?",
    answer: "Tutors self-report their qualifications, experience, and subjects when creating a profile. We recommend reviewing a tutor's profile details and speaking with them directly before booking a session."
  },
  {
    question: "Can I schedule sessions outside regular hours?",
    answer: "Yes! Tutors set their own weekly availability, including evenings and weekends, so you can find a schedule that fits."
  }
];

export const officeHours = [
  { days: "Sunday - Friday", hours: "8:00 AM - 8:00 PM" },
  { days: "Saturday", hours: "Closed" },
];
