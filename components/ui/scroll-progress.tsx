"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Like the native scrollbar it replaces, the hook has to reach the very top and
// the very bottom, or it under-reports the extremes.
const INSET = 8;
// Worm/bait colour — warm so it pops as bait against the teal rod and either
// background; deliberately outside the theme palette.
const WORM = "#e8896f";

/**
 * Replaces the native scrollbar with a fishing line down the right edge: a rod
 * fixed at the top, a line that pays out as you scroll, and a baited hook that
 * marks the scroll position — near the rod at the top of the page, at the bottom
 * of its travel at the end.
 *
 * Position is written synchronously with `gsap.set` straight from the scroll
 * handler, not through a tween: a position indicator must agree with the page at
 * all times, and tweened values stall wherever animation frames are throttled.
 * Only the worm's wiggle is a tween — purely decorative, so if frames stop it
 * simply stops wiggling and nothing is misreported.
 *
 * Shown at every width (the native bar is hidden everywhere, see globals.css);
 * the hook renders smaller on phones, hence measuring its height at runtime.
 */
export function ScrollProgress() {
  const hook = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = hook.current;
    const l = line.current;
    if (!h || !l) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The worm wiggles segment by segment, like bait dangling in the current.
    const wiggle = gsap.to(".worm-seg", {
      rotation: 12,
      transformOrigin: "50% 0%",
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.08,
      paused: true,
    });

    let idle = 0;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      const size = h.offsetHeight;
      const start = h.offsetTop; // the CSS anchor, per breakpoint
      const endY = window.innerHeight - INSET - size;
      const y = Math.max(0, progress * (endY - start));

      // The hook drops; the line pays out to follow it.
      gsap.set(h, { y });
      gsap.set(l, { height: y + size * 0.45 });

      if (!reduce) {
        wiggle.play();
        clearTimeout(idle);
        idle = window.setTimeout(() => wiggle.pause(), 160);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // The page is not its final height on first paint — fonts swap, the canvas
    // mounts, images land. Progress divides by that height, so watch it or the
    // hook is placed against a stale total and stays there.
    const ro = new ResizeObserver(update);
    ro.observe(document.body);

    return () => {
      clearTimeout(idle);
      wiggle.kill();
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const box = "h-[22px] w-[22px] sm:h-[30px] sm:w-[30px]";
  // The rod, line and hook are all level with the theme toggle (navbar centre,
  // y=32). Baked in CSS so the first paint is already right.
  const anchor = "top-[32px]";

  return (
    <div
      aria-hidden="true"
      // Above the header (z-75) so the rod isn't hidden behind the navbar, below
      // the mobile menu panel (z-85). See Navbar for the full order.
      //
      // The whole column is parked to the RIGHT of the hamburger: its left edge
      // (right-2 + w-36 => ~x331 on a 375 phone) sits a comfortable ~12px clear
      // of the hamburger's right edge (~x319, set by the navbar's pr-14), while
      // the rod's far end keeps ~9px off the screen edge — close but not flush.
      // So nothing in it — rod, line, hook — overlaps that button, and it stays
      // level with the theme toggle.
      className="pointer-events-none fixed inset-y-0 right-2 z-[80] block w-[36px] sm:right-4 sm:w-[48px]"
    >
      {/* The rod, flipped: reel + grip at the RIGHT (the corner), tapering LEFT
          to the tip, from which the line drops. Facing away from the hamburger. */}
      <div className="absolute inset-x-0 top-[23px] h-[18px] overflow-visible sm:top-[20px] sm:h-[24px]">
        <svg viewBox="0 0 48 24" className="h-full w-full overflow-visible text-muted-foreground">
          {/* tip ring the line runs through (left end) */}
          <circle cx="2" cy="12" r="1" fill="currentColor" />
          {/* rod blank, tapering from the tip (left) to the reel (right) */}
          <path d="M2 12.4 L2 11.6 L33 10.7 L33 13.3 Z" fill="currentColor" />
          {/* line guides hanging under the blank */}
          <g fill="none" stroke="currentColor" strokeWidth="0.9">
            <line x1="13" y1="12.2" x2="13" y2="13.8" />
            <circle cx="13" cy="14.6" r="1" />
            <line x1="23" y1="12.6" x2="23" y2="14.4" />
            <circle cx="23" cy="15.3" r="1.1" />
          </g>
          {/* reel (right): seat, spool, crank, knob */}
          <line x1="35" y1="14.5" x2="35" y2="12.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="35" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="35" cy="18" r="1" fill="currentColor" />
          <line x1="35" y1="18" x2="38" y2="21.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="38.4" cy="21.7" r="1.1" fill="currentColor" />
          {/* cork grip + butt cap (far right) */}
          <line x1="35" y1="12" x2="45" y2="12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <circle cx="45.6" cy="12" r="1.4" fill="currentColor" />
        </svg>
      </div>

      {/* The line, from the rod tip down to the hook. Height set at runtime. */}
      <div
        ref={line}
        className={`absolute ${anchor} left-[2px] w-px bg-muted-foreground/60`}
        style={{ height: 0 }}
      />

      {/* The baited hook — the moving indicator. Left-aligned so the whole box
          stays right of the hamburger; the shank hangs from x≈2 to meet the line. */}
      <div ref={hook} className={`absolute left-0 ${anchor} ${box}`}>
        <svg viewBox="0 0 24 24" className="h-full w-full overflow-visible">
          {/* hook shank + bend */}
          <path
            d="M2.4 0 L2.4 8 Q2.4 14 8 14 Q11.5 14 10.8 10.5"
            fill="none"
            className="stroke-muted-foreground"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          {/* barb */}
          <path
            d="M10.8 10.5 L12 12 M10.8 10.5 L9 11.3"
            fill="none"
            className="stroke-muted-foreground"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          {/* worm on the hook, dangling and wiggling */}
          <g fill={WORM}>
            <ellipse className="worm-seg" cx="8" cy="12.6" rx="2.6" ry="1.9" />
            <ellipse className="worm-seg" cx="10" cy="15.6" rx="2.3" ry="1.7" />
            <ellipse className="worm-seg" cx="11.6" cy="18.4" rx="2" ry="1.5" />
            <ellipse className="worm-seg" cx="12.8" cy="20.8" rx="1.6" ry="1.3" />
          </g>
        </svg>
      </div>
    </div>
  );
}
