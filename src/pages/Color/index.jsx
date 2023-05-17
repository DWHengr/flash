import "./index.css";
import React, { useState } from 'react';
import { ChromePicker  } from 'react-color';

export default function Color() {
  const [color, setColor] = useState('#ffffff'); 

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor.hex);
  };

  return (
    <div>
      <ChromePicker  color={color} onChange={handleColorChange} />
      {/* <div style={{ backgroundColor: color, width: '200px', height: '200px' }}></div> */}
    </div>
  );
}
