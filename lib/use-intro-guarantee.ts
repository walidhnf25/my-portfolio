"use client";

import { useEffect, type RefObject } from "react";
import type { gsap } from "gsap";

/**
 * Guarantees a GSAP intro can never leave content invisible.
 *
 * `.from()` tweens hide their targets the moment the timeline is built, so a
 * stalled playhead — throttled rAF, a backgrounded tab, an interrupted
 * StrictMode remount — strands elements at `opacity: 0` / `scale: 0`: present
 * and still clickable, but invisible.
 *
 * Once the timeline's own duration has elapsed we force it to the end, kill it
 * so it cannot re-apply the hidden values, then strip the inline styles
 * straight off the DOM. That last step uses no animation frames at all, so it
 * holds even when the ticker is completely dead.
 *
 * @param root     Section wrapper to search within.
 * @param timeline Ref holding the intro timeline (may be null if skipped).
 * @param selector Selector matching every element the intro hides.
 */
export function useIntroGuarantee(
  root: RefObject<HTMLElement | null>,
  timeline: RefObject<gsap.core.Timeline | null>,
  selector: string
) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const tl = timeline.current;
    const ms = tl ? (tl.duration() + 0.8) * 1000 : 3500;

    const t = window.setTimeout(() => {
      if (tl) {
        if (tl.progress() < 1) tl.progress(1);
        tl.kill();
      }
      const nodes = el.querySelectorAll<HTMLElement>(selector);

      // Suppress each element's own CSS transition first. These targets carry
      // `transition-all`, so simply clearing the inline styles would kick off a
      // fade from the hidden value — and that transition needs animation frames
      // too, so it can stall exactly like the timeline did, leaving the element
      // invisible with an empty style attribute. Snapping instead is final.
      nodes.forEach((n) => {
        n.style.transition = "none";
        n.style.removeProperty("opacity");
        n.style.removeProperty("transform");
      });

      // Flush the change, then hand transitions back so hover effects still work.
      void el.offsetHeight;
      nodes.forEach((n) => n.style.removeProperty("transition"));
    }, ms);

    return () => clearTimeout(t);
  }, [root, timeline, selector]);
}
