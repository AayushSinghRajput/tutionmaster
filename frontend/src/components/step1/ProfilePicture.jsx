import { useRef } from "react";
import { Upload, User } from "lucide-react";

const ProfilePicture = ({ avatarFile, onAvatarUpload, onAvatarRemove }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && onAvatarUpload) {
      onAvatarUpload({
        file,
        url: URL.createObjectURL(file),
        name: file.name,
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 w-full">
      <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
        <User className="w-6 h-6 text-blue-600 mr-3" />
        Profile Picture
      </h3>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {!avatarFile ? (
        <div
          onClick={handleClick}
          className="border-2 border-dashed border-blue-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Upload className="w-10 h-10 text-blue-600" />
            </div>
            <p className="text-gray-700 text-lg font-semibold mb-2">
              Click to upload profile picture
            </p>
            <p className="text-gray-500 text-sm">
              Recommended: Square image, at least 400x400 pixels
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Supports JPG, PNG, GIF (Max 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={avatarFile.url}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button
              type="button"
              onClick={handleClick}
              className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Upload className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-6 flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white px-4 py-3 rounded-xl border border-blue-200">
              <div className="text-left">
                <p className="text-gray-700 font-medium">
                  {avatarFile.name || "profile.jpg"}
                </p>
                <p className="text-gray-500 text-sm">Click camera icon to change</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onAvatarRemove}
              className="flex items-center space-x-2 px-4 py-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-colors duration-200 border border-red-200"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
