"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      whilehover={{ scale: 1.05 }}
      whiletap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-2 rounded-full transition-colors duration-300 ${
        isHovered ? "bg-[#ff4d4d]/20" : theme === "dark" ? "bg-[#151515]" : "bg-gray-200"
      } ${theme === "dark" ? "text-white" : "text-gray-900"} relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Toggle theme"
    >
      <div className="relative z-10">
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </div>

      {/* Animated background that appears on hover */}
      <motion.div
        className="absolute inset-0 bg-[#ff4d4d]/20 z-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-[#ff4d4d]/10 rounded-full z-0"
        initial={{ scale: 0, opacity: 0.5 }}
        whiletap={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  )
}
