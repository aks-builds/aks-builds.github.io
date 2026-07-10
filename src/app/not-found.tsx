import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className="container section" style={{ borderBottom: "none" }}>
      <div className={styles.wrap}>
        <span className="secLabel">#404</span>
        <h1 className={styles.title}>
          Page not <span className="g">found</span>
        </h1>
        <p className={styles.sub}>
          Whatever you were looking for isn&apos;t here — maybe it moved, maybe it never existed.
        </p>
        <Link href="/" className={styles.homeLink}>
          Back home <span className={styles.circle}>→</span>
        </Link>
      </div>
    </div>
  );
}
