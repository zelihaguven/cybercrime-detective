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
        style={{ background: 'linear-gradient(180deg, #03050A 0%, #060410 55%, #040308 100%)' }}
      >
        {/* ── BRIEFING ROOM SCENE ── */}

        {/* Cold ceiling light strip */}
        <div className="absolute pointer-events-none" style={{ top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent 5%, rgba(160,200,255,0.18) 30%, rgba(180,215,255,0.26) 50%, rgba(160,200,255,0.18) 70%, transparent 95%)' }} />
        <div className="absolute pointer-events-none" style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 280, background: 'radial-gradient(ellipse at 50% 0%, rgba(120,165,255,0.05) 0%, transparent 65%)' }} />

        {/* Projector beam — SVG trapezoid from top to screen */}
        <svg className="absolute pointer-events-none hidden sm:block" style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: 560, height: 320, overflow: 'visible' }}>
          <polygon points="280,0 200,310 360,310" fill="rgba(130,170,255,0.025)" />
          <polygon points="280,0 215,310 345,310" fill="rgba(130,170,255,0.02)" />
        </svg>
        {/* Projector body hint — top center */}
        <div className="absolute pointer-events-none hidden sm:block" style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: 28, height: 10, background: 'rgba(50,60,90,0.45)', borderRadius: '0 0 4px 4px', border: '1px solid rgba(100,130,200,0.15)', borderTop: 'none' }} />
        <div className="absolute pointer-events-none hidden sm:block" style={{ top: 9, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: 'rgba(160,200,255,0.3)', boxShadow: '0 0 8px rgba(160,200,255,0.2)' }} />

        {/* Projection screen — back wall center */}
        <div className="absolute pointer-events-none hidden sm:block" style={{ top: '5%', left: '50%', transform: 'translateX(-50%)', width: '36%', minWidth: 300, height: '52%' }}>
          {/* Screen border */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,10,20,0.75)', border: '2px solid rgba(100,130,200,0.18)', boxShadow: '0 0 50px rgba(100,140,220,0.07), inset 0 0 30px rgba(0,0,0,0.4)' }}>
            {/* Screen content area */}
            <div style={{ position: 'absolute', inset: '5%', background: 'rgba(6,8,18,0.6)', border: '1px solid rgba(100,130,200,0.1)' }}>
              {/* Case number — top */}
              <div style={{ position: 'absolute', top: '5%', left: 0, right: 0, textAlign: 'center', fontFamily: 'monospace', color: 'rgba(120,155,230,0.22)', fontSize: '0.5rem', letterSpacing: '0.35em' }}>
                CASE {String(level.id).padStart(2, '0')}
              </div>
              {/* Victim photo placeholder */}
              <div style={{ position: 'absolute', top: '16%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '3.2rem', opacity: 0.14, filter: 'grayscale(70%) brightness(0.8)' }}>{level.victim.emoji}</div>
              </div>
              {/* Document scan lines */}
              {([38, 57, 66, 74, 82] as const).map((top, i) => (
                <div key={i} style={{ position: 'absolute', top: `${top}%`, left: '10%', right: '10%', height: 1, background: `rgba(100,140,220,${[0.14, 0.09, 0.09, 0.07, 0.06][i]})` }} />
              ))}
              {/* ACTIVE stamp */}
              <div style={{ position: 'absolute', bottom: '7%', right: '7%', border: '2px solid rgba(200,60,50,0.18)', color: 'rgba(200,60,50,0.18)', fontFamily: 'monospace', fontSize: '0.4rem', letterSpacing: '0.2em', padding: '2px 5px', transform: 'rotate(-8deg)' }}>
                ACTIVE
              </div>
            </div>
          </div>
          {/* Screen ambient glow */}
          <div style={{ position: 'absolute', inset: -24, background: 'radial-gradient(ellipse at 50% 50%, rgba(100,140,220,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        </div>

        {/* Conference table surface — bottom */}
        <div className="absolute pointer-events-none" style={{ bottom: '18%', left: '3%', right: '3%', height: 3, background: 'linear-gradient(90deg, transparent 0%, rgba(55,48,75,0.55) 15%, rgba(75,65,100,0.65) 50%, rgba(55,48,75,0.55) 85%, transparent 100%)' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '18%', left: '3%', right: '3%', height: 50, background: 'linear-gradient(180deg, rgba(55,48,75,0.1) 0%, transparent 100%)' }} />

        {/* Table items — folders left */}
        <div className="absolute pointer-events-none hidden sm:block" style={{ bottom: '19.5%', left: '20%', display: 'flex', gap: 3 }}>
          {(['rgba(140,80,40,0.22)', 'rgba(40,80,140,0.18)', 'rgba(40,110,60,0.17)'] as const).map((c, i) => (
            <div key={i} style={{ width: 15, height: 22 + i * 3, background: c, border: '1px solid rgba(255,255,255,0.05)', transform: `rotate(${[-1.5, 0, 1][i]}deg)` }} />
          ))}
        </div>
        {/* Laptop/tablet on table — right side */}
        <div className="absolute pointer-events-none hidden sm:block" style={{ bottom: '19.5%', right: '20%', width: 34, height: 26, background: 'rgba(18,22,38,0.55)', border: '1px solid rgba(100,130,200,0.16)', borderRadius: 2 }}>
          <div style={{ position: 'absolute', top: 4, left: 4, right: 4, height: 1, background: 'rgba(100,130,200,0.22)' }} />
          <div style={{ position: 'absolute', top: 8, left: 4, right: 4, height: 1, background: 'rgba(100,130,200,0.12)' }} />
          <div style={{ position: 'absolute', top: 12, left: 4, right: 8, height: 1, background: 'rgba(100,130,200,0.08)' }} />
        </div>

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

      <div className={`relative z-10 w-full max-w-2xl mx-auto ${isMobile ? 'px-4 py-20' : 'px-6 py-8'}`}>

        {/* ── DOSSIER CARD — victim-first layout ── */}
        <div
          style={{
            background: 'rgba(12,10,8,0.88)',
            border: '1px solid rgba(245,166,35,0.18)',
            boxShadow: '0 0 60px rgba(245,166,35,0.06), 0 24px 60px rgba(0,0,0,0.5)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top amber stripe */}
          <div style={{ height: 3, background: 'linear-gradient(90deg, rgba(245,166,35,0) 0%, rgba(245,166,35,0.6) 40%, rgba(245,166,35,0.6) 60%, rgba(245,166,35,0) 100%)' }} />

          <div className={isMobile ? 'p-5' : 'p-8'}>

            {/* ── VICTIM — centered, prominent ── */}
            <div className="flex flex-col items-center mb-6" style={{ textAlign: 'center' }}>
              {/* Polaroid */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: isMobile ? '14px 18px 10px' : '18px 24px 14px',
                  boxShadow: '6px 6px 24px rgba(0,0,0,0.6)',
                  transform: 'rotate(-1deg)',
                  display: 'inline-block',
                  marginBottom: isMobile ? 14 : 18,
                }}
              >
                <div style={{ fontSize: isMobile ? '5rem' : '6.5rem', lineHeight: 1, marginBottom: 10 }}>
                  {level.victim.emoji}
                </div>
                <div className="font-detective" style={{ color: 'rgba(245,166,35,0.6)', fontSize: '0.44rem', letterSpacing: '0.26em', marginBottom: 3 }}>
                  {t('victimLabel')}
                </div>
                <div className="font-detective" style={{ color: 'rgba(255,255,255,0.9)', fontSize: isMobile ? '0.8rem' : '0.95rem', letterSpacing: '0.08em' }}>
                  {level.victim.name}
                </div>
                <div className="font-detective" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', marginTop: 2 }}>
                  {level.victim.age} yrs
                </div>
              </div>

              {/* Atmospheric subtitle — "victim's voice" */}
              <p className="font-serif italic" style={{ color: 'rgba(255,255,255,0.75)', fontSize: isMobile ? '0.9rem' : '1.05rem', lineHeight: 1.6, maxWidth: 420, marginBottom: 6 }}>
                {level.subtitle}
              </p>
            </div>

            {/* ── BRIEFING TEXT — no label ── */}
            <div
              style={{
                background: 'rgba(245,166,35,0.03)',
                borderLeft: '3px solid rgba(245,166,35,0.35)',
                padding: isMobile ? '12px 14px' : '14px 18px',
                marginBottom: 20,
              }}
            >
              <p className="font-serif" style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, fontSize: isMobile ? '0.8rem' : '0.88rem' }}>
                {level.briefing}
              </p>
            </div>

            {/* ── METADATA FOOTER ROW ── */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span
                className="font-detective px-2 py-1"
                style={{ background: `${diffColor}15`, border: `1px solid ${diffColor}55`, color: diffColor, letterSpacing: '0.16em', fontSize: '0.5rem', transform: 'rotate(-0.5deg)', display: 'inline-block' }}
              >
                {t(DIFFICULTY_LABEL_KEYS[level.difficulty])}
              </span>
              <span
                className="font-detective px-2 py-1"
                style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.3)', color: 'rgba(245,166,35,0.75)', letterSpacing: '0.12em', fontSize: '0.5rem' }}
              >
                {level.caseType}
              </span>
              <span
                className="font-detective px-2 py-1"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', fontSize: '0.5rem' }}
              >
                📍 {level.location}
              </span>
              <span
                className="font-detective px-2 py-1"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', fontSize: '0.5rem' }}
              >
                🔍 {level.clues.length} {t('evidenceCount')}
              </span>
            </div>

            {/* ── CTA BUTTONS ── */}
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
