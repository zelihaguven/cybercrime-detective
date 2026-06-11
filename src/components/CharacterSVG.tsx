import { useId } from 'react';
import type { CharacterAppearance } from '../types/game';

export const SKIN_COLORS = ['#FDDBB4', '#F0BC8A', '#D4956A', '#A0644A', '#6B3320'];
export const HAIR_COLORS = ['#EAC97E', '#6B3A20', '#1A1208', '#B83A2A', '#D0D0D0', '#3A60B8'];
export const OUTFIT_COLORS_HEX = ['#1A2A4A', '#2A2A2A', '#2D3A1E', '#4A1A2A', '#1A1A3A'];
export const OUTFIT_ACCENT_COLORS = ['#5A7EC0', '#8A8A9A', '#6A9A4A', '#C05A7A', '#5A5AC0'];
export const HAIR_STYLE_NAMES = ['Crop', 'Classic', 'Long', 'Slick'];
export const OUTFIT_NAMES = ['Navy', 'Charcoal', 'Olive', 'Burgundy', 'Midnight'];

interface Props {
  appearance: CharacterAppearance;
  size?: number;
}

export default function CharacterSVG({ appearance, size = 80 }: Props) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, 'x');

  const skin = SKIN_COLORS[appearance.skinTone] ?? SKIN_COLORS[2];
  const hair = HAIR_COLORS[appearance.hairColor] ?? HAIR_COLORS[1];
  const outfit = OUTFIT_COLORS_HEX[appearance.outfitColor] ?? OUTFIT_COLORS_HEX[0];

  const r = parseInt(outfit.slice(1, 3), 16);
  const g = parseInt(outfit.slice(3, 5), 16);
  const b = parseInt(outfit.slice(5, 7), 16);
  const highlight = `rgb(${Math.min(255, r + 32)},${Math.min(255, g + 32)},${Math.min(255, b + 32)})`;

  return (
    <svg viewBox="0 0 80 100" width={size} height={size * 1.25} style={{ display: 'block' }}>
      <defs>
        <clipPath id={`hc_${uid}`}>
          <circle cx="40" cy="31" r="19" />
        </clipPath>
      </defs>

      {/* Long hair back panels (style 2 only) */}
      {appearance.hairStyle === 2 && (
        <>
          <rect x="19" y="36" width="7" height="24" rx="3.5" fill={hair} />
          <rect x="54" y="36" width="7" height="24" rx="3.5" fill={hair} />
        </>
      )}

      {/* Ears */}
      <ellipse cx="21.5" cy="33" rx="2.8" ry="4" fill={skin} />
      <ellipse cx="58.5" cy="33" rx="2.8" ry="4" fill={skin} />

      {/* Head */}
      <circle cx="40" cy="31" r="19" fill={skin} />

      {/* Hair (clipped to head) */}
      <g clipPath={`url(#hc_${uid})`}>
        {appearance.hairStyle === 0 && (
          <rect x="21" y="11" width="38" height="9" rx="3" fill={hair} />
        )}
        {appearance.hairStyle === 1 && (
          <ellipse cx="40" cy="18" rx="18" ry="13" fill={hair} />
        )}
        {appearance.hairStyle === 2 && (
          <ellipse cx="40" cy="17" rx="19" ry="14" fill={hair} />
        )}
        {appearance.hairStyle === 3 && (
          <path d="M22 20 Q22 12 40 11 Q58 12 58 20 L56 25 Q48 21 40 22 Q32 21 24 25Z" fill={hair} />
        )}
      </g>

      {/* Eyebrows */}
      <path d="M28 26 Q32 24 36 26" stroke={hair} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M44 26 Q48 24 52 26" stroke={hair} strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* Eye whites */}
      <ellipse cx="32" cy="30" rx="3.2" ry="3.5" fill="white" />
      <ellipse cx="48" cy="30" rx="3.2" ry="3.5" fill="white" />
      {/* Pupils */}
      <circle cx="32" cy="31" r="2.2" fill="#1A1208" />
      <circle cx="48" cy="31" r="2.2" fill="#1A1208" />
      {/* Shine */}
      <circle cx="33" cy="30" r="0.9" fill="white" />
      <circle cx="49" cy="30" r="0.9" fill="white" />

      {/* Nose */}
      <path d="M39 37 L37 41 Q40 43 43 41 L41 37" fill="rgba(0,0,0,0.1)" />

      {/* Mouth */}
      <path d="M33 45 Q40 49 47 45" stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="36" y="49" width="8" height="8" fill={skin} />

      {/* Shirt collar visible */}
      <path d="M30 57 L40 66 L50 57 L47 59 L40 65 L33 59Z" fill="#ECECEC" opacity="0.85" />

      {/* Jacket body */}
      <path d="M8 100 L8 64 L26 57 Q33 62 40 62 Q47 62 54 57 L72 64 L72 100Z" fill={outfit} />

      {/* Lapels */}
      <path d="M26 57 L33 59 L40 66 L40 71 L26 65Z" fill={highlight} opacity="0.38" />
      <path d="M54 57 L47 59 L40 66 L40 71 L54 65Z" fill={highlight} opacity="0.38" />

      {/* Side shadows */}
      <path d="M8 100 L8 64 L20 60 L20 100Z" fill="rgba(0,0,0,0.18)" />
      <path d="M72 100 L72 64 L60 60 L60 100Z" fill="rgba(0,0,0,0.18)" />

      {/* Buttons */}
      <circle cx="40" cy="79" r="1.4" fill="rgba(255,255,255,0.22)" />
      <circle cx="40" cy="87" r="1.4" fill="rgba(255,255,255,0.22)" />
      <circle cx="40" cy="95" r="1.4" fill="rgba(255,255,255,0.22)" />

      {/* Detective badge */}
      <circle cx="28" cy="71" r="4.5" fill="rgba(245,166,35,0.3)" stroke="rgba(245,166,35,0.6)" strokeWidth="1" />
      <circle cx="28" cy="71" r="2.5" fill="rgba(245,166,35,0.55)" />
      <circle cx="28" cy="71" r="1" fill="rgba(255,220,100,0.85)" />
    </svg>
  );
}
