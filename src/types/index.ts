export interface Entrant {
  id: string;
  name: string;
  participants?: Participant[];
}

export interface Participant {
  gamerTag: string;
  user?: {
    id: string;
    authorizations?: Authorization[];
  };
}

export interface Authorization {
  externalUsername: string;
  type: string;
}

export interface Standing {
  placement: number;
  entrant: Entrant;
  character?: string;
  secondaryCharacters?: string[];
  flag?: string;
}

export interface TournamentData {
  tournamentName: string;
  entrantCount: number;
  standings: Standing[];
}

export interface PlayerCardProps {
  placement: number;
  entrant: Entrant;
  character?: string;
  secondaryCharacters?: string[];
  position: 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight';
  flagSrc: string;
  showFlags?: boolean;
  customFlag?: string;
}

export interface Top8DisplayProps {
  top8: Standing[];
  tournamentName: string;
  entrantCount: number;
  cornerColor1: string;
  cornerColor2: string;
  cornerDesign?: string;
  useDualColors?: boolean;
  showFlags?: boolean;
  backgroundImage?: string;
  logoImage?: string;
} 