import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";

const FormNavigation = ({
  currentStep,
  totalSteps,
  isSubmitting,
  isNavigating,
  submitButtonText,
  cancelButtonText,
  onPrev,
  onNext,
  onCancel,
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-brand-200 w-full">
    {/* Previous button */}
    <div>
      {currentStep > 1 && (
        <button
          type="button"
          onClick={onPrev}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 sm:space-x-3 px-6 py-3 sm:px-8 sm:py-4 text-gray-700 border-2 border-brand-300 rounded-2xl hover:bg-brand-50 hover:border-brand-400 transition-all duration-300 font-bold text-base sm:text-lg shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Previous</span>
        </button>
      )}
    </div>

    {/* Cancel + Next/Submit buttons */}
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 sm:space-x-3 px-6 py-3 sm:px-8 sm:py-4 text-gray-700 border-2 border-brand-300 rounded-2xl hover:bg-brand-50 hover:border-brand-400 transition-all duration-300 font-bold text-base sm:text-lg shadow-sm"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>{cancelButtonText}</span>
        </button>
      )}

      {currentStep < totalSteps ? (
        <button
          type="button"
          onClick={onNext}
          disabled={isNavigating}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 sm:space-x-3 px-6 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-2xl hover:from-brand-700 hover:to-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl sm:transform sm:hover:scale-105"
        >
          <span>Next Step</span>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting || isNavigating}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 sm:space-x-3 px-6 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-success-600 to-success-700 text-white rounded-2xl hover:from-success-700 hover:to-success-700 focus:outline-none focus:ring-4 focus:ring-success-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl sm:transform sm:hover:scale-105"
        >
          <Save className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>{isSubmitting ? "Creating Profile..." : submitButtonText}</span>
        </button>
      )}
    </div>
  </div>
);

export default FormNavigation;
