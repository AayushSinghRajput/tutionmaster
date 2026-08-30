import { ClipboardList, Sparkles, Users, CheckCircle2 } from 'lucide-react';

export const AI_MATCHING_FLOW = [
  {
    id: 'requirements',
    icon: ClipboardList,
    title: 'Your Requirements',
    description: 'Subject • Level • Location • Rate • Schedule',
  },
  {
    id: 'ai-analysis',
    icon: Sparkles,
    title: 'AI Analysis',
    description: 'Understands your requirements and identifies relevant tutor profiles.',
  },
  {
    id: 'suitable-tutors',
    icon: Users,
    title: 'Suitable Tutors',
    description: 'Find tutors whose profiles align with your needs.',
  },
  {
    id: 'explore-choose',
    icon: CheckCircle2,
    title: 'Explore & Choose',
    description: 'Review tutor information and choose the tutor that works best for you.',
  },
];
