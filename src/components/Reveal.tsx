"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "left" | "right" | "bottom" | "none";

const variants: Record<Direction, Variants> = {
  left: { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } },
  bottom: { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } },
  none: { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } },
};

export default function Reveal({
  children,
  direction = "bottom",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const v = variants[direction];
  return (
    <motion.div
      className={className}
      style={{ height: "100%" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={v}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
