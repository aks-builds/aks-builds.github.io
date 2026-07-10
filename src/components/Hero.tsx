"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AvailabilityBadge from "./AvailabilityBadge";
import HeroCanvas from "./HeroCanvas";
import MagneticButton from "./MagneticButton";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (badgeWrapRef.current) {
        gsap.to(badgeWrapRef.current, {
          y: 60,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          y: -36,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      <HeroCanvas />
      <div className="dotgrid" style={{ width: 90, height: 90, top: -30, right: 10 }} />
      <div className="sq" style={{ width: 40, height: 40, top: -14, right: 130, transform: "rotate(8deg)" }} />

      <div className={styles.left} ref={headlineRef}>
        <span className={styles.statusPill}>
          <span className={styles.dot2} /> open to remote roles + relocation
        </span>
        <h1 className={styles.h1}>
          <motion.span
            className={styles.b}
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Quality &amp; Performance
          </motion.span>
          <motion.span
            className={styles.g}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Engineer
          </motion.span>
        </h1>
      </div>

      <div ref={badgeWrapRef}>
        <AvailabilityBadge />
      </div>

      <div className={styles.right}>
        <p>
          SDET with 3.5+ years building test automation, performance engineering, and observability for
          enterprise insurance platforms at Duck Creek Technologies (via NashTech). ISTQB CT-FL certified.
        </p>
        <Link href="/#about" className={styles.linkArrow}>
          About Me{" "}
          <MagneticButton>
            <span className={styles.circle}>→</span>
          </MagneticButton>
        </Link>
      </div>
    </section>
  );
}
