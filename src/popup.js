import React from 'react';

const Popup = ({ selectedImage, generatedText, captions, handleGenerateCaptions, closePopup }) => {
  return (
    <div className="popup" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={selectedImage} alt="Uploaded" style={{ width: '100%', maxWidth: '400px', marginBottom: '10px' }} />
      {generatedText && <p className="green-box">{generatedText}</p>}

      {generatedText && <button onClick={handleGenerateCaptions} class = "alternate-caption-button">Click here to generate Alternate captions</button>}
      <div>
      <div className="captions-container">
  {captions.map((caption, index) => (
    <p key={index} className="green-box">{caption}</p>
  ))}
</div>
      </div>
      <button onClick={closePopup} class="close-button">Close</button>
    </div>
  );
};

export default Popup;
