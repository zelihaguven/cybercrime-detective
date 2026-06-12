import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRoom } from '../../hooks/useRoom';
import { setSelectedCase, startGame } from '../../utils/roomActions';
import { LEVELS } from '../../data/levels';

interface Props {
  roomCode: string;
  playerId: string;
  onGameStarted: () => void;
  onLeave: () => void;
}

export default function RoomLobby({ roomCode, playerId, onGameStarted, onLeave }: Props) {
  const { t } = useLanguage();
  const { room, loading, error } = useRoom(roomCode, playerId);
  const [copied, setCopied] = useState(false);
  const [starting, setStarting] = useState(false);

  const myPlayer = room?.players?.[playerId];
  const isHost = myPlayer?.isHost ?? false;
  const players = room ? Object.entries(room.players ?? {}) : [];
  const playerCount = players.length;

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    if (room?.phase === 'clue-review' && room?.status === 'active') {
      onGameStarted();
    }
  }, [room?.phase, room?.status]);

  const handleCaseChange = (caseId: 7 | 8 | 9 | 10) => {
    if (!isHost) return;
    setSelectedCase(roomCode, caseId);
  };

  const caseLabel = (id: number) => {
    if (id === 7) return t('mpCase7Label');
    if (id === 8) return t('mpCase8Label');
    if (id === 9) return t('mpCase9Label');
    return t('mpCase10Label');
  };

  const handleStart = () => {
    if (!isHost || playerCount < 2 || starting) return;
    setStarting(true);
    const level = LEVELS.find((l) => l.id === (room?.selectedCase ?? 7));
    if (!level) { setStarting(false); return; }
    const allClues = [...level.clues, ...level.bonusClues];
    startGame(roomCode, players.map(([id]) => id), allClues);
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#07050C' }}>
        <div className="font-detective text-xs" style={{ color: 'rgba(245,166,35,0.4)', letterSpacing: '0.3em' }}>{t('mpLoading')}</div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#07050C' }}>
        <div className="text-center">
          <div className="font-detective text-sm mb-4" style={{ color: 'var(--danger)' }}>{t('mpErrorNotFound')}</div>
          <button onClick={onLeave} className="font-detective text-xs" style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>{t('mpBack')}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'radial-gradient(ellipse at 50% 25%, rgba(14,10,30,0.98) 0%, #07050C 70%)' }}>
      <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="font-detective text-xs mb-2" style={{ color: 'rgba(245,166,35,0.35)', letterSpacing: '0.3em', fontSize: '0.58rem' }}>
            CIU BERLIN · DETECTIVE ROOM
          </div>
          <div className="font-detective text-5xl mb-1" style={{ color: 'var(--accent)', letterSpacing: '0.3em', fontVariantNumeric: 'tabular-nums' }}>
            {roomCode}
          </div>
          <button
            onClick={copyCode}
            className="font-detective text-xs transition-all duration-200"
            style={{ color: copied ? '#7ABF6A' : 'rgba(245,166,35,0.4)', fontSize: '0.6rem', letterSpacing: '0.2em', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {copied ? t('mpCodeCopied') : t('mpCopyCode')}
          </button>
        </div>

        {/* Case selector (host only) */}
        {isHost && (
          <div className="mb-5">
            <div className="font-detective text-xs mb-2" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', fontSize: '0.62rem' }}>{t('mpCaseSelect')}</div>
            <div className="grid grid-cols-2 gap-2">
              {([7, 8, 9, 10] as const).map((id) => (
                <button
                  key={id}
                  onClick={() => handleCaseChange(id)}
                  className="py-2.5 font-detective text-xs transition-all duration-200"
                  style={{
                    background: room.selectedCase === id ? 'rgba(245,166,35,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid rgba(245,166,35,${room.selectedCase === id ? '0.5' : '0.15'})`,
                    color: room.selectedCase === id ? 'var(--accent)' : 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.08em',
                    fontSize: '0.62rem',
                    cursor: 'pointer',
                  }}
                >
                  {caseLabel(id)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Non-host case display */}
        {!isHost && (
          <div className="mb-5 px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="font-detective text-xs mb-1" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem', letterSpacing: '0.18em' }}>{t('mpCaseSelect')}</div>
            <div className="font-detective text-sm" style={{ color: 'rgba(245,166,35,0.7)', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
              {caseLabel(room.selectedCase ?? 7)}
            </div>
          </div>
        )}

        {/* Player list */}
        <div className="mb-5">
          <div className="font-detective text-xs mb-3" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', fontSize: '0.62rem' }}>
            {t('mpPlayers')} · {playerCount}/4
          </div>
          <div className="space-y-2">
            {players.map(([id, player]) => (
              <div
                key={id}
                className="flex items-center justify-between px-4 py-3"
                style={{ background: id === playerId ? 'rgba(245,166,35,0.06)' : 'rgba(255,255,255,0.025)', border: `1px solid rgba(255,255,255,${id === playerId ? '0.12' : '0.06'})` }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: player.connected ? '#7ABF6A' : 'rgba(255,255,255,0.2)' }}
                  />
                  <span className="font-detective text-sm" style={{ color: id === playerId ? 'var(--accent)' : 'var(--text-primary)', letterSpacing: '0.06em' }}>
                    {player.name}
                  </span>
                  {player.isHost && (
                    <span className="font-detective px-1.5 py-0.5" style={{ background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.3)', color: 'rgba(245,166,35,0.7)', fontSize: '0.5rem', letterSpacing: '0.15em' }}>
                      {t('mpHost')}
                    </span>
                  )}
                  {id === playerId && (
                    <span className="font-detective" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
                      {t('mpYou')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waiting hint */}
        <div className="text-center mb-5">
          <p className="font-serif italic text-xs" style={{ color: 'rgba(255,255,255,0.25)', lineHeight: 1.7 }}>
            {t('mpShareCode')} <span className="font-detective not-italic" style={{ color: 'rgba(245,166,35,0.5)' }}>{roomCode}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {isHost && (
            <button
              onClick={handleStart}
              disabled={playerCount < 2 || starting}
              className="w-full font-detective text-sm tracking-widest uppercase py-3.5 transition-all duration-200"
              style={{
                background: playerCount >= 2 && !starting ? 'rgba(245,166,35,0.1)' : 'rgba(245,166,35,0.03)',
                border: `1px solid rgba(245,166,35,${playerCount >= 2 && !starting ? '0.5' : '0.15'})`,
                color: playerCount >= 2 && !starting ? 'var(--accent)' : 'rgba(245,166,35,0.25)',
                letterSpacing: '0.22em',
                cursor: playerCount >= 2 && !starting ? 'pointer' : 'not-allowed',
              }}
            >
              {starting ? '...' : t('mpStartGame')}
            </button>
          )}
          {isHost && playerCount < 2 && (
            <div className="text-center font-detective text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', letterSpacing: '0.12em' }}>
              {t('mpStartRequires')}
            </div>
          )}
          {!isHost && (
            <div className="text-center font-detective text-xs py-3" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>
              {t('mpWaiting')}
            </div>
          )}
          <div className="flex justify-center">
            <button
              onClick={onLeave}
              className="font-detective text-xs tracking-widest"
              style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', letterSpacing: '0.2em', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {t('mpLeave')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
