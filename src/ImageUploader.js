import React, { useState, useRef } from 'react';
import Popup from './popup';
import './index.css';

const ImageUploader = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedText, setGeneratedText] = useState('');
  const [captions, setCaptions] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setShowPopup(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/model1', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedText(data);
      } else {
        throw new Error('Image to text conversion failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateCaptions = async () => {
    try {
      const formData = new FormData();
      formData.append('file', fileInputRef.current.files[0]);

      const response2 = await fetch('http://127.0.0.1:8000/model2', {
        method: 'POST',
        body: formData,
      });
      if (!response2.ok) {
        throw new Error('Failed to fetch captions from model2');
      }
      const data2 = await response2.json();
      console.log('Model2 Response:', data2);

      const response3 = await fetch('http://127.0.0.1:8000/model3', {
        method: 'POST',
        body: formData,
      });
      if (!response3.ok) {
        throw new Error('Failed to fetch captions from model3');
      }
      const data3 = await response3.json();
      console.log('Model3 Response:', data3);

      // Update the captions state
      setCaptions([data2, data3]);
    } catch (error) {
      console.error(error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedImage(null);
    setGeneratedText('');
    setCaptions([]);
  };

  return (
    <div className="image-uploader-container">
      <button onClick={handleImageClick} class="upload-image-button" >
        Upload Image
      </button>

      <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} style={{ display: 'none' }} />

      {showPopup && (
        <Popup
          selectedImage={selectedImage}
          generatedText={generatedText}
          captions={captions}
          handleGenerateCaptions={handleGenerateCaptions}
          closePopup={closePopup}
        />
      )}
    </div>
  );
};

export default ImageUploader;
