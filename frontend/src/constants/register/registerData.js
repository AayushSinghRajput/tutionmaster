import React from 'react';
import { Users, Calendar, DollarSign, Shield } from 'lucide-react';

export const teacherBenefits = [
  {
    icon: <Users className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />,
    bgClass: "bg-blue-50 border-blue-200 hover:border-blue-300",
    title: "Global Student Reach",
    description: "Connect with thousands of students worldwide"
  },
  {
    icon: <Calendar className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />,
    bgClass: "bg-green-50 border-green-200 hover:border-green-300",
    title: "Flexible Schedule",
    description: "Teach on your own terms and availability"
  },
  {
    icon: <DollarSign className="w-6 h-6 text-purple-600 mt-1 mr-4 flex-shrink-0" />,
    bgClass: "bg-purple-50 border-purple-200 hover:border-purple-300",
    title: "Competitive Earnings",
    description: "Set your rates and maximize your income"
  },
  {
    icon: <Shield className="w-6 h-6 text-orange-600 mt-1 mr-4 flex-shrink-0" />,
    bgClass: "bg-orange-50 border-orange-200 hover:border-orange-300",
    title: "Secure Platform",
    description: "Safe and reliable payment processing"
  }
];

export const quickStartSteps = [
  "Create your profile",
  "Set your availability",
  "Start teaching"
];
