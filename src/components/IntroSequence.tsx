import { useState, useEffect, useMemo } from 'react';
import DialogueBox from './DialogueBox';
import type { Detective, DialogueLine } from '../types/game';
import { getDetectiveAvatarEmoji } from '../utils/detective';
import CharacterSVG, { OUTFIT_ACCENT_COLORS } from './CharacterSVG';
import { useIsMobile } from '../utils/responsive';
import { useLanguage } from '../contexts/LanguageContext';

const INTRO_CHARACTER_IDS: DialogueLine['characterId'][] = [
  'narrator', 'narrator', 'weber', 'weber', 'mia', 'weber', 'jonas', 'weber', 'detective', 'weber',
];

interface Props {
  detective: Detective;
  onComplete: () => void;
}

export default function IntroSequence({ detective, onComplete }: Props) {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  const introLines: DialogueLine[] = useMemo(() => INTRO_CHARACTER_IDS.map((characterId, i) => ({
    characterId,
    text: t(`introLine${i}` as Parameters<typeof t>[0]),
  })), [t]);

  useEffect(() => { setTimeout(() => setMounted(true), 200); }, []);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, rgba(25,16,45,0.85) 0%, #07050C 65%)',
        opacity: mounted ? 1 : 0,
      }}
    >
      {/* Window silhouette */}
      <div className="absolute pointer-events-none hidden sm:block" style={{ top: '8%', left: '50%', transform: 'translateX(-50%)', width: '28%', height: '38%' }}>
        <div style={{ width: '100%', height: '100%', border: '2px solid rgba(255,255,255,0.07)', background: 'rgba(15,22,50,0.35)', position: 'relative', overflow: 'hidden' }}>
          {/* Rain streaks */}
          {Array.from({ length: 22 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${(i * 11 + 3) % 95}%`,
                top: `${(i * 7 + 2) % 70}%`,
                width: 1,
                height: `${8 + (i % 6) * 4}%`,
                background: 'rgba(120,160,220,0.2)',
                transform: 'rotate(12deg)',
              }}
            />
          ))}
          {/* Window cross */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>
      </div>

      {/* Lamp light pool */}
      <div className="absolute pointer-events-none" style={{ top: '55%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 200, background: 'radial-gradient(ellipse, rgba(255,200,80,0.04) 0%, transparent 70%)', borderRadius: '50%' }} />

      {/* Character silhouettes */}
      {!isMobile && (
        <div
          className="absolute pointer-events-none flex items-end gap-24 transition-opacity duration-1000"
          style={{ bottom: '22%', left: '50%', transform: 'translateX(-50%)', opacity: mounted ? 0.55 : 0 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-6xl" style={{ filter: 'grayscale(20%) brightness(0.7)' }}>🧔</span>
            <span className="font-detective mt-1" style={{ color: '#5B8DD9', fontSize: '0.55rem', letterSpacing: '0.28em' }}>WEBER</span>
          </div>
          <div className="flex flex-col items-center">
            {detective.appearance
              ? <CharacterSVG appearance={detective.appearance} size={96} />
              : <span className="text-7xl" style={{ filter: 'brightness(0.85)' }}>{getDetectiveAvatarEmoji(detective.avatar)}</span>}
            <span className="font-detective mt-1" style={{ color: OUTFIT_ACCENT_COLORS[detective.appearance?.outfitColor ?? detective.avatar] ?? '#F5A623', fontSize: '0.55rem', letterSpacing: '0.28em' }}>{detective.name.toUpperCase()}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl" style={{ filter: 'grayscale(20%) brightness(0.7)' }}>👩‍💻</span>
            <span className="font-detective mt-1" style={{ color: '#7ABF6A', fontSize: '0.55rem', letterSpacing: '0.28em' }}>MIA</span>
          </div>
        </div>
      )}
      {isMobile && (
        <div
          className="absolute pointer-events-none flex items-end gap-8 transition-opacity duration-1000"
          style={{ bottom: '22%', left: '50%', transform: 'translateX(-50%)', opacity: mounted ? 0.55 : 0 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl" style={{ filter: 'grayscale(20%) brightness(0.7)' }}>🧔</span>
            <span className="font-detective mt-1" style={{ color: '#5B8DD9', fontSize: '0.45rem', letterSpacing: '0.2em' }}>WEBER</span>
          </div>
          <div className="flex flex-col items-center">
            {detective.appearance
              ? <CharacterSVG appearance={detective.appearance} size={64} />
              : <span className="text-5xl" style={{ filter: 'brightness(0.85)' }}>{getDetectiveAvatarEmoji(detective.avatar)}</span>}
            <span className="font-detective mt-1" style={{ color: OUTFIT_ACCENT_COLORS[detective.appearance?.outfitColor ?? detective.avatar] ?? '#F5A623', fontSize: '0.45rem', letterSpacing: '0.2em' }}>{detective.name.toUpperCase()}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl" style={{ filter: 'grayscale(20%) brightness(0.7)' }}>👩‍💻</span>
            <span className="font-detective mt-1" style={{ color: '#7ABF6A', fontSize: '0.45rem', letterSpacing: '0.2em' }}>MIA</span>
          </div>
        </div>
      )}

      <div className="scanlines absolute inset-0 pointer-events-none" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <DialogueBox
        lines={introLines}
        detectiveName={detective.name}
        detectiveEmoji={getDetectiveAvatarEmoji(detective.avatar)}
        detectiveAppearance={detective.appearance}
        onComplete={onComplete}
      />
    </div>
  );
}
