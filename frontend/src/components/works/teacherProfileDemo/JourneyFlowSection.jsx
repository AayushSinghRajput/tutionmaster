import { LogIn, LayoutDashboard, UserPlus, ClipboardList, CheckCircle2, ChevronRight } from 'lucide-react';

const FLOW_STEPS = [
  { icon: LogIn,           label: 'Login / Sign Up' },
  { icon: LayoutDashboard, label: 'Dashboard'        },
  { icon: UserPlus,        label: 'Create Profile'   },
  { icon: ClipboardList,   label: '4-Step Journey'   },
  { icon: CheckCircle2,    label: 'Profile Ready'    },
];

const JourneyFlowSection = () => {
  return (
    <div className="bg-white border-b border-stone-200 py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-0">
          {FLOW_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === FLOW_STEPS.length - 1;
            return (
              <div key={index} className="flex items-center">
                <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 rounded-xl bg-brand-50 border border-brand-100">
                  <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-brand-800 whitespace-nowrap">
                    {step.label}
                  </span>
                </div>
                {!isLast && (
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-brand-300 mx-1 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyFlowSection;
