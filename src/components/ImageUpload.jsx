import React, { useRef } from 'react';

function ImageUpload({ onImageUpload, disabled }) {
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      try {
        const base64String = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        onImageUpload(base64String);
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Error reading file');
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        disabled={disabled}
      />
      <button 
        onClick={() => fileInputRef.current.click()}
        disabled={disabled}
        className="btn btn-primary"
      >
        Upload Image
      </button>
    </div>
  );
}

export default ImageUpload;
