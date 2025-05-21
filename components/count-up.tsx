"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
  end: number
  duration?: number
  start?: number
  decimals?: number
}

export default function CountUp({ end, duration = 2, start = 0, decimals = 0 }: CountUpProps) {
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated) return

    let startTime: number
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      const currentCount = progress * (end - start) + start
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        setHasAnimated(true)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, start, duration, hasAnimated])

  return <span ref={ref}>{count.toFixed(decimals)}</span>
}
