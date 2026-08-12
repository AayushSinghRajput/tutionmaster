import { GraduationCap, CheckCircle } from "lucide-react";

const FormProgressHeader = ({ isEdit, currentStep, steps }) => (
  <div className="bg-gradient-to-r from-brand-800 via-brand-700 to-brand-600 px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
    {/* Title row */}
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
      <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
        <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white bg-opacity-20 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
          <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-3xl font-serif font-bold text-white truncate">
            {isEdit ? "Update Teacher Profile" : "Create Teacher Profile"}
          </h1>
          <p className="hidden sm:block text-brand-100 text-lg mt-1">
            {isEdit
              ? "Update your teaching profile"
              : "Join our community of expert educators"}
          </p>
        </div>
      </div>
      <div className="bg-white bg-opacity-20 rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-6 sm:py-3 backdrop-blur-sm shrink-0">
        <span className="text-white font-bold text-xs sm:text-lg whitespace-nowrap">
          Step {currentStep} of {steps.length}
        </span>
      </div>
    </div>

    {/* Step indicators - tablet & desktop (icons + labels) */}
    <div className="hidden sm:flex items-center justify-between relative">
      {steps.map((step, index) => {
        const IconComponent = step.icon;
        const isCompleted = currentStep > step.number;
        const isCurrent = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center flex-1 z-10">
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center transition-all duration-500 transform ${
                  isCompleted
                    ? "bg-success-600 text-white shadow-lg scale-110"
                    : isCurrent
                      ? "bg-white text-brand-600 shadow-2xl scale-110 border-2 border-brand-200"
                      : "bg-white bg-opacity-20 text-white border-2 border-white border-opacity-30"
                }`}
              >
                <IconComponent size={20} className="sm:w-6 sm:h-6 lg:w-6 lg:h-6" />
              </div>
              <div className="mt-2 sm:mt-3 max-w-[72px] sm:max-w-[90px] lg:max-w-none">
                <div
                  className={`font-bold text-xs sm:text-sm transition-colors duration-300 ${
                    isCompleted || isCurrent ? "text-white" : "text-brand-200"
                  }`}
                >
                  {step.title}
                </div>
                <div
                  className={`hidden lg:block text-xs transition-colors duration-300 mt-1 ${
                    isCompleted || isCurrent ? "text-brand-100" : "text-brand-300"
                  }`}
                >
                  {step.description}
                </div>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 sm:mx-3 lg:mx-4 relative">
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    isCompleted ? "bg-success-500" : "bg-white bg-opacity-30"
                  }`}
                ></div>
                {isCompleted && (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success-500 absolute -top-1.5 sm:-top-2 left-1/2 transform -translate-x-1/2 bg-brand-700 rounded-full" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>

    {/* Step indicators - mobile (dots + current step label) */}
    <div className="sm:hidden">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ${
                  isCompleted
                    ? "bg-success-600 text-white"
                    : isCurrent
                      ? "bg-white text-brand-600 border-2 border-brand-200"
                      : "bg-white bg-opacity-20 text-white border border-white border-opacity-30"
                }`}
              >
                {isCompleted ? <CheckCircle className="w-4 h-4" /> : step.number}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-1 rounded-full transition-all duration-300 ${
                    isCompleted ? "bg-success-500" : "bg-white bg-opacity-30"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-center text-white font-semibold text-sm mt-3">
        {steps[currentStep - 1]?.title}
      </p>
    </div>
  </div>
);

export default FormProgressHeader;
