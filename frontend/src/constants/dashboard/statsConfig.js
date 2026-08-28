import { Eye, Calendar, BookOpen, IndianRupee } from 'lucide-react';

export const STATS_CONFIG = [
  {
    id: 'views',
    icon: Eye,
    label: 'Profile Views',
    sublabel: 'Total views',
    getValue: (profile) => profile.profileViews || 0,
  },
  {
    id: 'availability',
    icon: Calendar,
    label: 'Availability',
    sublabel: 'Days per week',
    getValue: (profile) => profile.availability?.length || 0,
  },
  {
    id: 'subjects',
    icon: BookOpen,
    label: 'Subjects',
    sublabel: 'Subjects taught',
    getValue: (profile) => profile.preferredSubjects?.length || 0,
  },
  {
    id: 'rate',
    icon: IndianRupee,
    label: 'Hourly Rate',
    sublabel: 'Per hour',
    getValue: (profile) => `Rs ${profile.hourlyRate}`,
  },
];