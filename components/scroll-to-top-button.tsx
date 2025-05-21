"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function ScrollToTopButton() {
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const waveRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far the user has scrolled
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const percentage = Math.min(scrollTop / scrollHeight, 1)

      setScrollPercentage(percentage)
      setIsVisible(scrollTop > 300) // Show button after scrolling 300px
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Determine if we should show the pulse animation (when button is nearly or fully filled)
  const shouldPulse = scrollPercentage > 0.95

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-transparent flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: 1,
            scale: isHovered ? 1.1 : 1,
            y: 0,
            boxShadow: isHovered ? "0 0 15px rgba(255, 77, 77, 0.6)" : "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Scroll to top"
        >
          {/* Button border with gradient */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#ff4d4d]"
            animate={{
              borderColor: shouldPulse ? ["#ff4d4d", "#ff8080", "#ff4d4d"] : "#ff4d4d",
            }}
            transition={{
              duration: 1.5,
              repeat: shouldPulse ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          />

          {/* Water wave container */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {/* Static fill with dynamic height based on scroll percentage */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-[#ff4d4d]/80"
              initial={{ height: "0%" }}
              animate={{
                height: `${scrollPercentage * 100}%`,
                opacity: scrollPercentage > 0 ? 1 : 0,
              }}
              transition={{
                type: "spring",
                bounce: 0.1,
                duration: 0.4,
              }}
            />

            {/* Water wave animation */}
            <svg
              ref={waveRef}
              className="absolute left-0 bottom-0 w-full"
              style={{
                bottom: `calc(${scrollPercentage * 100}% - 10px)`,
                height: "10px",
              }}
              viewBox="0 0 1200 20"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,0 C300,20 600,-20 1200,0 L1200,30 L0,30 Z"
                fill="#ff4d4d"
                initial={{ d: "M0,0 C300,20 600,-20 1200,0 L1200,30 L0,30 Z" }}
                animate={{
                  d: [
                    "M0,0 C300,20 600,-20 1200,0 L1200,30 L0,30 Z",
                    "M0,0 C600,20 300,-20 1200,0 L1200,30 L0,30 Z",
                    "M0,0 C300,20 600,-20 1200,0 L1200,30 L0,30 Z",
                  ],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  ease: "easeInOut",
                }}
              />
            </svg>

            {/* Second wave for more realistic effect */}
            <svg
              className="absolute left-0 bottom-0 w-full"
              style={{
                bottom: `calc(${scrollPercentage * 100}% - 15px)`,
                height: "15px",
                opacity: 0.7,
              }}
              viewBox="0 0 1200 20"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,0 C600,15 300,-15 1200,0 L1200,30 L0,30 Z"
                fill="#ff4d4d"
                initial={{ d: "M0,0 C600,15 300,-15 1200,0 L1200,30 L0,30 Z" }}
                animate={{
                  d: [
                    "M0,0 C600,15 300,-15 1200,0 L1200,30 L0,30 Z",
                    "M0,0 C300,15 600,-15 1200,0 L1200,30 L0,30 Z",
                    "M0,0 C600,15 300,-15 1200,0 L1200,30 L0,30 Z",
                  ],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </svg>
          </div>

          {/* Ripple effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Pulse animation when fully filled */}
          {shouldPulse && (
            <motion.div
              className="absolute inset-0 bg-[#ff4d4d] rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Arrow icon with animation */}
          <motion.div
            className="relative z-10"
            animate={{
              y: isHovered ? -2 : 0,
              opacity: isHovered ? 1 : 0.9,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowUp className="h-4 w-4 text-white" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
