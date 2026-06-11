export default function CafeOfficeScene() {
  return (
    <svg
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="cf_wall" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3A2415"/>
          <stop offset="100%" stopColor="#2A1808"/>
        </linearGradient>
        <linearGradient id="cf_brick" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5A3018"/>
          <stop offset="100%" stopColor="#4A2412"/>
        </linearGradient>
        <linearGradient id="cf_floor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A1E10"/>
          <stop offset="100%" stopColor="#1E1408"/>
        </linearGradient>
        <linearGradient id="cf_desk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5A3A18"/>
          <stop offset="100%" stopColor="#3A2008"/>
        </linearGradient>
        <linearGradient id="cf_screen_ransom" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0A0000"/>
          <stop offset="100%" stopColor="#1A0000"/>
        </linearGradient>
        <linearGradient id="cf_ceiling" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A1008"/>
          <stop offset="100%" stopColor="#2A1A0C"/>
        </linearGradient>
        <radialGradient id="cf_lampGlow" cx="25%" cy="20%" r="40%">
          <stop offset="0%" stopColor="#C87020" stopOpacity="0.55"/>
          <stop offset="60%" stopColor="#A05010" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#804010" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="cf_screenRed" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E03020" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#E03020" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="cf_ransomGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#CC2010" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#CC2010" stopOpacity="0"/>
        </radialGradient>
        <filter id="cf_shadow">
          <feDropShadow dx="2" dy="3" stdDeviation="6" floodColor="#000000" floodOpacity="0.5"/>
        </filter>
        <filter id="cf_redGlow">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="cf_monitorClip">
          <rect x="530" y="288" width="292" height="210"/>
        </clipPath>
      </defs>

      {/* ── BACKGROUND ── */}
      <rect width="1440" height="900" fill="#1E1008"/>

      {/* Ceiling */}
      <rect width="1440" height="100" fill="url(#cf_ceiling)"/>

      {/* Back wall */}
      <rect x="0" y="80" width="1440" height="560" fill="url(#cf_wall)"/>

      {/* ── BRICK WALL (right side) ── */}
      {Array.from({ length: 16 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => {
          const x = 780 + col * 66 + (row % 2 === 0 ? 0 : 33);
          const y = 90 + row * 30;
          return (
            <rect
              key={`brick-${row}-${col}`}
              x={x} y={y} width={62} height={26} rx="2"
              fill={row % 3 === 0 ? '#5A2C10' : row % 3 === 1 ? '#4E2610' : '#542E14'}
              stroke="#2A1408" strokeWidth="1.5"
              fillOpacity="0.9"
            />
          );
        })
      )}
      {/* Brick mortar */}
      <rect x="780" y="90" width="660" height="550" fill="#1E0E06" fillOpacity="0.3"/>

      {/* ── FLOOR ── */}
      <rect y="640" width="1440" height="260" fill="url(#cf_floor)"/>
      {[650, 680, 710, 740].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="1440" y2={y} stroke="#3A2010" strokeOpacity="0.4" strokeWidth="1"/>
      ))}
      {[0, 240, 480, 720, 960, 1200, 1440].map((x, i) => (
        <line key={i} x1={x} y1="640" x2={x} y2="900" stroke="#3A2010" strokeOpacity="0.3" strokeWidth="0.5"/>
      ))}

      {/* ── OVERHEAD LIGHT BULB ── */}
      {/* Cord */}
      <line x1="360" y1="0" x2="360" y2="120" stroke="#3A3020" strokeWidth="3"/>
      {/* Bulb socket */}
      <rect x="348" y="115" width="24" height="16" rx="4" fill="#4A3820"/>
      {/* Bulb */}
      <ellipse cx="360" cy="145" rx="18" ry="22" fill="#D08020" filter="url(#cf_shadow)"/>
      <ellipse cx="360" cy="148" rx="14" ry="16" fill="#FFDC60" fillOpacity="0.9"/>
      <ellipse cx="360" cy="145" rx="8" ry="10" fill="#FFFFA0"/>
      {/* Light cone */}
      <polygon points="340,165 380,165 480,640 240,640" fill="url(#cf_lampGlow)" opacity="0.8"/>

      {/* Second overhead light */}
      <line x1="720" y1="0" x2="720" y2="100" stroke="#3A3020" strokeWidth="3"/>
      <rect x="708" y="95" width="24" height="14" rx="4" fill="#4A3820"/>
      <ellipse cx="720" cy="120" rx="14" ry="18" fill="#B06818"/>
      <ellipse cx="720" cy="122" rx="10" ry="13" fill="#FFCB50" fillOpacity="0.8"/>
      <polygon points="704,135 736,135 800,640 640,640" fill="#C07018" fillOpacity="0.12"/>

      {/* ── MAIN DESK ── */}
      <rect x="180" y="560" width="900" height="30" rx="4" fill="url(#cf_desk)" filter="url(#cf_shadow)"/>
      <rect x="180" y="590" width="900" height="8" rx="2" fill="#2A1408"/>
      {/* Legs */}
      <rect x="190" y="590" width="24" height="90" rx="3" fill="#2A1408"/>
      <rect x="1046" y="590" width="24" height="90" rx="3" fill="#2A1408"/>
      <rect x="580" y="590" width="18" height="90" rx="3" fill="#2A1408"/>

      {/* ── PC TOWER ── */}
      <rect x="186" y="350" width="85" height="210" rx="4" fill="#3A3830" filter="url(#cf_shadow)"/>
      <rect x="190" y="354" width="77" height="202" fill="#323030"/>
      {/* Drive bays */}
      <rect x="196" y="368" width="65" height="14" rx="2" fill="#282626"/>
      <rect x="196" y="386" width="65" height="12" rx="2" fill="#282626"/>
      <rect x="200" y="390" width="14" height="6" rx="1" fill="#404040"/>
      {/* Power button */}
      <circle cx="240" cy="408" r="8" fill="#282626"/>
      <circle cx="240" cy="408" r="5" fill="#E03020" opacity="0.9"/>
      <circle cx="240" cy="408" r="2" fill="#FF4030"/>
      {/* USB ports */}
      <rect x="196" y="420" width="12" height="8" rx="1" fill="#1A1818"/>
      <rect x="212" y="420" width="12" height="8" rx="1" fill="#1A1818"/>
      {/* USB KEY plugged in — suspicious */}
      <rect x="224" y="424" width="28" height="8" rx="3" fill="#2A2A2A"/>
      <rect x="246" y="426" width="10" height="4" rx="1" fill="#404040"/>
      <circle cx="254" cy="428" r="2" fill="#FF4020" opacity="0.8"/>
      {/* Ventilation grill */}
      {[450, 462, 474, 486, 498, 510].map((y, i) => (
        <line key={i} x1="200" y1={y} x2="265" y2={y} stroke="#404040" strokeWidth="1" strokeOpacity="0.6"/>
      ))}

      {/* ── MONITOR with RANSOM SCREEN ── */}
      {/* Monitor stand */}
      <rect x="666" y="480" width="20" height="80" rx="4" fill="#282828"/>
      <rect x="638" y="555" width="76" height="12" rx="3" fill="#202020"/>
      {/* Monitor frame — old Dell style */}
      <rect x="518" y="276" width="316" height="234" rx="8" fill="#2A2828" filter="url(#cf_shadow)"/>
      <rect x="524" y="282" width="304" height="222" rx="4" fill="#0A0000"/>
      {/* RANSOM SCREEN */}
      <rect x="524" y="282" width="304" height="222" fill="url(#cf_screen_ransom)" clipPath="url(#cf_monitorClip)"/>

      {/* Red glow emanating from screen */}
      <ellipse cx="676" cy="392" rx="200" ry="120" fill="url(#cf_ransomGlow)"/>

      {/* Skull icon */}
      <ellipse cx="676" cy="315" rx="22" ry="20" fill="#CC1010" opacity="0.9"/>
      <circle cx="668" cy="312" r="5" fill="#0A0000"/>
      <circle cx="684" cy="312" r="5" fill="#0A0000"/>
      <rect x="663" y="320" width="26" height="10" rx="4" fill="#0A0000"/>
      <rect x="665" y="322" width="6" height="14" rx="2" fill="#CC1010"/>
      <rect x="674" y="322" width="6" height="14" rx="2" fill="#CC1010"/>
      <rect x="683" y="322" width="6" height="14" rx="2" fill="#CC1010"/>

      {/* RANSOM TEXT */}
      <text x="676" y="352" fontFamily="Courier New, monospace" fontSize="11" fill="#FF1010" textAnchor="middle" fontWeight="bold" filter="url(#cf_redGlow)">⚠ IHRE DATEIEN WURDEN</text>
      <text x="676" y="366" fontFamily="Courier New, monospace" fontSize="11" fill="#FF1010" textAnchor="middle" fontWeight="bold">VERSCHLÜSSELT ⚠</text>
      <line x1="534" y1="374" x2="818" y2="374" stroke="#CC1010" strokeWidth="0.7" strokeOpacity="0.5"/>
      <text x="676" y="388" fontFamily="Courier New, monospace" fontSize="8" fill="#CC3010" textAnchor="middle">Zahlen Sie 0.25 BTC an:</text>
      <text x="676" y="400" fontFamily="Courier New, monospace" fontSize="7" fill="#FF6040" textAnchor="middle">1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2</text>
      <text x="676" y="415" fontFamily="Courier New, monospace" fontSize="8" fill="#CC1010" textAnchor="middle">Verbleibende Zeit:</text>
      <text x="676" y="430" fontFamily="Courier New, monospace" fontSize="14" fill="#FF2010" textAnchor="middle" fontWeight="bold" filter="url(#cf_redGlow)">67:14:38</text>
      <text x="676" y="446" fontFamily="Courier New, monospace" fontSize="7" fill="#AA2010" textAnchor="middle">3,847 Dateien verschlüsselt · AES-256</text>
      <text x="676" y="458" fontFamily="Courier New, monospace" fontSize="7" fill="#882010" textAnchor="middle">Ihre Fotos · Dokumente · POS-Daten · Verträge</text>
      <text x="676" y="472" fontFamily="Courier New, monospace" fontSize="7.5" fill="#CC1010" textAnchor="middle">Wenden Sie sich NICHT an die Polizei</text>
      {/* Blinking cursor */}
      <rect x="800" y="460" width="6" height="10" fill="#FF1010" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0;0.8" dur="1s" repeatCount="indefinite"/>
      </rect>

      {/* Screen red glow on desk */}
      <ellipse cx="676" cy="568" rx="150" ry="10" fill="#CC1010" fillOpacity="0.2"/>

      {/* ── RECEIPT PRINTER ── */}
      <rect x="880" y="488" width="110" height="74" rx="4" fill="#E8E0D8" filter="url(#cf_shadow)"/>
      <rect x="884" y="492" width="102" height="66" rx="3" fill="#F0E8E0"/>
      {/* Paper slot */}
      <rect x="904" y="496" width="64" height="8" rx="2" fill="#D0C8C0"/>
      {/* Receipt paper coming out */}
      <rect x="916" y="482" width="40" height="80" rx="1" fill="#FFFEF8"/>
      <text x="921" y="494" fontFamily="Courier New, monospace" fontSize="5.5" fill="#444">CAFÉ MARCUS</text>
      <text x="921" y="502" fontFamily="Courier New, monospace" fontSize="5" fill="#666">Berlin-Mitte</text>
      <line x1="918" y1="505" x2="954" y2="505" stroke="#888" strokeWidth="0.5"/>
      <text x="921" y="514" fontFamily="Courier New, monospace" fontSize="5" fill="#444">Cappuccino  €3.50</text>
      <text x="921" y="522" fontFamily="Courier New, monospace" fontSize="5" fill="#444">Croissant   €2.90</text>
      <text x="921" y="530" fontFamily="Courier New, monospace" fontSize="5" fill="#444">Espresso    €2.20</text>
      <text x="921" y="538" fontFamily="Courier New, monospace" fontSize="5" fill="#444">FILE ACCESS ERR</text>
      <text x="921" y="546" fontFamily="Courier New, monospace" fontSize="4.5" fill="#E04040">GESCHAEFTS...</text>
      <text x="921" y="554" fontFamily="Courier New, monospace" fontSize="4.5" fill="#E04040">Cannot open:</text>
      <text x="921" y="562" fontFamily="Courier New, monospace" fontSize="4" fill="#E04040">file encrypted</text>
      {/* Printer button */}
      <circle cx="971" cy="518" r="6" fill="#60A060" fillOpacity="0.7"/>

      {/* ── INVOICES / PAPERS ── */}
      {/* Scattered invoices */}
      <rect x="300" y="486" width="120" height="90" rx="2" fill="#F8F5F0" transform="rotate(-8 360 531)" filter="url(#cf_shadow)"/>
      <text x="308" y="502" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#333" transform="rotate(-8 360 531)">GESCHÄFTSVORFALL</text>
      <text x="308" y="512" fontFamily="Arial, sans-serif" fontSize="7" fill="#333" transform="rotate(-8 360 531)">2024_Q3.pdf</text>
      <rect x="310" y="516" width="80" height="4" rx="1" fill="#E04040" transform="rotate(-8 360 531)"/>
      <text x="308" y="526" fontFamily="Arial, sans-serif" fontSize="6.5" fill="#E04040" transform="rotate(-8 360 531)">Cannot open:</text>
      <text x="308" y="536" fontFamily="Arial, sans-serif" fontSize="6.5" fill="#E04040" transform="rotate(-8 360 531)">file.locked</text>
      <text x="308" y="548" fontFamily="Arial, sans-serif" fontSize="6.5" fill="#666" transform="rotate(-8 360 531)">VERSCHLÜSSELT</text>
      <text x="308" y="560" fontFamily="Arial, sans-serif" fontSize="6.5" fill="#666" transform="rotate(-8 360 531)">Kunden: 47 Einträge</text>

      <rect x="410" y="490" width="110" height="85" rx="2" fill="#FFF8F0" transform="rotate(4 465 532)" filter="url(#cf_shadow)"/>
      <text x="416" y="506" fontFamily="Arial, sans-serif" fontSize="7" fill="#333" transform="rotate(4 465 532)">Lieferanten-Rechnung</text>
      <text x="416" y="518" fontFamily="Arial, sans-serif" fontSize="7" fill="#555" transform="rotate(4 465 532)">Rösterei Hamburg</text>
      <text x="416" y="530" fontFamily="Arial, sans-serif" fontSize="7" fill="#555" transform="rotate(4 465 532)">Ethiopia Yirgacheffe</text>
      <text x="416" y="542" fontFamily="Arial, sans-serif" fontSize="8" fill="#C04020" transform="rotate(4 465 532)" fontWeight="bold">€ 2.840,00</text>
      <text x="416" y="554" fontFamily="Arial, sans-serif" fontSize="6.5" fill="#888" transform="rotate(4 465 532)">Fällig: 20.11.2024</text>
      <text x="416" y="566" fontFamily="Arial, sans-serif" fontSize="6" fill="#C04020" transform="rotate(4 465 532)">⚠ DATEI NICHT LESBAR</text>

      {/* ── WALL CALENDAR ── */}
      <rect x="1050" y="100" width="200" height="250" rx="4" fill="#F0E8D8" filter="url(#cf_shadow)"/>
      <rect x="1053" y="103" width="194" height="244" fill="#FFFDF8"/>
      <rect x="1053" y="103" width="194" height="36" fill="#D03020"/>
      <text x="1150" y="118" fontFamily="Arial, sans-serif" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">NOVEMBER 2024</text>
      <text x="1150" y="132" fontFamily="Arial, sans-serif" fontSize="8" fill="white" textAnchor="middle">CAFÉ MARCUS</text>
      {/* Calendar grid */}
      {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d, i) => (
        <text key={i} x={1063 + i * 27} y="152" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#888">{d}</text>
      ))}
      {/* Week rows — crossed out days */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((day, i) => {
        const row = Math.floor(i / 7);
        const col = i % 7;
        const crossed = day <= 12;
        return (
          <g key={day}>
            <text x={1065 + col * 27} y={168 + row * 25} fontFamily="Arial, sans-serif" fontSize="9" fill={crossed ? '#CCAAAA' : '#333'}>{day}</text>
            {crossed && <line x1={1062 + col * 27} y1={172 + row * 25} x2={1075 + col * 27} y2={162 + row * 25} stroke="#CCC" strokeWidth="1" strokeOpacity="0.7"/>}
          </g>
        );
      })}
      {/* PAY RENT note on Friday */}
      <rect x="1146" y="157" width="56" height="20" rx="2" fill="#FFEE80" opacity="0.95"/>
      <text x="1150" y="168" fontFamily="Arial, sans-serif" fontSize="6" fill="#3A3010">PAY RENT!</text>
      {/* Red circle on Wednesday 13 */}
      <circle cx="1093" cy="172" r="10" fill="none" stroke="#E03020" strokeWidth="2" strokeOpacity="0.8"/>
      <text x="1093" y="176" fontFamily="Arial, sans-serif" fontSize="9" fill="#E03020" textAnchor="middle">13</text>

      {/* ── EMPLOYEE SCHEDULE BOARD ── */}
      <rect x="800" y="100" width="235" height="180" rx="4" fill="#F0F0F0" filter="url(#cf_shadow)"/>
      <rect x="803" y="103" width="229" height="174" fill="#FAFAFA"/>
      <rect x="803" y="103" width="229" height="24" fill="#204080"/>
      <text x="917" y="119" fontFamily="Arial, sans-serif" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">DIENSTPLAN – NOV</text>
      {[
        { day: 'Mo 11.', name: 'Elena', time: '07-14 Uhr' },
        { day: 'Di 12.', name: 'Fatima', time: '07-15 Uhr' },
        { day: 'Mi 13.', name: 'Marcus', time: '07-17 Uhr' },
        { day: 'Do 14.', name: 'Elena', time: '08-14 Uhr' },
        { day: 'Fr 15.', name: 'Fatima + Marcus', time: '07-18 Uhr' },
      ].map((row, i) => (
        <g key={i}>
          <line x1="803" y1={130 + i * 28} x2="1032" y2={130 + i * 28} stroke="#E0E0E0" strokeWidth="0.5"/>
          <text x="810" y={145 + i * 28} fontFamily="Arial, sans-serif" fontSize="8" fill="#333">{row.day}</text>
          <text x="855" y={145 + i * 28} fontFamily="Arial, sans-serif" fontSize="8.5" fill="#204080" fontWeight="bold">{row.name}</text>
          <text x="980" y={145 + i * 28} fontFamily="Arial, sans-serif" fontSize="7.5" fill="#666">{row.time}</text>
        </g>
      ))}

      {/* ── NO BACKUP NOTE ── */}
      {/* Sticky on monitor bezel */}
      <rect x="516" y="495" width="88" height="54" rx="2" fill="#FFEE80" opacity="0.97" transform="rotate(-2 560 522)"/>
      <text x="522" y="510" fontFamily="Arial, sans-serif" fontSize="7" fill="#3A3010" transform="rotate(-2 560 522)" fontWeight="bold">NAS Backup</text>
      <text x="522" y="520" fontFamily="Arial, sans-serif" fontSize="7" fill="#3A3010" transform="rotate(-2 560 522)">Letztes OK:</text>
      <text x="522" y="530" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#D03010" transform="rotate(-2 560 522)" fontWeight="bold">14 WOCHEN ALT</text>
      <text x="522" y="542" fontFamily="Arial, sans-serif" fontSize="9" fill="#E03010" transform="rotate(-2 560 522)">⚠️ VERALTET!</text>

      {/* ── COFFEE BEAN SACKS ── */}
      {[{ x: 1100, c: '#4A3020', label: 'ETHIOPIA' }, { x: 1195, c: '#3A2818', label: 'COLOMBIA' }].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={440} width={85} height={120} rx={8} fill={s.c} filter="url(#cf_shadow)"/>
          <ellipse cx={s.x + 42} cy={440} rx={42} ry={12} fill={s.c} fillOpacity="0.7"/>
          <text x={s.x + 42} y={500} fontFamily="Arial, sans-serif" fontSize="7.5" fill="#D4A870" textAnchor="middle" fontWeight="bold">{s.label}</text>
          <text x={s.x + 42} y={511} fontFamily="Arial, sans-serif" fontSize="6.5" fill="#B08860" textAnchor="middle">YIRGACHEFFE</text>
          <text x={s.x + 42} y={522} fontFamily="Arial, sans-serif" fontSize="6" fill="#907040" textAnchor="middle">1 kg – Premium</text>
        </g>
      ))}

      {/* ── DELIVERY BOXES ── */}
      <rect x="1290" y="500" width="140" height="100" rx="3" fill="#C89050" filter="url(#cf_shadow)"/>
      <rect x="1290" y="500" width="140" height="10" fill="#B07840"/>
      <line x1="1360" y1="500" x2="1360" y2="600" stroke="#B07840" strokeWidth="1.5"/>
      <line x1="1290" y1="550" x2="1430" y2="550" stroke="#B07840" strokeWidth="1.5"/>
      <text x="1335" y="540" fontFamily="Arial, sans-serif" fontSize="8" fill="#7A5020">Rösterei</text>
      <text x="1335" y="552" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#7A5020">Hamburg</text>
      <rect x="1310" y="400" width="120" height="100" rx="3" fill="#D0A060" filter="url(#cf_shadow)"/>
      <line x1="1370" y1="400" x2="1370" y2="500" stroke="#B08040" strokeWidth="1.5"/>
      <line x1="1310" y1="450" x2="1430" y2="450" stroke="#B08040" strokeWidth="1.5"/>
      <text x="1350" y="440" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#7A5020" textAnchor="middle">FRAGILE</text>

      {/* ── SHELVES ── */}
      <rect x="0" y="380" width="180" height="16" rx="3" fill="#4A3020" filter="url(#cf_shadow)"/>
      <rect x="0" y="396" width="180" height="5" fill="#3A2010"/>
      {/* Items on shelf */}
      {[
        { x: 10, w: 28, h: 50, c: '#3A2810', label: 'Sirup' },
        { x: 42, w: 24, h: 44, c: '#2A3820', label: 'Öl' },
        { x: 70, w: 30, h: 52, c: '#382018', label: 'Café' },
        { x: 104, w: 26, h: 46, c: '#283028', label: 'Mix' },
        { x: 134, w: 30, h: 50, c: '#3A2810', label: 'Sirup' },
      ].map((item, i) => (
        <g key={i}>
          <rect x={item.x} y={380 - item.h} width={item.w} height={item.h} rx="3" fill={item.c}/>
          <text x={item.x + item.w / 2} y={385 - item.h / 2} fontFamily="Arial, sans-serif" fontSize="5.5" fill="#A08060" textAnchor="middle">{item.label}</text>
        </g>
      ))}

      {/* Lower shelf */}
      <rect x="0" y="530" width="180" height="14" rx="3" fill="#4A3020"/>
      <rect x="0" y="544" width="180" height="4" fill="#3A2010"/>
      {/* Binders */}
      {[
        { c: '#802020', w: 28 }, { c: '#204080', w: 24 },
        { c: '#208040', w: 32 }, { c: '#806020', w: 26 }, { c: '#602080', w: 28 },
      ].map((b, i) => {
        const xOffset = [8, 40, 68, 104, 134][i];
        return <rect key={i} x={xOffset} y={476} width={b.w} height={54} rx="2" fill={b.c} fillOpacity="0.85"/>;
      })}

      {/* ── CAFÉ MUG ── */}
      <rect x="975" y="510" width="52" height="52" rx="6" fill="#E8E0D8"/>
      <rect x="979" y="514" width="44" height="44" rx="4" fill="#F0E8E0"/>
      <ellipse cx="1001" cy="524" rx="18" ry="5" fill="#3A1808"/>
      <text x="989" y="548" fontFamily="Arial, sans-serif" fontSize="7" fill="#806040">CAFÉ</text>
      <text x="986" y="557" fontFamily="Arial, sans-serif" fontSize="7" fill="#806040">MARCUS</text>
      <path d="M1027,522 C1036,522 1040,530 1040,535 C1040,544 1034,548 1027,548" stroke="#E0D8D0" strokeWidth="4" fill="none"/>

      {/* ── CASH REPORTS ── */}
      <rect x="1050" y="492" width="100" height="75" rx="2" fill="#F5F0E8" filter="url(#cf_shadow)"/>
      <text x="1058" y="507" fontFamily="monospace" fontSize="6.5" fill="#333" fontWeight="bold">TAGESBERICHT</text>
      <text x="1058" y="517" fontFamily="monospace" fontSize="6" fill="#555">13.11.2024</text>
      <line x1="1053" y1="520" x2="1148" y2="520" stroke="#CCC" strokeWidth="0.5"/>
      {['Kaffee:   €480', 'Kuchen:   €240', 'Lunchzeit: €890', 'GESAMT: €1.610'].map((l, i) => (
        <text key={i} x="1058" y={530 + i * 10} fontFamily="monospace" fontSize="6.5" fill={i === 3 ? '#204080' : '#555'}>{l}</text>
      ))}

      {/* ── CAFÉ MENUS ── */}
      <rect x="1160" y="505" width="55" height="70" rx="3" fill="#8A4020" filter="url(#cf_shadow)"/>
      <rect x="1163" y="508" width="49" height="64" rx="2" fill="#A05030"/>
      <rect x="1163" y="508" width="8" height="64" fill="#7A3018"/>
      <text x="1192" y="542" fontFamily="Georgia, serif" fontSize="7" fill="#F0D8C0" textAnchor="middle">CAFÉ</text>
      <text x="1192" y="552" fontFamily="Georgia, serif" fontSize="7" fill="#F0D8C0" textAnchor="middle">MARCUS</text>
      <rect x="1218" y="508" width="55" height="70" rx="3" fill="#8A4020" filter="url(#cf_shadow)"/>
      <rect x="1221" y="511" width="49" height="64" rx="2" fill="#A05030"/>
      <rect x="1221" y="511" width="8" height="64" fill="#7A3018"/>

      {/* ── AMBIENT OVERLAYS ── */}
      {/* Red screen glow on ceiling/walls */}
      <rect x="350" y="200" width="660" height="450" fill="url(#cf_screenRed)" opacity="0.5"/>
      {/* Warm amber lamp zone */}
      <rect x="0" y="0" width="700" height="900" fill="url(#cf_lampGlow)" opacity="0.6"/>
      {/* Dark vignette */}
      <rect width="1440" height="900" fill="radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)" fillOpacity="0.6"/>
    </svg>
  );
}
