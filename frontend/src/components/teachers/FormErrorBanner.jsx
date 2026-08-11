import { AlertCircle } from "lucide-react";

const FormErrorBanner = ({ formErrors }) => {
  if (Object.keys(formErrors).length === 0) return null;

  return (
    <div className="mx-4 sm:mx-10 mt-6 sm:mt-8 p-4 sm:p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3 sm:space-x-4 shadow-sm">
      <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-red-800 text-base sm:text-lg">
          Please fix the following errors:
        </div>
        <ul className="mt-2 text-red-700 text-sm sm:text-base space-y-1">
          {Object.entries(formErrors).map(([key, error]) => (
            <li key={key} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              <span>
                {typeof error === "object"
                  ? JSON.stringify(error, null, 2)
                  : error}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormErrorBanner;
