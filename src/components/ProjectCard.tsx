import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Github } from 'lucide-react'
import type { Repo } from '../types'
import { LANGUAGE_COLORS } from '../data/repos'

interface Props {
  repo: Repo
  index: number
}

const CATEGORY_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  devtools: { label: 'Dev Tools', bg: 'bg-blue-500/10', text: 'text-blue-400' },
  ai: { label: 'AI / ML', bg: 'bg-violet-500/10', text: 'text-violet-400' },
  qa: { label: 'QA & Testing', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  security: { label: 'Security', bg: 'bg-orange-500/10', text: 'text-orange-400' },
  gaming: { label: 'Gaming', bg: 'bg-pink-500/10', text: 'text-pink-400' },
  devops: { label: 'DevOps', bg: 'bg-amber-500/10', text: 'text-amber-400' },
}

export default function ProjectCard({ repo, index }: Props) {
  const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] ?? '#64748b') : '#64748b'
  const cat = CATEGORY_STYLES[repo.category]
  const showTopics = repo.topics.slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card gradient-border rounded-xl p-5 flex flex-col h-full group hover:-translate-y-1 transition-transform duration-250"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {repo.language && (
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: langColor }}
              />
              {repo.language}
            </span>
          )}
          {cat && (
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${cat.bg} ${cat.text}`}
            >
              {cat.label}
            </span>
          )}
          {repo.featured && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary-light border border-primary/20">
              Featured
            </span>
          )}
        </div>

        {/* Action links */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-500 hover:text-accent hover:bg-accent/10 transition-all duration-200"
              title="Homepage"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={13} />
            </a>
          )}
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/8 transition-all duration-200"
            title="GitHub"
            onClick={e => e.stopPropagation()}
          >
            <Github size={13} />
          </a>
        </div>
      </div>

      {/* Repo name */}
      <a
        href={repo.url}
        target="_blank"
        rel="noreferrer"
        className="font-display font-semibold text-slate-100 hover:text-primary-light transition-colors duration-200 mb-2 text-sm leading-snug line-clamp-1"
      >
        {repo.name}
      </a>

      {/* Description */}
      <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-3 mb-4">
        {repo.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        {/* Topics */}
        <div className="flex flex-wrap gap-1">
          {showTopics.map(t => (
            <span key={t} className="tag-pill">
              {t}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-slate-600 text-xs flex-shrink-0 ml-2">
          <span className="flex items-center gap-1">
            <Star size={11} />
            {repo.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork size={11} />
            {repo.forks}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
