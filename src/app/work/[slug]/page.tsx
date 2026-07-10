import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { CASE_STUDIES } from "@/lib/data/projects";
import styles from "./case-study.module.css";

export function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = CASE_STUDIES.find((p) => p.slug === slug);
  return { title: project ? `${project.name} — Aditya Kumar Singh` : "Case study" };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = CASE_STUDIES.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="container section" style={{ borderBottom: "none" }}>
      <Link href="/#work" className={styles.back}>
        ← back to work
      </Link>

      <Reveal direction="bottom">
        <div className={styles.tags}>
          {project.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <h1 className={styles.title}>{project.name}</h1>
        <p className={styles.oneLiner}>{project.oneLiner}</p>

        <div className={styles.linkRow}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.pillLink}>
              View package ↗
            </a>
          )}
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.pillLink}>
            Source on GitHub ↗
          </a>
        </div>
      </Reveal>

      <div className={styles.grid}>
        <div className={styles.main}>
          <Reveal direction="left">
            <section className={styles.block}>
              <h2>Problem</h2>
              <p>{project.problem}</p>
            </section>
          </Reveal>
          <Reveal direction="left" delay={0.05}>
            <section className={styles.block}>
              <h2>Architecture</h2>
              <p>{project.architecture}</p>
            </section>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <section className={styles.block}>
              <h2>Decisions worth explaining</h2>
              <ul>
                {project.decisions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </section>
          </Reveal>
          <Reveal direction="left" delay={0.15}>
            <section className={styles.block}>
              <h2>Impact</h2>
              <p>{project.impact}</p>
            </section>
          </Reveal>
        </div>

        <Reveal direction="right">
          <aside className={styles.side}>
            <h3>Stack</h3>
            <div className={styles.stackTags}>
              {project.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
