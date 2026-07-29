import { BookOpen, AlertCircle } from "lucide-react";

const BioSection = ({ data, errors, formErrors, register, onChange, bioLength }) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
    <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
      <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
      Bio &amp; Teaching Philosophy *
    </h3>
    <p className="text-gray-600 text-lg mb-6">
      Write a compelling bio that showcases your teaching style, experience,
      and what makes you a great teacher. Minimum 50 characters.
    </p>

    <div className="w-full">
      <textarea
        id="bio"
        {...(register
          ? register("bio", {
              required: "Bio is required",
              minLength: {
                value: 50,
                message: "Bio must be at least 50 characters long",
              },
              maxLength: {
                value: 1000,
                message: "Bio must be less than 1000 characters",
              },
            })
          : {
              value: data.bio || "",
              onChange: (e) => onChange?.("bio", e.target.value),
            })}
        className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 resize-none ${
          errors?.bio || formErrors?.bio
            ? "border-red-500 bg-red-50"
            : "border-blue-200 hover:border-blue-400"
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
        className={`mt-3 text-lg font-semibold ${
          bioLength < 50 ? "text-red-600" : "text-blue-600"
        }`}
      >
        {bioLength}/1000 characters
        {bioLength < 50 && ` (minimum ${50 - bioLength} more characters needed)`}
      </div>
    </div>
  </div>
);

export default BioSection;
