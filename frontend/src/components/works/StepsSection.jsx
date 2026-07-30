import StepCard from './StepCard';
import { STEPS } from '../../constants/works/steps';

const StepsSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {STEPS.map((step, index) => (
          <StepCard key={step.id} step={step} index={index} isLast={index === STEPS.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default StepsSection;