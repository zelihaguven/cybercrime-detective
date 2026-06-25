import { useId } from 'react';

// ═════════════════════════════════════════════════════════════════════════════
//  IMAGE-BASED PORTRAIT COMPONENTS
//  Drop PNG files (transparent bg recommended) into /public/characters/
//  weber.png · mia.png · jonas.png
// ═════════════════════════════════════════════════════════════════════════════

interface PortraitProps {
  size?: number;
  glowColor?: string;
}

function CharacterPortrait({
  src,
  alt,
  size = 80,
  glowColor = 'rgba(91,141,217,0.3)',
}: PortraitProps & { src: string; alt: string }) {
  const h = Math.round(size * 1.5);
  return (
    <div
      style={{
        width: size,
        height: h,
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'top center',
          filter: `drop-shadow(0 6px 24px ${glowColor})`,
          display: 'block',
        }}
        draggable={false}
      />
      {/* Bottom vignette — blends character feet into the dark scene floor */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '28%',
          background: 'linear-gradient(to top, rgba(6,7,14,1) 0%, rgba(6,7,14,0) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export function WeberPortrait({ size = 80 }: PortraitProps) {
  return (
    <CharacterPortrait
      src="/characters/weber.png"
      alt="Chief Inspector Weber"
      size={size}
      glowColor="rgba(91,141,217,0.35)"
    />
  );
}

export function MiaPortrait({ size = 80 }: PortraitProps) {
  return (
    <CharacterPortrait
      src="/characters/mia.png"
      alt="Analyst Mia"
      size={size}
      glowColor="rgba(122,191,106,0.3)"
    />
  );
}

export function JonasPortrait({ size = 80 }: PortraitProps) {
  return (
    <CharacterPortrait
      src="/characters/jonas.png"
      alt="Officer Jonas"
      size={size}
      glowColor="rgba(212,160,112,0.3)"
    />
  );
}


// ═════════════════════════════════════════════════════════════════════════════
//  WEBER — Chief Inspector, Cybercrime Division
//  Grey commanding presence. Wire-rim glasses, salt-and-pepper stubble,
//  navy trench coat drape, weathered stern expression. Star badge glints.
// ═════════════════════════════════════════════════════════════════════════════
export function WeberSVG({ size = 80 }: { size?: number }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, 'x');

  const SKIN = '#C07858';
  const HAIR = '#1A1410';
  const GREY = '#7A7880';
  const COAT = '#152238';
  const COAT_LIGHT = '#1E3250';
  const SHIRT = '#E8EAF0';
  const TIE = '#2B4A7A';

  return (
    <svg viewBox="0 0 80 100" width={size} height={size * 1.25} style={{ display: 'block' }}>
      <defs>
        <clipPath id={`wh_${uid}`}><circle cx="40" cy="31" r="19.5" /></clipPath>
        <linearGradient id={`wg_${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Coat collar / shoulders background */}
      <path d="M6 100 L6 66 L24 58 Q33 64 40 64 Q47 64 56 58 L74 66 L74 100Z" fill={COAT} />
      <path d="M6 100 L6 66 L18 62 L18 100Z" fill="rgba(0,0,0,0.25)" />
      <path d="M74 100 L74 66 L62 62 L62 100Z" fill="rgba(0,0,0,0.25)" />

      {/* Coat lapels — sharp, authoritative */}
      <path d="M24 58 L33 60 L40 68 L40 74 L24 67Z" fill={COAT_LIGHT} opacity="0.45" />
      <path d="M56 58 L47 60 L40 68 L40 74 L56 67Z" fill={COAT_LIGHT} opacity="0.45" />

      {/* Shirt & tie */}
      <path d="M30 58 L40 67 L50 58 L47 60 L40 66 L33 60Z" fill={SHIRT} opacity="0.9" />
      <path d="M38.5 63 L40 75 L41.5 63 L40 61Z" fill={TIE} opacity="0.85" />
      <path d="M37.5 63 L36.5 67 L40 68 L43.5 67 L42.5 63 L40 64.5Z" fill="#3A5A8A" opacity="0.5" />

      {/* Neck */}
      <rect x="35.5" y="49" width="9" height="10" fill={SKIN} />

      {/* Head */}
      <circle cx="40" cy="31" r="19.5" fill={SKIN} />

      {/* Ears */}
      <ellipse cx="21" cy="33" rx="3" ry="4.2" fill={SKIN} />
      <ellipse cx="59" cy="33" rx="3" ry="4.2" fill={SKIN} />

      {/* Age lines / cheek shadows */}
      <ellipse cx="27" cy="38.5" rx="4.5" ry="3.2" fill="rgba(0,0,0,0.08)" />
      <ellipse cx="53" cy="38.5" rx="4.5" ry="3.2" fill="rgba(0,0,0,0.08)" />

      {/* Hair — clipped short, dark with prominent grey temples */}
      <g clipPath={`url(#wh_${uid})`}>
        <ellipse cx="40" cy="17.5" rx="19.5" ry="14" fill={HAIR} />
        {/* Grey temples — prominent */}
        <ellipse cx="23.5" cy="24" rx="5" ry="6" fill={GREY} opacity="0.85" />
        <ellipse cx="56.5" cy="24" rx="5" ry="6" fill={GREY} opacity="0.85" />
        {/* Top sheen */}
        <ellipse cx="35" cy="14" rx="6" ry="3.5" fill="rgba(255,255,255,0.08)" />
      </g>

      {/* Beard stubble — heavy, commanding jaw */}
      <path d="M21 37 Q20 51 40 54.5 Q60 51 59 37 Q53 47 40 49 Q27 47 21 37Z"
        fill={HAIR} opacity="0.55" clipPath={`url(#wh_${uid})`} />

      {/* Mustache — thick, well-groomed */}
      <path d="M32 43.5 Q37 41.5 40 42.5 Q43 41.5 48 43.5"
        stroke={HAIR} strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.85" />

      {/* Eyebrows — heavy, slightly furrowed (stern) */}
      <path d="M25 25 Q30 22.5 35.5 24.5" stroke={HAIR} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M44.5 24.5 Q50 22.5 55 25" stroke={HAIR} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* Furrow lines between brows — deep */}
      <line x1="38.5" y1="23.5" x2="37.8" y2="27.5" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" />
      <line x1="41.5" y1="23.5" x2="42.2" y2="27.5" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" />
      {/* Forehead line */}
      <path d="M33 20 Q40 18 47 20" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none" />

      {/* Wire glasses — thin, rectangular, prominent */}
      <rect x="25" y="27.5" width="12.5" height="8" rx="1.8" fill="rgba(100,120,180,0.05)"
        stroke="#4A5070" strokeWidth="1.2" opacity="0.9" />
      <rect x="42.5" y="27.5" width="12.5" height="8" rx="1.8" fill="rgba(100,120,180,0.05)"
        stroke="#4A5070" strokeWidth="1.2" opacity="0.9" />
      <line x1="37.5" y1="31.5" x2="42.5" y2="31.5" stroke="#4A5070" strokeWidth="1.2" opacity="0.9" />
      <line x1="25" y1="31.5" x2="21" y2="30.5" stroke="#4A5070" strokeWidth="1" opacity="0.6" />
      <line x1="55" y1="31.5" x2="59" y2="30.5" stroke="#4A5070" strokeWidth="1" opacity="0.6" />
      {/* Glasses glint */}
      <line x1="27" y1="29" x2="31" y2="30.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      <line x1="44.5" y1="29" x2="48.5" y2="30.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />

      {/* Eyes — sharp, slightly narrowed (skeptical) */}
      <ellipse cx="31.5" cy="31.5" rx="3" ry="3.2" fill="white" />
      <ellipse cx="48.5" cy="31.5" rx="3" ry="3.2" fill="white" />
      <circle cx="31.5" cy="32" r="2" fill="#1E1810" />
      <circle cx="48.5" cy="32" r="2" fill="#1E1810" />
      <circle cx="32.3" cy="31.2" r="0.9" fill="white" />
      <circle cx="49.3" cy="31.2" r="0.9" fill="white" />
      {/* Eye bags — age */}
      <path d="M28 35.5 Q31.5 37.5 35 35.5" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" fill="none" />
      <path d="M45 35.5 Q48.5 37.5 52 35.5" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" fill="none" />

      {/* Nose — strong, defined */}
      <path d="M39 36 L36.5 40.5 Q40 43 43.5 40.5 L41 36" fill="rgba(0,0,0,0.12)" />
      <path d="M38 40 Q40 41.5 42 40" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" fill="none" />

      {/* Mouth — firm, neutral, slightly downturned */}
      <path d="M34 47 Q40 48.5 46 47" stroke="rgba(0,0,0,0.28)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Mouth corner lines */}
      <path d="M33 46.5 Q34 47.5 34.5 48" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" fill="none" />
      <path d="M47 46.5 Q46 47.5 45.5 48" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" fill="none" />

      {/* Coat buttons — brass */}
      <circle cx="40" cy="80" r="1.5" fill="rgba(200,170,90,0.35)" stroke="rgba(200,170,90,0.5)" strokeWidth="0.5" />
      <circle cx="40" cy="88" r="1.5" fill="rgba(200,170,90,0.35)" stroke="rgba(200,170,90,0.5)" strokeWidth="0.5" />
      <circle cx="40" cy="96" r="1.5" fill="rgba(200,170,90,0.35)" stroke="rgba(200,170,90,0.5)" strokeWidth="0.5" />

      {/* Star badge — commanding, prominent */}
      <circle cx="27.5" cy="72" r="6" fill="rgba(245,166,35,0.18)" stroke="rgba(245,166,35,0.7)" strokeWidth="1" />
      <polygon
        points="27.5,66.5 28.9,70.8 33.5,70.8 29.8,73.5 31.1,77.8 27.5,75.2 23.9,77.8 25.2,73.5 21.5,70.8 26.1,70.8"
        fill="rgba(245,166,35,0.75)"
      />
      <circle cx="27.5" cy="72" r="1.6" fill="rgba(255,230,120,0.9)" />
      {/* Badge glint */}
      <circle cx="26" cy="69.5" r="1.2" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
//  MIA — Digital Forensics Analyst
//  Bright, modern, sharp-eyed. Long blonde ponytail, oversized round glasses,
//  teal jacket, always holding a tablet. Energetic, curious expression.
// ═════════════════════════════════════════════════════════════════════════════
export function MiaSVG({ size = 80 }: { size?: number }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, 'x');

  const SKIN = '#F5C898';
  const HAIR = '#E8B030';
  const HAIR_SHADOW = '#C49020';
  const OUTFIT = '#1E4040';
  const OUTFIT_LIGHT = '#2A5858';
  const SCREEN_GLOW = '#80A0F0';

  return (
    <svg viewBox="0 0 80 100" width={size} height={size * 1.25} style={{ display: 'block' }}>
      <defs>
        <clipPath id={`mh_${uid}`}><circle cx="40" cy="31" r="19.5" /></clipPath>
        <linearGradient id={`ms_${uid}`} x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={SCREEN_GLOW} stopOpacity="0.15" />
          <stop offset="100%" stopColor={SCREEN_GLOW} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Long hair — back panels, bright golden, dynamic */}
      <rect x="17.5" y="35" width="8.5" height="30" rx="4" fill={HAIR} />
      <rect x="54" y="35" width="8.5" height="30" rx="4" fill={HAIR} />
      {/* Ponytail base hint */}
      <ellipse cx="40" cy="52" rx="5" ry="3" fill={HAIR_SHADOW} />
      <rect x="37" y="48" width="6" height="14" rx="3" fill={HAIR} />

      {/* Ears */}
      <ellipse cx="21" cy="33" rx="3" ry="4.2" fill={SKIN} />
      <ellipse cx="59" cy="33" rx="3" ry="4.2" fill={SKIN} />

      {/* Head */}
      <circle cx="40" cy="31" r="19.5" fill={SKIN} />

      {/* Hair — clipped top, vivid golden with volume */}
      <g clipPath={`url(#mh_${uid})`}>
        <ellipse cx="40" cy="16.5" rx="19.5" ry="14.5" fill={HAIR} />
        {/* Hair shine */}
        <ellipse cx="33" cy="13" rx="8" ry="5" fill="rgba(255,245,180,0.28)" />
        <ellipse cx="46" cy="15" rx="4" ry="2.5" fill="rgba(255,245,180,0.15)" />
      </g>

      {/* Eyebrows — fine, arched high (curious/energetic) */}
      <path d="M27 23.5 Q31.5 19.5 36.5 22.5" stroke={HAIR_SHADOW} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M43.5 22.5 Q48.5 19.5 53 23.5" stroke={HAIR_SHADOW} strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* Large round glasses — prominent, modern */}
      <circle cx="32" cy="31.5" r="6" fill="rgba(60,100,180,0.06)" stroke="#2A2A5A" strokeWidth="1.8" opacity="0.95" />
      <circle cx="48" cy="31.5" r="6" fill="rgba(60,100,180,0.06)" stroke="#2A2A5A" strokeWidth="1.8" opacity="0.95" />
      <line x1="38" y1="31.5" x2="42" y2="31.5" stroke="#2A2A5A" strokeWidth="1.8" opacity="0.95" />
      <line x1="26" y1="31.5" x2="21" y2="29.5" stroke="#2A2A5A" strokeWidth="1.4" opacity="0.7" />
      <line x1="54" y1="31.5" x2="59" y2="29.5" stroke="#2A2A5A" strokeWidth="1.4" opacity="0.7" />
      {/* Glasses glint */}
      <ellipse cx="28" cy="28.5" rx="2" ry="1.2" fill="rgba(255,255,255,0.35)" transform="rotate(-15 28 28.5)" />
      <ellipse cx="44" cy="28.5" rx="2" ry="1.2" fill="rgba(255,255,255,0.35)" transform="rotate(-15 44 28.5)" />

      {/* Eyes — bright blue, expressive, slightly wide */}
      <ellipse cx="32" cy="31.5" rx="3.2" ry="3.4" fill="white" />
      <ellipse cx="48" cy="31.5" rx="3.2" ry="3.4" fill="white" />
      <circle cx="32" cy="32" r="2.3" fill="#2A5A9A" />
      <circle cx="32" cy="32" r="1.3" fill="#1A1208" />
      <circle cx="48" cy="32" r="2.3" fill="#2A5A9A" />
      <circle cx="48" cy="32" r="1.3" fill="#1A1208" />
      {/* Eye shine — bright */}
      <circle cx="33.2" cy="30.5" r="1" fill="white" />
      <circle cx="49.2" cy="30.5" r="1" fill="white" />
      <circle cx="31.2" cy="33" r="0.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="47.2" cy="33" r="0.5" fill="rgba(255,255,255,0.5)" />

      {/* Nose — small, upturned slightly */}
      <path d="M39.5 37.5 L38 40.5 Q40 42 42 40.5 L40.5 37.5" fill="rgba(0,0,0,0.08)" />

      {/* Big smile — showing enthusiasm */}
      <path d="M33 45 Q40 51.5 47 45"
        stroke="rgba(0,0,0,0.22)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Smile dimple lines */}
      <path d="M32 45 Q31 46.5 32.5 47.5" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" fill="none" />
      <path d="M48 45 Q49 46.5 47.5 47.5" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" fill="none" />

      {/* Smile cheek blush — stronger */}
      <ellipse cx="26.5" cy="43.5" rx="4.5" ry="3" fill="rgba(220,100,100,0.14)" />
      <ellipse cx="53.5" cy="43.5" rx="4.5" ry="3" fill="rgba(220,100,100,0.14)" />

      {/* Neck */}
      <rect x="36" y="49" width="8" height="8" fill={SKIN} />

      {/* Collar — modern */}
      <path d="M30 57 L40 64.5 L50 57 L47 59 L40 63.5 L33 59Z" fill="#E8EEF0" opacity="0.9" />

      {/* Jacket body */}
      <path d="M8 100 L8 64 L26 57 Q33 62.5 40 62.5 Q47 62.5 54 57 L72 64 L72 100Z" fill={OUTFIT} />

      {/* Lapels */}
      <path d="M26 57 L33 59 L40 64.5 L40 70.5 L26 65.5Z" fill={OUTFIT_LIGHT} opacity="0.5" />
      <path d="M54 57 L47 59 L40 64.5 L40 70.5 L54 65.5Z" fill={OUTFIT_LIGHT} opacity="0.5" />

      {/* Side shadows */}
      <path d="M8 100 L8 64 L20 60 L20 100Z" fill="rgba(0,0,0,0.18)" />
      <path d="M72 100 L72 64 L60 60 L60 100Z" fill="rgba(0,0,0,0.18)" />

      {/* Jacket buttons */}
      <circle cx="40" cy="79" r="1.4" fill="rgba(255,255,255,0.18)" />
      <circle cx="40" cy="87" r="1.4" fill="rgba(255,255,255,0.18)" />
      <circle cx="40" cy="95" r="1.4" fill="rgba(255,255,255,0.18)" />

      {/* Tablet held at chest — centered, glowing */}
      <rect x="25" y="73" width="30" height="24" rx="3" fill="#0A141E" stroke="rgba(80,160,220,0.55)" strokeWidth="1.4" />
      <rect x="27" y="75" width="26" height="18" rx="2" fill="#070E18" />
      {/* Screen glow + content */}
      <rect x="27" y="75" width="26" height="18" rx="2" fill={`url(#ms_${uid})`} />
      {/* Code lines on screen */}
      <rect x="29" y="77.5" width="14" height="2" rx="1" fill="rgba(100,180,255,0.55)" />
      <rect x="29" y="81" width="20" height="1.4" rx="0.7" fill="rgba(100,180,255,0.3)" />
      <rect x="29" y="84" width="16" height="1.4" rx="0.7" fill="rgba(100,180,255,0.24)" />
      <rect x="29" y="87" width="12" height="1.4" rx="0.7" fill="rgba(100,180,255,0.18)" />
      <rect x="29" y="90" width="8" height="1.4" rx="0.7" fill="rgba(100,180,255,0.12)" />
      {/* Home bar */}
      <rect x="35" y="92.5" width="10" height="1.5" rx="0.7" fill="rgba(80,160,220,0.35)" />
      {/* Screen corner glow */}
      <circle cx="28" cy="76" r="1.5" fill="rgba(100,180,255,0.4)" />

      {/* Arms framing tablet */}
      <path d="M8 100 L8 80 L25 74 L25 100Z" fill={OUTFIT} />
      <path d="M72 100 L72 80 L55 74 L55 100Z" fill={OUTFIT} />
      {/* Hand hints */}
      <ellipse cx="26" cy="76" rx="2" ry="3" fill={SKIN} opacity="0.8" />
      <ellipse cx="54" cy="76" rx="2" ry="3" fill={SKIN} opacity="0.8" />
    </svg>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
//  JONAS — Field Evidence Officer
//  Young, energetic, sharp. Modern textured hair, bomber jacket, camera
//  around neck, alert eyes. Always ready to move.
// ═════════════════════════════════════════════════════════════════════════════
export function JonasSVG({ size = 80 }: { size?: number }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, 'x');

  const SKIN = '#E8B892';
  const HAIR = '#2A1A0E';
  const JACKET = '#3A2820';
  const JACKET_LIGHT = '#4A3828';
  const SHIRT = '#D0D8E0';
  const ACCENT = '#C07848';

  return (
    <svg viewBox="0 0 80 100" width={size} height={size * 1.25} style={{ display: 'block' }}>
      <defs>
        <clipPath id={`jh_${uid}`}><circle cx="40" cy="31" r="19.5" /></clipPath>
      </defs>

      {/* Ears */}
      <ellipse cx="21" cy="33" rx="3" ry="4.2" fill={SKIN} />
      <ellipse cx="59" cy="33" rx="3" ry="4.2" fill={SKIN} />

      {/* Head */}
      <circle cx="40" cy="31" r="19.5" fill={SKIN} />

      {/* Hair — modern textured, swept up, voluminous */}
      <g clipPath={`url(#jh_${uid})`}>
        <ellipse cx="40" cy="17" rx="19.5" ry="14.5" fill={HAIR} />
        {/* Texture spikes */}
        <path d="M22 20 L24 12 L28 18 L32 10 L36 17 L40 9 L44 17 L48 11 L52 19 L56 13 L58 21Z" fill={HAIR} />
        {/* Highlights */}
        <ellipse cx="34" cy="13" rx="5" ry="2.5" fill="rgba(255,255,255,0.08)" />
        <ellipse cx="46" cy="14" rx="3" ry="1.5" fill="rgba(255,255,255,0.06)" />
      </g>

      {/* Eyebrows — raised, alert */}
      <path d="M27 24.5 Q32 22 36.5 24" stroke={HAIR} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M43.5 24 Q48 22 53 24.5" stroke={HAIR} strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Eyes — sharp, attentive, slightly wide */}
      <ellipse cx="32" cy="30.5" rx="3.2" ry="3.5" fill="white" />
      <ellipse cx="48" cy="30.5" rx="3.2" ry="3.5" fill="white" />
      <circle cx="32" cy="31.2" r="2.2" fill="#1A1208" />
      <circle cx="48" cy="31.2" r="2.2" fill="#1A1208" />
      {/* Eye shine */}
      <circle cx="33.2" cy="29.8" r="1" fill="white" />
      <circle cx="49.2" cy="29.8" r="1" fill="white" />
      <circle cx="31.2" cy="32.2" r="0.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="47.2" cy="32.2" r="0.5" fill="rgba(255,255,255,0.5)" />

      {/* Nose */}
      <path d="M39.5 36.5 L38 40.5 Q40 42.5 42 40.5 L40.5 36.5" fill="rgba(0,0,0,0.1)" />

      {/* Mouth — slight confident smirk */}
      <path d="M33 46 Q38 48.5 42 47 Q45 46.5 47 46" stroke="rgba(0,0,0,0.22)" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* Light stubble — young */}
      <path d="M24 40 Q24 48 40 50.5 Q56 48 56 40 Q52 46 40 47.5 Q28 46 24 40Z"
        fill={HAIR} opacity="0.2" clipPath={`url(#jh_${uid})`} />

      {/* Neck */}
      <rect x="36" y="49" width="8" height="8" fill={SKIN} />

      {/* Shirt collar */}
      <path d="M30 57 L40 65 L50 57 L47 59 L40 64 L33 59Z" fill={SHIRT} opacity="0.85" />

      {/* Bomber jacket body */}
      <path d="M8 100 L8 63 L26 56 Q33 62 40 62 Q47 62 54 56 L72 63 L72 100Z" fill={JACKET} />

      {/* Jacket ribbing / hem */}
      <rect x="8" y="96" width="64" height="4" rx="1" fill={JACKET_LIGHT} opacity="0.5" />

      {/* Jacket sleeves with ribbing at cuffs */}
      <path d="M8 100 L8 78 L22 72 L22 100Z" fill={JACKET} />
      <path d="M72 100 L72 78 L58 72 L58 100Z" fill={JACKET} />
      <rect x="8" y="96" width="14" height="3.5" rx="1" fill={JACKET_LIGHT} opacity="0.5" />
      <rect x="58" y="96" width="14" height="3.5" rx="1" fill={JACKET_LIGHT} opacity="0.5" />

      {/* Side shadows */}
      <path d="M8 100 L8 63 L18 60 L18 100Z" fill="rgba(0,0,0,0.22)" />
      <path d="M72 100 L72 63 L62 60 L62 100Z" fill="rgba(0,0,0,0.22)" />

      {/* Zipper line */}
      <line x1="40" y1="62" x2="40" y2="96" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />

      {/* Jacket pockets */}
      <rect x="14" y="78" width="8" height="10" rx="1.5" fill={JACKET_LIGHT} opacity="0.35" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <rect x="58" y="78" width="8" height="10" rx="1.5" fill={JACKET_LIGHT} opacity="0.35" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

      {/* Camera around neck — hanging at chest */}
      <path d="M28 62 Q40 85 52 62" stroke="#1A1A1A" strokeWidth="1.8" fill="none" opacity="0.8" />
      {/* Camera body */}
      <rect x="34" y="76" width="12" height="8" rx="2" fill="#1A1A1A" stroke="#333" strokeWidth="0.5" />
      <rect x="35" y="77" width="10" height="6" rx="1" fill="#2A2A2A" />
      {/* Lens */}
      <circle cx="40" cy="80" r="3" fill="#111" stroke="#444" strokeWidth="0.5" />
      <circle cx="40" cy="80" r="1.5" fill="#1A1A1A" />
      <circle cx="40" cy="80" r="0.6" fill="rgba(80,140,220,0.3)" />
      {/* Flash */}
      <rect x="44" y="77.5" width="2" height="1.5" rx="0.3" fill="rgba(255,255,200,0.4)" />

      {/* Badge — small, leather-style */}
      <rect x="25" y="70" width="5" height="6" rx="1" fill={ACCENT} opacity="0.7" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <circle cx="27.5" cy="73" r="1.2" fill="rgba(255,220,100,0.6)" />
    </svg>
  );
}
