import StepCard from './StepCard';
import { STEPS } from '../../constants/works/steps';

const StepsSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {STEPS.map((step, index) => (
          <StepCard key={step.id} step={step} index={index} isLast={index === STEPS.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default StepsSection;