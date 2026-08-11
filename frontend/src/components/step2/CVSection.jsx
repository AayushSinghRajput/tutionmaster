import FileUpload from "../teachers/FileUpload";

const CVSection = ({ cvFile, onCVUpload, onCVRemove }) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 sm:p-8 border border-blue-200 w-full">
    <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-4 sm:mb-6">CV/Resume</h3>
    <FileUpload
      type="cv"
      onUploadComplete={onCVUpload}
      onRemove={onCVRemove}
      currentFile={cvFile}
    />
  </div>
);

export default CVSection;
