import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Lang } from '../types/game';
import { UI } from '../i18n/ui';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof UI.en) => string;
}

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: (k) => k as string });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem('ciu-detective-language') as Lang) ?? 'en'; }
    catch { return 'en'; }
  });

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem('ciu-detective-language', l);
    setLangState(l);
  }, []);

  const t = useCallback(
    (key: keyof typeof UI.en) => (UI[lang] as typeof UI.en)[key] ?? UI.en[key] ?? (key as string),
    [lang],
  );

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useLanguage = () => useContext(Ctx);
