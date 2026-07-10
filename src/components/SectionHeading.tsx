"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function SectionHeading({
  label,
  boldWord,
  grayWord,
  sub,
}: {
  label: string;
  boldWord: ReactNode;
  grayWord?: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <div>
      <motion.span
        className="secLabel"
        initial={{ width: 0 }}
        whileInView={{ width: "auto" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
      >
        {label}
      </motion.span>
      <h2 className="secTitle">
        {boldWord} {grayWord ? <span className="g">{grayWord}</span> : null}
      </h2>
      {sub ? <p className="secSub">{sub}</p> : null}
    </div>
  );
}
