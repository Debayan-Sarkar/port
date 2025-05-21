"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import CursorBorder from "@/components/cursor-border"

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const clientLogos = [
    { name: "Client 1", logo: "/client-logo-1.svg" },
    { name: "Client 2", logo: "/client-logo-2.svg" },
    { name: "Client 3", logo: "/client-logo-3.svg" },
    { name: "Client 4", logo: "/client-logo-4.svg" },
    { name: "Client 5", logo: "/client-logo-5.svg" },
  ]

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 h-32 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 h-32 bottom-0 pointer-events-none" />

      <motion.div style={{ y, opacity }} className="container px-4 md:px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
            Trusted By
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4">Our Clients & Partners</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            We've had the privilege of working with amazing brands and businesses across various industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {clientLogos.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={4}>
                <div className="h-24 bg-[#151515] flex items-center justify-center p-6 group transition-all duration-300 hover:bg-[#ff4d4d]/10 rounded-sm">
                  <motion.div whilehover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Image
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      width={100}
                      height={60}
                      className="opacity-60 group-hover:opacity-100 transition-opacity duration-300 object-contain"
                    />
                  </motion.div>
                </div>
              </CursorBorder>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
