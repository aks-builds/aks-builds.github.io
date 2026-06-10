import { useState, useEffect } from 'react'

export function useTypewriter(phrases: string[], speed = 65, pause = 2200) {
  const [text,        setText]        = useState('')
  const [phase,       setPhase]       = useState<'typing'|'pausing'|'deleting'>('typing')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex,   setCharIndex]   = useState(0)

  useEffect(() => {
    const current = phrases[phraseIndex]
    if (phase === 'typing') {
      if (charIndex < current.length) {
        const t = setTimeout(() => { setText(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1) }, speed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), pause)
        return () => clearTimeout(t)
      }
    }
    if (phase === 'deleting') {
      if (charIndex > 0) {
        const t = setTimeout(() => { setText(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1) }, speed / 2)
        return () => clearTimeout(t)
      } else {
        setPhraseIndex(i => (i + 1) % phrases.length)
        setPhase('typing')
      }
    }
  }, [phase, charIndex, phraseIndex, phrases, speed, pause])

  return text
}
