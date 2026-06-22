import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRoom } from '../../hooks/useRoom';
import { setPlayerReady, advanceToAccusation, submitAccusation } from '../../utils/roomActions';
import { getLevelById } from '../../data/levels';
import { useIsMobile } from '../../utils/responsive';
import type { Clue } from '../../types/game';
import Handbook from '../Handbook';

interface Props {
  roomCode: string;
  playerId: string;
  onResult: () => void;
  onLeave: () => void;
}

export default function MultiplayerGame({ roomCode, playerId, onResult, onLeave }: Props) {
  const { t, lang } = useLanguage();
  const { room, loading } = useRoom(roomCode, playerId);
  const [expandedClue, setExpandedClue] = useState<string | null>(null);
  const [markingReady, setMarkingReady] = useState(false);
  const [selectedAccusation, setSelectedAccusation] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showHandbook, setShowHandbook] = useState(false);

  const isMobile = useIsMobile();

  const myPlayer = room?.players?.[playerId];
  const isHost = myPlayer?.isHost ?? false;
  const players = room ? Object.entries(room.players ?? {}) : [];

  const level = room ? getLevelById(room.selectedCase, lang) : undefined;
  const allClues: Clue[] = level ? [...level.clues, ...level.bonusClues] : [];
  const myClueIndices: number[] = myPlayer?.clueIndices ?? [];
  const myClues = myClueIndices.map((i) => allClues[i]).filter(Boolean);

  const allReady = players.every(([, p]) => p.ready);
  const readyCount = players.filter(([, p]) => p.ready).length;

  useEffect(() => {
    if (room?.phase === 'result') onResult();
  }, [room?.phase]);

  const handleReady = () => {
    if (markingReady || myPlayer?.ready) return;
    setMarkingReady(true);
    setPlayerReady(roomCode, playerId);
    setMarkingReady(false);
  };

  const handleAdvanceToAccusation = () => {
    if (!isHost || !allReady) return;
    advanceToAccusation(roomCode);
  };

  const handleSubmitAccusation = () => {
    if (!isHost || !selectedAccusation || submitting || !level) return;
    setSubmitting(true);
    const correct = selectedAccusation === level.correctAnswer;
    submitAccusation(roomCode, selectedAccusation, correct);
  };

  if (loading || !room || !level) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#07050C' }}>
        <div className="font-detective text-xs" style={{ color: 'rgba(245,166,35,0.4)', letterSpacing: '0.3em' }}>{t('mpLoading')}</div>
      </div>
    );
  }

  const phase = room.phase;

  // ── Shared sub-components ──────────────────────────────────────────

  const clueList = (
    <div className="space-y-3 mb-6">
      {myClues.map((clue) => (
        <div
          key={clue.id}
          onClick={() => setExpandedClue(expandedClue === clue.id ? null : clue.id)}
          className="cursor-pointer transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-start gap-3 px-4 py-3">
            <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 2 }}>{clue.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-detective text-sm mb-0.5" style={{ color: 'var(--accent)', letterSpacing: '0.06em', fontSize: '0.72rem', wordBreak: 'break-word' }}>
                {clue.label}
              </div>
              <div className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, wordBreak: 'break-word' }}>
                {clue.shortDesc}
              </div>
            </div>
            <span className="font-detective text-xs flex-shrink-0" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem' }}>
              {expandedClue === clue.id ? '▲' : '▼'}
            </span>
          </div>

          {expandedClue === clue.id && (
            <div className="px-4 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="font-sans text-sm mt-3 mb-3" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                {clue.detail}
              </p>
              {clue.detectiveComment && (
                <div className="px-3 py-2" style={{ background: 'rgba(245,166,35,0.05)', borderLeft: '2px solid rgba(245,166,35,0.3)' }}>
                  <p className="font-serif italic text-xs" style={{ color: 'rgba(245,166,35,0.7)', lineHeight: 1.6, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    "{clue.detectiveComment}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const readyButton = !myPlayer?.ready ? (
    <button
      onClick={handleReady}
      disabled={markingReady}
      className="w-full font-detective text-sm tracking-widest uppercase py-3.5 transition-all duration-200"
      style={{
        background: 'rgba(122,191,106,0.08)',
        border: '1px solid rgba(122,191,106,0.4)',
        color: '#7ABF6A',
        letterSpacing: '0.22em',
        cursor: markingReady ? 'wait' : 'pointer',
      }}
    >
      {t('mpMarkReady')} ✓
    </button>
  ) : (
    <div className="text-center py-3 font-detective text-sm" style={{ color: '#7ABF6A', letterSpacing: '0.18em' }}>
      ✓ {t('mpReady')}
    </div>
  );

  const accusationContent = (
    <>
      <div className="font-detective text-xs mb-4" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em', fontSize: '0.62rem' }}>
        — {t('finalDeduction')} —
      </div>
      {isHost ? (
        <>
          <p className="font-sans text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
            {t('accusationInstruction')} {level.victim.name}
          </p>
          <div className="space-y-3 mb-6">
            {level.accusationOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedAccusation(opt.id)}
                className="w-full text-left px-4 py-4 transition-all duration-200"
                style={{
                  background: selectedAccusation === opt.id ? 'rgba(245,166,35,0.1)' : 'rgba(255,255,255,0.025)',
                  border: `1px solid rgba(245,166,35,${selectedAccusation === opt.id ? '0.5' : '0.12'})`,
                }}
              >
                <div className="font-detective text-sm mb-1" style={{ color: selectedAccusation === opt.id ? 'var(--accent)' : 'var(--text-primary)', fontSize: '0.72rem', letterSpacing: '0.05em', wordBreak: 'break-word' }}>
                  {opt.label}
                </div>
                <div className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, wordBreak: 'break-word' }}>
                  {opt.description}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmitAccusation}
            disabled={!selectedAccusation || submitting}
            className="w-full font-detective text-sm tracking-widest uppercase py-3.5 transition-all duration-200"
            style={{
              background: selectedAccusation && !submitting ? 'rgba(245,166,35,0.1)' : 'rgba(245,166,35,0.03)',
              border: `1px solid rgba(245,166,35,${selectedAccusation && !submitting ? '0.5' : '0.15'})`,
              color: selectedAccusation && !submitting ? 'var(--accent)' : 'rgba(245,166,35,0.25)',
              letterSpacing: '0.22em',
              cursor: selectedAccusation && !submitting ? 'pointer' : 'not-allowed',
            }}
          >
            {t('mpSubmitAccusation')} ⚖
          </button>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="font-detective text-sm mb-3" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em' }}>
            {t('mpLeadOnly')}
          </div>
          <div className="font-detective text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.62rem' }}>
            {t('mpWaiting')}
          </div>
        </div>
      )}
    </>
  );

  const bgStyle = { background: 'radial-gradient(ellipse at 50% 10%, rgba(14,10,30,0.98) 0%, #07050C 65%)' };

  // ── Mobile layout ───────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="absolute inset-0 flex flex-col" style={bgStyle}>
        <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        {showHandbook && level.handbookTerms && (
          <div className="absolute inset-0" style={{ zIndex: 100 }}>
            <Handbook terms={level.handbookTerms} onClose={() => setShowHandbook(false)} />
          </div>
        )}

        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="min-w-0 flex-1">
            <div className="font-detective" style={{ color: 'rgba(245,166,35,0.4)', letterSpacing: '0.2em', fontSize: '0.55rem' }}>
              {level.caseType.toUpperCase()} · {roomCode}
            </div>
            <div className="font-detective text-sm truncate" style={{ color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
              {level.title}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            <button
              onClick={() => setShowHandbook(true)}
              className="font-detective text-xs"
              style={{ color: 'rgba(245,166,35,0.5)', fontSize: '0.6rem', letterSpacing: '0.15em', background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.2)', padding: '4px 8px', cursor: 'pointer' }}
            >
              📓
            </button>
            <button
              onClick={onLeave}
              className="font-detective text-xs"
              style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', letterSpacing: '0.2em', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {t('mpLeave')}
            </button>
          </div>
        </div>

        {/* Main scrollable content */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4">
          {phase === 'clue-review' && (
            <>
              <div className="font-detective text-xs mb-4" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em', fontSize: '0.62rem' }}>
                {t('mpYourClues')} · {myClues.length} {t('mpClueCount')}
              </div>
              {clueList}
              {readyButton}
            </>
          )}
          {(phase === 'accusation' || phase === 'result') && accusationContent}
        </div>

        {/* Bottom team bar */}
        <div className="relative z-10 flex-shrink-0 px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.4)' }}>
          <div className="flex items-center gap-1 flex-wrap mb-2">
            <span className="font-detective" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.52rem', letterSpacing: '0.15em', marginRight: 4 }}>
              {t('mpTeamStatus')} {readyCount}/{players.length}
            </span>
            {players.map(([id, player]) => (
              <div key={id} className="flex items-center gap-1 px-2 py-1" style={{ background: id === playerId ? 'rgba(245,166,35,0.06)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-1 h-1 rounded-full" style={{ background: player.connected ? '#7ABF6A' : 'rgba(255,255,255,0.2)' }} />
                <span className="font-detective" style={{ color: id === playerId ? 'var(--accent)' : 'var(--text-primary)', fontSize: '0.58rem' }}>
                  {player.name}
                </span>
                <span className="font-detective" style={{ color: player.ready ? '#7ABF6A' : 'rgba(255,255,255,0.2)', fontSize: '0.52rem' }}>
                  {player.ready ? '✓' : '○'}
                </span>
              </div>
            ))}
          </div>
          {phase === 'clue-review' && isHost && allReady && (
            <button
              onClick={handleAdvanceToAccusation}
              className="w-full font-detective text-xs tracking-widest uppercase py-2.5 transition-all duration-200"
              style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.4)', color: 'var(--accent)', letterSpacing: '0.15em', fontSize: '0.6rem', cursor: 'pointer' }}
            >
              {t('makeAccusation')} →
            </button>
          )}
          {phase === 'clue-review' && !allReady && (
            <div className="text-center font-detective text-xs" style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.55rem' }}>
              {t('mpWaitingForTeam')}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Desktop layout ──────────────────────────────────────────────────
  return (
    <div className="absolute inset-0 flex" style={bgStyle}>
      <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />
      {showHandbook && level.handbookTerms && (
        <div className="absolute inset-0" style={{ zIndex: 100 }}>
          <Handbook terms={level.handbookTerms} onClose={() => setShowHandbook(false)} />
        </div>
      )}

      {/* Main area */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <div className="font-detective text-xs" style={{ color: 'rgba(245,166,35,0.4)', letterSpacing: '0.25em', fontSize: '0.58rem' }}>
              {level.caseType.toUpperCase()} · ROOM {roomCode}
            </div>
            <div className="font-detective text-base" style={{ color: 'var(--text-primary)', letterSpacing: '0.06em' }}>
              {level.title}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHandbook(true)}
              className="font-detective text-xs tracking-widest uppercase transition-all duration-200"
              style={{ color: 'rgba(245,166,35,0.6)', fontSize: '0.6rem', letterSpacing: '0.18em', background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.25)', padding: '5px 12px', cursor: 'pointer' }}
            >
              📓 {t('mpHandbook')}
            </button>
            <button
              onClick={onLeave}
              className="font-detective text-xs"
              style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', letterSpacing: '0.2em', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {t('mpLeave')}
            </button>
          </div>
        </div>

        {/* Clue review phase */}
        {phase === 'clue-review' && (
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <div className="font-detective text-xs mb-4" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em', fontSize: '0.62rem' }}>
              {t('mpYourClues')} · {myClues.length} {t('mpClueCount')}
            </div>
            {clueList}
            {readyButton}
          </div>
        )}

        {/* Accusation phase */}
        {(phase === 'accusation' || phase === 'result') && (
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {accusationContent}
          </div>
        )}
      </div>

      {/* Sidebar — team status */}
      <div className="relative z-10 w-52 flex-shrink-0 flex flex-col" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)' }}>
        <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="font-detective text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', fontSize: '0.6rem' }}>
            {t('mpTeamStatus')}
          </div>
          <div className="font-detective text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.55rem' }}>
            {readyCount}/{players.length} {t('mpReady')}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
          {players.map(([id, player]) => (
            <div key={id} className="flex items-center gap-2 px-3 py-2" style={{ background: id === playerId ? 'rgba(245,166,35,0.05)' : 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: player.connected ? '#7ABF6A' : 'rgba(255,255,255,0.2)' }} />
              <div className="flex-1 min-w-0">
                <div className="font-detective truncate" style={{ color: id === playerId ? 'var(--accent)' : 'var(--text-primary)', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
                  {player.name}
                </div>
                {player.isHost && (
                  <div className="font-detective" style={{ color: 'rgba(245,166,35,0.4)', fontSize: '0.5rem', letterSpacing: '0.1em' }}>
                    {t('mpHost')}
                  </div>
                )}
              </div>
              <div className="font-detective flex-shrink-0" style={{ color: player.ready ? '#7ABF6A' : 'rgba(255,255,255,0.2)', fontSize: '0.55rem' }}>
                {player.ready ? '✓' : '○'}
              </div>
            </div>
          ))}
        </div>

        {/* Host advance button */}
        {phase === 'clue-review' && isHost && allReady && (
          <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button
              onClick={handleAdvanceToAccusation}
              className="w-full font-detective text-xs tracking-widest uppercase py-2.5 transition-all duration-200"
              style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.4)', color: 'var(--accent)', letterSpacing: '0.15em', fontSize: '0.6rem', cursor: 'pointer' }}
            >
              {t('makeAccusation')} →
            </button>
          </div>
        )}
        {phase === 'clue-review' && !allReady && (
          <div className="p-3 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="font-detective text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.58rem', lineHeight: 1.5 }}>
              {t('mpWaitingForTeam')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
