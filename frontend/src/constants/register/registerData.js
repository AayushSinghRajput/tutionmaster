import React from 'react';
import { Users, Calendar, DollarSign, Shield } from 'lucide-react';

export const teacherBenefits = [
  {
    icon: <Users className="w-6 h-6 text-brand-600 mt-1 mr-4 flex-shrink-0" />,
    bgClass: "bg-brand-50 border-brand-200 hover:border-brand-300",
    title: "Nepal-Wide Reach",
    description: "Get discovered by students across Nepal, not just your neighborhood"
  },
  {
    icon: <Calendar className="w-6 h-6 text-gold-600 mt-1 mr-4 flex-shrink-0" />,
    bgClass: "bg-gold-50 border-gold-200 hover:border-gold-300",
    title: "Flexible Schedule",
    description: "Teach on your own terms and availability"
  },
  {
    icon: <DollarSign className="w-6 h-6 text-brand-600 mt-1 mr-4 flex-shrink-0" />,
    bgClass: "bg-brand-50 border-brand-200 hover:border-brand-300",
    title: "Set Your Own Rates",
    description: "List your subjects and rates on your profile"
  },
  {
    icon: <Shield className="w-6 h-6 text-gold-600 mt-1 mr-4 flex-shrink-0" />,
    bgClass: "bg-gold-50 border-gold-200 hover:border-gold-300",
    title: "Secure Platform",
    description: "Your account and personal details are kept safe"
  }
];

export const quickStartSteps = [
  "Create your profile",
  "List your subjects & rates",
  "Get contacted by students"
];
