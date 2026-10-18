import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n/config";

/**
 * Pick the visitor's locale: an explicit choice (cookie from the language
 * switcher) wins, then the browser's Accept-Language, then the default.
 */
function detectLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  // "id-ID,id;q=0.9,en;q=0.8" → ["id-ID", "id", "en"], best first.
  const preferred = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((l) => l.tag && !Number.isNaN(l.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    const primary = tag.split("-")[0];
    const match = locales.find((l) => l === primary);
    if (match) return match;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocalePrefix) return;

  // No locale in the URL yet: send the visitor to the right one, keeping the path and query.
  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip the API, Next internals, and anything with a file extension
  // (public assets, favicon, robots.txt, sitemap.xml, images).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
