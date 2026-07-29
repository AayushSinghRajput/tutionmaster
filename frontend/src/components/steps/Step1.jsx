// Components
import Header from "../step1/Header";
import ProfilePicture from "../step1/ProfilePicture";
import BasicInformation from "../step1/BasicInformation";
import ContactInformation from "../step1/ContactInformation";
import AddressInformation from "../step1/AddressInformation";

const Step1 = ({
  data,
  errors,
  formErrors,
  onChange,
  onAvatarUpload,
  onAvatarRemove,
  onStateChange,
  onCityChange,
  avatarFile,
  selectedState,
  register,
  watch,
  NEPAL_STATES,
}) => {
  const stateValue = watch ? watch("address.state") : data.address?.state;

  return (
    <div className="space-y-8 w-full">
      {/* Header Section */}
      <Header />

      {/* Profile Picture Section */}
      <ProfilePicture
        avatarFile={avatarFile}
        onAvatarUpload={onAvatarUpload}
        onAvatarRemove={onAvatarRemove}
      />

      {/* Basic Information */}
      <BasicInformation
        data={data}
        errors={errors}
        formErrors={formErrors}
        onChange={onChange}
        register={register}
      />

      {/* Contact Information */}
      <ContactInformation
        data={data}
        errors={errors}
        formErrors={formErrors}
        onChange={onChange}
        register={register}
      />

      {/* Address Information */}
      <AddressInformation
        data={data}
        errors={errors}
        formErrors={formErrors}
        onChange={onChange}
        onStateChange={onStateChange}
        onCityChange={onCityChange}
        selectedState={selectedState}
        stateValue={stateValue}
        register={register}
        NEPAL_STATES={NEPAL_STATES}
      />
    </div>
  );
};

export default Step1;
