import { UserPlus, ShieldCheck, Radar, MessageCircle, GraduationCap } from 'lucide-react';

export const TUTOR_JOURNEY = [
  {
    id: 'create-profile',
    icon: UserPlus,
    title: 'Create Your Tutor Profile',
    description:
      'Create a profile with your name, subjects, qualifications, experience, teaching information, location, availability, rate, and other relevant information.',
    tags: ['Subjects', 'Qualifications', 'Experience', 'Availability', 'Rate'],
  },
  {
    id: 'build-trustworthy-profile',
    icon: ShieldCheck,
    title: 'Build a Complete & Trustworthy Profile',
    description:
      'Accurate, detailed information helps students understand your background and teaching capabilities. Highlight your qualifications, experience, subjects, teaching approach, availability, and pricing. Where verification applies, a completed review can be reflected on your profile.',
  },
  {
    id: 'get-discovered',
    icon: Radar,
    title: 'Get Discovered by Students',
    description:
      "Students discover tutors on TuitionMaster based on their requirements. Your profile can appear in relevant searches and AI-assisted discovery, though TuitionMaster doesn't guarantee a specific number of students or leads.",
  },
  {
    id: 'connect-with-students',
    icon: MessageCircle,
    title: 'Connect With Interested Students',
    description:
      'Interested students can view your profile and use the available contact options to reach out and communicate with you.',
  },
  {
    id: 'start-teaching',
    icon: GraduationCap,
    title: 'Start Teaching',
    description:
      'Once you and the student agree on the learning arrangement, you can begin classes together.',
  },
];
