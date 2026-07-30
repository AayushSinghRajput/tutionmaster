import { User, GraduationCap, BookOpen, Clock } from "lucide-react";

const STEPS = [
  {
    number: 1,
    title: "Basic Info",
    description: "Personal details",
    icon: User,
  },
  {
    number: 2,
    title: "Qualifications",
    description: "Education & subjects",
    icon: GraduationCap,
  },
  {
    number: 3,
    title: "Teaching Details",
    description: "Experience & bio",
    icon: BookOpen,
  },
  {
    number: 4,
    title: "Availability",
    description: "Schedule setup",
    icon: Clock,
  },
];

export default STEPS;
