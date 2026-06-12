export interface BadgeDef {
  id: string;
  icon: string;
  name: { en: string; de: string };
  desc: { en: string; de: string };
}

export const BADGES: BadgeDef[] = [
  {
    id: 'first-case',
    icon: '🔍',
    name: { en: 'First Steps', de: 'Erste Schritte' },
    desc: { en: 'Solved your first case', de: 'Ersten Fall gelöst' },
  },
  {
    id: 'evidence-collector',
    icon: '📌',
    name: { en: 'Evidence Collector', de: 'Beweissammler' },
    desc: { en: 'Found all required clues in a case', de: 'Alle Pflichthinweise gefunden' },
  },
  {
    id: 'bonus-hunter',
    icon: '🎯',
    name: { en: 'Bonus Hunter', de: 'Bonusjäger' },
    desc: { en: 'Found all bonus clues in a case', de: 'Alle Bonushinweise gefunden' },
  },
  {
    id: 'perfect-case',
    icon: '💎',
    name: { en: 'Perfect Case', de: 'Perfekter Fall' },
    desc: { en: 'Found every single clue in a case', de: 'Jeden Hinweis in einem Fall gefunden' },
  },
  {
    id: 'case-closed',
    icon: '🏆',
    name: { en: 'Case Closed', de: 'Akte geschlossen' },
    desc: { en: 'Completed all solo cases', de: 'Alle Solo-Fälle abgeschlossen' },
  },
  {
    id: 'specialist',
    icon: '⭐',
    name: { en: 'Cybercrime Specialist', de: 'Cybercrime-Spezialist' },
    desc: { en: 'Reached 1000 XP', de: '1000 XP erreicht' },
  },
  {
    id: 'chief',
    icon: '👑',
    name: { en: 'Chief Investigator', de: 'Chefermittler' },
    desc: { en: 'Reached 2000 XP', de: '2000 XP erreicht' },
  },
];

export function getBadge(id: string): BadgeDef | undefined {
  return BADGES.find((b) => b.id === id);
}

export function checkNewBadges(params: {
  correct: boolean;
  foundAll: boolean;
  foundAllBonus: boolean;
  newXP: number;
  newCompletedSoloCases: number[];
  totalSoloCases: number;
  alreadyEarned: string[];
}): string[] {
  const { correct, foundAll, foundAllBonus, newXP, newCompletedSoloCases, totalSoloCases, alreadyEarned } = params;
  const earned = new Set(alreadyEarned);
  const newBadges: string[] = [];

  const maybeEarn = (id: string) => {
    if (!earned.has(id)) newBadges.push(id);
  };

  // Clue-finding badges — regardless of accusation correctness
  if (foundAll) maybeEarn('evidence-collector');
  if (foundAllBonus) maybeEarn('bonus-hunter');
  if (foundAll && foundAllBonus) maybeEarn('perfect-case');

  // Progression badges — only on correct accusation
  if (correct) {
    if (newCompletedSoloCases.length === 1) maybeEarn('first-case');
    if (newCompletedSoloCases.length >= totalSoloCases) maybeEarn('case-closed');
    if (newXP >= 1000) maybeEarn('specialist');
    if (newXP >= 2000) maybeEarn('chief');
  }

  return newBadges;
}
