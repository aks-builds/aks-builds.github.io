"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import styles from "./CountUp.module.css";

export default function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);
  const [justFinished, setJustFinished] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const dur = 900;
    let start: number | null = null;
    let raf: number;
    function step(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setValue(Math.floor(p * target));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setValue(target);
        setJustFinished(true);
      }
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className={justFinished ? styles.pulse : undefined}>
      {value}
    </span>
  );
}
