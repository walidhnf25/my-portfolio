"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useCallback, type ReactNode } from "react";

// Mirrors `.section-anchor { scroll-margin-top: 90px }` in globals.css — Lenis
// drives scrolling itself, so CSS scroll-margin does not apply to its scrollTo.
const SCROLL_OFFSET = -90;

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
