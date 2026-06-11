import { useState, useEffect } from 'react';
import type { Level, Detective } from '../types/game';
import DialogueBox from './DialogueBox';
import { getDetectiveAvatarEmoji } from '../utils/detective';
import CharacterSVG from './CharacterSVG';
import { useIsMobile } from '../utils/responsive';

const DIFFICULTY_LABEL = { easy: 'ENTRY LEVEL', medium: 'INTERMEDIATE', hard: 'ADVANCED' };
const DIFFICULTY_COLOR = { easy: '#7ABF6A', medium: '#F5A623', hard: '#E05A47' };

interface Props {
  level: Level;
  detective: Detective;
  onBegin: () => void;
  onBack: () => void;
}

type Phase = 'dossier' | 'dialogue';

export default function CaseBriefing({ level, detective, onBegin, onBack }: Props) {
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState<Phase>('dossier');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const diffColor = DIFFICULTY_COLOR[level.difficulty];
  const avatarEmoji = getDetectiveAvatarEmoji(detective.avatar);

  if (phase === 'dialogue') {
    return (
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(20,14,30,0.9) 0%, #07050C 65%)' }}
      >
        <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        {/* Scene label */}
        <div className="absolute top-6 left-8 font-detective text-xs" style={{ color: 'rgba(245,166,35,0.4)', letterSpacing: '0.3em', fontSize: '0.6rem' }}>
          CASE {String(level.id).padStart(2, '0')} · BRIEFING ROOM
        </div>

        <DialogueBox
          lines={level.openingDialogue}
          detectiveName={detective.name}
          detectiveEmoji={avatarEmoji}
          detectiveAppearance={detective.appearance}
          onComplete={onBegin}
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-opacity duration-600"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(20,14,30,0.8) 0%, #07050C 65%)',
        opacity: mounted ? 1 : 0,
        overflowY: isMobile ? 'auto' : undefined,
      }}
    >
      <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 font-detective text-xs tracking-widest uppercase transition-all duration-200"
        style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', fontSize: '0.6rem', zIndex: 20 }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
      >
        ← Return to Board
      </button>

      <div className={`relative z-10 w-full max-w-4xl mx-auto ${isMobile ? 'px-4 py-16' : 'px-6'}`}>
        <div className={isMobile ? 'flex flex-col gap-5' : 'grid grid-cols-2 gap-8'}>
          {/* ── Left: Victim Dossier ── */}
          <div>
            {/* Case header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="font-detective text-xs px-3 py-1"
                  style={{ background: `${diffColor}14`, border: `1px solid ${diffColor}35`, color: diffColor, letterSpacing: '0.18em', fontSize: '0.58rem' }}
                >
                  {DIFFICULTY_LABEL[level.difficulty]}
                </div>
                <div className="font-detective text-xs" style={{ color: 'rgba(245,166,35,0.45)', letterSpacing: '0.25em', fontSize: '0.58rem' }}>
                  CASE {String(level.id).padStart(2, '0')}
                </div>
              </div>
              <h2 className="font-detective text-3xl mb-1" style={{ color: 'var(--text-primary)', letterSpacing: '0.06em' }}>
                {level.title}
              </h2>
              <p className="font-serif italic text-sm" style={{ color: 'var(--text-muted)' }}>{level.subtitle}</p>
            </div>

            {/* Victim profile */}
            <div
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '20px',
                marginBottom: 16,
              }}
            >
              <div className="flex gap-4">
                <div
                  className="flex items-center justify-center text-5xl flex-shrink-0"
                  style={{
                    width: 80,
                    height: 80,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {level.victim.emoji}
                </div>
                <div className="flex-1">
                  <div className="font-detective text-xs mb-1" style={{ color: 'rgba(245,166,35,0.5)', letterSpacing: '0.2em', fontSize: '0.58rem' }}>VICTIM</div>
                  <div className="font-detective text-lg" style={{ color: 'var(--text-primary)', letterSpacing: '0.06em' }}>{level.victim.name}</div>
                  <div className="font-detective text-xs mt-0.5" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em', fontSize: '0.65rem' }}>
                    {level.victim.age} yrs · {level.victim.description}
                  </div>
                </div>
              </div>
              <p className="mt-3 font-sans text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontSize: '0.72rem' }}>
                {level.victim.background}
              </p>
            </div>

            {/* Briefing */}
            <div
              style={{
                background: 'rgba(245,166,35,0.04)',
                border: '1px solid rgba(245,166,35,0.15)',
                padding: '16px',
              }}
            >
              <div className="font-detective text-xs mb-2" style={{ color: 'rgba(245,166,35,0.55)', letterSpacing: '0.22em', fontSize: '0.58rem' }}>INCIDENT SUMMARY</div>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontSize: '0.8rem' }}>
                {level.briefing}
              </p>
            </div>
          </div>

          {/* ── Right: Case Facts & Actions ── */}
          <div className="flex flex-col">
            {/* Case type + location */}
            <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: '16px', marginBottom: 16, background: 'rgba(255,255,255,0.02)' }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'INVESTIGATION', value: level.investigationLabel },
                  { label: 'LOCATION', value: level.location },
                  { label: 'EVIDENCE', value: `${level.clues.length} items` },
                  { label: 'DIFFICULTY', value: DIFFICULTY_LABEL[level.difficulty], color: diffColor },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <div className="font-detective mb-1" style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.52rem', letterSpacing: '0.2em' }}>{label}</div>
                    <div className="font-detective text-xs" style={{ color: color ?? 'rgba(255,255,255,0.72)', fontSize: '0.68rem', letterSpacing: '0.08em' }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detective memo box */}
            <div
              style={{
                background: 'rgba(245,166,35,0.03)',
                border: '1px solid rgba(245,166,35,0.12)',
                padding: '16px',
                flex: 1,
                marginBottom: 20,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                {detective.appearance
                  ? <CharacterSVG appearance={detective.appearance} size={32}/>
                  : <span className="text-lg">{avatarEmoji}</span>}
                <div>
                  <div className="font-detective" style={{ color: 'rgba(245,166,35,0.55)', fontSize: '0.55rem', letterSpacing: '0.2em' }}>DETECTIVE {detective.name.toUpperCase()}</div>
                  <div className="font-detective" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.5rem', letterSpacing: '0.15em' }}>INITIAL ASSESSMENT</div>
                </div>
              </div>
              <p className="font-serif italic text-sm" style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: '0.78rem' }}>
                "{level.detectiveMemo}"
              </p>
            </div>

            {/* CTA buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setPhase('dialogue')}
                className="w-full font-detective text-sm tracking-widest uppercase py-4 transition-all duration-300"
                style={{
                  background: 'rgba(245,166,35,0.1)',
                  border: '1px solid rgba(245,166,35,0.5)',
                  color: 'var(--accent)',
                  letterSpacing: '0.3em',
                  boxShadow: '0 0 30px rgba(245,166,35,0.1)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(245,166,35,0.16)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(245,166,35,0.1)'; }}
              >
                Receive Briefing →
              </button>
              <button
                onClick={onBegin}
                className="w-full font-detective text-xs tracking-widest uppercase py-2.5 transition-all duration-200"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.2em',
                  fontSize: '0.62rem',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
              >
                Skip Briefing · Go Straight to Scene
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
