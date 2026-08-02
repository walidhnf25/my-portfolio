"use client";

import { AnimatePresence, motion } from "framer-motion";
import { preload } from "react-dom";
import { useSplashScreen } from "@/hooks/useSplashScreen";
import {
  POSE_ASPECT,
  POSE_RECTS,
  SPLASH_EXIT_MS,
  SPRITE_SRC,
  poseBackground,
  type SplashPose,
} from "@/types/splash";

const POSES = Object.keys(POSE_RECTS) as SplashPose[];

/** Premium easing: no overshoot anywhere. Matches the CSS ease-in-out family. */
const EASE = [0.4, 0, 0.2, 1] as const;

/**
 * Fixed, hand-placed motes. Deliberately not Math.random(): the server and the
 * client would generate different positions and React would flag a mismatch.
 * Eight of them, at 4-9% opacity — present as texture, not as decoration.
 */
const MOTES = [
  { left: "18%", top: "24%", size: 3, delay: 0, drift: 14 },
  { left: "31%", top: "68%", size: 2, delay: 1.2, drift: -10 },
  { left: "44%", top: "12%", size: 2, delay: 2.4, drift: 12 },
  { left: "58%", top: "78%", size: 3, delay: 0.6, drift: -16 },
  { left: "69%", top: "33%", size: 2, delay: 1.8, drift: 10 },
  { left: "77%", top: "61%", size: 2, delay: 3, drift: -12 },
  { left: "86%", top: "20%", size: 3, delay: 2.1, drift: 15 },
  { left: "12%", top: "48%", size: 2, delay: 3.6, drift: -9 },
] as const;

export default function SplashScreen() {
  // React 19's preload: the sprite is the largest paint on this screen, and it
  // is referenced from CSS, where the preload scanner would not find it in time.
  preload(SPRITE_SRC, { as: "image", fetchPriority: "high" });

  const { status, phaseIndex, phase, finish } = useSplashScreen();

  if (status === "done") return null;

  const playing = status === "playing" || status === "exiting";

  return (
    <AnimatePresence onExitComplete={finish}>
      {status !== "exiting" && (
        <motion.div
          key="splash"
          // Theme tokens, not literal black: next-themes stamps the class before
          // first paint, so the overlay is already the right colour when it is
          // painted — no flash of the wrong scheme on a light-mode load.
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: SPLASH_EXIT_MS / 1000, ease: EASE }}
          aria-hidden="true"
        >
          {/* Same aquatic backdrop as the page sections (SceneBackground), minus
              the aquarium — no fish or creatures, just the water. Token-based
              color-mix instead of SceneBackground's JS-computed rgba so the tints
              track the theme in CSS with no hydration branch, while matching its
              values closely enough to read as the same water. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(130% 90% at 50% -15%, color-mix(in srgb, var(--accent) 13%, transparent), transparent 55%), radial-gradient(90% 70% at 15% 110%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 60%)",
            }}
          />
          {/* Caustic light shafts, identical to the sections' — CSS-animated, so
              they drift even where the JS render loop is throttled. */}
          <div
            className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
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

          {MOTES.map((m, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute rounded-full bg-foreground"
              style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.09, 0.04, 0.09, 0], y: [0, m.drift, 0] }}
              transition={{
                duration: 9,
                delay: m.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Portrait ------------------------------------------------- */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={playing ? { opacity: 1, scale: 1 } : {}}
            // Phase 1: the only scale move in the whole sequence.
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* Breathing and micro head drift are separate layers on purpose:
                two slow cycles of different lengths never line up, so the loop
                does not read as a loop. Both are transform-only, so they stay on
                the compositor and cost nothing per frame. */}
            <motion.div
              animate={{ scale: [1, 1.012, 1] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                animate={
                  phaseIndex === 4
                    ? // Phase 5: a single respectful nod, then hold.
                      { y: [0, 6, 0], rotate: 0 }
                    : { y: [0, -2.5, 0], rotate: [0, 0.35, 0, -0.35, 0] }
                }
                transition={
                  phaseIndex === 4
                    ? { duration: 0.9, ease: EASE }
                    : { duration: 6.2, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <div
                  // Capped on height as well as width. Sizing from width alone
                  // overflows a short viewport — a phone in landscape gave the
                  // portrait 386px plus a 112px caption inside 375px of screen,
                  // clipping the head off the top. The vh term is what keeps the
                  // whole composition on screen there; the others still win on
                  // every upright viewport, so nothing else changes.
                  className="relative w-[min(78vw,26rem,46vh)]"
                  style={{
                    aspectRatio: POSE_ASPECT,
                    // The sprite is pre-cut, so the portrait floats on its own
                    // silhouette — no frame, no vignette. All that is left to
                    // hide is the torso, which the sheet crops off with a hard
                    // horizontal edge; this fades that cut out instead.
                    maskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)",
                  }}
                >
                  {/* No theme-dependent grading any more: that existed only to
                      reconcile the grey backdrop with each scheme, and there is
                      no backdrop left to reconcile. The subject now reads
                      against either background on its own. */}
                  <div className="absolute inset-0">
                    {POSES.map((pose) => {
                      const active = pose === phase.pose;
                      return (
                        <motion.div
                          key={pose}
                          className="absolute inset-0"
                          style={poseBackground(pose)}
                          initial={false}
                          animate={{
                            opacity: active ? 1 : 0,
                            // Scale and blur carry the crossfade: the poses are
                            // separate photographs, so a straight opacity
                            // dissolve shows the subject jumping between frames.
                            // Softening the outgoing layer hides that.
                            scale: active ? 1 : 1.025,
                            filter: active ? "blur(0px)" : "blur(5px)",
                          }}
                          transition={{ duration: 0.55, ease: EASE }}
                        />
                      );
                    })}
                  </div>

                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Caption --------------------------------------------------- */}
          {/* Tall enough for the three-line role caption, so the block never
              spills past the reserved space and shifts the portrait. */}
          <div className="relative mt-6 flex h-28 w-full items-start justify-center px-6 sm:mt-10">
            {/* A true crossfade: the lines overlap while one fades out and the
                next fades in. Not `mode="wait"` — that holds the incoming line
                until the outgoing one reports its exit finished, so a stalled
                frame leaves the caption stuck on a stale line for good. */}
            <AnimatePresence>
              {phase.caption && (
                <motion.div
                  key={phase.caption.id}
                  className="absolute inset-x-0 text-center"
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {phase.caption.lines.map((line, i) => (
                    <p
                      key={line}
                      className={
                        i === 0
                          ? "font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                          : "mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
