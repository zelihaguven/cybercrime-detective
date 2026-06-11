import { useState, useEffect, useMemo } from 'react';
import type { Level } from '../types/game';
import { useIsMobile } from '../utils/responsive';

interface Props {
  level: Level;
  onSubmit: (answerId: string) => void;
  onCancel: () => void;
}

export default function AccusationScreen({ level, onSubmit, onCancel }: Props) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  // Shuffle once per mount — stable within session, different each new game
  const shuffledOptions = useMemo(
    () => [...level.accusationOptions].sort(() => Math.random() - 0.5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [level.id]
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
            — Final Deduction —
          </div>
          <h2 className={`font-detective mb-3 ${isMobile ? 'text-2xl' : 'text-4xl'}`} style={{ color: 'var(--text-primary)' }}>
            Make Your Accusation
          </h2>
          <p className="font-serif italic text-sm" style={{ color: 'var(--text-muted)', fontSize: isMobile ? '0.78rem' : undefined }}>
            Review the evidence. Choose the attack vector that best explains what happened to {level.victim.name}.
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
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className="w-full text-left px-5 py-4 transition-all duration-300"
              style={{
                background: selected === option.id ? 'rgba(245,166,35,0.1)' : 'rgba(255,255,255,0.02)',
                border: selected === option.id
                  ? '1px solid rgba(245,166,35,0.7)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: selected === option.id ? '0 0 20px rgba(245,166,35,0.15)' : 'none',
              }}
            >
              <div className="flex items-start gap-3">
                {/* Radio indicator */}
                <div
                  className="mt-0.5 flex-shrink-0 transition-all duration-300"
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    border: `2px solid ${selected === option.id ? 'rgba(245,166,35,0.8)' : 'rgba(255,255,255,0.2)'}`,
                    background: selected === option.id ? 'rgba(245,166,35,0.6)' : 'transparent',
                    boxShadow: selected === option.id ? '0 0 8px rgba(245,166,35,0.4)' : 'none',
                  }}
                />
                <div>
                  <div
                    className="font-detective text-sm mb-1"
                    style={{
                      color: selected === option.id ? 'var(--accent)' : 'var(--text-primary)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {option.label}
                  </div>
                  <p
                    className="font-sans text-xs"
                    style={{ color: 'var(--text-muted)', lineHeight: 1.6, opacity: 0.7 }}
                  >
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
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
            ← Return to Scene
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
            Submit Accusation ⚖
          </button>
        </div>
      </div>
    </div>
  );
}
