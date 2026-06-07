export type GameScreen =
  | 'title'
  | 'case-select'
  | 'scene'
  | 'evidence-board'
  | 'handbook'
  | 'accusation'
  | 'outcome';

export interface Clue {
  id: string;
  label: string;
  shortDesc: string;
  detail: string;
  type: 'photo' | 'note' | 'screenshot' | 'witness';
  icon: string;
  x: number; // % from left in scene
  y: number; // % from top in scene
  hitW?: number; // hit box width %
  hitH?: number; // hit box height %
  discovered: boolean;
  boardX?: number; // position on evidence board
  boardY?: number;
}

export interface HandbookTerm {
  term: string;
  oneLiner: string;
  analogy: string;
  inThisCase: string;
}

export interface Level {
  id: number;
  title: string;
  subtitle: string;
  victim: { name: string; age: number; description: string };
  briefing: string;
  clues: Clue[];
  bonusClues: Clue[];
  accusationOptions: { id: string; label: string; description: string }[];
  correctAnswer: string;
  handbookTerms: HandbookTerm[];
  successOutcome: string;
  failureOutcome: string;
}

export interface GameState {
  screen: GameScreen;
  currentLevel: number;
  discoveredClues: string[];
  selectedClue: Clue | null;
  accusationMade: boolean;
  accusationCorrect: boolean | null;
  handbookUnlocked: string[];
}
