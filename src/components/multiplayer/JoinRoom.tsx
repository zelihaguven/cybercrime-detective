import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getOrCreatePlayerId } from '../../utils/roomCode';
import { joinRoom } from '../../utils/roomActions';
import type { UIKey } from '../../i18n/ui';

interface Props {
  onRoomJoined: (code: string) => void;
  onBack: () => void;
}

const ERROR_KEYS: Record<string, UIKey> = {
  room_not_found: 'mpErrorNotFound',
  room_expired:   'mpErrorExpired',
  room_started:   'mpErrorStarted',
  room_full:      'mpErrorFull',
  name_taken:     'mpErrorNameTaken',
};

export default function JoinRoom({ onRoomJoined, onBack }: Props) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = name.trim().length >= 2 && code.trim().length === 4 && !loading;

  const handleJoin = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const playerId = getOrCreatePlayerId();
      const result = await joinRoom(code.trim(), playerId, name.trim());
      if (result.error) {
        setError(t(ERROR_KEYS[result.error] ?? 'mpErrorGeneric'));
        setLoading(false);
      } else {
        onRoomJoined(code.trim());
      }
    } catch {
      setError(t('mpErrorGeneric'));
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(14,10,30,0.98) 0%, #07050C 70%)' }}>
      <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm mx-auto px-6">
        <div className="text-center mb-8">
          <div className="font-detective text-xs tracking-widest mb-3" style={{ color: 'rgba(245,166,35,0.4)', fontSize: '0.6rem', letterSpacing: '0.3em' }}>
            CIU BERLIN · JOIN ROOM
          </div>
          <h1 className="font-detective text-3xl" style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}>
            {t('mpJoinRoom')}
          </h1>
        </div>

        <div className="mb-5">
          <label className="font-detective text-xs block mb-2" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em', fontSize: '0.62rem' }}>
            {t('mpRoomCode')}
          </label>
          <input
            type="text"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder={t('mpRoomCodePlaceholder')}
            autoFocus
            className="w-full font-detective text-2xl px-4 py-3 text-center tracking-widest outline-none"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(245,166,35,0.25)',
              color: 'var(--accent)',
              letterSpacing: '0.4em',
            }}
          />
        </div>

        <div className="mb-6">
          <label className="font-detective text-xs block mb-2" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em', fontSize: '0.62rem' }}>
            {t('mpYourName')}
          </label>
          <input
            type="text"
            maxLength={24}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            placeholder={t('mpNamePlaceholder')}
            className="w-full font-detective text-base px-4 py-3 outline-none"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(245,166,35,0.25)',
              color: 'var(--text-primary)',
              letterSpacing: '0.06em',
            }}
          />
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 font-detective text-xs" style={{ background: 'rgba(224,90,71,0.08)', border: '1px solid rgba(224,90,71,0.3)', color: 'var(--danger)', fontSize: '0.65rem' }}>
            {error}
          </div>
        )}

        <button
          onClick={handleJoin}
          disabled={!canSubmit}
          className="w-full font-detective text-sm tracking-widest uppercase py-3.5 mb-4 transition-all duration-200"
          style={{
            background: canSubmit ? 'rgba(245,166,35,0.1)' : 'rgba(245,166,35,0.04)',
            border: `1px solid rgba(245,166,35,${canSubmit ? '0.5' : '0.15'})`,
            color: canSubmit ? 'var(--accent)' : 'rgba(245,166,35,0.3)',
            letterSpacing: '0.22em',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
          }}
        >
          {loading ? t('mpJoining') : t('mpJoinRoom')}
        </button>

        <div className="flex justify-center">
          <button
            onClick={onBack}
            disabled={loading}
            className="font-detective text-xs tracking-widest"
            style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.62rem', letterSpacing: '0.2em', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {t('mpBack')}
          </button>
        </div>
      </div>
    </div>
  );
}
