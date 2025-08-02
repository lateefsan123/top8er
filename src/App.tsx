import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { fetchTop8 } from './utils/fetchtop8';
import { characterImages } from './utils/CharacterImages';
import { Standing, Entrant } from './types';
import Top8Display from './components/Top8Display';
import ColorPicker from './components/ColorPicker';

const App: React.FC = () => {
  const top8Ref = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string>('');
  const [top8, setTop8] = useState<Standing[]>([
    {
      placement: 1,
      entrant: { id: '1', name: 'Daigo | Ken' },
      character: 'ken'
    },
    {
      placement: 2,
      entrant: { id: '2', name: 'Momochi | Luke' },
      character: 'luke'
    },
    {
      placement: 3,
      entrant: { id: '3', name: 'Tokido | Jamie' },
      character: 'jamie'
    },
    {
      placement: 4,
      entrant: { id: '4', name: 'Sako | Ed' },
      character: 'ed'
    },
    {
      placement: 5,
      entrant: { id: '5', name: 'Punk | Zangief' },
      character: 'zangief'
    },
    {
      placement: 6,
      entrant: { id: '6', name: 'MenaRD | Ryu' },
      character: 'ryu'
    },
    {
      placement: 7,
      entrant: { id: '7', name: 'iDom | Ken' },
      character: 'ken'
    },
    {
      placement: 8,
      entrant: { id: '8', name: 'NuckleDu | Luke' },
      character: 'luke'
    }
  ]);
  const [tournamentName, setTournamentName] = useState<string>('EVO 2024 - Street Fighter 6');
  const [entrantCount, setEntrantCount] = useState<number>(2048);
  const [cornerColor1, setCornerColor1] = useState<string>('#ff007a');
  const [cornerColor2, setCornerColor2] = useState<string>('#00d4ff');
  const [cornerDesign, setCornerDesign] = useState<string>('gradient');
  const [useDualColors, setUseDualColors] = useState<boolean>(true);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showFlags, setShowFlags] = useState<boolean>(true);
  const [backgroundImage, setBackgroundImage] = useState<string>('/images/drop-your-favorite-wallpaper-panel-to-turn-into-a-wallpaper-v0-so4c7wbrib0f1.png');
  const [logoImage, setLogoImage] = useState<string>('/images/ceo.png');
  const [customBackground, setCustomBackground] = useState<string>('');
  const [customLogo, setCustomLogo] = useState<string>('');



  const cornerDesignOptions = [
    { name: 'Gradient', value: 'gradient' },
    { name: 'Solid Border', value: 'solid' },
    { name: 'Diagonal Split', value: 'diagonal' },
    { name: 'Geometric', value: 'geometric' },
    { name: 'Rounded', value: 'rounded' },
    { name: 'Neon Glow', value: 'neon' },
    { name: 'Minimalist', value: 'minimalist' },
    { name: 'Gaming', value: 'gaming' },
    { name: 'Abstract', value: 'abstract' },
    { name: 'Tech', value: 'tech' }
  ];

  const characterOptions = [
    { name: 'None', value: '' },
    { name: 'Ken', value: 'ken' },
    { name: 'Ryu', value: 'ryu' },
    { name: 'Luke', value: 'luke' },
    { name: 'Jamie', value: 'jamie' },
    { name: 'Ed', value: 'ed' },
    { name: 'Zangief', value: 'zangief' },
    { name: 'Akuma', value: 'akuma' },
    { name: 'Cammy', value: 'cammy' },
    { name: 'Chun-Li', value: 'chunli' },
    { name: 'Dee Jay', value: 'deejay' },
    { name: 'Dhalsim', value: 'dhalsim' },
    { name: 'E. Honda', value: 'honda' },
    { name: 'Guile', value: 'guile' },
    { name: 'JP', value: 'jp' },
    { name: 'Juri', value: 'juri' },
    { name: 'Kimberly', value: 'kimberly' },
    { name: 'Lily', value: 'lily' },
    { name: 'Manon', value: 'manon' },
    { name: 'Marisa', value: 'marisa' },
    { name: 'M. Bison', value: 'mbison' },
    { name: 'Mai', value: 'mai' },
    { name: 'Terry', value: 'terry' },
    { name: 'Elena', value: 'elena' },
    { name: 'Blanka', value: 'blanka' },
    { name: 'Rashid', value: 'rashid' },
    { name: 'A.K.I.', value: 'aki' },
    { name: 'Sagat', value: 'sagat' }
  ];

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomBackground(result);
        setBackgroundImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomLogo(result);
        setLogoImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSecondaryCharacterChange = (placement: number, character: string, index: number) => {
    setTop8(prev => prev.map(player => {
      if (player.placement === placement) {
        const currentSecondaries = player.secondaryCharacters || [];
        const newSecondaries = [...currentSecondaries];
        if (character) {
          newSecondaries[index] = character;
        } else {
          newSecondaries.splice(index, 1);
        }
        return { ...player, secondaryCharacters: newSecondaries.length > 0 ? newSecondaries : undefined };
      }
      return player;
    }));
  };

  const addSecondaryCharacter = (placement: number) => {
    setTop8(prev => prev.map(player => {
      if (player.placement === placement) {
        const currentSecondaries = player.secondaryCharacters || [];
        return { ...player, secondaryCharacters: [...currentSecondaries, ''] };
      }
      return player;
    }));
  };

  const removeSecondaryCharacter = (placement: number, index: number) => {
    setTop8(prev => prev.map(player => {
      if (player.placement === placement) {
        const currentSecondaries = player.secondaryCharacters || [];
        const newSecondaries = currentSecondaries.filter((_, i) => i !== index);
        return { ...player, secondaryCharacters: newSecondaries.length > 0 ? newSecondaries : undefined };
      }
      return player;
    }));
  };

  const handlePlayerNameChange = (placement: number, name: string) => {
    setTop8(prev => prev.map(player => 
      player.placement === placement 
        ? { ...player, entrant: { ...player.entrant, name } }
        : player
    ));
  };

  const handleCharacterChange = (placement: number, character: string) => {
    setTop8(prev => prev.map(player => 
      player.placement === placement 
        ? { ...player, character: character || undefined }
        : player
    ));
  };

  const generateImage = async (): Promise<HTMLCanvasElement> => {
    if (!top8Ref.current) {
      throw new Error('No element to capture');
    }

    // Wait for all images to load before capturing
    const images = top8Ref.current.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if some images fail
        });
      })
    );

    const canvas = await html2canvas(top8Ref.current, {
      scale: 4, // Fixed high quality scale
      useCORS: true,
      backgroundColor: '#000000',
      allowTaint: false,
      foreignObjectRendering: false,
      imageTimeout: 15000,
      logging: false,
      width: top8Ref.current.offsetWidth,
      height: top8Ref.current.offsetHeight,
      removeContainer: true,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector('.top8er') as HTMLElement;
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.position = 'relative';
          
          // Ensure background images are properly loaded
          const imageholders = clonedElement.querySelectorAll('.imageholder');
          imageholders.forEach((holder) => {
            const computedStyle = window.getComputedStyle(holder);
            const backgroundImage = computedStyle.backgroundImage;
            if (backgroundImage && backgroundImage !== 'none') {
              (holder as HTMLElement).style.backgroundImage = backgroundImage;
            }
          });
        }
      }
    });

    // Apply final quality optimization
    const optimizedCanvas = document.createElement('canvas');
    const ctx = optimizedCanvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    const targetWidth = canvas.width * 1.5;
    const targetHeight = canvas.height * 1.5;
    
    optimizedCanvas.width = targetWidth;
    optimizedCanvas.height = targetHeight;
    
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
    
    return optimizedCanvas;
  };

  const handleDownload = async (): Promise<void> => {
    if (!top8Ref.current) return;
    
    const downloadBtn = document.querySelector('.download-btn') as HTMLButtonElement;
    const originalText = downloadBtn?.textContent;
    if (downloadBtn) {
      downloadBtn.textContent = 'Generating...';
      downloadBtn.disabled = true;
    }

    try {
      const optimizedCanvas = await generateImage();
      
      const blob = await new Promise<Blob | null>((resolve) => {
        optimizedCanvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png', 1.0);
      });

      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const date = new Date().toISOString().split('T')[0];
        const sanitizedName = tournamentName.replace(/[^a-zA-Z0-9]/g, '-');
        link.download = `top8-${sanitizedName}-${date}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating image. Please try again.');
    } finally {
      if (downloadBtn) {
        downloadBtn.textContent = originalText || 'Download Top 8';
        downloadBtn.disabled = false;
      }
    }
  };

  const handleFetch = async (): Promise<void> => {
    try {
      console.log('Fetching tournament data...');
      const slug = url.replace('https://www.start.gg/', '').replace(/\/$/, '');
      console.log('Extracted slug:', slug);
      
      const { tournamentName, entrantCount, standings } = await fetchTop8(slug);
      console.log('API Response:', { tournamentName, entrantCount, standings });
      
      setTournamentName(tournamentName);
      setEntrantCount(entrantCount);

      const manualOverrides: Record<string, string> = {
        leshar: 'mai',
        punk: 'cammy',
        nl: 'akuma',
        zhen: 'mai',
        ryukichi: 'ken',
        craime: 'luke',
        notpedro: 'ken',
        kilzyou: 'cammy',
      };

      const enriched = standings.map((entry, i) => {
        console.log('Processing entry:', entry);
        const rawName = entry?.entrant?.name?.toLowerCase() || '';
        const playerName = rawName.includes('|') ? rawName.split('|')[1].trim() : rawName;
        const overrideCharacter = manualOverrides[playerName];
        const fallbackCharacter = Object.keys(characterImages)[i] || null;

        return {
          ...entry,
          character: overrideCharacter || entry.character || fallbackCharacter || undefined,
        };
      });

      console.log('Enriched data:', enriched);
      setTop8(enriched);
    } catch (error) {
      console.error('Error in handleFetch:', error);
      alert('Error fetching tournament data. Check console for details.');
    }
  };

  return (
    <div className="main">
      <div className="inputbar" style={{ marginBottom: '1rem' }}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Start.gg bracket URL"
          style={{
            padding: '10px',
            fontSize: '1rem',
            marginRight: '1rem',
            width: '300px',
          }}
        />
        <button onClick={handleFetch} className="download-btn">
          Load Top 8
        </button>
        <button
          onClick={handleDownload}
          className="download-btn"
          style={{ marginLeft: '1rem' }}
        >
          Download Top 8
        </button>
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="download-btn"
          style={{ marginLeft: '1rem' }}
        >
          Customize Colors
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="download-btn"
          style={{ marginLeft: '1rem' }}
        >
          Settings
        </button>
      </div>

      {showColorPicker && (
        <ColorPicker
          cornerColor1={cornerColor1}
          cornerColor2={cornerColor2}
          onColor1Change={setCornerColor1}
          onColor2Change={setCornerColor2}
        />
      )}

             {showSettings && (
         <div style={{
           background: 'rgba(0, 0, 0, 0.9)',
           padding: '1rem',
           borderRadius: '8px',
           marginBottom: '0.5rem',
           color: 'white',
           maxWidth: '1200px',
           fontSize: '0.9rem'
         }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
             <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Settings</h3>
             <button
               onClick={() => setShowSettings(false)}
               style={{
                 background: 'none',
                 border: 'none',
                 color: '#ccc',
                 fontSize: '1.2rem',
                 cursor: 'pointer',
                 padding: '0.2rem 0.5rem'
               }}
             >
               ×
             </button>
           </div>
           
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <input
                    type="checkbox"
                    checked={showFlags}
                    onChange={(e) => setShowFlags(e.target.checked)}
                  />
                  Show Flags
                </label>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <input
                    type="checkbox"
                    checked={useDualColors}
                    onChange={(e) => setUseDualColors(e.target.checked)}
                  />
                  Use Primary + Secondary Colors
                </label>
              </div>

              <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#ccc' }}>Manual Player & Character Input</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.8rem' }}>
                  {top8.map((player) => (
                    <div key={player.placement} style={{ 
                      border: '1px solid #444', 
                      borderRadius: '6px', 
                      padding: '0.8rem',
                      background: 'rgba(255, 255, 255, 0.05)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', minWidth: '40px', color: '#ffd700' }}>
                          {player.placement}.
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#ccc' }}>Player & Character</span>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <input
                          type="text"
                          placeholder="Player Name (e.g., Team Liquid | Daigo)"
                          value={player.entrant.name}
                          onChange={(e) => handlePlayerNameChange(player.placement, e.target.value)}
                          style={{
                            padding: '0.3rem',
                            borderRadius: '4px',
                            border: '1px solid #666',
                            background: '#333',
                            color: 'white',
                            fontSize: '0.75rem',
                            width: '100%'
                          }}
                        />
                        
                        <select
                          value={player.character || ''}
                          onChange={(e) => handleCharacterChange(player.placement, e.target.value)}
                          style={{
                            padding: '0.3rem',
                            borderRadius: '4px',
                            border: '1px solid #666',
                            background: '#333',
                            color: 'white',
                            fontSize: '0.75rem',
                            width: '100%'
                          }}
                        >
                          <option value="">Select Character</option>
                          {characterOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#ccc' }}>Secondary Characters</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '0.8rem' }}>
                  {top8.map((player) => (
                    <div key={player.placement} style={{ 
                      border: '1px solid #444', 
                      borderRadius: '6px', 
                      padding: '0.8rem',
                      background: 'rgba(255, 255, 255, 0.05)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', minWidth: '40px', color: '#ffd700' }}>
                          {player.placement}.
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#ccc' }}>Secondary Characters</span>
                      </div>
                      
                                             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                         {(player.secondaryCharacters || []).map((character, index) => (
                           <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                             <select
                               value={character}
                               onChange={(e) => handleSecondaryCharacterChange(player.placement, e.target.value, index)}
                               style={{
                                 padding: '0.3rem',
                                 borderRadius: '4px',
                                 border: '1px solid #666',
                                 background: '#333',
                                 color: 'white',
                                 fontSize: '0.75rem',
                                 flex: 1
                               }}
                             >
                               <option value="">Select Secondary Character</option>
                               {characterOptions.map((option) => (
                                 <option key={option.value} value={option.value}>
                                   {option.name}
                                 </option>
                               ))}
                             </select>
                             <button
                               onClick={() => removeSecondaryCharacter(player.placement, index)}
                               style={{
                                 background: '#ff4444',
                                 border: 'none',
                                 borderRadius: '4px',
                                 color: 'white',
                                 padding: '0.3rem 0.5rem',
                                 fontSize: '0.7rem',
                                 cursor: 'pointer'
                               }}
                             >
                               ×
                             </button>
                           </div>
                         ))}
                         
                         <button
                           onClick={() => addSecondaryCharacter(player.placement)}
                           style={{
                             background: '#444',
                             border: '1px solid #666',
                             borderRadius: '4px',
                             color: 'white',
                             padding: '0.3rem',
                             fontSize: '0.75rem',
                             cursor: 'pointer',
                             marginTop: '0.2rem'
                           }}
                         >
                           + Add Secondary Character
                         </button>
                       </div>
                    </div>
                  ))}
                </div>
              </div>

             <div>
               <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>
                 Corner Design:
               </label>
               <select
                 value={cornerDesign}
                 onChange={(e) => setCornerDesign(e.target.value)}
                 style={{
                   padding: '0.3rem',
                   borderRadius: '4px',
                   border: '1px solid #666',
                   background: '#333',
                   color: 'white',
                   width: '100%',
                   fontSize: '0.8rem',
                   marginBottom: '0.3rem'
                 }}
               >
                 {cornerDesignOptions.map((option) => (
                   <option key={option.value} value={option.value}>
                     {option.name}
                   </option>
                 ))}
               </select>
             </div>

             <div>
               <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>
                 Background Image:
               </label>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                 <input
                   type="file"
                   accept="image/*"
                   onChange={handleBackgroundUpload}
                   style={{ display: 'none' }}
                   id="background-upload"
                 />
                 <label
                   htmlFor="background-upload"
                   style={{
                     padding: '0.3rem 0.6rem',
                     background: '#444',
                     border: '1px solid #666',
                     borderRadius: '4px',
                     cursor: 'pointer',
                     fontSize: '0.75rem',
                     color: 'white'
                   }}
                 >
                   Upload Background
                 </label>
                 {customBackground && (
                   <button
                     onClick={() => {
                       setCustomBackground('');
                       setBackgroundImage('/images/drop-your-favorite-wallpaper-panel-to-turn-into-a-wallpaper-v0-so4c7wbrib0f1.png');
                     }}
                     style={{
                       padding: '0.3rem 0.6rem',
                       background: '#d32f2f',
                       border: '1px solid #b71c1c',
                       borderRadius: '4px',
                       cursor: 'pointer',
                       fontSize: '0.75rem',
                       color: 'white'
                     }}
                   >
                     Remove
                   </button>
                 )}
               </div>
             </div>

             <div>
               <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>
                 Logo:
               </label>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                 <input
                   type="file"
                   accept="image/*"
                   onChange={handleLogoUpload}
                   style={{ display: 'none' }}
                   id="logo-upload"
                 />
                 <label
                   htmlFor="logo-upload"
                   style={{
                     padding: '0.3rem 0.6rem',
                     background: '#444',
                     border: '1px solid #666',
                     borderRadius: '4px',
                     cursor: 'pointer',
                     fontSize: '0.75rem',
                     color: 'white'
                   }}
                 >
                   Upload Logo
                 </label>
                 {customLogo && (
                   <button
                     onClick={() => {
                       setCustomLogo('');
                       setLogoImage('/images/ceo.png');
                     }}
                     style={{
                       padding: '0.3rem 0.6rem',
                       background: '#d32f2f',
                       border: '1px solid #b71c1c',
                       borderRadius: '4px',
                       cursor: 'pointer',
                       fontSize: '0.75rem',
                       color: 'white'
                     }}
                   >
                     Remove
                   </button>
                 )}
               </div>
             </div>
           </div>
         </div>
       )}

      <div ref={top8Ref}>
                                   <Top8Display
            top8={top8}
            tournamentName={tournamentName}
            entrantCount={entrantCount}
            cornerColor1={cornerColor1}
            cornerColor2={cornerColor2}
            cornerDesign={cornerDesign}
            useDualColors={useDualColors}
            showFlags={showFlags}
            backgroundImage={backgroundImage}
            logoImage={logoImage}
          />
      </div>
    </div>
  );
};

export default App; 