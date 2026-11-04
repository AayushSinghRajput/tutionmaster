import { ClipboardList, Sparkles, Search, UserCheck, MessageCircle } from 'lucide-react';

export const STUDENT_JOURNEY = [
  {
    id: 'tell-us-what-you-need',
    icon: ClipboardList,
    title: '1. Specify Your Curriculum & Goals',
    description:
      "Select your exact academic level and syllabus—whether you need focused coaching for Grade 10 SEE compulsory mathematics, Grade 12 physics, IOE engineering entrance preparation, or primary foundational English. Define whether you prefer in-person home tutoring in your neighborhood or interactive virtual sessions.",
    tags: ['Syllabus', 'Grade Level', 'Location', 'Budget', 'Format'],
  },
  {
    id: 'ai-recommendations',
    icon: Sparkles,
    title: '2. Receive Intelligent Tutor Matches',
    description:
      'Our contextual AI engine parses your requirements against verified teacher profiles, analyzing subject mastery, board expertise (CDC, NEB, CBSE, Cambridge), location proximity, and hourly or monthly fee benchmarks to surface the most compatible educators.',
    quote: 'Targeted matchmaking eliminates hours of cold-calling unvetted tutor listings.',
  },
  {
    id: 'explore-profiles',
    icon: Search,
    title: '3. Inspect Credentials & Verifications',
    description:
      'Review complete academic backgrounds, university degrees, teaching tenure, and verified student ratings. Use our integrated PDF viewer to examine official resumes and certifications before making any commitment.',
    tags: ['Degrees', 'CV Viewer', 'Ratings', 'Rates', 'Badge'],
  },
  {
    id: 'choose-your-tutor',
    icon: UserCheck,
    title: '4. Select Your Preferred Educator',
    description:
      "Compare shortlisted teachers based on transparent data, schedule alignment, and past parent feedback. TuitionMaster puts you in full control of choosing the mentor who inspires your child's confidence.",
  },
  {
    id: 'connect-start-learning',
    icon: MessageCircle,
    title: '5. Connect Directly & Begin Lessons',
    description:
      'Reach out directly via phone or WhatsApp without third-party agency barriers. Agree on lesson schedules, clarify expectations, and kick off your tailored learning journey.',
  },
];
