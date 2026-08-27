import { BookOpen, AlertCircle } from "lucide-react";

const BioSection = ({ data, errors, formErrors, register, onChange, bioLength }) => (
  <div className="bg-gradient-to-br from-brand-50 to-stone-100 rounded-2xl p-5 sm:p-8 border border-brand-200 w-full">
    <h3 className="font-serif font-bold text-gray-800 text-lg sm:text-xl mb-4 sm:mb-6 flex items-center">
      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-brand-600 mr-2 sm:mr-3" />
      Bio &amp; Teaching Philosophy <span className="text-gray-400 font-normal text-sm">(Optional)</span>
    </h3>
    <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
      Write a compelling bio that showcases your teaching style, experience,
      and what makes you a great teacher. Minimum 20 characters if provided.
    </p>

    <div className="w-full">
      <textarea
        id="bio"
        {...(register
          ? register("bio", {
              validate: (value) => {
                if (!value || !value.trim()) return true;
                if (value.trim().length < 20) return "Bio must be at least 20 characters long";
                if (value.trim().length > 1000) return "Bio must be less than 1000 characters";
                return true;
              }
            })
          : {
              value: data.bio || "",
              onChange: (e) => onChange?.("bio", e.target.value),
            })}
        className={`w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all duration-300 resize-none ${
          errors?.bio || formErrors?.bio
            ? "border-red-500 bg-red-50"
            : "border-brand-200 hover:border-brand-400"
        }`}
        placeholder="Describe your teaching experience, methodology, and what students can expect from your lessons..."
        rows="8"
      />
      {(errors?.bio || formErrors?.bio) && (
        <p className="mt-3 text-red-600 flex items-center text-base">
          <AlertCircle className="w-5 h-5 mr-2" />
          {errors?.bio?.message || formErrors?.bio}
        </p>
      )}
      <div
        className={`mt-3 text-base sm:text-lg font-semibold ${
          bioLength > 0 && bioLength < 20 ? "text-red-600" : "text-success-600"
        }`}
      >
        {bioLength}/1000 characters
        {bioLength > 0 && bioLength < 20 && ` (minimum ${20 - bioLength} more characters needed)`}
      </div>
    </div>
  </div>
);

export default BioSection;
