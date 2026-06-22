import { useState, useEffect } from 'react';
import type { Level, Detective } from '../types/game';
import DialogueBox from './DialogueBox';
import { getDetectiveAvatarEmoji } from '../utils/detective';
import { useIsMobile } from '../utils/responsive';
import { useLanguage } from '../contexts/LanguageContext';
const DIFFICULTY_COLOR = { easy: '#7ABF6A', medium: '#F5A623', hard: '#E05A47' };

interface Props {
  level: Level;
  detective: Detective;
  onBegin: () => void;
  onBack: () => void;
}

type Phase = 'dossier' | 'dialogue';

const DIFFICULTY_LABEL_KEYS = { easy: 'difficultyEasy' as const, medium: 'difficultyMedium' as const, hard: 'difficultyHard' as const };

export default function CaseBriefing({ level, detective, onBegin, onBack }: Props) {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const [phase, setPhase] = useState<Phase>('dossier');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const diffColor = DIFFICULTY_COLOR[level.difficulty];

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
          {t('caseLabel')} {String(level.id).padStart(2, '0')} · {t('briefingRoom')}
        </div>

        <DialogueBox
          lines={level.openingDialogue}
          detectiveName={detective.name}
          detectiveEmoji={getDetectiveAvatarEmoji(detective.avatar)}
          detectiveAppearance={detective.appearance}
          onComplete={onBegin}
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-y-auto transition-opacity duration-600"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(20,14,30,0.9) 0%, #07050C 70%)',
        opacity: mounted ? 1 : 0,
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
        ← {t('returnToBoard')}
      </button>

      {/* Case number badge — top right */}
      <div className="absolute top-6 right-6 z-20 font-detective text-xs" style={{ color: 'rgba(245,166,35,0.4)', letterSpacing: '0.3em', fontSize: '0.58rem' }}>
        CASE {String(level.id).padStart(2, '0')}
      </div>

      <div className={`relative z-10 w-full max-w-3xl mx-auto ${isMobile ? 'px-4 py-20' : 'px-6 py-8'}`}>

        {/* ── DOSSIER CARD — visual-first layout ── */}
        <div
          style={{
            background: 'rgba(12,10,8,0.85)',
            border: '1px solid rgba(245,166,35,0.18)',
            boxShadow: '0 0 60px rgba(245,166,35,0.06), 0 24px 60px rgba(0,0,0,0.5)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top amber stripe */}
          <div style={{ height: 3, background: 'linear-gradient(90deg, rgba(245,166,35,0) 0%, rgba(245,166,35,0.6) 40%, rgba(245,166,35,0.6) 60%, rgba(245,166,35,0) 100%)' }} />

          <div className={isMobile ? 'p-5' : 'p-8'}>

            {/* ── ROW 1: Victim polaroid + case title + stamps ── */}
            <div className={`flex ${isMobile ? 'flex-col gap-5' : 'gap-8 items-start'} mb-6`}>

              {/* Victim "polaroid" */}
              <div
                className="flex-shrink-0 flex flex-col items-center"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: isMobile ? '12px 16px 8px' : '16px 20px 12px',
                  width: isMobile ? '100%' : 160,
                  boxShadow: '4px 4px 20px rgba(0,0,0,0.5)',
                  transform: 'rotate(-1.5deg)',
                }}
              >
                <div style={{ fontSize: isMobile ? '4rem' : '5.5rem', lineHeight: 1, marginBottom: 8 }}>
                  {level.victim.emoji}
                </div>
                <div className="font-detective text-center" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.52rem', letterSpacing: '0.18em', lineHeight: 1.6 }}>
                  <div style={{ color: 'rgba(245,166,35,0.7)', fontSize: '0.48rem', letterSpacing: '0.22em', marginBottom: 2 }}>{t('victimLabel')}</div>
                  <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.72rem', letterSpacing: '0.06em' }}>{level.victim.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.55rem' }}>{level.victim.age} yrs</div>
                </div>
              </div>

              {/* Case title + stamps + incident line */}
              <div className="flex-1">
                {/* Stamps row */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className="font-detective text-xs px-3 py-1"
                    style={{ background: `${diffColor}18`, border: `2px solid ${diffColor}60`, color: diffColor, letterSpacing: '0.18em', fontSize: '0.55rem', transform: 'rotate(-0.5deg)', display: 'inline-block' }}
                  >
                    {t(DIFFICULTY_LABEL_KEYS[level.difficulty])}
                  </span>
                  <span
                    className="font-detective text-xs px-3 py-1"
                    style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.35)', color: 'rgba(245,166,35,0.8)', letterSpacing: '0.14em', fontSize: '0.55rem' }}
                  >
                    {level.caseType}
                  </span>
                </div>

                <h2 className="font-detective mb-1" style={{ color: 'var(--text-primary)', letterSpacing: '0.06em', fontSize: isMobile ? '1.5rem' : '2rem', lineHeight: 1.15 }}>
                  {level.title}
                </h2>
                <p className="font-serif italic mb-4" style={{ color: 'var(--text-muted)', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                  {level.subtitle}
                </p>

                {/* Key facts as icon tags */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: '📍', value: level.location },
                    { icon: '🔍', value: `${level.clues.length} ${t('evidenceCount')}` },
                  ].map(({ icon, value }) => (
                    <div key={value} className="flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '5px 10px' }}>
                      <span style={{ fontSize: '0.75rem' }}>{icon}</span>
                      <span className="font-detective" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.58rem', letterSpacing: '0.1em' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── ROW 2: Incident — brief handwritten-style note ── */}
            <div
              style={{
                background: 'rgba(245,166,35,0.03)',
                border: '1px solid rgba(245,166,35,0.12)',
                borderLeft: '3px solid rgba(245,166,35,0.4)',
                padding: isMobile ? '12px 14px' : '14px 18px',
                marginBottom: 24,
              }}
            >
              <div className="font-detective text-xs mb-1.5" style={{ color: 'rgba(245,166,35,0.5)', letterSpacing: '0.22em', fontSize: '0.52rem' }}>
                {t('incidentSummary')}
              </div>
              <p className="font-serif italic" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: isMobile ? '0.82rem' : '0.9rem' }}>
                {level.briefing}
              </p>
            </div>

            {/* ── ROW 3: CTA buttons ── */}
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3`}>
              <button
                onClick={() => setPhase('dialogue')}
                className="font-detective tracking-widest uppercase transition-all duration-300"
                style={{
                  flex: isMobile ? undefined : 1,
                  padding: isMobile ? '14px' : '16px 24px',
                  background: 'rgba(245,166,35,0.1)',
                  border: '1px solid rgba(245,166,35,0.55)',
                  color: 'var(--accent)',
                  letterSpacing: '0.25em',
                  fontSize: '0.72rem',
                  boxShadow: '0 0 30px rgba(245,166,35,0.08)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(245,166,35,0.18)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(245,166,35,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(245,166,35,0.1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(245,166,35,0.08)'; }}
              >
                ▶ {t('receiveBriefing')}
              </button>
              <button
                onClick={onBegin}
                className="font-detective tracking-widest uppercase transition-all duration-200"
                style={{
                  padding: isMobile ? '12px' : '16px 20px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.2em',
                  fontSize: '0.62rem',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                {t('skipBriefing')} →
              </button>
            </div>

          </div>

          {/* Bottom stripe */}
          <div style={{ height: 2, background: 'linear-gradient(90deg, rgba(245,166,35,0) 0%, rgba(245,166,35,0.25) 50%, rgba(245,166,35,0) 100%)' }} />
        </div>
      </div>
    </div>
  );
}
