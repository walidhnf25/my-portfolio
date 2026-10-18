// Locale configuration — safe to import from the proxy, server and client alike
// (no `server-only`, no Node APIs).

export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie the language switcher writes so a visitor's choice sticks. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeNames: Record<Locale, { native: string; short: string }> = {
  en: { native: "English", short: "EN" },
  id: { native: "Bahasa Indonesia", short: "ID" },
};

/** BCP-47 tags for Intl formatting and Open Graph. */
export const intlLocale: Record<Locale, string> = { en: "en-GB", id: "id-ID" };
export const ogLocale: Record<Locale, string> = { en: "en_US", id: "id_ID" };

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Prefix an internal path with a locale: ("id", "/blog") → "/id/blog".
 * Home is the bare locale ("/id"), never "/id/".
 */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** Swap the locale segment of a pathname: ("/id/blog/x", "en") → "/en/blog/x". */
export function switchLocalePath(pathname: string, to: Locale): string {
  const [, first, ...rest] = pathname.split("/");
  const tail = first && hasLocale(first) ? rest : [first, ...rest].filter(Boolean);
  return localePath(to, tail.length ? `/${tail.join("/")}` : "/");
}

/** True for "/en" and "/id" (with or without a trailing slash). */
export function isHomePath(pathname: string): boolean {
  const seg = pathname.split("/").filter(Boolean);
  return seg.length === 1 && hasLocale(seg[0]);
}

/** Fill `{name}` placeholders. Dictionaries hold templates, never functions, so
 *  they can cross the server → client boundary. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

/** Remember the visitor's choice for a year (client-side; the proxy reads it). */
export function saveLocale(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
