"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type Locale, type TranslationKey } from "@/lib/i18n";

interface LangContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, fallback?: string) => string;
  toggleLocale: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "smartexplorer_locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("vi");

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && (saved === "vi" || saved === "en")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const toggleLocale = () => setLocale(locale === "vi" ? "en" : "vi");

  const t = (key: TranslationKey, fallback?: string): string => {
    return translations[locale][key] ?? fallback ?? key;
  };

  return (
    <LangContext.Provider value={{ locale, setLocale, t, toggleLocale }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
