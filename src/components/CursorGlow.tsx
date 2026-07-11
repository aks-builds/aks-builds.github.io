"use client";

import { useEffect, useRef } from "react";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./CursorGlow.module.css";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    function onMove(e: MouseEvent) {
      ref.current?.style.setProperty("--gx", `${e.clientX}px`);
      ref.current?.style.setProperty("--gy", `${e.clientY}px`);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion, isTouch]);

  if (reducedMotion) return null;

  return <div ref={ref} className={`${styles.glow} ${isTouch ? styles.ambient : ""}`} />;
}
