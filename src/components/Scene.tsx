import { useState, useEffect } from 'react';
import type { Clue, Level, Detective } from '../types/game';
import type { UIKey } from '../i18n/ui';
import { getDetectiveAvatarEmoji } from '../utils/detective';
import { AVATAR_COLORS } from '../data/characters';
import { useIsMobile, useIsLandscape } from '../utils/responsive';
import { useLanguage } from '../contexts/LanguageContext';
import TutorialOverlay, { hasTutorialBeenSeen } from './TutorialOverlay';
import TermText from './TermText';
import KitchenScene from './KitchenScene';
import GamingRoomScene from './GamingRoomScene';
import PriyaHomeOfficeScene from './PriyaHomeOfficeScene';
import CafeOfficeScene from './CafeOfficeScene';
import SchoolITRoomScene from './SchoolITRoomScene';
import TechCorpOfficeScene from './TechCorpOfficeScene';

interface Props {
  level: Level;
  discoveredClues: string[];
  detective?: Detective | null;
  onClueDiscovered: (clue: Clue) => void;
  onOpenBoard: () => void;
  onOpenHandbook: () => void;
  onAccuse: () => void;
  onExit?: () => void;
}

export default function Scene({ level, discoveredClues, detective, onClueDiscovered, onOpenBoard, onOpenHandbook, onAccuse, onExit }: Props) {
  const isMobile = useIsMobile();
  const isLandscape = useIsLandscape();
  const { t } = useLanguage();
  const [activeClue, setActiveClue] = useState<Clue | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [showHint, setShowHint] = useState(() => {
    try { return localStorage.getItem('ciu-scene-hint-v1') !== 'true'; }
    catch { return true; }
  });
  const [newPin, setNewPin] = useState<string | null>(null);
  const [detectiveComment, setDetectiveComment] = useState<string | null>(null);
  const [showMemo, setShowMemo] = useState(true);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showTutorial, setShowTutorial] = useState(() => level.id === 1 && !hasTutorialBeenSeen());

  const allClues = [...level.clues, ...level.bonusClues];
  const found = discoveredClues.length;
  const required = level.clues.length;

  const dismissHint = () => {
    setShowHint(false);
    try { localStorage.setItem('ciu-scene-hint-v1', 'true'); } catch {}
  };

  useEffect(() => {
    if (!showHint) return;
    const t1 = setTimeout(dismissHint, 3500);
    const t2 = setTimeout(() => setShowMemo(false), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [showHint]);

  const handleClueClick = (clue: Clue) => {
    setActiveClue(clue);
    setZoomed(true);
    if (!discoveredClues.includes(clue.id)) {
      onClueDiscovered(clue);
      setNewPin(clue.id);
      setTimeout(() => setNewPin(null), 2500);
      if (clue.detectiveComment) {
        setDetectiveComment(clue.detectiveComment);
        setTimeout(() => setDetectiveComment(null), 5000);
      }
    }
  };

  const handleClose = () => {
    setActiveClue(null);
    setZoomed(false);
  };

  const avatarEmoji = detective ? getDetectiveAvatarEmoji(detective.avatar) : '🕵️';
  const avatarColor = detective ? (AVATAR_COLORS[detective.avatar] ?? '#F5A623') : '#F5A623';

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0A0806' }}>
      {/* Scene background */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          transform: zoomed ? 'scale(1.06)' : 'scale(1)',
          filter: zoomed ? 'blur(2px) brightness(0.6)' : 'brightness(1)',
          transformOrigin: activeClue ? `${activeClue.x}% ${activeClue.y}%` : 'center center',
        }}
      >
        {level.id === 1 && <KitchenScene />}
        {level.id === 2 && <GamingRoomScene />}
        {level.id === 3 && <PriyaHomeOfficeScene />}
        {level.id === 4 && <CafeOfficeScene />}
        {level.id === 5 && <SchoolITRoomScene />}
        {level.id === 6 && <TechCorpOfficeScene />}

        <AtmosphericParticles />
        <div className="vignette" />
        <div className="scanlines" />
        <div className="noise-overlay" />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 22% 45%, rgba(255,230,160,0.06) 0%, transparent 55%)' }}
        />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          style={{ pointerEvents: 'none' }}
        >
          {allClues.map((clue) => (
            <SVGHotspot
              key={clue.id}
              clue={clue}
              discovered={discoveredClues.includes(clue.id)}
              onClick={handleClueClick}
              isMobile={isMobile}
            />
          ))}
        </svg>
      </div>

      {/* HUD */}
      <HUD
        level={level}
        found={found}
        required={required}
        detective={detective}
        onOpenBoard={onOpenBoard}
        onOpenHandbook={onOpenHandbook}
        onAccuse={onAccuse}
        onExitRequest={onExit ? () => setShowExitConfirm(true) : undefined}
        showHint={showHint}
        onDismissHint={dismissHint}
        newPin={newPin}
        isMobile={isMobile}
        isLandscape={isLandscape}
        t={t}
      />

      {/* Exit confirmation */}
      {showExitConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(4,3,2,0.88)' }}>
          <div style={{ background: '#14100A', border: '1px solid rgba(245,166,35,0.3)', padding: '28px 28px 24px', maxWidth: 360, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
            <div className="font-detective text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(245,166,35,0.5)', fontSize: '0.58rem' }}>
              {t('leaveInvestigation')}
            </div>
            <p className="font-serif italic text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              {t('leaveWarning')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 font-detective text-xs tracking-widest uppercase py-2.5 transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', background: 'transparent', letterSpacing: '0.15em' }}
              >
                {t('keepGoing')}
              </button>
              <button
                onClick={onExit}
                className="flex-1 font-detective text-xs tracking-widest uppercase py-2.5 transition-all duration-200"
                style={{ border: '1px solid rgba(224,90,71,0.5)', color: 'var(--danger)', background: 'rgba(224,90,71,0.06)', letterSpacing: '0.15em' }}
              >
                {t('returnToOfficeBtn')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detective memo (first impression on entering scene) */}
      {!isMobile && showMemo && level.detectiveMemo && (
        <div
          className="absolute pointer-events-none z-30 fade-in"
          style={{
            bottom: 80,
            left: 24,
            right: 24,
            maxWidth: 480,
            background: `${avatarColor}0A`,
            border: `1px solid ${avatarColor}25`,
            padding: '12px 16px',
            opacity: showMemo ? 1 : 0,
            transition: 'opacity 1.2s ease',
          }}
        >
          <div className="flex items-start gap-2.5">
            <span className="text-lg flex-shrink-0">{avatarEmoji}</span>
            <div>
              <div className="font-detective" style={{ color: avatarColor, fontSize: '0.55rem', letterSpacing: '0.2em', opacity: 0.65, marginBottom: 3 }}>
                {detective ? `DET. ${detective.name.toUpperCase()} · ${t('sceneInitialObs')}` : `DETECTIVE · ${t('sceneInitialObs')}`}
              </div>
              <p className="font-serif italic text-xs" style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontSize: '0.75rem' }}>
                "{level.detectiveMemo}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Detective commentary (appears when clue discovered) */}
      {!isMobile && detectiveComment && !activeClue && (
        <div
          className="absolute z-40 fade-in pointer-events-none"
          style={{
            bottom: 80,
            left: 24,
            maxWidth: 400,
            background: `${avatarColor}0C`,
            border: `1px solid ${avatarColor}28`,
            padding: '10px 14px',
          }}
        >
          <div className="flex items-start gap-2">
            <span className="text-base flex-shrink-0">{avatarEmoji}</span>
            <p className="font-serif italic text-xs" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontSize: '0.74rem' }}>
              "{detectiveComment}"
            </p>
          </div>
        </div>
      )}

      {/* Clue card */}
      {activeClue && (
        <ClueCard
          clue={activeClue}
          onClose={handleClose}
          isNew={newPin === activeClue.id}
          detective={detective}
          isMobile={isMobile}
        />
      )}

      {/* First-time tutorial (level 1 only) */}
      {showTutorial && !activeClue && !showExitConfirm && (
        <TutorialOverlay onDone={() => setShowTutorial(false)} />
      )}
    </div>
  );
}

const SVG_W = 1440;
const SVG_H = 900;

function SVGHotspot({ clue, discovered, onClick, isMobile }: { clue: Clue; discovered: boolean; onClick: (c: Clue) => void; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  // Convert percentage clue coordinates to SVG viewBox units so the browser
  // handles xMidYMid slice transforms automatically (fixes mobile position drift)
  const cx = (clue.x / 100) * SVG_W;
  const cy = (clue.y / 100) * SVG_H;
  const hwBase = ((clue.hitW ?? 6) / 100) * SVG_W;
  const hhBase = ((clue.hitH ?? 8) / 100) * SVG_H;
  const hw = isMobile ? hwBase * 1.35 : hwBase;
  const hh = isMobile ? hhBase * 1.35 : hhBase;

  const r = hovered ? (isMobile ? 24 : 14) : (isMobile ? 18 : 8);
  // Bug 2: 40% opacity at idle for all devices (was 0 on desktop)
  const opacity = hovered ? 1 : 0.4;
  const fill = discovered ? 'rgba(122,191,106,0.9)' : 'rgba(245,166,35,1)';
  const glowFull = discovered ? 'rgba(122,191,106,0.8)' : 'rgba(245,166,35,0.8)';
  const glowIdle = discovered ? 'rgba(122,191,106,0.3)' : 'rgba(245,166,35,0.3)';

  return (
    <g
      style={{ cursor: 'pointer', pointerEvents: 'all' }}
      onClick={() => onClick(clue)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Invisible hit area */}
      <rect
        x={cx - hw / 2}
        y={cy - hh / 2}
        width={hw}
        height={hh}
        fill="transparent"
      />
      {/* Visual indicator dot */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        opacity={opacity}
        style={{
          transition: 'opacity 0.3s',
          filter: hovered
            ? `drop-shadow(0 0 ${isMobile ? 12 : 8}px ${glowFull})`
            : isMobile
              ? `drop-shadow(0 0 5px ${glowIdle})`
              : 'none',
        }}
      />
      {/* Desktop hover label */}
      {hovered && !isMobile && (
        <foreignObject
          x={cx - 250}
          y={cy - hhBase / 2 - 52}
          width={500}
          height={40}
          overflow="visible"
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              background: 'rgba(10,8,6,0.92)',
              border: '1px solid rgba(245,166,35,0.4)',
              color: '#F5A623',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              padding: '4px 12px',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
              fontFamily: '"Special Elite", serif',
            }}
          >
            {discovered && <span style={{ color: '#7ABF6A' }}>✓ </span>}
            {clue.label}
          </div>
        </foreignObject>
      )}
    </g>
  );
}

function HUD({
  level, found, required, detective, onOpenBoard, onOpenHandbook, onAccuse, onExitRequest, showHint, onDismissHint, newPin, isMobile, isLandscape, t,
}: {
  level: Level; found: number; required: number; detective?: Detective | null;
  onOpenBoard: () => void; onOpenHandbook: () => void; onAccuse: () => void;
  onExitRequest?: () => void;
  showHint: boolean; onDismissHint: () => void; newPin: string | null; isMobile: boolean; isLandscape: boolean;
  t: (key: UIKey) => string;
}) {
  const canAccuse = found >= required;

  return (
    <>
      {/* Top gradient — visual only, passes through taps */}
      <div
        className="absolute top-0 left-0 right-0 z-29 pointer-events-none"
        style={{ height: isMobile ? 70 : 100, background: 'linear-gradient(to bottom, rgba(10,8,6,0.9) 0%, transparent 100%)' }}
      />
      {/* Top bar content */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between"
        style={{
          padding: isLandscape ? '4px 10px' : isMobile ? '8px 12px' : '16px 24px',
          pointerEvents: 'none',
        }}
      >
        <div className="flex items-start gap-3">
          {onExitRequest && (
            <button
              onClick={onExitRequest}
              className="font-detective text-xs tracking-widest uppercase flex-shrink-0 transition-all duration-200"
              style={{
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.18em',
                fontSize: isMobile ? '0.55rem' : '0.6rem',
                marginTop: isMobile ? 1 : 3,
                padding: '2px 0',
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(224,90,71,0.8)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >
              ← {isMobile ? '' : 'OFFICE'}
            </button>
          )}
          <div style={{ pointerEvents: 'none' }}>
            {!isMobile && detective && (
              <div className="font-detective text-xs mb-0.5" style={{ color: 'rgba(245,166,35,0.45)', letterSpacing: '0.2em', fontSize: '0.58rem' }}>
                Det. {detective.name} · {level.investigationLabel}
              </div>
            )}
            <div className="font-detective text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--accent)', opacity: detective ? 0.85 : 0.7, fontSize: isMobile ? '0.6rem' : undefined }}>
              Case {String(level.id).padStart(2, '0')} — {level.title}
            </div>
            {!isMobile && (
              <div className="font-serif italic text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Victim: {level.victim.name}, {level.victim.age}
              </div>
            )}
          </div>
        </div>

        {/* Clue indicator */}
        {isMobile ? (
          <span className="font-detective text-xs" style={{ color: 'var(--accent)', opacity: 0.8, fontSize: '0.7rem', pointerEvents: 'none' }}>
            {found}/{required}
          </span>
        ) : (
          <div className="flex items-center gap-2" style={{ pointerEvents: 'none' }}>
            {Array.from({ length: required }).map((_, i) => (
              <div key={i} className="transition-all duration-500" style={{ width: 10, height: 10, borderRadius: '50%', background: i < found ? 'var(--accent)' : 'rgba(245,166,35,0.2)', boxShadow: i < found ? '0 0 8px rgba(245,166,35,0.6)' : 'none' }} />
            ))}
            <span className="font-detective text-xs ml-2 tracking-widest" style={{ color: 'var(--text-muted)' }}>
              {found}/{required} {t('sceneCluesHUD')}
            </span>
          </div>
        )}
      </div>

      {/* Bottom gradient — visual only, passes through taps */}
      <div
        className="absolute bottom-0 left-0 right-0 z-29 pointer-events-none"
        style={{ height: isMobile ? 70 : 100, background: 'linear-gradient(to top, rgba(10,8,6,0.95) 0%, transparent 100%)' }}
      />
      {/* Bottom bar content */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between"
        style={{
          padding: isLandscape ? '4px 10px' : isMobile ? '8px 12px' : '16px 24px',
          pointerEvents: 'none',
        }}
      >
        {!isMobile && (
          <div className="font-detective text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)', opacity: 0.5, pointerEvents: 'none' }}>
            {level.location}
          </div>
        )}
        <div className={`flex items-center gap-2 ${isMobile ? 'w-full justify-end' : ''}`} style={{ pointerEvents: 'none' }}>
          <HudButton onClick={onOpenHandbook} label={t('handbook')} icon="📓" isMobile={isMobile || isLandscape} />
          <HudButton onClick={onOpenBoard} label={t('evidenceBoard')} icon="📌" highlight={!!newPin} isMobile={isMobile || isLandscape} />
          {canAccuse && <HudButton onClick={onAccuse} label={t('makeAccusation')} icon="⚖" danger isMobile={isMobile || isLandscape} />}
        </div>
      </div>

      {/* Hint */}
      {showHint && (
        <div
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 text-center fade-in"
          style={{ cursor: 'pointer' }}
          onClick={onDismissHint}
        >
          <div
            className="font-detective tracking-widest uppercase"
            style={{
              color: 'rgba(245,166,35,0.92)',
              background: 'rgba(10,8,4,0.82)',
              border: '1px solid rgba(245,166,35,0.45)',
              padding: isMobile ? '10px 20px' : '12px 28px',
              letterSpacing: '0.22em',
              fontSize: isMobile ? '0.62rem' : '0.68rem',
              boxShadow: '0 0 24px rgba(245,166,35,0.12), 0 4px 20px rgba(0,0,0,0.6)',
              whiteSpace: 'nowrap',
            }}
          >
            ✦ {isMobile ? t('sceneTapHint') : t('sceneClickHint')}
          </div>
        </div>
      )}

      {/* New clue notification */}
      {newPin && (
        <div className="absolute top-20 right-6 z-40 pin-drop" style={{ background: 'rgba(10,8,6,0.95)', border: '1px solid rgba(245,166,35,0.6)', padding: isMobile ? '6px 10px' : '10px 18px', boxShadow: '0 0 30px rgba(245,166,35,0.2)' }}>
          <span className="font-detective text-xs tracking-widest uppercase" style={{ color: 'var(--accent)', fontSize: isMobile ? '0.55rem' : undefined }}>
            {t('sceneEvidencePinned')}
          </span>
        </div>
      )}
    </>
  );
}

function HudButton({ onClick, label, icon, highlight = false, danger = false, isMobile = false }: { onClick: () => void; label: string; icon: string; highlight?: boolean; danger?: boolean; isMobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`font-detective text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-1 ${highlight ? 'glow-pulse' : ''}`}
      style={{
        border: `1px solid ${danger ? hovered ? 'rgba(224,90,71,0.9)' : 'rgba(224,90,71,0.5)' : hovered ? 'rgba(245,166,35,0.8)' : 'rgba(245,166,35,0.3)'}`,
        background: danger ? hovered ? 'rgba(224,90,71,0.2)' : 'rgba(224,90,71,0.05)' : hovered ? 'rgba(245,166,35,0.1)' : 'rgba(10,8,6,0.6)',
        color: danger ? 'var(--danger)' : 'var(--accent)',
        letterSpacing: '0.15em',
        fontSize: '0.65rem',
        padding: isMobile ? '8px 10px' : '8px 16px',
        pointerEvents: 'auto',
      }}
    >
      <span style={{ fontSize: isMobile ? '1rem' : undefined }}>{icon}</span>
      {!isMobile && label}
    </button>
  );
}

function ClueCard({ clue, onClose, isNew, detective, isMobile }: { clue: Clue; onClose: () => void; isNew: boolean; detective?: Detective | null; isMobile: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);
  const { t } = useLanguage();

  const typeColor = { photo: '#7ABF6A', note: '#F5A623', screenshot: '#4A90D9', witness: '#B98FD4' }[clue.type];
  const typeLabel = { photo: t('boardPhotograph'), note: t('boardFieldNote'), screenshot: t('boardScreenshot'), witness: t('boardStatement') }[clue.type];
  const avatarEmoji = detective ? getDetectiveAvatarEmoji(detective.avatar) : null;
  const avatarColor = detective ? (AVATAR_COLORS[detective.avatar] ?? '#F5A623') : '#F5A623';

  if (isMobile) {
    return (
      <div
        className="absolute inset-0 z-50"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
        onClick={onClose}
      >
        <div className="absolute inset-0 transition-opacity duration-500" style={{ background: 'rgba(5,4,3,0.65)', opacity: visible ? 1 : 0 }} />
        <div
          style={{
            position: 'relative',
            maxHeight: '80vh',
            overflowY: 'auto',
            background: 'linear-gradient(135deg, #14100A 0%, #0E0C08 100%)',
            border: `1px solid ${typeColor}40`,
            borderRadius: '12px 12px 0 0',
            boxShadow: `0 -10px 40px rgba(0,0,0,0.8), 0 0 40px ${typeColor}15`,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${typeColor}25`, background: `${typeColor}08` }}>
            <div>
              <div className="font-detective tracking-widest uppercase mb-0.5" style={{ color: typeColor, opacity: 0.7, fontSize: '0.55rem' }}>{typeLabel}</div>
              <h3 className="font-detective" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{clue.label}</h3>
            </div>
            <div className="text-2xl">{clue.icon}</div>
          </div>

          {/* Short desc */}
          <div className="px-4 py-2.5 font-serif italic" style={{ color: 'var(--text-muted)', borderBottom: `1px solid rgba(255,255,255,0.05)`, fontSize: '0.75rem' }}>
            "{clue.shortDesc}"
          </div>

          {/* Detail */}
          <div className="px-4 py-3">
            <p className="font-sans leading-relaxed" style={{ color: 'var(--text-primary)', lineHeight: 1.75, fontSize: '0.78rem' }}>
              <TermText text={clue.detail} />
            </p>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}>
            {isNew ? (
              <span className="font-detective tracking-widest uppercase" style={{ color: 'var(--success)', fontSize: '0.55rem' }}>{t('scenePinnedMobile')}</span>
            ) : (
              <span className="font-detective tracking-widest uppercase" style={{ color: 'var(--text-muted)', opacity: 0.4, fontSize: '0.55rem' }}>{t('scenePreviousExamined')}</span>
            )}
            <button
              onClick={onClose}
              className="font-detective tracking-widest uppercase px-4 py-2 transition-all duration-200"
              style={{ border: '1px solid rgba(245,166,35,0.3)', color: 'var(--accent)', background: 'transparent', fontSize: '0.65rem' }}
            >
              {t('sceneClose')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 transition-opacity duration-500" style={{ background: 'rgba(5,4,3,0.65)', opacity: visible ? 1 : 0 }} />

      <div
        className="relative max-w-lg w-full mx-6 transition-all duration-500"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.96)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ background: 'linear-gradient(135deg, #14100A 0%, #0E0C08 100%)', border: `1px solid ${typeColor}40`, boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 40px ${typeColor}15` }}>
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${typeColor}25`, background: `${typeColor}08` }}>
            <div>
              <div className="font-detective text-xs tracking-widest uppercase mb-1" style={{ color: typeColor, opacity: 0.7 }}>{typeLabel}</div>
              <h3 className="font-detective text-lg" style={{ color: 'var(--text-primary)' }}>{clue.label}</h3>
            </div>
            <div className="text-3xl">{clue.icon}</div>
          </div>

          {/* Short desc */}
          <div className="px-6 py-3 font-serif italic text-sm" style={{ color: 'var(--text-muted)', borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
            "{clue.shortDesc}"
          </div>

          {/* Detail */}
          <div className="px-6 py-5">
            <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-primary)', lineHeight: 1.8 }}>
              <TermText text={clue.detail} />
            </p>
          </div>

          {/* Detective observation */}
          {clue.detectiveComment && (
            <div
              className="px-6 py-3 mx-6 mb-4"
              style={{
                background: `${avatarColor}08`,
                border: `1px solid ${avatarColor}20`,
              }}
            >
              <div className="flex items-start gap-2">
                {avatarEmoji && <span className="text-base flex-shrink-0">{avatarEmoji}</span>}
                <div>
                  <div className="font-detective mb-1.5" style={{ color: avatarColor, fontSize: '0.52rem', letterSpacing: '0.2em', opacity: 0.65 }}>
                    {detective ? `DET. ${detective.name.toUpperCase()}` : 'DETECTIVE'} · {t('sceneObservation')}
                  </div>
                  <p className="font-serif italic text-xs" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontSize: '0.74rem' }}>
                    "<TermText text={clue.detectiveComment} />"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-3 flex items-center justify-between" style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}>
            {isNew ? (
              <span className="font-detective text-xs tracking-widest uppercase" style={{ color: 'var(--success)' }}>{t('scenePinnedBoard')}</span>
            ) : (
              <span className="font-detective text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>{t('scenePreviousExamined')}</span>
            )}
            <button
              onClick={onClose}
              className="font-detective text-xs tracking-widest uppercase px-4 py-1.5 transition-all duration-200"
              style={{ border: '1px solid rgba(245,166,35,0.3)', color: 'var(--accent)', background: 'transparent' }}
            >
              {t('sceneClose')}
            </button>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none" style={{ borderTop: `2px solid ${typeColor}60`, borderLeft: `2px solid ${typeColor}60` }} />
        <div className="absolute top-0 right-0 w-4 h-4 pointer-events-none" style={{ borderTop: `2px solid ${typeColor}60`, borderRight: `2px solid ${typeColor}60` }} />
        <div className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none" style={{ borderBottom: `2px solid ${typeColor}60`, borderLeft: `2px solid ${typeColor}60` }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none" style={{ borderBottom: `2px solid ${typeColor}60`, borderRight: `2px solid ${typeColor}60` }} />
      </div>
    </div>
  );
}

function AtmosphericParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-5">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute particle"
          style={{
            left: `${(i * 17 + 10) % 90}%`,
            bottom: `${(i * 23 + 5) % 40}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            borderRadius: '50%',
            background: i % 4 === 0 ? 'rgba(255,230,180,0.25)' : 'rgba(255,255,255,0.1)',
            animationDuration: `${8 + (i % 5) * 2}s`,
            animationDelay: `${(i * 0.7) % 6}s`,
          }}
        />
      ))}
    </div>
  );
}
