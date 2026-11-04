import { Sparkles, Target, Search, ClipboardCheck, ShieldCheck, Globe } from 'lucide-react';

export const FEATURES = [
  {
    id: 'ai-matching',
    icon: Sparkles,
    title: 'Natural Language AI Processing',
    description: 'Our conversational AI analyzes user inquiries in English or Romanized Nepali, extracting syllabus level, subjects, learning goals, and schedule preferences to recommend precise educator matches.',
  },
  {
    id: 'recommendations',
    icon: Target,
    title: 'Dynamic Pedagogical Filtering',
    description: 'Every recommendation cross-references the tutor’s proven track record with the specific board curriculum (CDC, NEB, CBSE, Cambridge), ensuring domain-level alignment with student goals.',
  },
  {
    id: 'search',
    icon: Search,
    title: 'Granular Multi-Criteria Querying',
    description: 'Query tutors using granular criteria: specific neighborhoods, hourly or monthly fee bands, years of teaching tenure, and availability windows across morning and evening slots.',
  },
  {
    id: 'profiles',
    icon: ClipboardCheck,
    title: 'Verified Digital Credentials',
    description: 'Every tutor profile includes an in-browser PDF viewer displaying certified resumes, academic transcripts, past institutional appointments, and verified subject competencies.',
  },
  {
    id: 'trust',
    icon: ShieldCheck,
    title: 'Multi-Layer Moderation Protocol',
    description: 'Tutor profiles undergo human administrative review before going live. All student reviews require verified email authentication to prevent spam and artificial reputation inflation.',
  },
  {
    id: 'local-online',
    icon: Globe,
    title: 'Hybrid Delivery Infrastructure',
    description: 'Whether you need an in-person tutor traveling to your home in Kathmandu or remote video tutoring reaching students across provincial regions, the platform supports both modalities seamlessly.',
  },
];
