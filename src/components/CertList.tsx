import Reveal from "./Reveal";
import styles from "./CertList.module.css";
import type { Certification } from "@/lib/data/certifications";

export default function CertList({ certs }: { certs: Certification[] }) {
  return (
    <div className={styles.list}>
      {certs.map((c, i) => (
        <Reveal key={c.name} direction="bottom" delay={i * 0.04}>
          <div className={styles.item}>
            <span className={styles.cn}>{c.name}</span>
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
