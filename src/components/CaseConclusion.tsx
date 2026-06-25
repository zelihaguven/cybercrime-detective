import { useState, useEffect, useRef } from 'react';
import type { Level, Detective } from '../types/game';
import DialogueBox from './DialogueBox';
import { getDetectiveAvatarEmoji, getRank, getRankProgress, getRankColor } from '../utils/detective';
import { OUTFIT_ACCENT_COLORS } from './CharacterSVG';
import CharacterSVG from './CharacterSVG';
import { useLanguage } from '../contexts/LanguageContext';
import { getBadge } from '../data/badges';

interface Props {
  level: Level;
  detective: Detective;
  correct: boolean;
  xpEarned: number;
  specialtyBonus: number;
  newBadges: string[];
  discoveredCount: number;
  onComplete: () => void;
  onRetry: () => void;
}

type Phase = 'results' | 'dialogue' | 'done';

export default function CaseConclusion({ level, detective, correct, xpEarned, specialtyBonus, newBadges, discoveredCount, onComplete, onRetry }: Props) {
  const { t, lang } = useLanguage();
  const [phase, setPhase] = useState<Phase>('results');
  const [stampVisible, setStampVisible] = useState(false);
  const [displayXP, setDisplayXP] = useState(0);
  const [mounted, setMounted] = useState(false);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 80);
    const t2 = setTimeout(() => setStampVisible(true), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // XP count-up animation — starts right away when mounted
  useEffect(() => {
    if (!correct || !mounted) return;
    const start = Date.now();
    const duration = 1200;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayXP(Math.round(eased * xpEarned));
      if (progress < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current !== null) cancelAnimationFrame(animRef.current); };
  }, [correct, mounted, xpEarned]);

  const avatarEmoji = getDetectiveAvatarEmoji(detective.avatar);
  const avatarColor = OUTFIT_ACCENT_COLORS[detective.appearance?.outfitColor ?? detective.avatar] ?? '#F5A623';
  const newXP = detective.xp + (correct ? xpEarned : 0);
  const newRank = getRank(newXP);
  const rankChanged = newRank !== detective.rank;
  const { progress: newProgress } = getRankProgress(newXP);
  const newRankColor = getRankColor(newRank);

  // ── Dialogue phase ──────────────────────────────────────────────
  if (phase === 'dialogue') {
    return (
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(20,14,30,0.9) 0%, #07050C 65%)' }}>
        <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="absolute top-6 left-8 font-detective text-xs" style={{ color: 'rgba(245,166,35,0.4)', letterSpacing: '0.3em', fontSize: '0.6rem' }}>
          {t('caseLabel')} {String(level.id).padStart(2, '0')} · {t('debrief')}
        </div>
        <DialogueBox
          lines={level.conclusionDialogue}
          detectiveName={detective.name}
          detectiveEmoji={avatarEmoji}
          detectiveAppearance={detective.appearance}
          onComplete={() => setPhase('done')}
        />
      </div>
    );
  }

  // ── Done phase ──────────────────────────────────────────────────
  if (phase === 'done') {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(20,14,30,0.85) 0%, #07050C 65%)' }}>
        <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 text-center">
          <div className="font-detective text-4xl mb-2" style={{ color: correct ? '#7ABF6A' : '#E05A47', letterSpacing: '0.15em' }}>
            {correct ? t('conclusionCaseClosed') : t('conclusionIncorrect')}
          </div>
          <p className="font-serif italic text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            {correct ? t('conclusionFiled') : t('conclusionRetryMsg')}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onComplete}
              className="font-detective text-sm tracking-widest uppercase px-8 py-3 transition-all duration-300"
              style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.5)', color: 'var(--accent)', letterSpacing: '0.25em' }}
            >
              {t('returnToOfficeConclusion')}
            </button>
            {!correct && (
              <button
                onClick={onRetry}
                className="font-detective text-sm tracking-widest uppercase px-8 py-3 transition-all duration-300"
                style={{ background: 'rgba(224,90,71,0.08)', border: '1px solid rgba(224,90,71,0.4)', color: 'var(--danger)', letterSpacing: '0.25em' }}
              >
                {t('conclusionReinvestigate')}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Results phase (default) ─────────────────────────────────────
  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(20,14,30,0.85) 0%, #07050C 65%)',
        opacity: mounted ? 1 : 0,
      }}
    >
      <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 space-y-5">

        {/* ── Verdict stamp ── */}
        <div className="text-center">
          <div
            className="inline-block font-detective text-3xl px-10 py-3.5 transition-all duration-500"
            style={{
              border: `2px solid ${correct ? 'rgba(122,191,106,0.55)' : 'rgba(224,90,71,0.55)'}`,
              color: correct ? 'rgba(122,191,106,0.8)' : 'rgba(224,90,71,0.8)',
              letterSpacing: '0.35em',
              opacity: stampVisible ? 1 : 0,
              transform: stampVisible ? 'scale(1) rotate(-5deg)' : 'scale(1.3) rotate(-5deg)',
            }}
          >
            {correct ? t('caseClosed') : t('wrongCall')}
          </div>
          {correct && (
            <p className="mt-2 font-detective text-xs" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', fontSize: '0.6rem' }}>
              {level.caseType.toUpperCase()}
            </p>
          )}
        </div>

        {/* ── Main card ── */}
        {correct ? (
          <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', padding: '24px' }}>
            {/* Top: avatar + XP */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                {detective.photo
                  ? <img src={`/characters/${detective.photo}.png`} alt={detective.name} style={{ width: 48, height: 60, objectFit: 'contain', objectPosition: 'bottom' }} />
                  : detective.appearance
                    ? <CharacterSVG appearance={detective.appearance} size={48}/>
                    : <span className="text-3xl">{avatarEmoji}</span>}
                <div>
                  <div className="font-detective text-sm" style={{ color: 'var(--text-primary)' }}>Det. {detective.name}</div>
                  <div className="font-detective text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem', letterSpacing: '0.12em' }}>{t('investigationComplete')}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-detective" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.52rem', letterSpacing: '0.2em', marginBottom: 2 }}>{t('xpEarned')}</div>
                <div className="font-detective text-3xl" style={{ color: avatarColor, letterSpacing: '0.04em' }}>
                  +{displayXP}
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className={`grid gap-3 mb-5 ${specialtyBonus > 0 ? 'grid-cols-4' : 'grid-cols-3'}`}>
              {[
                { label: t('verdictLabel'), value: t('verdictCorrect'), color: '#7ABF6A' },
                { label: t('cluesFound'), value: `${discoveredCount} / ${level.clues.length + level.bonusClues.length}`, color: '#F5A623' },
                { label: t('attackTypeLabel'), value: level.caseType, color: 'rgba(255,255,255,0.55)' },
                ...(specialtyBonus > 0 ? [{ label: lang === 'de' ? 'FACHBONUS' : 'SPECIALTY', value: `+${specialtyBonus} XP`, color: '#B98FD4' }] : []),
              ].map(({ label, value, color }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px 12px', textAlign: 'center' }}>
                  <div className="font-detective" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.5rem', letterSpacing: '0.18em', marginBottom: 4 }}>{label}</div>
                  <div className="font-detective text-xs" style={{ color, fontSize: '0.65rem', letterSpacing: '0.08em', lineHeight: 1.4 }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Rank progress */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-detective" style={{ color: newRankColor, fontSize: '0.62rem', letterSpacing: '0.12em' }}>{newRank}</span>
                  {rankChanged && (
                    <span className="font-detective px-1.5 py-0.5" style={{ background: `${newRankColor}20`, border: `1px solid ${newRankColor}40`, color: newRankColor, fontSize: '0.5rem', letterSpacing: '0.15em' }}>
                      {t('rankUpLabel')}
                    </span>
                  )}
                </div>
                <span className="font-detective" style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.58rem' }}>{newXP} {t('xpTotal')}</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2 }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(newProgress * 100, 100)}%`,
                    background: `linear-gradient(90deg, ${newRankColor}80, ${newRankColor})`,
                    boxShadow: `0 0 10px ${newRankColor}50`,
                    borderRadius: 2,
                    transition: 'width 1.2s ease 0.4s',
                  }}
                />
              </div>
            </div>

            {/* New badges */}
            {newBadges.length > 0 && (
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="font-detective mb-2" style={{ color: 'rgba(245,166,35,0.45)', fontSize: '0.52rem', letterSpacing: '0.25em' }}>
                  {lang === 'de' ? 'ABZEICHEN VERDIENT' : 'BADGES EARNED'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {newBadges.map((id) => {
                    const badge = getBadge(id);
                    if (!badge) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-1.5 px-2.5 py-1.5"
                        style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.35)' }}
                      >
                        <span style={{ fontSize: '0.9rem' }}>{badge.icon}</span>
                        <span className="font-detective" style={{ color: 'var(--accent)', fontSize: '0.6rem', letterSpacing: '0.08em' }}>
                          {badge.name[lang as 'en' | 'de'] ?? badge.name.en}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Wrong answer card */
          <div style={{ background: 'rgba(224,90,71,0.04)', border: '1px solid rgba(224,90,71,0.18)', padding: '20px' }}>
            <div className="font-detective text-xs mb-3" style={{ color: 'rgba(224,90,71,0.6)', letterSpacing: '0.22em', fontSize: '0.6rem' }}>{t('detectiveNotesLabel')}</div>
            <p className="font-serif italic text-sm" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.85 }}>
              {level.failureOutcome}
            </p>
          </div>
        )}

        {/* ── Action buttons ── */}
        <div className="flex gap-3">
          {correct ? (
            <>
              <button
                onClick={() => setPhase('dialogue')}
                className="flex-1 font-detective text-sm tracking-widest uppercase py-3.5 transition-all duration-300"
                style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.5)', color: 'var(--accent)', letterSpacing: '0.22em', boxShadow: '0 0 24px rgba(245,166,35,0.1)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(245,166,35,0.16)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(245,166,35,0.1)')}
              >
                {t('debriefWithTeam')}
              </button>
              <button
                onClick={onComplete}
                className="font-detective text-xs tracking-widest uppercase px-5 py-3 transition-all duration-200"
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', fontSize: '0.62rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                {t('skipToOffice')}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onRetry}
                className="flex-1 font-detective text-sm tracking-widest uppercase py-3.5 transition-all duration-300"
                style={{ background: 'rgba(224,90,71,0.08)', border: '1px solid rgba(224,90,71,0.4)', color: 'var(--danger)', letterSpacing: '0.22em' }}
              >
                {t('reinvestigate')}
              </button>
              <button
                onClick={onComplete}
                className="font-detective text-xs tracking-widest uppercase px-5 py-3 transition-all duration-200"
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', fontSize: '0.62rem' }}
              >
                {t('abandonCase')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
