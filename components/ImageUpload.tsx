import React, { useState, useRef } from 'react';
import { XIcon } from './icons/XIcon';
import { PlusCircleIcon } from './icons/PlusCircleIcon';

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  images, 
  onImagesChange, 
  maxImages = 5 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (images.length + imageFiles.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }

    const newImages = [...images, ...imageFiles];
    onImagesChange(newImages);
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700">
          Produce Images
        </label>
        <span className="text-xs text-slate-500">
          {images.length}/{maxImages} images
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Image previews */}
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(image)}
              alt={`Produce ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg border border-slate-200"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        {/* Upload button */}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={openFileDialog}
            className="w-full h-24 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-emerald-400 hover:text-emerald-500 transition-colors"
          >
            <PlusCircleIcon className="h-8 w-8 mb-1" />
            <span className="text-xs">Add Image</span>
          </button>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageSelect}
        className="hidden"
      />
      
      <p className="text-xs text-slate-500">
        Upload clear images of your produce. Supported formats: JPG, PNG, GIF. Max size: 5MB per image.
      </p>
    </div>
  );
};
