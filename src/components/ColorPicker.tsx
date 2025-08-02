import React from 'react';

interface ColorPickerProps {
  cornerColor1: string;
  cornerColor2: string;
  onColor1Change: (color: string) => void;
  onColor2Change: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  cornerColor1,
  cornerColor2,
  onColor1Change,
  onColor2Change
}) => {
  return (
    <div className="color-picker" style={{ 
      marginBottom: '1rem', 
      padding: '1rem', 
      backgroundColor: 'rgba(0,0,0,0.8)', 
      borderRadius: '8px',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    }}>
      <div>
        <label style={{ color: 'white', marginRight: '0.5rem' }}>Primary Color:</label>
        <input
          type="color"
          value={cornerColor1}
          onChange={(e) => onColor1Change(e.target.value)}
          style={{ width: '50px', height: '30px', border: 'none', borderRadius: '4px' }}
        />
      </div>
      <div>
        <label style={{ color: 'white', marginRight: '0.5rem' }}>Secondary Color:</label>
        <input
          type="color"
          value={cornerColor2}
          onChange={(e) => onColor2Change(e.target.value)}
          style={{ width: '50px', height: '30px', border: 'none', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
};

export default ColorPicker; 