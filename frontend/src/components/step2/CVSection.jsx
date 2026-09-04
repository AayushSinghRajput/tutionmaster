import FileUpload from "../teachers/FileUpload";

const CVSection = ({ cvFile, onCVUpload, onCVRemove }) => (
  <div className="bg-gradient-to-br from-brand-50 to-stone-100 rounded-2xl p-5 sm:p-8 border border-brand-200 w-full">
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <h3 className="font-serif font-bold text-gray-800 text-lg sm:text-xl">CV/Resume</h3>
      <span className="text-xs sm:text-sm font-medium text-gray-500 bg-white px-2.5 py-1 rounded-full border border-stone-200">
        Optional
      </span>
    </div>
    <FileUpload
      type="cv"
      onUploadComplete={onCVUpload}
      onRemove={onCVRemove}
      currentFile={cvFile}
    />
  </div>
);

export default CVSection;
