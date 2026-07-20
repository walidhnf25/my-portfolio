"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function SceneBackground() {
  const { resolvedTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Skip the WebGL swarm on very small / low-power screens and for reduced motion.
    const small = window.matchMedia("(max-width: 640px)").matches;
    setEnabled(!reduce && !small);
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
          background: isDark
            ? "radial-gradient(120% 80% at 50% -10%, rgba(229,72,77,0.10), transparent 60%), radial-gradient(90% 60% at 100% 100%, rgba(229,72,77,0.06), transparent 55%)"
            : "radial-gradient(120% 80% at 50% -10%, rgba(218,41,28,0.08), transparent 60%)",
        }}
      />
      {/* Subtle grid */}
      <div className="bg-grid absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* 3D particle swarm */}
      {enabled && (
        <div className="absolute inset-0 opacity-90">
          <ParticleField accent={accent} dim={dim} />
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
