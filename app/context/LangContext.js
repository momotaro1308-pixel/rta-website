'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const LangContext = createContext(null);

const LANGS = ['ja', 'en', 'zh'];

export function LangProvider({ children }) {
  const [lang, setLang] = useState('ja');

  useEffect(() => {
    document.documentElement.lang = LANGS.includes(lang) ? lang : 'ja';
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((l) => {
      const i = LANGS.indexOf(l);
      return LANGS[(i + 1) % LANGS.length];
    });
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang }),
    [lang, toggleLang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error('useLang must be used within LangProvider');
  }
  return ctx;
}
