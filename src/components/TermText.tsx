import { useState, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { GLOSSARY } from '../data/glossary';
import type { Lang } from '../types/game';
import { useLanguage } from '../contexts/LanguageContext';

type Segment = { type: 'text'; text: string } | { type: 'term'; text: string; key: string };

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseTerms(text: string, lang: Lang): Segment[] {
  // Build map: lowercase pattern → glossary key
  const patternToKey = new Map<string, string>();
  const patterns: string[] = [];

  for (const [key, entry] of Object.entries(GLOSSARY)) {
    const terms = entry.matchTerms[lang] ?? entry.matchTerms.en ?? [];
    for (const term of terms) {
      const lo = term.toLowerCase();
      if (!patternToKey.has(lo)) {
        patternToKey.set(lo, key);
        patterns.push(term);
      }
    }
  }

  if (patterns.length === 0) return [{ type: 'text', text }];

  // Sort longest first to prevent partial matches consuming shorter ones
  patterns.sort((a, b) => b.length - a.length);

  const regex = new RegExp(`(${patterns.map(escapeRegex).join('|')})`, 'gi');

  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', text: text.slice(lastIndex, match.index) });
    }
    const matched = match[0];
    const key = patternToKey.get(matched.toLowerCase()) ?? matched;
    segments.push({ type: 'term', text: matched, key });
    lastIndex = match.index + matched.length;
  }
  if (lastIndex < text.length) {
    segments.push({ type: 'text', text: text.slice(lastIndex) });
  }
  return segments;
}

interface TooltipPos { x: number; y: number; above: boolean }

function TooltipCard({ termKey, pos, onClose }: { termKey: string; pos: TooltipPos; onClose: () => void }) {
  const { lang } = useLanguage();
  const entry = GLOSSARY[termKey];
  if (!entry) return null;

  const content = entry[lang as 'en' | 'de' | 'tr'] ?? entry.en;
  const TOOLTIP_W = 280;
  const TOOLTIP_H = 160; // approx

  let left = pos.x - TOOLTIP_W / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - TOOLTIP_W - 8));

  const top = pos.above ? pos.y - TOOLTIP_H - 6 : pos.y;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top,
        left,
        width: TOOLTIP_W,
        zIndex: 9999,
        background: 'linear-gradient(135deg, #1A1410 0%, #120E0A 100%)',
        border: '1px solid rgba(245,166,35,0.4)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.85), 0 0 20px rgba(245,166,35,0.08)',
        pointerEvents: 'auto',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Amber top stripe */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.7), transparent)' }} />

      {/* Header */}
      <div style={{ padding: '8px 12px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(245,166,35,0.12)' }}>
        <span className="font-detective" style={{ color: 'rgba(245,166,35,0.9)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {termKey}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px' }}
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '8px 12px 10px' }}>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.72rem', lineHeight: 1.6, fontFamily: 'sans-serif', margin: '0 0 6px 0' }}>
          {content.definition}
        </p>
        <p className="font-serif" style={{ color: 'rgba(245,166,35,0.55)', fontSize: '0.65rem', lineHeight: 1.55, fontStyle: 'italic', margin: 0 }}>
          {content.analogy}
        </p>
      </div>

      {/* Corner accents */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 8, height: 8, borderBottom: '1px solid rgba(245,166,35,0.3)', borderLeft: '1px solid rgba(245,166,35,0.3)' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderBottom: '1px solid rgba(245,166,35,0.3)', borderRight: '1px solid rgba(245,166,35,0.3)' }} />
    </div>,
    document.body
  );
}

interface Props {
  text: string;
}

export default function TermText({ text }: Props) {
  const { lang } = useLanguage();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<TooltipPos>({ x: 0, y: 0, above: false });

  const segments = useMemo(() => parseTerms(text, lang), [text, lang]);

  const close = useCallback(() => setActiveKey(null), []);

  const handleTermClick = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeKey === key) { setActiveKey(null); return; }

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const yBelow = rect.bottom + 8;
    const above = yBelow + 170 > window.innerHeight;
    setTooltipPos({ x, y: above ? rect.top - 8 : yBelow, above });
    setActiveKey(key);
  };

  // Close on outside click — added in next tick so the triggering click doesn't immediately close
  useEffect(() => {
    if (!activeKey) return;
    const handler = () => setActiveKey(null);
    const id = setTimeout(() => document.addEventListener('click', handler), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener('click', handler);
    };
  }, [activeKey]);

  const hasTerm = segments.some(s => s.type === 'term');

  if (!hasTerm) return <>{text}</>;

  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === 'text') return <span key={i}>{seg.text}</span>;
        const isActive = activeKey === seg.key;
        return (
          <span
            key={i}
            onClick={(e) => handleTermClick(seg.key, e)}
            style={{
              cursor: 'pointer',
              display: 'inline',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{
              borderBottom: '1px dotted rgba(245,166,35,0.55)',
              color: isActive ? 'rgba(245,166,35,0.95)' : 'inherit',
              transition: 'color 150ms ease',
            }}>
              {seg.text}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 13,
                height: 13,
                borderRadius: '50%',
                background: isActive ? 'rgba(245,166,35,0.9)' : 'rgba(245,166,35,0.18)',
                border: '1px solid rgba(245,166,35,0.45)',
                color: isActive ? '#0A0806' : 'rgba(245,166,35,0.8)',
                fontSize: '0.48rem',
                fontFamily: 'sans-serif',
                fontWeight: 700,
                marginLeft: 2,
                verticalAlign: 'middle',
                lineHeight: 1,
                transition: 'background 150ms ease, color 150ms ease',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              ?
            </span>
          </span>
        );
      })}
      {activeKey && (
        <TooltipCard termKey={activeKey} pos={tooltipPos} onClose={close} />
      )}
    </>
  );
}
