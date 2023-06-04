import React, { useState, useRef } from 'react';

const ImageArea = () => {
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
    <div>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Enter text"
          onClick={handleImageClick}
          readOnly
          style={{ cursor: 'pointer', width: '100%', padding: '10px' }}
        />
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Uploaded"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
      </div>

      {showPopup && (
        <div className="popup" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '5px' }}>
            <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%', marginBottom: '10px' }} />
            <p>{generatedText}</p>

            {generatedText && (
              <button onClick={handleGenerateCaptions}>Click here to generate Alternate captions</button>
            )}
            <div>
              {captions.map((caption, index) => (
                <p key={index}>{caption}</p>
              ))}
            </div>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageArea;
