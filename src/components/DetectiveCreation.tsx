import { useState, useEffect } from 'react';
import type { Detective, CharacterAppearance } from '../types/game';
import { SPECIALTIES } from '../data/characters';
import { useIsMobile } from '../utils/responsive';
import CharacterSVG, {
  SKIN_COLORS,
  HAIR_COLORS,
  OUTFIT_COLORS_HEX,
  OUTFIT_ACCENT_COLORS,
  HAIR_STYLE_NAMES,
  OUTFIT_NAMES,
} from './CharacterSVG';

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

interface Props {
  onComplete: (detective: Detective) => void;
}

const DEFAULT_APPEARANCE: CharacterAppearance = {
  skinTone: 2,
  hairStyle: 1,
  hairColor: 1,
  outfitColor: 0,
};

export default function DetectiveCreation({ onComplete }: Props) {
  const isMobile = useIsMobile();
  const [name, setName] = useState('');
  const [badge, setBadge] = useState(0);
  const [specialty, setSpecialty] = useState(0);
  const [appearance, setAppearance] = useState<CharacterAppearance>(DEFAULT_APPEARANCE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const setApp = (key: keyof CharacterAppearance, val: number) =>
    setAppearance((prev) => ({ ...prev, [key]: val }));

  const canProceed = name.trim().length >= 2;
  const accent = OUTFIT_ACCENT_COLORS[appearance.outfitColor] ?? '#F5A623';
  const BadgeComp = BADGE_COMPONENTS[badge];

  const handleBegin = () => {
    if (!canProceed) return;
    onComplete({
      name: name.trim(),
      avatar: appearance.outfitColor,
      badge,
      specialty,
      appearance,
      xp: 0,
      rank: 'Junior Investigator',
      completedCases: [],
    });
  };

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
        <div className="text-center mb-8">
          <div className="font-detective text-xs tracking-[0.45em] mb-2" style={{ color: 'rgba(245,166,35,0.45)' }}>
            CYBERCRIME INVESTIGATION UNIT · BERLIN
          </div>
          <h1 className="font-detective" style={{ color: 'var(--text-primary)', letterSpacing: '0.06em', fontSize: isMobile ? '1.6rem' : '2.25rem' }}>
            Create Your Detective
          </h1>
        </div>

        <div className={isMobile ? 'grid grid-cols-1 gap-6' : 'grid grid-cols-2 gap-10'}>
          {/* ── LEFT: Character + Appearance ── */}
          <div>
            {/* Large character preview with glow */}
            <div className="relative flex justify-center mb-6">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 45%, ${accent}22 0%, transparent 68%)`,
                  transition: 'background 0.4s ease',
                }}
              />
              <CharacterSVG appearance={appearance} size={148} />
            </div>

            {/* Section label */}
            <div className="font-detective text-xs mb-4" style={{ color: 'rgba(245,166,35,0.55)', letterSpacing: '0.35em' }}>
              APPEARANCE
            </div>

            {/* Skin tone */}
            <div className="mb-5">
              <div className="font-detective mb-2" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem', letterSpacing: '0.2em' }}>
                SKIN TONE
              </div>
              <div className="flex gap-2.5">
                {SKIN_COLORS.map((col, i) => (
                  <button
                    key={i}
                    onClick={() => setApp('skinTone', i)}
                    title={['Light', 'Medium Light', 'Medium', 'Medium Dark', 'Dark'][i]}
                    style={{
                      width: 34, height: 34,
                      borderRadius: '50%',
                      background: col,
                      border: appearance.skinTone === i ? '2.5px solid #fff' : '2.5px solid rgba(255,255,255,0.08)',
                      boxShadow: appearance.skinTone === i ? `0 0 14px ${col}90` : 'none',
                      transition: 'all 0.18s ease',
                      flexShrink: 0,
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Hair style */}
            <div className="mb-5">
              <div className="font-detective mb-2" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem', letterSpacing: '0.2em' }}>
                HAIR STYLE
              </div>
              <div className="flex gap-2">
                {HAIR_STYLE_NAMES.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setApp('hairStyle', i)}
                    className="flex-1 py-2.5 font-detective transition-all duration-200"
                    style={{
                      background: appearance.hairStyle === i ? 'rgba(245,166,35,0.1)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${appearance.hairStyle === i ? 'rgba(245,166,35,0.5)' : 'rgba(255,255,255,0.07)'}`,
                      color: appearance.hairStyle === i ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {label.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Hair color */}
            <div className="mb-5">
              <div className="font-detective mb-2" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem', letterSpacing: '0.2em' }}>
                HAIR COLOR
              </div>
              <div className="flex gap-2.5">
                {HAIR_COLORS.map((col, i) => (
                  <button
                    key={i}
                    onClick={() => setApp('hairColor', i)}
                    title={['Blonde', 'Brown', 'Black', 'Red', 'Silver', 'Blue'][i]}
                    style={{
                      width: 34, height: 34,
                      borderRadius: '50%',
                      background: col,
                      border: appearance.hairColor === i ? '2.5px solid #fff' : '2.5px solid rgba(255,255,255,0.1)',
                      boxShadow: appearance.hairColor === i ? `0 0 14px ${col}90` : 'none',
                      transition: 'all 0.18s ease',
                      flexShrink: 0,
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Outfit */}
            <div className="mb-6">
              <div className="font-detective mb-2" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem', letterSpacing: '0.2em' }}>
                OUTFIT
              </div>
              <div className="flex gap-2">
                {OUTFIT_COLORS_HEX.map((col, i) => (
                  <button
                    key={i}
                    onClick={() => setApp('outfitColor', i)}
                    className="flex-1 py-3 flex flex-col items-center gap-1.5 transition-all duration-200"
                    style={{
                      background: appearance.outfitColor === i ? `${OUTFIT_ACCENT_COLORS[i]}14` : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${appearance.outfitColor === i ? `${OUTFIT_ACCENT_COLORS[i]}55` : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 3,
                        background: col,
                        border: '1px solid rgba(255,255,255,0.15)',
                        boxShadow: appearance.outfitColor === i ? `0 0 8px ${OUTFIT_ACCENT_COLORS[i]}60` : 'none',
                        transition: 'box-shadow 0.2s ease',
                      }}
                    />
                    <span
                      className="font-detective"
                      style={{
                        color: appearance.outfitColor === i ? OUTFIT_ACCENT_COLORS[i] : 'rgba(255,255,255,0.22)',
                        fontSize: '0.5rem',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {OUTFIT_NAMES[i].toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name input */}
            <div>
              <label className="block font-detective text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(245,166,35,0.6)' }}>
                Detective Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && canProceed) handleBegin(); }}
                placeholder="Enter your name..."
                maxLength={24}
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
                  Name requires at least 2 characters.
                </p>
              )}
            </div>
          </div>

          {/* ── RIGHT: Identity + Card + Actions ── */}
          <div className="space-y-5">
            {/* Specialty */}
            <div>
              <label className="block font-detective text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(245,166,35,0.6)' }}>
                Specialty
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
                          {spec.label.toUpperCase()}
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
                Badge Style
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
                CYBERCRIME INVESTIGATION UNIT · BERLIN
              </div>
              <div className="flex items-center gap-4">
                <div style={{ flexShrink: 0 }}>
                  <CharacterSVG appearance={appearance} size={58} />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="font-detective text-base mb-0.5"
                    style={{ color: name.trim() ? 'var(--text-primary)' : 'rgba(255,255,255,0.15)', letterSpacing: '0.06em' }}
                  >
                    {name.trim() || '— — —'}
                  </div>
                  <div className="font-detective mb-1.5" style={{ color: accent, opacity: 0.7, fontSize: '0.55rem', letterSpacing: '0.1em' }}>
                    {SPECIALTIES[specialty].icon} {SPECIALTIES[specialty].label.toUpperCase()}
                  </div>
                  <div className="font-detective" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.48rem', letterSpacing: '0.18em' }}>
                    RANK: JUNIOR INVESTIGATOR
                  </div>
                  <div className="font-detective mt-0.5" style={{ color: '#7ABF6A', fontSize: '0.48rem', letterSpacing: '0.15em' }}>
                    ● ACTIVE
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
              Begin Investigation
            </button>
            <p className="text-center font-detective" style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
              or press Enter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
