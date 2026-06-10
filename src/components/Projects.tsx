import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { REPOS } from '../data/repos'
import type { Category } from '../types'

const FILTERS: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'devtools', label: 'Dev Tools' },
  { value: 'ai', label: 'AI / ML' },
  { value: 'qa', label: 'QA & Testing' },
  { value: 'security', label: 'Security' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'devops', label: 'DevOps' },
]

export default function Projects() {
  const [active, setActive] = useState<Category>('all')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const filtered =
    active === 'all' ? REPOS : REPOS.filter(r => r.category === active)

  return (
    <section id="projects" className="py-24 px-4 relative">
      {/* Faint orb */}
      <div
        className="orb w-[600px] h-[600px] bg-violet-600/8 pointer-events-none"
        style={{ top: '20%', left: '50%', transform: 'translateX(-50%)' }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Open Source
          </p>
          <h2 className="section-heading">Projects & Solutions</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Tools, frameworks, and libraries built to solve real engineering problems — all open
            source on GitHub.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active === f.value
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'border border-white/8 bg-white/4 text-slate-400 hover:text-slate-200 hover:border-white/15'
              }`}
            >
              {f.label}
              {f.value !== 'all' && (
                <span className="ml-1.5 text-xs opacity-60">
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
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((repo, i) => (
              <ProjectCard key={repo.name} repo={repo} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/aks-builds?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200 border-b border-slate-700 hover:border-slate-500 pb-0.5"
          >
            View all repositories on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
