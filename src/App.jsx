import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { fetchTop8 } from './utils/fetchtop8';
import { characterImages } from './utils/CharacterImages';

function App() {
  const top8Ref = useRef(null);
  const [url, setUrl] = useState('');
  const [top8, setTop8] = useState([
    {
      placement: 1,
      entrant: { name: 'Daigo | Ken' },
      character: 'ken'
    },
    {
      placement: 2,
      entrant: { name: 'Momochi | Luke' },
      character: 'luke'
    },
    {
      placement: 3,
      entrant: { name: 'Tokido | Jamie' },
      character: 'jamie'
    },
    {
      placement: 4,
      entrant: { name: 'Sako | Ed' },
      character: 'ed'
    },
    {
      placement: 5,
      entrant: { name: 'Punk | Zangief' },
      character: 'zangief'
    },
    {
      placement: 6,
      entrant: { name: 'MenaRD | Ryu' },
      character: 'ryu'
    },
    {
      placement: 7,
      entrant: { name: 'iDom | Ken' },
      character: 'ken'
    },
    {
      placement: 8,
      entrant: { name: 'NuckleDu | Luke' },
      character: 'luke'
    }
  ]);
  const [tournamentName, setTournamentName] = useState('EVO 2024 - Street Fighter 6');
  const [entrantCount, setEntrantCount] = useState(2048);

  const handleDownload = () => {
    if (!top8Ref.current) return;
    html2canvas(top8Ref.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'top8.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const formatPlayerName = (fullName = '') => {
    if (!fullName.includes('|')) return fullName.trim();
    const [org, player] = fullName.split('|').map((s) => s.trim());
    const orgWords = org.split(/\s+/);
    const orgFormatted =
      orgWords.length > 1 ? orgWords.map((word) => word[0].toUpperCase()).join('') : org;
    return `${orgFormatted} | ${player}`;
  };

  const getNameStyle = (name = '', placementIndex = 0) => {
    const formatted = formatPlayerName(name);
    const length = formatted.length;

    let baseSize;
    if (placementIndex === 0) baseSize = 3.5;
    else if (placementIndex < 4) baseSize = 2.0; // smaller for 2-4
    else baseSize = 1.6; // even smaller for 5-8

    if (length > 26) return { fontSize: `${baseSize - 0.6}rem` };
    if (length > 20) return { fontSize: `${baseSize - 0.4}rem` };
    if (length > 13) return { fontSize: `${baseSize - 0.2}rem` };
    return { fontSize: `${baseSize}rem` };
  };

  const handleFetch = async () => {
    const slug = url.replace('https://www.start.gg/', '').replace(/\/$/, '');
    const { tournamentName, entrantCount, standings } = await fetchTop8(slug);
    setTournamentName(tournamentName);
    setEntrantCount(entrantCount);

    const manualOverrides = {
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
      const rawName = entry?.entrant?.name?.toLowerCase() || '';
      const playerName = rawName.includes('|') ? rawName.split('|')[1].trim() : rawName;
      const overrideCharacter = manualOverrides[playerName];
      const fallbackCharacter = Object.keys(characterImages)[i] || null;

      return {
        ...entry,
        character: overrideCharacter || entry.character || fallbackCharacter,
      };
    });

    setTop8(enriched);
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
      </div>

      <div className="top8er" ref={top8Ref}>
        <span className="title">{tournamentName || 'Tournament'}</span>
        <span className="website">www.fightercenter.gg</span>
        <span className="entrant-count">{entrantCount} Entrants</span>

        <div className="cardholder">
          <div className="player one">
            <div className="top">
              <div className={`imageholder ${top8[0]?.character || ''}`}></div>
              <span className="number">{top8[0]?.placement || 1}</span>
              <span className="name" style={getNameStyle(top8[0]?.entrant?.name, 0)}>
                {formatPlayerName(top8[0]?.entrant?.name) || 'Player 1'}
              </span>
            </div>
          </div>

          <div className="two-fourholder">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`player ${['two', 'three', 'four'][i - 1]}`}>
                <div className="top">
                  <div className={`imageholder ${top8[i]?.character || ''}`}></div>
                  <span className="number">{top8[i]?.placement || i + 1}</span>
                  <span className="name" style={getNameStyle(top8[i]?.entrant?.name, i)}>
                    {formatPlayerName(top8[i]?.entrant?.name) || `Player ${i + 1}`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="five-eightholder">
            {[4, 5, 6, 7].map((i) => (
              <div key={i} className={`player ${['five', 'six', 'seven', 'eight'][i - 4]}`}>
                <div className="top">
                  <div className={`imageholder ${top8[i]?.character || ''}`}></div>
                  <span className="number">{top8[i]?.placement || i + 1}</span>
                  <span className="name" style={getNameStyle(top8[i]?.entrant?.name, i)}>
                    {formatPlayerName(top8[i]?.entrant?.name) || `Player ${i + 1}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
