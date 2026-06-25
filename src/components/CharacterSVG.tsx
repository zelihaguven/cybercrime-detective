import { useId } from 'react';
import type { CharacterAppearance } from '../types/game';

export const SKIN_COLORS = ['#FDDBB4', '#F0BC8A', '#D4956A', '#A0644A', '#6B3320'];
export const HAIR_COLORS = ['#EAC97E', '#6B3A20', '#1A1208', '#B83A2A', '#D0D0D0', '#3A60B8'];
export const OUTFIT_COLORS_HEX = ['#1A2A4A', '#2A2A2A', '#2D3A1E', '#4A1A2A', '#1A1A3A'];
export const OUTFIT_ACCENT_COLORS = ['#5A7EC0', '#8A8A9A', '#6A9A4A', '#C05A7A', '#5A5AC0'];
export const HAIR_STYLE_NAMES = ['Crop', 'Classic', 'Long', 'Slick', 'Fedora'];
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
  const shadow = `rgb(${Math.max(0, r - 24)},${Math.max(0, g - 24)},${Math.max(0, b - 24)})`;

  const hasHat = appearance.hairStyle === 4;

  return (
    <svg viewBox="0 0 80 100" width={size} height={size * 1.25} style={{ display: 'block' }}>
      <defs>
        <clipPath id={`hc_${uid}`}>
          <circle cx="40" cy="31" r="19" />
        </clipPath>
        <linearGradient id={`hg_${uid}`} x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={highlight} stopOpacity="0.35" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Long hair back panels (style 2 only) */}
      {appearance.hairStyle === 2 && (
        <>
          <rect x="18" y="36" width="8" height="26" rx="4" fill={hair} />
          <rect x="54" y="36" width="8" height="26" rx="4" fill={hair} />
          {/* Ponytail hint */}
          <rect x="37" y="48" width="6" height="12" rx="3" fill={hair} />
        </>
      )}

      {/* Ears */}
      <ellipse cx="21" cy="33" rx="3" ry="4" fill={skin} />
      <ellipse cx="59" cy="33" rx="3" ry="4" fill={skin} />

      {/* Head */}
      <circle cx="40" cy="31" r="19" fill={skin} />

      {/* Hair (clipped to head) */}
      <g clipPath={`url(#hc_${uid})`}>
        {appearance.hairStyle === 0 && (
          <>
            <rect x="21" y="11" width="38" height="9" rx="3" fill={hair} />
            <rect x="21" y="13" width="38" height="5" rx="2" fill={highlight} opacity="0.2" />
          </>
        )}
        {appearance.hairStyle === 1 && (
          <>
            <ellipse cx="40" cy="18" rx="18" ry="13" fill={hair} />
            <ellipse cx="34" cy="14" rx="7" ry="4" fill="rgba(255,255,255,0.08)" />
          </>
        )}
        {appearance.hairStyle === 2 && (
          <>
            <ellipse cx="40" cy="17" rx="19" ry="14" fill={hair} />
            <ellipse cx="33" cy="13" rx="8" ry="4.5" fill="rgba(255,255,255,0.1)" />
          </>
        )}
        {appearance.hairStyle === 3 && (
          <>
            <path d="M22 20 Q22 12 40 11 Q58 12 58 20 L56 25 Q48 21 40 22 Q32 21 24 25Z" fill={hair} />
            <path d="M24 17 Q40 14 56 17 L55 21 Q40 18 25 21Z" fill={highlight} opacity="0.2" />
          </>
        )}
        {appearance.hairStyle === 4 && (
          <>
            {/* Fedora hair — short, neat */}
            <ellipse cx="40" cy="20" rx="17" ry="10" fill={hair} />
            <ellipse cx="35" cy="17" rx="5" ry="2.5" fill="rgba(255,255,255,0.08)" />
          </>
        )}
      </g>

      {/* Fedora hat (style 4) */}
      {hasHat && (
        <>
          {/* Crown */}
          <ellipse cx="40" cy="18" rx="18" ry="12" fill={outfit} />
          <ellipse cx="40" cy="16" rx="15" ry="8" fill={shadow} />
          {/* Band */}
          <rect x="23" y="22" width="34" height="4" rx="1" fill={shadow} opacity="0.6" />
          {/* Brim */}
          <ellipse cx="40" cy="26" rx="24" ry="5" fill={outfit} />
          <ellipse cx="40" cy="26" rx="24" ry="2" fill={highlight} opacity="0.15" />
          {/* Brim shadow on face */}
          <ellipse cx="40" cy="30" rx="16" ry="5" fill="rgba(0,0,0,0.15)" />
        </>
      )}

      {/* Eyebrows — more dramatic, noir style */}
      <path d="M27 26 Q32 23.5 36.5 26" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M43.5 26 Q48 23.5 53 26" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Eye whites — slightly more almond shaped */}
      <ellipse cx="32" cy="30.5" rx="3.4" ry="3.8" fill="white" />
      <ellipse cx="48" cy="30.5" rx="3.4" ry="3.8" fill="white" />
      {/* Pupils */}
      <circle cx="32" cy="31.5" r="2.4" fill="#1A1208" />
      <circle cx="48" cy="31.5" r="2.4" fill="#1A1208" />
      {/* Shine */}
      <circle cx="33.2" cy="29.5" r="1.1" fill="white" />
      <circle cx="49.2" cy="29.5" r="1.1" fill="white" />
      {/* Secondary shine */}
      <circle cx="31" cy="32.5" r="0.6" fill="rgba(255,255,255,0.6)" />
      <circle cx="47" cy="32.5" r="0.6" fill="rgba(255,255,255,0.6)" />

      {/* Eye shadow / intensity */}
      <path d="M27 28.5 Q32 27.5 37 28.5" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" fill="none" />
      <path d="M43 28.5 Q48 27.5 53 28.5" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" fill="none" />

      {/* Nose — more defined */}
      <path d="M39 37.5 L37 41.5 Q40 44 43 41.5 L41 37.5" fill="rgba(0,0,0,0.1)" />
      <path d="M38.5 41 Q40 42 41.5 41" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" fill="none" />

      {/* Mouth — slight confident curve, noir detective */}
      <path d="M33 46.5 Q40 50 47 46.5" stroke="rgba(0,0,0,0.24)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* Mouth line detail */}
      <path d="M40 48.5 L40 49.5" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />

      {/* Chin / jaw shadow */}
      <ellipse cx="40" cy="49" rx="6" ry="2" fill="rgba(0,0,0,0.06)" />

      {/* Neck */}
      <rect x="36" y="49" width="8" height="8" fill={skin} />

      {/* Shirt collar visible — more detailed */}
      <path d="M30 57 L40 66.5 L50 57 L47 59.5 L40 65.5 L33 59.5Z" fill="#ECECEC" opacity="0.85" />
      {/* Tie hint (for fedora style) */}
      {hasHat && (
        <path d="M38.5 62 L40 74 L41.5 62 L40 60Z" fill="#2A3A5A" opacity="0.5" />
      )}

      {/* Jacket body — more structured */}
      <path d="M8 100 L8 64 L26 57 Q33 62.5 40 62.5 Q47 62.5 54 57 L72 64 L72 100Z" fill={outfit} />

      {/* Lapels — more dramatic */}
      <path d="M26 57 L33 59.5 L40 66.5 L40 72.5 L26 65.5Z" fill={highlight} opacity="0.4" />
      <path d="M54 57 L47 59.5 L40 66.5 L40 72.5 L54 65.5Z" fill={highlight} opacity="0.4" />

      {/* Side shadows — deeper */}
      <path d="M8 100 L8 64 L20 60 L20 100Z" fill="rgba(0,0,0,0.22)" />
      <path d="M72 100 L72 64 L60 60 L60 100Z" fill="rgba(0,0,0,0.22)" />

      {/* Shoulder highlight */}
      <path d="M8 64 L18 60 L26 57 L20 62Z" fill={`url(#hg_${uid})`} opacity="0.4" />
      <path d="M72 64 L62 60 L54 57 L60 62Z" fill={`url(#hg_${uid})`} opacity="0.4" />

      {/* Buttons — more defined */}
      <circle cx="40" cy="79" r="1.5" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
      <circle cx="40" cy="87" r="1.5" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
      <circle cx="40" cy="95" r="1.5" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />

      {/* Detective badge — more prominent, especially for fedora */}
      <circle cx="28" cy="71" r="5" fill="rgba(245,166,35,0.25)" stroke="rgba(245,166,35,0.65)" strokeWidth="1" />
      <polygon
        points="28,66 29.5,70.5 34.2,70.5 30.5,73 31.8,77.2 28,74.5 24.2,77.2 25.5,73 21.8,70.5 26.5,70.5"
        fill="rgba(245,166,35,0.7)"
      />
      <circle cx="28" cy="71" r="1.3" fill="rgba(255,220,100,0.85)" />
      {/* Badge shine */}
      <circle cx="26.5" cy="68.5" r="1" fill="rgba(255,255,255,0.2)" />

      {/* Pocket square (fedora style) */}
      {hasHat && (
        <path d="M58 76 L62 72 L65 76 L62 78Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
      )}
    </svg>
  );
}
