import { useId } from 'react';

// ── Weber — senior detective, wire glasses, navy suit, star badge ──
export function WeberSVG({ size = 80 }: { size?: number }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, 'x');

  const SKIN = '#C07858';
  const HAIR = '#1C1208';
  const GREY = '#6A6870';
  const OUTFIT = '#1A2A4A';
  const LAPEL = '#263852';

  return (
    <svg viewBox="0 0 80 100" width={size} height={size * 1.25} style={{ display: 'block' }}>
      <defs>
        <clipPath id={`wh_${uid}`}><circle cx="40" cy="31" r="19" /></clipPath>
      </defs>

      {/* Ears */}
      <ellipse cx="21.5" cy="33" rx="2.8" ry="4" fill={SKIN} />
      <ellipse cx="58.5" cy="33" rx="2.8" ry="4" fill={SKIN} />

      {/* Head */}
      <circle cx="40" cy="31" r="19" fill={SKIN} />

      {/* Cheek shadows — slight age/definition */}
      <ellipse cx="27" cy="38" rx="4" ry="3" fill="rgba(0,0,0,0.07)" />
      <ellipse cx="53" cy="38" rx="4" ry="3" fill="rgba(0,0,0,0.07)" />

      {/* Hair — clipped short, dark with grey temples */}
      <g clipPath={`url(#wh_${uid})`}>
        <ellipse cx="40" cy="18" rx="18" ry="13" fill={HAIR} />
        {/* Grey temples */}
        <ellipse cx="24" cy="25" rx="4" ry="5" fill={GREY} opacity="0.7" />
        <ellipse cx="56" cy="25" rx="4" ry="5" fill={GREY} opacity="0.7" />
      </g>

      {/* Beard stubble — lower jaw */}
      <path d="M22 38 Q21 50 40 53 Q59 50 58 38 Q52 47 40 48 Q28 47 22 38Z"
        fill={HAIR} opacity="0.6" clipPath={`url(#wh_${uid})`} />

      {/* Mustache */}
      <path d="M33 42 Q37 40 40 41 Q43 40 47 42"
        stroke={HAIR} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.8" />

      {/* Eyebrows — thick, slightly furrowed inward */}
      <path d="M26 25.5 Q30 22.5 35 24.5" stroke={HAIR} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M45 24.5 Q50 22.5 54 25.5" stroke={HAIR} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* Furrow lines between brows */}
      <line x1="38.5" y1="24" x2="38" y2="27" stroke="rgba(0,0,0,0.13)" strokeWidth="1" />
      <line x1="41.5" y1="24" x2="42" y2="27" stroke="rgba(0,0,0,0.13)" strokeWidth="1" />

      {/* Wire glasses — thin rectangular frames */}
      <rect x="25.5" y="27.5" width="12" height="7.5" rx="1.5" fill="rgba(100,120,180,0.06)"
        stroke="#4A5070" strokeWidth="1.1" opacity="0.85" />
      <rect x="42.5" y="27.5" width="12" height="7.5" rx="1.5" fill="rgba(100,120,180,0.06)"
        stroke="#4A5070" strokeWidth="1.1" opacity="0.85" />
      <line x1="37.5" y1="31.5" x2="42.5" y2="31.5" stroke="#4A5070" strokeWidth="1.1" opacity="0.85" />
      <line x1="25.5" y1="31.5" x2="21.5" y2="30.5" stroke="#4A5070" strokeWidth="0.9" opacity="0.6" />
      <line x1="54.5" y1="31.5" x2="58.5" y2="30.5" stroke="#4A5070" strokeWidth="0.9" opacity="0.6" />

      {/* Eyes — behind glasses */}
      <ellipse cx="31.5" cy="31.5" rx="2.8" ry="3" fill="white" />
      <ellipse cx="48.5" cy="31.5" rx="2.8" ry="3" fill="white" />
      <circle cx="31.5" cy="32" r="1.9" fill="#1E1810" />
      <circle cx="48.5" cy="32" r="1.9" fill="#1E1810" />
      <circle cx="32.3" cy="31.2" r="0.8" fill="white" />
      <circle cx="49.3" cy="31.2" r="0.8" fill="white" />

      {/* Nose */}
      <path d="M39 36 L37 40 Q40 42 43 40 L41 36" fill="rgba(0,0,0,0.1)" />

      {/* Mouth — firm neutral line */}
      <path d="M34 46 Q40 47.5 46 46" stroke="rgba(0,0,0,0.25)" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="36" y="49" width="8" height="9" fill={SKIN} />

      {/* Shirt & tie */}
      <path d="M30 57 L40 66 L50 57 L47 59 L40 65 L33 59Z" fill="#E0E2EA" opacity="0.9" />
      <path d="M38.5 62 L40 73 L41.5 62 L40 60Z" fill="#2B4A7A" opacity="0.85" />
      <path d="M37.5 62 L36.5 65.5 L40 66.5 L43.5 65.5 L42.5 62 L40 63.5Z" fill="#3A5A8A" opacity="0.65" />

      {/* Jacket body */}
      <path d="M8 100 L8 64 L26 57 Q33 62 40 62 Q47 62 54 57 L72 64 L72 100Z" fill={OUTFIT} />

      {/* Lapels */}
      <path d="M26 57 L33 59 L40 66 L40 71 L26 65Z" fill={LAPEL} opacity="0.5" />
      <path d="M54 57 L47 59 L40 66 L40 71 L54 65Z" fill={LAPEL} opacity="0.5" />

      {/* Side shadows */}
      <path d="M8 100 L8 64 L20 60 L20 100Z" fill="rgba(0,0,0,0.2)" />
      <path d="M72 100 L72 64 L60 60 L60 100Z" fill="rgba(0,0,0,0.2)" />

      {/* Buttons */}
      <circle cx="40" cy="79" r="1.3" fill="rgba(255,255,255,0.2)" />
      <circle cx="40" cy="87" r="1.3" fill="rgba(255,255,255,0.2)" />
      <circle cx="40" cy="95" r="1.3" fill="rgba(255,255,255,0.2)" />

      {/* Star badge — prominent */}
      <circle cx="28" cy="71" r="5.5" fill="rgba(245,166,35,0.22)" stroke="rgba(245,166,35,0.65)" strokeWidth="1" />
      {/* Star polygon */}
      <polygon
        points="28,65.8 29.3,69.8 33.6,69.8 30.2,72.2 31.5,76.2 28,73.6 24.5,76.2 25.8,72.2 22.4,69.8 26.7,69.8"
        fill="rgba(245,166,35,0.7)"
      />
      <circle cx="28" cy="71" r="1.4" fill="rgba(255,220,100,0.9)" />
    </svg>
  );
}

// ── Mia — tech analyst, round glasses, bright blonde, tablet, teal ──
export function MiaSVG({ size = 80 }: { size?: number }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, 'x');

  const SKIN = '#F5C898';
  const HAIR = '#E8B030';
  const OUTFIT = '#1E4040';
  const LAPEL = '#2A5858';

  return (
    <svg viewBox="0 0 80 100" width={size} height={size * 1.25} style={{ display: 'block' }}>
      <defs>
        <clipPath id={`mh_${uid}`}><circle cx="40" cy="31" r="19" /></clipPath>
      </defs>

      {/* Long hair — back panels, bright golden */}
      <rect x="18" y="36" width="8" height="28" rx="4" fill={HAIR} />
      <rect x="54" y="36" width="8" height="28" rx="4" fill={HAIR} />

      {/* Ears */}
      <ellipse cx="21.5" cy="33" rx="2.8" ry="4" fill={SKIN} />
      <ellipse cx="58.5" cy="33" rx="2.8" ry="4" fill={SKIN} />

      {/* Head */}
      <circle cx="40" cy="31" r="19" fill={SKIN} />

      {/* Hair — clipped top, vivid golden */}
      <g clipPath={`url(#mh_${uid})`}>
        <ellipse cx="40" cy="17" rx="19" ry="14" fill={HAIR} />
        {/* Hair shine */}
        <ellipse cx="34" cy="14" rx="7" ry="4.5" fill="rgba(255,245,180,0.22)" />
      </g>

      {/* Eyebrows — fine, arched high (curious/energetic) */}
      <path d="M27.5 24 Q31.5 20.5 36 23" stroke={HAIR} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M44 23 Q48.5 20.5 52.5 24" stroke={HAIR} strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Large round glasses — prominent */}
      <circle cx="32" cy="31" r="5.5" fill="rgba(60,100,180,0.07)" stroke="#2A2A5A" strokeWidth="1.6" opacity="0.9" />
      <circle cx="48" cy="31" r="5.5" fill="rgba(60,100,180,0.07)" stroke="#2A2A5A" strokeWidth="1.6" opacity="0.9" />
      <line x1="37.5" y1="31" x2="42.5" y2="31" stroke="#2A2A5A" strokeWidth="1.6" opacity="0.9" />
      <line x1="26.5" y1="31" x2="22" y2="29.5" stroke="#2A2A5A" strokeWidth="1.3" opacity="0.65" />
      <line x1="53.5" y1="31" x2="58" y2="29.5" stroke="#2A2A5A" strokeWidth="1.3" opacity="0.65" />

      {/* Eyes — bright blue, expressive */}
      <ellipse cx="32" cy="31" rx="2.9" ry="3.1" fill="white" />
      <ellipse cx="48" cy="31" rx="2.9" ry="3.1" fill="white" />
      <circle cx="32" cy="31.5" r="2.1" fill="#2A5A9A" />
      <circle cx="32" cy="31.5" r="1.2" fill="#1A1208" />
      <circle cx="48" cy="31.5" r="2.1" fill="#2A5A9A" />
      <circle cx="48" cy="31.5" r="1.2" fill="#1A1208" />
      {/* Eye shine */}
      <circle cx="33" cy="30.5" r="0.9" fill="white" />
      <circle cx="49" cy="30.5" r="0.9" fill="white" />

      {/* Nose — small */}
      <path d="M39.5 37 L38 40 Q40 41.5 42 40 L40.5 37" fill="rgba(0,0,0,0.08)" />

      {/* Big smile — showing happiness */}
      <path d="M33 44.5 Q40 50.5 47 44.5"
        stroke="rgba(0,0,0,0.22)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* Smile cheek blush */}
      <ellipse cx="27" cy="43" rx="4" ry="2.5" fill="rgba(220,120,120,0.12)" />
      <ellipse cx="53" cy="43" rx="4" ry="2.5" fill="rgba(220,120,120,0.12)" />

      {/* Neck */}
      <rect x="36" y="49" width="8" height="8" fill={SKIN} />

      {/* Collar */}
      <path d="M30 57 L40 64 L50 57 L47 59 L40 63 L33 59Z" fill="#E8EEF0" opacity="0.9" />

      {/* Jacket body */}
      <path d="M8 100 L8 64 L26 57 Q33 62 40 62 Q47 62 54 57 L72 64 L72 100Z" fill={OUTFIT} />

      {/* Lapels */}
      <path d="M26 57 L33 59 L40 64 L40 70 L26 65Z" fill={LAPEL} opacity="0.5" />
      <path d="M54 57 L47 59 L40 64 L40 70 L54 65Z" fill={LAPEL} opacity="0.5" />

      {/* Side shadows */}
      <path d="M8 100 L8 64 L20 60 L20 100Z" fill="rgba(0,0,0,0.16)" />
      <path d="M72 100 L72 64 L60 60 L60 100Z" fill="rgba(0,0,0,0.16)" />

      {/* Tablet held at chest — centered */}
      <rect x="26" y="74" width="28" height="22" rx="2.5" fill="#0A141E" stroke="rgba(80,160,220,0.5)" strokeWidth="1.2" />
      <rect x="28" y="76" width="24" height="16" rx="1.5" fill="#070E18" />
      {/* Screen glow + content */}
      <rect x="28" y="76" width="24" height="16" rx="1.5" fill="rgba(80,160,220,0.07)" />
      <rect x="30" y="78" width="12" height="1.8" rx="0.6" fill="rgba(100,180,255,0.5)" />
      <rect x="30" y="81" width="18" height="1.2" rx="0.5" fill="rgba(100,180,255,0.28)" />
      <rect x="30" y="83.5" width="14" height="1.2" rx="0.5" fill="rgba(100,180,255,0.22)" />
      <rect x="30" y="86" width="10" height="1.2" rx="0.5" fill="rgba(100,180,255,0.18)" />
      {/* Home bar */}
      <rect x="36" y="93" width="8" height="1.5" rx="0.7" fill="rgba(80,160,220,0.3)" />

      {/* Arms framing tablet */}
      <path d="M8 100 L8 80 L26 74 L26 100Z" fill={OUTFIT} />
      <path d="M72 100 L72 80 L54 74 L54 100Z" fill={OUTFIT} />
    </svg>
  );
}
