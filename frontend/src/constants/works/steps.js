import { UserPlus, Search, CalendarCheck } from 'lucide-react';

export const STEPS = [
  {
    id: 'teacher-creates-profile',
    icon: UserPlus,
    title: 'Teacher Creates Profile',
    description: 'Teachers sign up and create detailed profiles with their qualifications, subjects, and available time schedules for teaching.',
  },
  {
    id: 'student-browsing',
    icon: Search,
    title: 'Student Browsing',
    description: 'Students browse through qualified teacher profiles, view their availability, and subjects to find the perfect tutor.',
  },
  {
    id: 'book-connect-directly',
    icon: CalendarCheck,
    title: 'Book & Connect Directly',
    description: 'Students contact the teacher directly via provided contact information and book tuition classes from available time slots.',
  },
];
