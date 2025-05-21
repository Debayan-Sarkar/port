"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface CursorBorderProps {
  children: React.ReactNode
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  className?: string
}

export default function CursorBorder({
  children,
  borderColor = "#ff4d4d",
  borderWidth = 2,
  borderRadius = 8,
  className = "",
}: CursorBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [borders, setBorders] = useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return

      const rect = container.getBoundingClientRect()

      // Calculate distances to each edge
      const distanceToTop = Math.abs(e.clientY - rect.top)
      const distanceToRight = Math.abs(e.clientX - rect.right)
      const distanceToBottom = Math.abs(e.clientY - rect.bottom)
      const distanceToLeft = Math.abs(e.clientX - rect.left)

      // Find the minimum distance
      const minDistance = Math.min(distanceToTop, distanceToRight, distanceToBottom, distanceToLeft)

      // Set the active border based on the closest edge
      setBorders({
        top: minDistance === distanceToTop,
        right: minDistance === distanceToRight,
        bottom: minDistance === distanceToBottom,
        left: minDistance === distanceToLeft,
      })
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setBorders({ top: false, right: false, bottom: false, left: false })
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isHovering])

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ borderRadius: `${borderRadius}px` }}>
      {/* Top border with glow effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-left"
        style={{
          height: `${borderWidth}px`,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: borders.top ? 1 : 0,
          opacity: borders.top ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundColor: borderColor,
            boxShadow: `0 0 10px ${borderColor}, 0 0 5px ${borderColor}`,
          }}
        />
      </motion.div>

      {/* Right border with glow effect */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 origin-top"
        style={{
          width: `${borderWidth}px`,
          borderTopRightRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{
          scaleY: borders.right ? 1 : 0,
          opacity: borders.right ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundColor: borderColor,
            boxShadow: `0 0 10px ${borderColor}, 0 0 5px ${borderColor}`,
          }}
        />
      </motion.div>

      {/* Bottom border with glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 origin-right"
        style={{
          height: `${borderWidth}px`,
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: borders.bottom ? 1 : 0,
          opacity: borders.bottom ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundColor: borderColor,
            boxShadow: `0 0 10px ${borderColor}, 0 0 5px ${borderColor}`,
          }}
        />
      </motion.div>

      {/* Left border with glow effect */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 origin-bottom"
        style={{
          width: `${borderWidth}px`,
          borderTopLeftRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{
          scaleY: borders.left ? 1 : 0,
          opacity: borders.left ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundColor: borderColor,
            boxShadow: `0 0 10px ${borderColor}, 0 0 5px ${borderColor}`,
          }}
        />
      </motion.div>

      {children}
    </div>
  )
}
