import Link from "next/link";
import styles from "./cards.module.css";
import TiltWrapper from "./TiltWrapper";
import type { CaseStudy } from "@/lib/data/projects";

export default function ProjectCard({ project, tilt = false }: { project: CaseStudy; tilt?: boolean }) {
  const inner = (
    <div className={styles.card}>
      <div className={styles.thumb}>{project.name}</div>
      <div className={styles.tags}>
        {project.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className={styles.body}>
        <h4>{project.name}</h4>
        <p>{project.oneLiner}</p>
        <div className={styles.btns}>
          <Link href={`/work/${project.slug}`} className={styles.circleMini} aria-label="Read case study">
            ↗
          </Link>
          <span className={styles.lbl}>case study</span>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.circleMini}
            aria-label="View source on GitHub"
          >
            ⌥
          </a>
          <span className={styles.lbl}>code</span>
        </div>
      </div>
    </div>
  );

  return tilt ? <TiltWrapper>{inner}</TiltWrapper> : inner;
}
