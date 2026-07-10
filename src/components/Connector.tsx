"use client";

import { motion } from "framer-motion";
import styles from "./Connector.module.css";

export default function Connector({ label }: { label: string }) {
  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.line}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      />
      <motion.span
        className={styles.arrowhead}
        initial={{ opacity: 0, x: -6 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: 0.75 }}
      >
        ▸
      </motion.span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
