import { Plus, GraduationCap } from "lucide-react";
import QualificationCard from "./QualificationCard";

const QualificationsSection = ({
  qualificationFields,
  errors,
  formErrors,
  register,
  data,
  onQualificationAdd,
  onQualificationRemove,
}) => (
  <div className="bg-gradient-to-br from-brand-50 to-stone-100 rounded-2xl p-5 sm:p-8 border border-brand-200 w-full">
    <h3 className="font-serif font-bold text-gray-800 text-lg sm:text-xl mb-4 sm:mb-6 flex items-center">
      <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-brand-600 mr-2 sm:mr-3" />
      Education &amp; Qualifications
    </h3>

    <div className="space-y-5 sm:space-y-6 w-full">
      {qualificationFields?.map((field, index) => (
        <QualificationCard
          key={field.id}
          field={field}
          index={index}
          totalCount={qualificationFields.length}
          errors={errors}
          formErrors={formErrors}
          register={register}
          data={data}
          onQualificationAdd={onQualificationAdd}
          onQualificationRemove={onQualificationRemove}
        />
      ))}

      <button
        type="button"
        onClick={onQualificationAdd}
        className="flex items-center space-x-3 sm:space-x-4 w-full px-5 py-4 sm:px-8 sm:py-6 border-2 border-dashed border-brand-400 rounded-2xl text-brand-600 hover:bg-brand-50 hover:border-brand-500 transition-all duration-300 bg-white"
      >
        <Plus className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
        <span className="font-bold text-base sm:text-lg">Add Another Qualification</span>
      </button>
    </div>
  </div>
);

export default QualificationsSection;
