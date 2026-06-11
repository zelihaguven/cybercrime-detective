import { useLanguage } from '../contexts/LanguageContext';
import type { Lang } from '../types/game';

export default function LangToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="fixed z-[200] flex gap-0"
      style={{ top: 10, right: 12 }}
    >
      {(['en', 'de'] as Lang[]).map((l, i) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="font-detective"
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            padding: '4px 8px',
            border: '1px solid rgba(245,166,35,0.28)',
            borderLeft: i === 1 ? 'none' : undefined,
            background: lang === l ? 'rgba(245,166,35,0.14)' : 'rgba(10,8,6,0.72)',
            color: lang === l ? 'var(--accent)' : 'rgba(245,166,35,0.38)',
            transition: 'all 0.15s ease',
            cursor: 'pointer',
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
