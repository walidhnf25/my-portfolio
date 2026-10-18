"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { isHomePath } from "@/lib/i18n/config";
import { useI18n } from "@/components/providers/LocaleProvider";

// Mirrors `.section-anchor { scroll-margin-top: 90px }` in globals.css — Lenis
// drives scrolling itself, so CSS scroll-margin does not apply to its scrollTo.
const SCROLL_OFFSET = -90;

/**
 * sessionStorage key holding a section id to scroll to on the next home render.
 * Set from a detail page (see SectionLink / useScrollTo), consumed by ScrollReset.
 * A stash rather than a URL hash because the App Router merges hashes on `/`.
 */
export const PENDING_SCROLL_KEY = "pendingScroll";

/**
 * sessionStorage key holding a pixel offset to restore after the next navigation.
 * Set by the language switcher on pages that are not the home page: the route
 * changes (/en/blog/x → /id/blog/x) but the reader should stay where they were.
 */
export const PENDING_SCROLL_Y_KEY = "pendingScrollY";

/**
 * Start every load at the top.
 *
 * Browsers default `history.scrollRestoration` to "auto" and put a refresh back
 * where it left off. That fights this page: the hero plays an intro on mount, so
 * a restored scroll looks like the animations began halfway through.
 *
 * Goes through Lenis rather than window.scrollTo — as the root controller it
 * re-applies its own target every frame and would drag the page straight back.
 */
function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();
  // The root layout never remounts across client navigations, so a mount-only
  // effect would miss every detail→home transition. This runs on each pathname
  // change instead. The ref distinguishes the first render (a real load/refresh)
  // from later client navigations.
  const seenFirst = useRef(false);

  // Once: opt out of the browser restoring scroll position on refresh.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    // A pixel position stashed by the language switcher on a non-home page.
    const pendingY = sessionStorage.getItem(PENDING_SCROLL_Y_KEY);
    if (pendingY !== null && !isHomePath(pathname)) {
      seenFirst.current = true;
      // The new page mounts after the route commits; give layout a beat to settle.
      const y = Number(pendingY) || 0;
      const timer = window.setTimeout(() => {
        // Consumed here, not above: this effect re-runs when Lenis finishes
        // mounting, and a key removed too early would be gone for that second run.
        sessionStorage.removeItem(PENDING_SCROLL_Y_KEY);
        lenis?.resize();
        if (lenis) lenis.scrollTo(y, { immediate: true });
        else window.scrollTo(0, y);
      }, 120);
      return () => clearTimeout(timer);
    }

    if (!isHomePath(pathname)) {
      seenFirst.current = true;
      return;
    }
    const initial = !seenFirst.current;
    seenFirst.current = true;

    // A section requested from a detail page, or (on a fresh load only) a
    // deep-link hash. split("#") also salvages a stray double-hash.
    // Read, not consumed: removed only once the scroll below actually runs. A
    // remount (language switch) re-runs this effect when Lenis arrives, which would
    // otherwise find the key already gone and drop the scroll.
    const pending = sessionStorage.getItem(PENDING_SCROLL_KEY);
    const wanted = pending || (initial ? location.hash.replace(/^#/, "").split("#")[0] : "");

    if (wanted) {
      // The home page mounts *after* this pathname change commits, so the target
      // section is not in the DOM on the first tick — a single setTimeout(0) fires
      // too early and silently finds nothing. Poll until it appears (and its
      // layout has settled across two reads), then scroll. lenis.resize() first,
      // or Lenis would clamp the target to the old, shorter detail-page height.
      let cancelled = false;
      let timer = 0;
      let tries = 0;
      let stable = 0;
      let lastTop: number | null = null;

      const scrollToTarget = (el: HTMLElement) => {
        lenis?.resize();
        if (lenis) lenis.scrollTo(el, { offset: SCROLL_OFFSET });
        else el.scrollIntoView({ behavior: "smooth" });
      };

      const attempt = () => {
        if (cancelled) return;
        const el = document.getElementById(wanted) as HTMLElement | null;
        if (el) {
          const top = Math.round(el.getBoundingClientRect().top);
          // Wait for the section to hold still across a few reads: the home page's
          // images and 3D canvas load after the route commit and push sections
          // down, so scrolling on the first sighting lands short. Once it settles,
          // scroll — then re-assert twice more, since a Lenis animation can itself
          // outlast the final reflow.
          if ((top === lastTop && ++stable >= 2) || tries > 30) {
            sessionStorage.removeItem(PENDING_SCROLL_KEY);
            scrollToTarget(el);
            const again1 = window.setTimeout(() => scrollToTarget(el), 350);
            const again2 = window.setTimeout(() => scrollToTarget(el), 800);
            const prev = () => {
              clearTimeout(again1);
              clearTimeout(again2);
            };
            cleanup = prev;
            return;
          }
          if (top !== lastTop) stable = 0;
          lastTop = top;
        }
        if (tries++ < 40) timer = window.setTimeout(attempt, 50); // give up ~2s
      };

      let cleanup = () => clearTimeout(timer);
      timer = window.setTimeout(attempt, 0);
      return () => {
        cancelled = true;
        cleanup();
      };
    }

    // Fresh load with no target starts at the top. A later client nav with no
    // target (e.g. browser Back) is left to the browser's own restoration.
    if (initial) {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}

/**
 * Scroll to a section by id.
 *
 * Must go through Lenis: as the root smooth-scroll controller it re-applies its
 * own target every frame, which silently swallows native
 * `scrollIntoView({ behavior: "smooth" })` calls (the page simply never moves).
 * Falls back to native scrolling if Lenis has not mounted yet.
 */
export function useScrollTo() {
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();
  const { path } = useI18n();
  return useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      // Off the home page the sections do not exist. Don't route to `/#id` — the
      // App Router merges that onto any hash `/` already holds, giving
      // `/#a#b`. Stash the section and push a clean `/`; ScrollReset scrolls to
      // it on mount.
      if (!target) {
        if (!isHomePath(pathname)) {
          sessionStorage.setItem(PENDING_SCROLL_KEY, id);
          router.push(path());
        }
        return;
      }
      if (lenis) lenis.scrollTo(target, { offset: SCROLL_OFFSET });
      else target.scrollIntoView({ behavior: "smooth" });
    },
    [lenis, router, pathname, path]
  );
}
