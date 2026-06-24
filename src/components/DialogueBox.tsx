import { useState, useEffect, useCallback } from 'react';
import { CHARACTERS } from '../data/characters';
import type { CharacterAppearance, DialogueLine } from '../types/game';
import CharacterSVG from './CharacterSVG';
import { useIsMobile } from '../utils/responsive';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  lines: DialogueLine[];
  detectiveName?: string;
  detectiveEmoji?: string;
  detectiveAppearance?: CharacterAppearance;
  onComplete: () => void;
  onLineChange?: (lineIndex: number) => void;
}

export default function DialogueBox({ lines, detectiveName, detectiveEmoji, detectiveAppearance, onComplete, onLineChange }: Props) {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [mounted, setMounted] = useState(false);

  const currentLine = lines[lineIndex];
  const fullText = currentLine.text.replace(/{detective}/g, detectiveName ?? 'Detective');

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  useEffect(() => {
    setCharIndex(0);
    setIsTyping(true);
    onLineChange?.(lineIndex);
  }, [lineIndex]);

  useEffect(() => {
    if (!isTyping) return;
    if (charIndex >= fullText.length) { setIsTyping(false); return; }
    const speed = currentLine.characterId === 'narrator' ? 28 : 18;
    const t = setTimeout(() => setCharIndex((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [charIndex, isTyping, fullText, currentLine.characterId]);

  const advance = useCallback(() => {
    if (isTyping) {
      setCharIndex(fullText.length);
      setIsTyping(false);
    } else if (lineIndex < lines.length - 1) {
      setLineIndex((l) => l + 1);
    } else {
      onComplete();
    }
  }, [isTyping, lineIndex, lines.length, fullText.length, onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); advance(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [advance]);

  const charId = currentLine.characterId;
  const charDef = CHARACTERS[charId] ?? CHARACTERS.narrator;
  const isNarrator = charId === 'narrator';
  const isDetective = charId === 'detective';
  const displayEmoji = isDetective ? (detectiveEmoji ?? '🕵️') : charDef.emoji;
  const displayName = isDetective ? (detectiveName ? `Det. ${detectiveName}` : 'You') : charDef.name;
  const displayTitle = isDetective ? 'Detective' : charDef.title;
  const accent = charDef.accentColor;

  const displayed = fullText.slice(0, charIndex);
  const isDone = !isTyping;
  const isLast = lineIndex === lines.length - 1;

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end pointer-events-none"
      style={{
        paddingBottom: isMobile ? 12 : 32,
        paddingLeft: isMobile ? 12 : 32,
        paddingRight: isMobile ? 12 : 32,
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Progress dots */}
      <div className="flex gap-1 mb-2 pointer-events-none pl-1 flex-wrap">
        {lines.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-400"
            style={{
              width: i === lineIndex ? (isMobile ? 12 : 18) : (isMobile ? 4 : 5),
              height: isMobile ? 4 : 5,
              background: i < lineIndex ? accent : i === lineIndex ? accent : 'rgba(255,255,255,0.12)',
              opacity: i < lineIndex ? 0.5 : 1,
            }}
          />
        ))}
      </div>

      {/* Box */}
      <div
        className="pointer-events-auto cursor-pointer select-none"
        style={{
          background: isNarrator ? 'rgba(4,3,6,0.96)' : charDef.bgColor,
          border: `1px solid ${accent}35`,
          boxShadow: `0 0 60px rgba(0,0,0,0.85), 0 0 30px ${accent}12`,
        }}
        onClick={advance}
      >
        {/* Character header */}
        {isNarrator ? (
          <div className="flex items-center gap-2 px-5 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', flexShrink: 0 }}>
              📍
            </div>
            <span className="font-detective" style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.52rem', letterSpacing: '0.3em' }}>SCENE</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: `1px solid ${accent}20` }}>
            <div
              className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
              style={isDetective && detectiveAppearance ? {} : { background: `${accent}18`, border: `1px solid ${accent}35`, borderRadius: '50%' }}
            >
              {isDetective && detectiveAppearance
                ? <CharacterSVG appearance={detectiveAppearance} size={40} />
                : <span className="text-xl">{displayEmoji}</span>}
            </div>
            <div>
              <div className="font-detective text-sm" style={{ color: accent, letterSpacing: '0.05em' }}>
                {displayName}
              </div>
              <div className="font-detective text-xs mt-0.5" style={{ color: accent, opacity: 0.5, letterSpacing: '0.12em', fontSize: '0.6rem' }}>
                {displayTitle.toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {/* Text */}
        <div className="px-5 py-4 min-h-[64px]">
          {isNarrator ? (
            <p className="font-serif italic" style={{ color: 'rgba(255,255,255,0.62)', letterSpacing: '0.04em', lineHeight: 1.85, fontSize: '0.9rem' }}>
              {displayed}
              {isTyping && <span className="animate-pulse ml-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>▋</span>}
            </p>
          ) : (
            <p className="font-serif text-base" style={{ color: 'rgba(255,255,255,0.87)', lineHeight: 1.85 }}>
              &ldquo;{displayed}
              {isTyping && <span className="animate-pulse" style={{ color: accent, opacity: 0.7 }}>▋</span>}
              {!isTyping && '"'}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <span className="font-detective text-xs" style={{ color: isDone ? accent : 'rgba(255,255,255,0.25)', letterSpacing: '0.18em', fontSize: '0.6rem', opacity: isDone ? 0.7 : 0.5 }}>
            {isDone && isLast ? t('dialogueContinue') : isDone ? t('dialogueNext') : t('dialogueSkip')}
          </span>
          <span className="font-detective text-xs" style={{ color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em', fontSize: '0.6rem' }}>
            {lineIndex + 1} / {lines.length}
          </span>
        </div>
      </div>
    </div>
  );
}
