import styles from "./AvailabilityBadge.module.css";

export default function AvailabilityBadge() {
  return (
    <div className={styles.badgeWrap}>
      <div className={styles.photo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/profile-rect.jpg"
          alt="Aditya Kumar Singh"
          style={{ objectPosition: "64% 50%" }}
        />
      </div>
    </div>
  );
}
