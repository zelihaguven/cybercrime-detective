import type { DetectiveRank } from '../types/game';
import { AVATAR_EMOJIS } from '../data/characters';

const RANK_THRESHOLDS: { xp: number; rank: DetectiveRank }[] = [
  { xp: 0,    rank: 'Junior Investigator' },
  { xp: 200,  rank: 'Cyber Detective' },
  { xp: 500,  rank: 'Senior Investigator' },
  { xp: 1000, rank: 'Cybercrime Specialist' },
  { xp: 2000, rank: 'Chief Investigator' },
];

export function getRank(xp: number): DetectiveRank {
  let rank: DetectiveRank = 'Junior Investigator';
  for (const tier of RANK_THRESHOLDS) {
    if (xp >= tier.xp) rank = tier.rank;
  }
  return rank;
}

export function getRankColor(rank: DetectiveRank): string {
  const colors: Record<DetectiveRank, string> = {
    'Junior Investigator':   '#888888',
    'Cyber Detective':       '#F5A623',
    'Senior Investigator':   '#7ABF6A',
    'Cybercrime Specialist': '#5B8DD9',
    'Chief Investigator':    '#B98FD4',
  };
  return colors[rank];
}

export function getRankProgress(xp: number): { current: number; next: number; progress: number } {
  let currentThreshold = 0;
  let nextThreshold = 200;

  for (let i = 0; i < RANK_THRESHOLDS.length; i++) {
    if (xp >= RANK_THRESHOLDS[i].xp) {
      currentThreshold = RANK_THRESHOLDS[i].xp;
      nextThreshold = RANK_THRESHOLDS[i + 1]?.xp ?? RANK_THRESHOLDS[i].xp + 500;
    }
  }

  const progress = Math.min((xp - currentThreshold) / (nextThreshold - currentThreshold), 1);
  return { current: currentThreshold, next: nextThreshold, progress };
}

export function getDetectiveAvatarEmoji(avatarIndex: number): string {
  return AVATAR_EMOJIS[avatarIndex] ?? '🕵️';
}

export function getRankOrdinal(rank: DetectiveRank): number {
  return RANK_THRESHOLDS.findIndex((t) => t.rank === rank);
}
