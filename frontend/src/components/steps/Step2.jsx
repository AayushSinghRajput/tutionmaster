import StepHeader from "../step2/StepHeader";
import QualificationsSection from "../step2/QualificationsSection";
import CVSection from "../step2/CVSection";
import SubjectsSection from "../step2/SubjectsSection";

const Step2 = ({
  data,
  errors,
  formErrors,
  qualificationFields,
  cvFile,
  onCVUpload,
  onCVRemove,
  onQualificationAdd,
  onQualificationRemove,
  register,
  onChange,
}) => {
  return (
    <div className="space-y-8 w-full">
      <StepHeader />

      <QualificationsSection
        qualificationFields={qualificationFields}
        errors={errors}
        formErrors={formErrors}
        register={register}
        data={data}
        onQualificationAdd={onQualificationAdd}
        onQualificationRemove={onQualificationRemove}
      />

      <CVSection
        cvFile={cvFile}
        onCVUpload={onCVUpload}
        onCVRemove={onCVRemove}
      />

      <SubjectsSection
        errors={errors}
        formErrors={formErrors}
        value={data.preferredSubjects || []}
        onChange={onChange}
      />
    </div>
  );
};

export default Step2;
