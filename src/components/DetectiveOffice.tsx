import { useState } from 'react';
import type { Detective, Level } from '../types/game';
import { getRankProgress, getRankColor } from '../utils/detective';
import { OUTFIT_ACCENT_COLORS } from './CharacterSVG';
import CharacterSVG from './CharacterSVG';
import { useIsMobile } from '../utils/responsive';
import { useLanguage } from '../contexts/LanguageContext';
import { BADGES } from '../data/badges';
import { SPECIALTIES } from '../data/characters';

const DIFFICULTY_COLORS = { easy: '#7ABF6A', medium: '#F5A623', hard: '#E05A47' };
const DIFFICULTY_LABEL_KEYS = { easy: 'difficultyEasy' as const, medium: 'difficultyMedium' as const, hard: 'difficultyHard' as const };

interface Props {
  detective: Detective;
  levels: Level[];
  onSelectCase: (levelId: number) => void;
  onNewDetective: () => void;
}

export default function DetectiveOffice({ detective, levels, onSelectCase, onNewDetective }: Props) {
  const isMobile = useIsMobile();
  const { t, lang } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

  const { progress } = getRankProgress(detective.xp);
  const rankColor = getRankColor(detective.rank);
  const avatarColor = OUTFIT_ACCENT_COLORS[detective.appearance?.outfitColor ?? detective.avatar] ?? '#F5A623';

  const isLocked = (idx: number) => idx > detective.completedCases.length;
  const isSolved = (id: number) => detective.completedCases.includes(id);
  const isNext = (idx: number) => idx === detective.completedCases.length;

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-y-auto" style={{ background: '#080608' }}>
        <div className="scanlines fixed inset-0 pointer-events-none opacity-30" />
        {/* Compact header */}
        <div className="relative z-10 px-4 pt-4 pb-3" style={{ borderBottom: '1px solid rgba(245,166,35,0.09)', background: 'rgba(6,4,8,0.88)' }}>
          <div className="flex items-center gap-3">
            {detective.appearance ? <CharacterSVG appearance={detective.appearance} size={48}/> : <span className="text-3xl">🕵️</span>}
            <div className="flex-1 min-w-0">
              <div className="font-detective text-base" style={{ color: 'var(--text-primary)' }}>Det. {detective.name}</div>
              <div className="font-detective" style={{ color: rankColor, fontSize: '0.58rem', letterSpacing: '0.12em' }}>{detective.rank.toUpperCase()}</div>
              <div className="font-detective" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.52rem' }}>{detective.completedCases.length}/{levels.length} cases · {detective.xp} XP</div>
            </div>
            <button
              onClick={onNewDetective}
              className="font-detective px-2 py-1"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', fontSize: '0.52rem' }}
            >↺</button>
          </div>
          {/* XP bar */}
          <div className="mt-2" style={{ height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2 }}>
            <div style={{ height: '100%', width: `${Math.min(progress * 100, 100)}%`, background: `linear-gradient(90deg, ${rankColor}80 0%, ${rankColor} 100%)`, borderRadius: 2 }} />
          </div>
        </div>
        {/* Case grid */}
        <div className="relative z-10 p-3 grid grid-cols-2 gap-3">
          {levels.map((level, idx) => {
            const solved = isSolved(level.id);
            const locked = isLocked(idx);
            const next = isNext(idx);
            const isSelected = selected === level.id;
            const diffColor = DIFFICULTY_COLORS[level.difficulty];
            return (
              <CaseCard
                key={level.id}
                level={level}
                solved={solved}
                locked={locked}
                isNext={next}
                isSelected={isSelected}
                onClick={() => { if (!locked) setSelected(isSelected ? null : level.id); }}
                onOpen={() => { if (!locked) onSelectCase(level.id); }}
                diffColor={diffColor}
              />
            );
          })}
        </div>
        {/* Selected case open button */}
        {selected !== null && (
          <div className="sticky bottom-0 p-3 z-20" style={{ background: 'linear-gradient(to top, rgba(8,6,8,0.98) 0%, transparent 100%)' }}>
            <button
              onClick={() => onSelectCase(selected)}
              className="w-full font-detective text-sm py-3 tracking-widest uppercase"
              style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.5)', color: 'var(--accent)', letterSpacing: '0.22em' }}
            >
              {t('openCaseFile')}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0"
      style={{ background: '#080608', overflow: 'hidden' }}
    >
      {/* Office atmosphere glow */}
      <div className="absolute pointer-events-none" style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 300, background: 'radial-gradient(ellipse, rgba(255,180,60,0.025) 0%, transparent 70%)' }} />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 h-full flex">
        {/* ── Sidebar ── */}
        <aside
          style={{
            width: 230,
            borderRight: '1px solid rgba(245,166,35,0.09)',
            background: 'rgba(6,4,8,0.88)',
            padding: '28px 20px',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            overflowY: 'auto',
          }}
        >
          {/* Unit badge */}
          <div className="mb-7">
            <div className="font-detective text-xs" style={{ color: 'rgba(245,166,35,0.38)', letterSpacing: '0.3em', fontSize: '0.58rem' }}>CIU BERLIN</div>
            <div className="font-detective text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.12)', letterSpacing: '0.2em', fontSize: '0.52rem' }}>CYBERCRIME DIVISION</div>
          </div>

          {/* Detective card */}
          <div style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${avatarColor}20`, padding: '16px', marginBottom: 24 }}>
            <div className="flex justify-center mb-2">
              {detective.appearance
                ? <CharacterSVG appearance={detective.appearance} size={80}/>
                : <span className="text-4xl">🕵️</span>}
            </div>
            <div className="text-center">
              <div className="font-detective text-sm" style={{ color: 'var(--text-primary)', letterSpacing: '0.06em' }}>
                Det. {detective.name}
              </div>
              <div className="font-detective mt-1" style={{ color: rankColor, fontSize: '0.58rem', letterSpacing: '0.14em', opacity: 0.85 }}>
                {detective.rank.toUpperCase()}
              </div>
            </div>
            {/* XP bar */}
            <div className="mt-3">
              <div className="flex justify-between mb-1.5">
                <span className="font-detective" style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.52rem', letterSpacing: '0.1em' }}>XP</span>
                <span className="font-detective" style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.52rem' }}>{detective.xp}</span>
              </div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 2 }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(progress * 100, 100)}%`,
                    background: `linear-gradient(90deg, ${rankColor}80 0%, ${rankColor} 100%)`,
                    boxShadow: `0 0 8px ${rankColor}50`,
                    borderRadius: 2,
                    transition: 'width 0.8s ease',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-3 mb-8">
            {[
              { label: t('casesSolved'), value: detective.completedCases.length, color: '#7ABF6A' },
              { label: t('openCasesLabel'), value: levels.length - detective.completedCases.length, color: '#E05A47' },
              { label: t('totalXP'), value: detective.xp, color: rankColor },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="font-detective" style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.55rem', letterSpacing: '0.15em' }}>{label}</span>
                <span className="font-detective text-sm" style={{ color }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Specialty perk */}
          {(() => {
            const spec = SPECIALTIES[detective.specialty ?? 0];
            const SPECIALTY_CLUE_TYPES = ['screenshot', 'witness', 'note', 'photo'];
            const clueType = SPECIALTY_CLUE_TYPES[detective.specialty ?? 0];
            const CLUE_ICONS: Record<string, string> = { screenshot: '🖥️', witness: '🗣️', note: '📄', photo: '📷' };
            const clueTypeLabels: Record<string, { en: string; de: string }> = {
              screenshot: { en: 'digital clues', de: 'digitale Hinweise' },
              witness: { en: 'witness statements', de: 'Zeugenaussagen' },
              note: { en: 'field notes', de: 'Feldnotizen' },
              photo: { en: 'photographs', de: 'Fotos' },
            };
            const label = clueTypeLabels[clueType]?.[lang as 'en' | 'de'] ?? clueType;
            return (
              <div className="mb-6 px-3 py-2.5" style={{ background: 'rgba(185,143,212,0.05)', border: '1px solid rgba(185,143,212,0.15)' }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span style={{ fontSize: '0.85rem' }}>{spec.icon}</span>
                  <span className="font-detective" style={{ color: 'rgba(185,143,212,0.8)', fontSize: '0.55rem', letterSpacing: '0.15em' }}>
                    {lang === 'de' ? 'FACHGEBIET' : 'SPECIALTY'}
                  </span>
                </div>
                <div className="font-detective" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.6rem', letterSpacing: '0.06em' }}>
                  {spec.label}
                </div>
                <div className="font-detective mt-1" style={{ color: 'rgba(185,143,212,0.55)', fontSize: '0.52rem', letterSpacing: '0.06em' }}>
                  {CLUE_ICONS[clueType]} +5 XP {lang === 'de' ? 'pro' : 'per'} {label}
                </div>
              </div>
            );
          })()}

          {/* Badges */}
          <div className="mb-6">
            <div className="font-detective mb-2" style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.52rem', letterSpacing: '0.2em' }}>
              {lang === 'de' ? 'ABZEICHEN' : 'BADGES'}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {BADGES.map((badge) => {
                const earned = (detective.earnedBadges ?? []).includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    title={badge.desc[lang as 'en' | 'de'] ?? badge.desc.en}
                    style={{
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      background: earned ? 'rgba(245,166,35,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${earned ? 'rgba(245,166,35,0.35)' : 'rgba(255,255,255,0.07)'}`,
                      opacity: earned ? 1 : 0.3,
                      cursor: 'default',
                    }}
                  >
                    {badge.icon}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unit members */}
          <div className="mt-auto">
            <div className="font-detective mb-3" style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.52rem', letterSpacing: '0.2em' }}>{t('unitOnDuty')}</div>
            {[
              { emoji: '🧔', name: 'Weber', color: '#5B8DD9' },
              { emoji: '👩‍💻', name: 'Mia', color: '#7ABF6A' },
              { emoji: '🕵️', name: 'Jonas', color: '#D4A070' },
            ].map(({ emoji, name, color }) => (
              <div key={name} className="flex items-center gap-2 mb-2">
                <span className="text-base">{emoji}</span>
                <span className="font-detective" style={{ color, fontSize: '0.65rem', letterSpacing: '0.12em' }}>{name}</span>
                <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#7ABF6A', boxShadow: '0 0 6px rgba(122,191,106,0.9)' }} />
              </div>
            ))}

            <button
              onClick={onNewDetective}
              className="w-full font-detective text-xs tracking-widest uppercase py-2 mt-5 transition-all duration-200"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.18em',
                fontSize: '0.52rem',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(224,90,71,0.7)'; e.currentTarget.style.borderColor = 'rgba(224,90,71,0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
            >
              {t('newDetective')}
            </button>
          </div>
        </aside>

        {/* ── Main: Investigation Board ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div
            className="flex items-center justify-between px-8 py-5"
            style={{ borderBottom: '1px solid rgba(245,166,35,0.07)' }}
          >
            <div>
              <h2 className="font-detective text-2xl" style={{ color: 'var(--text-primary)', letterSpacing: '0.06em' }}>
                {t('investigationBoard')}
              </h2>
              <p className="font-serif italic text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {detective.completedCases.length} of {levels.length} cases closed · {levels.length - detective.completedCases.length} active
              </p>
            </div>
            {selected !== null && (
              <button
                onClick={() => onSelectCase(selected)}
                className="font-detective text-sm tracking-widest uppercase px-6 py-3 transition-all duration-300"
                style={{
                  background: 'rgba(245,166,35,0.1)',
                  border: '1px solid rgba(245,166,35,0.5)',
                  color: 'var(--accent)',
                  letterSpacing: '0.22em',
                  boxShadow: '0 0 28px rgba(245,166,35,0.12)',
                }}
              >
                {t('openCaseFile')}
              </button>
            )}
          </div>

          {/* Cork board */}
          <div
            className="flex-1 p-8 overflow-auto"
            style={{
              background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 29px, rgba(255,255,255,0.012) 30px), repeating-linear-gradient(90deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 29px, rgba(255,255,255,0.012) 30px)',
            }}
          >
            <div className="grid grid-cols-3 gap-5">
              {levels.map((level, idx) => {
                const solved = isSolved(level.id);
                const locked = isLocked(idx);
                const next = isNext(idx);
                const isSelected = selected === level.id;
                const diffColor = DIFFICULTY_COLORS[level.difficulty];

                return (
                  <CaseCard
                    key={level.id}
                    level={level}
                    solved={solved}
                    locked={locked}
                    isNext={next}
                    isSelected={isSelected}
                    onClick={() => { if (!locked) setSelected(isSelected ? null : level.id); }}
                    onOpen={() => { if (!locked) onSelectCase(level.id); }}
                    diffColor={diffColor}
                  />
                );
              })}

              {/* Placeholder slots */}
              {Array.from({ length: Math.max(0, 6 - levels.length) }).map((_, i) => (
                <div
                  key={`ph-${i}`}
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px dashed rgba(255,255,255,0.04)',
                    minHeight: 180,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2 opacity-10">🔒</div>
                    <div className="font-detective" style={{ color: 'rgba(255,255,255,0.08)', fontSize: '0.6rem', letterSpacing: '0.25em' }}>{t('classified')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CaseCardProps {
  level: Level;
  solved: boolean;
  locked: boolean;
  isNext: boolean;
  isSelected: boolean;
  onClick: () => void;
  onOpen: () => void;
  diffColor: string;
}

function CaseCard({ level, solved, locked, isNext, isSelected, onClick, onOpen, diffColor }: CaseCardProps) {
  const [hovered, setHovered] = useState(false);
  const { t } = useLanguage();

  const accentColor = solved ? '#7ABF6A' : locked ? '#333' : isNext ? '#F5A623' : '#999';

  return (
    <button
      className="relative text-left transition-all duration-300"
      style={{
        background: locked
          ? 'rgba(255,255,255,0.01)'
          : solved
          ? 'rgba(122,191,106,0.04)'
          : isSelected
          ? 'rgba(245,166,35,0.07)'
          : hovered
          ? 'rgba(255,255,255,0.04)'
          : 'rgba(255,255,255,0.025)',
        border: `1px solid ${
          locked ? 'rgba(255,255,255,0.05)' :
          isSelected ? 'rgba(245,166,35,0.5)' :
          solved ? 'rgba(122,191,106,0.3)' :
          isNext ? 'rgba(245,166,35,0.22)' :
          'rgba(255,255,255,0.08)'
        }`,
        boxShadow: isSelected
          ? '0 0 28px rgba(245,166,35,0.12)'
          : solved
          ? '0 0 16px rgba(122,191,106,0.06)'
          : isNext && !locked
          ? '0 0 20px rgba(245,166,35,0.08)'
          : 'none',
        cursor: locked ? 'not-allowed' : 'pointer',
        opacity: locked ? 0.4 : 1,
        padding: 0,
      }}
      onClick={onClick}
      onDoubleClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={locked ? 'Complete previous cases to unlock' : `Double-click to open ${level.title}`}
    >
      {/* Thumbtack */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10" style={{ width: 10, height: 10 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: solved ? '#7ABF6A' : isNext ? '#F5A623' : '#444', boxShadow: solved ? '0 0 8px rgba(122,191,106,0.6)' : isNext ? '0 0 8px rgba(245,166,35,0.5)' : 'none' }} />
      </div>

      <div style={{ padding: '20px 18px 16px' }}>
        {/* Case number + type */}
        <div className="flex items-center justify-between mb-3">
          <div className="font-detective" style={{ color: accentColor, fontSize: '0.55rem', letterSpacing: '0.28em', opacity: locked ? 0.5 : 0.8 }}>
            CASE {String(level.id).padStart(2, '0')}
          </div>
          <div
            className="font-detective px-2 py-0.5"
            style={{
              background: `${diffColor}14`,
              border: `1px solid ${diffColor}30`,
              color: diffColor,
              fontSize: '0.48rem',
              letterSpacing: '0.15em',
              opacity: locked ? 0.4 : 1,
            }}
          >
            {t(DIFFICULTY_LABEL_KEYS[level.difficulty])}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-detective text-base mb-1" style={{ color: locked ? 'rgba(255,255,255,0.2)' : 'var(--text-primary)', letterSpacing: '0.04em', lineHeight: 1.3 }}>
          {level.title}
        </h3>
        <p className="font-serif italic text-xs mb-3" style={{ color: 'var(--text-muted)', opacity: locked ? 0.3 : 0.7, fontSize: '0.7rem', lineHeight: 1.5 }}>
          {level.subtitle}
        </p>

        {/* Victim */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">{locked ? '❓' : level.victim.emoji}</span>
          <div>
            <div className="font-detective" style={{ color: locked ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
              {locked ? t('victimUnknown') : level.victim.name.toUpperCase()}
            </div>
            <div className="font-detective" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.52rem', letterSpacing: '0.08em' }}>
              {locked ? '— — —' : `${level.victim.age} · ${level.investigationLabel}`}
            </div>
          </div>
        </div>

        {/* Status strip */}
        <div
          style={{
            borderTop: `1px solid rgba(255,255,255,0.05)`,
            paddingTop: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div className="font-detective" style={{ color: accentColor, fontSize: '0.58rem', letterSpacing: '0.18em' }}>
            {locked ? t('caseLockedStatus') : solved ? t('caseSolvedStatus') : isNext ? t('caseActive') : t('casePending')}
          </div>
          {!locked && (
            <div className="font-detective" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.52rem', letterSpacing: '0.1em' }}>
              {level.clues.length} CLUES
            </div>
          )}
        </div>
      </div>

      {/* CLOSED stamp */}
      {solved && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: 'rotate(-12deg)' }}
        >
          <div
            className="font-detective text-sm px-4 py-1.5"
            style={{
              border: '2px solid rgba(122,191,106,0.35)',
              color: 'rgba(122,191,106,0.35)',
              letterSpacing: '0.4em',
              fontSize: '0.65rem',
            }}
          >
            CLOSED
          </div>
        </div>
      )}
    </button>
  );
}
