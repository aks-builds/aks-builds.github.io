"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HeroField = dynamic(() => import("./HeroField"), { ssr: false });

export default function HeroCanvas() {
  const [enabled, setEnabled] = useState(false);
  const scrollRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced);
    if (reduced) return;

    function onScroll() {
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      scrollRef.current = progress;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!enabled) return null;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <HeroField scrollRef={scrollRef} />
    </div>
  );
}
