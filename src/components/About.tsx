import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Terminal, Bot, CheckCircle, ShieldCheck } from 'lucide-react'

const SKILLS = [
  { name: 'Python',         color: '#3572A5' },
  { name: 'TypeScript',     color: '#3178c6' },
  { name: 'JavaScript',     color: '#f1e05a' },
  { name: 'C#',             color: '#239120' },
  { name: 'PowerShell',     color: '#012456' },
  { name: 'Playwright',     color: '#2EAD33' },
  { name: 'Claude Code',    color: '#22c55e' },
  { name: 'MCP',            color: '#4ade80' },
  { name: 'Docker',         color: '#2496ED' },
  { name: 'GitHub Actions', color: '#2088FF' },
  { name: 'Selenium',       color: '#43B02A' },
  { name: 'Unity',          color: '#888' },
  { name: 'Electron',       color: '#47848F' },
  { name: 'React',          color: '#61DAFB' },
]

const HIGHLIGHTS = [
  { Icon: Terminal,    title: 'Developer Tooling',    desc: 'CLI tools, MCP servers, and desktop apps that make engineers more productive.',  accent: 'rgba(59,130,246,.12)',  iconColor: '#60a5fa' },
  { Icon: Bot,         title: 'AI Engineering',        desc: 'Claude Code skills and AI agent pipelines for quality and healthcare domains.',   accent: 'rgba(139,92,246,.12)', iconColor: '#a78bfa' },
  { Icon: CheckCircle, title: 'Quality Engineering',   desc: 'End-to-end test automation, root-cause analysis, and QA framework design.',       accent: 'rgba(34,197,94,.08)',  iconColor: '#22c55e' },
  { Icon: ShieldCheck, title: 'DevSecOps',             desc: 'OWASP security testing, SAST/DAST, and compliance gates baked into CI/CD.',       accent: 'rgba(249,115,22,.12)', iconColor: '#fb923c' },
]

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .55, ease: [.22,1,.36,1] } } }

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="about" className="py-24 px-4 sm:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto" ref={ref}>

        <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fade} className="mb-14">
          <span className="section-eyebrow">// about</span>
          <h2 className="section-title">Who I am</h2>
          <p className="section-sub">
            A Cloud Native Quality Engineer at the intersection of AI, developer tooling, and software quality.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio + skills */}
          <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fade} transition={{ delay: .05 }}>
            <div className="space-y-4 text-sm text-muted leading-[1.8] font-sans mb-8">
              <p>
                I'm <span className="text-slate-200 font-medium">Aditya S.</span>, focused on building AI-powered developer tools, test automation frameworks, and open-source solutions that make teams ship better software faster.
              </p>
              <p>
                My work spans from low-level test automation (Playwright, Selenium, k6) to high-level AI orchestration with Claude Code MCP skills — bridging quality engineering and modern AI tooling.
              </p>
              <p>
                When not building tools, I'm contributing to open-source, writing prompt engineering resources, or simulating Formula 1 races in Unity.
              </p>
            </div>

            <span className="font-mono text-[9px] tracking-[.1em] uppercase text-muted/60 block mb-3">// tech stack</span>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map(s => (
                <span
                  key={s.name}
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[.04em] px-2.5 py-1 border border-border rounded-sm text-muted hover:text-primary hover:border-primary/25 transition-all duration-200 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  {s.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-3">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                variants={fade}
                transition={{ delay: .1 + i * .07 }}
                className="glass-card rounded-lg p-4 cursor-default group"
              >
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center mb-3 transition-all duration-200"
                  style={{ background: h.accent }}
                >
                  <h.Icon size={15} style={{ color: h.iconColor }} />
                </div>
                <h3 className="font-mono text-[11px] font-semibold text-slate-100 mb-1.5">{h.title}</h3>
                <p className="text-[11px] text-muted leading-relaxed font-sans">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
