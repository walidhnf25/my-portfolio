"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "@/lib/use-mounted";
import { SeaWater } from "./SeaWater";

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
      <SeaWater />

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
