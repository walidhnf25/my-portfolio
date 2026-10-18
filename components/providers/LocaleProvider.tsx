"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";

type I18n = {
  locale: Locale;
  /** The active dictionary. */
  t: Dictionary;
  /** Prefix an internal path with the active locale: "/blog" → "/id/blog". */
  path: (p?: string) => string;
};

const LocaleContext = createContext<I18n | null>(null);

/** Hands the server-chosen locale and dictionary to every client component. */
export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  const path = useCallback((p = "/") => localePath(locale, p), [locale]);
  const value = useMemo<I18n>(() => ({ locale, t: dict, path }), [locale, dict, path]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useI18n must be used inside <LocaleProvider>");
  return ctx;
}
