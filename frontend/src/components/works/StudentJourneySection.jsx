import { GraduationCap } from 'lucide-react';
import JourneyStepCard from './JourneyStepCard';
import { STUDENT_JOURNEY } from '../../constants/works/studentJourney';

const StudentJourneySection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <GraduationCap className="w-4 h-4" />
          FOR STUDENTS
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-4">
          Find the Right Tutor in Simple Steps
        </h2>
        <p className="text-brand-700 max-w-2xl mx-auto">
          From sharing what you need to starting your first class — here's the complete journey.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {STUDENT_JOURNEY.map((step, index) => (
          <JourneyStepCard
            key={step.id}
            step={step}
            index={index}
            isLast={index === STUDENT_JOURNEY.length - 1}
            accent="brand"
          />
        ))}
      </div>
    </div>
  );
};

export default StudentJourneySection;
