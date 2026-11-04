import { UserPlus, ShieldCheck, Radar, MessageCircle, GraduationCap } from 'lucide-react';

export const TUTOR_JOURNEY = [
  {
    id: 'create-profile',
    icon: UserPlus,
    title: '1. Register & Build Your Academic Profile',
    description:
      'Complete our guided 4-step onboarding wizard. Enter your university education, target boards (SEE, +2, Entrance, University), years of teaching experience, preferred travel radius, and hourly or monthly rate preferences.',
    tags: ['Qualifications', 'Subjects', 'Availability', 'Rates', 'Curricula'],
  },
  {
    id: 'build-trustworthy-profile',
    icon: ShieldCheck,
    title: '2. Upload Resume & Complete Verification',
    description:
      'Submit your academic documentation and CV for administrative verification. Approved educators receive the verified badge, significantly increasing parent trust and profile inquiry rates.',
  },
  {
    id: 'get-discovered',
    icon: Radar,
    title: '3. Gain High-Intent Student Visibility',
    description:
      'Your profile is indexed across our public directory and recommended by our AI chat assistant whenever students in your area search for your specialized subjects.',
  },
  {
    id: 'connect-with-students',
    icon: MessageCircle,
    title: '4. Receive Direct Student Inquiries',
    description:
      'Parents and students contact you directly without commission cuts. Review tuition requests, discuss student needs, and schedule trial sessions on your terms.',
  },
  {
    id: 'start-teaching',
    icon: GraduationCap,
    title: '5. Build Your Independent Tutoring Career',
    description:
      'Deliver impactful instruction, collect genuine five-star reviews from satisfied families, and establish an authoritative reputation as an expert educator in Nepal.',
  },
];
