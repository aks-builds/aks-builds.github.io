"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

const HeroField = dynamic(() => import("./HeroField"), { ssr: false });

export default function HeroCanvas() {
  const [enabled, setEnabled] = useState(false);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced);
    if (reduced) return;

    function onScroll() {
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      scrollRef.current = progress;
    }
    function onMouseMove(e: MouseEvent) {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <HeroField scrollRef={scrollRef} mouseRef={mouseRef} isTouch={isTouch} />
    </div>
  );
}
