"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div style={{ opacity, scale }} className="container relative z-10 text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
        >
          Building the Future
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
        >
          We combine cutting-edge technologies with innovative design to create digital experiences that define the
          future.
        </motion.p>
      </motion.div>

      {/* Parallax layers */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ff4d4d]/10 rounded-full blur-[100px]" />
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute inset-0 z-0">
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#ff4d4d]/20 rounded-full blur-[120px]" />
      </motion.div>

      <motion.div style={{ y: y3 }} className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-[#ff4d4d]/30 rounded-full blur-[80px]" />
      </motion.div>
    </section>
  )
}
