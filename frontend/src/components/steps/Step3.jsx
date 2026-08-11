import StepHeader from "../step3/StepHeader";
import TeachingInfoSection from "../step3/TeachingInfoSection";
import BioSection from "../step3/BioSection";

const Step3 = ({
  data,
  errors,
  formErrors,
  register,
  watch,
  onChange,
  TEACHING_MODES,
}) => {
  const bioValue = watch ? watch("bio") : data.bio;
  const bioLength = bioValue?.length || 0;

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      <StepHeader
        title="Teaching Details"
        subtitle="Describe your experience and teaching style"
      />

      <TeachingInfoSection
        data={data}
        errors={errors}
        formErrors={formErrors}
        register={register}
        onChange={onChange}
        TEACHING_MODES={TEACHING_MODES}
      />

      <BioSection
        data={data}
        errors={errors}
        formErrors={formErrors}
        register={register}
        onChange={onChange}
        bioLength={bioLength}
      />
    </div>
  );
};

export default Step3;