import Reveal from "./Reveal";
import styles from "./CertList.module.css";
import type { EducationItem } from "@/lib/data/education";

export default function EducationList({ items }: { items: EducationItem[] }) {
  return (
    <div className={styles.list}>
      {items.map((e, i) => (
        <Reveal key={e.degree} direction="bottom" delay={i * 0.05}>
          <div className={styles.item}>
            <span className={styles.cn}>{e.degree}</span>
            <span className={styles.ci}>
              {e.institution} · {e.years}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
