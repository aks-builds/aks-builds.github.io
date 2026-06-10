import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Github } from 'lucide-react'
import type { Repo } from '../types'
import { LANGUAGE_COLORS } from '../data/repos'

const CAT: Record<string, { label: string; bg: string; color: string }> = {
  devtools: { label: 'Dev Tools', bg: 'rgba(59,130,246,.1)',   color: '#60a5fa' },
  ai:       { label: 'AI / ML',   bg: 'rgba(139,92,246,.1)',  color: '#a78bfa' },
  qa:       { label: 'QA',        bg: 'rgba(34,197,94,.08)',  color: '#4ade80' },
  security: { label: 'Security',  bg: 'rgba(249,115,22,.1)',  color: '#fb923c' },
  gaming:   { label: 'Gaming',    bg: 'rgba(236,72,153,.1)',  color: '#f472b6' },
  devops:   { label: 'DevOps',    bg: 'rgba(245,158,11,.1)',  color: '#fbbf24' },
}

export default function ProjectCard({ repo, index }: { repo: Repo; index: number }) {
  const lc  = repo.language ? (LANGUAGE_COLORS[repo.language] ?? '#64748b') : '#64748b'
  const cat = CAT[repo.category]

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .4, delay: index * .05, ease: [.22,1,.36,1] }}
      className="glass-card rounded-lg p-4 flex flex-col h-full hover:-translate-y-0.5 transition-transform duration-200"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {repo.language && (
            <span className="flex items-center gap-1 font-mono text-[9px] text-muted">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: lc }} />
              {repo.language}
            </span>
          )}
          {cat && (
            <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-sm" style={{ background: cat.bg, color: cat.color }}>
              {cat.label}
            </span>
          )}
          {repo.featured && (
            <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-sm text-primary border border-primary/20 bg-primary/8">
              ★ featured
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noreferrer"
              className="p-1 text-muted/50 hover:text-primary transition-colors" title="Homepage">
              <ExternalLink size={11} />
            </a>
          )}
          <a href={repo.url} target="_blank" rel="noreferrer"
            className="p-1 text-muted/50 hover:text-slate-300 transition-colors" title="GitHub">
            <Github size={11} />
          </a>
        </div>
      </div>

      {/* Name */}
      <a href={repo.url} target="_blank" rel="noreferrer"
        className="font-mono text-[13px] font-semibold text-slate-100 hover:text-primary transition-colors mb-2 line-clamp-1">
        {repo.name}
      </a>

      {/* Description */}
      <p className="text-[12px] text-muted leading-relaxed font-sans flex-1 line-clamp-3 mb-3">
        {repo.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2.5 border-t border-border mt-auto">
        <div className="flex flex-wrap gap-1">
          {repo.topics.slice(0, 3).map(t => (
            <span key={t} className="font-mono text-[8px] text-muted/50 border border-border rounded-sm px-1.5 py-0.5">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-muted/30 flex-shrink-0 ml-2">
          <span className="flex items-center gap-0.5"><Star size={10} />{repo.stars}</span>
          <span className="flex items-center gap-0.5"><GitFork size={10} />{repo.forks}</span>
        </div>
      </div>
    </motion.div>
  )
}
