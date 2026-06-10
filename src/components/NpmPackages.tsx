import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Copy, ExternalLink, Github } from 'lucide-react'
import { NPM_PACKAGES } from '../data/npm'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .55, ease: [.22,1,.36,1] } } }

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {})
}

export default function NpmPackages() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="npm" className="py-24 px-4 sm:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto" ref={ref}>

        <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fade} className="mb-12">
          <span className="section-eyebrow">// published packages</span>
          <h2 className="section-title">On npm</h2>
          <p className="section-sub">
            Three production packages — install and use them in your projects today.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NPM_PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              variants={fade}
              transition={{ delay: .08 + i * .1 }}
              className="glass-card rounded-lg p-5 flex flex-col group"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1.5 font-mono text-[9px] text-muted">
                    <span className="w-2 h-2 rounded-full" style={{ background: pkg.langColor }} />
                    {pkg.language}
                  </span>
                  <span className="font-mono text-[8px] text-red-400 border border-red-400/20 bg-red-400/8 rounded-sm px-1.5 py-0.5">
                    npm
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <a href={pkg.npmUrl} target="_blank" rel="noreferrer"
                    className="p-1 text-muted hover:text-primary transition-colors" title="npm">
                    <ExternalLink size={12} />
                  </a>
                  <a href={pkg.githubUrl} target="_blank" rel="noreferrer"
                    className="p-1 text-muted hover:text-slate-200 transition-colors" title="GitHub">
                    <Github size={12} />
                  </a>
                </div>
              </div>

              {/* Name */}
              <h3 className="font-mono text-sm font-semibold text-primary mb-2 group-hover:text-primary-light transition-colors">
                {pkg.name}
              </h3>

              {/* Description */}
              <p className="text-[12px] text-muted leading-relaxed font-sans flex-1 mb-4">
                {pkg.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {pkg.tags.map(t => (
                  <span key={t} className="font-mono text-[8px] text-muted/60 border border-border rounded-sm px-1.5 py-0.5">
                    {t}
                  </span>
                ))}
              </div>

              {/* Install command */}
              <div
                className="flex items-center justify-between gap-2 bg-surface border border-border rounded px-3 py-2 cursor-pointer hover:border-primary/25 transition-colors group/cmd"
                onClick={() => copyToClipboard(pkg.installCmd)}
                title="Click to copy"
              >
                <span className="font-mono text-[9px] text-muted">
                  <span className="text-primary mr-1">$</span>
                  {pkg.installCmd}
                </span>
                <Copy size={11} className="text-muted/40 group-hover/cmd:text-primary flex-shrink-0 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
