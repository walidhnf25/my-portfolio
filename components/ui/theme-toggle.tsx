"use client";

import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/components/providers/LocaleProvider";
import { useMounted } from "@/lib/use-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const { t } = useI18n();

  const isDark = resolvedTheme !== "light";

  /**
   * Switch theme with a cross-fade between day and night.
   *
   * The page is made of many parts that restyle differently (CSS tokens, swapped
   * scene layers, a WebGL canvas, a game's canvas), so animating each one would
   * look uneven. The View Transitions API instead snapshots the old page and the
   * new one and fades between them, so everything fades together. Browsers without
   * it, and visitors who prefer reduced motion, get the instant switch as before.
   */
  const toggle = () => {
    const next = isDark ? "light" : "dark";
    type Transition = { ready: Promise<void>; finished: Promise<void>; updateCallbackDone: Promise<void> };
    const doc = document as Document & {
      startViewTransition?: (update: () => void) => Transition;
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduced) {
      setTheme(next);
      return;
    }
    const transition = doc.startViewTransition(() => {
      // next-themes sets the class from an effect, which would land after the browser
      // takes its "new" snapshot. Set it directly, then sync React state in the same tick.
      //
      // Must stay synchronous: while this callback runs the browser suspends rendering,
      // requestAnimationFrame included, so waiting on a frame in here would deadlock.
      // The 3D scene needs no wait: its next frame renders before the new snapshot is
      // captured, with the new lights already applied by React's commit.
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(next);
      root.style.colorScheme = next;
      flushSync(() => setTheme(next));
    });
    // A skipped transition (hidden tab, or a second click before the first finishes)
    // rejects these promises. The theme still switches, so swallow the rejection
    // rather than log an "Uncaught (in promise)" error.
    const ignore = () => {};
    transition.ready.catch(ignore);
    transition.finished.catch(ignore);
    transition.updateCallbackDone.catch(ignore);
  };

  return (
    <button
      type="button"
      aria-label={t.common.toggleTheme}
      onClick={toggle}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent lg:h-9 lg:w-9"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted ? (isDark ? "moon" : "sun") : "placeholder"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {mounted && !isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
