import React, { useState } from "react";
import defaultAvatar from "../assets/default-avatar.png"; // Default Profile Picture

const ImageUploader = ({ onImageChange }) => {
  const [preview, setPreview] = useState(defaultAvatar);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader">
      <img src={preview} alt="Profile Preview" className="profile-img" />
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUploader;
