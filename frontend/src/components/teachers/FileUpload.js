import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { uploadService } from '../../services/teacherService';
import { toast } from 'react-toastify';
import { validateFile } from '../../utils/helpers';

const FileUpload = ({ 
  type = 'avatar', 
  onUploadComplete, 
  currentFile = null,
  onRemove,
  label = null
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const isImage = type === 'avatar';
  const allowedTypes = isImage 
    ? ['image/jpeg', 'image/png', 'image/webp']
    : ['application/pdf'];
  const maxSize = isImage ? 5 * 1024 * 1024 : 10 * 1024 * 1024;

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validationError = validateFile(file, maxSize, allowedTypes);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    // Create preview
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(file.name);
    }

    uploadFile(file);
  };

  const uploadFile = async (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const uploadFunction = isImage ? uploadService.uploadAvatar : uploadService.uploadCV;
      const response = await uploadFunction(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        onUploadComplete(response.data.data);
        toast.success(
          <div className="flex items-center space-x-2">
            <CheckCircle size={18} className="text-green-500" />
            <span>{isImage ? 'Profile image' : 'CV document'} uploaded successfully!</span>
          </div>
        );
      }, 500);
      
    } catch (error) {
      clearInterval(progressInterval);
      toast.error(
        <div className="flex items-center space-x-2">
          <AlertCircle size={18} className="text-red-500" />
          <span>Failed to upload {isImage ? 'profile image' : 'CV document'}</span>
        </div>
      );
      setPreview(null);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 1000);
    }
  };

  const handleRemove = async () => {
    if (currentFile?.publicId) {
      try {
        await uploadService.deleteFile(currentFile.publicId, isImage ? 'image' : 'raw');
        toast.success(
          <div className="flex items-center space-x-2">
            <CheckCircle size={18} className="text-green-500" />
            <span>File removed successfully!</span>
          </div>
        );
      } catch (error) {
        toast.error(
          <div className="flex items-center space-x-2">
            <AlertCircle size={18} className="text-red-500" />
            <span>Failed to remove file</span>
          </div>
        );
      }
    }
    setPreview(null);
    onRemove();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const validationError = validateFile(file, maxSize, allowedTypes);
      if (validationError) {
        toast.error(validationError);
        return;
      }
      handleFileSelect({ target: { files: [file] } });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const getFileIcon = () => {
    if (isImage) {
      return <Image size={32} className="text-blue-500" />;
    }
    return <FileText size={32} className="text-blue-500" />;
  };

  return (
    <div className="w-full space-y-3">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={isImage ? '.jpg,.jpeg,.png,.webp' : '.pdf'}
        className="hidden"
      />
      
      {(preview || currentFile) ? (
        <div className="text-center">
          {isImage ? (
            <div className="relative inline-block">
              <div className="relative group">
                <img 
                  src={preview || (currentFile?.url)} 
                  alt="Preview" 
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:shadow-xl"
                />
                <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-20 rounded-2xl transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Upload size={24} className="text-white" />
                  </div>
                </div>
              </div>
              
              {/* Remove Button */}
              <button 
                type="button" 
                onClick={handleRemove}
                className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-110"
                disabled={isUploading}
              >
                <X size={14} />
              </button>

              {/* Upload Progress */}
              {isUploading && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-3 py-1">
                  <div className="flex items-center space-x-2">
                    <Loader size={12} className="text-blue-500 animate-spin" />
                    <span className="text-xs font-semibold text-blue-600">{uploadProgress}%</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 max-w-md mx-auto shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <FileText size={24} className="text-blue-500" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <span className="block text-gray-900 font-semibold truncate text-sm">
                    {preview || 'CV Document'}
                  </span>
                  <span className="block text-blue-600 text-xs font-medium mt-1">
                    PDF Document
                  </span>
                </div>
              </div>
              
              {/* Remove Button */}
              <button 
                type="button" 
                onClick={handleRemove}
                className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-110"
                disabled={isUploading}
              >
                <X size={14} />
              </button>

              {/* Upload Progress */}
              {isUploading && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-3 py-1">
                  <div className="flex items-center space-x-2">
                    <Loader size={12} className="text-blue-500 animate-spin" />
                    <span className="text-xs font-semibold text-blue-600">{uploadProgress}%</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div 
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragOver 
              ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 shadow-inner' 
              : 'border-blue-200 bg-gradient-to-br from-white to-blue-50 hover:border-blue-300 hover:shadow-md'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-4">
            {/* Icon Container */}
            <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isDragOver 
                ? 'bg-blue-500 shadow-lg' 
                : 'bg-blue-100 shadow-sm'
            }`}>
              {React.cloneElement(getFileIcon(), {
                size: 24,
                className: isDragOver ? 'text-white' : 'text-blue-500'
              })}
            </div>

            {/* Text Content */}
            <div className="space-y-2">
              <p className={`font-semibold transition-colors duration-300 ${
                isDragOver ? 'text-blue-700' : 'text-gray-800'
              }`}>
                {isDragOver ? 'Drop file to upload' : `Click to upload ${isImage ? 'profile image' : 'CV document'}`}
              </p>
              <p className="text-gray-600 text-sm">
                {isImage 
                  ? 'JPG, PNG, WebP • Max 5MB' 
                  : 'PDF Document • Max 10MB'
                }
              </p>
            </div>

            {/* Upload Icon */}
            <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
              isDragOver 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-500 hover:bg-blue-200'
            }`}>
              <Upload size={16} />
            </div>

            {/* Helper Text */}
            <p className="text-blue-400 text-xs font-medium">
              or drag and drop file here
            </p>
          </div>
        </div>
      )}

      {/* Upload Progress Bar */}
      {isUploading && (
        <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;