"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import CountUp from "@/components/count-up"

export default function AboutContent() {
  const achievements = [
    { number: 5, suffix: "+", label: "Years Experience" },
    { number: 100, suffix: "+", label: "Projects Completed" },
    { number: 4, suffix: "+", label: "Team Members" },
    { number: 100, suffix: "%", label: "Client Satisfaction" },
  ]

  return (
    <motion.div className="w-full lg:w-1/2 text-center lg:text-left">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
            About Us
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold leading-tight"
        >
          We Are A Digital Agency With{" "}
          <span className="text-[#ff4d4d] relative">
            10+ Years
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 5" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,2.5 Q25,4.5 50,2.5 Q75,0.5 100,2.5" fill="none" stroke="#ff4d4d" strokeWidth="1" />
            </svg>
          </span>{" "}
          Of Experience
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white/70 text-lg leading-relaxed"
        >
          Founded by Templeton DC in 2021, JOMIEZ is a leading digital solutions provider specializing in web
          development, mobile applications, AI integration, and custom software solutions. With over a decade of
          experience, we've helped businesses of all sizes transform their digital presence and achieve their goals
          through cutting-edge technology and exceptional design. Our team stays at the forefront of emerging
          technologies to deliver future-proof solutions.
        </motion.p>

        <div className="space-y-6 mt-10">
          {[
            {
              title: "Innovative Solutions",
              description:
                "We create cutting-edge digital solutions tailored to your specific needs and business objectives.",
            },
            {
              title: "Expert Team",
              description: "Our team of skilled professionals brings diverse expertise to every project we undertake.",
            },
            {
              title: "Client-Focused Approach",
              description:
                "We prioritize your goals and work collaboratively to achieve exceptional results that exceed expectations.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-4 group"
            >
              <div className="p-1 bg-[#151515] text-[#ff4d4d] rounded-sm group-hover:bg-[#ff4d4d] group-hover:text-white transition-all duration-300 mt-1">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg group-hover:text-[#ff4d4d] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button className="mt-6 bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-none px-8 py-6 text-sm uppercase font-medium tracking-wider shadow-lg shadow-[#ff4d4d]/20 group">
            Learn More
            <motion.span initial={{ x: 0 }} whilehover={{ x: 5 }} transition={{ duration: 0.3 }}>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.span>
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 mt-16">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="text-center p-6 bg-[#151515] group hover:bg-[#ff4d4d] transition-colors duration-300"
            >
              <h3 className="text-4xl font-bold text-[#ff4d4d] group-hover:text-white transition-colors duration-300">
                <CountUp end={item.number} duration={2.5} />
                {item.suffix}
              </h3>
              <p className="text-white/70 group-hover:text-white/90 mt-2 text-sm uppercase tracking-wider transition-colors duration-300">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
