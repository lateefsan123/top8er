import React from 'react';
import { PlayerCardProps } from '../types';
import { squareCardImages } from '../utils/CharacterImages';

const PlayerCard: React.FC<PlayerCardProps> = ({ 
  placement, 
  entrant, 
  character = '', 
  secondaryCharacters,
  position, 
  flagSrc,
  showFlags = true
}) => {
  const formatPlayerName = (fullName: string = ''): string => {
    if (!fullName.includes('|')) return fullName.trim();
    const [org, player] = fullName.split('|').map((s) => s.trim());
    const orgWords = org.split(/\s+/);
    const orgFormatted =
      orgWords.length > 1 ? orgWords.map((word) => word[0].toUpperCase()).join('') : org;
    return `${orgFormatted} | ${player}`;
  };

  const getNameStyle = (name: string = '', placementIndex: number = 0): React.CSSProperties => {
    const formatted = formatPlayerName(name);
    const length = formatted.length;

    let baseSize: string;
    if (placementIndex === 0) {
      baseSize = 'clamp(1.5rem, 4vw, 3.5rem)';
    } else if (placementIndex < 4) {
      baseSize = 'clamp(1rem, 2.5vw, 2rem)';
    } else {
      baseSize = 'clamp(0.8rem, 2vw, 1.6rem)';
    }

    // Adjust for longer names
    if (length > 26) {
      return { fontSize: `clamp(0.9rem, 2vw, ${parseFloat(baseSize.match(/[\d.]+/)?.[0] || '1.5') - 0.6}rem)` };
    }
    if (length > 20) {
      return { fontSize: `clamp(1.1rem, 2.2vw, ${parseFloat(baseSize.match(/[\d.]+/)?.[0] || '1.5') - 0.4}rem)` };
    }
    if (length > 13) {
      return { fontSize: `clamp(1.3rem, 2.3vw, ${parseFloat(baseSize.match(/[\d.]+/)?.[0] || '1.5') - 0.2}rem)` };
    }
    return { fontSize: baseSize };
  };

  const placementIndex = placement - 1;

  return (
    <div className={`player ${position}`}>
      <div className="top">
        <div className={`imageholder ${character}`}></div>
                          {secondaryCharacters && secondaryCharacters.length > 0 && (
           <div className="secondary-characters">
             {secondaryCharacters.map((character, index) => (
               <img 
                 key={index}
                 src={squareCardImages[character] || `/SquareCard_V2_TRANSPARENT/${character}.png`} 
                 alt={character}
                                   style={{
                    width: placement === 1 ? '45px' : placement <= 4 ? '40px' : '35px',
                    height: placement === 1 ? '45px' : placement <= 4 ? '40px' : '35px',
                    position: 'absolute',
                    top: showFlags ? (placement === 1 ? '95px' : '65px') : (placement === 1 ? '35px' : '15px'),
                    right: '15px',
                    zIndex: 5,
                    borderRadius: '50%',
                    border: '3px solid rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.4)',
                    objectFit: 'cover',
                    transform: `translateY(${index * 55}px)`
                  }}
               />
             ))}
           </div>
         )}
        <span className="number">{placement}</span>
        {showFlags && <img className="flag" src={flagSrc} alt="Flag" />}
        <span className="name" style={getNameStyle(entrant.name, placementIndex)}>
          {formatPlayerName(entrant.name) || `Player ${placement}`}
        </span>
      </div>
    </div>
  );
};

export default PlayerCard; 