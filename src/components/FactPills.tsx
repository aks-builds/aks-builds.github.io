import Reveal from "./Reveal";
import styles from "./FactPills.module.css";

export default function FactPills({ facts }: { facts: string[] }) {
  return (
    <div className={styles.facts}>
      {facts.map((f, i) => (
        <Reveal key={f} direction="bottom" delay={i * 0.05}>
          <span className={styles.pill}>{f}</span>
        </Reveal>
      ))}
    </div>
  );
}
