import { useState, useEffect } from 'react';
import type { Detective, DetectivePhoto } from '../types/game';
import { SPECIALTIES } from '../data/characters';
import { OUTFIT_ACCENT_COLORS } from './CharacterSVG';
import { useIsMobile } from '../utils/responsive';
import { useLanguage } from '../contexts/LanguageContext';

const SPECIALTY_KEYS = ['specialty0', 'specialty1', 'specialty2', 'specialty3'] as const;

function ShieldBadge({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 60 70" fill="none" className="w-full h-full">
      <path d="M30 4L6 16v22c0 15 10 27 24 31C44 65 54 53 54 38V16L30 4z" fill={`${color}18`} stroke={color} strokeWidth="1.8" />
      <path d="M30 16L18 24v13c0 9 6 16 12 18.5C36 53 42 45 42 37V24L30 16z" fill={`${color}25`} />
      <circle cx="30" cy="33" r="5" fill={color} opacity="0.75" />
      <circle cx="30" cy="33" r="2" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

function StarBadge({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 70 70" fill="none" className="w-full h-full">
      <polygon points="35,6 41,26 63,26 46,40 52,62 35,49 18,62 24,40 7,26 29,26" fill={`${color}18`} stroke={color} strokeWidth="1.8" />
      <polygon points="35,16 39,30 53,30 42,39 46,53 35,45 24,53 28,39 17,30 31,30" fill={`${color}20`} opacity="0.5" />
      <circle cx="35" cy="35" r="4.5" fill={color} opacity="0.75" />
    </svg>
  );
}

function HexBadge({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 70 70" fill="none" className="w-full h-full">
      <polygon points="35,5 61,20 61,50 35,65 9,50 9,20" fill={`${color}18`} stroke={color} strokeWidth="1.8" />
      <polygon points="35,16 52,26 52,44 35,54 18,44 18,26" fill={`${color}14`} stroke={color} strokeWidth="0.8" opacity="0.6" />
      <text x="35" y="38" textAnchor="middle" fontSize="11" fill={color} fontFamily="monospace" fontWeight="bold" opacity="0.9">CIU</text>
      <circle cx="35" cy="25" r="2.5" fill={color} opacity="0.6" />
    </svg>
  );
}

const BADGE_COMPONENTS = [ShieldBadge, StarBadge, HexBadge];
const BADGE_NAMES = ['Shield', 'Star', 'Hex'];

const PHOTO_OPTIONS: { id: DetectivePhoto; label: string; colorIndex: number }[] = [
  { id: 'man1',   label: 'AGENT 01', colorIndex: 0 },
  { id: 'man2',   label: 'AGENT 02', colorIndex: 1 },
  { id: 'woman1', label: 'AGENT 03', colorIndex: 3 },
  { id: 'woman2', label: 'AGENT 04', colorIndex: 4 },
];

interface Props {
  onComplete: (detective: Detective) => void;
  onBack?: () => void;
  fastMode?: boolean;
}

export default function DetectiveCreation({ onComplete, onBack, fastMode = false }: Props) {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [badge, setBadge] = useState(0);
  const [specialty, setSpecialty] = useState(0);
  const [photo, setPhoto] = useState<DetectivePhoto>('man1');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const canProceed = name.trim().length >= 2;
  const colorIndex = PHOTO_OPTIONS.find(p => p.id === photo)?.colorIndex ?? 0;
  const accent = OUTFIT_ACCENT_COLORS[colorIndex] ?? '#F5A623';
  const BadgeComp = BADGE_COMPONENTS[badge];

  const handleBegin = () => {
    if (!canProceed) return;
    onComplete({
      name: name.trim(),
      avatar: colorIndex,
      badge,
      specialty,
      photo,
      xp: 0,
      rank: 'Junior Investigator',
      completedCases: [],
      earnedBadges: [],
    });
  };

  // ── FAST MODE (multiplayer / samcon) ──
  if (fastMode) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #07050A 0%, #0A0710 100%)' }}>
        <div className="scanlines fixed inset-0 pointer-events-none opacity-20" />
        <div
          className="relative w-full max-w-sm mx-auto px-8 flex flex-col items-center gap-6 transition-all duration-700"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(20px)' }}
        >
          <div className="text-center">
            <div className="font-detective text-xs tracking-[0.45em] mb-2" style={{ color: 'rgba(245,166,35,0.45)', fontSize: '0.58rem' }}>
              CYBERCRIME INVESTIGATION UNIT
            </div>
            <h1 className="font-detective text-2xl" style={{ color: 'var(--text-primary)', letterSpacing: '0.06em' }}>
              {t('createDetective')}
            </h1>
          </div>

          {/* Photo preview */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 45%, ${accent}28 0%, transparent 68%)` }} />
            <img
              src={`/characters/${photo}.png`}
              alt="Selected detective"
              style={{ width: 120, height: 150, objectFit: 'contain', objectPosition: 'bottom' }}
            />
          </div>

          {/* Photo selection */}
          <div className="w-full grid grid-cols-4 gap-2">
            {PHOTO_OPTIONS.map((opt) => {
              const sel = photo === opt.id;
              const optAccent = OUTFIT_ACCENT_COLORS[opt.colorIndex] ?? '#F5A623';
              return (
                <button
                  key={opt.id}
                  onClick={() => setPhoto(opt.id)}
                  className="flex flex-col items-center gap-1 py-2 transition-all duration-200"
                  style={{
                    background: sel ? `${optAccent}14` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${sel ? `${optAccent}55` : 'rgba(255,255,255,0.07)'}`,
                    boxShadow: sel ? `0 0 12px ${optAccent}20` : 'none',
                  }}
                >
                  <img
                    src={`/characters/${opt.id}.png`}
                    alt={opt.label}
                    style={{ width: 40, height: 50, objectFit: 'contain', objectPosition: 'bottom' }}
                  />
                  <span className="font-detective" style={{ color: sel ? optAccent : 'rgba(255,255,255,0.25)', fontSize: '0.42rem', letterSpacing: '0.08em' }}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Name */}
          <div className="w-full">
            <label className="block font-detective text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(245,166,35,0.6)' }}>
              {t('yourName')}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && canProceed) handleBegin(); }}
              placeholder={t('namePlaceholder')}
              maxLength={24}
              autoFocus
              className="w-full px-4 py-3 font-detective text-sm tracking-wider outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(245,166,35,0.22)',
                color: 'var(--text-primary)',
                letterSpacing: '0.15em',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(245,166,35,0.55)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(245,166,35,0.22)')}
            />
          </div>

          <button
            onClick={handleBegin}
            disabled={!canProceed}
            className="w-full font-detective text-sm tracking-widest uppercase py-4 transition-all duration-300"
            style={{
              background: canProceed ? `${accent}12` : 'rgba(255,255,255,0.02)',
              border: `1px solid ${canProceed ? `${accent}55` : 'rgba(255,255,255,0.07)'}`,
              color: canProceed ? accent : 'rgba(255,255,255,0.15)',
              cursor: canProceed ? 'pointer' : 'not-allowed',
              letterSpacing: '0.28em',
              boxShadow: canProceed ? `0 0 32px ${accent}14` : 'none',
            }}
          >
            {t('beginInvestigation')} ›
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 overflow-y-auto"
      style={{ background: 'linear-gradient(180deg, #07050A 0%, #0A0710 100%)' }}
    >
      <div className="scanlines fixed inset-0 pointer-events-none opacity-20" />

      <div
        className="relative w-full max-w-5xl mx-auto px-6 py-8 transition-all duration-700"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(20px)' }}
      >
        {/* Header */}
        <div className="text-center mb-8 relative">
          {onBack && (
            <button
              onClick={onBack}
              className="absolute left-0 top-0 font-detective text-xs tracking-widest"
              style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.62rem', letterSpacing: '0.2em', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 8px', minHeight: 44, display: 'flex', alignItems: 'center' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >
              {t('back')}
            </button>
          )}
          <div className="font-detective text-xs tracking-[0.45em] mb-2" style={{ color: 'rgba(245,166,35,0.45)' }}>
            {t('ciuBerlin')}
          </div>
          <h1 className="font-detective" style={{ color: 'var(--text-primary)', letterSpacing: '0.06em', fontSize: isMobile ? '1.6rem' : '2.25rem' }}>
            {t('createDetective')}
          </h1>
        </div>

        <div className={isMobile ? 'grid grid-cols-1 gap-6' : 'grid grid-cols-2 gap-10'}>
          {/* ── LEFT: Agent photo selection ── */}
          <div>
            {/* Large photo preview */}
            <div className="relative flex justify-center mb-6" style={{ height: isMobile ? 180 : 240 }}>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 60%, ${accent}22 0%, transparent 68%)`,
                  transition: 'background 0.4s ease',
                }}
              />
              <img
                src={`/characters/${photo}.png`}
                alt="Selected detective"
                style={{
                  height: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'bottom',
                  transition: 'all 0.3s ease',
                  filter: `drop-shadow(0 0 18px ${accent}35)`,
                }}
              />
            </div>

            {/* Section label */}
            <div className="font-detective text-xs mb-4" style={{ color: 'rgba(245,166,35,0.55)', letterSpacing: '0.35em' }}>
              SELECT AGENT
            </div>

            {/* 4-photo grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {PHOTO_OPTIONS.map((opt) => {
                const sel = photo === opt.id;
                const optAccent = OUTFIT_ACCENT_COLORS[opt.colorIndex] ?? '#F5A623';
                return (
                  <button
                    key={opt.id}
                    onClick={() => setPhoto(opt.id)}
                    className="flex flex-col items-center gap-2 py-4 transition-all duration-200"
                    style={{
                      background: sel ? `${optAccent}10` : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${sel ? `${optAccent}55` : 'rgba(255,255,255,0.07)'}`,
                      boxShadow: sel ? `0 0 18px ${optAccent}18` : 'none',
                    }}
                  >
                    <img
                      src={`/characters/${opt.id}.png`}
                      alt={opt.label}
                      style={{
                        width: 64,
                        height: 80,
                        objectFit: 'contain',
                        objectPosition: 'bottom',
                        filter: sel ? `drop-shadow(0 0 8px ${optAccent}60)` : 'brightness(0.6)',
                        transition: 'filter 0.2s ease',
                      }}
                    />
                    <span
                      className="font-detective"
                      style={{ color: sel ? optAccent : 'rgba(255,255,255,0.22)', fontSize: '0.52rem', letterSpacing: '0.15em' }}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Name input */}
            <div>
              <label className="block font-detective text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(245,166,35,0.6)' }}>
                {t('yourName')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && canProceed) handleBegin(); }}
                placeholder={t('namePlaceholder')}
                maxLength={24}
                autoFocus
                className="w-full px-4 py-3 font-detective text-sm tracking-wider outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(245,166,35,0.22)',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.15em',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(245,166,35,0.55)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(245,166,35,0.22)')}
              />
              {name.length > 0 && name.trim().length < 2 && (
                <p className="mt-1.5 font-detective" style={{ color: 'var(--danger)', fontSize: '0.62rem', letterSpacing: '0.08em' }}>
                  {t('nameMinError')}
                </p>
              )}
            </div>
          </div>

          {/* ── RIGHT: Identity + Badge + Role + Card + Button ── */}
          <div className="space-y-5">
            {/* Role / Specialty */}
            <div>
              <label className="block font-detective text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(245,166,35,0.6)' }}>
                {t('specialty')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SPECIALTIES.map((spec, i) => {
                  const sel = specialty === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setSpecialty(i)}
                      className="flex items-start gap-3 px-3 py-3 text-left transition-all duration-200"
                      style={{
                        background: sel ? `${accent}10` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${sel ? `${accent}45` : 'rgba(255,255,255,0.06)'}`,
                        boxShadow: sel ? `0 0 16px ${accent}10` : 'none',
                      }}
                    >
                      <span className="text-xl mt-0.5 flex-shrink-0">{spec.icon}</span>
                      <div>
                        <div
                          className="font-detective"
                          style={{ color: sel ? accent : 'rgba(255,255,255,0.42)', fontSize: '0.57rem', letterSpacing: '0.1em', marginBottom: 2 }}
                        >
                          {t(SPECIALTY_KEYS[i]).toUpperCase()}
                        </div>
                        <div
                          className="font-serif italic"
                          style={{ color: sel ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.2)', fontSize: '0.62rem' }}
                        >
                          {spec.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Badge */}
            <div>
              <label className="block font-detective text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(245,166,35,0.6)' }}>
                {t('badge')}
              </label>
              <div className="flex gap-2.5">
                {BADGE_NAMES.map((badgeName, i) => {
                  const BadgeC = BADGE_COMPONENTS[i];
                  const sel = badge === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setBadge(i)}
                      className="flex-1 flex flex-col items-center py-3.5 transition-all duration-200"
                      style={{
                        background: sel ? `${accent}10` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${sel ? `${accent}45` : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      <div className="w-10 h-10 mb-1.5">
                        <BadgeC color={sel ? accent : '#444'} />
                      </div>
                      <span
                        className="font-detective"
                        style={{ color: sel ? accent : 'rgba(255,255,255,0.22)', fontSize: '0.58rem', letterSpacing: '0.12em' }}
                      >
                        {badgeName.toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ID Card preview */}
            <div
              style={{
                background: 'linear-gradient(145deg, #12101A, #0E0C14)',
                border: `1px solid ${accent}28`,
                padding: '16px',
                transition: 'border-color 0.4s ease',
              }}
            >
              <div className="font-detective mb-3" style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.48rem', letterSpacing: '0.28em' }}>
                {t('ciuBerlin')}
              </div>
              <div className="flex items-center gap-4">
                <div style={{ flexShrink: 0, width: 46, height: 58, overflow: 'hidden' }}>
                  <img
                    src={`/characters/${photo}.png`}
                    alt="Agent"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="font-detective text-base mb-0.5"
                    style={{ color: name.trim() ? 'var(--text-primary)' : 'rgba(255,255,255,0.15)', letterSpacing: '0.06em' }}
                  >
                    {name.trim() || '— — —'}
                  </div>
                  <div className="font-detective mb-1.5" style={{ color: accent, opacity: 0.7, fontSize: '0.55rem', letterSpacing: '0.1em' }}>
                    {SPECIALTIES[specialty].icon} {t(SPECIALTY_KEYS[specialty]).toUpperCase()}
                  </div>
                  <div className="font-detective" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.48rem', letterSpacing: '0.18em' }}>
                    {t('rankJuniorCard')}
                  </div>
                  <div className="font-detective mt-0.5" style={{ color: '#7ABF6A', fontSize: '0.48rem', letterSpacing: '0.15em' }}>
                    {t('activeStatus')}
                  </div>
                </div>
                <div className="w-9 h-9 flex-shrink-0" style={{ filter: `drop-shadow(0 0 6px ${accent}40)` }}>
                  <BadgeComp color={accent} />
                </div>
              </div>
            </div>

            {/* Begin button */}
            <button
              onClick={handleBegin}
              disabled={!canProceed}
              className="w-full font-detective text-sm tracking-widest uppercase py-4 transition-all duration-300"
              style={{
                background: canProceed ? `${accent}12` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${canProceed ? `${accent}55` : 'rgba(255,255,255,0.07)'}`,
                color: canProceed ? accent : 'rgba(255,255,255,0.15)',
                cursor: canProceed ? 'pointer' : 'not-allowed',
                letterSpacing: '0.28em',
                boxShadow: canProceed ? `0 0 32px ${accent}14` : 'none',
              }}
            >
              {t('beginInvestigation')}
            </button>
            <p className="text-center font-detective" style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
              {t('orPressEnter')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
