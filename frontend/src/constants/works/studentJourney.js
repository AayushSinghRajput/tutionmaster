import { ClipboardList, Sparkles, Search, UserCheck, MessageCircle } from 'lucide-react';

export const STUDENT_JOURNEY = [
  {
    id: 'tell-us-what-you-need',
    icon: ClipboardList,
    title: 'Tell Us What You Need',
    description:
      "Share the details that matter to you — subject, learning level, location, preferred rate, schedule, learning preferences, and whether you'd like local or online learning where applicable. These requirements help TuitionMaster understand what kind of tutor you're looking for.",
    tags: ['Subject', 'Level', 'Location', 'Rate', 'Schedule'],
  },
  {
    id: 'ai-recommendations',
    icon: Sparkles,
    title: 'Get AI-Powered Tutor Recommendations',
    description:
      'Our AI helps you discover tutors who best fit your requirements and preferences, considering subject, level, location, rate, availability, and tutor profile information.',
    quote: 'Our AI helps you discover tutors who best fit your requirements and preferences.',
  },
  {
    id: 'explore-profiles',
    icon: Search,
    title: 'Explore Tutor Profiles',
    description:
      'Inspect tutor information before deciding — qualifications, experience, subjects, teaching information, reviews, ratings, pricing, verification status where applicable, and other relevant profile details.',
    tags: ['Qualifications', 'Experience', 'Reviews', 'Ratings', 'Pricing'],
  },
  {
    id: 'choose-your-tutor',
    icon: UserCheck,
    title: 'Choose Your Tutor',
    description:
      "After reviewing suitable tutors, choose the one you believe is the best fit for your needs — an informed decision you make, not one TuitionMaster makes for you.",
  },
  {
    id: 'connect-start-learning',
    icon: MessageCircle,
    title: 'Connect & Start Learning',
    description:
      'Contact the tutor through the available contact options and arrange your tuition directly with them.',
  },
];
