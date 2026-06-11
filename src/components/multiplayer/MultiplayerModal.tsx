import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  onCreate: () => void;
  onJoin: () => void;
  onBack: () => void;
}

export default function MultiplayerModal({ onCreate, onJoin, onBack }: Props) {
  const { t } = useLanguage();

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(14,10,30,0.98) 0%, #07050C 70%)' }}>
      <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="font-detective text-xs tracking-widest mb-3" style={{ color: 'rgba(245,166,35,0.4)', letterSpacing: '0.3em', fontSize: '0.6rem' }}>
            CIU BERLIN · TEAM OPERATIONS
          </div>
          <h1 className="font-detective text-4xl mb-2" style={{ color: 'var(--accent)', letterSpacing: '0.12em' }}>
            {t('multiplayerMode')}
          </h1>
          <p className="font-serif italic text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {t('multiplayerSubtitle')}
          </p>
        </div>

        {/* Choices */}
        <div className="space-y-4 mb-8">
          <button
            onClick={onCreate}
            className="w-full text-left p-5 transition-all duration-200 group"
            style={{ background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.25)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(245,166,35,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(245,166,35,0.05)')}
          >
            <div className="font-detective text-lg mb-1" style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}>
              {t('mpCreateRoom')}
            </div>
            <div className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              {t('mpCreateDesc')}
            </div>
          </button>

          <button
            onClick={onJoin}
            className="w-full text-left p-5 transition-all duration-200"
            style={{ background: 'rgba(245,166,35,0.03)', border: '1px solid rgba(245,166,35,0.15)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(245,166,35,0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(245,166,35,0.03)')}
          >
            <div className="font-detective text-lg mb-1" style={{ color: 'rgba(245,166,35,0.7)', letterSpacing: '0.1em' }}>
              {t('mpJoinRoom')}
            </div>
            <div className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              {t('mpJoinDesc')}
            </div>
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onBack}
            className="font-detective text-xs tracking-widest"
            style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', fontSize: '0.62rem', background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
          >
            {t('mpBack')}
          </button>
        </div>
      </div>
    </div>
  );
}
