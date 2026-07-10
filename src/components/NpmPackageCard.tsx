import CountUp from "./CountUp";
import cardStyles from "./cards.module.css";
import styles from "./NpmPackageCard.module.css";
import type { NpmPackageWithDownloads } from "@/lib/data/npm-packages";

export default function NpmPackageCard({ pkg }: { pkg: NpmPackageWithDownloads }) {
  return (
    <a
      href={pkg.npmUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardStyles.card} ${styles.pkgCard}`}
    >
      <div className={styles.pname}>{pkg.name}</div>
      <div className={styles.pdesc}>{pkg.description}</div>
      <div className={styles.stat}>
        {pkg.monthlyDownloads !== null ? (
          <>
            <span className={styles.num}>
              <CountUp target={pkg.monthlyDownloads} />
            </span>
            <span className={styles.lbl2}>dl / month</span>
          </>
        ) : (
          <span className={styles.lbl2}>see on npm ↗</span>
        )}
      </div>
    </a>
  );
}
