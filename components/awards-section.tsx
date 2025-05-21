"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Award, Trophy, Star } from "lucide-react"
import CursorBorder from "@/components/cursor-border"

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const awards = [
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Best Web Design Agency",
      org: "Design Awards",
      year: "2024",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence in UX",
      org: "UX/UI Awards",
      year: "2024",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Best Mobile App Design",
      org: "Mobile Excellence Awards",
      year: "2023",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Innovation in Web Development",
      org: "Tech Innovation Awards",
      year: "2023",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

      <motion.div style={{ y, opacity }} className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
            Recognition
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4">Awards & Achievements</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Our work and expertise have been recognized by leading industry organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: 30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
            >
              <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={0}>
                <motion.div
                  whilehover={{
                    y: -10,
                    boxShadow: "0 15px 30px -5px rgba(255, 77, 77, 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#151515] p-8 flex flex-col items-center text-center transform-gpu h-full"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                      delay: index * 0.1 + 0.2,
                    }}
                    className="relative mb-6"
                  >
                    <div className="absolute -inset-3 rounded-full bg-[#ff4d4d]/10 blur-md animate-pulse" />
                    <div className="relative bg-[#ff4d4d]/20 p-4 rounded-full text-[#ff4d4d]">{award.icon}</div>
                  </motion.div>

                  <motion.h3
                    className="text-xl font-bold mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                  >
                    {award.title}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
                    className="text-white/70 text-sm"
                  >
                    <p>{award.org}</p>
                    <p>{award.year}</p>
                  </motion.div>

                  <motion.div
                    className="w-12 h-0.5 bg-[#ff4d4d] mt-6"
                    initial={{ width: 0 }}
                    whileInView={{ width: "3rem" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  />
                </motion.div>
              </CursorBorder>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
