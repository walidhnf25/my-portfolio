"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Aquarium = dynamic(() => import("./Aquarium"), { ssr: false });

// "off" for reduced motion, "lite" on phone-sized screens (fewer particles, dpr 1,
// no antialias, fish still present), "full" everywhere else.
type Mode = "off" | "lite" | "full";

export default function SceneBackground() {
  const { resolvedTheme } = useTheme();
  const [mode, setMode] = useState<Mode>("off");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Track the query rather than reading it once, so rotating a phone into
    // landscape upgrades the profile without needing a reload.
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setMode(mq.matches ? "lite" : "full");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Before mount the theme is unknown on the server; render the dark default so
  // SSR and first client render agree, then switch after mount.
  const isDark = !mounted || resolvedTheme !== "light";

  // Water tints — pulled toward the accent teal, darker/deeper in dark mode.
  const deep = isDark ? "rgba(6,24,32,0)" : "rgba(238,248,248,0)";
  const surface = isDark ? "rgba(45,212,191,0.14)" : "rgba(13,148,136,0.12)";
  const midGlow = isDark ? "rgba(20,110,120,0.18)" : "rgba(45,212,191,0.16)";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Deep-water wash: light filtering down from the surface. */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(130% 90% at 50% -15%, ${surface}, ${deep} 55%),
            radial-gradient(90% 70% at 15% 110%, ${midGlow}, ${deep} 60%)`,
        }}
      />

      {/* Caustic light shafts slanting down from the surface. CSS-animated, so the
          water keeps moving even where the JS render loop is throttled. */}
      <div
        className="absolute inset-0 opacity-70 mix-blend-screen [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
        style={{
          background: `repeating-linear-gradient(
            100deg,
            transparent 0px,
            transparent 60px,
            color-mix(in srgb, var(--accent) 10%, transparent) 90px,
            transparent 130px,
            transparent 190px
          )`,
          animation: "caustics-drift 14s ease-in-out infinite",
        }}
      />

      {/* Aquarium: plankton, bubbles, and the fish. */}
      {mode !== "off" && (
        <div className="absolute inset-0" style={{ animation: "water-breathe 9s ease-in-out infinite" }}>
          {/* keyed on mode: dpr and antialias are read once at Canvas init, so a
              profile switch needs a fresh context rather than a re-render. */}
          <Aquarium key={mode} lite={mode === "lite"} />
        </div>
      )}

      {/* Fade to the page background at the bottom so content stays readable. */}
      <div
        className="absolute inset-x-0 bottom-0 h-64"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
      />
    </div>
  );
}
