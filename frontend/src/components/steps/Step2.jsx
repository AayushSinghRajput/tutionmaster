import { Plus, Trash2, GraduationCap, AlertCircle } from "lucide-react";
import FileUpload from "../teachers/FileUpload";

const Step2 = ({
  data,
  errors,
  formErrors,
  qualificationFields,
  watchSubjects,
  cvFile,
  onCVUpload,
  onCVRemove,
  onSubjectToggle,
  onQualificationAdd,
  onQualificationRemove,
  register,
  SUBJECTS,
}) => {
  return (
    <div className="space-y-8 w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Qualifications & Subjects
        </h2>
        <p className="text-gray-600 text-lg mt-3">
          Showcase your education and what you teach
        </p>
      </div>

      {/* Education & Qualifications */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
        <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
          <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
          Education & Qualifications
        </h3>
        <div className="space-y-6 w-full">
          {qualificationFields?.map((field, index) => (
            <div
              key={field.id}
              className="bg-white p-8 border-2 border-blue-200 rounded-2xl hover:border-blue-400 transition-all duration-300 shadow-sm w-full"
            >
              <div className="flex justify-between items-center mb-6 w-full">
                <span className="font-bold text-gray-800 text-lg">
                  Qualification #{index + 1}
                </span>
                {qualificationFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onQualificationRemove(index)}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200 border border-red-200"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="font-semibold">Remove</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 w-full">
                <div className="w-full">
                  <label
                    htmlFor={`degree-${index}`}
                    className="block text-lg font-bold text-gray-800 mb-3"
                  >
                    Degree/Certificate *
                  </label>
                  <input
                    type="text"
                    id={`degree-${index}`}
                    {...(register
                      ? register(`qualifications.${index}.degree`, {
                          required: "Degree is required",
                        })
                      : {
                          value: data.qualifications?.[index]?.degree || "",
                          onChange: (e) =>
                            onQualificationAdd?.(
                              index,
                              "degree",
                              e.target.value,
                            ),
                        })}
                    className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                      errors?.qualifications?.[index]?.degree ||
                      formErrors?.qualifications?.[index]?.degree
                        ? "border-red-500 bg-red-50"
                        : "border-blue-200 hover:border-blue-400"
                    }`}
                    placeholder="e.g., Bachelor of Science in Mathematics"
                  />
                  {(errors?.qualifications?.[index]?.degree ||
                    formErrors?.qualifications?.[index]?.degree) && (
                    <p className="mt-3 text-red-600 flex items-center text-base">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors?.qualifications?.[index]?.degree?.message ||
                        formErrors?.qualifications?.[index]?.degree}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor={`institution-${index}`}
                    className="block text-lg font-bold text-gray-800 mb-3"
                  >
                    Institution *
                  </label>
                  <input
                    type="text"
                    id={`institution-${index}`}
                    {...(register
                      ? register(`qualifications.${index}.institution`, {
                          required: "Institution is required",
                        })
                      : {
                          value:
                            data.qualifications?.[index]?.institution || "",
                          onChange: (e) =>
                            onQualificationAdd?.(
                              index,
                              "institution",
                              e.target.value,
                            ),
                        })}
                    className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                      errors?.qualifications?.[index]?.institution ||
                      formErrors?.qualifications?.[index]?.institution
                        ? "border-red-500 bg-red-50"
                        : "border-blue-200 hover:border-blue-400"
                    }`}
                    placeholder="e.g., Tribhuvan University"
                  />
                  {(errors?.qualifications?.[index]?.institution ||
                    formErrors?.qualifications?.[index]?.institution) && (
                    <p className="mt-3 text-red-600 flex items-center text-base">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors?.qualifications?.[index]?.institution?.message ||
                        formErrors?.qualifications?.[index]?.institution}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor={`year-${index}`}
                    className="block text-lg font-bold text-gray-800 mb-3"
                  >
                    Year Completed *
                  </label>
                  <input
                    type="number"
                    id={`year-${index}`}
                    {...(register
                      ? register(`qualifications.${index}.year`, {
                          required: "Year is required",
                        })
                      : {
                          value:
                            data.qualifications?.[index]?.year ||
                            new Date().getFullYear(),
                          onChange: (e) =>
                            onQualificationAdd?.(
                              index,
                              "year",
                              e.target.value,
                            ),
                        })}
                    className={`w-full px-5 py-4 text-lg border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 ${
                      errors?.qualifications?.[index]?.year ||
                      formErrors?.qualifications?.[index]?.year
                        ? "border-red-500 bg-red-50"
                        : "border-blue-200 hover:border-blue-400"
                    }`}
                    placeholder="2020"
                  />
                  {(errors?.qualifications?.[index]?.year ||
                    formErrors?.qualifications?.[index]?.year) && (
                    <p className="mt-3 text-red-600 flex items-center text-base">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors?.qualifications?.[index]?.year?.message ||
                        formErrors?.qualifications?.[index]?.year}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={onQualificationAdd}
            className="flex items-center space-x-4 w-full px-8 py-6 border-2 border-dashed border-blue-400 rounded-2xl text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all duration-300 bg-white"
          >
            <Plus className="w-6 h-6" />
            <span className="font-bold text-lg">Add Another Qualification</span>
          </button>
        </div>
      </div>

      {/* CV/Resume */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
        <h3 className="font-bold text-gray-800 text-xl mb-6">CV/Resume</h3>
        <FileUpload
          type="cv"
          onUploadComplete={onCVUpload}
          onRemove={onCVRemove}
          currentFile={cvFile}
        />
      </div>

      {/* Subjects */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
        <h3 className="font-bold text-gray-800 text-xl mb-6">
          Subjects You Teach *
        </h3>
        <p className="text-gray-600 text-lg mb-6">
          Select all subjects you're qualified to teach
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {SUBJECTS?.map((subject) => (
            <label
              key={subject}
              className="flex items-center space-x-4 p-4 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 cursor-pointer transition-all duration-300 shadow-sm w-full"
            >
              <input
                type="checkbox"
                value={subject}
                checked={watchSubjects?.includes(subject) || false}
                onChange={() => onSubjectToggle?.(subject)}
                className="w-6 h-6 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:ring-offset-2 flex-shrink-0"
              />
              <span className="text-gray-700 font-semibold text-lg break-words flex-1 min-w-0">
                {subject}
              </span>
            </label>
          ))}
        </div>
        {(errors?.preferredSubjects || formErrors?.preferredSubjects) && (
          <p className="mt-4 text-red-600 flex items-center text-base">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors?.preferredSubjects?.message ||
              formErrors?.preferredSubjects}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step2;
