import { useState, useEffect, useMemo, useRef } from 'react';
import DialogueBox from './DialogueBox';
import type { Detective, DialogueLine } from '../types/game';
import { getDetectiveAvatarEmoji } from '../utils/detective';
import CharacterSVG, { OUTFIT_ACCENT_COLORS } from './CharacterSVG';
import { WeberPortrait, MiaPortrait } from './NpcSVG';
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
  const [speakingKey, setSpeakingKey] = useState(0);
  const [showTalking, setShowTalking] = useState(false);
  const prevSpeakerRef = useRef(activeSpeaker);

  const introLines: DialogueLine[] = useMemo(() => INTRO_CHARACTER_IDS.map((characterId, i) => ({
    characterId,
    text: t(`introLine${i}` as Parameters<typeof t>[0]),
  })), [t]);

  useEffect(() => { setTimeout(() => setMounted(true), 200); }, []);

  useEffect(() => {
    if (prevSpeakerRef.current !== activeSpeaker) {
      setSpeakingKey(k => k + 1);
      prevSpeakerRef.current = activeSpeaker;
    }
  }, [activeSpeaker]);

  useEffect(() => {
    setShowTalking(true);
    const timer = setTimeout(() => setShowTalking(false), 2000);
    return () => clearTimeout(timer);
  }, [activeSpeaker]);

  const handleLineChange = (lineIndex: number) => {
    setActiveSpeaker(INTRO_CHARACTER_IDS[lineIndex] ?? 'narrator');
  };

  const accentColor = OUTFIT_ACCENT_COLORS[detective.appearance?.outfitColor ?? detective.avatar] ?? '#F5A623';
  const isNarrator = activeSpeaker === 'narrator';
  const baseSize = isMobile ? 110 : 220;

  const getCharStyle = (id: string) => {
    const isActive = activeSpeaker === id;
    const opacity = isNarrator ? 0.25 : isActive ? 1 : 0.35;
    const scale = isNarrator ? 0.72 : isActive ? 1 : 0.62;
    const translateY = isNarrator ? 0 : isActive ? 0 : 14;
    return {
      opacity: mounted ? opacity : 0,
      transform: `scale(${scale}) translateY(${mounted ? translateY : 32}px)`,
      transition: 'opacity 300ms ease, transform 300ms ease',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      position: 'absolute' as const,
      bottom: isMobile ? '30%' : '28%',
      transformOrigin: 'bottom center',
      zIndex: 10,
    };
  };

  const glowColor = (id: string) => {
    if (id === 'weber') return 'rgba(91,141,217,0.4)';
    if (id === 'mia') return 'rgba(122,191,106,0.4)';
    return `${accentColor}55`;
  };

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700"
      style={{ background: '#06070E', opacity: mounted ? 1 : 0 }}
    >
      {/* ── INTERIOR BACKGROUND ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/characters/Interior_of_a_cybercrime_investigation_unit_main_room_night_scene_Open_plan_of_20260625102304_01.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />
      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(4,5,12,0.55) 0%, rgba(4,5,12,0.45) 60%, rgba(4,5,12,0.75) 100%)' }}
      />

      {/* ── CHARACTERS ── */}

      {/* Weber — left, near window */}
      <div
        style={{ ...getCharStyle('weber'), left: isMobile ? '1%' : '4%' }}
        key={activeSpeaker === 'weber' ? speakingKey : 0}
        className={activeSpeaker === 'weber' ? 'speaker-pop' : ''}
      >
        <WeberPortrait size={baseSize} />
        <span className="font-detective mt-1" style={{ color: '#5B8DD9', fontSize: isMobile ? '0.4rem' : '0.55rem', letterSpacing: '0.28em', opacity: 0.85 }}>WEBER</span>
        {activeSpeaker === 'weber' && showTalking && (
          <div className="talking-dots"><span>.</span><span>.</span><span>.</span></div>
        )}
      </div>

      {/* Detective — center */}
      <div
        style={{
          ...getCharStyle('detective'),
          left: '50%',
          transform: `translateX(-50%) scale(${isNarrator ? 0.72 : activeSpeaker === 'detective' ? 1 : 0.62}) translateY(${mounted ? (isNarrator ? 0 : activeSpeaker === 'detective' ? 0 : 14) : 32}px)`,
        }}
        key={activeSpeaker === 'detective' ? speakingKey + 1000 : 0}
        className={activeSpeaker === 'detective' ? 'speaker-pop' : ''}
      >
        {detective.photo
          ? <img src={`/characters/${detective.photo}.png`} alt={detective.name} style={{ width: baseSize, height: baseSize * 1.25, objectFit: 'contain', objectPosition: 'bottom' }} />
          : detective.appearance
            ? <CharacterSVG appearance={detective.appearance} size={baseSize} />
            : <span style={{ fontSize: isMobile ? '5rem' : '8.5rem', filter: 'brightness(0.9)' }}>{getDetectiveAvatarEmoji(detective.avatar)}</span>}
        <span className="font-detective mt-1" style={{ color: accentColor, fontSize: isMobile ? '0.4rem' : '0.55rem', letterSpacing: '0.28em', opacity: 0.85 }}>{detective.name.toUpperCase()}</span>
        {activeSpeaker === 'detective' && showTalking && (
          <div className="talking-dots"><span>.</span><span>.</span><span>.</span></div>
        )}
      </div>

      {/* Mia — right, in front of crime board */}
      <div
        style={{ ...getCharStyle('mia'), right: isMobile ? '1%' : '4%' }}
        key={activeSpeaker === 'mia' ? speakingKey + 2000 : 0}
        className={activeSpeaker === 'mia' ? 'speaker-pop' : ''}
      >
        <MiaPortrait size={baseSize} />
        <span className="font-detective mt-1" style={{ color: '#7ABF6A', fontSize: isMobile ? '0.4rem' : '0.55rem', letterSpacing: '0.28em', opacity: 0.85 }}>MIA</span>
        {activeSpeaker === 'mia' && showTalking && (
          <div className="talking-dots"><span>.</span><span>.</span><span>.</span></div>
        )}
      </div>

      {/* Active speaker spotlight */}
      {!isNarrator && (
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: isMobile ? '27%' : '25%',
            left: activeSpeaker === 'weber'
              ? (isMobile ? '0%' : '1%')
              : activeSpeaker === 'mia'
                ? (isMobile ? '58%' : '63%')
                : '37%',
            width: isMobile ? '38%' : '26%',
            height: 90,
            background: `radial-gradient(ellipse at 50% 100%, ${glowColor(activeSpeaker)} 0%, transparent 70%)`,
            transition: 'left 300ms ease, background 300ms ease',
          }}
        />
      )}

      <div className="scanlines absolute inset-0 pointer-events-none" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute z-50 font-detective uppercase transition-all duration-200"
        style={{
          top: 20, right: 24,
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
