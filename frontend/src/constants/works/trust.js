import { ClipboardCheck, Award, Star, BadgeCheck, FileText } from 'lucide-react';

export const TRUST_POINTS = [
  {
    id: 'detailed-profiles',
    icon: ClipboardCheck,
    title: 'Detailed Tutor Profiles',
    description: 'Every tutor profile lays out subjects, teaching information, and background so you know who you’re considering.',
  },
  {
    id: 'qualifications-experience',
    icon: Award,
    title: 'Qualifications & Experience',
    description: 'Review a tutor’s qualifications and teaching experience before you reach out.',
  },
  {
    id: 'reviews-ratings',
    icon: Star,
    title: 'Reviews & Ratings',
    description: 'Read ratings and reviews left by other students to see how a tutor has taught in practice.',
  },
  {
    id: 'verification',
    icon: BadgeCheck,
    title: 'Verification, Where Applicable',
    description: 'Profiles that have completed our review process display a TuitionMaster Verified indicator.',
  },
  {
    id: 'clear-information',
    icon: FileText,
    title: 'Clear Tutor Information',
    description: 'Pricing, availability, and teaching mode are shown up front, so you can make an informed decision.',
  },
];
