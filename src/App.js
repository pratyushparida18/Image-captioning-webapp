import React from 'react';
import ImageUploader from './ImageUploader';
import './index.css';

const App = () => {
  return (
    <div id="main">
      <h1>Select your Image to generate caption</h1>
      <ImageUploader/>
    </div>
  );
};

export default App;
