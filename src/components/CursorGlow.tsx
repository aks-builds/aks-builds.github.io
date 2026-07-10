"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorGlow.module.css";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function onMove(e: MouseEvent) {
      ref.current?.style.setProperty("--gx", `${e.clientX}px`);
      ref.current?.style.setProperty("--gy", `${e.clientY}px`);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={ref} className={styles.glow} />;
}
