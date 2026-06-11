import { useState, useEffect } from 'react';
import DialogueBox from './DialogueBox';
import type { Detective, DialogueLine } from '../types/game';
import { getDetectiveAvatarEmoji } from '../utils/detective';
import CharacterSVG, { OUTFIT_ACCENT_COLORS } from './CharacterSVG';
import { useIsMobile } from '../utils/responsive';

const INTRO_LINES: DialogueLine[] = [
  { characterId: 'narrator', text: 'Berlin · Cybercrime Investigation Unit · 08:42 AM' },
  { characterId: 'narrator', text: 'Rain against the windows. Cold coffee on the desk. Six open cases.' },
  { characterId: 'weber', text: "You must be the new transfer. I'm Chief Inspector Weber. We've been expecting you." },
  { characterId: 'weber', text: "Six cases are waiting. Six victims. Each one fell for a different form of cybercrime — and none of them saw it coming." },
  { characterId: 'mia', text: "Oh! You're finally here. I'm Mia — digital forensics. When you find evidence in the field, I'll help you make sense of it. The technical side is my job." },
  { characterId: 'weber', text: "Your role is straightforward, {detective}. You investigate crime scenes. You collect evidence. You pin it to your board. When you're ready — you name the attack. Make it stick." },
  { characterId: 'jonas', text: "Jonas. I'm your field officer. I secure scenes, recover devices, talk to witnesses. Whatever I leave behind — it matters. Read it carefully." },
  { characterId: 'weber', text: "One more thing. These aren't exercises. Every case here represents real victims. Real damage. We solve them — then we publish the findings. Prevention starts in this room." },
  { characterId: 'detective', text: "Understood. I'm ready." },
  { characterId: 'weber', text: "Then the board is yours, {detective}. The first case is already waiting." },
];

interface Props {
  detective: Detective;
  onComplete: () => void;
}

export default function IntroSequence({ detective, onComplete }: Props) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

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
        lines={INTRO_LINES}
        detectiveName={detective.name}
        detectiveEmoji={getDetectiveAvatarEmoji(detective.avatar)}
        detectiveAppearance={detective.appearance}
        onComplete={onComplete}
      />
    </div>
  );
}
