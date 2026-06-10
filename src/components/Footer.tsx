export default function Footer() {
  return (
    <footer className="border-t border-border py-6 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] text-muted/50">
        <span>// aks-builds · Cloud Native Quality Engineer</span>
        <div className="flex items-center gap-4">
          <a href="https://github.com/aks-builds/aks-builds.github.io" target="_blank" rel="noreferrer"
            className="hover:text-primary transition-colors">source ↗</a>
          <span className="text-primary/60">hireable: true</span>
        </div>
      </div>
    </footer>
  )
}
