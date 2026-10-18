"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "@/lib/use-mounted";

const Aquarium = dynamic(() => import("./Aquarium"), { ssr: false });

// "off" for reduced motion, "lite" on phone-sized screens (fewer particles, dpr 1,
// no antialias, fish still present), "full" everywhere else.
type Mode = "off" | "lite" | "full";

const REDUCED = "(prefers-reduced-motion: reduce)";
const PHONE = "(max-width: 640px)";

// Track both queries rather than reading them once, so rotating a phone into
// landscape upgrades the profile without needing a reload.
function subscribeMode(onChange: () => void) {
  const queries = [window.matchMedia(REDUCED), window.matchMedia(PHONE)];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

function modeSnapshot(): Mode {
  if (window.matchMedia(REDUCED).matches) return "off";
  return window.matchMedia(PHONE).matches ? "lite" : "full";
}

export default function SceneBackground() {
  const { resolvedTheme } = useTheme();
  // The server cannot know the device, so it renders "off" and the client swaps in
  // the real mode right after hydration.
  const mode = useSyncExternalStore<Mode>(subscribeMode, modeSnapshot, () => "off");
  const mounted = useMounted();

  // Only the 3D lights and particle style need the theme in JS. Every other layer
  // below swaps through CSS (`light:` / `light:hidden`), so the right scene shows on
  // first paint with no flash while React hydrates.
  const day = mounted && resolvedTheme === "light";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* ------------------------------ NIGHT --------------------------------- */}

      {/* Night water: a deep navy that darkens toward the bottom. The last stop is
          --background, so the fade at the bottom is seamless. */}
      <div
        className="absolute inset-0 light:hidden"
        style={{
          background:
            "linear-gradient(to bottom, #0b2142 0%, #08182e 40%, #061220 75%, #050f1d 100%)",
        }}
      />

      {/* Bioluminescent haze: a faint teal glow pooling low in the water. */}
      <div
        className="absolute inset-0 light:hidden"
        style={{
          background:
            "radial-gradient(70% 45% at 20% 108%, rgba(45,212,191,0.16), rgba(45,212,191,0) 70%), radial-gradient(60% 40% at 88% 100%, rgba(56,189,248,0.10), rgba(56,189,248,0) 70%)",
        }}
      />

      {/* The moon, seen through the surface: a cool glare and a soft pale disc,
          up in the top-left (the sun is on the right by day). */}
      <div
        className="absolute inset-0 light:hidden"
        style={{
          background:
            "radial-gradient(50% 40% at 16% -10%, rgba(170,200,255,0.42), rgba(170,200,255,0) 72%), radial-gradient(70px 70px at 17% 3%, rgba(236,243,255,0.55), rgba(236,243,255,0) 100%)",
          animation: "moon-glow 10s ease-in-out infinite",
        }}
      />

      {/* Moonbeams: faint cool shafts slanting down, drifting slowly. CSS-animated, so
          the water keeps moving even where the JS render loop is throttled. */}
      <div
        className="absolute inset-0 opacity-70 mix-blend-screen light:hidden [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
        style={{
          background: `repeating-linear-gradient(
            100deg,
            transparent 0px,
            transparent 70px,
            rgba(150,185,255,0.085) 105px,
            transparent 150px,
            transparent 230px
          )`,
          animation: "caustics-drift 18s ease-in-out infinite",
        }}
      />

      {/* ------------------------------- DAY ---------------------------------- */}

      {/* Clear shallow water: bright at the surface, a little deeper below. The
          last stop is --background, so the fade at the bottom is seamless. */}
      <div
        className="absolute inset-0 hidden light:block"
        style={{
          background:
            "linear-gradient(to bottom, #e6f8fc 0%, #bfe9f3 20%, #9fdcec 55%, #86cfe3 100%)",
        }}
      />

      {/* The sun, just above the frame: a warm glare spilling down into the water. */}
      <div
        className="absolute inset-0 hidden light:block"
        style={{
          background:
            "radial-gradient(55% 42% at 80% -10%, rgba(255,246,208,0.95), rgba(255,246,208,0) 72%), radial-gradient(90% 26% at 50% 0%, rgba(255,255,255,0.7), rgba(255,255,255,0) 100%)",
          animation: "sun-pulse 8s ease-in-out infinite",
        }}
      />

      {/* Sunbeams through the surface: soft white shafts that drift and fade with depth. */}
      <div
        className="absolute inset-0 hidden opacity-80 light:block [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        style={{
          background: `repeating-linear-gradient(
            100deg,
            transparent 0px,
            transparent 70px,
            rgba(255,255,255,0.34) 105px,
            transparent 150px,
            transparent 230px
          )`,
          animation: "caustics-drift 16s ease-in-out infinite",
        }}
      />

      {/* Aquarium: plankton, bubbles, and the fish. */}
      {mode !== "off" && (
        <div className="aquarium-layer absolute inset-0">
          {/* keyed on mode: dpr and antialias are read once at Canvas init, so a
              profile switch needs a fresh context rather than a re-render. */}
          <Aquarium key={mode} lite={mode === "lite"} day={day} />
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
