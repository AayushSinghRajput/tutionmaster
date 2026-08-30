
import { Link } from "react-router-dom";
import { Play, GraduationCap, Users, ArrowRight } from "lucide-react";
import { HOME_STUDENT_STEPS, HOME_TUTOR_STEPS } from "../../constants/works/homeSteps";

const StepColumn = ({ title, Icon, steps, accent }) => (
  <div className="bg-gradient-to-b from-white to-stone-50 rounded-2xl border border-stone-200 shadow-lg p-6 sm:p-8">
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent.iconBg}`}>
        <Icon className={`w-6 h-6 ${accent.iconText}`} />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-serif">{title}</h3>
    </div>

    <div className="space-y-0">
      {steps.map((step, index) => (
        <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
          {index !== steps.length - 1 && (
            <div className="absolute left-5 top-11 bottom-0 w-0.5 bg-stone-200" />
          )}
          <div
            className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow ${accent.numberBg}`}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="pt-1.5">
            <div className="flex items-center gap-2 mb-1">
              <step.icon className={`w-4 h-4 ${accent.iconText}`} />
              <h4 className="font-bold text-gray-900">{step.title}</h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HowItWorks = ({ howItWorksRef }) => {
  return (
    <section ref={howItWorksRef} className="py-12 sm:py-16 md:py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Play className="w-4 h-4" />
            GET STARTED
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-serif">
            How <span className="text-brand-600">TuitionMaster</span> Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're looking for the right tutor or ready to start teaching, TuitionMaster
            makes the process simple.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <StepColumn
            title="For Students"
            Icon={GraduationCap}
            steps={HOME_STUDENT_STEPS}
            accent={{
              iconBg: "bg-brand-100",
              iconText: "text-brand-600",
              numberBg: "bg-gradient-to-br from-brand-600 to-brand-700",
            }}
          />
          <StepColumn
            title="For Tutors"
            Icon={Users}
            steps={HOME_TUTOR_STEPS}
            accent={{
              iconBg: "bg-gold-100",
              iconText: "text-gold-700",
              numberBg: "bg-gradient-to-br from-gold-600 to-gold-700",
            }}
          />
        </div>

        {/* CTA below steps */}
        <div className="text-center mt-10 sm:mt-12">
          <p className="text-gray-700 font-medium mb-4">
            Want to learn more about how TuitionMaster works?
          </p>
          <Link
            to="/how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl hover:from-brand-700 hover:to-brand-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            Explore How It Works
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
