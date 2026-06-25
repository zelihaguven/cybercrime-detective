import { useState, useEffect } from 'react';
import type { Detective } from '../types/game';
import { LEVELS, getLevelById } from '../data/levels';
import { useLanguage } from '../contexts/LanguageContext';
import { getRankColor, getRankProgress } from '../utils/detective';
import { OUTFIT_ACCENT_COLORS } from './CharacterSVG';
import CharacterSVG from './CharacterSVG';

interface Props {
  detective: Detective;
  onComplete: () => void;
}

export default function AllCasesComplete({ detective, onComplete }: Props) {
  const { t, lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [stampVisible, setStampVisible] = useState(false);
  const [casesVisible, setCasesVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 80);
    const t2 = setTimeout(() => setStampVisible(true), 450);
    const t3 = setTimeout(() => setCasesVisible(true), 1000);
    const t4 = setTimeout(() => setCtaVisible(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const avatarColor = OUTFIT_ACCENT_COLORS[detective.appearance?.outfitColor ?? detective.avatar] ?? '#F5A623';
  const rankColor = getRankColor(detective.rank);
  const { progress } = getRankProgress(detective.xp);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
      style={{
        background: 'radial-gradient(ellipse at 50% 25%, rgba(18,30,18,0.97) 0%, #07050C 60%)',
        opacity: mounted ? 1 : 0,
      }}
    >
      <div className="scanlines absolute inset-0 pointer-events-none opacity-40" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Header label */}
      <div className="absolute top-6 left-8 font-detective text-xs" style={{ color: 'rgba(122,191,106,0.4)', letterSpacing: '0.3em', fontSize: '0.6rem' }}>
        {t('finalReportHeader')}
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-8">

        {/* Stamp */}
        <div className="text-center mb-7">
          <div
            className="inline-block font-detective px-12 py-4 mb-3 transition-all duration-700"
            style={{
              border: '2px solid rgba(122,191,106,0.65)',
              color: 'rgba(122,191,106,0.9)',
              letterSpacing: '0.4em',
              fontSize: '1.9rem',
              opacity: stampVisible ? 1 : 0,
              transform: stampVisible ? 'scale(1) rotate(-2.5deg)' : 'scale(1.15) rotate(-2.5deg)',
            }}
          >
            {t('allCasesClosed')}
          </div>
          <div
            className="font-detective transition-opacity duration-500"
            style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.25em', fontSize: '0.58rem', opacity: stampVisible ? 1 : 0 }}
          >
            {t('allCasesSubline')}
          </div>
        </div>

        {/* Detective card */}
        <div
          className="mb-5 transition-opacity duration-500"
          style={{
            background: 'rgba(122,191,106,0.04)',
            border: '1px solid rgba(122,191,106,0.18)',
            padding: '18px 22px',
            opacity: casesVisible ? 1 : 0,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {detective.photo
                ? <img src={`/characters/${detective.photo}.png`} alt={detective.name} style={{ width: 52, height: 65, objectFit: 'contain', objectPosition: 'bottom' }} />
                : detective.appearance
                  ? <CharacterSVG appearance={detective.appearance} size={52} />
                  : <span className="text-4xl">🕵️</span>}
              <div>
                <div className="font-detective text-xl" style={{ color: 'var(--text-primary)', letterSpacing: '0.06em' }}>
                  Det. {detective.name}
                </div>
                <div className="font-detective mt-0.5" style={{ color: rankColor, letterSpacing: '0.14em', fontSize: '0.63rem' }}>
                  {detective.rank.toUpperCase()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-detective" style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.52rem', letterSpacing: '0.2em', marginBottom: 3 }}>TOTAL XP</div>
              <div className="font-detective text-3xl" style={{ color: avatarColor, letterSpacing: '0.04em' }}>{detective.xp}</div>
            </div>
          </div>
          <div className="mt-4" style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(progress * 100, 100)}%`,
                background: `linear-gradient(90deg, ${rankColor}70, ${rankColor})`,
                borderRadius: 2,
                transition: 'width 1.5s ease 0.8s',
              }}
            />
          </div>
        </div>

        {/* Case grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-7">
          {LEVELS.filter((l) => !l.multiplayerOnly).map((level, i) => {
            const l = getLevelById(level.id, lang) ?? level;
            return (
              <div
                key={level.id}
                style={{
                  background: 'rgba(122,191,106,0.04)',
                  border: '1px solid rgba(122,191,106,0.2)',
                  padding: '12px 14px',
                  transition: `opacity 0.4s ease ${i * 90}ms, transform 0.4s ease ${i * 90}ms`,
                  opacity: casesVisible ? 1 : 0,
                  transform: casesVisible ? 'translateY(0)' : 'translateY(10px)',
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-detective" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.5rem', letterSpacing: '0.22em' }}>
                    {t('caseLabel')} {String(level.id).padStart(2, '0')}
                  </div>
                  <span style={{ color: '#7ABF6A', fontSize: '0.75rem' }}>✓</span>
                </div>
                <div className="font-detective" style={{ color: 'rgba(255,255,255,0.72)', letterSpacing: '0.04em', fontSize: '0.65rem', lineHeight: 1.35 }}>
                  {l.title}
                </div>
                <div className="font-detective mt-1" style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.5rem', letterSpacing: '0.1em' }}>
                  {l.caseType}
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing message + CTA */}
        <div
          className="text-center transition-opacity duration-500"
          style={{ opacity: ctaVisible ? 1 : 0 }}
        >
          <p className="font-serif italic text-sm mb-2 whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.42)', lineHeight: 1.9 }}>
            {t('weberQuote')}
          </p>
          <p className="font-detective text-xs mb-6" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', fontSize: '0.58rem' }}>
            {t('weberCredit')}
          </p>
          <button
            onClick={onComplete}
            className="font-detective text-sm tracking-widest uppercase px-10 py-3.5 transition-all duration-300"
            style={{
              background: 'rgba(122,191,106,0.1)',
              border: '1px solid rgba(122,191,106,0.5)',
              color: '#7ABF6A',
              letterSpacing: '0.28em',
              boxShadow: '0 0 30px rgba(122,191,106,0.1)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(122,191,106,0.18)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(122,191,106,0.1)')}
          >
            {t('returnToOfficeFinal')}
          </button>
        </div>
      </div>
    </div>
  );
}
