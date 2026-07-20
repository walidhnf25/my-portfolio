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

function Swarm({ color, count }: { color: string; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => inSphere(count, 6.2), [count]);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Slow autonomous drift.
    ref.current.rotation.x -= delta * 0.02;
    ref.current.rotation.y -= delta * 0.028;

    // Gentle parallax toward pointer.
    target.current.x = state.pointer.y * 0.18;
    target.current.y = state.pointer.x * 0.18;
    ref.current.rotation.x +=
      (target.current.x - ref.current.rotation.x * 0.0) * 0.0;
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

export default function ParticleField({
  accent = "#e5484d",
  dim = "#4a4a55",
}: {
  accent?: string;
  dim?: string;
}) {
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
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Swarm color={accent} count={2600} />
      <GlowSwarm color={dim} count={700} />
    </Canvas>
  );
}
