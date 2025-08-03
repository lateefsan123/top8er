// Player character mapping utility
export interface PlayerCharacters {
  [playerName: string]: string | string[];
}

let playerCharacterData: PlayerCharacters | null = null;

export async function loadPlayerCharacterData(): Promise<PlayerCharacters> {
  if (playerCharacterData) {
    return playerCharacterData;
  }

  try {
    const response = await fetch('/data/sf6_players_2025.json');
    if (!response.ok) {
      throw new Error(`Failed to load player data: ${response.status}`);
    }
    
    playerCharacterData = await response.json();
    console.log('Loaded player character data:', Object.keys(playerCharacterData).length, 'players');
    return playerCharacterData;
  } catch (error) {
    console.error('Error loading player character data:', error);
    return {};
  }
}

export function getPlayerCharacters(playerName: string): string[] {
  if (!playerCharacterData) {
    console.warn('Player character data not loaded yet');
    return [];
  }

  // Try exact match first
  if (playerCharacterData[playerName]) {
    const chars = playerCharacterData[playerName];
    return Array.isArray(chars) ? chars : [chars];
  }

  // Try case-insensitive match
  const lowerPlayerName = playerName.toLowerCase();
  for (const [name, chars] of Object.entries(playerCharacterData)) {
    if (name.toLowerCase() === lowerPlayerName) {
      return Array.isArray(chars) ? chars : [chars];
    }
  }

  // Try partial match (for team names like "Team Liquid | Daigo")
  for (const [name, chars] of Object.entries(playerCharacterData)) {
    if (playerName.toLowerCase().includes(name.toLowerCase()) || 
        name.toLowerCase().includes(playerName.toLowerCase())) {
      return Array.isArray(chars) ? chars : [chars];
    }
  }

  return [];
}

export function getPrimaryCharacter(playerName: string): string | null {
  const characters = getPlayerCharacters(playerName);
  return characters.length > 0 ? characters[0] : null;
}

export function getAllPlayerNames(): string[] {
  return playerCharacterData ? Object.keys(playerCharacterData) : [];
} 