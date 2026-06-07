export default function KitchenScene() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="55%" stopColor="#D4EEF8" />
          <stop offset="100%" stopColor="#FFF4D6" />
        </linearGradient>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8CAA8" />
          <stop offset="100%" stopColor="#EDE0C8" />
        </linearGradient>
        <linearGradient id="cabinetFaceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B5230" />
          <stop offset="100%" stopColor="#5C3D1E" />
        </linearGradient>
        <linearGradient id="tableTopGrad" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#B87A40" />
          <stop offset="40%" stopColor="#A06830" />
          <stop offset="100%" stopColor="#7B5028" />
        </linearGradient>
        <linearGradient id="countertopGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EEE4D4" />
          <stop offset="100%" stopColor="#D8CCBC" />
        </linearGradient>
        <linearGradient id="fridgeGrad" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#F0EAE0" />
          <stop offset="100%" stopColor="#D8D0C4" />
        </linearGradient>
        <linearGradient id="sunbeamGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFEF90" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFEF90" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sunbeam2Grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF8C0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFF8C0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBE8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFF4A0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tableLightPool" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFEF80" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFEF80" stopOpacity="0" />
        </radialGradient>
        <pattern id="wallpaperPat" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
          <rect width="64" height="64" fill="#EDE0C8" />
          <circle cx="32" cy="32" r="13" fill="none" stroke="#D4C4A4" strokeWidth="0.6" strokeOpacity="0.45" />
          <circle cx="0" cy="0" r="13" fill="none" stroke="#D4C4A4" strokeWidth="0.6" strokeOpacity="0.45" />
          <circle cx="64" cy="0" r="13" fill="none" stroke="#D4C4A4" strokeWidth="0.6" strokeOpacity="0.45" />
          <circle cx="0" cy="64" r="13" fill="none" stroke="#D4C4A4" strokeWidth="0.6" strokeOpacity="0.45" />
          <circle cx="64" cy="64" r="13" fill="none" stroke="#D4C4A4" strokeWidth="0.6" strokeOpacity="0.45" />
        </pattern>
        <pattern id="backsplashPat" x="0" y="0" width="52" height="26" patternUnits="userSpaceOnUse">
          <rect width="52" height="26" fill="#E8DED0" />
          <rect x="1" y="1" width="50" height="24" rx="1" fill="#EDE5D5" />
          <line x1="0" y1="0" x2="52" y2="0" stroke="#C4B8A8" strokeWidth="0.7" />
          <line x1="0" y1="26" x2="52" y2="26" stroke="#C4B8A8" strokeWidth="0.7" />
          <line x1="0" y1="0" x2="0" y2="26" stroke="#C4B8A8" strokeWidth="0.7" />
          <line x1="52" y1="0" x2="52" y2="26" stroke="#C4B8A8" strokeWidth="0.7" />
        </pattern>
        <pattern id="oakFloorPat" x="0" y="0" width="140" height="28" patternUnits="userSpaceOnUse">
          <rect width="140" height="28" fill="#9A6230" />
          <rect x="1" y="1" width="138" height="26" fill="#A46C38" />
          <line x1="0" y1="9" x2="140" y2="8.5" stroke="#865425" strokeWidth="0.6" strokeOpacity="0.5" />
          <line x1="0" y1="18" x2="140" y2="18.5" stroke="#865425" strokeWidth="0.5" strokeOpacity="0.35" />
          <line x1="46" y1="0" x2="44" y2="28" stroke="#865425" strokeWidth="0.4" strokeOpacity="0.22" />
          <line x1="94" y1="0" x2="96" y2="28" stroke="#865425" strokeWidth="0.4" strokeOpacity="0.18" />
        </pattern>
        <clipPath id="tableClip">
          <ellipse cx="660" cy="738" rx="428" ry="107" />
        </clipPath>
      </defs>

      {/* ══════════════════════════════════════════════════
          LAYER 1 — BACKGROUND: CEILING, WALL, FLOOR
      ══════════════════════════════════════════════════ */}

      {/* Ceiling */}
      <rect width="1440" height="58" fill="#C8B898" />
      {/* Crown moulding — triple band */}
      <rect y="55" width="1440" height="14" fill="#D4C4A4" />
      <rect y="63" width="1440" height="5" fill="#BEA888" />
      <rect y="67" width="1440" height="2" fill="#A89070" />

      {/* Wall — warm cream wallpaper */}
      <rect y="69" width="1440" height="513" fill="url(#wallpaperPat)" />
      {/* Subtle warm tint overlay */}
      <rect y="69" width="1440" height="513" fill="#EDE0C8" opacity="0.25" />

      {/* Baseboard */}
      <rect y="576" width="1440" height="16" fill="#C8B898" />
      <rect y="580" width="1440" height="8" fill="#B8A888" />
      <rect y="586" width="1440" height="3" fill="#A89070" />

      {/* Floor — oak planks */}
      <rect y="589" width="1440" height="311" fill="url(#oakFloorPat)" />

      {/* Floor plank horizontal dividers with perspective spacing */}
      {[0,1,2,3,4,5,6,7,8,9,10].map((i) => (
        <line key={i}
          x1="0" y1={589 + i * 28}
          x2="1440" y2={589 + i * 28}
          stroke="#7A5025" strokeWidth="1.5" strokeOpacity="0.38"
        />
      ))}
      {/* Plank vertical joints */}
      {[120,260,400,560,700,840,980,1120,1280].map((x, i) => (
        <line key={i}
          x1={x} y1="589"
          x2={x + 18} y2="900"
          stroke="#7A5025" strokeWidth="1" strokeOpacity="0.2"
        />
      ))}
      {/* Floor shine strip */}
      <rect y="589" width="1440" height="8" fill="#C8944C" opacity="0.22" />

      {/* ══════════════════════════════════════════════════
          LAYER 2 — WINDOW (LEFT) WITH CURTAINS
      ══════════════════════════════════════════════════ */}

      {/* Window recess — inset shadow */}
      <rect x="62" y="88" width="358" height="432" fill="#B8A880" />

      {/* Sky through glass */}
      <rect x="78" y="96" width="326" height="418" fill="url(#skyGrad)" />

      {/* Garden outside — soft foliage silhouettes */}
      <ellipse cx="142" cy="480" rx="72" ry="58" fill="#6A9248" opacity="0.65" />
      <ellipse cx="228" cy="492" rx="66" ry="52" fill="#527A36" opacity="0.58" />
      <ellipse cx="318" cy="476" rx="58" ry="68" fill="#5E8840" opacity="0.62" />
      <ellipse cx="388" cy="490" rx="46" ry="50" fill="#4A6E2C" opacity="0.55" />
      <ellipse cx="170" cy="460" rx="44" ry="38" fill="#7AAA58" opacity="0.5" />
      {/* Tree trunk */}
      <rect x="218" y="448" width="14" height="62" fill="#4A3820" opacity="0.65" />
      {/* Distant house roofline */}
      <polygon points="78,330 168,274 260,330" fill="#D4B890" opacity="0.42" />
      <rect x="78" y="330" width="182" height="100" fill="#CAA87A" opacity="0.38" />
      {/* House window */}
      <rect x="130" y="346" width="22" height="20" rx="1" fill="#B8D4E8" opacity="0.5" />
      <rect x="162" y="346" width="22" height="20" rx="1" fill="#B8D4E8" opacity="0.5" />

      {/* Grass strip at bottom of view */}
      <rect x="78" y="502" width="326" height="12" fill="#6A9030" opacity="0.5" />

      {/* Window outer frame */}
      <rect x="62" y="88" width="358" height="432" fill="none" stroke="#5C3D1E" strokeWidth="20" />

      {/* Window cross — horizontal muntin */}
      <rect x="62" y="298" width="358" height="16" fill="#5C3D1E" />
      {/* Window cross — vertical muntin */}
      <rect x="232" y="88" width="16" height="432" fill="#5C3D1E" />

      {/* Inner frame shadow lines */}
      <rect x="62" y="88" width="358" height="432" fill="none" stroke="#3A2410" strokeWidth="3" />

      {/* Glass reflections — top-left quadrant */}
      <line x1="82" y1="100" x2="108" y2="292" stroke="white" strokeWidth="2" strokeOpacity="0.12" />
      <line x1="108" y1="100" x2="122" y2="192" stroke="white" strokeWidth="1.5" strokeOpacity="0.07" />
      {/* Glass reflections — top-right quadrant */}
      <line x1="252" y1="100" x2="276" y2="292" stroke="white" strokeWidth="2" strokeOpacity="0.12" />
      {/* Glass reflections — lower panes */}
      <line x1="82" y1="318" x2="108" y2="508" stroke="white" strokeWidth="1.5" strokeOpacity="0.09" />
      <line x1="252" y1="318" x2="276" y2="508" stroke="white" strokeWidth="1.5" strokeOpacity="0.09" />

      {/* Window sill — wide ledge */}
      <rect x="50" y="514" width="382" height="30" rx="3" fill="#7B5230" />
      <rect x="50" y="514" width="382" height="7" fill="#9B6840" />
      <rect x="50" y="540" width="382" height="6" fill="#4A2C10" opacity="0.28" />

      {/* Small herb pot on sill */}
      <ellipse cx="388" cy="519" rx="20" ry="7" fill="#6B4828" />
      <rect x="370" y="502" width="36" height="20" rx="4" fill="#7A5C3C" />
      <rect x="370" y="521" width="36" height="3" fill="#5A3C22" />
      <ellipse cx="376" cy="502" rx="7" ry="11" fill="#4A7020" />
      <ellipse cx="388" cy="499" rx="8" ry="13" fill="#3A6018" />
      <ellipse cx="400" cy="503" rx="6" ry="10" fill="#4A7020" />

      {/* Curtain rod */}
      <rect x="0" y="62" width="470" height="11" rx="5.5" fill="#8B6030" />
      <circle cx="4" cy="67" r="9" fill="#6B4820" />
      <circle cx="462" cy="67" r="9" fill="#6B4820" />
      {/* Rod rings */}
      {[30,70,110,150,190,230,270,310,350,390,430].map((x, i) => (
        <circle key={i} cx={x} cy="67" r="5" fill="none" stroke="#7A5228" strokeWidth="2" />
      ))}

      {/* Left curtain — cream linen with folds */}
      <path d="M 8,73 Q 32,160 22,260 Q 42,370 28,460 Q 44,508 34,548 L 100,548 L 100,73 Z"
        fill="#F2E6D0" />
      <path d="M 35,73 Q 55,170 44,272 Q 62,375 50,464 Q 62,510 55,546"
        fill="none" stroke="#DCCEB8" strokeWidth="1.2" strokeOpacity="0.7" />
      <path d="M 58,73 Q 72,178 63,285 Q 78,388 67,475 Q 76,516 71,545"
        fill="none" stroke="#DCCEB8" strokeWidth="1" strokeOpacity="0.55" />
      <path d="M 78,73 Q 88,182 80,290 Q 92,395 84,482"
        fill="none" stroke="#D4C8B2" strokeWidth="0.8" strokeOpacity="0.45" />
      {/* Curtain shadow edge */}
      <path d="M 8,73 Q 32,160 22,260 Q 42,370 28,460 Q 44,508 34,548 L 46,548 Q 34,506 48,456 Q 36,364 52,264 Q 40,162 62,73 Z"
        fill="#D8CCB8" opacity="0.35" />

      {/* Right curtain */}
      <path d="M 432,73 Q 418,162 428,264 Q 412,368 424,462 Q 410,510 418,548 L 462,548 L 462,73 Z"
        fill="#F2E6D0" />
      <path d="M 426,73 Q 412,170 422,278 Q 408,376 418,468 Q 406,512 412,546"
        fill="none" stroke="#DCCEB8" strokeWidth="1.2" strokeOpacity="0.65" />
      <path d="M 446,73 Q 438,180 446,288 Q 434,390 442,475"
        fill="none" stroke="#DCCEB8" strokeWidth="1" strokeOpacity="0.5" />

      {/* ══════════════════════════════════════════════════
          MORNING SUNBEAMS
      ══════════════════════════════════════════════════ */}

      {/* Main broad sunbeam fan from upper window */}
      <polygon points="78,96 398,96 820,589 -140,589"
        fill="url(#sunbeamGrad)" />
      {/* Tighter bright shaft */}
      <polygon points="120,96 280,96 640,589 60,589"
        fill="url(#sunbeam2Grad)" />
      {/* Bright light pool on floor */}
      <ellipse cx="360" cy="720" rx="310" ry="72" fill="#FFEF80" opacity="0.09" />
      {/* Window bloom glow */}
      <ellipse cx="241" cy="200" rx="190" ry="210" fill="url(#windowGlow)" />

      {/* ══════════════════════════════════════════════════
          LAYER 3 — WALL CLOCK
      ══════════════════════════════════════════════════ */}

      <g transform="translate(345,178)">
        {/* Shadow on wall */}
        <circle cx="4" cy="5" r="47" fill="#8A7050" opacity="0.18" />
        {/* Outer bezel */}
        <circle cx="0" cy="0" r="48" fill="#7B5C38" />
        <circle cx="0" cy="0" r="46" fill="#9B7848" />
        {/* Clock face */}
        <circle cx="0" cy="0" r="43" fill="#F6EDD8" />
        <circle cx="0" cy="0" r="42" fill="none" stroke="#C8B090" strokeWidth="1.5" />
        {/* Hour tick marks */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
          const rad = (deg - 90) * Math.PI / 180;
          const isMain = i % 3 === 0;
          const r1 = isMain ? 30 : 35;
          const r2 = 40;
          return <line key={i}
            x1={Math.cos(rad) * r1} y1={Math.sin(rad) * r1}
            x2={Math.cos(rad) * r2} y2={Math.sin(rad) * r2}
            stroke="#5A4030" strokeWidth={isMain ? 2.8 : 1.2} strokeLinecap="round"
          />;
        })}
        {/* 12 marker */}
        <rect x="-5" y="-38" width="10" height="4" rx="2" fill="#3A2C18" />
        {/* 3 marker */}
        <rect x="33" y="-2.5" width="4" height="5" rx="1.5" fill="#3A2C18" />
        {/* 6 marker */}
        <rect x="-5" y="33" width="10" height="4" rx="2" fill="#3A2C18" />
        {/* 9 marker */}
        <rect x="-37" y="-2.5" width="4" height="5" rx="1.5" fill="#3A2C18" />
        {/* Hour hand — pointing ~8:47 */}
        <line x1="0" y1="4"
          x2={Math.cos((8.783 * 30 - 90) * Math.PI / 180) * 25}
          y2={Math.sin((8.783 * 30 - 90) * Math.PI / 180) * 25}
          stroke="#2A1C0C" strokeWidth="4.5" strokeLinecap="round" />
        {/* Minute hand */}
        <line x1="0" y1="5"
          x2={Math.cos((47 * 6 - 90) * Math.PI / 180) * 35}
          y2={Math.sin((47 * 6 - 90) * Math.PI / 180) * 35}
          stroke="#2A1C0C" strokeWidth="3" strokeLinecap="round" />
        {/* Second hand — red */}
        <line x1="0" y1="8"
          x2={Math.cos((23 * 6 - 90) * Math.PI / 180) * 39}
          y2={Math.sin((23 * 6 - 90) * Math.PI / 180) * 39}
          stroke="#C03020" strokeWidth="1.5" strokeLinecap="round" />
        {/* Center cap */}
        <circle cx="0" cy="0" r="4.5" fill="#4A3820" />
        <circle cx="0" cy="0" r="2.5" fill="#C8A860" />
      </g>

      {/* ══════════════════════════════════════════════════
          LAYER 4 — WALL DECOR: FAMILY PHOTOS & EMBROIDERY
      ══════════════════════════════════════════════════ */}

      {/* Photo frame 1 — landscape, dark wood */}
      <g transform="translate(682,112)">
        <rect x="2" y="3" width="84" height="67" rx="2" fill="#5A4020" opacity="0.3" />
        <rect x="0" y="0" width="84" height="67" rx="2" fill="#8B6030" />
        <rect x="5" y="5" width="74" height="57" fill="#D4B890" />
        <rect x="8" y="8" width="68" height="51" fill="#C0A07A" />
        {/* Photo scene — blurry family */}
        <rect x="8" y="8" width="68" height="32" fill="#A8886A" />
        <ellipse cx="28" cy="26" rx="10" ry="13" fill="#C8A880" />
        <ellipse cx="50" cy="24" rx="9" ry="11" fill="#C0A070" />
        <ellipse cx="68" cy="27" rx="8" ry="10" fill="#BCA070" />
        <rect x="8" y="40" width="68" height="19" fill="#8A7050" opacity="0.45" />
        <rect x="0" y="0" width="84" height="67" rx="2" fill="none" stroke="#A07840" strokeWidth="1" />
      </g>

      {/* Photo frame 2 — portrait, slightly tilted */}
      <g transform="translate(782,104) rotate(2.5)">
        <rect x="2" y="3" width="68" height="88" rx="2" fill="#5A4020" opacity="0.3" />
        <rect x="0" y="0" width="68" height="88" rx="2" fill="#6B4820" />
        <rect x="5" y="5" width="58" height="78" fill="#D4B888" />
        <rect x="8" y="8" width="52" height="72" fill="#C4A878" />
        {/* Portrait */}
        <ellipse cx="34" cy="30" rx="14" ry="18" fill="#C8A880" />
        <rect x="12" y="50" width="48" height="28" fill="#907050" opacity="0.35" />
        <rect x="0" y="0" width="68" height="88" rx="2" fill="none" stroke="#9B7840" strokeWidth="1" />
      </g>

      {/* Embroidered "Home Sweet Home" sampler — framed cross-stitch */}
      <g transform="translate(686,198)">
        <rect x="2" y="3" width="166" height="58" rx="2" fill="#5A4020" opacity="0.25" />
        <rect x="0" y="0" width="166" height="58" rx="2" fill="#8B6030" />
        <rect x="5" y="5" width="156" height="48" fill="#F2EADA" />
        <rect x="9" y="9" width="148" height="40" fill="#EDE5CB" />
        {/* Cross-stitch border pattern */}
        {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => (
          <g key={i} transform={`translate(${11 + i * 13}, 11)`}>
            <line x1="0" y1="0" x2="5" y2="5" stroke="#C03040" strokeWidth="1" strokeOpacity="0.55" />
            <line x1="5" y1="0" x2="0" y2="5" stroke="#C03040" strokeWidth="1" strokeOpacity="0.55" />
          </g>
        ))}
        {/* "Home Sweet Home" text approximated as bars */}
        <rect x="28" y="25" width="110" height="7" rx="2" fill="#4A6840" opacity="0.5" />
        <rect x="38" y="35" width="90" height="5" rx="1" fill="#C03040" opacity="0.35" />
        <rect x="0" y="0" width="166" height="58" rx="2" fill="none" stroke="#9B7840" strokeWidth="1" />
      </g>

      {/* ══════════════════════════════════════════════════
          LAYER 5 — REFRIGERATOR
      ══════════════════════════════════════════════════ */}

      {/* Fridge shadow */}
      <rect x="424" y="98" width="238" height="492" rx="6" fill="#3A2810" opacity="0.28" />

      {/* Fridge body */}
      <rect x="420" y="94" width="238" height="492" rx="7" fill="url(#fridgeGrad)" />

      {/* Freezer door (top) */}
      <rect x="424" y="98" width="230" height="178" rx="5" fill="#EDE5D9" stroke="#C4BEB2" strokeWidth="1.5" />
      <rect x="434" y="107" width="210" height="160" rx="4" fill="#E5DDD1" />

      {/* Fridge door (bottom) */}
      <rect x="424" y="280" width="230" height="304" rx="5" fill="#EFE7DB" stroke="#C4BEB2" strokeWidth="1.5" />
      <rect x="434" y="289" width="210" height="287" rx="4" fill="#E8E0D4" />

      {/* Gap between doors */}
      <rect x="420" y="275" width="238" height="8" fill="#B0A898" />

      {/* Door handles — slim horizontal bars */}
      <rect x="466" y="180" width="116" height="11" rx="5.5" fill="#A89880" />
      <rect x="466" y="181" width="116" height="4" rx="2" fill="#C8B898" />

      <rect x="466" y="375" width="116" height="11" rx="5.5" fill="#A89880" />
      <rect x="466" y="376" width="116" height="4" rx="2" fill="#C8B898" />

      {/* Brand badge */}
      <rect x="490" y="115" width="88" height="17" rx="3" fill="#D8D0C8" />
      <rect x="496" y="119" width="56" height="5" rx="1.5" fill="#B0A898" />
      <rect x="504" y="127" width="40" height="4" rx="1.5" fill="#C0B8B0" />

      {/* === FRIDGE MAGNETS & DECORATIONS === */}

      {/* Child's drawing — crayon-style house on white paper */}
      <rect x="436" y="302" width="58" height="52" rx="1" fill="#FFFCE8" />
      <rect x="438" y="304" width="54" height="48" fill="#FFFEFC" />
      {/* Crayon house */}
      <polygon points="465,312 446,328 484,328" fill="#E84444" opacity="0.8" />
      <rect x="450" y="328" width="30" height="20" fill="#F0A840" opacity="0.8" />
      <rect x="458" y="334" width="10" height="14" fill="#885530" opacity="0.8" />
      <circle cx="478" cy="324" r="7" fill="#F8E040" opacity="0.75" />
      {/* Magnet holding it */}
      <circle cx="465" cy="302" r="5" fill="#4060C0" opacity="0.85" />

      {/* Family photo in plastic frame */}
      <rect x="500" y="298" width="68" height="54" rx="2" fill="#5C7890" opacity="0.9" />
      <rect x="504" y="302" width="60" height="46" fill="#C0A880" />
      <rect x="506" y="304" width="56" height="42" fill="#B09870" />
      <ellipse cx="522" cy="320" rx="9" ry="11" fill="#C8A880" />
      <ellipse cx="540" cy="318" rx="8" ry="10" fill="#C0A070" />
      <ellipse cx="555" cy="321" rx="7" ry="9" fill="#BCA070" />
      <rect x="506" y="334" width="56" height="12" fill="#8A7050" opacity="0.35" />

      {/* Red apple magnet */}
      <ellipse cx="570" cy="302" rx="13" ry="12" fill="#C83020" opacity="0.9" />
      <ellipse cx="568" cy="294" rx="4" ry="2" fill="#C83020" opacity="0.7" />
      <rect x="568" y="291" width="3.5" height="9" rx="1.5" fill="#6A4820" />
      <path d="M 570,292 Q 578,286 583,291" fill="none" stroke="#3A6810" strokeWidth="2" strokeLinecap="round" />

      {/* === KEY HOTSPOT: HANDWRITTEN STICKY NOTE === */}
      {/* Yellow post-it — slightly tilted, partially worn */}
      <g transform="translate(432,382) rotate(-3)">
        {/* Note drop shadow */}
        <rect x="4" y="5" width="116" height="96" rx="2" fill="#8A7020" opacity="0.22" />
        {/* Post-it body */}
        <rect x="0" y="0" width="116" height="96" rx="2" fill="#FFE245" />
        {/* Top fold — slightly darker */}
        <rect x="0" y="0" width="116" height="7" rx="2" fill="#F0D220" opacity="0.6" />
        {/* Ruled lines */}
        {[14,24,34,44,54,64,74,84].map((y, i) => (
          <line key={i} x1="8" y1={y} x2="108" y2={y - 0.5}
            stroke="#7A5C10" strokeWidth={0.9} strokeOpacity={0.5} />
        ))}
        {/* "DHL" handwritten — blocky */}
        <text x="8" y="13" fontSize="9" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.85" fontWeight="bold">DHL</text>
        {/* Card number fragment */}
        <text x="8" y="30" fontSize="7.5" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.78">Sendung: 4829X</text>
        <text x="8" y="44" fontSize="7.5" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.75">4,95 € Zoll</text>
        <text x="8" y="58" fontSize="7.5" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.8">Karte: 4*** ***8</text>
        <text x="8" y="72" fontSize="7.5" fontFamily="Georgia, serif" fill="#C83020" fillOpacity="0.88">CVV 392</text>
        {/* Underline under CVV */}
        <line x1="8" y1="74" x2="58" y2="74" stroke="#C83020" strokeWidth="1" strokeOpacity="0.6" />
        <text x="8" y="88" fontSize="7" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.6">bit.ly/dhl-zoll-de</text>
      </g>
      {/* Red circle magnet pinning the note */}
      <circle cx="490" cy="384" r="6" fill="#C83020" opacity="0.88" />
      <circle cx="490" cy="383" r="3" fill="#E05040" opacity="0.6" />

      {/* ══════════════════════════════════════════════════
          LAYER 6 — UPPER KITCHEN CABINETS (RIGHT)
      ══════════════════════════════════════════════════ */}

      {/* Cabinet top rail */}
      <rect x="760" y="66" width="680" height="10" fill="#4A3018" />

      {/* Cabinet body */}
      <rect x="760" y="76" width="680" height="225" rx="3" fill="#6B4820" />

      {/* Individual cabinet doors — 4 doors */}
      {[762, 922, 1082, 1240].map((x, i) => (
        <g key={i}>
          <rect x={x} y="80" width="154" height="217" rx="3" fill="#5C3D1E" stroke="#7B5230" strokeWidth="2" />
          {/* Raised panel */}
          <rect x={x + 12} y="91" width="130" height="195" rx="2" fill="#4A3010" />
          <rect x={x + 16} y="95" width="122" height="187" rx="2" fill="#543818" />
          {/* Inner panel groove highlight */}
          <rect x={x + 16} y="95" width="122" height="187" rx="2" fill="none" stroke="#6B4820" strokeWidth="1.5" />
          <rect x={x + 18} y="97" width="118" height="183" rx="1" fill="none" stroke="#7A5430" strokeWidth="0.5" strokeOpacity="0.5" />
          {/* Knob */}
          <circle cx={x + 77} cy="192" r="8" fill="#C8A870" />
          <circle cx={x + 77} cy="192" r="6" fill="#D8B880" />
          <circle cx={x + 75} cy="190" r="2.5" fill="#EED090" opacity="0.7" />
        </g>
      ))}

      {/* Cabinet bottom rail */}
      <rect x="760" y="298" width="680" height="12" fill="#4A3018" />

      {/* ══════════════════════════════════════════════════
          BACKSPLASH TILES
      ══════════════════════════════════════════════════ */}

      <rect x="760" y="310" width="680" height="248" fill="url(#backsplashPat)" />
      <rect x="760" y="310" width="680" height="248" fill="#EEE8DC" opacity="0.12" />

      {/* ══════════════════════════════════════════════════
          COUNTERTOP
      ══════════════════════════════════════════════════ */}

      {/* Countertop surface */}
      <rect x="755" y="556" width="690" height="34" rx="2" fill="url(#countertopGrad)" />
      {/* Front edge — bevelled */}
      <rect x="755" y="553" width="692" height="12" rx="2" fill="#F4EAD8" />
      {/* Shadow under front edge */}
      <rect x="755" y="587" width="690" height="10" fill="#2A1C0C" opacity="0.22" />

      {/* ══════════════════════════════════════════════════
          LOWER KITCHEN CABINETS
      ══════════════════════════════════════════════════ */}

      <rect x="760" y="597" width="680" height="303" rx="2" fill="#6B4820" />

      {[762, 922, 1082, 1240].map((x, i) => (
        <g key={i}>
          <rect x={x} y="601" width="154" height="295" rx="3" fill="#5C3D1E" stroke="#7B5230" strokeWidth="2" />
          <rect x={x + 12} y="611" width="130" height="275" rx="2" fill="#4A3010" />
          <rect x={x + 16} y="615" width="122" height="267" rx="2" fill="#543818" />
          <rect x={x + 16} y="615" width="122" height="267" rx="2" fill="none" stroke="#6B4820" strokeWidth="1.5" />
          <circle cx={x + 77} cy="750" r="8" fill="#C8A870" />
          <circle cx={x + 77} cy="750" r="6" fill="#D8B880" />
          <circle cx={x + 75} cy="748" r="2.5" fill="#EED090" opacity="0.7" />
        </g>
      ))}

      {/* ══════════════════════════════════════════════════
          STOVE / COOKTOP (left part of counter zone)
      ══════════════════════════════════════════════════ */}

      {/* Stove surround */}
      <rect x="760" y="390" width="156" height="170" rx="3" fill="#282018" />
      <rect x="764" y="394" width="148" height="162" rx="2" fill="#221A12" />

      {/* Burner grates */}
      <circle cx="820" cy="444" r="30" fill="none" stroke="#3C3020" strokeWidth="6" />
      <circle cx="820" cy="444" r="21" fill="none" stroke="#342818" strokeWidth="4" />
      <circle cx="820" cy="444" r="10" fill="#281E10" />
      <circle cx="893" cy="444" r="24" fill="none" stroke="#3C3020" strokeWidth="5" />
      <circle cx="893" cy="444" r="16" fill="none" stroke="#342818" strokeWidth="3" />
      <circle cx="893" cy="444" r="7" fill="#281E10" />
      <circle cx="820" cy="516" r="24" fill="none" stroke="#3C3020" strokeWidth="5" />
      <circle cx="820" cy="516" r="16" fill="none" stroke="#342818" strokeWidth="3" />
      <circle cx="893" cy="516" r="20" fill="none" stroke="#3C3020" strokeWidth="4" />

      {/* Stove knobs panel */}
      <rect x="764" y="549" width="148" height="12" fill="#1E1810" />
      {[778,800,822,844,866].map((x, i) => (
        <g key={i} transform={`translate(${x},555)`}>
          <circle cx="0" cy="0" r="8" fill="#302820" />
          <circle cx="0" cy="0" r="6" fill="#281E18" />
          <rect x="-1.5" y="-6" width="3" height="4" rx="1" fill="#C8B890" />
        </g>
      ))}

      {/* Kettle on back-left burner */}
      <g transform="translate(798,378)">
        {/* Kettle shadow */}
        <ellipse cx="22" cy="57" rx="25" ry="8" fill="#1A1008" opacity="0.5" />
        {/* Body */}
        <path d="M 0,20 Q 0,54 22,54 Q 44,54 44,20 Q 44,5 22,5 Q 0,5 0,20 Z" fill="#7A6448" />
        <path d="M 2,21 Q 2,52 22,52 Q 42,52 42,21 Q 42,7 22,7 Q 2,7 2,21 Z" fill="#8A7458" />
        {/* Spout */}
        <path d="M 42,22 Q 62,18 66,30 Q 70,40 56,44"
          fill="none" stroke="#7A6448" strokeWidth="10" strokeLinecap="round" />
        <path d="M 42,22 Q 62,18 66,30 Q 70,40 56,44"
          fill="none" stroke="#8A7458" strokeWidth="7" strokeLinecap="round" />
        {/* Handle */}
        <path d="M 4,18 Q -20,18 -20,32 Q -20,46 4,48"
          fill="none" stroke="#6A5438" strokeWidth="11" strokeLinecap="round" />
        <path d="M 4,18 Q -20,18 -20,32 Q -20,46 4,48"
          fill="none" stroke="#7A6448" strokeWidth="7" strokeLinecap="round" />
        {/* Lid */}
        <ellipse cx="22" cy="5" rx="19" ry="6" fill="#6A5438" />
        <ellipse cx="22" cy="3" rx="17" ry="4" fill="#7A6448" />
        {/* Lid knob */}
        <ellipse cx="22" cy="0" rx="6" ry="3.5" fill="#6A5438" />
        {/* Faint steam lines — kettle not boiling */}
        <path d="M 16,-4 Q 13,-14 16,-24" stroke="#E0D8D0" strokeWidth="1.5" fill="none" strokeOpacity="0.2" strokeLinecap="round" />
        <path d="M 24,-2 Q 27,-13 24,-23" stroke="#E0D8D0" strokeWidth="1.5" fill="none" strokeOpacity="0.18" strokeLinecap="round" />
      </g>

      {/* Spice jars on counter */}
      {[936, 965, 994, 1023].map((x, i) => {
        const colors = [['#8B2020','#A83030'],['#204820','#2A6028'],['#382808','#503818'],['#101840','#182258']];
        return (
          <g key={i} transform={`translate(${x},498)`}>
            <ellipse cx="14" cy="58" rx="14" ry="5" fill="#1A1008" opacity="0.3" />
            <rect x="0" y="0" width="28" height="58" rx="6" fill={colors[i][0]} />
            <rect x="2" y="2" width="24" height="52" rx="5" fill={colors[i][1]} opacity="0.6" />
            {/* Label */}
            <rect x="3" y="18" width="22" height="20" rx="1" fill="#F5EDD0" opacity="0.55" />
            <rect x="5" y="21" width="16" height="3" rx="1" fill="#1A1008" opacity="0.5" />
            <rect x="5" y="27" width="12" height="2" rx="1" fill="#1A1008" opacity="0.35" />
            {/* Lid */}
            <rect x="0" y="0" width="28" height="11" rx="6" fill={colors[i][0]} />
            <rect x="2" y="2" width="24" height="6" rx="4" fill={colors[i][1]} opacity="0.8" />
          </g>
        );
      })}

      {/* ══════════════════════════════════════════════════
          KEY HOTSPOT: TABLET ON COUNTER (fake DHL site)
      ══════════════════════════════════════════════════ */}

      {/* Tablet stand / holder */}
      <rect x="1062" y="536" width="76" height="22" rx="4" fill="#302820" />
      <rect x="1090" y="468" width="20" height="72" rx="4" fill="#282018" />

      {/* Tablet body — landscape angle, leaning slightly */}
      <rect x="992" y="348" width="218" height="164" rx="13" fill="#1E1830" />
      <rect x="994" y="350" width="214" height="160" rx="12" fill="none" stroke="#2E2848" strokeWidth="2.5" />

      {/* Tablet screen */}
      <rect x="1002" y="356" width="198" height="150" rx="9" fill="#141E30" />

      {/* — Browser chrome — */}
      {/* Tab bar */}
      <rect x="1002" y="356" width="198" height="22" rx="9" fill="#0C1420" />
      <rect x="1002" y="368" width="198" height="10" fill="#0C1420" />
      {/* Active tab */}
      <rect x="1006" y="358" width="82" height="17" rx="4" fill="#162230" />
      <rect x="1092" y="360" width="54" height="14" rx="3" fill="#0C1420" />

      {/* URL bar */}
      <rect x="1028" y="362" width="148" height="12" rx="4" fill="#1C2840" />
      {/* Navigation buttons */}
      <circle cx="1009" cy="368" r="4" fill="#243040" />
      <circle cx="1021" cy="368" r="4" fill="#243040" />

      {/* Warning icon — no HTTPS */}
      <circle cx="1035" cy="368" r="5" fill="#E05840" opacity="0.95" />
      <rect x="1033.5" y="364.5" width="3" height="5" rx="1" fill="#FFFFFF" />
      <circle cx="1035" cy="372" r="1.5" fill="#FFFFFF" />

      {/* URL text — red/danger colored domain */}
      <rect x="1044" y="365" width="96" height="5" rx="1.5" fill="#E05840" opacity="0.45" />
      <rect x="1044" y="365" width="68" height="5" rx="1.5" fill="#C04030" opacity="0.5" />

      {/* — Website content — */}
      {/* DHL yellow header */}
      <rect x="1002" y="378" width="198" height="28" fill="#FFCC00" opacity="0.9" />
      {/* DHL red logo box */}
      <rect x="1006" y="382" width="52" height="20" rx="2" fill="#CC0000" opacity="0.88" />
      <text x="1012" y="395" fontSize="10" fontFamily="Arial, sans-serif" fill="white" fontWeight="bold">DHL</text>
      {/* Nav items */}
      <rect x="1064" y="386" width="28" height="5" rx="1" fill="#806000" opacity="0.55" />
      <rect x="1098" y="386" width="28" height="5" rx="1" fill="#806000" opacity="0.55" />
      <rect x="1132" y="386" width="28" height="5" rx="1" fill="#806000" opacity="0.55" />
      <rect x="1166" y="386" width="28" height="5" rx="1" fill="#806000" opacity="0.55" />

      {/* Alert / phishing body */}
      <rect x="1002" y="406" width="198" height="18" fill="#FFF0E0" />
      <rect x="1006" y="409" width="120" height="5" rx="1.5" fill="#C04000" opacity="0.5" />
      <rect x="1006" y="416" width="90" height="4" rx="1.5" fill="#C04000" opacity="0.35" />

      {/* Payment form */}
      <rect x="1002" y="424" width="198" height="82" fill="#0E1828" />
      {/* Form title */}
      <rect x="1008" y="428" width="80" height="6" rx="1.5" fill="#506080" opacity="0.6" />
      {/* Card number field */}
      <rect x="1008" y="438" width="68" height="5" rx="1" fill="#405870" opacity="0.55" />
      <rect x="1008" y="445" width="183" height="14" rx="3" fill="#182838" stroke="#304858" strokeWidth="1" />
      <rect x="1012" y="449" width="90" height="5" rx="1" fill="#304858" opacity="0.5" />
      {/* CVV + Expiry row */}
      <rect x="1008" y="463" width="45" height="4" rx="1" fill="#405870" opacity="0.55" />
      <rect x="1008" y="470" width="80" height="12" rx="3" fill="#182838" stroke="#304858" strokeWidth="1" />
      <rect x="1012" y="474" width="36" height="4" rx="1" fill="#304858" opacity="0.5" />
      <rect x="1100" y="463" width="45" height="4" rx="1" fill="#405870" opacity="0.55" />
      <rect x="1100" y="470" width="85" height="12" rx="3" fill="#182838" stroke="#304858" strokeWidth="1" />
      <rect x="1104" y="474" width="36" height="4" rx="1" fill="#304858" opacity="0.5" />
      {/* Submit button — yellow */}
      <rect x="1008" y="486" width="183" height="15" rx="5" fill="#FFCC00" opacity="0.82" />
      <rect x="1060" y="490" width="80" height="6" rx="1.5" fill="#806000" opacity="0.7" />

      {/* ══════════════════════════════════════════════════
          LAYER 7 — BREAKFAST TABLE
      ══════════════════════════════════════════════════ */}

      {/* Table shadow on floor */}
      <ellipse cx="658" cy="832" rx="442" ry="52" fill="#2A1808" opacity="0.3" />

      {/* Table underside / thickness rim */}
      <ellipse cx="658" cy="754" rx="430" ry="110" fill="#5A3C1A" />

      {/* Table top surface */}
      <ellipse cx="658" cy="742" rx="428" ry="108" fill="url(#tableTopGrad)" />

      {/* Wood grain radials on table */}
      {[...Array(18)].map((_, i) => {
        const angle = (i * 20) * Math.PI / 180;
        return (
          <line key={i}
            x1="658" y1="742"
            x2={658 + Math.cos(angle) * 420}
            y2={742 + Math.sin(angle) * 102}
            stroke="#5A3818" strokeWidth="1" strokeOpacity="0.22"
            clipPath="url(#tableClip)"
          />
        );
      })}

      {/* Table light pool — morning sun falls on left portion */}
      <ellipse cx="560" cy="726" rx="220" ry="58" fill="url(#tableLightPool)" />

      {/* Table edge highlight */}
      <ellipse cx="658" cy="742" rx="428" ry="108" fill="none" stroke="#AC7840" strokeWidth="3.5" />

      {/* Table front legs */}
      <path d="M 304,766 Q 272,856 262,900" stroke="#5A3C1A" strokeWidth="24" strokeLinecap="round" fill="none" />
      <path d="M 304,766 Q 272,856 262,900" stroke="#7B5230" strokeWidth="17" strokeLinecap="round" fill="none" />
      <path d="M 1008,766 Q 1040,856 1050,900" stroke="#5A3C1A" strokeWidth="24" strokeLinecap="round" fill="none" />
      <path d="M 1008,766 Q 1040,856 1050,900" stroke="#7B5230" strokeWidth="17" strokeLinecap="round" fill="none" />

      {/* ══════════════════════════════════════════════════
          CHAIR — pushed back, knit cushion (elderly woman detail)
      ══════════════════════════════════════════════════ */}

      {/* Chair legs */}
      <line x1="256" y1="780" x2="244" y2="900" stroke="#6B4820" strokeWidth="10" strokeLinecap="round" />
      <line x1="332" y1="780" x2="344" y2="900" stroke="#6B4820" strokeWidth="10" strokeLinecap="round" />
      {/* Chair seat */}
      <ellipse cx="294" cy="778" rx="58" ry="22" fill="#7B5230" />
      <ellipse cx="292" cy="776" rx="56" ry="20" fill="#8B6038" />
      {/* Knit cushion on seat */}
      <ellipse cx="292" cy="774" rx="50" ry="17" fill="#A08060" opacity="0.9" />
      <ellipse cx="292" cy="772" rx="48" ry="15" fill="#B09070" />
      {/* Knit texture lines */}
      {[-30,-18,-6,6,18,30].map((dx, i) => (
        <path key={i} d={`M ${292+dx},758 Q ${292+dx+4},765 ${292+dx},772 Q ${292+dx-4},779 ${292+dx},786`}
          fill="none" stroke="#907050" strokeWidth="1.2" strokeOpacity="0.6" />
      ))}
      {/* Chair back */}
      <line x1="248" y1="778" x2="242" y2="700" stroke="#6B4820" strokeWidth="10" strokeLinecap="round" />
      <line x1="336" y1="778" x2="342" y2="700" stroke="#6B4820" strokeWidth="10" strokeLinecap="round" />
      <rect x="238" y="695" width="108" height="20" rx="8" fill="#6B4820" />
      <rect x="238" y="695" width="108" height="20" rx="8" fill="#7B5230" opacity="0.7" />
      {/* Horizontal slats on back */}
      <rect x="244" y="718" width="96" height="8" rx="4" fill="#6B4820" />
      <rect x="244" y="732" width="96" height="8" rx="4" fill="#6B4820" />
      <rect x="244" y="746" width="96" height="8" rx="4" fill="#6B4820" />

      {/* ══════════════════════════════════════════════════
          TABLE ITEMS
      ══════════════════════════════════════════════════ */}

      {/* ===== FOLDED NEWSPAPER ===== */}
      <g transform="translate(434,656) rotate(-5)">
        <rect x="4" y="5" width="178" height="132" rx="3" fill="#2A1808" opacity="0.28" />
        <rect x="0" y="0" width="178" height="132" rx="3" fill="#F2EAD2" />
        {/* Fold shadow */}
        <rect x="0" y="64" width="178" height="3" fill="#D8D0B8" opacity="0.8" />
        {/* Masthead */}
        <rect x="0" y="0" width="178" height="24" fill="#E4DCC4" rx="3" />
        <rect x="28" y="5" width="122" height="9" rx="2" fill="#1A1808" opacity="0.72" />
        <rect x="48" y="17" width="82" height="4" rx="1" fill="#1A1808" opacity="0.38" />
        <rect x="4" y="17" width="38" height="4" rx="1" fill="#2A2418" opacity="0.45" />
        {/* Columns of body text */}
        {[0,1,2,3,4,5,6].map(i => (
          <rect key={i} x="5" y={30 + i * 9} width={76 - (i % 2) * 8} height="5" rx="1" fill="#1A1808"
            opacity={i === 0 ? 0.62 : 0.28} />
        ))}
        {[0,1,2,3].map(i => (
          <rect key={i} x="93" y={30 + i * 9} width={80 - (i % 3) * 6} height="5" rx="1" fill="#1A1808" opacity="0.28" />
        ))}
        {/* Photo block in col 2 */}
        <rect x="93" y="68" width="80" height="56" rx="1" fill="#D4CCB4" />
        <rect x="95" y="70" width="76" height="50" fill="#C0B8A0" />
        <ellipse cx="133" cy="82" rx="14" ry="17" fill="#A89878" opacity="0.6" />
        <rect x="95" y="94" width="76" height="26" fill="#907858" opacity="0.35" />
        {/* Caption */}
        <rect x="93" y="126" width="78" height="3" rx="1" fill="#1A1808" opacity="0.22" />
        {/* Bottom text rows */}
        {[0,1,2].map(i => (
          <rect key={i} x="5" y={100 + i * 8} width={80 - i * 6} height="4" rx="1" fill="#1A1808" opacity="0.22" />
        ))}
      </g>

      {/* ===== READING GLASSES ===== */}
      <g transform="translate(542,692)">
        {/* Left lens */}
        <ellipse cx="0" cy="0" rx="29" ry="21" fill="none" stroke="#7B5830" strokeWidth="3.5" />
        <ellipse cx="0" cy="0" rx="27" ry="19" fill="#CCD8E8" opacity="0.28" />
        {/* Right lens */}
        <ellipse cx="67" cy="0" rx="29" ry="21" fill="none" stroke="#7B5830" strokeWidth="3.5" />
        <ellipse cx="67" cy="0" rx="27" ry="19" fill="#CCD8E8" opacity="0.28" />
        {/* Bridge */}
        <path d="M 29,-1 Q 34,-8 38,-8 Q 42,-8 38,-1" fill="none" stroke="#7B5830" strokeWidth="3.5" />
        {/* Left temple */}
        <line x1="-29" y1="-7" x2="-62" y2="-16" stroke="#7B5830" strokeWidth="3.5" strokeLinecap="round" />
        {/* Right temple */}
        <line x1="96" y1="-7" x2="130" y2="-16" stroke="#7B5830" strokeWidth="3.5" strokeLinecap="round" />
        {/* Lens reflections */}
        <line x1="-19" y1="-13" x2="-9" y2="-6" stroke="white" strokeWidth="2" strokeOpacity="0.38" />
        <line x1="48" y1="-13" x2="58" y2="-6" stroke="white" strokeWidth="2" strokeOpacity="0.38" />
      </g>

      {/* ===== COFFEE MUG ===== */}
      <g transform="translate(586,664)">
        {/* Saucer shadow */}
        <ellipse cx="40" cy="112" rx="52" ry="13" fill="#2A1808" opacity="0.22" />
        {/* Saucer */}
        <ellipse cx="40" cy="110" rx="50" ry="13" fill="#C8B8A0" />
        <ellipse cx="40" cy="108" rx="46" ry="10" fill="#D8C8B0" />
        {/* Mug body */}
        <path d="M 10,30 Q 10,107 40,107 Q 70,107 70,30 Q 70,14 40,14 Q 10,14 10,30 Z" fill="#D0BBAA" />
        <path d="M 12,31 Q 12,105 40,105 Q 68,105 68,31 Q 68,16 40,16 Q 12,16 12,31 Z" fill="#E2CDBC" />
        {/* Mug rim */}
        <ellipse cx="40" cy="30" rx="30" ry="9" fill="#C8B4A0" />
        <ellipse cx="40" cy="28" rx="28" ry="7" fill="#D8C4B0" />
        {/* Coffee surface — stone cold, dark ring at edge */}
        <ellipse cx="40" cy="28" rx="26" ry="6" fill="#3A2010" />
        <ellipse cx="40" cy="27" rx="24" ry="5" fill="#4A2C18" />
        <ellipse cx="40" cy="26" rx="20" ry="4" fill="#3E2614" />
        {/* Handle */}
        <path d="M 70,38 Q 98,40 98,60 Q 98,82 70,86"
          fill="none" stroke="#C4B29E" strokeWidth="13" strokeLinecap="round" />
        <path d="M 70,38 Q 96,40 96,60 Q 96,82 70,86"
          fill="none" stroke="#D8C6B2" strokeWidth="8" strokeLinecap="round" />
        {/* Floral decoration band */}
        <ellipse cx="40" cy="62" rx="20" ry="3" fill="none" stroke="#B8A490" strokeWidth="1" />
        <ellipse cx="40" cy="68" rx="20" ry="3" fill="none" stroke="#B8A490" strokeWidth="1" />
        {[0,60,120,180,240,300].map((deg, i) => {
          const rad = deg * Math.PI / 180;
          return <circle key={i}
            cx={40 + Math.cos(rad) * 14} cy={66 + Math.sin(rad) * 3}
            r="3.5" fill="#C09870" opacity="0.45" />;
        })}
        {/* No steam — cold coffee */}
        {/* Mug table shadow */}
        <ellipse cx="40" cy="112" rx="50" ry="8" fill="#3A2008" opacity="0.18" />
      </g>

      {/* ===== SHOPPING LIST ===== */}
      <g transform="translate(718,718) rotate(4)">
        {/* Paper shadow */}
        <rect x="3" y="3" width="94" height="118" rx="2" fill="#2A1808" opacity="0.2" />
        {/* Lined paper */}
        <rect x="0" y="0" width="94" height="118" rx="2" fill="#FFFCF4" />
        {/* Left margin */}
        <line x1="20" y1="0" x2="20" y2="118" stroke="#F0B0B0" strokeWidth="1" strokeOpacity="0.55" />
        {/* Header */}
        <rect x="6" y="6" width="82" height="8" rx="2" fill="#3A2808" opacity="0.52" />
        {/* Ruled lines */}
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <line key={i} x1="0" y1={22 + i * 10} x2="94" y2={22 + i * 10}
            stroke="#C0B8D0" strokeWidth="0.6" strokeOpacity="0.5" />
        ))}
        {/* Checklist items */}
        {[
          {checked: true, w: 58},
          {checked: true, w: 46},
          {checked: false, w: 62},
          {checked: false, w: 44},
          {checked: false, w: 52},
          {checked: false, w: 38},
          {checked: false, w: 48},
        ].map((item, i) => (
          <g key={i}>
            <rect x="23" y={25 + i * 10} width="8" height="8" rx="1.5"
              fill="none" stroke="#4A3818" strokeWidth="1.2" />
            {item.checked && (
              <>
                <line x1="24.5" y1={28 + i * 10} x2="27" y2={31 + i * 10} stroke="#3A7820" strokeWidth="1.8" />
                <line x1="27" y1={31 + i * 10} x2="30" y2={25.5 + i * 10} stroke="#3A7820" strokeWidth="1.8" />
                <line x1="23" y1={29 + i * 10} x2={23 + item.w} y2={29 + i * 10}
                  stroke="#3A2808" strokeWidth="0.8" strokeOpacity="0.4" />
              </>
            )}
            <rect x="34" y={26 + i * 10} width={item.w} height="5" rx="1"
              fill="#3A2808" opacity="0.43" />
          </g>
        ))}
      </g>

      {/* ===== TOAST PLATE ===== */}
      <g transform="translate(456,716)">
        {/* Plate shadow */}
        <ellipse cx="52" cy="70" rx="56" ry="15" fill="#2A1808" opacity="0.2" />
        {/* Plate */}
        <ellipse cx="52" cy="68" rx="54" ry="14" fill="#C8B8A0" />
        <ellipse cx="52" cy="60" rx="50" ry="22" fill="#EDE0C8" />
        <ellipse cx="52" cy="60" rx="42" ry="18" fill="#F5ECD8" />
        {/* Toast slice */}
        <rect x="26" y="42" width="46" height="40" rx="5" fill="#C88F40" />
        <rect x="28" y="44" width="42" height="36" rx="4" fill="#D8A050" />
        {/* Crust edges */}
        <rect x="26" y="42" width="46" height="7" rx="5" fill="#A87030" />
        <rect x="26" y="75" width="46" height="7" rx="5" fill="#A87030" />
        {/* Butter smear */}
        <ellipse cx="50" cy="62" rx="18" ry="8" fill="#F8E880" opacity="0.5" />
        {/* Crumbs */}
        <circle cx="18" cy="66" r="2" fill="#C88F40" opacity="0.55" />
        <circle cx="88" cy="62" r="1.5" fill="#C88F40" opacity="0.5" />
        <circle cx="34" cy="78" r="1.5" fill="#C88F40" opacity="0.45" />
        <circle cx="74" cy="73" r="1" fill="#C88F40" opacity="0.4" />
      </g>

      {/* ===== SMARTPHONE — KEY HOTSPOT ===== */}
      <g transform="translate(713,626)">
        {/* Phone drop shadow */}
        <ellipse cx="44" cy="150" rx="48" ry="11" fill="#1A0808" opacity="0.45" />

        {/* Phone body */}
        <rect x="0" y="0" width="88" height="156" rx="13" fill="#141222" />
        <rect x="0" y="0" width="88" height="156" rx="13" fill="none" stroke="#242038" strokeWidth="2.5" />

        {/* Camera island — top right */}
        <rect x="50" y="4" width="34" height="20" rx="5" fill="#0E0C1A" />
        <circle cx="61" cy="14" r="7" fill="#0A0818" />
        <circle cx="61" cy="14" r="5" fill="#161428" />
        <circle cx="73" cy="14" r="6" fill="#0A0818" />
        <circle cx="73" cy="14" r="4" fill="#161428" />
        <circle cx="60" cy="13" r="2" fill="#3050A0" opacity="0.55" />
        <circle cx="72" cy="13" r="2" fill="#3050A0" opacity="0.55" />

        {/* Screen */}
        <rect x="5" y="8" width="78" height="140" rx="10" fill="#0A0E1E" />

        {/* Wallpaper — soft twilight gradient */}
        <rect x="5" y="8" width="78" height="140" rx="10" fill="#0C1528" />

        {/* Status bar */}
        <rect x="5" y="8" width="78" height="15" rx="10" fill="#080E1C" />
        <rect x="5" y="16" width="78" height="7" fill="#080E1C" />
        <rect x="8" y="10" width="22" height="4" rx="1" fill="#304060" opacity="0.7" />
        <rect x="62" y="10" width="16" height="4" rx="1" fill="#304060" opacity="0.6" />

        {/* === DHL SMS NOTIFICATION === */}
        {/* Notification card — full-bleed style with amber glow */}
        <rect x="8" y="26" width="72" height="88" rx="7" fill="#111E36" />
        <rect x="8" y="26" width="72" height="88" rx="7" fill="none" stroke="#F5A623" strokeWidth="1.2" strokeOpacity="0.5" />

        {/* Notification header row */}
        <rect x="8" y="26" width="72" height="24" rx="7" fill="#162234" />
        <rect x="8" y="41" width="72" height="9" fill="#162234" />

        {/* App icon — DHL red */}
        <rect x="14" y="30" width="16" height="14" rx="3" fill="#CC0000" opacity="0.9" />
        <text x="16" y="40" fontSize="6" fontFamily="Arial Black, sans-serif" fill="white" fontWeight="900">DHL</text>

        {/* App name & time */}
        <rect x="34" y="31" width="32" height="4" rx="1" fill="#D8D0B8" opacity="0.55" />
        <rect x="34" y="38" width="18" height="3" rx="1" fill="#808880" opacity="0.45" />
        <rect x="66" y="31" width="10" height="3" rx="1" fill="#606870" opacity="0.45" />

        {/* Notification body text */}
        <rect x="12" y="54" width="64" height="4" rx="1" fill="#C8C0A8" opacity="0.5" />
        <rect x="12" y="61" width="58" height="4" rx="1" fill="#C8C0A8" opacity="0.42" />
        <rect x="12" y="68" width="62" height="4" rx="1" fill="#C8C0A8" opacity="0.42" />

        {/* Suspicious link — amber underline */}
        <rect x="12" y="78" width="52" height="4" rx="1" fill="#F5A623" opacity="0.6" />
        <line x1="12" y1="83" x2="64" y2="83" stroke="#F5A623" strokeWidth="0.8" strokeOpacity="0.5" />

        {/* Action row */}
        <line x1="8" y1="97" x2="80" y2="97" stroke="#243040" strokeWidth="1" />
        <rect x="12" y="100" width="28" height="10" rx="3" fill="#1A3050" />
        <rect x="44" y="100" width="32" height="10" rx="3" fill="#1A3050" />
        <rect x="15" y="103" width="22" height="4" rx="1" fill="#3A70C0" opacity="0.6" />
        <rect x="48" y="103" width="24" height="4" rx="1" fill="#3A70C0" opacity="0.6" />

        {/* Timestamp below card */}
        <rect x="30" y="118" width="28" height="4" rx="1" fill="#384858" opacity="0.7" />

        {/* Clock widget — below notification */}
        <rect x="18" y="126" width="52" height="14" rx="4" fill="#0E1828" opacity="0.7" />
        <rect x="22" y="129" width="24" height="7" rx="2" fill="#203048" opacity="0.8" />
        <rect x="52" y="130" width="14" height="6" rx="1" fill="#182838" opacity="0.7" />

        {/* Screen amber glow edge */}
        <rect x="5" y="8" width="78" height="140" rx="10" fill="none" stroke="#F5A623" strokeWidth="5" strokeOpacity="0.12" />

        {/* Home bar */}
        <rect x="29" y="143" width="30" height="3.5" rx="2" fill="#242038" />

        {/* Side buttons */}
        <rect x="-3" y="38" width="3" height="22" rx="1.5" fill="#0E0C1A" />
        <rect x="-3" y="66" width="3" height="28" rx="1.5" fill="#0E0C1A" />
        <rect x="88" y="50" width="3" height="32" rx="1.5" fill="#0E0C1A" />
      </g>

      {/* ===== HANDWRITTEN NOTE ON TABLE (torn from a pad) ===== */}
      <g transform="translate(852,692) rotate(-7)">
        <rect x="3" y="3" width="82" height="68" rx="1" fill="#2A1808" opacity="0.18" />
        <rect x="0" y="0" width="82" height="68" rx="1" fill="#FFEB50" />
        <rect x="0" y="0" width="82" height="6" fill="#F0D820" opacity="0.55" />
        {[12,22,32,42,52,62].map((y, i) => (
          <line key={i} x1="6" y1={y} x2="76" y2={y - 0.5}
            stroke="#8A6C10" strokeWidth={0.9} strokeOpacity={0.5} />
        ))}
        <text x="6" y="14" fontSize="7" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.82">bit.ly/dhl-zoll-de</text>
        <text x="6" y="24" fontSize="7" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.76">4,95 € Zoll!</text>
        <text x="6" y="34" fontSize="7" fontFamily="Georgia, serif" fill="#C83020" fillOpacity="0.9">!! DRINGEND !!</text>
        <text x="6" y="44" fontSize="6.5" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.72">Snd. Nr. 4829X</text>
      </g>

      {/* ===== BUTTER DISH ===== */}
      <g transform="translate(860,728)">
        <ellipse cx="38" cy="28" rx="40" ry="10" fill="#C0B098" opacity="0.7" />
        <rect x="2" y="6" width="72" height="24" rx="7" fill="#D8C8A8" />
        <rect x="4" y="6" width="68" height="18" rx="6" fill="#F2EACC" />
        <rect x="10" y="4" width="56" height="16" rx="4" fill="#F8EC90" />
        <rect x="10" y="4" width="56" height="16" rx="4" fill="none" stroke="#E8DC7A" strokeWidth="1" />
      </g>

      {/* ══════════════════════════════════════════════════
          LAYER 8 — ATMOSPHERIC LIGHTING & FINISHING
      ══════════════════════════════════════════════════ */}

      {/* Warm morning light falling on table surface */}
      <ellipse cx="560" cy="735" rx="290" ry="68" fill="#FFEF80" opacity="0.09" />

      {/* Under-cabinet shadow */}
      <rect x="755" y="585" width="692" height="18" fill="#1A1008" opacity="0.28" />

      {/* Right wall corner shadow */}
      <rect x="1392" y="0" width="48" height="900" fill="#1A1008" opacity="0.18" />
      {/* Left corner shadow */}
      <rect x="0" y="0" width="50" height="900" fill="#1A1008" opacity="0.15" />

      {/* Ceiling shadow band */}
      <rect y="0" width="1440" height="35" fill="#1A1008" opacity="0.12" />

      {/* Dust motes floating in morning shaft */}
      {[...Array(22)].map((_, i) => {
        const x = 80 + (i * 31) % 560;
        const y = 110 + (i * 43) % 420;
        const r = i % 4 === 0 ? 1.8 : 1.1;
        const op = 0.08 + (i % 5) * 0.038;
        return <circle key={i} cx={x} cy={y} r={r} fill="#FFEF80" opacity={op} />;
      })}
    </svg>
  );
}
