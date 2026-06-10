import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { REPOS } from '../data/repos'
import type { Category } from '../types'

const FILTERS: { value: Category; label: string }[] = [
  { value: 'all',      label: 'all' },
  { value: 'devtools', label: 'dev tools' },
  { value: 'ai',       label: 'ai / ml' },
  { value: 'qa',       label: 'qa & testing' },
  { value: 'security', label: 'security' },
  { value: 'gaming',   label: 'gaming' },
  { value: 'devops',   label: 'devops' },
]

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .55 } } }

export default function Projects() {
  const [active, setActive] = useState<Category>('all')
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const filtered = active === 'all' ? REPOS : REPOS.filter(r => r.category === active)

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto" ref={ref}>

        <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fade} className="mb-12">
          <span className="section-eyebrow">// open source</span>
          <h2 className="section-title">Projects &amp; Solutions</h2>
          <p className="section-sub">
            Tools, frameworks, and libraries built to solve real engineering problems — all open source on GitHub.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fade}
          transition={{ delay: .1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`font-mono text-[10px] tracking-[.05em] px-3.5 py-1.5 rounded-sm border transition-all duration-200 ${
                active === f.value
                  ? 'bg-primary text-black border-primary font-bold shadow-lg shadow-primary/20'
                  : 'border-border text-muted hover:text-primary hover:border-primary/30'
              }`}
            >
              {f.label}
              {f.value !== 'all' && (
                <span className={`ml-1.5 text-[8px] ${active === f.value ? 'opacity-60' : 'opacity-40'}`}>
                  {REPOS.filter(r => r.category === f.value).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {filtered.map((repo, i) => (
              <ProjectCard key={repo.name} repo={repo} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fade}
          transition={{ delay: .3 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/aks-builds?tab=repositories"
            target="_blank" rel="noreferrer"
            className="font-mono text-[10px] tracking-[.04em] text-muted hover:text-primary border-b border-muted/30 hover:border-primary/40 pb-px transition-all duration-200"
          >
            // view all repositories on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
