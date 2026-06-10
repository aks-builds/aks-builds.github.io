import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Mail, Package, ArrowUpRight } from 'lucide-react'

const LINKS = [
  { Icon: Github,  label: 'GitHub',  sub: '@aks-builds',         href: 'https://github.com/aks-builds',         hoverColor: 'hover:text-slate-100 hover:border-slate-600/50' },
  { Icon: Mail,    label: 'Email',   sub: 'its.aks@outlook.com', href: 'mailto:its.aks@outlook.com',            hoverColor: 'hover:text-primary hover:border-primary/30' },
  { Icon: Package, label: 'npm',     sub: 'aks-builds',          href: 'https://www.npmjs.com/~aks-builds',     hoverColor: 'hover:text-red-400 hover:border-red-400/30' },
]

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .55, ease: [.22,1,.36,1] } } }

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 border-t border-border text-center">
      <div className="max-w-3xl mx-auto" ref={ref}>

        <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fade}>
          <span className="section-eyebrow justify-center">// contact</span>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-sub mx-auto mb-10">
            Open to new opportunities, collaborations, and interesting projects. Reach out through any channel below.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 mb-10">
          {LINKS.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              variants={fade}
              transition={{ delay: .1 + i * .08 }}
              className={`glass-card rounded-lg px-8 py-6 flex flex-col items-center gap-3 flex-1 border border-border text-muted transition-all duration-200 hover:-translate-y-1 ${l.hoverColor}`}
            >
              <l.Icon size={18} className="transition-colors duration-200" />
              <div>
                <div className="font-mono text-[12px] font-semibold text-slate-200 mb-0.5 flex items-center gap-1 justify-center">
                  {l.label}
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-mono text-[10px] text-muted">{l.sub}</div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fade}
          transition={{ delay: .35 }}
        >
          <span className="available-badge mx-auto">
            <span className="available-dot" />
            Hireable — open to full-time and contract roles
          </span>
        </motion.div>
      </div>
    </section>
  )
}
