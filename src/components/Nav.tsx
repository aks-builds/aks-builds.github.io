import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-bg/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-display font-bold text-primary-light transition-all duration-200 group-hover:bg-primary/30">
            a.
          </div>
          <span className="font-display font-semibold text-slate-200 hidden sm:block">
            aks-builds
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
          <a
            href="https://github.com/aks-builds"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/8 bg-white/4 text-sm text-slate-300 hover:text-white hover:border-primary/50 transition-all duration-200"
          >
            <Github size={15} />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 text-slate-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden border-t border-white/5 bg-bg/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-3">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-slate-400 hover:text-white py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://github.com/aks-builds"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white py-2 transition-colors"
              >
                <Github size={15} />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
