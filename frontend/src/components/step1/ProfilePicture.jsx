import { User } from "lucide-react";
import FileUpload from "../teachers/FileUpload";

const ProfilePicture = ({ avatarFile, onAvatarUpload, onAvatarRemove }) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
    <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
      <User className="w-6 h-6 text-blue-600 mr-3" />
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
