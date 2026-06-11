import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { generateRoomCode, getOrCreatePlayerId } from '../../utils/roomCode';
import { createRoom } from '../../utils/roomActions';

interface Props {
  onRoomCreated: (code: string) => void;
  onBack: () => void;
}

export default function CreateRoom({ onRoomCreated, onBack }: Props) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (trimmed.length < 2) return;
    setLoading(true);
    setError(null);
    try {
      const code = await generateRoomCode();
      const playerId = getOrCreatePlayerId();
      await createRoom(code, playerId, trimmed);
      onRoomCreated(code);
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
            CIU BERLIN · CREATE ROOM
          </div>
          <h1 className="font-detective text-3xl" style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}>
            {t('mpCreateRoom')}
          </h1>
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
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder={t('mpNamePlaceholder')}
            autoFocus
            className="w-full font-detective text-base px-4 py-3 outline-none"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(245,166,35,0.25)',
              color: 'var(--text-primary)',
              letterSpacing: '0.06em',
            }}
          />
          {name.trim().length > 0 && name.trim().length < 2 && (
            <div className="font-detective text-xs mt-1" style={{ color: 'var(--danger)', fontSize: '0.6rem' }}>
              {t('nameMinError')}
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 font-detective text-xs" style={{ background: 'rgba(224,90,71,0.08)', border: '1px solid rgba(224,90,71,0.3)', color: 'var(--danger)', fontSize: '0.65rem' }}>
            {error}
          </div>
        )}

        <button
          onClick={handleCreate}
          disabled={loading || name.trim().length < 2}
          className="w-full font-detective text-sm tracking-widest uppercase py-3.5 mb-4 transition-all duration-200"
          style={{
            background: loading || name.trim().length < 2 ? 'rgba(245,166,35,0.04)' : 'rgba(245,166,35,0.1)',
            border: `1px solid rgba(245,166,35,${loading || name.trim().length < 2 ? '0.15' : '0.5'})`,
            color: loading || name.trim().length < 2 ? 'rgba(245,166,35,0.3)' : 'var(--accent)',
            letterSpacing: '0.22em',
            cursor: loading || name.trim().length < 2 ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? t('mpCreating') : t('mpCreateRoom')}
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
