import styles from "./cards.module.css";
import type { ImpactItem } from "@/lib/data/projects";

export default function ImpactCard({ item }: { item: ImpactItem }) {
  return (
    <div className={styles.card}>
      <div className={styles.thumb}>{item.title}</div>
      <div className={styles.tags}>
        {item.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className={styles.body}>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
        <div className={styles.btns}>
          <span className={styles.note}>enterprise platform — details on request</span>
        </div>
      </div>
    </div>
  );
}
