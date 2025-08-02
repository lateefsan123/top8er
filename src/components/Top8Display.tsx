import React from 'react';
import { Top8DisplayProps } from '../types';
import PlayerCard from './PlayerCard';

const Top8Display: React.FC<Top8DisplayProps> = ({ 
  top8, 
  tournamentName, 
  entrantCount, 
  cornerColor1, 
  cornerColor2,
  cornerDesign = 'gradient',
  useDualColors = true,
  showFlags = true,
  backgroundImage = '/images/drop-your-favorite-wallpaper-panel-to-turn-into-a-wallpaper-v0-so4c7wbrib0f1.png',
  logoImage = '/images/ceo.png'
}) => {
  const flagImages = [
    '/images/Flag_of_Japan.svg.png',
    '/images/Flag_of_Brazil.svg.png',
    '/images/Flag_of_Turkey.svg.png',
    '/images/Flag_of_Mexico.svg.png',
    '/images/Flag_of_Albania.svg.png',
    '/images/Flag_of_Barbados.svg.png',
    '/images/canada.png',
    '/images/Flag_of_Japan.svg.png'
  ];

  const positions: Array<'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight'> = [
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'
  ];

  return (
    <div className="top8er" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <style>
        {`
          ${cornerDesign === 'gradient' ? `
            .top8er .corner-top-left {
              border-color: transparent transparent ${cornerColor1} transparent !important;
              filter: drop-shadow(0 0 15px ${cornerColor1}80) drop-shadow(0 0 25px ${cornerColor1}40) !important;
            }
                         .top8er .corner-bottom-right {
               border-color: ${useDualColors ? cornerColor2 : cornerColor1} transparent transparent transparent !important;
               filter: drop-shadow(0 0 15px ${useDualColors ? cornerColor2 : cornerColor1}80) drop-shadow(0 0 25px ${useDualColors ? cornerColor2 : cornerColor1}40) !important;
             }
            .top8er .corner-top-left::after {
              border-color: transparent transparent ${useDualColors ? cornerColor2 : cornerColor1} transparent !important;
              filter: drop-shadow(0 0 12px ${useDualColors ? cornerColor2 : cornerColor1}80) drop-shadow(0 0 20px ${useDualColors ? cornerColor2 : cornerColor1}40) !important;
            }
            .top8er .corner-bottom-right::after {
              border-color: ${useDualColors ? cornerColor2 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 12px ${useDualColors ? cornerColor2 : cornerColor1}80) drop-shadow(0 0 20px ${useDualColors ? cornerColor2 : cornerColor1}40) !important;
            }
          ` : cornerDesign === 'solid' ? `
            .top8er .corner-top-left {
              border-color: transparent transparent ${cornerColor1} transparent !important;
              filter: drop-shadow(0 0 10px ${cornerColor1}60) !important;
            }
            .top8er .corner-bottom-right {
              border-color: ${useDualColors ? cornerColor2 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 10px ${useDualColors ? cornerColor2 : cornerColor1}60) !important;
            }
            .top8er .corner-top-left::after {
              display: none !important;
            }
            .top8er .corner-bottom-right::after {
              display: none !important;
            }
          ` : cornerDesign === 'diagonal' ? `
            .top8er .corner-top-left {
              border-color: transparent transparent ${cornerColor1} transparent !important;
              filter: drop-shadow(0 0 15px ${cornerColor1}80) !important;
              transform: rotate(-45deg) !important;
            }
            .top8er .corner-bottom-right {
              border-color: ${useDualColors ? cornerColor2 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 15px ${useDualColors ? cornerColor2 : cornerColor1}80) !important;
              transform: rotate(45deg) !important;
            }
            .top8er .corner-top-left::after {
              display: none !important;
            }
            .top8er .corner-bottom-right::after {
              display: none !important;
            }
          ` : cornerDesign === 'geometric' ? `
            .top8er .corner-top-left {
              border-color: transparent transparent ${cornerColor1} transparent !important;
              filter: drop-shadow(0 0 20px ${cornerColor1}90) !important;
              transform: rotate(-30deg) scale(1.2) !important;
            }
            .top8er .corner-bottom-right {
              border-color: ${useDualColors ? cornerColor2 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 20px ${useDualColors ? cornerColor2 : cornerColor1}90) !important;
              transform: rotate(30deg) scale(1.2) !important;
            }
            .top8er .corner-top-left::after {
              border-color: transparent transparent ${useDualColors ? cornerColor2 : cornerColor1} transparent !important;
              filter: drop-shadow(0 0 15px ${useDualColors ? cornerColor2 : cornerColor1}70) !important;
              transform: rotate(15deg) scale(0.8) !important;
            }
            .top8er .corner-bottom-right::after {
              border-color: ${useDualColors ? cornerColor1 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 15px ${cornerColor1}70) !important;
              transform: rotate(-15deg) scale(0.8) !important;
            }
          ` : cornerDesign === 'rounded' ? `
            .top8er .corner-top-left {
              border-color: transparent transparent ${cornerColor1} transparent !important;
              filter: drop-shadow(0 0 12px ${cornerColor1}80) !important;
              border-radius: 0 0 50% 0 !important;
              transform: rotate(-5deg) !important;
            }
            .top8er .corner-bottom-right {
              border-color: ${useDualColors ? cornerColor2 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 12px ${useDualColors ? cornerColor2 : cornerColor1}80) !important;
              border-radius: 50% 0 0 0 !important;
              transform: rotate(5deg) !important;
            }
            .top8er .corner-top-left::after {
              display: none !important;
            }
            .top8er .corner-bottom-right::after {
              display: none !important;
            }
          ` : cornerDesign === 'neon' ? `
            .top8er .corner-top-left {
              border-color: transparent transparent ${cornerColor1} transparent !important;
              filter: drop-shadow(0 0 25px ${cornerColor1}) drop-shadow(0 0 50px ${cornerColor1}) drop-shadow(0 0 75px ${cornerColor1}) !important;
              animation: neonPulse 2s ease-in-out infinite alternate !important;
            }
            .top8er .corner-bottom-right {
              border-color: ${useDualColors ? cornerColor2 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 25px ${useDualColors ? cornerColor2 : cornerColor1}) drop-shadow(0 0 50px ${useDualColors ? cornerColor2 : cornerColor1}) drop-shadow(0 0 75px ${useDualColors ? cornerColor2 : cornerColor1}) !important;
              animation: neonPulse 2s ease-in-out infinite alternate-reverse !important;
            }
            .top8er .corner-top-left::after {
              display: none !important;
            }
            .top8er .corner-bottom-right::after {
              display: none !important;
            }
            @keyframes neonPulse {
              0% { opacity: 0.7; filter: drop-shadow(0 0 25px ${cornerColor1}) drop-shadow(0 0 50px ${cornerColor1}); }
              100% { opacity: 1; filter: drop-shadow(0 0 35px ${cornerColor1}) drop-shadow(0 0 70px ${cornerColor1}); }
            }
          ` : cornerDesign === 'minimalist' ? `
            .top8er .corner-top-left {
              border-color: transparent transparent ${cornerColor1} transparent !important;
              filter: none !important;
              opacity: 0.6 !important;
              transform: rotate(-10deg) !important;
            }
            .top8er .corner-bottom-right {
              border-color: ${useDualColors ? cornerColor2 : cornerColor1} transparent transparent transparent !important;
              filter: none !important;
              opacity: 0.6 !important;
              transform: rotate(10deg) !important;
            }
            .top8er .corner-top-left::after {
              display: none !important;
            }
            .top8er .corner-bottom-right::after {
              display: none !important;
            }
          ` : cornerDesign === 'gaming' ? `
            .top8er .corner-top-left {
              border-color: transparent transparent ${cornerColor1} transparent !important;
              filter: drop-shadow(0 0 15px ${cornerColor1}80) !important;
              transform: rotate(-20deg) scale(1.1) !important;
              border-width: 0 0 180px 180px !important;
            }
            .top8er .corner-bottom-right {
              border-color: ${useDualColors ? cornerColor2 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 15px ${useDualColors ? cornerColor2 : cornerColor1}80) !important;
              transform: rotate(20deg) scale(1.1) !important;
              border-width: 180px 180px 0 0 !important;
            }
            .top8er .corner-top-left::after {
              border-color: transparent transparent ${useDualColors ? cornerColor2 : cornerColor1} transparent !important;
              filter: drop-shadow(0 0 10px ${useDualColors ? cornerColor2 : cornerColor1}60) !important;
              transform: rotate(10deg) scale(0.7) !important;
              border-width: 0 0 120px 120px !important;
            }
            .top8er .corner-bottom-right::after {
              border-color: ${useDualColors ? cornerColor1 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 10px ${cornerColor1}60) !important;
              transform: rotate(-10deg) scale(0.7) !important;
              border-width: 120px 120px 0 0 !important;
            }
          ` : cornerDesign === 'abstract' ? `
            .top8er .corner-top-left {
              border-color: transparent transparent ${cornerColor1} transparent !important;
              filter: drop-shadow(0 0 20px ${cornerColor1}80) !important;
              transform: rotate(-60deg) scale(1.3) !important;
              border-width: 0 0 200px 200px !important;
            }
            .top8er .corner-bottom-right {
              border-color: ${useDualColors ? cornerColor2 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 20px ${useDualColors ? cornerColor2 : cornerColor1}80) !important;
              transform: rotate(60deg) scale(1.3) !important;
              border-width: 200px 200px 0 0 !important;
            }
            .top8er .corner-top-left::after {
              border-color: transparent transparent ${useDualColors ? cornerColor2 : cornerColor1} transparent !important;
              filter: drop-shadow(0 0 15px ${useDualColors ? cornerColor2 : cornerColor1}60) !important;
              transform: rotate(30deg) scale(0.6) !important;
              border-width: 0 0 100px 100px !important;
            }
            .top8er .corner-bottom-right::after {
              border-color: ${useDualColors ? cornerColor1 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 15px ${cornerColor1}60) !important;
              transform: rotate(-30deg) scale(0.6) !important;
              border-width: 100px 100px 0 0 !important;
            }
          ` : cornerDesign === 'tech' ? `
            .top8er .corner-top-left {
              border-color: transparent transparent ${cornerColor1} transparent !important;
              filter: drop-shadow(0 0 18px ${cornerColor1}90) !important;
              transform: rotate(-25deg) !important;
              border-width: 0 0 160px 160px !important;
            }
            .top8er .corner-bottom-right {
              border-color: ${useDualColors ? cornerColor2 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 18px ${useDualColors ? cornerColor2 : cornerColor1}90) !important;
              transform: rotate(25deg) !important;
              border-width: 160px 160px 0 0 !important;
            }
            .top8er .corner-top-left::after {
              border-color: transparent transparent ${useDualColors ? cornerColor2 : cornerColor1} transparent !important;
              filter: drop-shadow(0 0 12px ${useDualColors ? cornerColor2 : cornerColor1}70) !important;
              transform: rotate(12deg) scale(0.8) !important;
              border-width: 0 0 110px 110px !important;
            }
            .top8er .corner-bottom-right::after {
              border-color: ${useDualColors ? cornerColor1 : cornerColor1} transparent transparent transparent !important;
              filter: drop-shadow(0 0 12px ${cornerColor1}70) !important;
              transform: rotate(-12deg) scale(0.8) !important;
              border-width: 110px 110px 0 0 !important;
            }
          ` : ''}
        `}
      </style>
      
      <div className="overlay"></div>
      <div className="corner-top-left"></div>
      <div className="corner-bottom-right"></div>
      <div className="bottom-accent"></div>
      <span className="title">{tournamentName || 'Tournament'}</span>
      <img className="ceo-logo" src={logoImage} alt="CEO Logo" />
      <span className="website">www.fightercenter.gg</span>
      <span className="entrant-count">{entrantCount} Entrants</span>

      <div className="cardholder">
                 {/* First Place */}
         {top8[0] && (
           <PlayerCard
             placement={top8[0].placement}
             entrant={top8[0].entrant}
             character={top8[0].character}
             secondaryCharacters={top8[0].secondaryCharacters}
             position="one"
             flagSrc={flagImages[0]}
             showFlags={showFlags}
           />
         )}

                 {/* 2nd-4th Place */}
         <div className="two-fourholder">
           {[1, 2, 3].map((i) => (
             top8[i] && (
               <PlayerCard
                 key={i}
                 placement={top8[i].placement}
                 entrant={top8[i].entrant}
                 character={top8[i].character}
                 secondaryCharacters={top8[i].secondaryCharacters}
                 position={positions[i]}
                 flagSrc={flagImages[i]}
                 showFlags={showFlags}
               />
             )
           ))}
         </div>

                 {/* 5th-8th Place */}
         <div className="five-eightholder">
           {[4, 5, 6, 7].map((i) => (
             top8[i] && (
               <PlayerCard
                 key={i}
                 placement={top8[i].placement}
                 entrant={top8[i].entrant}
                 character={top8[i].character}
                 secondaryCharacters={top8[i].secondaryCharacters}
                 position={positions[i]}
                 flagSrc={flagImages[i]}
                 showFlags={showFlags}
               />
             )
           ))}
         </div>
      </div>
    </div>
  );
};

export default Top8Display; 