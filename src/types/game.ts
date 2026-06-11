export type Lang = 'en' | 'de';

export type GameScreen =
  | 'title'
  | 'detective-creation'
  | 'intro-sequence'
  | 'detective-office'
  | 'case-briefing'
  | 'scene'
  | 'accusation'
  | 'case-conclusion'
  | 'all-cases-complete'
  | 'case-select'; // legacy, unused

export type DetectiveRank =
  | 'Junior Investigator'
  | 'Cyber Detective'
  | 'Senior Investigator'
  | 'Cybercrime Specialist'
  | 'Chief Investigator';

export interface CharacterAppearance {
  skinTone: number;    // 0-4
  hairStyle: number;   // 0-3
  hairColor: number;   // 0-5
  outfitColor: number; // 0-4
}

export interface Detective {
  name: string;
  avatar: number;      // = outfitColor (0-4), kept for accent color compat
  badge: number;       // 0-2
  specialty: number;   // 0-3
  appearance: CharacterAppearance;
  xp: number;
  rank: DetectiveRank;
  completedCases: number[];
}

export interface DialogueLine {
  characterId: 'detective' | 'weber' | 'mia' | 'jonas' | 'narrator';
  text: string;
}

export interface Clue {
  id: string;
  label: string;
  shortDesc: string;
  detail: string;
  type: 'photo' | 'note' | 'screenshot' | 'witness';
  icon: string;
  x: number;
  y: number;
  hitW?: number;
  hitH?: number;
  discovered: boolean;
  boardX?: number;
  boardY?: number;
  detectiveComment?: string;
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
  caseType: string;
  difficulty: 'easy' | 'medium' | 'hard';
  victim: {
    name: string;
    age: number;
    description: string;
    background: string;
    emoji: string;
  };
  location: string;
  investigationLabel: string; // shown before investigation — does NOT reveal attack vector
  briefing: string;
  clues: Clue[];
  bonusClues: Clue[];
  accusationOptions: { id: string; label: string; description: string }[];
  correctAnswer: string;
  handbookTerms: HandbookTerm[];
  successOutcome: string;
  failureOutcome: string;
  openingDialogue: DialogueLine[];
  conclusionDialogue: DialogueLine[];
  detectiveMemo: string;
  xpReward: number;
  de?: LevelTranslation;
}

export interface LevelTranslation {
  title: string;
  subtitle: string;
  caseType: string;
  victim: { description: string; background: string };
  location: string;
  investigationLabel: string;
  briefing: string;
  detectiveMemo: string;
  openingDialogue: DialogueLine[];
  conclusionDialogue: DialogueLine[];
  clueTexts: Record<string, { label: string; shortDesc: string; detail: string; detectiveComment: string }>;
  accusationOptions: { id: string; label: string; description: string }[];
  handbookTerms: HandbookTerm[];
  successOutcome: string;
  failureOutcome: string;
}

export interface GameState {
  screen: GameScreen;
  detective: Detective | null;
  hasSeenIntro: boolean;
  currentLevel: number;
  discoveredClues: string[];
  accusationCorrect: boolean | null;
  pendingXP: number;
}
