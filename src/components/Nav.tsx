import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Menu, X } from 'lucide-react'

const LINKS = [
  { label: './about',    href: '#about' },
  { label: './projects', href: '#projects' },
  { label: './talks',    href: '#talks' },
  { label: './contact',  href: '#contact' },
]

export default function Nav() {
  const [stuck, setStuck]       = useState(false)
  const [open,  setOpen]        = useState(false)

  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        stuck ? 'border-b border-border bg-bg/90 backdrop-blur-xl' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-primary available-dot" />
          <span className="font-mono text-sm font-semibold text-slate-100">
            &gt;_ aks-builds
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-5">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] tracking-[.04em] text-muted hover:text-primary transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-250 group-hover:w-full" />
            </a>
          ))}
          <a
            href="https://github.com/aks-builds"
            target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-[.04em] px-3 py-1.5 rounded border border-border text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
          >
            <Github size={12} />
            github
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden p-2 text-muted hover:text-slate-200 transition-colors"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .2 }}
            className="sm:hidden border-t border-border bg-bg/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              {LINKS.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-[11px] text-muted hover:text-primary py-2.5 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://github.com/aks-builds"
                target="_blank" rel="noreferrer"
                className="font-mono text-[11px] text-muted hover:text-primary py-2.5 flex items-center gap-2 transition-colors"
              >
                <Github size={12} /> github ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
