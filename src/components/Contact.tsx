import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Mail, Package, ArrowUpRight } from 'lucide-react'

const links = [
  {
    icon: Github,
    label: 'GitHub',
    sub: '@aks-builds',
    href: 'https://github.com/aks-builds',
    color: 'hover:border-slate-400/40',
    iconColor: 'group-hover:text-white',
  },
  {
    icon: Mail,
    label: 'Email',
    sub: 'its.aks@outlook.com',
    href: 'mailto:its.aks@outlook.com',
    color: 'hover:border-indigo-400/40',
    iconColor: 'group-hover:text-primary-light',
  },
  {
    icon: Package,
    label: 'npm',
    sub: 'aks-builds packages',
    href: 'https://www.npmjs.com/~aks-builds',
    color: 'hover:border-red-400/40',
    iconColor: 'group-hover:text-red-400',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div
        className="orb w-[500px] h-[500px] bg-indigo-600/10 pointer-events-none"
        style={{ bottom: '-10%', left: '30%' }}
      />

      <div className="max-w-3xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="section-heading">Let's Connect</h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-12 text-balance">
            I'm open to new opportunities, collaborations, and interesting projects. Reach out through
            any of the channels below.
          </p>
        </motion.div>

        {/* Link cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-stretch justify-center gap-4 mb-12"
        >
          {links.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className={`group glass-card gradient-border rounded-xl p-5 flex flex-col items-center gap-3 flex-1 border border-white/7 transition-all duration-250 hover:-translate-y-1 ${link.color}`}
              >
                <div className={`p-2.5 rounded-lg bg-white/5 text-slate-500 transition-colors duration-200 ${link.iconColor}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <div className="font-display font-semibold text-slate-200 text-sm mb-0.5 flex items-center gap-1 justify-center">
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-xs text-slate-500">{link.sub}</div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Availability note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/6 text-emerald-400 text-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Hireable — open to full-time and contract roles
        </motion.div>
      </div>
    </section>
  )
}
