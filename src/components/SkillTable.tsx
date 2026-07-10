import Reveal from "./Reveal";
import styles from "./SkillTable.module.css";
import type { SkillGroup } from "@/lib/data/skills";

export default function SkillTable({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className={styles.grid}>
      {groups.map((g, i) => (
        <Reveal key={g.heading} direction="none" delay={i * 0.05}>
          <div className={styles.box}>
            <div className={styles.h}>{g.heading}</div>
            <div className={styles.items}>{g.items}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
