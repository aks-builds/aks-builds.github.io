"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./CardCarousel.module.css";

const COLUMN_CLASS: Record<2 | 3 | 4, string> = {
  2: styles.cols2,
  3: styles.cols3,
  4: styles.cols4,
};

export default function CardCarousel({
  children,
  columns,
}: {
  children: ReactNode[];
  columns: 2 | 3 | 4;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = cards.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActive(index);
          }
        });
      },
      { root: track, threshold: [0.5] }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [children.length]);

  return (
    <div>
      <div ref={trackRef} className={`${styles.track} ${COLUMN_CLASS[columns]}`}>
        {children}
      </div>
      <div className={styles.dots}>
        {children.map((_, i) => (
          <span key={i} className={i === active ? `${styles.dot} ${styles.dotActive}` : styles.dot} />
        ))}
      </div>
    </div>
  );
}
