import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, CalendarDays } from 'lucide-react'
import { TALKS } from '../data/talks'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .55, ease: [.22,1,.36,1] } } }

export default function Talks() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const published = TALKS.filter(t => !t.upcoming)
  const upcoming  = TALKS.find(t => t.upcoming)

  return (
    <section id="talks" className="py-24 px-4 sm:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto" ref={ref}>

        <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fade} className="mb-12">
          <span className="section-eyebrow">// talks &amp; speaking</span>
          <h2 className="section-title">On the Mic</h2>
          <p className="section-sub">
            Conference and internal talks on quality engineering, AI-powered testing, and developer productivity.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {published.map((talk, i) => (
            <motion.a
              key={talk.id}
              href={talk.url}
              target="_blank" rel="noreferrer"
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              variants={fade}
              transition={{ delay: .08 + i * .1 }}
              className="glass-card rounded-lg overflow-hidden group block"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden aspect-video bg-surface">
                <img
                  src={`https://img.youtube.com/vi/${talk.youtubeId}/mqdefault.jpg`}
                  alt={talk.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full border border-primary/50 bg-black/40 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                    <Play size={14} className="text-primary ml-0.5" fill="#22c55e" />
                  </div>
                </div>
                {/* Scan line on hover */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="scan-line" style={{ top: 0 }} />
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <span className="font-mono text-[9px] tracking-[.08em] uppercase text-primary mb-2 block">
                  {talk.venue}
                </span>
                <h3 className="font-mono text-[12px] font-semibold text-slate-100 leading-snug group-hover:text-primary transition-colors">
                  {talk.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Upcoming session */}
        {upcoming && (
          <motion.div
            initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fade}
            transition={{ delay: .35 }}
            className="flex items-center gap-3 border border-yellow-500/20 bg-yellow-500/[.04] rounded-lg px-5 py-4"
          >
            <CalendarDays size={16} className="text-yellow-400 flex-shrink-0" />
            <div>
              <span className="font-mono text-[9px] tracking-[.08em] uppercase text-yellow-400 mr-3">
                upcoming · {upcoming.date}
              </span>
              <span className="font-mono text-[12px] text-slate-200">{upcoming.title}</span>
              <span className="font-mono text-[10px] text-muted ml-2">· {upcoming.venue}</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
