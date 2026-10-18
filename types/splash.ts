import type { CSSProperties } from "react";

/** The four poses baked into `public/splash-screen.png`, in play order. */
export type SplashPose = "normal" | "fingerGuns" | "fingerGunsSmile" | "fistOnChest";

/** A crop window into the sprite sheet, in source pixels. */
export interface SpriteRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const SPRITE_SRC = "/splash-screen.png";

/** Measured from the file itself, not assumed. */
export const SPRITE_SIZE = { width: 1375, height: 1144 } as const;

/**
 * Framed on the subject, not on the grid.
 *
 * Quarter-crops would work geometrically — the gutters are transparent — but the
 * four subjects sit at different offsets inside their cells, so quartering makes
 * the portrait jump sideways on every crossfade.
 *
 * One common window instead, measured from the alpha channel and placed per
 * pose: centred horizontally, since the hands reach out different amounts, and
 * aligned to the *top* of each subject vertically. The head is what the eye
 * tracks, so holding it still is what makes four separate photographs read as
 * one person moving.
 *
 * 560x547 is the largest window that fits. Height is capped by the bottom row,
 * whose subjects run flush to the sheet's bottom edge — there is no room below
 * them to pad into. Width is capped by the gap between columns: the widest
 * placement reaches x 1319 with the sheet ending at 1375.
 *
 * Verified against every other pose's bounding box: no window overlaps a
 * neighbouring subject.
 */
const FRAME_W = 560;
const FRAME_H = 547;

const frameAt = (centerX: number, subjectTop: number): SpriteRect => ({
  x: Math.round(centerX - FRAME_W / 2),
  y: subjectTop,
  width: FRAME_W,
  height: FRAME_H,
});

export const POSE_RECTS: Record<SplashPose, SpriteRect> = {
  normal: frameAt(342, 24),
  fingerGuns: frameAt(1021, 24),
  fingerGunsSmile: frameAt(335, 597),
  fistOnChest: frameAt(1039, 589),
};

/**
 * Aspect ratio the portrait frame must use.
 *
 * The percentage form of `background-size` resolves against each axis of the
 * container independently, so the crop is only undistorted when the frame's
 * aspect matches the rect's. Deriving it here keeps the two from drifting apart.
 */
export const POSE_ASPECT = POSE_RECTS.normal.width / POSE_RECTS.normal.height;

/**
 * The single sprite utility: turn a pose into background properties.
 *
 * Every pose layer points at the same URL, so the browser decodes one bitmap and
 * shares it across all four layers — no duplicate images, no per-pose files.
 *
 * The percentages are the standard sprite mapping: scale the sheet so the rect
 * fills the frame, then position it so the rect's top-left lands on the frame's.
 */
export function poseBackground(pose: SplashPose): CSSProperties {
  const rect = POSE_RECTS[pose];
  const { width: sheetW, height: sheetH } = SPRITE_SIZE;

  return {
    backgroundImage: `url(${SPRITE_SRC})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${(sheetW / rect.width) * 100}% ${(sheetH / rect.height) * 100}%`,
    // Guard the divisions: a rect equal to the sheet would divide by zero.
    backgroundPosition: `${sheetW === rect.width ? 0 : (rect.x / (sheetW - rect.width)) * 100}% ${
      sheetH === rect.height ? 0 : (rect.y / (sheetH - rect.height)) * 100
    }%`,
  };
}

/**
 * Which caption shows under the portrait. The text itself is localized, so the
 * timeline only names it; SplashScreen resolves the lines from the dictionary
 * (the "role" caption stacks the profile's roles on separate lines).
 */
export type SplashCaptionId = "hi" | "role" | "welcome";

export interface SplashCaption {
  id: SplashCaptionId;
}

export interface SplashPhase {
  /** Milliseconds from splash start. */
  at: number;
  pose: SplashPose;
  caption: SplashCaption | null;
}

/**
 * The timeline from the brief, as data rather than scattered timeouts.
 *
 * Poses change on the phase boundary while the crossfade runs for 550ms either
 * side of it, so each gesture is already settled before the next one starts.
 */
export const SPLASH_PHASES: readonly SplashPhase[] = [
  { at: 0, pose: "normal", caption: null },
  { at: 800, pose: "fingerGuns", caption: { id: "hi" } },
  { at: 1800, pose: "fingerGunsSmile", caption: { id: "hi" } },
  {
    at: 2500,
    pose: "fistOnChest",
    caption: { id: "role" },
  },
  {
    at: 3500,
    pose: "fistOnChest",
    caption: { id: "welcome" },
  },
] as const;

/** Phase 6: the fade-out starts here and the component unmounts at the end. */
export const SPLASH_EXIT_AT = 4300;
export const SPLASH_EXIT_MS = 700;
export const SPLASH_TOTAL_MS = SPLASH_EXIT_AT + SPLASH_EXIT_MS;

export type SplashStatus = "pending" | "playing" | "exiting" | "done";
