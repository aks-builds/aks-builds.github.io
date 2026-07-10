import { ROLE } from "@/lib/data/projects";
import Connector from "./Connector";
import styles from "./RoleBanner.module.css";

export default function RoleBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.chain}>
        <a href={ROLE.employerUrl} target="_blank" rel="noopener noreferrer" className={styles.orgBadge}>
          <span className={styles.ic}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <rect x="4" y="3" width="16" height="18" rx="1" />
              <path d="M9 21v-4h6v4" />
            </svg>
          </span>
          {ROLE.employer}
          <span className={styles.via}>{ROLE.employerSub}</span>
        </a>
        <Connector label="placed at" />
        <a
          href={ROLE.clientUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.orgBadge} ${styles.client}`}
        >
          <span className={styles.ic}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <rect x="4" y="3" width="16" height="18" rx="1" />
              <path d="M9 21v-4h6v4" />
            </svg>
          </span>
          {ROLE.client}
        </a>
      </div>

      <div className={styles.roleMain}>
        <div className={styles.roleTitle}>
          {ROLE.title} <span className={styles.lvl}>{ROLE.level}</span>
          <span className={styles.promoPill}>↑ {ROLE.promotedLabel}</span>
        </div>
        <div className={styles.roleDur}>
          <span className={styles.dot2} />
          {ROLE.startDate} — Present
        </div>
      </div>

      <p className={styles.context}>{ROLE.context}</p>
    </div>
  );
}
