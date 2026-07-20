"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Keep INSET small: like the native scrollbar it replaces, the rat has to be able
// to reach the very top and the very bottom, or it under-reports the extremes.
const INSET = 8;
// How close to an end counts as "arrived". One pixel of travel out of a few
// hundred, so it only triggers at the actual extremes.
const EDGE = 0.004;
// How much of the scroll range the house and the larder fade in over. They only
// belong on screen when the rat is nearly there; the rest of the time the edge
// should be just the rat.
const NEAR = 0.12;
// Vertical centre of the navbar (h-16), so the house lines up with the theme
// toggle. The rat's top dock follows it rather than INSET — otherwise it would
// vanish above the doorway instead of into it.
const NAV_CENTER = 32;
// Not a theme token: the cheese has to stay cheese-coloured against both the red
// rat and either background, so it is deliberately outside the palette.
const CHEESE = "#f4c430";

/**
 * Replaces the native scrollbar with a rat that climbs the right edge.
 *
 * Its house sits at the top of the track and its food at the bottom, which are
 * the two ends of the scroll range: reach the bottom and the rat picks the food
 * up, climb back to the top and it carries the food inside, after which a fresh
 * one appears at the bottom.
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
  const cheese = useRef<SVGGElement>(null);
  const hut = useRef<HTMLDivElement>(null);
  const larder = useRef<HTMLDivElement>(null);
  const window_ = useRef<SVGRectElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const rat = body.current;
    const held = cheese.current;
    const house = hut.current;
    const food = larder.current;
    const lit = window_.current;
    if (!el || !rat || !held || !house || !food || !lit) return;

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

    gsap.set(held, { opacity: 0 });
    gsap.set(lit, { opacity: 0 });

    let idle = 0;
    let last = window.scrollY;
    let facing = 1;
    let carrying = false;
    let home = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      // The dock is a CSS offset both the house and the rat already sit on, so
      // the first paint is correct before this ever runs; the tween only covers
      // the distance from there down to the larder.
      const size = el.offsetHeight;
      const dock = NAV_CENTER - size / 2;
      const bottom = window.innerHeight - INSET - size;
      gsap.set(el, { y: progress * (bottom - dock) });

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

      // Bottom of the page: collect the food. Top: take it inside, and a
      // replacement turns up in the larder.
      const atBottom = progress >= 1 - EDGE;
      const atTop = progress <= EDGE;

      if (atBottom && !carrying) {
        carrying = true;
        gsap.set(held, { opacity: 1 });
      }
      if (atTop && carrying) {
        carrying = false;
        gsap.set(held, { opacity: 0 });
      }

      // Both props fade with distance from their own end of the track, driven
      // straight off scroll position rather than a tween, so they follow the
      // finger and cannot be left half-faded if frames stop. The larder stays
      // empty for as long as the rat is holding its contents.
      const near = (distance: number) => Math.min(1, Math.max(0, 1 - distance / NEAR));
      gsap.set(house, { opacity: near(progress) });
      gsap.set(food, { opacity: carrying ? 0 : near(1 - progress) });

      // Tucked inside the house at the very top; the window lights up instead.
      if (atTop !== home) {
        home = atTop;
        gsap.set(el, { opacity: home ? 0 : 1 });
        gsap.set(lit, { opacity: home ? 1 : 0 });
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

    // The page is not its final height on first paint — fonts swap, the canvas
    // mounts, images land. Progress divides by that height, so without watching
    // it the rat is placed against a stale total and then stays there, since
    // nothing scrolled to correct it.
    const ro = new ResizeObserver(update);
    ro.observe(document.body);

    return () => {
      clearTimeout(idle);
      scurry.kill();
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const box = "h-[22px] w-[22px] sm:h-[30px] sm:w-[30px]";
  // NAV_CENTER minus half the box, per breakpoint. Expressed in CSS rather than
  // applied by the effect so the very first paint already has the house — and the
  // rat's dock — level with the theme toggle.
  const dock = "top-[21px] sm:top-[17px]";

  return (
    <div
      aria-hidden="true"
      // Above the header (z-75): the track runs behind the navbar at the top of
      // the page, and an indicator that vanishes at one end of its own range is
      // worse than no indicator. Still below the mobile menu panel (z-85), which
      // it must never float over. See Navbar for the full order.
      // The width has to be explicit: every child is absolutely positioned, so a
      // fixed element sized by its content would shrink to zero and push them
      // off the right edge of the screen.
      className="pointer-events-none fixed inset-y-0 right-3 z-[80] block w-[22px] sm:right-5 sm:w-[30px]"
    >
      {/* Home, at the top of the track */}
      <div ref={hut} className={`absolute inset-x-0 ${dock} ${box}`}>
        <svg viewBox="0 0 24 24" className="h-full w-full text-muted-foreground">
          <path
            d="M12 3 L22 11 L19.5 11 L19.5 21 L4.5 21 L4.5 11 L2 11 Z"
            fill="currentColor"
            opacity={0.35}
          />
          <path
            d="M12 3 L22 11 L19.5 11 L19.5 21 L4.5 21 L4.5 11 L2 11 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinejoin="round"
          />
          {/* doorway the rat disappears into */}
          <path d="M9.5 21 L9.5 15 Q12 12.6 14.5 15 L14.5 21 Z" className="fill-background" />
          <rect ref={window_} x={10.4} y={16.4} width={3.2} height={3.2} rx={0.6} className="fill-accent" />
        </svg>
      </div>

      {/* Larder, at the bottom of the track */}
      {/* Larder and rat both start hidden in the markup: every load now begins at
          the top of the page, where the rat is indoors and no food is out yet.
          Left to their defaults they flash on screen, in the wrong place, until
          the effect runs. */}
      <div
        ref={larder}
        className={`absolute inset-x-0 ${box}`}
        style={{ bottom: INSET, opacity: 0 }}
      >
        {/* Same wedge, same yellow as the one the rat carries off — it has to
            read as the very object that gets picked up, not a different prop. */}
        <svg viewBox="0 0 24 24" className="h-full w-full">
          <path d="M3 17 L20 8.5 L21 12.5 Q12.5 14.5 12 20 Z" fill={CHEESE} />
          <circle cx={8} cy={16.6} r={1.15} className="fill-background" />
          <circle cx={13} cy={14.6} r={0.9} className="fill-background" />
          <circle cx={17.2} cy={11.8} r={0.75} className="fill-background" />
        </svg>
      </div>

      {/* The rat itself */}
      <div ref={wrap} className={`absolute inset-x-0 ${dock} ${box}`} style={{ opacity: 0 }}>
        <svg
          viewBox="0 0 40 26"
          className={`block overflow-visible text-accent ${box}`}
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
            {/* The cheese it carries home, clamped in its jaws. Deliberately not
                currentColor: in the rat's own accent it merged into the snout
                and read as part of the silhouette rather than as cargo. The
                background-coloured stroke keeps that edge separated. */}
            <g ref={cheese} opacity={0}>
              <path
                d="M34.5 5 L48 12 L34.5 19 Z"
                fill={CHEESE}
                className="stroke-background"
                strokeWidth={1.4}
                strokeLinejoin="round"
              />
              <circle cx={38.5} cy={12} r={1.3} className="fill-background" />
              <circle cx={42.5} cy={12.8} r={0.95} className="fill-background" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
