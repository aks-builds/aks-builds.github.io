import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  { name: 'Python', color: '#3572A5' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'JavaScript', color: '#f1e05a' },
  { name: 'C#', color: '#239120' },
  { name: 'PowerShell', color: '#2671BE' },
  { name: 'Playwright', color: '#2EAD33' },
  { name: 'Claude Code', color: '#6366f1' },
  { name: 'MCP', color: '#8b5cf6' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'GitHub Actions', color: '#2088FF' },
  { name: 'Selenium', color: '#43B02A' },
  { name: 'Unity', color: '#000000' },
  { name: 'Electron', color: '#47848F' },
  { name: 'React', color: '#61DAFB' },
]

const highlights = [
  {
    icon: '🛠',
    title: 'Developer Tooling',
    desc: 'Building CLI tools, MCP servers, and desktop apps that make engineers more productive.',
  },
  {
    icon: '🤖',
    title: 'AI Engineering',
    desc: 'Crafting Claude Code skills and AI agent pipelines for quality and healthcare domains.',
  },
  {
    icon: '✅',
    title: 'Quality Engineering',
    desc: 'End-to-end test automation, root-cause analysis, and QA framework design at scale.',
  },
  {
    icon: '🔐',
    title: 'DevSecOps',
    desc: 'Integrating OWASP security testing, SAST/DAST, and compliance gates into CI/CD.',
  },
]

function SkillChip({ name, color }: { name: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/8 bg-white/4 text-slate-300 transition-all duration-200 hover:border-white/15 hover:bg-white/7"
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
      {name}
    </span>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">About</p>
          <h2 className="section-heading">Who I am</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-balance">
            A Cloud Native Quality Engineer focused on the intersection of AI, developer tooling,
            and software quality — building solutions that actually ship and prove they work.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I'm <span className="text-slate-200 font-medium">Aditya S.</span>, based in the world of cloud-native engineering. I specialise in building
                developer tools, AI-augmented quality pipelines, and open-source libraries that
                make teams ship better software faster.
              </p>
              <p>
                My work spans from low-level test automation (Playwright, Selenium, k6) to
                high-level AI orchestration with Claude Code MCP skills — bridging the gap between
                quality engineering and modern AI tooling.
              </p>
              <p>
                When I'm not building tools, I'm contributing to open-source, writing prompt
                engineering resources, or simulating Formula 1 races in Unity.
              </p>
            </div>

            {/* Tech stack */}
            <div className="mt-8">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <SkillChip key={s.name} {...s} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                className="glass-card gradient-border rounded-xl p-5 hover:translate-y-[-2px] transition-transform duration-200"
              >
                <div className="text-2xl mb-3">{h.icon}</div>
                <h3 className="font-display font-semibold text-slate-200 text-sm mb-1.5">{h.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
