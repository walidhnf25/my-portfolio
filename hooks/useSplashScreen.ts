"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  SPLASH_EXIT_AT,
  SPLASH_EXIT_MS,
  SPLASH_PHASES,
  type SplashPhase,
  type SplashStatus,
} from "@/types/splash";

/** Replayed once per tab, not once per page view. */
const SEEN_KEY = "splash:seen";

/* ------------------------------------------------------------------ *
 * Gate
 *
 * Anything that animates on mount has to wait for the splash, or it plays
 * to completion behind an opaque overlay and the visitor never sees it.
 * A module-level store rather than context: the subscribers live in
 * unrelated trees, and this must be readable before React renders them.
 * ------------------------------------------------------------------ */

let settled = false;
const listeners = new Set<() => void>();

function subscribeGate(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Server render assumes the splash is still up, matching the markup we emit. */
const gateServerSnapshot = () => false;
const gateSnapshot = () => settled;

export function openSplashGate() {
  if (settled) return;
  settled = true;
  listeners.forEach((l) => l());
}

/**
 * True once the splash is out of the way (including when it never ran).
 * Intro animations should stay parked until this flips.
 */
export function useSplashGate(): boolean {
  return useSyncExternalStore(subscribeGate, gateSnapshot, gateServerSnapshot);
}

/* ------------------------------------------------------------------ *
 * Skip decision
 *
 * Read through useSyncExternalStore rather than assigned from an effect.
 * Both inputs are browser-only, so the server cannot know them; this is the
 * one pattern React sanctions for that — hydrate against the server snapshot,
 * then re-render once with the real one. Setting state in an effect instead
 * would mean an extra render and a visible frame of the wrong screen.
 *
 * The result is cached because getSnapshot must be referentially stable:
 * recomputing it on every call would spin React into a loop.
 * ------------------------------------------------------------------ */

let skipCache: boolean | null = null;

function skipSnapshot(): boolean {
  if (skipCache === null) {
    skipCache =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      sessionStorage.getItem(SEEN_KEY) === "1";
  }
  return skipCache;
}

/** The inputs cannot change mid-visit, so there is nothing to subscribe to. */
const subscribeSkip = () => () => {};
const skipServerSnapshot = () => false;

/* ------------------------------------------------------------------ */

export interface SplashController {
  status: SplashStatus;
  /** Index into SPLASH_PHASES. */
  phaseIndex: number;
  phase: SplashPhase;
  /** Called by the exit animation once it has finished painting. */
  finish: () => void;
}

/** Drives the splash timeline. */
export function useSplashScreen(): SplashController {
  const skip = useSyncExternalStore(subscribeSkip, skipSnapshot, skipServerSnapshot);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [finished, setFinished] = useState(false);
  const timers = useRef<number[]>([]);

  const status: SplashStatus =
    skip || finished ? "done" : exiting ? "exiting" : "playing";

  /**
   * Scroll lock, keyed on the splash actually being up.
   *
   * Deliberately its own effect: the component returns null once it is done but
   * never unmounts itself, so a lock released only by unmount cleanup is a lock
   * that is never released — the page stays frozen for the rest of the visit.
   * Keying on `active` means finishing re-runs the effect and frees it.
   */
  const active = status !== "done";
  useEffect(() => {
    if (!active) return;
    // Lenis drives window scroll, so hiding overflow on both elements is what
    // actually stops the page moving underneath the overlay.
    const { documentElement: html, body } = document;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [active]);

  useEffect(() => {
    if (skip) {
      // No fade: reduced motion asks for the destination, not a shorter journey.
      openSplashGate();
      return;
    }

    sessionStorage.setItem(SEEN_KEY, "1");

    const queue = timers.current;
    SPLASH_PHASES.forEach((phase, i) => {
      if (i === 0) return;
      queue.push(window.setTimeout(() => setPhaseIndex(i), phase.at));
    });
    queue.push(window.setTimeout(() => setExiting(true), SPLASH_EXIT_AT));
    // The gate opens with the fade, not after it: the hero should already be
    // moving as the overlay clears, otherwise there is a beat of dead air.
    queue.push(window.setTimeout(openSplashGate, SPLASH_EXIT_AT + SPLASH_EXIT_MS * 0.4));
    // Hard stop. Unmounting normally waits on the exit animation reporting back,
    // and that needs animation frames — which a backgrounded or throttled tab
    // may never deliver. Timers keep running there, so this one guarantees the
    // overlay comes off rather than sealing the site behind a black screen.
    queue.push(
      window.setTimeout(() => setFinished(true), SPLASH_EXIT_AT + SPLASH_EXIT_MS + 400)
    );

    return () => {
      queue.forEach(clearTimeout);
      queue.length = 0;
    };
  }, [skip]);

  const finish = useCallback(() => {
    setFinished(true);
    openSplashGate();
  }, []);

  return { status, phaseIndex, phase: SPLASH_PHASES[phaseIndex], finish };
}
