import { Search, UserCheck, Video, FileText } from 'lucide-react';

export const STEPS = [
  {
    id: 'find-tutor',
    icon: Search,
    title: 'Find Your Tutor',
    description: 'Browse through our verified tutors and filter by subject, level, and availability',
    details: 'Use our advanced search to find the perfect match based on qualifications, ratings, and teaching style',
  },
  {
    id: 'book-session',
    icon: UserCheck,
    title: 'Book a Session',
    description: 'Select your preferred time slot and schedule your first session instantly',
    details: 'View tutor availability in real-time and book sessions that fit your schedule',
  },
  {
    id: 'join-class',
    icon: Video,
    title: 'Join Live Class',
    description: 'Connect with your tutor through our interactive virtual classroom',
    details: 'Access high-quality video, interactive whiteboard, and screen sharing features',
  },
  {
    id: 'track-progress',
    icon: FileText,
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed progress reports and analytics',
    details: 'Get regular assessments and personalized feedback to ensure continuous improvement',
  },
];