import { useState, useEffect, useMemo } from 'react';
import DialogueBox from './DialogueBox';
import type { Detective, DialogueLine } from '../types/game';
import { getDetectiveAvatarEmoji } from '../utils/detective';
import CharacterSVG, { OUTFIT_ACCENT_COLORS } from './CharacterSVG';
import { WeberSVG, MiaSVG } from './NpcSVG';
import { useIsMobile } from '../utils/responsive';
import { useLanguage } from '../contexts/LanguageContext';

const INTRO_CHARACTER_IDS: DialogueLine['characterId'][] = [
  'narrator', 'weber', 'mia', 'weber',
];

interface Props {
  detective: Detective;
  onComplete: () => void;
}

export default function IntroSequence({ detective, onComplete }: Props) {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<string>('narrator');

  const introLines: DialogueLine[] = useMemo(() => INTRO_CHARACTER_IDS.map((characterId, i) => ({
    characterId,
    text: t(`introLine${i}` as Parameters<typeof t>[0]),
  })), [t]);

  useEffect(() => { setTimeout(() => setMounted(true), 200); }, []);

  const handleLineChange = (lineIndex: number) => {
    setActiveSpeaker(INTRO_CHARACTER_IDS[lineIndex] ?? 'narrator');
  };

  const accentColor = OUTFIT_ACCENT_COLORS[detective.appearance?.outfitColor ?? detective.avatar] ?? '#F5A623';

  const isNarrator = activeSpeaker === 'narrator';

  const charConfig = [
    { id: 'weber', label: 'WEBER', color: '#5B8DD9', side: 'left' as const },
    { id: 'detective', label: detective.name.toUpperCase(), color: accentColor, side: 'center' as const },
    { id: 'mia', label: 'MIA', color: '#7ABF6A', side: 'right' as const },
  ];

  const baseSize = isMobile ? 120 : 200;

  const getCharStyle = (id: string) => {
    const isActive = activeSpeaker === id;
    const opacity = isNarrator ? 0.2 : isActive ? 1 : 0.32;
    const scale = isNarrator ? 0.7 : isActive ? 1 : 0.68;
    return {
      opacity: mounted ? opacity : 0,
      transform: `scale(${scale}) translateY(${mounted ? 0 : 32}px)`,
      transition: 'opacity 300ms ease, transform 300ms ease',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      position: 'absolute' as const,
      bottom: isMobile ? '32%' : '26%',
      transformOrigin: 'bottom center',
    };
  };

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700"
      style={{
        background: '#06070E',
        opacity: mounted ? 1 : 0,
      }}
    >
      {/* ── ROOM WALLS ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #0C0D18 0%, #09090F 60%, #060508 100%)' }} />

      {/* ── WINDOW showing city ── */}
      <div
        className="absolute pointer-events-none hidden sm:block"
        style={{
          left: '8%',
          top: '4%',
          width: '48%',
          height: '68%',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/intro_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.12)' }} />
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${(i * 13 + 4) % 94}%`,
              top: `${(i * 9 + 2) % 70}%`,
              width: 1,
              height: `${7 + (i % 5) * 3}%`,
              background: 'rgba(180,210,255,0.18)',
              transform: 'rotate(8deg)',
            }} />
          ))}
        </div>
        <div style={{ position: 'absolute', inset: 0, border: '5px solid #1A1820', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 5, background: '#1A1820' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '48%', height: 5, background: '#1A1820' }} />
        <div style={{ position: 'absolute', inset: -8, border: '3px solid #252230', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -14, left: -12, right: -12, height: 14, background: '#16141F', borderTop: '1px solid #2A2640' }} />
      </div>

      {/* Lamp / ambient light */}
      <div className="absolute pointer-events-none" style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: 2, height: '8%', background: 'rgba(80,65,40,0.4)' }} />
      <div className="absolute pointer-events-none" style={{ top: '7%', left: 'calc(50% - 28px)', width: 56, height: 10, background: '#1C1810', borderRadius: '0 0 28px 28px' }} />
      <div className="absolute pointer-events-none" style={{ top: '8%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '120px solid transparent', borderRight: '120px solid transparent', borderTop: `${isMobile ? 260 : 380}px solid rgba(255,190,60,0.04)`, filter: 'blur(8px)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '22%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 120, background: 'radial-gradient(ellipse, rgba(255,185,55,0.07) 0%, transparent 70%)', borderRadius: '50%' }} />

      {/* ── CHARACTERS — visual novel layout ── */}

      {/* Weber — left */}
      <div style={{ ...getCharStyle('weber'), left: isMobile ? '2%' : '8%' }}>
        <WeberSVG size={baseSize} />
        <span className="font-detective mt-1" style={{ color: charConfig[0].color, fontSize: isMobile ? '0.42rem' : '0.58rem', letterSpacing: '0.28em', opacity: 0.8 }}>WEBER</span>
      </div>

      {/* Detective — center */}
      <div style={{ ...getCharStyle('detective'), left: '50%', transform: `translateX(-50%) scale(${isNarrator ? 0.7 : activeSpeaker === 'detective' ? 1 : 0.68}) translateY(${mounted ? 0 : 32}px)` }}>
        {detective.appearance
          ? <CharacterSVG appearance={detective.appearance} size={baseSize} />
          : <span style={{ fontSize: isMobile ? '5rem' : '8.5rem', filter: 'brightness(0.9)' }}>{getDetectiveAvatarEmoji(detective.avatar)}</span>}
        <span className="font-detective mt-1" style={{ color: accentColor, fontSize: isMobile ? '0.42rem' : '0.58rem', letterSpacing: '0.28em', opacity: 0.8 }}>{detective.name.toUpperCase()}</span>
      </div>

      {/* Mia — right */}
      <div style={{ ...getCharStyle('mia'), right: isMobile ? '2%' : '8%' }}>
        <MiaSVG size={baseSize} />
        <span className="font-detective mt-1" style={{ color: charConfig[2].color, fontSize: isMobile ? '0.42rem' : '0.58rem', letterSpacing: '0.28em', opacity: 0.8 }}>MIA</span>
      </div>

      {/* Active speaker spotlight — subtle glow beneath active character */}
      {!isNarrator && (
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: isMobile ? '29%' : '23%',
            left: activeSpeaker === 'weber' ? (isMobile ? '0%' : '5%') : activeSpeaker === 'mia' ? (isMobile ? '60%' : '67%') : '40%',
            width: isMobile ? '40%' : '28%',
            height: 60,
            background: `radial-gradient(ellipse at 50% 100%, ${
              activeSpeaker === 'weber' ? 'rgba(91,141,217,0.18)' :
              activeSpeaker === 'detective' ? `${accentColor}22` :
              'rgba(122,191,106,0.18)'
            } 0%, transparent 70%)`,
            transition: 'left 300ms ease, background 300ms ease',
          }}
        />
      )}

      <div className="scanlines absolute inset-0 pointer-events-none" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute z-50 font-detective text-xs tracking-widest uppercase transition-all duration-200"
        style={{
          top: 20,
          right: 24,
          letterSpacing: '0.22em',
          fontSize: '0.6rem',
          background: 'rgba(245,166,35,0.1)',
          border: '1px solid rgba(245,166,35,0.5)',
          padding: '8px 18px',
          color: 'rgba(245,166,35,0.85)',
          boxShadow: '0 0 16px rgba(245,166,35,0.12)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(245,166,35,0.2)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(245,166,35,0.25)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(245,166,35,0.1)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(245,166,35,0.12)'; }}
      >
        SKIP INTRO ›
      </button>

      <DialogueBox
        lines={introLines}
        detectiveName={detective.name}
        detectiveEmoji={getDetectiveAvatarEmoji(detective.avatar)}
        detectiveAppearance={detective.appearance}
        onComplete={onComplete}
        onLineChange={handleLineChange}
      />
    </div>
  );
}
