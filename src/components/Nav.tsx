"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import MagneticButton from "./MagneticButton";
import styles from "./Nav.module.css";

const NAV_LINKS = [
  { id: "work", href: "/#work", label: "#work" },
  { id: "packages", href: "/#packages", label: "#packages" },
  { id: "talks", href: "/#talks", label: "#talks" },
  { id: "about", href: "/#about", label: "#about" },
];

export default function Nav() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav className={styles.nav}>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}
      >
        <Link href="/" className={styles.logo}>
          Aditya Kumar Singh
        </Link>

        <div className={styles.links}>
          {NAV_LINKS.map((l) => (
            <Link key={l.id} href={l.href} className={active === l.id ? styles.activeLink : undefined}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact">#contact</Link>
        </div>

        <div className={styles.rightGroup}>
          <MagneticButton strength={0.25}>
            <a href="/resume/Aditya-Kumar-Singh-Resume.pdf" download className={styles.resumeBtn}>
              ↓ Resume
            </a>
          </MagneticButton>
          <ThemeToggle />
          <button
            className={styles.hamburger}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className={mobileOpen ? styles.barTop : ""} />
            <span className={mobileOpen ? styles.barMid : ""} />
            <span className={mobileOpen ? styles.barBot : ""} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobilePanel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((l) => (
              <Link key={l.id} href={l.href} onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              #contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
