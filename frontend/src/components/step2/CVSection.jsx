import FileUpload from "../teachers/FileUpload";

const CVSection = ({ cvFile, onCVUpload, onCVRemove }) => (
  <div className="bg-gradient-to-br from-brand-50 to-stone-100 rounded-2xl p-5 sm:p-8 border border-brand-200 w-full">
    <h3 className="font-serif font-bold text-gray-800 text-lg sm:text-xl mb-4 sm:mb-6">CV/Resume *</h3>
    <FileUpload
      type="cv"
      onUploadComplete={onCVUpload}
      onRemove={onCVRemove}
      currentFile={cvFile}
    />
  </div>
);

export default CVSection;
