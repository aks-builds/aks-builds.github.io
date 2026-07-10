import LocalTimeTicker from "./LocalTimeTicker";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div className={styles.left}>
          <div className={styles.name}>Aditya Kumar Singh</div>
          <div className={styles.role}>Quality &amp; Performance Engineer</div>
          <div style={{ marginTop: 6 }}>
            <LocalTimeTicker />
          </div>
        </div>
        <div className={styles.links}>
          <a href="mailto:its.aks@outlook.com">Email</a>
          <a href="https://github.com/aks-builds" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/its-aks" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.npmjs.com/~aks-builds" target="_blank" rel="noopener noreferrer">npm</a>
        </div>
      </div>
    </footer>
  );
}
