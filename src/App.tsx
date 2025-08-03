import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { fetchTop8 } from './utils/fetchtop8';
import { characterImages } from './utils/CharacterImages';
import { getFlagFromLocation } from './utils/CountryToFlag';
import { loadPlayerCharacterData, getPrimaryCharacter } from './utils/PlayerCharacterMap';
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
  const [cornerDesign, setCornerDesign] = useState<string>('double-triangle');
  const [useDualColors, setUseDualColors] = useState<boolean>(true);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showFlags, setShowFlags] = useState<boolean>(true);
  const [backgroundImage, setBackgroundImage] = useState<string>('/images/drop-your-favorite-wallpaper-panel-to-turn-into-a-wallpaper-v0-so4c7wbrib0f1.png');
  const [logoImage, setLogoImage] = useState<string>('/images/ceo.png');
  const [customBackground, setCustomBackground] = useState<string>('');
  const [customLogo, setCustomLogo] = useState<string>('');

  const cornerDesignOptions = [
    { name: 'Banner Swoosh', value: 'banner-swoosh' },
    { name: 'Red & Yellow Accent', value: 'red-yellow-accent' },
    { name: 'Double Triangle', value: 'double-triangle' },
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

  const flagOptions = [
    { name: 'None', value: '' },
    { name: 'Afghanistan', value: '/images/Flag_of_Afghanistan.svg.png' },
    { name: 'Albania', value: '/images/Flag_of_Albania.svg.png' },
    { name: 'Algeria', value: '/images/Flag_of_Algeria.svg.png' },
    { name: 'Argentina', value: '/images/Flag_of_Argentina.svg.png' },
    { name: 'Australia', value: '/images/Flag_of_Australia.svg.png' },
    { name: 'Austria', value: '/images/Flag_of_Austria.svg.png' },
    { name: 'Bahrain', value: '/images/Flag_of_Bahrain.svg.png' },
    { name: 'Bangladesh', value: '/images/Flag_of_Bangladesh.svg.png' },
    { name: 'Barbados', value: '/images/Flag_of_Barbados.svg.png' },
    { name: 'Belgium', value: '/images/Flag_of_Belgium.svg.png' },
    { name: 'Brazil', value: '/images/Flag_of_Brazil.svg.png' },
    { name: 'Bulgaria', value: '/images/Flag_of_Bulgaria.svg.png' },
    { name: 'Canada', value: '/images/canada.png' },
    { name: 'Chile', value: '/images/Flag_of_Chile.svg.png' },
    { name: 'China', value: '/images/Flag_of_China.svg.png' },
    { name: 'Colombia', value: '/images/Flag_of_Colombia.svg.png' },
    { name: 'Costa Rica', value: '/images/Flag_of_Costa_Rica.svg.png' },
    { name: 'Croatia', value: '/images/Flag_of_Croatia.svg.png' },
    { name: 'Cuba', value: '/images/Flag_of_Cuba.svg.png' },
    { name: 'Czech Republic', value: '/images/Flag_of_Czech_Republic.svg.png' },
    { name: 'Denmark', value: '/images/Flag_of_Denmark.svg.png' },
    { name: 'Dominican Republic', value: '/images/Flag_of_Dominican_Republic.svg.png' },
    { name: 'Ecuador', value: '/images/Flag_of_Ecuador.svg.png' },
    { name: 'Egypt', value: '/images/Flag_of_Egypt.svg.png' },
    { name: 'El Salvador', value: '/images/Flag_of_El_Salvador.svg.png' },
    { name: 'Estonia', value: '/images/Flag_of_Estonia.svg.png' },
    { name: 'Finland', value: '/images/Flag_of_Finland.svg.png' },
    { name: 'France', value: '/images/Flag_of_France.svg.png' },
    { name: 'Germany', value: '/images/Flag_of_Germany.svg.png' },
    { name: 'Greece', value: '/images/Flag_of_Greece.svg.png' },
    { name: 'Guatemala', value: '/images/Flag_of_Guatemala.svg.png' },
    { name: 'Honduras', value: '/images/Flag_of_Honduras.svg.png' },
    { name: 'Hong Kong', value: '/images/Flag_of_Hong_Kong.svg.png' },
    { name: 'Hungary', value: '/images/Flag_of_Hungary.svg.png' },
    { name: 'Iceland', value: '/images/Flag_of_Iceland.svg.png' },
    { name: 'India', value: '/images/Flag_of_India.svg.png' },
    { name: 'Indonesia', value: '/images/Flag_of_Indonesia.svg.png' },
    { name: 'Iran', value: '/images/Flag_of_Iran.svg.png' },
    { name: 'Iraq', value: '/images/Flag_of_Iraq.svg.png' },
    { name: 'Ireland', value: '/images/Flag_of_Ireland.svg.png' },
    { name: 'Israel', value: '/images/Flag_of_Israel.svg.png' },
    { name: 'Italy', value: '/images/Flag_of_Italy.svg.png' },
    { name: 'Jamaica', value: '/images/Flag_of_Jamaica.svg.png' },
    { name: 'Japan', value: '/images/Flag_of_Japan.svg.png' },
    { name: 'Jordan', value: '/images/Flag_of_Jordan.svg.png' },
    { name: 'Kazakhstan', value: '/images/Flag_of_Kazakhstan.svg.png' },
    { name: 'Kuwait', value: '/images/Flag_of_Kuwait.svg.png' },
    { name: 'Latvia', value: '/images/Flag_of_Latvia.svg.png' },
    { name: 'Lebanon', value: '/images/Flag_of_Lebanon.svg.png' },
    { name: 'Lithuania', value: '/images/Flag_of_Lithuania.svg.png' },
    { name: 'Luxembourg', value: '/images/Flag_of_Luxembourg.svg.png' },
    { name: 'Malaysia', value: '/images/Flag_of_Malaysia.svg.png' },
    { name: 'Maldives', value: '/images/Flag_of_Maldives.svg.png' },
    { name: 'Malta', value: '/images/Flag_of_Malta.svg.png' },
    { name: 'Mexico', value: '/images/Flag_of_Mexico.svg.png' },
    { name: 'Monaco', value: '/images/Flag_of_Monaco.svg.png' },
    { name: 'Mongolia', value: '/images/Flag_of_Mongolia.svg.png' },
    { name: 'Morocco', value: '/images/Flag_of_Morocco.svg.png' },
    { name: 'Netherlands', value: '/images/Flag_of_Netherlands.svg.png' },
    { name: 'New Zealand', value: '/images/Flag_of_New_Zealand.svg.png' },
    { name: 'Nigeria', value: '/images/Flag_of_Nigeria.svg.png' },
    { name: 'North Korea', value: '/images/Flag_of_North_Korea.svg.png' },
    { name: 'Norway', value: '/images/Flag_of_Norway.svg.png' },
    { name: 'Pakistan', value: '/images/Flag_of_Pakistan.svg.png' },
    { name: 'Panama', value: '/images/Flag_of_Panama.svg.png' },
    { name: 'Paraguay', value: '/images/Flag_of_Paraguay.svg.png' },
    { name: 'Peru', value: '/images/Flag_of_Peru.svg.png' },
    { name: 'Philippines', value: '/images/Flag_of_Philippines.svg.png' },
    { name: 'Poland', value: '/images/Flag_of_Poland.svg.png' },
    { name: 'Portugal', value: '/images/Flag_of_Portugal.svg.png' },
    { name: 'Qatar', value: '/images/Flag_of_Qatar.svg.png' },
    { name: 'Romania', value: '/images/Flag_of_Romania.svg.png' },
    { name: 'Russia', value: '/images/Flag_of_Russia.svg.png' },
    { name: 'Saudi Arabia', value: '/images/Flag_of_Saudi_Arabia.svg.png' },
    { name: 'Serbia', value: '/images/Flag_of_Serbia.svg.png' },
    { name: 'Singapore', value: '/images/Flag_of_Singapore.svg.png' },
    { name: 'Slovakia', value: '/images/Flag_of_Slovakia.svg.png' },
    { name: 'Slovenia', value: '/images/Flag_of_Slovenia.svg.png' },
    { name: 'South Africa', value: '/images/Flag_of_South_Africa.svg.png' },
    { name: 'South Korea', value: '/images/Flag_of_South_Korea.svg.png' },
    { name: 'Spain', value: '/images/Flag_of_Spain.svg.png' },
    { name: 'Sri Lanka', value: '/images/Flag_of_Sri_Lanka.svg.png' },
    { name: 'Sweden', value: '/images/Flag_of_Sweden.svg.png' },
    { name: 'Switzerland', value: '/images/Flag_of_Switzerland.svg.png' },
    { name: 'Syria', value: '/images/Flag_of_Syria.svg.png' },
    { name: 'Taiwan', value: '/images/Flag_of_Taiwan.svg.png' },
    { name: 'Thailand', value: '/images/Flag_of_Thailand.svg.png' },
    { name: 'Tunisia', value: '/images/Flag_of_Tunisia.svg.png' },
    { name: 'Turkey', value: '/images/Flag_of_Turkey.svg.png' },
    { name: 'Ukraine', value: '/images/Flag_of_Ukraine.svg.png' },
    { name: 'United Arab Emirates', value: '/images/Flag_of_United_Arab_Emirates.svg.png' },
    { name: 'United Kingdom', value: '/images/Flag_of_United_Kingdom.svg.png' },
    { name: 'United States', value: '/images/Flag_of_United_States.svg.png' },
    { name: 'Uruguay', value: '/images/Flag_of_Uruguay.svg.png' },
    { name: 'Venezuela', value: '/images/Flag_of_Venezuela.svg.png' },
    { name: 'Vietnam', value: '/images/Flag_of_Vietnam.svg.png' },
    { name: 'Yemen', value: '/images/Flag_of_Yemen.svg.png' }
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

  const handleFlagChange = (placement: number, flag: string) => {
    setTop8(prev => prev.map(player => 
      player.placement === placement 
        ? { ...player, flag: flag || undefined }
        : player
    ));
  };

  const generateImage = async (): Promise<HTMLCanvasElement> => {
    if (!top8Ref.current) throw new Error('No element to capture');

    const element = top8Ref.current.querySelector('.top8er') as HTMLElement;
    if (!element) throw new Error('No .top8er element found');

    // Store original styles to restore later
    const originalPosition = element.style.position;
    const originalDisplay = element.style.display;
    const originalOverflow = element.style.overflow;
    const originalTransform = element.style.transform;
    const originalMargin = element.style.margin;
    const originalPadding = element.style.padding;
    const originalJustifyContent = element.style.justifyContent;
    const originalAlignItems = element.style.alignItems;
    
    // Temporarily apply styles for capture but preserve centering
    element.style.position = 'relative';
    element.style.display = 'flex';
    element.style.justifyContent = 'center';
    element.style.alignItems = 'center';
    element.style.overflow = 'visible';
    element.style.transform = 'none';
    element.style.margin = '0';
    element.style.padding = '0';

    try {
      // Wait for all images to load
      const images = element.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });

      await Promise.all(imagePromises);

      // Also wait for background images
      const backgroundImages = element.querySelectorAll('.imageholder');
      const backgroundPromises = Array.from(backgroundImages).map(holder => {
        const url = window.getComputedStyle(holder).backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
        if (!url) return Promise.resolve();
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        });
      });

      await Promise.all(backgroundPromises);

      // Generate the canvas
      const canvas = await html2canvas(element, {
        scale: 2, // For better quality
        useCORS: true,
        backgroundColor: null,
        allowTaint: true,
        removeContainer: true,
        foreignObjectRendering: false,
        logging: false
      });

      return canvas;
    } finally {
      // Restore original styling immediately
      element.style.position = originalPosition;
      element.style.display = originalDisplay;
      element.style.overflow = originalOverflow;
      element.style.transform = originalTransform;
      element.style.margin = originalMargin;
      element.style.padding = originalPadding;
      element.style.justifyContent = originalJustifyContent;
      element.style.alignItems = originalAlignItems;
    }
  };

  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');

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
        setGeneratedImageUrl(url);
        
        const link = document.createElement('a');
        const date = new Date().toISOString().split('T')[0];
        const sanitizedName = tournamentName.replace(/[^a-zA-Z0-9]/g, '-');
        link.download = `top8-${sanitizedName}-${date}.png`;
        link.href = url;
        link.click();
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
      
      // Load player character data
      await loadPlayerCharacterData();
      
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
        
        // Try to get character from database
        const databaseCharacter = getPrimaryCharacter(entry.entrant.name);
        const overrideCharacter = manualOverrides[playerName];
        const fallbackCharacter = Object.keys(characterImages)[i] || null;

        console.log(`Player ${entry.entrant.name} character detection:`, {
          databaseCharacter,
          overrideCharacter,
          fallbackCharacter
        });

        // Try to get flag from location data
        let flag: string | undefined;
        if (entry?.entrant?.participants?.[0]?.user?.location) {
          const location = entry.entrant.participants[0].user.location;
          console.log(`Player ${entry.entrant.name} location data:`, location);
          flag = getFlagFromLocation(location) || undefined;
          console.log(`Player ${entry.entrant.name} detected flag:`, flag);
        } else {
          console.log(`Player ${entry.entrant.name} has no location data`);
        }

        return {
          ...entry,
          character: databaseCharacter || overrideCharacter || entry.character || fallbackCharacter || undefined,
          flag: flag,
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
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#ccc' }}>Player & Character Settings</h4>
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
                      <span style={{ fontSize: '0.8rem', color: '#ccc' }}>Player Settings</span>
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

                      <select
                        value={player.flag || ''}
                        onChange={(e) => handleFlagChange(player.placement, e.target.value)}
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
                        <option value="">Select Flag</option>
                        {flagOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                      </select>

                      <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #444' }}>
                        <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>Secondary Characters:</div>
                        {(player.secondaryCharacters || []).map((character, index) => (
                          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.3rem' }}>
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
                            width: '100%'
                          }}
                        >
                          + Add Secondary Character
                        </button>
                      </div>
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

      {generatedImageUrl && (
        <div style={{ 
          marginTop: '2rem', 
          textAlign: 'center',
          padding: '1rem',
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '8px',
          width: 'auto',
          display: 'inline-block'
        }}>
          <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Generated Image</h3>
          <p style={{ color: '#ccc', marginBottom: '1rem', fontSize: '0.9rem' }}>
            Click on the image below to download it as a PNG file, or right-click and select "Save image as..."
          </p>
          <a 
            href={generatedImageUrl} 
            download={`top8-${tournamentName.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.png`}
            style={{ 
              display: 'inline-block',
              textDecoration: 'none'
            }}
          >
            <img 
              src={generatedImageUrl} 
              alt="Generated Top 8" 
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                border: '2px solid #444',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            />
          </a>
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={() => {
                setGeneratedImageUrl('');
                URL.revokeObjectURL(generatedImageUrl);
              }}
              style={{
                padding: '0.5rem 1rem',
                background: '#666',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Clear Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;