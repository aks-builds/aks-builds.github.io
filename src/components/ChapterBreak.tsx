"use client";

import { motion } from "framer-motion";
import styles from "./ChapterBreak.module.css";

export default function ChapterBreak() {
  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.line}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      />
    </div>
  );
}
