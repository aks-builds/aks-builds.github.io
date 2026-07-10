"use client";

import { useRef, useMemo, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type MousePos = { x: number; y: number };

function Particles({
  scrollRef,
  mouseRef,
}: {
  scrollRef: MutableRefObject<number>;
  mouseRef: MutableRefObject<MousePos>;
}) {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const count = 260;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const progress = scrollRef.current;
    const mouse = mouseRef.current;
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02 + mouse.x * 0.15;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1 - mouse.y * 0.1;
      const targetScale = 1 + progress * 2.2;
      ref.current.scale.x += (targetScale - ref.current.scale.x) * 0.08;
      ref.current.scale.y += (targetScale - ref.current.scale.y) * 0.08;
      ref.current.scale.z += (targetScale - ref.current.scale.z) * 0.08;
    }
    if (materialRef.current) {
      const targetOpacity = 0.5 * Math.max(0, 1 - progress * 1.4);
      materialRef.current.opacity += (targetOpacity - materialRef.current.opacity) * 0.08;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={materialRef} size={0.035} color="#4338ca" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function HeroField({
  scrollRef,
  mouseRef,
}: {
  scrollRef: MutableRefObject<number>;
  mouseRef: MutableRefObject<MousePos>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <Particles scrollRef={scrollRef} mouseRef={mouseRef} />
    </Canvas>
  );
}
