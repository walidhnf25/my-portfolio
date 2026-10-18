"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "@/components/providers/LocaleProvider";
import {
  PENDING_SCROLL_KEY,
  PENDING_SCROLL_Y_KEY,
} from "@/components/providers/SmoothScroll";
import { NAV_IDS } from "@/lib/portfolio";
import {
  isHomePath,
  localeNames,
  locales,
  saveLocale,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/** The home section the viewport centre currently sits in (same rule as the navbar). */
function currentSection(): string {
  const line = Math.round(window.innerHeight * 0.5);
  let current: string = NAV_IDS[0];
  for (const id of NAV_IDS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) current = id;
  }
  return current;
}

/**
 * EN | ID segmented control. Switching navigates to the same page in the other
 * locale, remembers the choice in a cookie (so the proxy honours it on the next
 * visit), and stashes where the reader was so the new page lands in the same place.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (to: Locale) => {
    if (to === locale) return;
    try {
      saveLocale(to);
      // Home keeps its section; other pages keep their pixel offset.
      if (isHomePath(pathname)) {
        sessionStorage.setItem(PENDING_SCROLL_KEY, currentSection());
      } else {
        sessionStorage.setItem(PENDING_SCROLL_Y_KEY, String(Math.round(window.scrollY)));
      }
    } catch {
      // Storage can be blocked; the switch still works, it just lands at the top.
    }
    router.push(switchLocalePath(pathname, to));
  };

  return (
    <div
      role="group"
      aria-label={t.common.language}
      className={cn(
        "relative flex h-11 items-center rounded-full border border-border p-1 lg:h-9",
        className
      )}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => switchTo(l)}
            aria-pressed={active}
            aria-label={localeNames[l].native}
            title={localeNames[l].native}
            className={cn(
              "relative grid h-full min-w-9 place-items-center rounded-full px-2.5 font-mono text-[11px] font-semibold tracking-wider transition-colors",
              active ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{localeNames[l].short}</span>
          </button>
        );
      })}
    </div>
  );
}
