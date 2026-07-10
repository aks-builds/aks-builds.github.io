"use client";

import { useRef } from "react";
import { useTheme } from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const svg = svgRef.current;
    if (svg) {
      svg.classList.remove(styles.swing);
      // restart animation
      void svg.getBoundingClientRect();
      svg.classList.add(styles.swing);
    }
    document.documentElement.style.setProperty("--wipe-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--wipe-y", `${e.clientY}px`);
    toggle();
  };

  return (
    <button
      className={styles.bulbBtn}
      onClick={handleClick}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <svg ref={svgRef} viewBox="0 0 24 24" fill="none" className={styles.bulbSvg}>
        <g className={theme === "dark" ? styles.glowOff : styles.glowOn}>
          <path
            d="M12 2a7 7 0 0 0-4 12.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3A7 7 0 0 0 12 2Z"
            fill="#fde68a"
            stroke="#f59e0b"
            strokeWidth="1"
          />
        </g>
        <path
          d="M10 8h4M10 10.5h4"
          stroke={theme === "dark" ? "#52525b" : "#f59e0b"}
          strokeOpacity={theme === "dark" ? 0.6 : 1}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path d="M10 21h4" stroke="var(--text)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </button>
  );
}
