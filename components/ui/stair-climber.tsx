"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Foot/stand point (top-front corner) of each stair tread, bottom-left → top-right.
const STEPS = [
  { x: 46, y: 250 },
  { x: 98, y: 216 },
  { x: 150, y: 182 },
  { x: 202, y: 148 },
  { x: 250, y: 116 },
];
const hipY = (p: { y: number }) => p.y - 20;

const SPARK = "M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z";
const SPARKS = [
  { x: 150, y: 44, c: "fill-accent", s: 1 },
  { x: 205, y: 28, c: "fill-foreground", s: 0.7 },
  { x: 288, y: 38, c: "fill-accent", s: 0.85 },
  { x: 112, y: 66, c: "fill-accent", s: 0.7 },
  { x: 302, y: 94, c: "fill-foreground", s: 0.9 },
  { x: 176, y: 78, c: "fill-accent", s: 0.6 },
  { x: 224, y: 58, c: "fill-foreground", s: 0.7 },
  { x: 128, y: 30, c: "fill-accent", s: 0.8 },
];

export function StairClimber() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      gsap.set("#climber", { x: STEPS[0].x, y: hipY(STEPS[0]) });
      gsap.set(["#legFront", "#legBack", "#armFront", "#armBack"], {
        transformOrigin: "50% 0%",
      });
      gsap.set("#trophy", { opacity: 0, transformOrigin: "50% 100%" });
      gsap.set(".spark", { opacity: 0, scale: 0, transformOrigin: "50% 50%" });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        // Static "arrived & celebrating" pose.
        gsap.set("#climber", { x: STEPS[4].x, y: hipY(STEPS[4]) });
        gsap.set("#armFront", { rotation: -142 });
        gsap.set("#armBack", { rotation: 142 });
        gsap.set(["#trophy", ".spark"], { opacity: 1 });
        gsap.set(".spark", { scale: 1 });
        return;
      }

      // Legs always walk.
      const legOpts = { duration: 0.32, repeat: -1, yoyo: true, ease: "sine.inOut" as const };
      gsap.fromTo("#legFront", { rotation: -18 }, { rotation: 18, ...legOpts });
      gsap.fromTo("#legBack", { rotation: 18 }, { rotation: -18, ...legOpts });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });

      // Climb, swinging arms each step.
      STEPS.slice(1).forEach((p, i) => {
        tl.to("#climber", { x: p.x, y: hipY(p), duration: 0.5, ease: "power1.inOut" });
        tl.to("#armFront", { rotation: i % 2 ? 22 : -22, duration: 0.25, yoyo: true, repeat: 1 }, "<");
        tl.to("#armBack", { rotation: i % 2 ? -22 : 22, duration: 0.25, yoyo: true, repeat: 1 }, "<");
        tl.to("#climber", { y: "-=6", duration: 0.12, yoyo: true, repeat: 1, ease: "sine.out" }, "<");
      });

      // 🏆 Summit celebration — raise the trophy.
      tl.addLabel("cheer", "+=0.05");
      tl.to("#armFront", { rotation: -142, duration: 0.4, ease: "back.out(2)" }, "cheer");
      tl.to("#armBack", { rotation: 142, duration: 0.4, ease: "back.out(2)" }, "cheer");
      tl.fromTo(
        "#trophy",
        { opacity: 0, scale: 0.5, y: 6 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(2.5)" },
        "cheer+=0.12"
      );
      tl.to(
        ".spark",
        { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(3)", stagger: { each: 0.05, from: "random" } },
        "cheer+=0.15"
      );
      // celebratory hops, trophy wobble, twinkling stars
      tl.to("#climber", { y: "-=13", duration: 0.26, yoyo: true, repeat: 2, ease: "power2.out" }, "cheer+=0.25");
      tl.to("#trophy", { rotation: 9, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, "cheer+=0.3");
      tl.to(
        ".spark",
        { scale: 1.5, opacity: 0.45, duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut", stagger: { each: 0.06, from: "random" } },
        "cheer+=0.5"
      );

      // Hold, then reset for the loop.
      tl.to({}, { duration: 0.5 });
      tl.to(["#climber", ".spark"], { opacity: 0, duration: 0.4 });
      tl.set("#climber", { x: STEPS[0].x, y: hipY(STEPS[0]) });
      tl.set(["#armFront", "#armBack"], { rotation: 0 });
      tl.set("#trophy", { opacity: 0, rotation: 0 });
      tl.set(".spark", { scale: 0 });
      tl.to("#climber", { opacity: 1, duration: 0.4 });
    },
    { scope: root }
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 320 300"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="A stickman climbing stairs and raising a trophy after reaching the top"
    >
      {/* Guide dots up the stairs */}
      {STEPS.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y - 6} r={1.6} className="fill-accent" opacity={0.35} />
      ))}

      {/* Staircase */}
      <path
        d="M20 274 L20 250 L72 250 L72 216 L124 216 L124 182 L176 182 L176 148 L228 148 L228 116 L296 116 L296 274 Z"
        className="fill-muted stroke-border"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {STEPS.map((p, i) => (
        <line
          key={`t${i}`}
          x1={p.x - 26}
          y1={p.y}
          x2={p.x + 26}
          y2={p.y}
          className="stroke-accent"
          strokeWidth={2}
          opacity={0.25}
        />
      ))}

      {/* Goal flag — planted on the top stair, stays still */}
      <g>
        <line x1={280} y1={116} x2={280} y2={62} className="stroke-border" strokeWidth={3} strokeLinecap="round" />
        <path d="M280 64 L306 72 L280 80 Z" className="fill-accent" />
      </g>

      {/* Celebration sparkles */}
      {SPARKS.map((sp, i) => (
        <path key={i} className={`spark ${sp.c}`} d={SPARK} transform={`translate(${sp.x} ${sp.y}) scale(${sp.s})`} />
      ))}

      {/* Stickman */}
      <g id="climber" className="text-accent" stroke="currentColor" strokeWidth={4} strokeLinecap="round" fill="none">
        {/* legs */}
        <line id="legBack" x1={0} y1={0} x2={-9} y2={20} />
        <line id="legFront" x1={0} y1={0} x2={10} y2={20} />
        {/* torso */}
        <line x1={0} y1={0} x2={0} y2={-26} />
        {/* arms */}
        <line id="armBack" x1={0} y1={-24} x2={-11} y2={-11} />
        <line id="armFront" x1={0} y1={-24} x2={12} y2={-12} />
        {/* head */}
        <circle cx={0} cy={-33} r={7} fill="currentColor" stroke="none" />

        {/* raised trophy (hidden until the summit) */}
        <g id="trophy" fill="currentColor" stroke="none">
          {/* cup */}
          <path d="M-9 -67 L9 -67 L7 -58 Q0 -52 -7 -58 Z" />
          {/* handles */}
          <path
            d="M-9 -66 q-6 1 -5 5 q1 3 4 3"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <path
            d="M9 -66 q6 1 5 5 q-1 3 -4 3"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          {/* stem */}
          <rect x={-1.5} y={-53} width={3} height={5} />
          {/* base */}
          <path d="M-7 -48 L7 -48 L8 -44 L-8 -44 Z" />
        </g>
      </g>
    </svg>
  );
}
