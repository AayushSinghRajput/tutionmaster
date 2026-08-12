import { User } from "lucide-react";
import FileUpload from "../teachers/FileUpload";

const ProfilePicture = ({ avatarFile, onAvatarUpload, onAvatarRemove }) => (
  <div className="bg-gradient-to-br from-brand-50 to-stone-100 rounded-2xl p-5 sm:p-8 border border-brand-200 w-full">
    <h3 className="font-serif font-bold text-gray-800 text-lg sm:text-xl mb-4 sm:mb-6 flex items-center">
      <User className="w-5 h-5 sm:w-6 sm:h-6 text-brand-600 mr-2 sm:mr-3" />
      Profile Picture
    </h3>

    <FileUpload
      type="avatar"
      onUploadComplete={onAvatarUpload}
      onRemove={onAvatarRemove}
      currentFile={avatarFile}
    />
  </div>
);

export default ProfilePicture;
