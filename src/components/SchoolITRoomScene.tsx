export default function SchoolITRoomScene() {
  return (
    <svg
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="sc_bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#050A14"/>
          <stop offset="100%" stopColor="#0A1020"/>
        </linearGradient>
        <linearGradient id="sc_floor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0C1520"/>
          <stop offset="100%" stopColor="#080F18"/>
        </linearGradient>
        <linearGradient id="sc_desk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A2030"/>
          <stop offset="100%" stopColor="#101520"/>
        </linearGradient>
        <linearGradient id="sc_monitor1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0A0818"/>
          <stop offset="100%" stopColor="#050510"/>
        </linearGradient>
        <radialGradient id="sc_alertGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E04020" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#E04020" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="sc_blueGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2050E0" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#2050E0" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="sc_serverGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#20A050" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#20A050" stopOpacity="0"/>
        </radialGradient>
        <filter id="sc_shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.7"/>
        </filter>
        <filter id="sc_glow">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="sc_alertGlowFilter">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="sc_wall1Screen">
          <rect x="42" y="98" width="360" height="220"/>
        </clipPath>
        <clipPath id="sc_wall2Screen">
          <rect x="462" y="88" width="360" height="230"/>
        </clipPath>
        <clipPath id="sc_wall3Screen">
          <rect x="882" y="95" width="360" height="220"/>
        </clipPath>
      </defs>

      {/* ── BACKGROUND ── */}
      <rect width="1440" height="900" fill="url(#sc_bg)"/>

      {/* ── FLOOR ── */}
      <rect y="680" width="1440" height="220" fill="url(#sc_floor)"/>
      {[690, 710, 730, 750].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="1440" y2={y} stroke="#1A2A40" strokeOpacity="0.4" strokeWidth="1"/>
      ))}
      {[0, 160, 320, 480, 640, 800, 960, 1120, 1280, 1440].map((x, i) => (
        <line key={i} x1={x} y1="680" x2={x} y2="900" stroke="#1A2A40" strokeOpacity="0.25" strokeWidth="0.5"/>
      ))}

      {/* ── CEILING ── */}
      <rect width="1440" height="50" fill="#050A14"/>
      {/* Ceiling light strip */}
      <rect x="200" y="6" width="1040" height="4" rx="2" fill="#4060A0" fillOpacity="0.4"/>
      <rect x="200" y="6" width="1040" height="4" rx="2" fill="#6080D0" fillOpacity="0.1"/>

      {/* ── BACK WALL ── */}
      <rect y="50" width="1440" height="640" fill="#080C18"/>

      {/* ── WALL-MOUNTED MONITOR 1 (Traffic Spike) ── */}
      <rect x="30" y="82" width="388" height="248" rx="6" fill="#0D1018" filter="url(#sc_shadow)"/>
      <rect x="38" y="90" width="372" height="232" rx="3" fill="#050810"/>
      {/* Label bar */}
      <rect x="38" y="90" width="372" height="20" fill="#0A1020"/>
      <text x="48" y="105" fontFamily="monospace" fontSize="9" fill="#4080D0">NETZWERK TRAFFIC MONITOR</text>
      <text x="380" y="105" fontFamily="monospace" fontSize="8" fill="#E03020" textAnchor="end">⚠ KRITISCH</text>
      {/* Traffic graph */}
      <rect x="42" y="112" width="360" height="180" fill="#030508" clipPath="url(#sc_wall1Screen)"/>
      {/* Y-axis */}
      <line x1="65" y1="115" x2="65" y2="285" stroke="#2A3848" strokeWidth="1"/>
      {/* X-axis */}
      <line x1="65" y1="285" x2="395" y2="285" stroke="#2A3848" strokeWidth="1"/>
      {/* Y labels */}
      {['2.4G', '2.0G', '1.5G', '1.0G', '500M', '50M'].map((l, i) => (
        <text key={i} x="62" y={125 + i * 28} fontFamily="monospace" fontSize="7" fill="#4060A0" textAnchor="end">{l}</text>
      ))}
      {/* Normal traffic flat line */}
      <polyline
        points="68,280 100,280 130,279 155,281 180,280 200,281 220,280"
        stroke="#2050A0" strokeWidth="1.5" fill="none" strokeOpacity="0.7"
      />
      {/* SPIKE — dramatic red */}
      <polyline
        points="220,280 235,270 248,250 258,215 265,175 270,130 274,110 278,105 282,108 286,118 291,140 298,170 308,210 320,240 335,262 355,272 380,278 395,280"
        stroke="#FF2010" strokeWidth="2.5" fill="none" filter="url(#sc_alertGlowFilter)"
      />
      {/* Fill under spike */}
      <polygon
        points="220,282 235,272 248,252 258,217 265,177 270,132 274,112 278,107 282,110 286,120 291,142 298,172 308,212 320,242 335,264 355,274 380,280 395,282"
        fill="#FF2010" fillOpacity="0.12"
      />
      {/* Normal bandwidth label */}
      <text x="90" y="278" fontFamily="monospace" fontSize="7" fill="#2050A0">Normal: 50 Mbps</text>
      {/* Peak label */}
      <text x="246" y="103" fontFamily="monospace" fontSize="8" fill="#FF2010" filter="url(#sc_glow)">2.4 Gbps ▲</text>
      <line x1="278" y1="105" x2="278" y2="285" stroke="#FF2010" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.5"/>
      {/* Time labels */}
      {['09:55', '09:57', '09:59', '10:01', '10:03'].map((t, i) => (
        <text key={i} x={80 + i * 72} y="294" fontFamily="monospace" fontSize="7" fill="#2A3848">{t}</text>
      ))}
      {/* Annotation */}
      <rect x="245" y="88" width="110" height="14" rx="2" fill="#E0201010"/>
      <text x="248" y="99" fontFamily="monospace" fontSize="7.5" fill="#FF4030">ATTACK STARTED 09:58</text>
      {/* Monitor frame decoration */}
      <rect x="30" y="82" width="388" height="6" rx="3" fill="#101828"/>

      {/* ── WALL-MOUNTED MONITOR 2 (Network Topology) ── */}
      <rect x="450" y="72" width="388" height="258" rx="6" fill="#0D1018" filter="url(#sc_shadow)"/>
      <rect x="458" y="80" width="372" height="242" rx="3" fill="#050810"/>
      <rect x="458" y="80" width="372" height="20" fill="#0A1020"/>
      <text x="468" y="95" fontFamily="monospace" fontSize="9" fill="#4080D0">NETZWERK TOPOLOGIE — GYMNASIUM LICHTENBERG</text>
      {/* Network map */}
      <rect x="462" y="102" width="360" height="208" fill="#030508" clipPath="url(#sc_wall2Screen)"/>
      {/* Internet cloud */}
      <ellipse cx="634" cy="120" rx="40" ry="20" fill="#E03020" fillOpacity="0.15" stroke="#E03020" strokeWidth="1.5" strokeOpacity="0.6"/>
      <text x="634" y="124" fontFamily="monospace" fontSize="7.5" fill="#E03020" textAnchor="middle">INTERNET</text>
      <text x="634" y="134" fontFamily="monospace" fontSize="6.5" fill="#E03020" textAnchor="middle">FLOOD</text>
      {/* Router — orange = overloaded */}
      <rect x="606" y="148" width="56" height="22" rx="3" fill="#E08020" fillOpacity="0.8" filter="url(#sc_glow)"/>
      <text x="634" y="163" fontFamily="monospace" fontSize="7" fill="#FFFAF0" textAnchor="middle">ROUTER</text>
      {/* Connection line */}
      <line x1="634" y1="140" x2="634" y2="148" stroke="#E03020" strokeWidth="2" strokeDasharray="2,2"/>
      {/* Switch */}
      <rect x="606" y="180" width="56" height="20" rx="3" fill="#E05020" fillOpacity="0.6"/>
      <text x="634" y="194" fontFamily="monospace" fontSize="7" fill="#FFCCA0" textAnchor="middle">SWITCH</text>
      <line x1="634" y1="170" x2="634" y2="180" stroke="#E05020" strokeWidth="1.5"/>
      {/* Nodes */}
      {[
        { x: 490, y: 228, label: 'EDV-Raum', color: '#E03020', status: 'DOWN' },
        { x: 560, y: 228, label: 'Lehrerraum', color: '#E03020', status: 'DOWN' },
        { x: 634, y: 228, label: 'WLAN-AP', color: '#E08020', status: 'OVER' },
        { x: 710, y: 228, label: 'Prüfung', color: '#E03020', status: 'FAIL' },
        { x: 780, y: 228, label: 'Server', color: '#E05020', status: 'WARN' },
      ].map((n, i) => (
        <g key={i}>
          <line x1={n.x} y1="200" x2={n.x} y2="218" stroke={n.color} strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray={n.status === 'DOWN' ? '3,3' : '1'}/>
          <rect x={n.x - 26} y="218" width="52" height="32" rx="3" fill={n.color} fillOpacity="0.15" stroke={n.color} strokeWidth="1" strokeOpacity="0.6"/>
          <text x={n.x} y="232" fontFamily="monospace" fontSize="6" fill={n.color} textAnchor="middle">{n.label}</text>
          <text x={n.x} y="243" fontFamily="monospace" fontSize="7" fill={n.color} textAnchor="middle" fontWeight="bold">{n.status}</text>
          <circle cx={n.x} cy="218" r="3" fill={n.color} fillOpacity="0.9">
            <animate attributeName="opacity" values="1;0.3;1" dur={`${0.8 + i * 0.2}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}

      {/* ── WALL-MOUNTED MONITOR 3 (Exam System) ── */}
      <rect x="870" y="79" width="388" height="248" rx="6" fill="#0D1018" filter="url(#sc_shadow)"/>
      <rect x="878" y="87" width="372" height="232" rx="3" fill="#050810"/>
      <rect x="878" y="87" width="372" height="20" fill="#0A1020"/>
      <text x="888" y="102" fontFamily="monospace" fontSize="9" fill="#4080D0">SCHULPORTAL HESSEN — PRÜFUNGSSYSTEM</text>
      <text x="1220" y="102" fontFamily="monospace" fontSize="8" fill="#E03020" textAnchor="end">OFFLINE</text>
      {/* Big error display */}
      <rect x="882" y="109" width="360" height="196" fill="#030508" clipPath="url(#sc_wall3Screen)"/>
      <rect x="900" y="118" width="324" height="100" rx="4" fill="#E03020" fillOpacity="0.08" stroke="#E03020" strokeWidth="1" strokeOpacity="0.4"/>
      <text x="1062" y="148" fontFamily="monospace" fontSize="11" fill="#E03020" textAnchor="middle" fontWeight="bold" filter="url(#sc_glow)">VERBINDUNGSFEHLER</text>
      <text x="1062" y="164" fontFamily="monospace" fontSize="8.5" fill="#CC2010" textAnchor="middle">Prüfungsserver nicht erreichbar</text>
      <text x="1062" y="178" fontFamily="monospace" fontSize="8" fill="#AA1808" textAnchor="middle">Verbinde erneut... 0 / 82 Sitzungen aktiv</text>
      <text x="1062" y="192" fontFamily="monospace" fontSize="7.5" fill="#881010" textAnchor="middle">Timeout: 00:11:47 — Keine Antwort</text>
      <text x="1062" y="206" fontFamily="monospace" fontSize="7" fill="#661010" textAnchor="middle">Fehlercode: ECONNRESET 503</text>
      {/* Session list */}
      <text x="886" y="228" fontFamily="monospace" fontSize="7" fill="#4060A0">SCHÜLER SITZUNGEN:</text>
      {['Müller, A.', 'Kaya, D.', 'Schmidt, L.', 'Becker, J.', 'Özdemir, S.'].map((name, i) => (
        <g key={i}>
          <text x="886" y={240 + i * 12} fontFamily="monospace" fontSize="7" fill="#553020">{name}</text>
          <text x="970" y={240 + i * 12} fontFamily="monospace" fontSize="7" fill="#E03020">TIMEOUT</text>
          <text x="1030" y={240 + i * 12} fontFamily="monospace" fontSize="6.5" fill="#442010">Fortschritt verloren</text>
        </g>
      ))}
      <text x="886" y="306" fontFamily="monospace" fontSize="7" fill="#442010">... und 77 weitere Verbindungen</text>

      {/* ── SCHOOL BRANDING on wall ── */}
      <rect x="1300" y="100" width="140" height="80" rx="4" fill="#0A1428" stroke="#1A2A50" strokeWidth="1"/>
      <rect x="1305" y="105" width="130" height="20" rx="2" fill="#1A3080" fillOpacity="0.6"/>
      <text x="1370" y="119" fontFamily="Arial, sans-serif" fontSize="9" fill="#6090E0" textAnchor="middle" fontWeight="bold">GYMNASIUM</text>
      <text x="1370" y="134" fontFamily="Arial, sans-serif" fontSize="8" fill="#4070C0" textAnchor="middle">LICHTENBERG</text>
      <text x="1370" y="148" fontFamily="Arial, sans-serif" fontSize="7" fill="#2050A0" textAnchor="middle">Berlin</text>
      <rect x="1355" y="153" width="30" height="20" rx="3" fill="#1A3080"/>
      <text x="1370" y="166" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#6090E0" textAnchor="middle">IT-Abt.</text>

      {/* ── TEACHER HELP DESK ── */}
      <rect x="160" y="570" width="440" height="30" rx="4" fill="url(#sc_desk)" filter="url(#sc_shadow)"/>
      <rect x="160" y="598" width="440" height="8" fill="#0A0F18"/>
      {/* Legs */}
      <rect x="170" y="598" width="18" height="85" rx="3" fill="#0A0F18"/>
      <rect x="572" y="598" width="18" height="85" rx="3" fill="#0A0F18"/>

      {/* Laptop on teacher desk */}
      <rect x="220" y="486" width="200" height="130" rx="6" fill="#1A1A20" filter="url(#sc_shadow)"/>
      <rect x="226" y="492" width="188" height="118" fill="#0A0E18"/>
      {/* Teacher help desk screen — social media post */}
      <rect x="226" y="492" width="188" height="118" fill="#1C2030"/>
      <rect x="226" y="492" width="188" height="16" fill="#1A1A28"/>
      <text x="232" y="503" fontFamily="monospace" fontSize="7" fill="#6080C0">Discord — #allgemein</text>
      {/* Messages */}
      <rect x="230" y="512" width="180" height="32" rx="3" fill="#252535"/>
      <text x="236" y="523" fontFamily="monospace" fontSize="7" fill="#8898CC">GX_404 (gestern 23:42)</text>
      <text x="236" y="533" fontFamily="monospace" fontSize="8" fill="#E0C080">@school_admin ur</text>
      <text x="236" y="543" fontFamily="monospace" fontSize="8" fill="#E0C080">bio exam getting cancelled</text>
      <rect x="230" y="548" width="180" height="28" rx="3" fill="#1E2030"/>
      <text x="236" y="558" fontFamily="monospace" fontSize="7" fill="#8898CC">GX_404:</text>
      <text x="236" y="568" fontFamily="monospace" fontSize="8" fill="#E0C080">hired a booter 😂 lmao</text>
      <rect x="226" y="580" width="188" height="26" fill="#0A0E18"/>
      <text x="232" y="590" fontFamily="monospace" fontSize="7" fill="#FF4030">⚠ WEITERGELEITET AN IT</text>
      <text x="232" y="600" fontFamily="monospace" fontSize="6.5" fill="#CC2010">Eingang: 10:04 Uhr</text>
      {/* Laptop base */}
      <rect x="214" y="614" width="212" height="8" rx="3" fill="#181820"/>

      {/* ── TABLET with Booter Receipt ── */}
      <rect x="460" y="496" width="160" height="110" rx="6" fill="#181820" filter="url(#sc_shadow)"/>
      <rect x="466" y="502" width="148" height="98" rx="3" fill="#0A0E18"/>
      <rect x="466" y="502" width="148" height="14" fill="#141820"/>
      <text x="472" y="513" fontFamily="monospace" fontSize="6.5" fill="#4060A0">Stresser-Service Email</text>
      <rect x="470" y="518" width="140" height="76" fill="#0D1118"/>
      <text x="474" y="530" fontFamily="monospace" fontSize="6.5" fill="#8898B8">Bestellung #88421</text>
      <text x="474" y="542" fontFamily="monospace" fontSize="7" fill="#E04040" fontWeight="bold">Ziel: [Schul-IP]</text>
      <text x="474" y="554" fontFamily="monospace" fontSize="7" fill="#C03020">Dauer: 60 Min.</text>
      <text x="474" y="566" fontFamily="monospace" fontSize="7" fill="#C03020">Paket: Silver 5Gbps</text>
      <text x="474" y="578" fontFamily="monospace" fontSize="6.5" fill="#808898">Betrag: €15.00</text>
      <text x="474" y="590" fontFamily="monospace" fontSize="6.5" fill="#50A050">Status: Bezahlt ✓</text>

      {/* ── EXAM SCHEDULE on wall ── */}
      <rect x="680" y="460" width="280" height="150" rx="4" fill="#0D1828" stroke="#1A2A40" strokeWidth="1" filter="url(#sc_shadow)"/>
      <rect x="683" y="463" width="274" height="24" rx="2" fill="#1A3080" fillOpacity="0.5"/>
      <text x="820" y="479" fontFamily="Arial, sans-serif" fontSize="9" fill="#6090E0" textAnchor="middle" fontWeight="bold">ABITUR PRÜFUNGSPLAN</text>
      {[
        { time: '10:00', room: 'R 204', subject: 'BIOLOGIE', status: '✗ AUSGEFALLEN' },
        { time: '11:30', room: 'R 108', subject: 'MATHEMATIK', status: '⚠ GEFÄHRDET' },
        { time: '13:00', room: 'R 301', subject: 'DEUTSCH', status: '— AUSSTEHEND' },
      ].map((row, i) => (
        <g key={i}>
          <text x="688" y={499 + i * 32} fontFamily="monospace" fontSize="8.5" fill="#4060A0">{row.time}</text>
          <text x="728" y={499 + i * 32} fontFamily="monospace" fontSize="8" fill="#6080C0">{row.room}</text>
          <text x="760" y={499 + i * 32} fontFamily="monospace" fontSize="9" fill="#A0C0E0" fontWeight="bold">{row.subject}</text>
          <text x="845" y={499 + i * 32} fontFamily="monospace" fontSize="8" fill={i === 0 ? '#E03020' : i === 1 ? '#E08020' : '#606080'}>{row.status}</text>
        </g>
      ))}

      {/* ── ACCESS LOG PRINTOUT ── */}
      <rect x="680" y="540" width="260" height="110" rx="2" fill="#F8F8F0" filter="url(#sc_shadow)" transform="rotate(-1 810 595)"/>
      <text x="688" y="556" fontFamily="Courier New, monospace" fontSize="6.5" fill="#333" fontWeight="bold" transform="rotate(-1 810 595)">ACCESS LOG — 13.11.2024</text>
      <line x1="684" y1="560" x2="936" y2="558" stroke="#CCC" strokeWidth="0.5" transform="rotate(-1 810 595)"/>
      {[
        '10:00:02  185.220.101.15  UDP  →  82.194.22.1',
        '10:00:02  185.220.102.44  UDP  →  82.194.22.1',
        '10:00:03  45.138.157.92   UDP  →  82.194.22.1',
        '10:00:03  178.73.215.18   UDP  →  82.194.22.1',
        '10:00:04  [... 847/s req]  FLOOD  ← MIRAI',
        '10:00:12  SERVICE  TIMEOUT  → LINK DOWN',
      ].map((line, i) => (
        <text key={i} x="688" y={568 + i * 11} fontFamily="Courier New, monospace" fontSize="6" fill={i >= 4 ? '#E03020' : '#555'} transform="rotate(-1 810 595)">{line}</text>
      ))}

      {/* ── SERVER RACK ── */}
      <rect x="1260" y="380" width="160" height="320" rx="4" fill="#0C1018" filter="url(#sc_shadow)"/>
      <rect x="1264" y="384" width="152" height="312" rx="2" fill="#0A0E14"/>
      {/* Rack units */}
      {Array.from({ length: 12 }).map((_, i) => {
        const y = 390 + i * 26;
        const isAlert = [2, 5, 8].includes(i);
        const isWarn = [3, 6].includes(i);
        return (
          <g key={i}>
            <rect x="1266" y={y} width="148" height="22" rx="2" fill={isAlert ? '#200A08' : '#0D1218'} stroke={isAlert ? '#E03020' : '#1A2030'} strokeWidth="0.5"/>
            <circle cx="1279" cy={y + 11} r="4" fill={isAlert ? '#E03020' : isWarn ? '#E08020' : '#20A050'} fillOpacity="0.9">
              {isAlert && <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite"/>}
            </circle>
            <rect x="1286" y={y + 4} width="90" height="3" rx="1" fill="#1A2830" fillOpacity="0.8"/>
            <rect x="1286" y={y + 10} width="60" height="2" rx="1" fill="#142028" fillOpacity="0.6"/>
            <rect x="1286" y={y + 15} width="75" height="2" rx="1" fill="#142028" fillOpacity="0.5"/>
            <text x="1392" y={y + 14} fontFamily="monospace" fontSize="6.5" fill={isAlert ? '#E03020' : isWarn ? '#E08020' : '#20A050'} textAnchor="end">
              {isAlert ? 'ERR' : isWarn ? 'WARN' : 'OK'}
            </text>
          </g>
        );
      })}

      {/* ── EMERGENCY WARNING LIGHT ── */}
      {/* Top-right corner — red rotating beacon */}
      <rect x="1380" y="50" width="40" height="20" rx="10" fill="#E03020" fillOpacity="0.8" filter="url(#sc_alertGlowFilter)">
        <animate attributeName="fillOpacity" values="0.8;0.2;0.8" dur="1.2s" repeatCount="indefinite"/>
      </rect>
      <ellipse cx="1400" cy="55" rx="20" ry="10" fill="#FF4030" fillOpacity="0.5">
        <animate attributeName="fillOpacity" values="0.5;0.1;0.5" dur="1.2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Second warning light — left */}
      <rect x="20" y="50" width="40" height="20" rx="10" fill="#E03020" fillOpacity="0.6" filter="url(#sc_alertGlowFilter)">
        <animate attributeName="fillOpacity" values="0.6;0.1;0.6" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
      </rect>

      {/* ── AMBIENT GLOWS ── */}
      {/* Red screen emergency glow */}
      <rect x="0" y="0" width="1440" height="900" fill="url(#sc_alertGlow)" opacity="0.25"/>
      {/* Blue monitor glow */}
      <ellipse cx="720" cy="200" rx="700" ry="200" fill="url(#sc_blueGlow)" opacity="0.4"/>
      {/* Server green glow */}
      <ellipse cx="1340" cy="540" rx="200" ry="200" fill="url(#sc_serverGlow)" opacity="0.4"/>

      {/* ── FLOOR REFLECTIONS ── */}
      <rect x="0" y="680" width="1440" height="80" fill="radial-gradient(ellipse at 50% 0%, rgba(32,80,224,0.15), transparent 80%)" fillOpacity="0.7"/>

      {/* ── DESK CLUE AREA: STUDENT REPORTS ── */}
      <rect x="150" y="395" width="140" height="90" rx="2" fill="#0E1420" stroke="#1A2A40" strokeWidth="1" filter="url(#sc_shadow)"/>
      <text x="157" y="410" fontFamily="monospace" fontSize="7" fill="#4060A0">PRÜFUNGS-LOG</text>
      {['Müller: VERBINDUNG GETRENNT', 'Kaya: SITZUNG ABGELAUFEN', 'Özdemir: FEHLER 503', 'Schmidt: TIMEOUT', 'Becker: KEINE ANTWORT'].map((s, i) => (
        <text key={i} x="155" y={422 + i * 12} fontFamily="monospace" fontSize="6" fill="#E02010">{s}</text>
      ))}

      {/* ── SMALL DESK MONITOR ── */}
      <rect x="960" y="460" width="260" height="170" rx="6" fill="#0D1018" filter="url(#sc_shadow)"/>
      <rect x="966" y="466" width="248" height="158" rx="3" fill="#050810"/>
      <rect x="966" y="466" width="248" height="16" fill="#0A1020"/>
      <text x="972" y="478" fontFamily="monospace" fontSize="8" fill="#4080D0">ROUTER STATUS</text>
      <text x="1172" y="478" fontFamily="monospace" fontSize="7" fill="#E08020" textAnchor="end">⚠ OVERLOAD</text>
      {/* Router stats */}
      {[
        { label: 'Firmware', value: '2019.04 (!!)', color: '#E03020' },
        { label: 'CPU Load', value: '98%', color: '#E05020' },
        { label: 'Bandwidth', value: '2.4 Gbps / 100 Mbps', color: '#E03020' },
        { label: 'Connections', value: '847/s (limit: 1000)', color: '#E06020' },
        { label: 'CVE-2019-0472', value: 'UNPATCHED', color: '#E03020' },
        { label: 'CVE-2020-1337', value: 'UNPATCHED', color: '#E03020' },
        { label: 'CVE-2021-0674', value: 'UNPATCHED', color: '#E03020' },
        { label: 'Latest FW', value: '2024.08 (available)', color: '#2080E0' },
      ].map((r, i) => (
        <g key={i}>
          <text x="972" y={494 + i * 16} fontFamily="monospace" fontSize="7" fill="#4060A0">{r.label}:</text>
          <text x="1050" y={494 + i * 16} fontFamily="monospace" fontSize="7" fill={r.color}>{r.value}</text>
        </g>
      ))}

      {/* Floor shadow under desks */}
      <rect x="155" y="682" width="448" height="12" rx="4" fill="rgba(0,0,0,0.4)"/>
    </svg>
  );
}
