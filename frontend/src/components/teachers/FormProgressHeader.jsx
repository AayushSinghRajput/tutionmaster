import { GraduationCap, CheckCircle } from "lucide-react";

const FormProgressHeader = ({ isEdit, currentStep, steps }) => (
  <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-10 py-8">
    {/* Title row */}
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            {isEdit ? "Update Teacher Profile" : "Create Teacher Profile"}
          </h1>
          <p className="text-blue-100 text-lg mt-1">
            {isEdit
              ? "Update your teaching profile"
              : "Join our community of expert educators"}
          </p>
        </div>
      </div>
      <div className="bg-white bg-opacity-20 rounded-2xl px-6 py-3 backdrop-blur-sm">
        <span className="text-white font-bold text-lg">
          Step {currentStep} of {steps.length}
        </span>
      </div>
    </div>

    {/* Step indicators */}
    <div className="flex items-center justify-between relative">
      {steps.map((step, index) => {
        const IconComponent = step.icon;
        const isCompleted = currentStep > step.number;
        const isCurrent = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center flex-1 z-10">
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 transform ${
                  isCompleted
                    ? "bg-green-500 text-white shadow-lg scale-110"
                    : isCurrent
                      ? "bg-white text-blue-600 shadow-2xl scale-110 border-2 border-blue-200"
                      : "bg-white bg-opacity-20 text-white border-2 border-white border-opacity-30"
                }`}
              >
                <IconComponent size={24} />
              </div>
              <div className="mt-3">
                <div
                  className={`font-bold text-sm transition-colors duration-300 ${
                    isCompleted || isCurrent ? "text-white" : "text-blue-200"
                  }`}
                >
                  {step.title}
                </div>
                <div
                  className={`text-xs transition-colors duration-300 mt-1 ${
                    isCompleted || isCurrent ? "text-blue-100" : "text-blue-300"
                  }`}
                >
                  {step.description}
                </div>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 relative">
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    isCompleted ? "bg-green-400" : "bg-white bg-opacity-30"
                  }`}
                ></div>
                {isCompleted && (
                  <CheckCircle className="w-5 h-5 text-green-400 absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 rounded-full" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default FormProgressHeader;
