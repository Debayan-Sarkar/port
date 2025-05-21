"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import CursorBorder from "@/components/cursor-border"

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const timelineEvents = [
    {
      year: "2013",
      title: "Company Founded",
      description: "RCode Technologies was established with a vision to deliver innovative digital solutions.",
    },
    {
      year: "2015",
      title: "First Major Client",
      description: "Secured our first enterprise client and expanded the team to 10 professionals.",
    },
    {
      year: "2017",
      title: "Expanding Services",
      description: "Added mobile app development and UI/UX design to our service offerings.",
    },
    {
      year: "2019",
      title: "International Expansion",
      description: "Opened our first international office and started serving clients globally.",
    },
    {
      year: "2021",
      title: "Major Recognition",
      description: "Received multiple industry awards for our innovative projects and designs.",
    },
    {
      year: "2023",
      title: "Technology Partnership",
      description: "Formed strategic partnerships with leading technology companies.",
    },
    {
      year: "2024",
      title: "Today",
      description: "Continuing to innovate and deliver exceptional digital experiences for our growing client base.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

      <motion.div style={{ y, opacity }} className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4">Company Timeline</h2>
          <p className="text-white/70 max-w-2xl mx-auto">A look at our growth and milestones over the years.</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#333] transform md:translate-x-[-0.5px]"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.5 }}
          />

          {/* Timeline events */}
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] transform -translate-x-[10px] md:-translate-x-[12px] z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute inset-1 rounded-full bg-[#0e0e0e]"
                />
              </motion.div>

              {/* Content */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-10 md:pl-0`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1,
                    type: "spring",
                    stiffness: 50,
                  }}
                >
                  <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={8}>
                    <motion.div
                      whilehover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#151515] p-6 rounded-lg transform-gpu"
                    >
                      <div className="bg-[#ff4d4d] text-white text-sm font-bold uppercase tracking-wider px-3 py-1 inline-block mb-4">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-white/70">{event.description}</p>

                      <motion.div
                        className="w-0 h-0.5 bg-[#ff4d4d] mt-4"
                        whileInView={{ width: "30%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      />
                    </motion.div>
                  </CursorBorder>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
