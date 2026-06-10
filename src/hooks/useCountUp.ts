import { useState, useEffect, useRef } from 'react'

export function useCountUp(target: number, duration = 1200) {
  const [val, setVal]   = useState(0)
  const started         = useRef(false)
  const rafRef          = useRef<number>(0)

  useEffect(() => {
    if (started.current) return
    const delay = setTimeout(() => {
      started.current = true
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(eased * target))
        if (p < 1) rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }, 600)
    return () => { clearTimeout(delay); cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return val
}
