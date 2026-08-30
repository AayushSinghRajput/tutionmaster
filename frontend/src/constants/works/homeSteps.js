import { ClipboardList, Sparkles, Search, GraduationCap, UserPlus, Radar, MessageCircle, PlayCircle } from 'lucide-react';

export const HOME_STUDENT_STEPS = [
  {
    id: 'tell-us-what-you-need',
    icon: ClipboardList,
    title: 'Tell Us What You Need',
    description: 'Share your subject, learning level, location, preferred rate, and schedule.',
  },
  {
    id: 'find-your-match',
    icon: Sparkles,
    title: 'Find Your Match',
    description: 'Our AI helps identify tutors who fit your requirements and preferences.',
  },
  {
    id: 'explore-tutors',
    icon: Search,
    title: 'Explore Tutors',
    description: 'View qualifications, experience, subjects, reviews, ratings, pricing, and other available tutor information.',
  },
  {
    id: 'start-learning',
    icon: GraduationCap,
    title: 'Start Learning',
    description: 'Connect with your chosen tutor and begin your learning journey.',
  },
];

export const HOME_TUTOR_STEPS = [
  {
    id: 'create-your-profile',
    icon: UserPlus,
    title: 'Create Your Profile',
    description: 'Add your qualifications, subjects, experience, teaching information, and availability.',
  },
  {
    id: 'get-discovered',
    icon: Radar,
    title: 'Get Discovered',
    description: 'Make your profile visible to students looking for tutors who match their requirements.',
  },
  {
    id: 'connect-with-students',
    icon: MessageCircle,
    title: 'Connect With Students',
    description: 'Interested students can view your profile and contact you using the available contact options.',
  },
  {
    id: 'start-teaching',
    icon: PlayCircle,
    title: 'Start Teaching',
    description: 'Connect with your students and begin teaching.',
  },
];
