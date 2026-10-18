"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Deterministic 0..1 hash. Pure (no Math.random), so it can seed positions during
 * render without tripping the linter's purity rule — and it varies by index.
 */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Pointer in normalized device coords (-1..1), tracked on `window`.
 *
 * The canvas is `pointer-events-none` (so it never blocks clicks), which means it
 * receives no pointer events and R3F's own `state.pointer` stays pinned at the
 * origin — nothing could follow the cursor. A window-level listener sidesteps
 * that. `active` stays false until the first real move, so before then the diver
 * wanders instead of parking dead-centre.
 */
const pointer = { x: 0, y: 0, active: false };

/* A cartoon eye: white ball + dark pupil + tiny catch-light. The pupil sits on the
   camera-facing side (+z) so the eye reads as looking at the viewer on every
   creature, whether it is seen front-on or in profile. */
function Eye({ position, size = 0.1 }: { position: [number, number, number]; size?: number }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[size, 14, 14]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, size * 0.72]}>
        <sphereGeometry args={[size * 0.55, 12, 12]} />
        <meshStandardMaterial color="#10242b" roughness={0.2} />
      </mesh>
      <mesh position={[size * 0.26, size * 0.32, size * 0.82]}>
        <sphereGeometry args={[size * 0.2, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Bubbles — points that rise, wobble, and wrap back to the bottom.
 * ------------------------------------------------------------------ */
function Bubbles({ count, color }: { count: number; color: string }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand(i * 3 + 1) - 0.5) * 20;
      positions[i * 3 + 1] = (rand(i * 3 + 2) - 0.5) * 16;
      positions[i * 3 + 2] = (rand(i * 3 + 3) - 0.5) * 8 - 2;
      speeds[i] = 0.25 + rand(i + 91) * 0.6;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, delta) => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    const arr = geo.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      arr[i * 3] += Math.sin(t * 0.6 + i) * 0.0025;
      if (arr[i * 3 + 1] > 8) {
        arr[i * 3 + 1] = -8;
        arr[i * 3] = (Math.random() - 0.5) * 20; // frame loop, not render — fine
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={color} size={0.1} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  );
}

/* ------------------------------------------------------------------ *
 * Plankton — faint far-back motes drifting, for depth.
 * ------------------------------------------------------------------ */
function Plankton({ count, color, day }: { count: number; color: string; day: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand(i * 3 + 17) - 0.5) * 24;
      arr[i * 3 + 1] = (rand(i * 3 + 29) - 0.5) * 18;
      arr[i * 3 + 2] = (rand(i * 3 + 41) - 0.5) * 6 - 4;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.012;
      ref.current.rotation.z -= delta * 0.006;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      {/* Night: faint glowing motes (additive). Day: additive blending would vanish on a
          bright background, so the motes become soft white drifting specks instead. */}
      <PointMaterial
        transparent
        color={color}
        size={day ? 0.07 : 0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={day ? 0.55 : 0.28}
        blending={day ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </Points>
  );
}

/* ------------------------------------------------------------------ *
 * Bioluminescence — night only. Soft cyan lights that drift up slowly and
 * pulse in and out, like glowing plankton disturbed by the current.
 * ------------------------------------------------------------------ */
function Glow({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds, phase } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand(i * 3 + 211) - 0.5) * 22;
      positions[i * 3 + 1] = (rand(i * 3 + 223) - 0.5) * 16;
      positions[i * 3 + 2] = (rand(i * 3 + 237) - 0.5) * 7 - 1.5;
      speeds[i] = 0.08 + rand(i + 251) * 0.18;
      phase[i] = rand(i + 263) * Math.PI * 2;
    }
    return { positions, speeds, phase };
  }, [count]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      arr[i * 3] += Math.sin(t * 0.5 + phase[i]) * 0.004;
      if (arr[i * 3 + 1] > 8) arr[i * 3 + 1] = -8;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    // One shared material, so the whole swarm breathes together, slowly.
    (pts.material as THREE.PointsMaterial).opacity = 0.55 + Math.sin(t * 0.9) * 0.25;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#7df9ff" size={0.2} sizeAttenuation depthWrite={false} opacity={0.6} blending={THREE.AdditiveBlending} />
    </Points>
  );
}

/* ------------------------------------------------------------------ *
 * A fish that swims its own looping path (no longer the pointer chaser —
 * the diver does that now). Faces its heading, flips to stay upright, wags.
 * ------------------------------------------------------------------ */
function Fish({ seed, body, fin, big = false }: { seed: number; body: string; fin: string; big?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const flip = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: body, flatShading: true, roughness: 0.6, metalness: 0.05 }), [body]);
  const finMat = useMemo(() => new THREE.MeshStandardMaterial({ color: fin, flatShading: true, roughness: 0.7, transparent: true, opacity: 0.92 }), [fin]);
  const cfg = useMemo(
    () => ({
      depthBase: big ? -0.6 : -1.5,
      depthRange: big ? 1.2 : 3,
      ease: (big ? 0.28 : 0.45) + rand(seed + 2) * 0.12,
      scale: (big ? 1.05 : 0.42) + rand(seed + 6) * (big ? 0.15 : 0.22),
    }),
    [seed, big]
  );
  const target = useRef(new THREE.Vector3());
  const prev = useRef(new THREE.Vector3());
  const ready = useRef(false);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const w = viewport.width;
    const h = viewport.height;
    if (!ready.current) {
      // Start scattered, then head somewhere. Seeded so it is stable per fish.
      g.position.set((rand(seed) - 0.5) * w * 0.85, (rand(seed + 1) - 0.5) * h * 0.75, cfg.depthBase);
      target.current.copy(g.position);
      prev.current.copy(g.position);
      ready.current = true;
    }
    // Wander: pick a fresh point anywhere on screen once the last one is reached,
    // so the fish roams the whole tank rather than looping a fixed path.
    if (g.position.distanceTo(target.current) < 0.7) {
      target.current.set((Math.random() - 0.5) * w * 0.92, (Math.random() - 0.5) * h * 0.82, cfg.depthBase - Math.random() * cfg.depthRange);
    }
    g.position.lerp(target.current, Math.min(1, delta * cfg.ease));
    // A little vertical shimmy so straight legs of the path still feel alive.
    g.position.y += Math.sin(t * 1.6 + seed) * 0.01;

    const vx = g.position.x - prev.current.x;
    const vy = g.position.y - prev.current.y;
    prev.current.copy(g.position);
    const speed = Math.hypot(vx, vy);
    if (speed > 0.0004) {
      const angle = Math.atan2(vy, vx);
      let d = angle - g.rotation.z;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      g.rotation.z += d * Math.min(1, delta * 4);
      if (flip.current) flip.current.scale.y += ((Math.cos(angle) < 0 ? -1 : 1) - flip.current.scale.y) * Math.min(1, delta * 6);
    }
    if (tail.current) tail.current.rotation.z = Math.sin(t * (big ? 8 : 11)) * (0.25 + Math.min(speed * 22, 0.4));
  });

  const r = big ? 0.55 : 0.4; // body radius
  return (
    <group ref={group} scale={cfg.scale}>
      <group ref={flip}>
        <mesh material={bodyMat} scale={[1.5, 1, 0.85]}>
          <icosahedronGeometry args={[r, big ? 1 : 0]} />
        </mesh>
        <group ref={tail} position={[-r * 1.45, 0, 0]}>
          <mesh material={bodyMat} position={[-r * 0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.32]}>
            <coneGeometry args={[r * 0.72, r * 1.2, 4]} />
          </mesh>
        </group>
        <mesh material={finMat} position={[0, r * 0.75, 0]} rotation={[0, 0, -0.15]} scale={[1, 1, 0.28]}>
          <coneGeometry args={[r * 0.38, r * 0.9, 3]} />
        </mesh>
        <mesh material={finMat} position={[r * 0.28, -r * 0.5, r * 0.5]} rotation={[0.5, 0, -0.7]} scale={[1, 1, 0.3]}>
          <coneGeometry args={[r * 0.28, r * 0.75, 3]} />
        </mesh>
        <Eye position={[r * 1.1, r * 0.28, r * 0.62]} size={big ? 0.11 : 0.08} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Jellyfish — a translucent bell that pulses and drifts, with a cute face.
 * ------------------------------------------------------------------ */
function Jellyfish({ seed, color, night }: { seed: number; color: string; night: boolean }) {
  const group = useRef<THREE.Group>(null);
  const dome = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const cfg = useMemo(
    () => ({ depth: -2 - rand(seed + 5) * 2.5, scale: 0.7 + rand(seed + 6) * 0.5, ease: 0.12 + rand(seed + 2) * 0.06 }),
    [seed]
  );
  const bell = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        // At night the bell glows from within: more emissive, a touch more opaque.
        opacity: night ? 0.55 : 0.42,
        flatShading: true,
        emissive: color,
        emissiveIntensity: night ? 1.1 : 0.3,
        roughness: 0.4,
        side: THREE.DoubleSide,
      }),
    [color, night]
  );
  const tentacleMat = useMemo(() => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: night ? 0.55 : 0.32 }), [color, night]);
  const tentacles = useMemo(() => Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2), []);
  const target = useRef(new THREE.Vector3());
  const ready = useRef(false);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const w = viewport.width;
    const h = viewport.height;
    if (!ready.current) {
      g.position.set((rand(seed) - 0.5) * w * 0.8, (rand(seed + 1) - 0.5) * h * 0.7, cfg.depth);
      target.current.copy(g.position);
      ready.current = true;
    }
    // Slow, roaming drift across the tank. Jellyfish don't rush.
    if (g.position.distanceTo(target.current) < 1) {
      target.current.set((Math.random() - 0.5) * w * 0.85, (Math.random() - 0.5) * h * 0.78, cfg.depth - Math.random() * 1.5);
    }
    g.position.lerp(target.current, Math.min(1, delta * cfg.ease));
    const pulse = 1 + Math.sin(t * 1.8 + seed) * 0.14;
    if (dome.current) dome.current.scale.set(pulse, 2 - pulse, pulse);
  });

  return (
    <group ref={group} scale={cfg.scale}>
      <mesh ref={dome} material={bell}>
        <sphereGeometry args={[0.6, 14, 10, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
      </mesh>
      {/* cute face */}
      <Eye position={[-0.18, 0.05, 0.5]} size={0.07} />
      <Eye position={[0.18, 0.05, 0.5]} size={0.07} />
      {tentacles.map((a, i) => (
        <mesh key={i} material={tentacleMat} position={[Math.cos(a) * 0.32, -0.5, Math.sin(a) * 0.32]} rotation={[0, 0, Math.sin(a) * 0.2]}>
          <cylinderGeometry args={[0.015, 0.03, 0.95, 5]} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Turtle — glides a slow horizontal arc, flippers flapping, with a face.
 * ------------------------------------------------------------------ */
function Turtle({ seed }: { seed: number }) {
  const group = useRef<THREE.Group>(null);
  const flip = useRef<THREE.Group>(null);
  const fFL = useRef<THREE.Mesh>(null);
  const fFR = useRef<THREE.Mesh>(null);
  const fBL = useRef<THREE.Mesh>(null);
  const fBR = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const shell = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2f9e8f", flatShading: true, roughness: 0.75 }), []);
  const skin = useMemo(() => new THREE.MeshStandardMaterial({ color: "#7fd8c6", flatShading: true, roughness: 0.7 }), []);
  const cfg = useMemo(
    () => ({ depth: -3.5 - rand(seed + 2) * 1.5, scale: 0.9 + rand(seed + 4) * 0.3, ease: 0.16 + rand(seed) * 0.06 }),
    [seed]
  );
  const target = useRef(new THREE.Vector3());
  const prev = useRef(new THREE.Vector3());
  const ready = useRef(false);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const w = viewport.width;
    const h = viewport.height;
    if (!ready.current) {
      g.position.set((rand(seed) - 0.5) * w * 0.8, (rand(seed + 1) - 0.5) * h * 0.6, cfg.depth);
      target.current.copy(g.position);
      prev.current.copy(g.position);
      ready.current = true;
    }
    // A turtle glides the whole tank, unhurried.
    if (g.position.distanceTo(target.current) < 1) {
      target.current.set((Math.random() - 0.5) * w * 0.88, (Math.random() - 0.5) * h * 0.72, cfg.depth - Math.random() * 1.2);
    }
    g.position.lerp(target.current, Math.min(1, delta * cfg.ease));
    const vx = g.position.x - prev.current.x;
    prev.current.copy(g.position);
    if (flip.current && Math.abs(vx) > 0.0003) flip.current.scale.x += ((vx < 0 ? -1 : 1) - flip.current.scale.x) * Math.min(1, delta * 4);
    const flap = Math.sin(t * 2.4) * 0.5;
    if (fFL.current) fFL.current.rotation.z = 0.3 + flap;
    if (fFR.current) fFR.current.rotation.z = 0.3 + flap;
    if (fBL.current) fBL.current.rotation.z = -0.3 - flap * 0.6;
    if (fBR.current) fBR.current.rotation.z = -0.3 - flap * 0.6;
  });

  return (
    <group ref={group} scale={cfg.scale}>
      <group ref={flip}>
        <mesh material={shell} scale={[1.3, 0.55, 1]}>
          <icosahedronGeometry args={[0.6, 1]} />
        </mesh>
        <mesh material={skin} position={[0.75, 0.05, 0]} scale={[1.2, 0.9, 0.9]}>
          <icosahedronGeometry args={[0.2, 0]} />
        </mesh>
        <Eye position={[0.9, 0.15, 0.13]} size={0.05} />
        <Eye position={[0.9, 0.15, -0.13]} size={0.05} />
        <mesh ref={fFL} material={skin} position={[0.35, -0.05, 0.5]} scale={[1, 0.3, 0.6]}>
          <coneGeometry args={[0.22, 0.6, 4]} />
        </mesh>
        <mesh ref={fFR} material={skin} position={[0.35, -0.05, -0.5]} scale={[1, 0.3, 0.6]}>
          <coneGeometry args={[0.22, 0.6, 4]} />
        </mesh>
        <mesh ref={fBL} material={skin} position={[-0.45, -0.05, 0.4]} scale={[1, 0.28, 0.5]}>
          <coneGeometry args={[0.16, 0.45, 4]} />
        </mesh>
        <mesh ref={fBR} material={skin} position={[-0.45, -0.05, -0.4]} scale={[1, 0.28, 0.5]}>
          <coneGeometry args={[0.16, 0.45, 4]} />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Seahorse — bobs and sways near the plants, snout and eye.
 * ------------------------------------------------------------------ */
function Seahorse({ seed, color }: { seed: number; color: string }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.65 }), [color]);
  const cfg = useMemo(
    () => ({ depth: -2.5 - rand(seed + 2) * 1.5, phase: rand(seed + 3) * Math.PI * 2, scale: 0.55 + rand(seed + 4) * 0.2, ease: 0.2 + rand(seed) * 0.08 }),
    [seed]
  );
  const target = useRef(new THREE.Vector3());
  const ready = useRef(false);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime + cfg.phase;
    const w = viewport.width;
    const h = viewport.height;
    if (!ready.current) {
      g.position.set((rand(seed) - 0.5) * w * 0.7, (rand(seed + 1) - 0.5) * h * 0.5, cfg.depth);
      target.current.copy(g.position);
      ready.current = true;
    }
    // Roams more of the tank now, still upright and bobbing as it goes.
    if (g.position.distanceTo(target.current) < 0.8) {
      target.current.set((Math.random() - 0.5) * w * 0.82, (Math.random() - 0.5) * h * 0.68, cfg.depth - Math.random() * 1.2);
    }
    g.position.lerp(target.current, Math.min(1, delta * cfg.ease));
    g.position.y += Math.sin(t * 1.4) * 0.012; // upright bob
    g.rotation.z = Math.sin(t * 0.9) * 0.12;
  });

  return (
    <group ref={group} scale={cfg.scale}>
      {/* body: tapered, leaning */}
      <mesh material={mat} position={[0, 0, 0]} rotation={[0, 0, 0.25]} scale={[0.7, 1, 0.7]}>
        <coneGeometry args={[0.32, 1.1, 6]} />
      </mesh>
      {/* head */}
      <mesh material={mat} position={[0.16, 0.62, 0]} scale={[1, 0.9, 0.9]}>
        <icosahedronGeometry args={[0.22, 0]} />
      </mesh>
      {/* snout */}
      <mesh material={mat} position={[0.42, 0.6, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.05, 0.09, 0.34, 6]} />
      </mesh>
      {/* curled tail */}
      <mesh material={mat} position={[-0.14, -0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.06, 6, 10, Math.PI * 1.5]} />
      </mesh>
      {/* dorsal fin */}
      <mesh material={mat} position={[-0.28, 0.05, 0]} rotation={[0, 0, 0.4]} scale={[1, 1, 0.3]}>
        <coneGeometry args={[0.12, 0.4, 3]} />
      </mesh>
      <Eye position={[0.28, 0.66, 0.16]} size={0.06} />
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Starfish — sits on the floor, breathes and turns slowly, smiling.
 * ------------------------------------------------------------------ */
function Starfish({ seed, color }: { seed: number; color: string }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.8 }), [color]);
  const arms = useMemo(() => Array.from({ length: 5 }, (_, i) => (i / 5) * Math.PI * 2), []);
  const cfg = useMemo(() => ({ x: (rand(seed) - 0.5) * 1.7, phase: rand(seed + 1) * Math.PI * 2, depth: -4 - rand(seed + 2), scale: 0.5 + rand(seed + 3) * 0.25 }), [seed]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime + cfg.phase;
    g.position.set(cfg.x * viewport.width * 0.5, -viewport.height * 0.5 + 0.5, cfg.depth);
    g.rotation.z += 0.03 * (1 / 60);
    const b = 1 + Math.sin(t * 1.1) * 0.06;
    g.scale.set(cfg.scale * b, cfg.scale * b, cfg.scale);
  });

  return (
    <group ref={group}>
      <mesh material={mat}>
        <sphereGeometry args={[0.28, 10, 8]} />
      </mesh>
      {arms.map((a, i) => (
        <mesh key={i} material={mat} position={[Math.cos(a) * 0.4, Math.sin(a) * 0.4, 0]} rotation={[0, 0, a - Math.PI / 2]} scale={[0.7, 1, 0.4]}>
          <coneGeometry args={[0.2, 0.6, 5]} />
        </mesh>
      ))}
      <Eye position={[-0.1, 0.06, 0.24]} size={0.05} />
      <Eye position={[0.1, 0.06, 0.24]} size={0.05} />
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Seaweed — a chain of segments swaying along its length from the floor.
 * ------------------------------------------------------------------ */
function Seaweed({ seed, color }: { seed: number; color: string }) {
  const group = useRef<THREE.Group>(null);
  const segs = useRef<THREE.Group[]>([]);
  const { viewport } = useThree();
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.8 }), [color]);
  const N = 5;
  const cfg = useMemo(() => ({ x: (rand(seed) - 0.5) * 1.9, phase: rand(seed + 1) * Math.PI * 2, depth: -4.5 - rand(seed + 2), scale: 0.8 + rand(seed + 3) * 0.5, sway: 0.16 + rand(seed + 4) * 0.1 }), [seed]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.position.set(cfg.x * viewport.width * 0.5, -viewport.height * 0.5, cfg.depth);
    const t = state.clock.elapsedTime + cfg.phase;
    for (let i = 0; i < segs.current.length; i++) {
      const s = segs.current[i];
      if (s) s.rotation.z = Math.sin(t * 1.1 + i * 0.6) * cfg.sway;
    }
  });

  // Build a nested chain so each segment's sway compounds up the strand.
  const build = (depth: number): ReactNode => {
    if (depth >= N) return null;
    const h = 0.5 - depth * 0.05;
    return (
      <group ref={(el) => { if (el) segs.current[depth] = el; }} position={[0, depth === 0 ? 0 : 0.42 - depth * 0.03, 0]}>
        <mesh material={mat} position={[0, h / 2, 0]}>
          <boxGeometry args={[0.14 - depth * 0.018, h, 0.05]} />
        </mesh>
        {build(depth + 1)}
      </group>
    );
  };

  return (
    <group ref={group} scale={cfg.scale}>
      {build(0)}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Diver — the pointer chaser. Eases toward the cursor, faces travel,
 * bobs, and paddles arms and finned legs. Wanders when idle / on touch.
 * ------------------------------------------------------------------ */
function Diver() {
  const group = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Mesh>(null);
  const armR = useRef<THREE.Mesh>(null);
  const legL = useRef<THREE.Mesh>(null);
  const legR = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const prev = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());

  const suit = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1f7a8c", flatShading: true, roughness: 0.6 }), []);
  const tank = useMemo(() => new THREE.MeshStandardMaterial({ color: "#dfe7e8", metalness: 0.3, roughness: 0.4 }), []);
  const glass = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0c2f38", transparent: true, opacity: 0.5, roughness: 0.1, metalness: 0.2 }), []);
  const white = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.3 }), []);
  const pupil = useMemo(() => new THREE.MeshStandardMaterial({ color: "#10242b" }), []);
  const fin = useMemo(() => new THREE.MeshStandardMaterial({ color: "#12414c", flatShading: true, roughness: 0.7 }), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // Reads the window-tracked pointer, since the canvas gets no pointer events.
    target.current.set(
      pointer.active ? pointer.x * viewport.width * 0.42 : Math.sin(t * 0.3) * viewport.width * 0.3,
      pointer.active ? pointer.y * viewport.height * 0.42 : Math.sin(t * 0.45) * viewport.height * 0.22,
      0.5
    );
    g.position.lerp(target.current, Math.min(1, delta * 2.6));
    const vx = g.position.x - prev.current.x;
    const vy = g.position.y - prev.current.y;
    prev.current.copy(g.position);
    const speed = Math.hypot(vx, vy);
    // Stay front-facing but turn (yaw) and lean (roll) toward the way it swims.
    const yaw = THREE.MathUtils.clamp(vx * 7, -0.6, 0.6);
    g.rotation.y += (yaw - g.rotation.y) * 0.12;
    const tilt = THREE.MathUtils.clamp(-vx * 2.5 + vy * 1.5, -0.4, 0.4);
    g.rotation.z += (tilt + Math.sin(t * 1.4) * 0.04 - g.rotation.z) * 0.12;
    // Paddle faster when moving.
    const paddle = Math.sin(t * (3 + speed * 26));
    if (armL.current) armL.current.rotation.z = 0.5 + paddle * 0.6;
    if (armR.current) armR.current.rotation.z = -0.5 - paddle * 0.6;
    if (legL.current) legL.current.rotation.z = 0.2 + paddle * 0.4;
    if (legR.current) legR.current.rotation.z = -0.2 - paddle * 0.4;
  });

  return (
    <group ref={group} scale={0.85}>
      {/* air tank behind */}
      <mesh material={tank} position={[0, 0.05, -0.2]} scale={[1, 1.2, 1]}>
        <cylinderGeometry args={[0.12, 0.12, 0.52, 10]} />
      </mesh>
      {/* torso */}
      <mesh material={suit} position={[0, 0.02, 0]} scale={[0.7, 1, 0.55]}>
        <cylinderGeometry args={[0.24, 0.2, 0.62, 10]} />
      </mesh>
      {/* helmet */}
      <mesh material={suit} position={[0, 0.52, 0]}>
        <sphereGeometry args={[0.27, 16, 16]} />
      </mesh>
      {/* mask window, front-centre */}
      <mesh material={glass} position={[0, 0.5, 0.19]} scale={[1.05, 0.8, 0.5]}>
        <sphereGeometry args={[0.2, 14, 14]} />
      </mesh>
      {/* two eyes, side by side, facing the viewer */}
      <mesh material={white} position={[-0.09, 0.52, 0.22]}>
        <sphereGeometry args={[0.055, 10, 10]} />
      </mesh>
      <mesh material={pupil} position={[-0.09, 0.52, 0.27]}>
        <sphereGeometry args={[0.028, 8, 8]} />
      </mesh>
      <mesh material={white} position={[0.09, 0.52, 0.22]}>
        <sphereGeometry args={[0.055, 10, 10]} />
      </mesh>
      <mesh material={pupil} position={[0.09, 0.52, 0.27]}>
        <sphereGeometry args={[0.028, 8, 8]} />
      </mesh>
      {/* arms on both sides */}
      <mesh ref={armL} material={suit} position={[0.24, 0.14, 0.02]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.06, 0.05, 0.46, 6]} />
      </mesh>
      <mesh ref={armR} material={suit} position={[-0.24, 0.14, 0.02]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.06, 0.05, 0.46, 6]} />
      </mesh>
      {/* legs */}
      <mesh ref={legL} material={suit} position={[0.1, -0.42, 0.02]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.07, 0.05, 0.5, 6]} />
      </mesh>
      <mesh ref={legR} material={suit} position={[-0.1, -0.42, 0.02]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.07, 0.05, 0.5, 6]} />
      </mesh>
      {/* fins */}
      <mesh material={fin} position={[0.14, -0.72, 0.02]} rotation={[0, 0, -1.2]} scale={[1, 1, 0.35]}>
        <coneGeometry args={[0.16, 0.42, 4]} />
      </mesh>
      <mesh material={fin} position={[-0.14, -0.72, 0.02]} rotation={[0, 0, 1.2]} scale={[1, 1, 0.35]}>
        <coneGeometry args={[0.16, 0.42, 4]} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */

const SMALL_FISH_COLORS = ["#ffd35c", "#ff8a5b", "#5ad1ff"];
const JELLY_COLORS = ["#f78fb3", "#8fbcff"];
const SEAHORSE_COLORS = ["#ffcf5c", "#4fd6c2"];
const STARFISH_COLORS = ["#ff8f5e", "#ff6f91"];

const PROFILE = {
  full: { bubbles: 120, plankton: 500, smallFish: 3, jelly: 2, turtle: 1, starfish: 2, seahorse: 2, seaweed: 3, dpr: [1, 1.8], antialias: true, power: "high-performance" },
  lite: { bubbles: 50, plankton: 180, smallFish: 2, jelly: 1, turtle: 1, starfish: 1, seahorse: 1, seaweed: 2, dpr: [1, 1], antialias: false, power: "default" },
} as const;

export default function Aquarium({ day = false, lite = false }: { day?: boolean; lite?: boolean }) {
  const p = lite ? PROFILE.lite : PROFILE.full;
  // By day: white motes and bubbles, a bright warm sun, and a cool fill from the water.
  const accent = day ? "#ffffff" : "#2dd4bf";
  const bubble = day ? "#ffffff" : "#bff5ef";

  useEffect(() => {
    const fire = () => window.dispatchEvent(new Event("resize"));
    const raf = requestAnimationFrame(fire);
    const timers = [80, 250, 600].map((t) => window.setTimeout(fire, t));
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.active = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 52 }} dpr={p.dpr as [number, number]} gl={{ antialias: p.antialias, alpha: true, powerPreference: p.power }}>
      {/* Day: bright warm sun. Night: cool moonlight from above-left, a blue ambient
          fill, and a teal glow from below (the plankton lighting the fish). */}
      <ambientLight intensity={day ? 1 : 0.8} color={day ? "#ffffff" : "#9bb9ee"} />
      <directionalLight
        position={day ? [4, 8, 5] : [-3, 7, 4]}
        intensity={day ? 1.5 : 1.25}
        color={day ? "#fff6dc" : "#bdd2ff"}
      />
      <pointLight position={[-5, -2, 4]} intensity={day ? 0.3 : 0.7} color={day ? "#8fe3f0" : accent} />

      <Plankton count={p.plankton} color={accent} day={day} />
      {!day && <Glow count={Math.round(p.plankton / 6)} />}
      <Bubbles count={p.bubbles} color={bubble} />

      {/* The diver chases the pointer — the interactive centerpiece. */}
      <Diver />

      {/* A big fish now swims its own path (no longer the pointer chaser). */}
      <Fish seed={101} body="#ff7a4d" fin="#ffb27a" big />

      {/* A varied cast so it reads like a real tank. */}
      {Array.from({ length: p.smallFish }, (_, i) => (
        <Fish key={`f${i}`} seed={i * 7 + 3} body={SMALL_FISH_COLORS[i % SMALL_FISH_COLORS.length]} fin="#ffffff" />
      ))}
      {Array.from({ length: p.jelly }, (_, i) => (
        <Jellyfish key={`j${i}`} seed={i * 11 + 21} color={JELLY_COLORS[i % JELLY_COLORS.length]} night={!day} />
      ))}
      {Array.from({ length: p.turtle }, (_, i) => (
        <Turtle key={`t${i}`} seed={i * 13 + 41} />
      ))}
      {Array.from({ length: p.seahorse }, (_, i) => (
        <Seahorse key={`h${i}`} seed={i * 17 + 61} color={SEAHORSE_COLORS[i % SEAHORSE_COLORS.length]} />
      ))}
      {Array.from({ length: p.starfish }, (_, i) => (
        <Starfish key={`s${i}`} seed={i * 19 + 83} color={STARFISH_COLORS[i % STARFISH_COLORS.length]} />
      ))}
      {Array.from({ length: p.seaweed }, (_, i) => (
        <Seaweed key={`w${i}`} seed={i * 23 + 103} color={i % 2 ? "#2f9e6f" : "#3fae7f"} />
      ))}

    </Canvas>
  );
}
