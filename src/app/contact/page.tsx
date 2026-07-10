import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import CopyableCard from "@/components/CopyableCard";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact — Aditya Kumar Singh",
  description: "Get in touch with Aditya Kumar Singh — open to remote roles and international relocation.",
};

const LINKS = [
  { label: "LinkedIn", value: "linkedin.com/in/its-aks", href: "https://linkedin.com/in/its-aks" },
  { label: "GitHub", value: "github.com/aks-builds", href: "https://github.com/aks-builds" },
  { label: "npm", value: "npmjs.com/~aks-builds", href: "https://www.npmjs.com/~aks-builds" },
];

export default function ContactPage() {
  return (
    <div className="container section" style={{ borderBottom: "none" }}>
      <Reveal direction="bottom">
        <span className="secLabel">#contact</span>
        <h1 className={styles.title}>
          Let&apos;s <span className="g">talk</span>
        </h1>
        <p className={styles.sub}>
          Open to remote roles and international relocation. Based in Greater Noida, India.
        </p>
        <MagneticButton strength={0.25}>
          <a href="/resume/Aditya-Kumar-Singh-Resume.pdf" download className={styles.resumeBtn}>
            ↓ Download Resume
          </a>
        </MagneticButton>
      </Reveal>

      <div className={styles.grid}>
        <Reveal direction="bottom">
          <CopyableCard label="Email" value="its.aks@outlook.com" />
        </Reveal>
        {LINKS.map((l, i) => (
          <Reveal key={l.label} direction="bottom" delay={(i + 1) * 0.05}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" className={styles.card}>
              <div className={styles.label}>{l.label}</div>
              <div className={styles.value}>{l.value}</div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
