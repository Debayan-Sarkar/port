"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Globe, Users, Award, Cpu } from "lucide-react"
import CountUp from "@/components/count-up"
import CursorBorder from "@/components/cursor-border"

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const stats = [
    {
      icon: <Code className="h-8 w-8" />,
      value: 15000,
      suffix: "+",
      label: "Lines of Code",
      decimal: 0,
    },
    {
      icon: <Globe className="h-8 w-8" />,
      value: 25,
      suffix: "+",
      label: "Countries Reached",
      decimal: 0,
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: 99.8,
      suffix: "%",
      label: "Client Satisfaction",
      decimal: 1,
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: 42,
      suffix: "",
      label: "Awards Won",
      decimal: 0,
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      value: 267,
      suffix: "",
      label: "Deployments",
      decimal: 0,
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
            By The Numbers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4">Our Impact in Statistics</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Numbers tell a story of our journey, dedication, and the trust our clients place in us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateY: 30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
            >
              <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={8}>
                <motion.div
                  whilehover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(255, 77, 77, 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#151515] p-8 rounded-lg text-center flex flex-col items-center transform-gpu"
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
                    className="mb-6 text-[#ff4d4d]"
                  >
                    {stat.icon}
                  </motion.div>

                  <motion.h3
                    className="text-4xl font-bold mb-2 flex items-center justify-center"
                    initial={{ opacity: 0, blur: "5px" }}
                    whileInView={{ opacity: 1, blur: "0px" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
                  >
                    <CountUp end={stat.value} duration={2.5} decimals={stat.decimal} />
                    <span>{stat.suffix}</span>
                  </motion.h3>

                  <motion.p
                    className="text-white/70 text-sm uppercase tracking-wider"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.4 }}
                  >
                    {stat.label}
                  </motion.p>
                </motion.div>
              </CursorBorder>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
