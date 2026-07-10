"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import styles from "./CertList.module.css";
import type { Certification } from "@/lib/data/certifications";

function CheckIcon({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className={styles.check} fill="none">
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="var(--accent)"
        strokeWidth="1.4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay }}
      />
      <motion.path
        d="M7.5 12.5l3 3 6-6.5"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: delay + 0.5 }}
      />
    </svg>
  );
}

export default function CertList({ certs }: { certs: Certification[] }) {
  return (
    <div className={styles.list}>
      {certs.map((c, i) => (
        <Reveal key={c.name} direction="bottom" delay={i * 0.04}>
          <div className={styles.item}>
            <div className={styles.left}>
              <CheckIcon delay={i * 0.04} />
              <span className={styles.cn}>{c.name}</span>
            </div>
            <span className={styles.ci}>
              {c.issuer}
              {c.date ? ` · ${c.date}` : ""}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
