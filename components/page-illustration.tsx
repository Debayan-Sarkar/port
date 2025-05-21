"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface PageIllustrationProps {
  imageSrc: string
  altText: string
  page?: string
}

export default function PageIllustration({ imageSrc, altText, page }: PageIllustrationProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the window
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Calculate parallax effect based on mouse position
  const calculateParallax = (factor: number) => {
    return {
      x: (mousePosition.x - 0.5) * factor,
      y: (mousePosition.y - 0.5) * factor,
    }
  }

  return (
    <div className="w-full lg:w-1/2 relative">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        {/* Background glow effect */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#ff4d4d]/20 to-[#ff8080]/20 blur-[60px]" />
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={calculateParallax(20)}
          className="absolute top-[10%] right-[20%] z-30"
        >
          <div className="w-16 h-16 text-[#ff4d4d] opacity-70">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" />
            </svg>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
          style={calculateParallax(30)}
          className="absolute top-[15%] left-[15%] z-30"
        >
          <div className="w-12 h-12 text-[#ff4d4d] opacity-50">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="50" />
            </svg>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          style={calculateParallax(15)}
          className="absolute bottom-[20%] right-[15%] z-10"
        >
          <div className="w-20 h-20 text-[#ff4d4d] opacity-40">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <rect x="0" y="0" width="100" height="100" />
            </svg>
          </div>
        </motion.div>

        {/* Main illustration with parallax effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={calculateParallax(-5)}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          {page === "services" && (
            <Image
              src="/services-illustration-new.png"
              alt="Services Illustration"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          )}
          {page !== "services" && (
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={altText}
              width={500}
              height={400}
              className="object-contain"
              priority
            />
          )}
        </motion.div>

        {/* Tech connection lines */}
        <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M200,150 C250,180 300,120 350,150"
            stroke="#ff4d4d"
            strokeWidth="1.5"
            strokeDasharray="5,5"
            fill="none"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.path
            d="M150,250 C200,220 250,280 300,250"
            stroke="#ff4d4d"
            strokeWidth="1.5"
            strokeDasharray="5,5"
            fill="none"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
          <motion.path
            d="M350,300 C400,330 450,270 500,300"
            stroke="#ff4d4d"
            strokeWidth="1.5"
            strokeDasharray="5,5"
            fill="none"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.1 }}
          />
        </svg>
      </div>
    </div>
  )
}
