import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRoom } from '../../hooks/useRoom';
import { resetRoom } from '../../utils/roomActions';
import { getLevelById } from '../../data/levels';

interface Props {
  roomCode: string;
  playerId: string;
  onPlayAgain: () => void;
  onReturnTitle: () => void;
}

export default function MultiplayerResult({ roomCode, playerId, onPlayAgain, onReturnTitle }: Props) {
  const { t, lang } = useLanguage();
  const { room } = useRoom(roomCode, playerId);
  const [mounted, setMounted] = useState(false);
  const [stampVisible, setStampVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 80);
    const t2 = setTimeout(() => setStampVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const level = room ? getLevelById(room.selectedCase, lang) : undefined;
  const result = room?.accusationResult;
  const correct = result?.correct ?? false;
  const chosenOption = level?.accusationOptions.find((o) => o.id === result?.choice);
  const correctOption = level?.accusationOptions.find((o) => o.id === level.correctAnswer);

  const players = room ? Object.entries(room.players ?? {}) : [];
  const isHost = room?.players?.[playerId]?.isHost ?? false;

  const handlePlayAgain = () => {
    if (isHost) resetRoom(roomCode);
    onPlayAgain();
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
      style={{
        background: correct
          ? 'radial-gradient(ellipse at 50% 25%, rgba(18,30,18,0.97) 0%, #07050C 65%)'
          : 'radial-gradient(ellipse at 50% 25%, rgba(30,12,10,0.97) 0%, #07050C 65%)',
        opacity: mounted ? 1 : 0,
      }}
    >
      <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-8">
        {/* Verdict stamp */}
        <div className="text-center mb-7">
          <div
            className="inline-block font-detective px-10 py-4 transition-all duration-700"
            style={{
              border: `2px solid ${correct ? 'rgba(122,191,106,0.6)' : 'rgba(224,90,71,0.6)'}`,
              color: correct ? 'rgba(122,191,106,0.9)' : 'rgba(224,90,71,0.9)',
              letterSpacing: '0.35em',
              fontSize: '1.7rem',
              opacity: stampVisible ? 1 : 0,
              transform: stampVisible ? 'scale(1) rotate(-2deg)' : 'scale(1.2) rotate(-2deg)',
            }}
          >
            {correct ? t('mpResultCorrect') : t('mpResultWrong')}
          </div>
        </div>

        {/* Accusation summary */}
        <div className="mb-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', padding: '20px' }}>
          <div className="mb-4">
            <div className="font-detective text-xs mb-1" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', fontSize: '0.6rem' }}>
              {t('mpChoiceWas')}
            </div>
            <div className="font-detective text-sm" style={{ color: correct ? '#7ABF6A' : 'var(--danger)', letterSpacing: '0.06em', fontSize: '0.75rem' }}>
              {chosenOption?.label ?? result?.choice}
            </div>
          </div>
          {!correct && (
            <div>
              <div className="font-detective text-xs mb-1" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', fontSize: '0.6rem' }}>
                {t('mpCorrectWas')}
              </div>
              <div className="font-detective text-sm" style={{ color: '#7ABF6A', letterSpacing: '0.06em', fontSize: '0.75rem' }}>
                {correctOption?.label}
              </div>
            </div>
          )}
        </div>

        {/* Outcome text */}
        <div className="mb-5 px-4 py-4" style={{ background: correct ? 'rgba(122,191,106,0.04)' : 'rgba(224,90,71,0.04)', border: `1px solid ${correct ? 'rgba(122,191,106,0.15)' : 'rgba(224,90,71,0.15)'}` }}>
          <p className="font-serif italic text-sm" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
            {correct ? level?.successOutcome : level?.failureOutcome}
          </p>
        </div>

        {/* Team list */}
        <div className="mb-6">
          <div className="font-detective text-xs mb-3" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', fontSize: '0.6rem' }}>
            {t('mpPlayers')}
          </div>
          <div className="flex flex-wrap gap-2">
            {players.map(([id, player]) => (
              <div key={id} className="px-3 py-1.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="font-detective text-xs" style={{ color: id === playerId ? 'var(--accent)' : 'rgba(255,255,255,0.5)', fontSize: '0.65rem' }}>
                  {player.name}{player.isHost ? ` (${t('mpHost')})` : ''}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handlePlayAgain}
            className="flex-1 font-detective text-sm tracking-widest uppercase py-3.5 transition-all duration-200"
            style={{
              background: 'rgba(245,166,35,0.08)',
              border: '1px solid rgba(245,166,35,0.4)',
              color: 'var(--accent)',
              letterSpacing: '0.2em',
            }}
          >
            {t('mpPlayAgain')}
          </button>
          <button
            onClick={onReturnTitle}
            className="font-detective text-xs tracking-widest uppercase px-5 py-3 transition-all duration-200"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.15em',
              fontSize: '0.62rem',
            }}
          >
            {t('mpReturnTitle')}
          </button>
        </div>
      </div>
    </div>
  );
}
