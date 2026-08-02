"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Bubbles seeping up from the wreck. x/y are start points; each rises and fades.
const BUBBLES = [
  { x: 168, y: 176, r: 3, delay: 0 },
  { x: 182, y: 182, r: 2, delay: 1.1 },
  { x: 160, y: 172, r: 2.4, delay: 2.2 },
  { x: 176, y: 178, r: 1.7, delay: 3 },
  { x: 214, y: 196, r: 2, delay: 1.7 },
];

export function SunkenBoat() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return; // The markup already renders a settled, resting wreck.

      // The whole wreck lists gently, as if rocked by a slow current.
      gsap.to("#wreck", {
        rotation: "+=1.8",
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        transformOrigin: "50% 92%",
      });

      // Seaweed sways from its roots.
      gsap.to(".weed", {
        rotation: 11,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        transformOrigin: "50% 100%",
        stagger: 0.4,
      });

      // Bubbles rise and fade, each on its own loop.
      gsap.utils.toArray<SVGCircleElement>(".bubble").forEach((b, i) => {
        gsap.set(b, { transformOrigin: "50% 50%" });
        gsap.to(b, {
          keyframes: {
            opacity: [0, 0.65, 0.65, 0],
            y: [0, -45, -95, -135],
            x: [0, 3, -2, 2],
            scale: [0.5, 1, 1, 1.1],
          },
          duration: 4.2,
          ease: "sine.out",
          repeat: -1,
          delay: BUBBLES[i]?.delay ?? 0,
          repeatDelay: 0.4,
        });
      });

      // A curious fish drifts back and forth by the hull.
      gsap.fromTo(
        "#curiousFish",
        { x: 0 },
        { x: 22, y: -8, duration: 3.4, yoyo: true, repeat: -1, ease: "sine.inOut" }
      );
    },
    { scope: root }
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 320 300"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="A sunken wooden boat resting on the seabed, with bubbles rising and seaweed swaying"
    >
      {/* Seabed dune */}
      <path
        d="M0 300 L0 244 Q92 216 172 248 Q246 276 320 242 L320 300 Z"
        className="fill-muted stroke-border"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* Pebbles */}
      {[
        [60, 262],
        [104, 276],
        [210, 266],
        [268, 258],
        [150, 280],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2} className="fill-accent" opacity={0.3} />
      ))}

      {/* Seaweed clusters */}
      <g className="weed" style={{ transformBox: "fill-box" }}>
        <path
          d="M58 260 Q48 232 60 214 Q70 200 62 184"
          className="stroke-accent"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
          opacity={0.7}
        />
        <path
          d="M70 262 Q78 240 70 220"
          className="stroke-accent"
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
          opacity={0.5}
        />
      </g>
      <g className="weed" style={{ transformBox: "fill-box" }}>
        <path
          d="M272 250 Q282 226 270 206 Q262 192 272 178"
          className="stroke-accent"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
          opacity={0.7}
        />
      </g>

      {/* The wreck — listing to one side, resting on the dune. */}
      <g id="wreck" transform="translate(160 214) rotate(-9)">
        {/* mast: a snapped pole with a gap, leaning */}
        <line x1={-4} y1={-6} x2={-12} y2={-42} className="stroke-border" strokeWidth={5} strokeLinecap="round" />
        <line x1={-14} y1={-52} x2={-18} y2={-74} className="stroke-border" strokeWidth={4} strokeLinecap="round" />
        {/* yard (cross-spar) */}
        <line x1={-30} y1={-40} x2={8} y2={-46} className="stroke-border" strokeWidth={3} strokeLinecap="round" />
        {/* tattered sail hanging off the yard */}
        <path
          d="M-28 -40 L4 -45 L2 -20 L-8 -26 L-14 -16 L-22 -24 L-28 -14 Z"
          className="fill-foreground"
          opacity={0.14}
          stroke="none"
        />

        {/* hull: flat broken deck on top, rounded keel below */}
        <path
          d="M-62 -8 L-48 -8 L-42 -17 L-30 -8 L-14 -15 L2 -8 L18 -16 L34 -8 L50 -14 L62 -8
             Q56 22 0 27 Q-56 22 -62 -8 Z"
          className="fill-muted stroke-border"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {/* plank seams */}
        <path d="M-58 2 Q0 16 58 2" className="stroke-border" strokeWidth={1.5} fill="none" opacity={0.6} />
        <path d="M-52 12 Q0 24 52 12" className="stroke-border" strokeWidth={1.5} fill="none" opacity={0.5} />

        {/* portholes, faintly glowing */}
        <circle cx={-26} cy={2} r={5} className="fill-accent" opacity={0.35} />
        <circle cx={-26} cy={2} r={5} className="stroke-accent" strokeWidth={1.5} fill="none" opacity={0.8} />
        <circle cx={6} cy={4} r={5} className="fill-accent" opacity={0.35} />
        <circle cx={6} cy={4} r={5} className="stroke-accent" strokeWidth={1.5} fill="none" opacity={0.8} />

        {/* breach — a dark hole in the hull */}
        <path
          d="M28 2 Q40 -4 48 6 Q46 18 34 18 Q26 12 28 2 Z"
          className="fill-background stroke-border"
          strokeWidth={1.5}
        />
        {/* bowsprit at the prow */}
        <line x1={58} y1={-6} x2={78} y2={-16} className="stroke-border" strokeWidth={3} strokeLinecap="round" />
      </g>

      {/* Bubbles rising from the wreck */}
      {BUBBLES.map((b, i) => (
        <circle
          key={i}
          className="bubble fill-accent"
          cx={b.x}
          cy={b.y}
          r={b.r}
          opacity={0}
        />
      ))}

      {/* A curious little fish hovering by the wreck */}
      <g id="curiousFish" transform="translate(232 186)" className="text-accent">
        <ellipse cx={0} cy={0} rx={9} ry={6} className="fill-accent" />
        <path d="M8 0 L18 -6 L18 6 Z" className="fill-accent" />
        <circle cx={-4} cy={-1.5} r={1.6} className="fill-background" />
      </g>
    </svg>
  );
}
