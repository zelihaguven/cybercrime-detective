export default function PriyaHomeOfficeScene() {
  return (
    <svg
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        {/* Warm afternoon sky gradient */}
        <linearGradient id="pr_sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8B86D" stopOpacity="0.9"/>
          <stop offset="60%" stopColor="#F5CFA0" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#F0E0C8" stopOpacity="0.3"/>
        </linearGradient>
        {/* Window light */}
        <radialGradient id="pr_winLight" cx="88%" cy="30%" r="45%">
          <stop offset="0%" stopColor="#FFDC8A" stopOpacity="0.55"/>
          <stop offset="50%" stopColor="#FFCA60" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#FF9F40" stopOpacity="0"/>
        </radialGradient>
        {/* Floor gradient */}
        <linearGradient id="pr_floor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C4A882"/>
          <stop offset="100%" stopColor="#A8906C"/>
        </linearGradient>
        {/* Wall gradient */}
        <linearGradient id="pr_wall" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EDE0CC"/>
          <stop offset="100%" stopColor="#D8C8B0"/>
        </linearGradient>
        {/* Desk wood */}
        <linearGradient id="pr_desk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B8945A"/>
          <stop offset="50%" stopColor="#A07840"/>
          <stop offset="100%" stopColor="#8B6030"/>
        </linearGradient>
        {/* Desk side */}
        <linearGradient id="pr_deskSide" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7A5020"/>
          <stop offset="100%" stopColor="#5A3810"/>
        </linearGradient>
        {/* Laptop screen gradient */}
        <linearGradient id="pr_screen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A2535"/>
          <stop offset="100%" stopColor="#0D1520"/>
        </linearGradient>
        {/* Cork board */}
        <linearGradient id="pr_cork" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C4995A"/>
          <stop offset="100%" stopColor="#B08040"/>
        </linearGradient>
        {/* Monstera leaf */}
        <radialGradient id="pr_leaf" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4A8040"/>
          <stop offset="100%" stopColor="#2A5C28"/>
        </radialGradient>
        {/* Ambient light overlay */}
        <radialGradient id="pr_ambient" cx="85%" cy="25%" r="55%">
          <stop offset="0%" stopColor="#FFBE60" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#FF8040" stopOpacity="0"/>
        </radialGradient>
        {/* Bookshelf */}
        <linearGradient id="pr_shelf" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9A7850"/>
          <stop offset="100%" stopColor="#7A5830"/>
        </linearGradient>
        {/* Screen glow */}
        <radialGradient id="pr_screenGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4A90D9" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#4A90D9" stopOpacity="0"/>
        </radialGradient>
        <filter id="pr_softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.25"/>
        </filter>
        <filter id="pr_glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="pr_laptopScreen">
          <rect x="360" y="256" width="220" height="145"/>
        </clipPath>
        <clipPath id="pr_monitorClip">
          <rect x="680" y="240" width="180" height="120"/>
        </clipPath>
      </defs>

      {/* ── BACKGROUND ── */}
      <rect width="1440" height="900" fill="#D4C0A0"/>

      {/* Wall */}
      <rect width="1440" height="720" fill="url(#pr_wall)"/>

      {/* Floor */}
      <rect y="690" width="1440" height="210" fill="url(#pr_floor)"/>
      {/* Floor planks */}
      {[700, 720, 740, 760, 780, 800, 820, 840].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="1440" y2={y} stroke="#9A7A58" strokeOpacity="0.2" strokeWidth="1"/>
      ))}
      {[0, 180, 360, 540, 720, 900, 1080, 1260, 1440].map((x, i) => (
        <line key={i} x1={x} y1="690" x2={x} y2="900" stroke="#9A7A58" strokeOpacity="0.15" strokeWidth="0.5"/>
      ))}

      {/* ── LARGE WINDOW (right) ── */}
      {/* Window frame */}
      <rect x="1100" y="40" width="280" height="480" rx="4" fill="#C8B090" filter="url(#pr_softShadow)"/>
      {/* Sky outside */}
      <rect x="1112" y="52" width="256" height="456" fill="url(#pr_sky)"/>
      {/* Buildings silhouette outside */}
      <rect x="1112" y="380" width="50" height="128" fill="#8090A0" fillOpacity="0.5"/>
      <rect x="1150" y="350" width="40" height="158" fill="#7A8898" fillOpacity="0.45"/>
      <rect x="1180" y="400" width="60" height="108" fill="#8090A0" fillOpacity="0.4"/>
      <rect x="1230" y="360" width="45" height="148" fill="#7A8898" fillOpacity="0.5"/>
      <rect x="1265" y="420" width="103" height="88" fill="#8090A0" fillOpacity="0.4"/>
      {/* Window cross */}
      <rect x="1238" y="52" width="4" height="456" fill="#C8B090" fillOpacity="0.8"/>
      <rect x="1112" y="272" width="256" height="4" fill="#C8B090" fillOpacity="0.8"/>
      {/* Window sill */}
      <rect x="1095" y="516" width="290" height="18" rx="2" fill="#D8C8A8"/>
      {/* Warm light shaft */}
      <polygon points="1112,52 1368,52 1440,300 1440,0 1112,0" fill="url(#pr_winLight)" opacity="0.7"/>

      {/* ── LEFT WALL CORK BOARDS ── */}
      {/* Cork board 1 */}
      <rect x="30" y="60" width="200" height="270" rx="4" fill="#6A4A20" filter="url(#pr_softShadow)"/>
      <rect x="38" y="68" width="184" height="254" rx="2" fill="url(#pr_cork)"/>
      {/* Moodboard items pinned to cork */}
      <rect x="45" y="75" width="70" height="50" rx="2" fill="#E8D5C0" opacity="0.9"/>
      <rect x="48" y="78" width="64" height="44" rx="1" fill="#C4A880"/>
      <rect x="50" y="80" width="60" height="20" fill="#8B6040" fillOpacity="0.6"/>
      <rect x="50" y="102" width="30" height="18" fill="#D4905A" fillOpacity="0.7"/>
      <rect x="82" y="102" width="28" height="18" fill="#6A9070" fillOpacity="0.7"/>
      {/* Color swatches strip */}
      {['#E8604A', '#E8A84A', '#4A8A5A', '#4A6AB0', '#8A4AB0', '#E8E850'].map((c, i) => (
        <rect key={i} x={45 + i * 18} y="130" width="16" height="16" rx="2" fill={c} opacity="0.85"/>
      ))}
      {/* Magazine tearout */}
      <rect x="122" y="75" width="90" height="68" rx="2" fill="#F0E8D8" opacity="0.9"/>
      <rect x="125" y="78" width="84" height="50" fill="#D0B898"/>
      <rect x="125" y="130" width="84" height="4" fill="#8A6A4A" fillOpacity="0.5"/>
      <rect x="125" y="136" width="60" height="3" fill="#8A6A4A" fillOpacity="0.4"/>
      {/* Fabric swatch */}
      <rect x="45" y="152" width="55" height="40" rx="2" fill="#6A8AA0" opacity="0.8"/>
      <line x1="45" y1="160" x2="100" y2="160" stroke="#5A7A90" strokeWidth="1" strokeOpacity="0.5"/>
      <line x1="45" y1="168" x2="100" y2="168" stroke="#5A7A90" strokeWidth="1" strokeOpacity="0.5"/>
      {/* Photo printout */}
      <rect x="108" y="152" width="100" height="70" rx="2" fill="#F5F0E8" opacity="0.9"/>
      <rect x="112" y="156" width="92" height="60" fill="#C0A888"/>
      <rect x="112" y="195" width="92" height="18" fill="#E8D8C0" fillOpacity="0.8"/>
      <rect x="115" y="198" width="70" height="3" fill="#8A6A4A" fillOpacity="0.5"/>
      <rect x="115" y="203" width="50" height="2" fill="#8A6A4A" fillOpacity="0.4"/>
      {/* Typography note */}
      <rect x="45" y="200" width="80" height="55" rx="2" fill="#FFF8E8" opacity="0.95"/>
      <text x="52" y="218" fontFamily="Georgia, serif" fontSize="8" fill="#4A3020">Thinking</text>
      <text x="52" y="228" fontFamily="Georgia, serif" fontSize="8" fill="#4A3020">with Type</text>
      <line x1="50" y1="233" x2="120" y2="233" stroke="#C4A868" strokeWidth="0.5"/>
      <text x="52" y="242" fontFamily="Georgia, serif" fontSize="7" fill="#7A6050">Grid Systems</text>
      <text x="52" y="250" fontFamily="Georgia, serif" fontSize="7" fill="#7A6050">in Design</text>
      {/* Push pins */}
      <circle cx="45" cy="75" r="3" fill="#E05050"/>
      <circle cx="210" cy="75" r="3" fill="#50A0E0"/>
      <circle cx="45" cy="315" r="3" fill="#F5A620"/>
      <circle cx="210" cy="315" r="3" fill="#50C850"/>

      {/* Cork board 2 */}
      <rect x="248" y="60" width="180" height="270" rx="4" fill="#6A4A20" filter="url(#pr_softShadow)"/>
      <rect x="256" y="68" width="164" height="254" rx="2" fill="url(#pr_cork)"/>
      {/* Client folders pinned */}
      <rect x="262" y="75" width="70" height="90" rx="2" fill="#E84040" opacity="0.85"/>
      <rect x="264" y="77" width="66" height="86" fill="#D03030" fillOpacity="0.6"/>
      <text x="268" y="112" fontFamily="Arial, sans-serif" fontSize="7" fill="#FFF8F8" fontWeight="bold">TechFlow</text>
      <text x="268" y="121" fontFamily="Arial, sans-serif" fontSize="7" fill="#FFF8F8">Rebrand</text>
      <rect x="342" y="75" width="68" height="90" rx="2" fill="#4090E0" opacity="0.85"/>
      <rect x="344" y="77" width="64" height="86" fill="#3080D0" fillOpacity="0.6"/>
      <text x="348" y="112" fontFamily="Arial, sans-serif" fontSize="7" fill="#F0F8FF" fontWeight="bold">Bakery</text>
      <text x="348" y="121" fontFamily="Arial, sans-serif" fontSize="7" fill="#F0F8FF">Logo</text>
      {/* Sticky notes */}
      <rect x="262" y="175" width="65" height="50" rx="2" fill="#FFEE80" opacity="0.95"/>
      <text x="267" y="192" fontFamily="Arial, sans-serif" fontSize="7" fill="#3A3010">Call client</text>
      <text x="267" y="202" fontFamily="Arial, sans-serif" fontSize="7" fill="#3A3010">re: revisions</text>
      <text x="267" y="212" fontFamily="Arial, sans-serif" fontSize="7" fill="#3A3010">by Friday!</text>
      <rect x="338" y="175" width="68" height="50" rx="2" fill="#FFB0B0" opacity="0.95"/>
      <text x="343" y="192" fontFamily="Arial, sans-serif" fontSize="7" fill="#500010">⚠ DEADLINE</text>
      <text x="343" y="202" fontFamily="Arial, sans-serif" fontSize="7" fill="#500010">Wohndesign</text>
      <text x="343" y="212" fontFamily="Arial, sans-serif" fontSize="7" fill="#500010">pitch: Mo 9am</text>
      {/* Color palette row */}
      {['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF'].map((c, i) => (
        <rect key={i} x={263 + i * 27} y="233" width="24" height="30" rx="2" fill={c} opacity="0.9"/>
      ))}
      <circle cx="263" cy="75" r="3" fill="#E05050"/>
      <circle cx="402" cy="75" r="3" fill="#50A0E0"/>

      {/* Cork board 3 */}
      <rect x="446" y="60" width="200" height="270" rx="4" fill="#6A4A20" filter="url(#pr_softShadow)"/>
      <rect x="454" y="68" width="184" height="254" rx="2" fill="url(#pr_cork)"/>
      {/* Inspiration images */}
      <rect x="460" y="75" width="80" height="60" rx="2" fill="#F0E8D8"/>
      <rect x="463" y="78" width="74" height="52" fill="#B09878"/>
      <rect x="550" y="75" width="80" height="60" rx="2" fill="#F0E8D8"/>
      <rect x="553" y="78" width="74" height="52" fill="#8090A8"/>
      {/* Password sticky note — KEY CLUE */}
      <rect x="460" y="143" width="78" height="52" rx="2" fill="#FFB0D8" opacity="0.97"/>
      <text x="465" y="160" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#500030" fontWeight="bold">PW: summer2019!</text>
      <text x="465" y="172" fontFamily="Arial, sans-serif" fontSize="7" fill="#700050">(same as usual)</text>
      <text x="465" y="184" fontFamily="Arial, sans-serif" fontSize="7" fill="#900060">😬 change this</text>
      <text x="465" y="194" fontFamily="Arial, sans-serif" fontSize="7" fill="#900060">week!!</text>
      {/* Design books */}
      <rect x="548" y="143" width="82" height="40" rx="2" fill="#F5F0E8"/>
      <rect x="551" y="146" width="76" height="34" fill="#E0D8C8"/>
      <text x="556" y="160" fontFamily="Georgia, serif" fontSize="7" fill="#4A3820">Grid Systems</text>
      <text x="556" y="170" fontFamily="Georgia, serif" fontSize="7" fill="#4A3820">in Graphic</text>
      <text x="556" y="180" fontFamily="Georgia, serif" fontSize="7" fill="#4A3820">Design</text>
      {/* String connections between notes */}
      <line x1="498" y1="168" x2="548" y2="163" stroke="#C0A080" strokeWidth="0.7" strokeDasharray="3,2" strokeOpacity="0.6"/>
      <circle cx="459" cy="75" r="3" fill="#F5A620"/>
      <circle cx="633" cy="75" r="3" fill="#50C850"/>

      {/* ── BOOKSHELF (left wall) ── */}
      <rect x="0" y="350" width="30" height="340" fill="url(#pr_shelf)"/>
      <rect x="30" y="350" width="8" height="340" fill="#6A4820" fillOpacity="0.4"/>
      {/* Books on shelf */}
      {[
        { x: 0, h: 120, c: '#D04A30' },
        { x: 0, h: 110, c: '#3060C0' },
        { x: 0, h: 135, c: '#208040' },
        { x: 0, h: 115, c: '#B060A0' },
        { x: 0, h: 125, c: '#C08020' },
        { x: 0, h: 108, c: '#404040' },
      ].map((b, i) => (
        <rect key={i} x={2} y={360 + i * 0} width={24} height={b.h} fill={b.c} fillOpacity="0.85"/>
      ))}

      {/* ── MAIN DESK ── */}
      {/* Desk surface */}
      <rect x="260" y="580" width="860" height="28" rx="4" fill="url(#pr_desk)" filter="url(#pr_softShadow)"/>
      {/* Desk front panel */}
      <rect x="260" y="608" width="860" height="8" rx="2" fill="#8A6030"/>
      {/* Desk legs */}
      <rect x="270" y="608" width="28" height="90" rx="2" fill="url(#pr_deskSide)"/>
      <rect x="1080" y="608" width="28" height="90" rx="2" fill="url(#pr_deskSide)"/>
      <rect x="580" y="608" width="20" height="90" rx="2" fill="url(#pr_deskSide)"/>
      {/* Under-desk cable management */}
      <rect x="300" y="615" width="200" height="6" rx="3" fill="#5A3810" fillOpacity="0.4"/>

      {/* ── MONITOR (secondary, right side of desk) ── */}
      {/* Monitor stand */}
      <rect x="750" y="480" width="16" height="100" rx="4" fill="#303030"/>
      <rect x="720" y="572" width="76" height="10" rx="3" fill="#282828"/>
      {/* Monitor frame */}
      <rect x="660" y="320" width="220" height="165" rx="6" fill="#1A1A1A" filter="url(#pr_softShadow)"/>
      <rect x="668" y="328" width="204" height="150" fill="#0D1520"/>
      {/* Monitor screen — Figma/design tool */}
      <rect x="668" y="328" width="204" height="150" fill="url(#pr_screen)" clipPath="url(#pr_monitorClip)"/>
      {/* Figma-like toolbar */}
      <rect x="668" y="328" width="204" height="18" fill="#2C2C2C"/>
      <circle cx="680" cy="337" r="4" fill="#FF5F56"/>
      <circle cx="692" cy="337" r="4" fill="#FFBD2E"/>
      <circle cx="704" cy="337" r="4" fill="#27C93F"/>
      <text x="720" y="341" fontFamily="monospace" fontSize="7" fill="#A0A0A0">TechFlow_Rebrand_v7.fig</text>
      {/* Canvas with artboard */}
      <rect x="690" y="352" width="80" height="60" rx="2" fill="#383838"/>
      <rect x="695" y="357" width="70" height="50" fill="#4A4A4A"/>
      <rect x="698" y="360" width="64" height="18" fill="#E84040" fillOpacity="0.8"/>
      <rect x="698" y="381" width="30" height="22" fill="#4090D0" fillOpacity="0.8"/>
      <rect x="732" y="381" width="30" height="22" fill="#E0A030" fillOpacity="0.8"/>
      {/* Layer panel */}
      <rect x="778" y="348" width="80" height="120" fill="#2C2C2C"/>
      <text x="782" y="360" fontFamily="monospace" fontSize="6.5" fill="#888">Layers</text>
      <line x1="778" y1="364" x2="858" y2="364" stroke="#444" strokeWidth="0.5"/>
      {['▶ Logo Group', '▼ Colors', '  ■ Primary', '  ■ Accent', '▶ Typography', '▶ Grid'].map((l, i) => (
        <text key={i} x="782" y={374 + i * 11} fontFamily="monospace" fontSize="6" fill={i === 0 ? '#D0D0D0' : '#888'}>{l}</text>
      ))}

      {/* ── LAPTOP (main, center-left of desk) ── */}
      {/* Laptop lid */}
      <rect x="340" y="248" width="264" height="180" rx="8" fill="#D0D0C8" filter="url(#pr_softShadow)"/>
      <rect x="348" y="256" width="248" height="164" rx="4" fill="#111820"/>
      {/* Screen content — Gmail inbox */}
      <rect x="352" y="260" width="240" height="156" fill="#F8F9FA" clipPath="url(#pr_laptopScreen)"/>
      {/* Gmail header */}
      <rect x="352" y="260" width="240" height="20" fill="#FFFFFF"/>
      <text x="357" y="273" fontFamily="Arial, sans-serif" fontSize="8" fill="#EA4335" fontWeight="bold">Gmail</text>
      <rect x="390" y="265" width="120" height="10" rx="5" fill="#F1F3F4"/>
      <text x="396" y="273" fontFamily="Arial, sans-serif" fontSize="7" fill="#888">Search mail</text>
      {/* Inbox rows */}
      <rect x="352" y="280" width="240" height="20" fill="#FCE8E6"/>
      <rect x="354" y="283" width="3" height="14" rx="1" fill="#EA4335"/>
      <text x="362" y="292" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#202124" fontWeight="bold">Canva</text>
      <text x="395" y="292" fontFamily="Arial, sans-serif" fontSize="7" fill="#EA4335" fontWeight="bold">Your Canva account was accessed from an unknown device</text>
      <text x="362" y="299" fontFamily="Arial, sans-serif" fontSize="6.5" fill="#5F6368">2 minutes ago</text>
      <rect x="352" y="300" width="240" height="16" fill="#FFFFFF"/>
      <text x="362" y="311" fontFamily="Arial, sans-serif" fontSize="7" fill="#444">Adobe</text>
      <text x="392" y="311" fontFamily="Arial, sans-serif" fontSize="7" fill="#888">Storage limit 90% full — consider upgrading</text>
      <rect x="352" y="316" width="240" height="16" fill="#F8F9FA"/>
      <text x="362" y="327" fontFamily="Arial, sans-serif" fontSize="7" fill="#444">Dropbox</text>
      <text x="396" y="327" fontFamily="Arial, sans-serif" fontSize="7" fill="#888">Priya, your shared folder was updated</text>
      <rect x="352" y="332" width="240" height="16" fill="#FFFFFF"/>
      <text x="362" y="343" fontFamily="Arial, sans-serif" fontSize="7" fill="#444">Figma</text>
      <text x="390" y="343" fontFamily="Arial, sans-serif" fontSize="7" fill="#888">Weekly digest: 3 new comments</text>
      <rect x="352" y="348" width="240" height="16" fill="#F8F9FA"/>
      <text x="362" y="359" fontFamily="Arial, sans-serif" fontSize="7" fill="#444">Client</text>
      <text x="390" y="359" fontFamily="Arial, sans-serif" fontSize="7" fill="#888">Re: invoice #2847 — please confirm...</text>
      {/* Bottom of screen */}
      <rect x="352" y="400" width="240" height="16" fill="#FFFFFF"/>
      <text x="362" y="411" fontFamily="Arial, sans-serif" fontSize="7" fill="#888">Showing 5 of 2,847 messages</text>
      {/* Screen glow on desk */}
      <ellipse cx="466" cy="445" rx="100" ry="8" fill="#4A90D9" fillOpacity="0.08"/>
      {/* Laptop base */}
      <rect x="330" y="428" width="284" height="12" rx="4" fill="#C8C8C0"/>
      <rect x="440" y="438" width="64" height="6" rx="3" fill="#B0B0A8"/>
      {/* Trackpad */}
      <rect x="434" y="434" width="76" height="48" rx="4" fill="#C0C0B8" stroke="#A8A8A0" strokeWidth="0.5"/>
      {/* Keyboard area */}
      <rect x="334" y="428" width="280" height="6" rx="2" fill="#C0C0B8"/>

      {/* ── DRAWING TABLET ── */}
      <rect x="680" y="550" width="280" height="185" rx="6" fill="#2A2A2A" filter="url(#pr_softShadow)"/>
      <rect x="694" y="562" width="252" height="165" rx="2" fill="#1E1E1E"/>
      {/* Tablet active area — light indicator */}
      <rect x="698" y="566" width="244" height="157" rx="1" fill="#1A1A1A" stroke="#3A3A3A" strokeWidth="0.5"/>
      {/* Sketch on tablet */}
      <path d="M720,620 C740,600 780,595 800,610 C820,625 830,650 815,665 C800,680 770,682 750,670 C730,658 718,640 720,620 Z" stroke="#4A4A5A" strokeWidth="1.5" fill="none" strokeDasharray="4,3"/>
      <path d="M735,635 L785,630 L790,655 L740,660 Z" stroke="#5A5A6A" strokeWidth="1" fill="none"/>
      {/* Stylus */}
      <rect x="898" y="548" width="8" height="90" rx="4" fill="#E0E0D8" transform="rotate(-15 902 590)"/>
      <rect x="899" y="548" width="6" height="10" rx="2" fill="#C0C0B8" transform="rotate(-15 902 590)"/>
      <ellipse cx="903" cy="637" rx="3" ry="3" fill="#404040" transform="rotate(-15 902 590)"/>
      {/* Tablet buttons */}
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x="688" y={575 + i * 22} width="5" height="14" rx="2" fill="#404040"/>
      ))}

      {/* ── EXTERNAL HARD DRIVES ── */}
      {/* Drive 1 */}
      <rect x="980" y="508" width="100" height="60" rx="4" fill="#303038" filter="url(#pr_softShadow)"/>
      <rect x="984" y="512" width="92" height="52" rx="2" fill="#282830"/>
      <rect x="988" y="516" width="60" height="4" rx="1" fill="#1A1A20"/>
      <rect x="988" y="522" width="44" height="3" rx="1" fill="#1A1A20"/>
      <circle cx="1060" cy="522" r="4" fill="#00A0A0" opacity="0.8"/>
      <text x="989" y="540" fontFamily="monospace" fontSize="7" fill="#8080A0">SEAGATE</text>
      <text x="989" y="550" fontFamily="monospace" fontSize="6.5" fill="#606070">Client Archives</text>
      <text x="989" y="558" fontFamily="monospace" fontSize="6" fill="#E05050">UNENCRYPTED</text>
      {/* Drive 2 stacked on top */}
      <rect x="980" y="450" width="100" height="58" rx="4" fill="#353540" filter="url(#pr_softShadow)"/>
      <rect x="984" y="454" width="92" height="50" rx="2" fill="#2C2C38"/>
      <text x="989" y="476" fontFamily="monospace" fontSize="7" fill="#8080A0">WD MY PASSPORT</text>
      <text x="989" y="488" fontFamily="monospace" fontSize="6.5" fill="#606070">2020-Archive</text>
      <circle cx="1060" cy="467" r="4" fill="#4080FF" opacity="0.7"/>

      {/* ── DESIGN NOTEBOOKS ── */}
      <rect x="1100" y="518" width="60" height="80" rx="3" fill="#2A3020" filter="url(#pr_softShadow)"/>
      <rect x="1103" y="521" width="54" height="74" rx="2" fill="#344028"/>
      <rect x="1103" y="521" width="8" height="74" rx="2" fill="#202818" fillOpacity="0.8"/>
      <line x1="1106" y1="530" x2="1106" y2="590" stroke="#4A5840" strokeWidth="0.5"/>
      <text x="1118" y="545" fontFamily="Georgia, serif" fontSize="6.5" fill="#8A9878">Moleskine</text>
      <text x="1118" y="556" fontFamily="Georgia, serif" fontSize="6" fill="#6A7858">Sketchbook</text>
      {/* Second notebook */}
      <rect x="1164" y="524" width="52" height="74" rx="3" fill="#382820" filter="url(#pr_softShadow)"/>
      <rect x="1167" y="527" width="46" height="68" rx="2" fill="#442E24"/>
      <rect x="1167" y="527" width="7" height="68" fill="#2A1C14"/>

      {/* ── DESIGN BOOKS on shelf ── */}
      {[
        { x: 1100, w: 18, h: 60, c: '#204080', title: 'Grid' },
        { x: 1120, w: 20, h: 65, c: '#802020', title: 'Type' },
        { x: 1142, w: 16, h: 58, c: '#208040', title: 'IDEO' },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={518 - b.h} width={b.w} height={b.h} fill={b.c} fillOpacity="0.9"/>
          <rect x={b.x} y={518 - b.h} width="3" height={b.h} fill="rgba(0,0,0,0.3)"/>
        </g>
      ))}

      {/* ── COFFEE MUG ── */}
      <rect x="615" y="526" width="46" height="52" rx="6" fill="#E8D8C8"/>
      <rect x="619" y="530" width="38" height="44" rx="4" fill="#D8C8B8"/>
      {/* Coffee liquid */}
      <ellipse cx="638" cy="538" rx="16" ry="5" fill="#6A4020"/>
      {/* Steam */}
      <path d="M628,524 C626,516 630,512 628,506" stroke="#C8B898" strokeWidth="1.5" fill="none" strokeOpacity="0.6"/>
      <path d="M636,522 C634,514 638,510 636,504" stroke="#C8B898" strokeWidth="1.5" fill="none" strokeOpacity="0.5"/>
      <path d="M644,524 C642,516 646,512 644,506" stroke="#C8B898" strokeWidth="1.5" fill="none" strokeOpacity="0.6"/>
      {/* Mug handle */}
      <path d="M661,532 C670,532 672,542 672,548 C672,558 668,562 661,562" stroke="#D8C8B8" strokeWidth="4" fill="none"/>
      {/* Mug text */}
      <text x="622" y="554" fontFamily="Arial, sans-serif" fontSize="6.5" fill="#8A6848">Priya</text>

      {/* ── STICKY NOTES on desk ── */}
      {/* Password reuse sticky near laptop */}
      <rect x="330" y="480" width="70" height="52" rx="2" fill="#FFE880" opacity="0.97" transform="rotate(-3 365 506)"/>
      <text x="335" y="496" fontFamily="Arial, sans-serif" fontSize="7" fill="#3A3010" transform="rotate(-3 365 506)">Same PW</text>
      <text x="335" y="506" fontFamily="Arial, sans-serif" fontSize="7" fill="#3A3010" transform="rotate(-3 365 506)">everywhere 😬</text>
      <text x="335" y="516" fontFamily="Arial, sans-serif" fontSize="7" fill="#803010" transform="rotate(-3 365 506)">change this wk!</text>
      {/* Pink sticky — client call */}
      <rect x="530" y="482" width="68" height="50" rx="2" fill="#FFB8C8" opacity="0.97" transform="rotate(2 564 507)"/>
      <text x="534" y="498" fontFamily="Arial, sans-serif" fontSize="7" fill="#500030" transform="rotate(2 564 507)">Canva backup</text>
      <text x="534" y="508" fontFamily="Arial, sans-serif" fontSize="7" fill="#500030" transform="rotate(2 564 507)">→ Figma export</text>
      <text x="534" y="518" fontFamily="Arial, sans-serif" fontSize="7" fill="#700050" transform="rotate(2 564 507)">URGENT</text>
      {/* Mint sticky */}
      <rect x="610" y="484" width="64" height="50" rx="2" fill="#B8F0D8" opacity="0.97" transform="rotate(-1 642 509)"/>
      <text x="614" y="500" fontFamily="Arial, sans-serif" fontSize="7" fill="#103020" transform="rotate(-1 642 509)">Invoice</text>
      <text x="614" y="510" fontFamily="Arial, sans-serif" fontSize="7" fill="#103020" transform="rotate(-1 642 509)">#2847</text>
      <text x="614" y="520" fontFamily="Arial, sans-serif" fontSize="7" fill="#103020" transform="rotate(-1 642 509)">send today!</text>

      {/* ── INVOICES / PAPERS ── */}
      <rect x="420" y="488" width="100" height="88" rx="2" fill="#F8F5EE" transform="rotate(-5 470 532)" filter="url(#pr_softShadow)"/>
      <rect x="416" y="490" width="100" height="88" rx="2" fill="#FFFFFF" transform="rotate(-2 466 534)" filter="url(#pr_softShadow)"/>
      <text x="424" y="506" fontFamily="Arial, sans-serif" fontSize="7" fill="#333" transform="rotate(-2 466 534)">INVOICE #2847</text>
      <line x1="420" y1="511" x2="508" y2="511" stroke="#CCC" strokeWidth="0.5" transform="rotate(-2 466 534)"/>
      {['Client: Haus & Wohnen GmbH', 'Project: Brand Identity', 'Amount: €4,800.00', 'Due: 2024-11-15', 'Status: UNPAID'].map((line, i) => (
        <text key={i} x="420" y={520 + i * 10} fontFamily="Arial, sans-serif" fontSize="6.5" fill={i === 4 ? '#E04040' : '#555'} transform="rotate(-2 466 534)">{line}</text>
      ))}

      {/* ── INDOOR PLANTS ── */}
      {/* Monstera (left corner) */}
      <rect x="50" y="640" width="60" height="80" rx="8" fill="#8A7060" filter="url(#pr_softShadow)"/>
      <rect x="60" y="646" width="40" height="70" rx="6" fill="#A08070"/>
      <ellipse cx="75" cy="640" rx="35" ry="8" fill="#7A6050" fillOpacity="0.5"/>
      {/* Monstera leaves */}
      <path d="M80,580 C60,560 40,540 45,510 C50,485 70,480 85,490 C100,500 95,530 80,540 C90,530 110,520 115,500 C118,488 112,475 100,472 C88,469 72,478 65,490" stroke="#3A6830" strokeWidth="2" fill="#4A8040" fillOpacity="0.8"/>
      <path d="M60,600 C40,580 25,555 35,530 C45,508 68,510 78,525 C88,540 80,570 60,580" fill="#4A8040" fillOpacity="0.75"/>
      <path d="M90,590 C115,572 130,548 118,525 C108,506 85,508 78,525" fill="#3A7030" fillOpacity="0.8"/>
      <path d="M68,555 C48,535 40,510 55,495" stroke="#2A5820" strokeWidth="1" fill="none"/>
      {/* Cactus (right) */}
      <rect x="1340" y="630" width="60" height="70" rx="6" fill="#8A7060" filter="url(#pr_softShadow)"/>
      <rect x="1350" y="636" width="40" height="62" rx="5" fill="#A08070"/>
      {/* Cactus body */}
      <rect x="1358" y="540" width="28" height="96" rx="14" fill="#508840"/>
      {/* Cactus arms */}
      <path d="M1358,565 C1338,565 1330,572 1332,582 C1334,590 1348,592 1358,585" fill="#508840" stroke="#3A6830" strokeWidth="1"/>
      <path d="M1386,570 C1406,570 1414,577 1412,587 C1410,595 1396,597 1386,590" fill="#508840" stroke="#3A6830" strokeWidth="1"/>
      {/* Cactus spines */}
      {[555, 570, 585, 600, 615].map((y, i) => (
        <g key={i}>
          <line x1="1362" y1={y} x2="1356" y2={y - 4} stroke="#F0E8D0" strokeWidth="0.8"/>
          <line x1="1382" y1={y} x2="1388" y2={y - 4} stroke="#F0E8D0" strokeWidth="0.8"/>
        </g>
      ))}

      {/* ── DESK LAMP ── */}
      <rect x="1220" y="540" width="8" height="80" rx="4" fill="#707070"/>
      <path d="M1224,540 C1230,520 1250,510 1268,515 C1286,520 1290,535 1280,545 C1270,555 1250,552 1236,548" stroke="#808080" strokeWidth="5" fill="none"/>
      <ellipse cx="1272" cy="520" rx="22" ry="12" fill="#909090" transform="rotate(-20 1272 520)"/>
      {/* Lamp off — afternoon sun is on */}
      <ellipse cx="1272" cy="520" rx="18" ry="10" fill="#404040" transform="rotate(-20 1272 520)"/>
      <rect x="1220" y="618" width="40" height="6" rx="3" fill="#606060"/>

      {/* ── AMBIENT LIGHT OVERLAY ── */}
      <rect width="1440" height="900" fill="url(#pr_ambient)"/>

      {/* ── WINDOW LIGHT SHAFT ── */}
      <polygon points="1100,40 1380,40 1440,450 1440,0 1100,0" fill="#FFDC80" fillOpacity="0.04"/>
      <polygon points="1100,40 1440,180 1440,40" fill="#FFDC80" fillOpacity="0.06"/>

      {/* ── FLOOR SHADOW ── */}
      <rect x="260" y="695" width="860" height="12" rx="4" fill="rgba(0,0,0,0.12)"/>

      {/* ── ATMOSPHERIC OVERLAY ── */}
      <rect width="1440" height="900" fill="radial-gradient(ellipse at 88% 25%, rgba(255,200,80,0.08), transparent 65%)" fillOpacity="0.4"/>
    </svg>
  );
}
