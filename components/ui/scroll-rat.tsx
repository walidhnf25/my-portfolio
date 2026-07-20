"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Keep INSET small: like the native scrollbar it replaces, the rat has to be able
// to reach the very top and the very bottom, or it under-reports the extremes.
const INSET = 8;

/**
 * Replaces the native scrollbar with a rat that climbs the right edge.
 *
 * Position is written synchronously with `gsap.set` straight from the scroll
 * handler — deliberately not through a tween. A position indicator has to agree
 * with the page at all times, and tweened values stall wherever animation frames
 * are throttled (background tab, low-power mode), leaving the rat somewhere the
 * reader is not. Lenis already interpolates the scroll position itself, so the
 * travel reads as smooth without any easing of our own.
 *
 * The leg scurry is a tween, since it is decorative: if frames stop, it simply
 * stops wiggling and nothing is misreported.
 *
 * Shown at every width, so the native scrollbar is hidden everywhere too (see
 * globals.css). The rat renders smaller on phones, hence measuring its height at
 * runtime rather than hard-coding it.
 */
export function ScrollRat() {
  const wrap = useRef<HTMLDivElement>(null);
  const body = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const rat = body.current;
    if (!el || !rat) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scurry = gsap.to(".rat-limb", {
      rotation: 16,
      transformOrigin: "50% 0%",
      duration: 0.16,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { each: 0.04, from: "random" },
      paused: true,
    });

    let idle = 0;
    let last = window.scrollY;
    let facing = 1;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      gsap.set(el, { y: progress * (window.innerHeight - el.offsetHeight - INSET * 2) });

      const delta = window.scrollY - last;
      last = window.scrollY;

      // Head leads the way. The rat is drawn facing +x and the svg is rotated, so
      // heading lives on X: mirroring X turns it around, mirroring Y would only
      // roll it belly-up while it still pointed the same way.
      if (Math.abs(delta) > 0.5) {
        const next = delta > 0 ? -1 : 1;
        if (next !== facing) {
          facing = next;
          gsap.set(rat, { scaleX: next });
        }
      }

      if (!reduce) {
        scurry.play();
        clearTimeout(idle);
        idle = window.setTimeout(() => scurry.pause(), 140);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(idle);
      scurry.kill();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      // Above the navbar's z-50: at the top of the page the rat's track runs
      // behind the header, and a position indicator that disappears exactly at
      // one end of its range is worse than no indicator.
      className="pointer-events-none fixed right-1 z-[60] block sm:right-2"
      style={{ top: INSET }}
    >
      <div ref={wrap}>
        <svg
          viewBox="0 0 40 26"
          className="block h-[22px] w-[22px] overflow-visible text-accent sm:h-[30px] sm:w-[30px]"
          // Drawn facing right, stood on end so it climbs the edge head-up.
          style={{ transform: "rotate(-90deg)" }}
        >
          <g ref={body} fill="currentColor" style={{ transformOrigin: "50% 50%" }}>
            {/* tail */}
            <path
              d="M8 15 Q0 15 1 9 Q2 5 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              opacity={0.85}
            />
            {/* legs */}
            <rect className="rat-limb" x={12} y={17} width={1.8} height={6} rx={0.9} />
            <rect className="rat-limb" x={17} y={18} width={1.8} height={5} rx={0.9} />
            <rect className="rat-limb" x={23} y={17} width={1.8} height={6} rx={0.9} />
            <rect className="rat-limb" x={27} y={18} width={1.8} height={5} rx={0.9} />
            {/* body + head */}
            <ellipse cx={19} cy={13} rx={11} ry={7} />
            <ellipse cx={31} cy={12} rx={6} ry={5} />
            {/* snout */}
            <path d="M35 10 L39 12 L35 15 Z" />
            {/* ear */}
            <circle cx={29} cy={6} r={3.4} />
            <circle cx={29} cy={6} r={1.6} className="fill-background" />
            {/* eye */}
            <circle cx={33} cy={11} r={1.1} className="fill-background" />
          </g>
        </svg>
      </div>
    </div>
  );
}
