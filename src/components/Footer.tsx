import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <p>
          Built by{' '}
          <a
            href="https://github.com/aks-builds"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            Aditya S.
          </a>
          {' '}· Open source on GitHub
        </p>

        <a
          href="https://github.com/aks-builds/aks-builds.github.io"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-slate-600 hover:text-slate-400 transition-colors"
        >
          <Github size={14} />
          Source
        </a>
      </div>
    </footer>
  )
}
