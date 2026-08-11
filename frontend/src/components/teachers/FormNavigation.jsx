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
  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-blue-200 w-full">
    {/* Previous button */}
    <div>
      {currentStep > 1 && (
        <button
          type="button"
          onClick={onPrev}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 sm:space-x-3 px-6 py-3 sm:px-8 sm:py-4 text-gray-700 border-2 border-blue-300 rounded-2xl hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 font-bold text-base sm:text-lg shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Previous</span>
        </button>
      )}
    </div>

    {/* Cancel + Next/Submit buttons */}
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 sm:space-x-3 px-6 py-3 sm:px-8 sm:py-4 text-gray-700 border-2 border-gray-400 rounded-2xl hover:bg-gray-50 hover:border-gray-500 transition-all duration-300 font-bold text-base sm:text-lg shadow-sm"
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
          className="w-full sm:w-auto flex items-center justify-center space-x-2 sm:space-x-3 px-6 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl sm:transform sm:hover:scale-105"
        >
          <span>Next Step</span>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting || isNavigating}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 sm:space-x-3 px-6 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl sm:transform sm:hover:scale-105"
        >
          <Save className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>{isSubmitting ? "Creating Profile..." : submitButtonText}</span>
        </button>
      )}
    </div>
  </div>
);

export default FormNavigation;
