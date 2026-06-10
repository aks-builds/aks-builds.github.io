import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, ChevronDown } from 'lucide-react'
import { useTypewriter } from '../hooks/useTypewriter'
import { useCountUp } from '../hooks/useCountUp'

const PHRASES = [
  'Building AI developer tools',
  'Engineering test automation',
  'Shipping Claude Code skills',
  'Tracing test failures to root cause',
  'Crafting open-source solutions',
]

const PARTICLES = [
  { left: '8%',  top: '70%', dur: 6,   del: .2,  dx: 12,  dy: -90 },
  { left: '18%', top: '60%', dur: 5,   del: 1.1, dx: -8,  dy: -70 },
  { left: '70%', top: '80%', dur: 7,   del: .5,  dx: 18,  dy: -100 },
  { left: '82%', top: '50%', dur: 4.5, del: 1.8, dx: -14, dy: -75 },
  { left: '55%', top: '75%', dur: 6.5, del: .9,  dx: 10,  dy: -85 },
  { left: '40%', top: '65%', dur: 5.5, del: 2.5, dx: -20, dy: -65 },
  { left: '92%', top: '60%', dur: 4,   del: .4,  dx: -5,  dy: -95 },
]

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: .1, delayChildren: .2 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: .65, ease: [.22,1,.36,1] } },
}

function Particle({ p }: { p: typeof PARTICLES[0] }) {
  return (
    <span
      className="particle"
      style={{
        left: p.left, top: p.top,
        animation: `ptcl-rise ${p.dur}s ease-in-out ${p.del}s infinite`,
        '--dx': `${p.dx}px`, '--dy': `${p.dy}px`,
      } as React.CSSProperties}
    />
  )
}

export default function Hero() {
  const typed   = useTypewriter(PHRASES)
  const repos   = useCountUp(16,  1200)
  const pkgs    = useCountUp(5,   1000)
  const skills  = useCountUp(50,  1400)
  const heroRef = useRef<HTMLElement>(null)

  // inject particle keyframe once
  useEffect(() => {
    if (document.getElementById('ptcl-kf')) return
    const s = document.createElement('style')
    s.id = 'ptcl-kf'
    s.textContent = `
      @keyframes ptcl-rise {
        0%   { opacity:0; transform:translate(0,0) scale(1) }
        25%  { opacity:.5 }
        75%  { opacity:.2 }
        100% { opacity:0; transform:translate(var(--dx),var(--dy)) scale(.3) }
      }`
    document.head.appendChild(s)
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 overflow-hidden"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 hero-grid-bg opacity-100 pointer-events-none" />
      <div className="orb w-[560px] h-[560px] bg-green-500/[.05] animate-float-a" style={{ top: '-120px', right: '-80px' }} />
      <div className="orb w-[380px] h-[380px] bg-green-500/[.03] animate-float-b" style={{ bottom: '-60px', left: '60px' }} />
      <div className="scan-line" style={{ top: 0 }} />

      {/* Particles */}
      {PARTICLES.map((p, i) => <Particle key={i} p={p} />)}

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto w-full"
      >
        <motion.div variants={item} className="mb-7">
          <span className="available-badge">
            <span className="available-dot" />
            available for new opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-mono text-[clamp(52px,8vw,96px)] font-semibold leading-none tracking-tight mb-4 gradient-name"
        >
          Aditya S.
        </motion.h1>

        <motion.p
          variants={item}
          className="font-mono text-sm text-muted tracking-[.06em] mb-4 before:content-['//\00a0']"
        >
          Cloud Native Quality Engineer
        </motion.p>

        <motion.div variants={item} className="h-5 mb-6 font-mono text-sm text-slate-400">
          {typed}<span className="tw-cursor" />
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap gap-2 mb-8">
          {['AI Tools','QA Engineering','Claude Code','MCP','Test Automation','DevSecOps'].map(t => (
            <span key={t} className="tag-chip">{t}</span>
          ))}
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap gap-3 mb-14">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-black font-mono text-[11px] font-bold tracking-[.05em] rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
          >
            View Projects <ArrowRight size={13} />
          </a>
          <a
            href="https://github.com/aks-builds"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border hover:border-primary/30 text-muted hover:text-primary font-mono text-[11px] tracking-[.05em] rounded transition-all duration-200 hover:-translate-y-0.5"
          >
            <Github size={13} /> GitHub ↗
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="flex flex-wrap gap-10 pt-6 border-t border-border"
        >
          {[
            { val: repos,  suffix: '',  label: 'repositories' },
            { val: pkgs,   suffix: '+', label: 'npm packages' },
            { val: skills, suffix: '+', label: 'agent skills' },
          ].map(s => (
            <div key={s.label}>
              <span className="block font-mono text-3xl font-semibold text-primary animate-glow-pulse">
                {s.val}{s.suffix}
              </span>
              <span className="font-mono text-[10px] tracking-[.05em] text-muted">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: .5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
      >
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  )
}
