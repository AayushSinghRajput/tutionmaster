import { ClipboardCheck, Award, Star, BadgeCheck, FileText } from 'lucide-react';

export const TRUST_POINTS = [
  {
    id: 'detailed-profiles',
    icon: ClipboardCheck,
    title: 'Standardized Tutor Profiles',
    description: 'Every educator profile follows a structured format highlighting verified academic credentials, target curricula (CDC, NEB, CBSE, Cambridge), and specific teaching specializations so parents never face hidden surprises.',
  },
  {
    id: 'qualifications-experience',
    icon: Award,
    title: 'Verifiable CV & Background Documentation',
    description: 'Review formal educational qualifications, collegiate degrees, past institutional appointments, and verified resumes via our integrated PDF viewer before scheduling your initial lesson.',
  },
  {
    id: 'reviews-ratings',
    icon: Star,
    title: 'Authentic Student Ratings & Testimonials',
    description: 'Inspect verified reviews submitted by real students and parents. Our team screens submissions to prevent spam, ensuring transparent feedback on teacher punctuality, pedagogy, and student grade improvements.',
  },
  {
    id: 'verification',
    icon: BadgeCheck,
    title: 'TuitionMaster Verification Badge',
    description: 'Tutors who complete our document review protocol receive the TuitionMaster Verified badge, confirming their identity and certifying that their stated academic qualifications match submitted documentation.',
  },
  {
    id: 'clear-information',
    icon: FileText,
    title: 'Transparent Pricing & Direct Scheduling',
    description: 'Hourly and monthly rates, weekly availability time slots, and travel radius are clearly displayed upfront. Families deal directly with educators without agency surcharges or contract lock-ins.',
  },
];
