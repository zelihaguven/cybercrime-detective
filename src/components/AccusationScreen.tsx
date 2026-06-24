import { useState, useEffect, useRef, useMemo } from 'react';
import type { Level } from '../types/game';
import { useIsMobile } from '../utils/responsive';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  level: Level;
  onSubmit: (answerId: string) => void;
  onCancel: () => void;
}

export default function AccusationScreen({ level, onSubmit, onCancel }: Props) {
  const isMobile = useIsMobile();
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  // Shuffle once per mount — stable within session, different each new game
  const shuffledOptions = useMemo(
    () => [...level.accusationOptions].sort(() => Math.random() - 0.5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [level.id, lang]
  );

  useEffect(() => { setTimeout(() => setOpen(true), 60); }, []);

  const handleSubmit = () => {
    if (!selected) return;
    onSubmit(selected);
  };

  const handleCancel = () => {
    setOpen(false);
    setTimeout(onCancel, 500);
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center overflow-y-auto"
      style={{ background: 'rgba(4,3,2,0.92)' }}
    >
      <div
        className="relative transition-all duration-600 w-full max-w-2xl mx-6 my-4"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        {/* Header */}
        <div className={`text-center ${isMobile ? 'mb-5' : 'mb-8'}`}>
          <div className="font-detective text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--accent)', opacity: 0.7 }}>
            {t('finalDeduction')}
          </div>
          <h2 className={`font-detective mb-3 ${isMobile ? 'text-2xl' : 'text-4xl'}`} style={{ color: 'var(--text-primary)' }}>
            {t('makeYourAccusation')}
          </h2>
          <p className="font-serif italic text-sm" style={{ color: 'var(--text-muted)', fontSize: isMobile ? '0.78rem' : undefined }}>
            {t('accusationInstruction')} {level.victim.name}.
          </p>
        </div>

        {/* Victim summary */}
        <div
          className="mb-6"
          style={{
            background: 'rgba(245,166,35,0.05)',
            border: '1px solid rgba(245,166,35,0.15)',
            padding: isMobile ? '10px 12px' : '16px 20px',
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">{level.victim.emoji}</div>
            <div>
              <div className="font-detective text-sm mb-1" style={{ color: 'var(--accent)' }}>
                {level.victim.name}, {level.victim.age}
              </div>
              <p className="font-sans text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {level.victim.description}
              </p>
              <p className="font-serif italic text-xs mt-2" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                {level.briefing}
              </p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {shuffledOptions.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              selected={selected === option.id}
              onSelect={() => setSelected(option.id)}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-between">
          <button
            onClick={handleCancel}
            className="font-detective text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-muted)',
              background: 'transparent',
              letterSpacing: '0.15em',
            }}
          >
            {t('returnToScene')}
          </button>

          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="font-detective text-xs tracking-widest uppercase px-8 py-3 transition-all duration-300"
            style={{
              border: selected ? '1px solid rgba(245,166,35,0.8)' : '1px solid rgba(245,166,35,0.2)',
              color: selected ? 'var(--accent)' : 'rgba(245,166,35,0.3)',
              background: selected ? 'rgba(245,166,35,0.12)' : 'transparent',
              boxShadow: selected ? '0 0 20px rgba(245,166,35,0.15)' : 'none',
              letterSpacing: '0.2em',
              cursor: selected ? 'pointer' : 'not-allowed',
              opacity: 1,
            }}
          >
            {t('submitAccusation')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── OptionCard with expandable description + term tooltip ──
function OptionCard({
  option,
  selected,
  onSelect,
  isMobile,
}: {
  option: { id: string; label: string; description: string; tooltip?: string };
  selected: boolean;
  onSelect: () => void;
  isMobile: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showDesc = isMobile ? expanded : (hovered || selected);

  // Close tooltip when clicking outside (mobile)
  useEffect(() => {
    if (!tooltipOpen) return;
    function handleClick(e: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setTooltipOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [tooltipOpen]);

  return (
    <div
      className="relative w-full text-left transition-all duration-300"
      style={{
        background: selected ? 'rgba(245,166,35,0.1)' : 'rgba(255,255,255,0.02)',
        border: selected
          ? '1px solid rgba(245,166,35,0.7)'
          : '1px solid rgba(255,255,255,0.08)',
        boxShadow: selected ? '0 0 20px rgba(245,166,35,0.12)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); if (!isMobile) setTooltipOpen(false); }}
    >
      <button
        onClick={onSelect}
        className="w-full text-left px-5 py-4 flex items-start gap-3"
      >
        {/* Radio */}
        <div
          className="mt-0.5 flex-shrink-0 transition-all duration-300"
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            border: `2px solid ${selected ? 'rgba(245,166,35,0.8)' : 'rgba(255,255,255,0.2)'}`,
            background: selected ? 'rgba(245,166,35,0.6)' : 'transparent',
            boxShadow: selected ? '0 0 8px rgba(245,166,35,0.4)' : 'none',
          }}
        />
        <div className="flex-1 min-w-0">
          {/* Label row */}
          <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: showDesc ? 6 : 0 }}>
            <span
              className="font-detective"
              style={{
                color: selected ? 'var(--accent)' : 'var(--text-primary)',
                fontSize: isMobile ? '0.82rem' : '0.85rem',
                letterSpacing: '0.05em',
              }}
            >
              {option.label}
            </span>

            {/* ? tooltip badge */}
            {option.tooltip && (
              <div ref={tooltipRef} className="relative flex-shrink-0" style={{ display: 'inline-flex' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setTooltipOpen((v) => !v); }}
                  onMouseEnter={() => { if (!isMobile) setTooltipOpen(true); }}
                  onMouseLeave={() => { if (!isMobile) setTooltipOpen(false); }}
                  className="flex items-center justify-center font-detective transition-all duration-150"
                  style={{
                    width: 17,
                    height: 17,
                    borderRadius: '50%',
                    border: `1px solid ${tooltipOpen ? 'rgba(245,166,35,0.7)' : 'rgba(255,255,255,0.22)'}`,
                    color: tooltipOpen ? 'rgba(245,166,35,1)' : 'rgba(255,255,255,0.4)',
                    fontSize: '0.6rem',
                    background: tooltipOpen ? 'rgba(245,166,35,0.1)' : 'transparent',
                    lineHeight: 1,
                  }}
                >
                  ?
                </button>

                {/* Tooltip bubble */}
                {tooltipOpen && (
                  <div
                    className="absolute z-50 font-sans"
                    style={{
                      bottom: 'calc(100% + 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      minWidth: 220,
                      maxWidth: 300,
                      background: '#1a1208',
                      border: '1px solid rgba(245,166,35,0.35)',
                      padding: '10px 12px',
                      color: 'rgba(255,255,255,0.82)',
                      fontSize: '0.72rem',
                      lineHeight: 1.6,
                      boxShadow: '0 4px 24px rgba(0,0,0,0.7)',
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Arrow */}
                    <div style={{
                      position: 'absolute',
                      bottom: -5,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 8,
                      height: 8,
                      background: '#1a1208',
                      border: '1px solid rgba(245,166,35,0.35)',
                      borderTop: 'none',
                      borderLeft: 'none',
                      rotate: '45deg',
                    }} />
                    {option.tooltip}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <p
            className="font-sans transition-all duration-200"
            style={{
              color: selected ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
              fontSize: isMobile ? '0.75rem' : '0.78rem',
              maxHeight: showDesc ? '8rem' : (isMobile ? 0 : '8rem'),
              overflow: 'hidden',
              opacity: showDesc ? 1 : (isMobile ? 0 : 0.5),
              marginTop: isMobile && !showDesc ? 0 : 4,
            }}
          >
            {option.description}
          </p>
        </div>
      </button>

      {/* Mobile: ℹ button to expand description */}
      {isMobile && (
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
          className="absolute top-3 right-3 font-detective flex items-center justify-center transition-all duration-200"
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            border: `1px solid ${expanded ? 'rgba(245,166,35,0.6)' : 'rgba(255,255,255,0.15)'}`,
            color: expanded ? 'rgba(245,166,35,0.9)' : 'rgba(255,255,255,0.3)',
            fontSize: '0.6rem',
            background: expanded ? 'rgba(245,166,35,0.08)' : 'transparent',
          }}
        >
          ℹ
        </button>
      )}
    </div>
  );
}
