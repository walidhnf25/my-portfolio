"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

// "off" for reduced motion, "lite" on phone-sized screens (fewer particles, dpr 1,
// no antialias), "full" everywhere else.
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

  // Before mount, the theme is unknown on the server. Render a deterministic
  // default (matching defaultTheme="dark") so SSR and first client render agree,
  // then switch to the real theme after mount — avoids a hydration mismatch.
  const isDark = !mounted || resolvedTheme !== "light";
  const accent = isDark ? "#e5484d" : "#da291c";
  const dim = isDark ? "#3a3a46" : "#d8d4cc";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          // Only a top-centered wash. An off-center glow tints translucent cards
          // unevenly by column, making identically-styled cards look different.
          background: isDark
            ? "radial-gradient(120% 80% at 50% -10%, rgba(229,72,77,0.10), transparent 60%)"
            : "radial-gradient(120% 80% at 50% -10%, rgba(218,41,28,0.08), transparent 60%)",
        }}
      />
      {/* Subtle grid */}
      <div className="bg-grid absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* 3D particle swarm */}
      {mode !== "off" && (
        <div className="absolute inset-0 opacity-90">
          {/* keyed on mode: dpr and antialias are read once at Canvas init, so a
              profile switch needs a fresh context rather than a re-render. */}
          <ParticleField key={mode} accent={accent} dim={dim} lite={mode === "lite"} />
        </div>
      )}

      {/* Fade to background at the bottom so content stays readable */}
      <div
        className="absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />
    </div>
  );
}
