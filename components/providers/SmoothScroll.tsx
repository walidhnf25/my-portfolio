"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useCallback, useEffect, type ReactNode } from "react";

// Mirrors `.section-anchor { scroll-margin-top: 90px }` in globals.css — Lenis
// drives scrolling itself, so CSS scroll-margin does not apply to its scrollTo.
const SCROLL_OFFSET = -90;

/**
 * Start every load at the top.
 *
 * Browsers default `history.scrollRestoration` to "auto" and put a refresh back
 * where it left off. That fights this page: the hero plays an intro on mount and
 * the ScrollRat treats the top of the page as its home, so a restored scroll
 * looks like the animations began halfway through and the rat spawned mid-climb.
 *
 * Goes through Lenis rather than window.scrollTo — as the root controller it
 * re-applies its own target every frame and would drag the page straight back.
 */
function ScrollReset() {
  const lenis = useLenis();
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [lenis]);
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
  return useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: SCROLL_OFFSET });
      else target.scrollIntoView({ behavior: "smooth" });
    },
    [lenis]
  );
}
