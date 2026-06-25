import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [textVisible, setTextVisible] = useState(true);
  const [nameplateVisible, setNameplateVisible] = useState(true);
  const prevSpeakerRef = useRef<string | null>(null);

  const currentLine = lines[lineIndex];
  const fullText = currentLine.text.replace(/{detective}/g, detectiveName ?? 'Detective');

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  useEffect(() => {
    const charId = currentLine.characterId;
    const speakerChanged = prevSpeakerRef.current !== null && prevSpeakerRef.current !== charId;

    if (speakerChanged) {
      setTextVisible(false);
      setNameplateVisible(false);
      const textTimer = setTimeout(() => {
        setCharIndex(0);
        setIsTyping(true);
        setTextVisible(true);
        setTimeout(() => setNameplateVisible(true), 40);
      }, 80);
      prevSpeakerRef.current = charId;
      onLineChange?.(lineIndex);
      return () => clearTimeout(textTimer);
    } else {
      setCharIndex(0);
      setIsTyping(true);
      onLineChange?.(lineIndex);
      prevSpeakerRef.current = charId;
    }
  }, [lineIndex]);

  useEffect(() => {
    if (!isTyping) return;
    if (charIndex >= fullText.length) { setIsTyping(false); return; }
    const speed = currentLine.characterId === 'narrator' ? 28 : 18;
    const timer = setTimeout(() => setCharIndex((c) => c + 1), speed);
    return () => clearTimeout(timer);
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
  const displayName = isDetective ? (detectiveName ? `Det. ${detectiveName}` : 'You') : charDef.name;
  const displayTitle = isDetective ? 'Detective' : charDef.title;
  const accent = charDef.accentColor;

  const displayed = fullText.slice(0, charIndex);
  const isDone = !isTyping;
  const isLast = lineIndex === lines.length - 1;

  const boxHeight = isMobile ? 100 : 120;

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
      {/* Main dialogue area — nameplate + box */}
      <div
        className="pointer-events-auto cursor-pointer select-none relative"
        onClick={advance}
      >
        {/* Nameplate — sits above the text box */}
        {!isNarrator && (
          <div
            style={{
              position: 'absolute',
              top: -28,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              opacity: nameplateVisible ? 1 : 0,
              transform: nameplateVisible ? 'translateX(0)' : 'translateX(-8px)',
              transition: 'opacity 180ms ease, transform 180ms ease',
              zIndex: 10,
            }}
          >
            {/* Accent bar */}
            <div style={{ width: 3, height: 22, background: accent, borderRadius: 2, flexShrink: 0 }} />
            {/* Avatar — detective only */}
            {isDetective && detectiveAppearance && (
              <div style={{ flexShrink: 0 }}>
                <CharacterSVG appearance={detectiveAppearance} size={20} />
              </div>
            )}
            <span
              className="font-detective"
              style={{ color: accent, fontSize: isMobile ? '0.55rem' : '0.65rem', letterSpacing: '0.12em' }}
            >
              {displayName}
            </span>
            <span
              className="font-detective"
              style={{ color: accent, opacity: 0.45, fontSize: '0.5rem', letterSpacing: '0.2em' }}
            >
              {displayTitle.toUpperCase()}
            </span>
          </div>
        )}

        {/* Progress dots — inside top-right of box */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 3,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          {lines.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-400"
              style={{
                width: i === lineIndex ? 10 : 3,
                height: 3,
                background: i < lineIndex ? accent : i === lineIndex ? accent : 'rgba(255,255,255,0.12)',
                opacity: i < lineIndex ? 0.4 : 1,
              }}
            />
          ))}
        </div>

        {/* Text box */}
        <div
          style={{
            background: isNarrator ? 'rgba(4,3,6,0.96)' : charDef.bgColor,
            border: `1px solid ${accent}35`,
            boxShadow: `0 0 60px rgba(0,0,0,0.85), 0 0 30px ${accent}12`,
            height: boxHeight,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: isMobile ? '0 16px' : '0 20px',
              width: '100%',
              opacity: textVisible ? 1 : 0,
              transition: 'opacity 80ms ease',
            }}
          >
            {isNarrator ? (
              <p
                className="font-serif italic"
                style={{
                  color: 'rgba(255,255,255,0.62)',
                  letterSpacing: '0.04em',
                  lineHeight: 1.75,
                  fontSize: isMobile ? '0.82rem' : '0.9rem',
                  textAlign: 'center',
                }}
              >
                {displayed}
                {isTyping && <span className="animate-pulse ml-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>▋</span>}
              </p>
            ) : (
              <p
                className="font-serif"
                style={{
                  color: 'rgba(255,255,255,0.87)',
                  lineHeight: 1.75,
                  fontSize: isMobile ? '0.88rem' : '1rem',
                }}
              >
                &ldquo;{displayed}
                {isTyping && <span className="animate-pulse" style={{ color: accent, opacity: 0.7 }}>▋</span>}
                {!isTyping && '"'}
              </p>
            )}
          </div>

          {/* Next / done indicator — bottom-right blinking chevron */}
          {isDone && (
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                right: 10,
                color: isLast ? accent : 'rgba(255,255,255,0.4)',
                fontSize: '0.7rem',
              }}
              className="next-chevron font-detective"
            >
              {isLast ? (
                <span style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: accent }}>
                  {t('dialogueContinue')}
                </span>
              ) : '▼'}
            </div>
          )}

          {/* Skip hint while typing */}
          {isTyping && (
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                right: 10,
                color: 'rgba(255,255,255,0.15)',
                fontSize: '0.45rem',
                letterSpacing: '0.15em',
              }}
              className="font-detective"
            >
              {t('dialogueSkip')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
