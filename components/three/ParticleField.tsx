"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function inSphere(count: number, radius: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Rejection sampling for a uniform-ish distribution inside a sphere.
    let x = 0,
      y = 0,
      z = 0,
      d = 2;
    while (d > 1 || d < 0.0001) {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
      d = x * x + y * y + z * z;
    }
    const r = radius * Math.cbrt(Math.random());
    const inv = r / Math.sqrt(d);
    arr[i * 3] = x * inv;
    arr[i * 3 + 1] = y * inv;
    arr[i * 3 + 2] = z * inv;
  }
  return arr;
}

function Swarm({
  color,
  count,
  parallax,
}: {
  color: string;
  count: number;
  parallax: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => inSphere(count, 6.2), [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Slow autonomous drift.
    ref.current.rotation.x -= delta * 0.02;
    ref.current.rotation.y -= delta * 0.028;

    // Gentle parallax toward pointer. Touch devices have no hovering cursor —
    // state.pointer stays at the origin — so skip the work entirely there.
    if (!parallax) return;
    ref.current.position.x += (state.pointer.x * 0.6 - ref.current.position.x) * 0.02;
    ref.current.position.y += (state.pointer.y * 0.4 - ref.current.position.y) * 0.02;
  });

  return (
    <group rotation={[0, 0, Math.PI / 5]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.022}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function GlowSwarm({ color, count }: { color: string; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => inSphere(count, 9), [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.01;
    ref.current.rotation.z -= delta * 0.006;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={0.28}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Phones pay for this swarm in battery and heat, and additive-blended points are
// fill-rate bound — so the lite profile caps dpr at 1 (roughly a third of the
// fragments of dpr 1.8) and thins the swarm. At phone size the drop in density
// is hard to notice; the drop in GPU work is not.
const PROFILE = {
  full: { swarm: 2600, glow: 700, dpr: [1, 1.8], antialias: true, power: "high-performance" },
  lite: { swarm: 900, glow: 250, dpr: [1, 1], antialias: false, power: "default" },
} as const;

export default function ParticleField({
  accent = "#e5484d",
  dim = "#4a4a55",
  lite = false,
}: {
  accent?: string;
  dim?: string;
  lite?: boolean;
}) {
  const p = lite ? PROFILE.lite : PROFILE.full;
  // R3F's Canvas can measure 0 on first mount (dynamic import after hydration);
  // nudge a resize a few times so the drawing buffer fills the viewport.
  useEffect(() => {
    const fire = () => window.dispatchEvent(new Event("resize"));
    const raf = requestAnimationFrame(fire);
    const timers = [80, 250, 600].map((t) => window.setTimeout(fire, t));
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      dpr={p.dpr as [number, number]}
      gl={{ antialias: p.antialias, alpha: true, powerPreference: p.power }}
    >
      <Swarm color={accent} count={p.swarm} parallax={!lite} />
      <GlowSwarm color={dim} count={p.glow} />
    </Canvas>
  );
}
