import { motion } from 'framer-motion'
import { ArrowRight, Github, ChevronDown } from 'lucide-react'
import { useTypewriter } from '../hooks/useTypewriter'

const PHRASES = [
  'Building AI developer tools',
  'Engineering test automation',
  'Crafting open-source solutions',
  'Designing QA frameworks',
  'Shipping Claude Code skills',
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const typed = useTypewriter(PHRASES)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid-bg opacity-60" />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1a0a3e]/30 via-transparent to-transparent" />

      {/* Floating orbs */}
      <div
        className="orb w-[500px] h-[500px] bg-indigo-600/20 animate-float-a"
        style={{ top: '10%', left: '10%' }}
      />
      <div
        className="orb w-[400px] h-[400px] bg-violet-600/15 animate-float-b"
        style={{ bottom: '15%', right: '8%' }}
      />
      <div
        className="orb w-[300px] h-[300px] bg-cyan-500/10 animate-float-a"
        style={{ top: '50%', right: '20%', animationDelay: '4s' }}
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl text-center"
      >
        {/* Status badge */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for new opportunities
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p variants={item} className="text-slate-500 text-lg mb-2 font-sans">
          Hi, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 leading-none"
        >
          <span className="gradient-text">Aditya S.</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={item}
          className="font-display text-xl sm:text-2xl text-slate-300 font-medium mb-6"
        >
          Cloud Native Quality Engineer
        </motion.p>

        {/* Typewriter */}
        <motion.div variants={item} className="h-8 flex items-center justify-center mb-10">
          <span className="text-slate-400 text-base sm:text-lg font-sans">
            {typed}
            <span className="typewriter-cursor" />
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-medium text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
          >
            View Projects
            <ArrowRight size={16} />
          </a>
          <a
            href="https://github.com/aks-builds"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 text-slate-300 hover:text-white font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <Github size={16} />
            GitHub Profile
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-8 text-sm text-slate-500"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-display font-bold text-slate-200">16</span>
            <span>Repositories</span>
          </div>
          <div className="w-px h-8 bg-white/8" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-display font-bold text-slate-200">5+</span>
            <span>npm packages</span>
          </div>
          <div className="w-px h-8 bg-white/8" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-display font-bold text-slate-200">50+</span>
            <span>Agent skills</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
      >
        <ChevronDown size={18} className="animate-bounce" />
      </motion.div>
    </section>
  )
}
