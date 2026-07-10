import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import RoleBanner from "@/components/RoleBanner";
import ImpactCard from "@/components/ImpactCard";
import ProjectCard from "@/components/ProjectCard";
import NpmPackageCard from "@/components/NpmPackageCard";
import TalkCard from "@/components/TalkCard";
import SkillTable from "@/components/SkillTable";
import CertList from "@/components/CertList";
import FactPills from "@/components/FactPills";
import { CASE_STUDIES, IMPACT_ITEMS } from "@/lib/data/projects";
import { getNpmPackagesWithDownloads } from "@/lib/data/npm-packages";
import { TALKS } from "@/lib/data/talks";
import { CERTIFICATIONS } from "@/lib/data/certifications";
import { SKILL_GROUPS, FACTS } from "@/lib/data/skills";

export default async function Home() {
  const packages = await getNpmPackagesWithDownloads();

  return (
    <>
      <div className="container">
        <Hero />
      </div>

      <section id="work" className="section">
        <div className="container">
          <SectionHeading
            label="#work"
            boldWord="Selected"
            grayWord="work"
            sub="A mix of what I've shipped at work, and what I build on my own time."
          />

          <div className="catLabel">#production-impact</div>
          <RoleBanner />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {IMPACT_ITEMS.map((item, i) => (
              <Reveal key={item.key} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.06}>
                <ImpactCard item={item} />
              </Reveal>
            ))}
          </div>

          <div className="catLabel">#open-source · personal projects</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {CASE_STUDIES.map((project, i) => (
              <Reveal key={project.slug} direction="bottom" delay={i * 0.06}>
                <ProjectCard project={project} tilt={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="section">
        <div className="container">
          <SectionHeading
            label="#packages"
            boldWord="Published on"
            grayWord="npm"
            sub="8 packages under aks-builds, real monthly download counts pulled live from the npm registry at build time."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 20 }}>
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} direction="bottom" delay={i * 0.04}>
                <NpmPackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="talks" className="section">
        <div className="container">
          <SectionHeading
            label="#talks"
            boldWord="Internal engineering"
            grayWord="talks"
            sub="NashKnolx sessions at NashTech — internal talks, published on NashTech Learning Hub's channel."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 20 }}>
            {TALKS.map((talk, i) => (
              <Reveal key={talk.youtubeId} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.05}>
                <TalkCard talk={talk} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <SectionHeading label="#certifications" boldWord="Certifications" />
          <div style={{ marginTop: 16 }}>
            <CertList certs={CERTIFICATIONS} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading label="#skills" boldWord="What I" grayWord="work with" />
          <div style={{ marginTop: 20 }}>
            <SkillTable groups={SKILL_GROUPS} />
          </div>
        </div>
      </section>

      <section className="section" style={{ borderBottom: "none" }}>
        <div className="container">
          <SectionHeading label="#notes" boldWord="A few" grayWord="honest notes" />
          <div style={{ marginTop: 16 }}>
            <FactPills facts={FACTS} />
          </div>
        </div>
      </section>
    </>
  );
}
