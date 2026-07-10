import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MagneticButton from "./MagneticButton";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <Link href="/" className={styles.logo}>
          Aditya Kumar Singh
        </Link>
        <div className={styles.links}>
          <Link href="/#work">#work</Link>
          <Link href="/#packages">#packages</Link>
          <Link href="/#talks">#talks</Link>
          <Link href="/#about">#about</Link>
          <Link href="/contact">#contact</Link>
        </div>
        <div className={styles.rightGroup}>
          <MagneticButton strength={0.25}>
            <a href="/resume/Aditya-Kumar-Singh-Resume.pdf" download className={styles.resumeBtn}>
              ↓ Resume
            </a>
          </MagneticButton>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
