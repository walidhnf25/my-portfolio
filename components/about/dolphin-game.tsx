"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useI18n } from "@/components/providers/LocaleProvider";

/* ------------------------------------------------------------------ *
 * Dolphin Dash — a Chrome-Dino-style runner, set in the aquarium.
 *
 * A dolphin swims along the surface; buoys and fishing nets drift in from
 * the right and you leap over them. One input: Space / ↑ / W / tap.
 *
 * Everything lives in a mutable `Game` object (not React state), because it
 * changes 60 times a second. React only hears about the four status changes
 * that need a different overlay (idle / playing / paused / over).
 * ------------------------------------------------------------------ */

// Logical canvas size. The canvas scales to its container, drawing is in these units.
const W = 560;
const H = 220;
const SURFACE = 148; // y of the waterline
const DX = 96; // the dolphin's fixed x

const GRAVITY = 2400; // px/s²
const JUMP_V = 720; // px/s, upward → ~108px apex, ~0.6s in the air
const BASE_SPEED = 300;
const MAX_SPEED = 640;
const BEST_KEY = "dolphin-dash:best";

type Status = "idle" | "playing" | "paused" | "over";
type Kind = "buoy" | "net" | "pair";
type Obstacle = { kind: Kind; x: number; w: number; h: number };
type Drop = { x: number; y: number; vx: number; vy: number; life: number };
type Bubble = { x: number; y: number; r: number; v: number };

interface Game {
  status: Status;
  time: number; // seconds, drives ambient motion
  dist: number;
  speed: number;
  h: number; // dolphin height above the waterline
  vh: number; // vertical velocity, up is positive
  buffer: number; // seconds left on a jump pressed just before landing
  overAt: number; // performance.now() of the crash, to ignore the mashing that follows
  gapLeft: number; // distance until the next obstacle spawns
  obstacles: Obstacle[];
  drops: Drop[];
  bubbles: Bubble[];
  best: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function createGame(): Game {
  return {
    status: "idle",
    time: 0,
    dist: 0,
    speed: BASE_SPEED,
    h: 0,
    vh: 0,
    buffer: 0,
    overAt: 0,
    gapLeft: 320,
    obstacles: [],
    drops: [],
    bubbles: Array.from({ length: 16 }, () => ({
      x: rand(0, W),
      y: rand(SURFACE + 8, H),
      r: rand(1, 3),
      v: rand(8, 22),
    })),
    best: 0,
  };
}

const score = (g: Game) => Math.floor(g.dist / 10);

function splash(g: Game, strength: number) {
  for (let i = 0; i < 9; i++) {
    g.drops.push({
      x: DX + rand(-14, 14),
      y: SURFACE,
      vx: rand(-70, 70),
      vy: -rand(90, 90 + strength),
      life: rand(0.35, 0.7),
    });
  }
}

function jump(g: Game) {
  g.vh = JUMP_V;
  g.h = 0.01; // off the surface, so the next step treats the dolphin as airborne
  splash(g, 120);
}

function spawn(g: Game) {
  const roll = Math.random();
  const o: Obstacle =
    roll < 0.45
      ? { kind: "buoy", x: W + 24, w: 20, h: 26 }
      : roll < 0.75
        ? { kind: "net", x: W + 24, w: 22, h: 52 }
        : { kind: "pair", x: W + 24, w: 56, h: 26 };
  g.obstacles.push(o);
  g.gapLeft = 280 + rand(0, 240) + g.speed * 0.45;
}

/** Advance the simulation. Returns true if the dolphin hit something. */
function step(g: Game, dt: number): boolean {
  g.speed = Math.min(MAX_SPEED, BASE_SPEED + score(g) * 0.45);
  g.dist += g.speed * dt;

  // Vertical motion
  if (g.h > 0) {
    g.vh -= GRAVITY * dt;
    g.h += g.vh * dt;
    if (g.h <= 0) {
      g.h = 0;
      g.vh = 0;
      splash(g, 60);
      if (g.buffer > 0) jump(g); // a press that came a hair early still counts
    }
  }
  g.buffer = Math.max(0, g.buffer - dt);

  // Obstacles
  g.gapLeft -= g.speed * dt;
  if (g.gapLeft <= 0) spawn(g);
  for (const o of g.obstacles) o.x -= g.speed * dt;
  g.obstacles = g.obstacles.filter((o) => o.x + o.w > -10);

  // Collision: a forgiving box around the body against each obstacle's box.
  const cy = SURFACE - g.h;
  const dl = DX - 24;
  const dr = DX + 24;
  const dt_ = cy - 7;
  const db = cy + 7;
  for (const o of g.obstacles) {
    const ol = o.x + 3;
    const or = o.x + o.w - 3;
    const ot = SURFACE - o.h + 2;
    const ob = SURFACE + 4;
    if (dr > ol && dl < or && db > ot && dt_ < ob) return true;
  }
  return false;
}

/** Ambient motion that runs in every state: drops, bubbles. */
function ambient(g: Game, dt: number, reduce: boolean) {
  if (!reduce) g.time += dt;
  for (const d of g.drops) {
    d.vy += 700 * dt;
    d.x += d.vx * dt;
    d.y += d.vy * dt;
    d.life -= dt;
  }
  g.drops = g.drops.filter((d) => d.life > 0 && d.y < SURFACE + 4);
  if (reduce) return;
  const drift = g.status === "playing" ? g.speed * 0.25 : 14;
  for (const b of g.bubbles) {
    b.y -= b.v * dt;
    b.x -= drift * dt;
    if (b.y < SURFACE + 4 || b.x < -4) {
      b.y = rand(H - 20, H + 4);
      b.x = rand(0, W);
    }
  }
}

/* ------------------------------ drawing ----------------------------- */

/** Colours for the canvas. Dark is the deep sea at night; light is shallow water by day. */
interface Palette {
  night: boolean; // night: moon and stars; day: the sun
  skyTop: string; skyBottom: string;
  waterTop: string; waterBottom: string;
  tint: string; // translucent water drawn over the dolphin's submerged half
  shaft: string; bubble: string; surface: string; spray: string;
  netMesh: string; netPole: string;
  dolphin: { fluke: string; body: string; belly: string; facet: string; flipper: string; eye: string };
}

const DARK: Palette = {
  night: true,
  skyTop: "#060e22", skyBottom: "#123461",
  waterTop: "#0f5f7e", waterBottom: "#050f1d",
  tint: "rgba(8, 60, 90, 0.42)",
  shaft: "rgba(94, 234, 212, 0.06)", bubble: "rgba(190, 240, 245, 0.35)",
  surface: "rgba(94, 234, 212, 0.75)", spray: "rgba(235, 250, 252, 0.8)",
  netMesh: "rgba(235, 245, 248, 0.45)", netPole: "#d8c28a",
  dolphin: { fluke: "#1c6378", body: "#3a9bb2", belly: "#c4ecf0", facet: "#5cc0d3", flipper: "#2a7f96", eye: "#06222c" },
};

const LIGHT: Palette = {
  night: false,
  skyTop: "#cfeef2", skyBottom: "#eefafa",
  waterTop: "#4fc1c4", waterBottom: "#1f7f93",
  tint: "rgba(18, 110, 130, 0.30)",
  shaft: "rgba(255, 255, 255, 0.20)", bubble: "rgba(255, 255, 255, 0.55)",
  surface: "rgba(255, 255, 255, 0.9)", spray: "rgba(22, 120, 140, 0.85)",
  netMesh: "rgba(20, 70, 85, 0.5)", netPole: "#a07f3c",
  dolphin: { fluke: "#15566b", body: "#2a86a0", belly: "#e8f8fa", facet: "#4db3c8", flipper: "#1f6f86", eye: "#06222c" },
};

/** next-themes puts "light" or "dark" on <html>; dark is the site default. */
const currentPalette = (): Palette =>
  document.documentElement.classList.contains("light") ? LIGHT : DARK;

const waveY = (x: number, t: number) =>
  SURFACE + Math.sin(x * 0.03 + t * 2) * 2.4 + Math.sin(x * 0.071 - t * 1.3) * 1.3;

function waterPath(ctx: CanvasRenderingContext2D, t: number) {
  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 8) ctx.lineTo(x, waveY(x, t));
  ctx.lineTo(W, H);
  ctx.closePath();
}

function poly(ctx: CanvasRenderingContext2D, pts: number[][], fill: string) {
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

// Low-poly dolphin, facing right, centred on its body.
const BODY = [[36, 2], [24, -5], [14, -10], [-2, -12], [-18, -8], [-30, -3], [-30, 1], [-16, 7], [2, 9], [22, 6], [30, 5]];
const BELLY = [[36, 2], [30, 5], [22, 6], [2, 9], [-16, 7], [-30, 1], [-16, 2], [0, 3], [20, 2]];
const BACK_FACET = [[14, -10], [-2, -12], [4, -4]];
const DORSAL = [[-2, -11], [-13, -24], [-15, -9]];
const FLIPPER = [[8, 6], [-3, 17], [-1, 5]];

function drawDolphin(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, t: number, c: Palette["dolphin"]) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Tail flukes beat from the tail stock.
  ctx.save();
  ctx.translate(-30, -1);
  ctx.rotate(Math.sin(t * 10) * 0.3);
  poly(ctx, [[0, 0], [-13, -9], [-9, 0], [-13, 8]], c.fluke);
  ctx.restore();

  poly(ctx, DORSAL, c.fluke);
  poly(ctx, BODY, c.body);
  poly(ctx, BELLY, c.belly);
  poly(ctx, BACK_FACET, c.facet);
  poly(ctx, FLIPPER, c.flipper);

  // eye
  ctx.fillStyle = c.eye;
  ctx.beginPath();
  ctx.arc(21, -3, 1.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBuoy(ctx: CanvasRenderingContext2D, x: number, y: number, h: number, w: number) {
  // body
  poly(ctx, [[x + 3, y], [x + w - 3, y], [x + w, y - h * 0.6], [x + w / 2, y - h], [x, y - h * 0.6]], "#f0443d");
  // white band
  poly(ctx, [[x + 1, y - h * 0.45], [x + w - 1, y - h * 0.45], [x + w - 2, y - h * 0.7], [x + 2, y - h * 0.7]], "#f5f9fa");
  // mast
  ctx.fillStyle = "#cbd5dc";
  ctx.fillRect(x + w / 2 - 1, y - h - 7, 2, 8);
}

function drawNet(ctx: CanvasRenderingContext2D, x: number, y: number, h: number, w: number, p: Palette) {
  // mesh
  ctx.strokeStyle = p.netMesh;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i <= 4; i++) {
    const yy = y - (h * i) / 4;
    ctx.moveTo(x + 2, yy);
    ctx.lineTo(x + w - 2, yy);
  }
  for (let i = 0; i <= 3; i++) {
    const xx = x + 2 + ((w - 4) * i) / 3;
    ctx.moveTo(xx, y);
    ctx.lineTo(xx, y - h);
  }
  ctx.stroke();
  // poles
  ctx.fillStyle = p.netPole;
  ctx.fillRect(x, y - h - 2, 3, h + 8);
  ctx.fillRect(x + w - 3, y - h - 2, 3, h + 8);
}

// Fixed star positions (x, y, size, twinkle phase): deterministic, so they never jump.
const STARS = Array.from({ length: 26 }, (_, i) => {
  const r = (n: number) => {
    const v = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };
  return { x: r(1) * W, y: r(2) * (SURFACE - 26), s: 0.6 + r(3) * 1.1, ph: r(4) * Math.PI * 2 };
});

function drawNightSky(ctx: CanvasRenderingContext2D, t: number) {
  for (const st of STARS) {
    ctx.globalAlpha = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.6 + st.ph));
    ctx.fillStyle = "#e8f0ff";
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.s, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Moon, with a soft halo.
  const mx = W - 78;
  const my = 38;
  const halo = ctx.createRadialGradient(mx, my, 6, mx, my, 46);
  halo.addColorStop(0, "rgba(190, 215, 255, 0.45)");
  halo.addColorStop(1, "rgba(190, 215, 255, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(mx - 50, my - 50, 100, 100);
  // Crescent: clip out a bite (a hole in the clip region, via the opposite winding
  // direction), then fill the full disc. Painting a "sky-coloured" circle over the
  // moon would leave a visible dark disc against the halo.
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, W, H);
  ctx.arc(mx + 6, my - 3, 11, 0, Math.PI * 2, true);
  ctx.clip();
  ctx.fillStyle = "#eef3ff";
  ctx.beginPath();
  ctx.arc(mx, my, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** Day sky: the sun sits where the moon does at night, with a warm halo and slowly turning rays. */
function drawDaySky(ctx: CanvasRenderingContext2D, t: number) {
  const sx = W - 78;
  const sy = 38;

  const halo = ctx.createRadialGradient(sx, sy, 8, sx, sy, 62);
  halo.addColorStop(0, "rgba(255, 226, 120, 0.6)");
  halo.addColorStop(1, "rgba(255, 226, 120, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(sx - 64, sy - 64, 128, 128);

  // Rays: 12 short tapered spokes, turning slowly.
  ctx.save();
  ctx.translate(sx, sy);
  ctx.rotate(t * 0.12);
  ctx.fillStyle = "rgba(255, 196, 61, 0.85)";
  for (let i = 0; i < 12; i++) {
    ctx.rotate(Math.PI / 6);
    ctx.beginPath();
    ctx.moveTo(-2, -19);
    ctx.lineTo(2, -19);
    ctx.lineTo(0.8, -27);
    ctx.lineTo(-0.8, -27);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Disc, with a paler core so it reads as lit rather than flat.
  const disc = ctx.createRadialGradient(sx - 3, sy - 3, 2, sx, sy, 15);
  disc.addColorStop(0, "#fff3b0");
  disc.addColorStop(1, "#ffc83d");
  ctx.fillStyle = disc;
  ctx.beginPath();
  ctx.arc(sx, sy, 15, 0, Math.PI * 2);
  ctx.fill();
}

function draw(ctx: CanvasRenderingContext2D, g: Game) {
  const t = g.time;
  const p = currentPalette();

  // Sky
  const sky = ctx.createLinearGradient(0, 0, 0, SURFACE);
  sky.addColorStop(0, p.skyTop);
  sky.addColorStop(1, p.skyBottom);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  if (p.night) drawNightSky(ctx, t);
  else drawDaySky(ctx, t);

  // Water body
  const water = ctx.createLinearGradient(0, SURFACE, 0, H);
  water.addColorStop(0, p.waterTop);
  water.addColorStop(1, p.waterBottom);
  waterPath(ctx, t);
  ctx.fillStyle = water;
  ctx.fill();

  // Light shafts
  ctx.save();
  waterPath(ctx, t);
  ctx.clip();
  ctx.fillStyle = p.shaft;
  for (let i = 0; i < 4; i++) {
    const sx = ((i * 170 + t * 14) % (W + 120)) - 60;
    ctx.beginPath();
    ctx.moveTo(sx, SURFACE);
    ctx.lineTo(sx + 34, SURFACE);
    ctx.lineTo(sx - 26, H);
    ctx.lineTo(sx - 70, H);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Bubbles
  ctx.fillStyle = p.bubble;
  for (const b of g.bubbles) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Obstacles, sitting on the swell
  for (const o of g.obstacles) {
    const y = waveY(o.x + o.w / 2, t) + 2;
    if (o.kind === "net") drawNet(ctx, o.x, y, o.h, o.w, p);
    else if (o.kind === "buoy") drawBuoy(ctx, o.x, y, o.h, o.w);
    else {
      drawBuoy(ctx, o.x, y, o.h, 20);
      drawBuoy(ctx, o.x + 36, y, o.h, 20);
    }
  }

  // Dolphin: tilts with its vertical speed, rides the swell when swimming.
  const swimming = g.h <= 0;
  const bob = swimming ? Math.sin(t * 4) * 1.6 : 0;
  const angle = swimming ? Math.cos(DX * 0.03 + t * 2) * 0.06 : Math.max(-0.7, Math.min(0.75, -g.vh / 900));
  drawDolphin(ctx, DX, SURFACE - g.h + bob, angle, t + g.dist * 0.01, p.dolphin);

  // Front water: tints whatever is below the line, so the dolphin reads as half-submerged.
  waterPath(ctx, t);
  ctx.fillStyle = p.tint;
  ctx.fill();

  // Surface line
  ctx.beginPath();
  for (let x = 0; x <= W; x += 8) {
    if (x) ctx.lineTo(x, waveY(x, t));
    else ctx.moveTo(x, waveY(x, t));
  }
  ctx.strokeStyle = p.surface;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Spray
  ctx.fillStyle = p.spray;
  for (const d of g.drops) {
    ctx.globalAlpha = Math.min(1, d.life * 2.5);
    ctx.beginPath();
    ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

/* ----------------------------- component ---------------------------- */

const pad = (n: number) => String(n).padStart(5, "0");

export function DolphinGame() {
  const { t } = useI18n();
  const g = t.about.game;
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const bestRef = useRef<HTMLSpanElement>(null);
  const pressRef = useRef<() => void>(() => {});
  const blurRef = useRef<() => void>(() => {});
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = !!reduce;
  }, [reduce]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const game = createGame();
    try {
      game.best = Number(localStorage.getItem(BEST_KEY)) || 0;
    } catch {
      // Storage blocked (private mode): the best score just won't persist.
    }

    const hud = () => {
      if (scoreRef.current) scoreRef.current.textContent = pad(score(game));
      if (bestRef.current) bestRef.current.textContent = pad(game.best);
    };
    hud();

    const setBoth = (s: Status) => {
      game.status = s;
      setStatus(s);
    };

    pressRef.current = () => {
      if (game.status === "playing") {
        if (game.h <= 0) jump(game);
        else game.buffer = 0.12;
        return;
      }
      if (game.status === "paused") {
        setBoth("playing");
        return;
      }
      // idle or over: start a fresh run (ignoring presses right after a crash)
      if (game.status === "over" && performance.now() - game.overAt < 450) return;
      Object.assign(game, createGame(), { best: game.best, status: "playing" as Status });
      setStatus("playing");
      jump(game);
      hud();
    };
    blurRef.current = () => {
      if (game.status === "playing") setBoth("paused");
    };

    // Size the backing store to the displayed size, for a crisp canvas on any screen.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.round((width * H) / W);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    let last = 0;
    let visible = false;

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      if (game.status === "playing") {
        if (step(game, dt)) {
          game.overAt = performance.now();
          if (score(game) > game.best) {
            game.best = score(game);
            try {
              localStorage.setItem(BEST_KEY, String(game.best));
            } catch {
              // ignore
            }
          }
          setBoth("over");
        }
        hud();
      }
      ambient(game, dt, reduceRef.current);

      ctx.setTransform(canvas.width / W, 0, 0, canvas.width / W, 0, 0);
      draw(ctx, game);
      raf = requestAnimationFrame(frame);
    };

    // Only run while on screen: a canvas nobody can see should not burn the battery.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
      // Scrolled away mid-run: hold the game until the reader comes back and clicks.
      if (!visible && game.status === "playing") setBoth("paused");
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
      e.preventDefault(); // Space would otherwise scroll the page
      if (!e.repeat) pressRef.current();
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-accent/5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-accent sm:text-xs sm:tracking-[0.18em]">
          {g.title}
        </span>
        <span className="whitespace-nowrap font-mono text-[10px] tracking-wide text-muted-foreground sm:text-[11px] sm:tracking-wider">
          {g.score} <span ref={scoreRef} className="text-accent">00000</span>
          <span className="mx-1.5 text-border sm:mx-2">·</span>
          {g.best} <span ref={bestRef} className="text-accent">00000</span>
        </span>
      </div>

      {/* Stage */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          tabIndex={0}
          role="application"
          aria-label={g.label}
          className="block aspect-[560/220] w-full cursor-pointer touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          onKeyDown={onKeyDown}
          onPointerDown={(e) => {
            e.currentTarget.focus({ preventScroll: true });
            pressRef.current();
          }}
          onBlur={() => blurRef.current()}
        />

        {status !== "playing" && (
          // Confined to the sky (the top two-thirds), so the water and the dolphin stay in view.
          <div className="pointer-events-none absolute inset-x-0 top-0 grid h-[64%] place-items-center px-3 text-center">
            <div>
              {status === "over" && (
                <p className="font-display text-lg font-bold text-slate-800 dark:text-white sm:text-2xl">{g.over}</p>
              )}
              <p className="mt-1 rounded-full bg-white/75 px-3 py-1 font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-teal-900 shadow-sm dark:bg-black/35 dark:text-teal-100 dark:shadow-none sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.14em]">
                {status === "idle" ? g.start : status === "paused" ? g.paused : g.again}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Announces the result for screen-reader users, who cannot see the canvas. */}
      <p className="sr-only" aria-live="polite">
        {status === "over" ? g.over : ""}
      </p>
    </div>
  );
}
