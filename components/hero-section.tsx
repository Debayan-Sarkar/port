"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isHoveringServiceButton, setIsHoveringServiceButton] = useState(false)
  const [isHoveringContactButton, setIsHoveringContactButton] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
    },
    button: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      mixBlendMode: "difference" as const,
    },
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-[#ff4d4d] z-50 pointer-events-none hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />

      {/* Background overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e] to-[#1a1a1a] z-5" />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* 3D Gradient Mesh */}
      <div className="absolute inset-0 -z-5 opacity-40">
        <div
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 bg-gradient-to-l from-[#ff4d4d]/80 to-[#ff8080]/80 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: "14s", animationDelay: "2s" }}
        />
      </div>

      {/* WEB3 & AI INNOVATION STUDIO - Desktop version (hidden on mobile) */}
      <div className="absolute top-24 left-0 right-0 hidden md:flex justify-center w-full z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-6 py-2 inline-block"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-sm uppercase tracking-[0.2em] text-white font-medium flex items-center"
            >
              <span className="inline-block w-2 h-2 bg-[#ff4d4d] rounded-full mr-3 animate-pulse"></span>
              Web3 & AI Innovation Studio
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 z-10 relative">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-4 lg:gap-12">
          {/* Left content - Text */}
          <motion.div style={{ opacity }} className="w-full md:w-1/2 text-center space-y-8">
            {/* Agency Label - Only visible on mobile, positioned as in original layout */}
            <div className="flex justify-center w-full md:hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative z-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-6 py-2 inline-block"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="text-sm uppercase tracking-[0.2em] text-white font-medium flex items-center"
                  >
                    <span className="inline-block w-2 h-2 bg-[#ff4d4d] rounded-full mr-3 animate-pulse"></span>
                    Web3 & AI Innovation Studio
                  </motion.span>
                </motion.div>
              </motion.div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                  <div className="overflow-hidden">
                    <motion.span
                      initial={{ y: 100 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="inline-block text-white"
                    >
                      We Create
                    </motion.span>
                  </div>
                  <div className="overflow-hidden mt-2">
                    <motion.span
                      initial={{ y: 100 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] to-[#ff8080] relative"
                    >
                      Digital Experiences
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="absolute -bottom-2 md:-bottom-4 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-[#ff4d4d] to-[#ff8080] origin-left"
                      />
                    </motion.span>
                  </div>
                  <div className="overflow-hidden mt-2">
                    <motion.span
                      initial={{ y: 100 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="inline-block text-white"
                    >
                      For Your Business
                    </motion.span>
                  </div>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-lg md:text-xl text-white/80 font-light leading-relaxed"
              >
                Transforming ideas into immersive digital experiences with AI-powered solutions, blockchain technology,
                and innovative design that pushes boundaries.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col space-y-6"
            >
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/services">
                  <motion.div
                    onMouseEnter={() => {
                      setCursorVariant("button")
                      setIsHoveringServiceButton(true)
                    }}
                    onMouseLeave={() => {
                      setCursorVariant("default")
                      setIsHoveringServiceButton(false)
                    }}
                    whilehover={{ scale: 1.05 }}
                    whiletap={{ scale: 0.98 }}
                    className="group relative overflow-hidden rounded-xl px-8 py-4 bg-gradient-to-r from-[#ff4d4d] to-[#ff8080] text-white font-medium shadow-lg shadow-[#ff4d4d]/20"
                  >
                    <span className="relative z-10 flex items-center text-sm uppercase tracking-wider">
                      Our Services
                      <motion.span animate={{ x: isHoveringServiceButton ? 5 : 0 }} transition={{ duration: 0.3 }}>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform" />
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] to-[#ff4d4d] z-0"
                      initial={{ x: "100%" }}
                      animate={{ x: isHoveringServiceButton ? 0 : "100%" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute -inset-[2px] rounded-xl z-0 bg-gradient-to-r from-[#ff4d4d] to-[#ff8080] opacity-0 blur-sm transition-opacity duration-300"
                      animate={{ opacity: isHoveringServiceButton ? 1 : 0 }}
                    />

                    {/* Animated particles */}
                    {isHoveringServiceButton && (
                      <>
                        <motion.span
                          className="absolute w-1 h-1 rounded-full bg-white/80"
                          animate={{
                            x: [0, -20],
                            y: [0, -30],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                          }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                        />
                        <motion.span
                          className="absolute w-1 h-1 rounded-full bg-white/80"
                          animate={{
                            x: [0, 20],
                            y: [0, -20],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            delay: 0.2,
                          }}
                        />
                        <motion.span
                          className="absolute w-1 h-1 rounded-full bg-white/80"
                          animate={{
                            x: [0, -10],
                            y: [0, -15],
                            opacity: [0, 1, 0],
                            scale: [0, 1.2, 0],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            delay: 0.4,
                          }}
                        />
                      </>
                    )}
                  </motion.div>
                </Link>

                <Link href="/contact">
                  <motion.div
                    onMouseEnter={() => {
                      setCursorVariant("button")
                      setIsHoveringContactButton(true)
                    }}
                    onMouseLeave={() => {
                      setCursorVariant("default")
                      setIsHoveringContactButton(false)
                    }}
                    whilehover={{ scale: 1.05 }}
                    whiletap={{ scale: 0.98 }}
                    className="group relative overflow-hidden rounded-xl px-8 py-4 bg-[#1e1e1e]/60 backdrop-blur-sm border border-white/10 text-white font-medium shadow-lg shadow-black/20"
                  >
                    <span className="relative z-10 flex items-center text-sm uppercase tracking-wider">
                      Get In Touch
                      <motion.span
                        animate={{
                          opacity: isHoveringContactButton ? 1 : 0,
                          x: isHoveringContactButton ? 0 : -5,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform" />
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/5 rounded-xl z-0"
                      animate={{ opacity: isHoveringContactButton ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute -inset-[2px] rounded-xl z-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 blur-sm transition-opacity duration-300"
                      animate={{ opacity: isHoveringContactButton ? 1 : 0 }}
                    />
                  </motion.div>
                </Link>
              </div>

              {/* Trusted By Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-12"
              >
                <motion.div
                  className="flex -space-x-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-[#0a0a0a] flex items-center justify-center text-white text-xs font-bold"
                    whilehover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    AB
                  </motion.div>
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 border-2 border-[#0a0a0a] flex items-center justify-center text-white text-xs font-bold"
                    whilehover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    CD
                  </motion.div>
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-[#0a0a0a] flex items-center justify-center text-white text-xs font-bold"
                    whilehover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    EF
                  </motion.div>
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff4d4d] to-[#ff8080] border-2 border-[#0a0a0a] flex items-center justify-center text-white text-xs font-bold"
                    whilehover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    +97
                  </motion.div>
                </motion.div>
                <motion.div
                  className="flex flex-col"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.9, duration: 0.5 }}
                >
                  <p className="text-white font-medium text-lg">Trusted by 100+ clients</p>
                  <p className="text-white/60 text-sm">worldwide</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right content - 3D Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
              {/* Main illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/hero-developer.png"
                  alt="Developer illustration"
                  width={600}
                  height={500}
                  className="object-contain z-20"
                  priority
                />
              </div>

              {/* Floating elements with transparent backgrounds */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-[15%] right-[15%] z-30"
              >
                <Image
                  src="/floating-lightbulb.png"
                  alt="Idea lightbulb"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[25%] left-[10%] z-30"
              >
                <Image src="/floating-book.png" alt="Coding book" width={80} height={80} className="object-contain" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[30%] right-[20%] z-10"
              >
                <Image src="/floating-gear.png" alt="Settings gear" width={60} height={60} className="object-contain" />
              </motion.div>

              {/* Tech connection lines */}
              <svg
                className="absolute inset-0 w-full h-full z-10"
                viewBox="0 0 600 600"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M200,150 C250,180 300,120 350,150"
                  stroke="#ff4d4d"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  fill="none"
                  opacity="0.6"
                />
                <path
                  d="M150,250 C200,220 250,280 300,250"
                  stroke="#ff4d4d"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  fill="none"
                  opacity="0.6"
                />
                <path
                  d="M350,300 C400,330 450,270 500,300"
                  stroke="#ff4d4d"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  fill="none"
                  opacity="0.6"
                />
              </svg>

              {/* Glow effect behind illustration */}
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#ff4d4d]/20 to-[#ff8080]/20 blur-[60px]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Centered at bottom */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center w-full z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
        >
          <span className="text-xs uppercase tracking-wider">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-5 h-10 rounded-full border border-white/20 flex items-start justify-center p-1"
          >
            <motion.div className="w-1 h-1.5 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
