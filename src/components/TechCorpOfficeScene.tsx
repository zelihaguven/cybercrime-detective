export default function TechCorpOfficeScene() {
  return (
    <svg
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="tc_bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#05080E"/>
          <stop offset="100%" stopColor="#080C14"/>
        </linearGradient>
        <linearGradient id="tc_window" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#070E1E"/>
          <stop offset="100%" stopColor="#050A16"/>
        </linearGradient>
        <linearGradient id="tc_floor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0A0E18"/>
          <stop offset="100%" stopColor="#06080E"/>
        </linearGradient>
        <linearGradient id="tc_desk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1C2030"/>
          <stop offset="100%" stopColor="#121620"/>
        </linearGradient>
        <radialGradient id="tc_cityGlow" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#2040A0" stopOpacity="0.35"/>
          <stop offset="50%" stopColor="#104080" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#040814" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="tc_screenBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3060D0" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#3060D0" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="tc_alertRed" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E02020" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#E02020" stopOpacity="0"/>
        </radialGradient>
        <filter id="tc_shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.7"/>
        </filter>
        <filter id="tc_glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="tc_strongGlow">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="tc_leftScreen">
          <rect x="204" y="268" width="236" height="160"/>
        </clipPath>
        <clipPath id="tc_rightScreen">
          <rect x="476" y="260" width="236" height="168"/>
        </clipPath>
        <clipPath id="tc_hrScreen">
          <rect x="820" y="282" width="200" height="150"/>
        </clipPath>
        <clipPath id="tc_wallScreen">
          <rect x="960" y="92" width="360" height="240"/>
        </clipPath>
      </defs>

      {/* ── BACKGROUND ── */}
      <rect width="1440" height="900" fill="url(#tc_bg)"/>

      {/* ── FLOOR ── */}
      <rect y="700" width="1440" height="200" fill="url(#tc_floor)"/>
      {/* Polished floor reflections */}
      {[710, 730, 750, 770].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="1440" y2={y} stroke="#1A2438" strokeOpacity="0.3" strokeWidth="0.5"/>
      ))}

      {/* ── CEILING ── */}
      <rect width="1440" height="40" fill="#040608"/>
      {/* Recessed lighting strips */}
      <rect x="300" y="10" width="840" height="2" rx="1" fill="#3050A0" fillOpacity="0.3"/>

      {/* ── LARGE FLOOR-TO-CEILING WINDOWS ── */}
      {/* Window frame */}
      <rect x="0" y="40" width="960" height="680" fill="#0B1020"/>
      {/* Window panes */}
      {[0, 1, 2, 3, 4].map(i => (
        <g key={i}>
          <rect x={i * 192} y="40" width="188" height="680" fill="url(#tc_window)"/>
          {/* Vertical mullion */}
          <rect x={i * 192 + 188} y="40" width="4" height="680" fill="#0D1420"/>
          {/* Horizontal mullion */}
          <rect x={i * 192} y="240" width="188" height="3" fill="#0D1420"/>
        </g>
      ))}

      {/* ── BERLIN CITY SKYLINE (night) ── */}
      {/* Sky gradient */}
      <rect x="0" y="40" width="960" height="680" fill="url(#tc_cityGlow)"/>

      {/* Background buildings (far) */}
      {[
        { x: 0, w: 60, h: 280, c: '#0A1428' },
        { x: 55, w: 80, h: 320, c: '#0C1530' },
        { x: 130, w: 50, h: 260, c: '#0A1228' },
        { x: 175, w: 90, h: 350, c: '#0E1838' },
        { x: 260, w: 60, h: 300, c: '#0C1530' },
        { x: 315, w: 100, h: 280, c: '#0A1228' },
        { x: 410, w: 70, h: 340, c: '#0D1630' },
        { x: 475, w: 85, h: 290, c: '#0B1328' },
        { x: 555, w: 65, h: 360, c: '#0C1530' },
        { x: 615, w: 90, h: 300, c: '#0A1228' },
        { x: 700, w: 60, h: 270, c: '#0C1430' },
        { x: 755, w: 100, h: 320, c: '#0D1630' },
        { x: 850, w: 70, h: 280, c: '#0B1328' },
        { x: 915, w: 55, h: 340, c: '#0C1530' },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={720 - b.h} width={b.w} height={b.h} fill={b.c}/>
      ))}

      {/* TV Tower (Fernsehturm) silhouette */}
      <rect x="430" y="200" width="12" height="520" fill="#0E1838"/>
      <ellipse cx="436" cy="280" rx="28" ry="30" fill="#0E1838"/>
      <rect x="432" y="160" width="8" height="120" fill="#0E1838"/>
      {/* Tower windows */}
      {[270, 285, 295, 310].map((y, i) => (
        <ellipse key={i} cx="436" cy={y} rx="22" ry="4" fill="none" stroke="#2050A0" strokeWidth="0.5" strokeOpacity="0.4"/>
      ))}

      {/* Building windows — scattered lights */}
      {[
        [15,490,8,6], [15,505,8,6], [30,490,8,6], [30,510,8,6], [15,525,8,6],
        [80,420,8,6], [95,420,8,6], [80,435,8,6], [95,450,8,6],
        [200,390,8,6], [215,390,8,6], [200,408,8,6], [230,408,8,6],
        [300,460,8,6], [315,460,8,6], [300,478,8,6], [330,478,8,6], [315,495,8,6],
        [560,390,8,6], [578,390,8,6], [560,405,8,6], [596,405,8,6],
        [620,440,8,6], [638,440,8,6], [620,458,8,6],
        [760,400,8,6], [778,400,8,6], [760,418,8,6], [796,418,8,6],
        [865,430,8,6], [880,430,8,6], [865,448,8,6],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#E0C060" fillOpacity="0.35" rx="1"/>
      ))}

      {/* Office windows bright */}
      {[
        [160,450,10,7], [175,450,10,7], [160,465,10,7],
        [475,420,10,7], [490,420,10,7], [505,420,10,7], [475,438,10,7], [490,438,10,7],
        [700,380,10,7], [718,380,10,7], [736,380,10,7], [700,397,10,7],
        [850,360,10,7], [870,360,10,7], [850,378,10,7], [870,378,10,7],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#90C0FF" fillOpacity="0.3" rx="1"/>
      ))}

      {/* Ground level city glow */}
      <rect x="0" y="680" width="960" height="40" fill="#2040A0" fillOpacity="0.15"/>

      {/* Window reflections on floor */}
      <rect x="0" y="700" width="960" height="100" fill="url(#tc_cityGlow)" opacity="0.3"/>

      {/* ── TECHCORP LOGO on right wall ── */}
      <rect x="985" y="40" width="455" height="700" fill="#060A12"/>
      <rect x="985" y="40" width="455" height="700" fill="#0A0E18" fillOpacity="0.5"/>
      {/* Logo */}
      <rect x="1070" y="120" width="280" height="60" rx="4" fill="#0D1628"/>
      <text x="1210" y="155" fontFamily="Arial, sans-serif" fontSize="20" fill="#4080D0" textAnchor="middle" fontWeight="bold" letterSpacing="4" filter="url(#tc_glow)">TechCorp AG</text>
      <rect x="1070" y="182" width="280" height="2" fill="#2050A0" fillOpacity="0.5"/>

      {/* ── WALL ACCESS LOG DISPLAY ── */}
      <rect x="1050" y="220" width="350" height="230" rx="6" fill="#08101C" stroke="#1A2A40" strokeWidth="1" filter="url(#tc_shadow)"/>
      <rect x="1055" y="225" width="340" height="220" rx="3" fill="#040810"/>
      <rect x="1055" y="225" width="340" height="20" fill="#0A1428"/>
      <text x="1065" y="240" fontFamily="monospace" fontSize="9" fill="#4080D0">ZUGANGSPROTOKOLL — LIVE</text>
      <text x="1360" y="240" fontFamily="monospace" fontSize="8" fill="#E03020" textAnchor="end">⚠ ANOMALIE</text>
      {/* Log entries */}
      {[
        { time: '23:01', user: 'thomas.richter', action: 'EMAIL SENT', ip: '–', color: '#6080A0' },
        { time: '23:09', user: 'admin@techcorp', action: 'FAILED LOGIN', ip: '185.220.x.x', color: '#E06020' },
        { time: '23:14', user: '847x FAILED', action: 'BRUTE FORCE', ip: 'BOT-NET', color: '#E03020' },
        { time: '23:17', user: 'j.weber (IT)', action: 'ACCOUNT CREATED', ip: '10.0.1.44', color: '#E08020' },
        { time: '23:17', user: 'alex.meyer', action: 'ACCOUNT ACTIVE', ip: '–', color: '#E0A020' },
        { time: '23:19', user: 'alex.meyer', action: 'REPO CLONE ⚠', ip: '91.108.x.x', color: '#E03020' },
        { time: '23:21', user: 'alex.meyer', action: '2.3 GB EXFILTRATED', ip: '91.108.x.x', color: '#E02010' },
      ].map((entry, i) => (
        <g key={i}>
          <rect x="1057" y={248 + i * 27} width="336" height="24" rx="2"
            fill={entry.color === '#E02010' || entry.color === '#E03020' ? '#200808' : '#06080E'}
            stroke={entry.color} strokeWidth="0.5" strokeOpacity="0.3"/>
          <text x="1062" y={264 + i * 27} fontFamily="monospace" fontSize="7" fill="#4060A0">{entry.time}</text>
          <text x="1094" y={264 + i * 27} fontFamily="monospace" fontSize="7" fill="#6080A0">{entry.user}</text>
          <text x="1190" y={264 + i * 27} fontFamily="monospace" fontSize="7.5" fill={entry.color} fontWeight="bold">{entry.action}</text>
          <text x="1340" y={264 + i * 27} fontFamily="monospace" fontSize="6.5" fill="#304060" textAnchor="end">{entry.ip}</text>
        </g>
      ))}

      {/* ── MAIN DESK (foreground) ── */}
      <rect x="120" y="570" width="900" height="28" rx="4" fill="url(#tc_desk)" filter="url(#tc_shadow)"/>
      <rect x="120" y="598" width="900" height="6" fill="#0A0E16"/>
      <rect x="130" y="598" width="20" height="110" rx="3" fill="#0A0E16"/>
      <rect x="980" y="598" width="20" height="110" rx="3" fill="#0A0E16"/>
      <rect x="500" y="598" width="16" height="110" rx="3" fill="#0A0E16"/>

      {/* ── LEFT MONITOR — Source Code Repo ── */}
      <rect x="190" y="340" width="264" height="188" rx="6" fill="#0D1018" filter="url(#tc_shadow)"/>
      <rect x="196" y="346" width="252" height="176" rx="3" fill="#0A0E14"/>
      {/* IDE titlebar */}
      <rect x="196" y="346" width="252" height="18" fill="#1C2030"/>
      <circle cx="205" cy="355" r="3" fill="#FF5F56"/>
      <circle cx="215" cy="355" r="3" fill="#FFBD2E"/>
      <circle cx="225" cy="355" r="3" fill="#27C93F"/>
      <text x="240" y="359" fontFamily="monospace" fontSize="7" fill="#4060A0">payment-module/core/encrypt.ts</text>
      {/* Code content */}
      <rect x="196" y="364" width="252" height="158" fill="#0D1118" clipPath="url(#tc_leftScreen)"/>
      {/* Line numbers */}
      <rect x="196" y="364" width="20" height="158" fill="#0A0E14"/>
      {[1,2,3,4,5,6,7,8,9,10,11,12].map((n, i) => (
        <text key={i} x="208" y={375 + i * 13} fontFamily="monospace" fontSize="7" fill="#2A3850" textAnchor="end">{n}</text>
      ))}
      {/* Code lines */}
      {[
        { text: 'import { AES256 } from', color: '#C090D0' },
        { text: '  ./crypto/bancrypt', color: '#6090D0' },
        { text: 'import { BankKey } from', color: '#C090D0' },
        { text: '  ./keys/vault', color: '#6090D0' },
        { text: '', color: '#888' },
        { text: 'export function encryptTx(', color: '#80D0E0' },
        { text: '  amount: number,', color: '#A0D0A0' },
        { text: '  iban: string,', color: '#A0D0A0' },
        { text: '  key: BankKey', color: '#A0D0A0' },
        { text: '): EncryptedTx {', color: '#80D0E0' },
        { text: '  const iv = crypto()', color: '#E0D0A0' },
        { text: '  return AES256(key...)', color: '#E0D0A0' },
      ].map((line, i) => (
        <text key={i} x="220" y={375 + i * 13} fontFamily="monospace" fontSize="7" fill={line.color}>{line.text}</text>
      ))}

      {/* ── RIGHT MONITOR — Security Dashboard ── */}
      <rect x="462" y="330" width="264" height="196" rx="6" fill="#0D1018" filter="url(#tc_shadow)"/>
      <rect x="468" y="336" width="252" height="184" rx="3" fill="#060A10"/>
      <rect x="468" y="336" width="252" height="18" fill="#0A1020"/>
      <text x="474" y="349" fontFamily="monospace" fontSize="8" fill="#4080D0">SECURITY DASHBOARD</text>
      <text x="692" y="349" fontFamily="monospace" fontSize="7" fill="#E03020" textAnchor="end">ALERT</text>
      <rect x="468" y="354" width="252" height="166" fill="#050810" clipPath="url(#tc_rightScreen)"/>
      {/* Alert box */}
      <rect x="472" y="358" width="244" height="40" rx="3" fill="#200808" stroke="#E03020" strokeWidth="1" strokeOpacity="0.6"/>
      <text x="594" y="373" fontFamily="monospace" fontSize="8.5" fill="#E03020" textAnchor="middle" fontWeight="bold" filter="url(#tc_glow)">⚠ KRITISCHER ALARM</text>
      <text x="594" y="386" fontFamily="monospace" fontSize="7" fill="#CC2010" textAnchor="middle">Unbekannter Account — Aktiv seit 23:19</text>
      {/* Stats */}
      {[
        { label: 'Neuer Account', value: 'alex.meyer', color: '#E03020' },
        { label: 'Erstellt von', value: 'j.weber@techcorp', color: '#E06020' },
        { label: 'Berechtigungen', value: 'SOURCE CODE RW ⚠', color: '#E04020' },
        { label: 'Letzter Zugriff', value: '23:19 — REPO CLONE', color: '#E03020' },
        { label: 'Daten exfiltriert', value: '2.3 GB / payment-module', color: '#E02010' },
        { label: 'IP-Adresse', value: '91.108.56.122 (extern)', color: '#E03020' },
        { label: 'Verdacht', value: 'SOCIAL ENGINEERING', color: '#CC2010' },
      ].map((r, i) => (
        <g key={i}>
          <text x="474" y={406 + i * 16} fontFamily="monospace" fontSize="7" fill="#3050A0">{r.label}:</text>
          <text x="560" y={406 + i * 16} fontFamily="monospace" fontSize="7.5" fill={r.color} fontWeight={i === 0 || i === 4 ? 'bold' : 'normal'}>{r.value}</text>
        </g>
      ))}

      {/* Monitor stands */}
      <rect x="314" y="528" width="16" height="42" rx="3" fill="#101420"/>
      <rect x="286" y="568" width="72" height="10" rx="3" fill="#0C1018"/>
      <rect x="586" y="526" width="16" height="44" rx="3" fill="#101420"/>
      <rect x="558" y="568" width="72" height="10" rx="3" fill="#0C1018"/>

      {/* ── HR TERMINAL ── */}
      <rect x="808" y="360" width="228" height="180" rx="6" fill="#0D1018" filter="url(#tc_shadow)"/>
      <rect x="814" y="366" width="216" height="168" rx="3" fill="#050810"/>
      <rect x="814" y="366" width="216" height="18" fill="#0A1428"/>
      <text x="820" y="379" fontFamily="monospace" fontSize="8" fill="#4080D0">HR-SYSTEM — ACCOUNTS</text>
      <rect x="814" y="384" width="216" height="150" fill="#030508" clipPath="url(#tc_hrScreen)"/>
      {/* Account creation alert */}
      <rect x="818" y="388" width="208" height="44" rx="3" fill="#280808" stroke="#E02020" strokeWidth="1" strokeOpacity="0.7"/>
      <text x="922" y="403" fontFamily="monospace" fontSize="8" fill="#E03020" textAnchor="middle" fontWeight="bold">NEUER ACCOUNT</text>
      <text x="922" y="416" fontFamily="monospace" fontSize="8.5" fill="#FF4030" textAnchor="middle" filter="url(#tc_strongGlow)">alex.meyer</text>
      <text x="922" y="428" fontFamily="monospace" fontSize="7" fill="#CC2010" textAnchor="middle">23:17 — Erstellt von: j.weber</text>
      {/* Account details */}
      {[
        { k: 'Rolle:', v: 'Externer Berater' },
        { k: 'VPN:', v: 'Aktiviert ⚠' },
        { k: 'Code-Repo:', v: 'Lese/Schreib ⚠' },
        { k: 'HR-Portal:', v: 'Lesezugriff' },
        { k: 'Ablauf:', v: 'Unbegrenzt ⚠' },
      ].map((r, i) => (
        <g key={i}>
          <text x="820" y={444 + i * 16} fontFamily="monospace" fontSize="7" fill="#304060">{r.k}</text>
          <text x="856" y={444 + i * 16} fontFamily="monospace" fontSize="7" fill={r.v.includes('⚠') ? '#E06020' : '#6080A0'}>{r.v}</text>
        </g>
      ))}
      <rect x="808" y="540" width="228" height="8" rx="2" fill="#101420"/>
      <rect x="836" y="548" width="96" height="8" rx="3" fill="#0C1018"/>

      {/* ── PRINTED EMAIL ON DESK (fake CEO email) ── */}
      <rect x="140" y="480" width="230" height="170" rx="2" fill="#F0F0F8" transform="rotate(-3 255 565)" filter="url(#tc_shadow)"/>
      <rect x="143" y="483" width="224" height="164" fill="#FAFAFF" transform="rotate(-3 255 565)"/>
      <rect x="143" y="483" width="224" height="20" fill="#E8E8F8" transform="rotate(-3 255 565)"/>
      <text x="148" y="497" fontFamily="Arial, sans-serif" fontSize="8.5" fill="#333" fontWeight="bold" transform="rotate(-3 255 565)">Von: Thomas Richter CEO</text>
      <text x="148" y="509" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#E03020" transform="rotate(-3 255 565)">t.richter@techcorp-ag.de</text>
      <text x="148" y="521" fontFamily="Arial, sans-serif" fontSize="7" fill="#888" transform="rotate(-3 255 565)">An: it-support@techcorp.de</text>
      <text x="148" y="533" fontFamily="Arial, sans-serif" fontSize="7" fill="#888" transform="rotate(-3 255 565)">Datum: 13.11.2024 23:01</text>
      <line x1="146" y1="537" x2="363" y2="529" stroke="#DDD" strokeWidth="0.5" transform="rotate(-3 255 565)"/>
      <text x="148" y="548" fontFamily="Arial, sans-serif" fontSize="8" fill="#222" transform="rotate(-3 255 565)">Hallo IT-Team,</text>
      <text x="148" y="560" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#333" transform="rotate(-3 255 565)">bitte erstellen Sie sofort einen</text>
      <text x="148" y="571" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#333" transform="rotate(-3 255 565)">Zugang für unseren neuen externen</text>
      <text x="148" y="582" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#333" transform="rotate(-3 255 565)">Berater: alex.meyer</text>
      <text x="148" y="594" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#333" transform="rotate(-3 255 565)">Es ist dringend — heute Nacht.</text>
      <text x="148" y="608" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#555" transform="rotate(-3 255 565)">MfG, Thomas</text>
      {/* Circle on wrong domain */}
      <ellipse cx="265" cy="509" rx="80" ry="7" fill="none" stroke="#E03020" strokeWidth="1.5" transform="rotate(-3 255 565)" strokeOpacity="0.8"/>
      {/* Handwritten annotation */}
      <text x="290" y="520" fontFamily="Georgia, serif" fontSize="8" fill="#E03020" transform="rotate(-3 255 565)">← FALSCHE DOMAIN!</text>

      {/* ── LINKEDIN SCREENSHOT on second laptop ── */}
      <rect x="750" y="484" width="210" height="120" rx="4" fill="#0D1018" filter="url(#tc_shadow)"/>
      <rect x="754" y="488" width="202" height="112" rx="2" fill="#F0F8FF"/>
      <rect x="754" y="488" width="202" height="16" fill="#0077B5"/>
      <text x="758" y="499" fontFamily="Arial, sans-serif" fontSize="8" fill="white" fontWeight="bold">LinkedIn</text>
      <rect x="754" y="504" width="202" height="96" fill="#FAFEFF"/>
      <rect x="758" y="508" width="28" height="28" rx="14" fill="#C0D0E0"/>
      <text x="795" y="520" fontFamily="Arial, sans-serif" fontSize="8.5" fill="#1A3050" fontWeight="bold">Thomas Richter</text>
      <text x="795" y="530" fontFamily="Arial, sans-serif" fontSize="7" fill="#888">CEO at TechCorp AG · Berlin</text>
      <line x1="756" y1="535" x2="952" y2="535" stroke="#EEE" strokeWidth="0.5"/>
      <text x="758" y="547" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#333">Excited to be at Slush 2024</text>
      <text x="758" y="557" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#333">in Helsinki this week! 🇫🇮</text>
      <text x="758" y="567" fontFamily="Arial, sans-serif" fontSize="7" fill="#0077B5">#innovation #startup</text>
      <text x="758" y="578" fontFamily="Arial, sans-serif" fontSize="6.5" fill="#AAA">Gestern · 1.247 Reaktionen</text>
      {/* Annotation arrow */}
      <text x="910" y="555" fontFamily="Georgia, serif" fontSize="8" fill="#E03020">← in Helsinki!</text>
      <text x="910" y="565" fontFamily="Georgia, serif" fontSize="7" fill="#E03020">unerreichbar</text>

      {/* ── WHOIS PRINTOUT ── */}
      <rect x="520" y="490" width="190" height="120" rx="2" fill="#F8F8F0" filter="url(#tc_shadow)" transform="rotate(2 615 550)"/>
      <text x="527" y="504" fontFamily="Courier New, monospace" fontSize="7" fill="#333" fontWeight="bold" transform="rotate(2 615 550)">WHOIS: techcorp-ag.de</text>
      <line x1="524" y1="507" x2="706" y2="511" stroke="#CCC" strokeWidth="0.5" transform="rotate(2 615 550)"/>
      {[
        'Registriert: 07.11.2024',
        'Registrar: NameCheap, Inc.',
        'MX Record: mail.proton.me',
        'Registrant: PROTECTED',
        'echtes Domain: techcorp.de',
        '→ Unterschied: "-ag"',
        'Alter: 6 TAGE ⚠',
      ].map((l, i) => (
        <text key={i} x="527" y={515 + i * 12} fontFamily="Courier New, monospace" fontSize="6.5"
          fill={l.includes('⚠') ? '#E03020' : l.includes('echtes') || l.includes('Unter') ? '#2060C0' : '#555'}
          fontWeight={l.includes('⚠') ? 'bold' : 'normal'} transform="rotate(2 615 550)">{l}</text>
      ))}

      {/* ── CONFERENCE ROOM (glass wall, background) ── */}
      <rect x="985" y="480" width="455" height="300" fill="#060A10"/>
      <rect x="985" y="480" width="455" height="300" fill="#0A0E18" fillOpacity="0.3"/>
      {/* Glass wall */}
      <rect x="985" y="480" width="8" height="300" fill="#1A2838" fillOpacity="0.4"/>
      <text x="1200" y="540" fontFamily="Arial, sans-serif" fontSize="11" fill="#1A2838" textAnchor="middle">KONFERENZRAUM A</text>
      {/* Empty conference table */}
      <rect x="1030" y="560" width="360" height="80" rx="8" fill="#0C1420" stroke="#1A2838" strokeWidth="1"/>
      {/* Empty chairs */}
      {[1060, 1120, 1200, 1280, 1340].map((x, i) => (
        <rect key={i} x={x} y="652" width="36" height="20" rx="4" fill="#0D1528" stroke="#1A2838" strokeWidth="0.5"/>
      ))}
      {[1060, 1120, 1200, 1280, 1340].map((x, i) => (
        <rect key={i} x={x} y="536" width="36" height="20" rx="4" fill="#0D1528" stroke="#1A2838" strokeWidth="0.5"/>
      ))}

      {/* ── COFFEE THERMOS ── */}
      <rect x="730" y="520" width="32" height="54" rx="10" fill="#2A3040" filter="url(#tc_shadow)"/>
      <rect x="734" y="524" width="24" height="46" rx="8" fill="#3A4050"/>
      <rect x="730" y="520" width="32" height="8" rx="4" fill="#4A5060"/>
      <text x="746" y="551" fontFamily="Arial, sans-serif" fontSize="6" fill="#6080A0" textAnchor="middle">TC</text>

      {/* ── DESK CLOCK ── */}
      <rect x="110" y="538" width="54" height="36" rx="4" fill="#0D1220" filter="url(#tc_shadow)" stroke="#1A2838" strokeWidth="1"/>
      <text x="137" y="560" fontFamily="Courier New, monospace" fontSize="14" fill="#60E060" textAnchor="middle" filter="url(tc_glow)">23:28</text>

      {/* ── SECURITY CAMERA MONITOR (small) ── */}
      <rect x="1285" y="540" width="140" height="100" rx="4" fill="#08101C" stroke="#1A2838" strokeWidth="1" filter="url(tc_shadow)"/>
      <rect x="1289" y="544" width="132" height="92" rx="2" fill="#050810"/>
      <rect x="1289" y="544" width="132" height="14" fill="#0A1428"/>
      <text x="1295" y="554" fontFamily="monospace" fontSize="6.5" fill="#3060A0">CCTV ÜBERWACHUNG</text>
      {/* 4 camera views */}
      {[
        { x: 1291, y: 560, w: 63, h: 36, label: 'EINGANG' },
        { x: 1356, y: 560, w: 63, h: 36, label: 'SERVER' },
        { x: 1291, y: 598, w: 63, h: 36, label: 'PARKING' },
        { x: 1356, y: 598, w: 63, h: 36, label: 'FOYER' },
      ].map((cam, i) => (
        <g key={i}>
          <rect x={cam.x} y={cam.y} width={cam.w} height={cam.h} fill="#050810" stroke="#1A2838" strokeWidth="0.5"/>
          <rect x={cam.x} y={cam.y} width={cam.w} height={8} fill="#0A1428"/>
          <text x={cam.x + 3} y={cam.y + 6} fontFamily="monospace" fontSize="5" fill="#3060A0">{cam.label}</text>
          {/* Camera static */}
          {Array.from({ length: 8 }).map((_, j) => (
            <rect key={j} x={cam.x + 5 + j * 7} y={cam.y + 14 + (j % 3) * 6} width="5" height="4" rx="1" fill="#0D1520" fillOpacity="0.8"/>
          ))}
          <circle cx={cam.x + cam.w - 8} cy={cam.y + 6} r="2.5" fill="#E03020" fillOpacity="0.8">
            <animate attributeName="opacity" values="1;0.3;1" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}

      {/* ── AMBIENT GLOWS ── */}
      {/* Screen blue glow */}
      <rect x="120" y="300" width="900" height="320" fill="url(#tc_screenBlue)" opacity="0.4"/>
      {/* Alert red glow */}
      <rect x="800" y="340" width="300" height="200" fill="url(#tc_alertRed)" opacity="0.4"/>
      {/* City night ambiance */}
      <rect x="0" y="40" width="960" height="680" fill="url(#tc_cityGlow)" opacity="0.3"/>
      {/* Floor reflection */}
      <rect x="120" y="700" width="880" height="80" fill="url(#tc_screenBlue)" opacity="0.15"/>
    </svg>
  );
}
