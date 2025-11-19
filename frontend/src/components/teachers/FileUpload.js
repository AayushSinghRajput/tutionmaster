import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image } from 'lucide-react';
import { uploadService } from '../../services/teacherService';
import { toast } from 'react-toastify';
import { validateFile } from '../../utils/helpers';

const FileUpload = ({ 
  type = 'avatar', 
  onUploadComplete, 
  currentFile = null,
  onRemove 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
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
    try {
      const uploadFunction = isImage ? uploadService.uploadAvatar : uploadService.uploadCV;
      const response = await uploadFunction(file);
      
      onUploadComplete(response.data.data);
      toast.success(`${isImage ? 'Avatar' : 'CV'} uploaded successfully!`);
    } catch (error) {
      toast.error(`Failed to upload ${isImage ? 'avatar' : 'CV'}`);
      setPreview(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = async () => {
    if (currentFile?.publicId) {
      try {
        await uploadService.deleteFile(currentFile.publicId, isImage ? 'image' : 'raw');
        toast.success('File removed successfully!');
      } catch (error) {
        toast.error('Failed to remove file');
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

  return (
    <div className="w-full">
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
              <img 
                src={preview || (currentFile?.url)} 
                alt="Preview" 
                className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"
              />
              <button 
                type="button" 
                onClick={handleRemove}
                className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50"
                disabled={isUploading}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="relative bg-gray-50 rounded-lg p-6 border-2 border-gray-200 max-w-md mx-auto">
              <FileText size={32} className="mx-auto text-gray-400 mb-2" />
              <span className="block text-gray-900 font-medium truncate">
                {preview || 'CV Document'}
              </span>
              <button 
                type="button" 
                onClick={handleRemove}
                className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50"
                disabled={isUploading}
              >
                <X size={16} />
              </button>
            </div>
          )}
          {isUploading && (
            <div className="mt-2 text-blue-600 text-sm font-medium">Uploading...</div>
          )}
        </div>
      ) : (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
            isDragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-4">
            {isImage ? (
              <Image size={48} className="mx-auto text-gray-400" />
            ) : (
              <FileText size={48} className="mx-auto text-gray-400" />
            )}
            <div>
              <p className="text-gray-900 font-medium">
                {isImage ? 'Click to upload avatar' : 'Click to upload CV'}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {isImage 
                  ? 'JPG, PNG, WebP (max 5MB)' 
                  : 'PDF (max 10MB)'
                }
              </p>
            </div>
            <Upload size={24} className="mx-auto text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;