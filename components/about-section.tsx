"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import CountUp from "@/components/count-up"
import Link from "next/link"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const textX = useTransform(scrollYProgress, [0, 0.5], [50, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const achievements = [
    { number: 5, suffix: "+", label: "Years Experience" },
    { number: 100, suffix: "+", label: "Projects Completed" },
    { number: 4, suffix: "+", label: "Team Members" },
    { number: 100, suffix: "%", label: "Client Satisfaction" },
  ]

  // Animation variants for individual elements
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  }

  const achievementVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-[#ff4d4d]/10 to-transparent rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#ff4d4d]/10 to-transparent rounded-full blur-[100px] -z-10" />

      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col lg:flex-row gap-16 items-center"
        >
          <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="lg:w-1/2">
            <div className="relative">
              {/* Decorative elements */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
                }}
                className="absolute -top-8 -left-8 w-32 h-32 border-l-2 border-t-2 border-[#ff4d4d] z-10"
              />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
                }}
                className="absolute -bottom-8 -right-8 w-32 h-32 border-r-2 border-b-2 border-[#ff4d4d] z-10"
              />

              {/* Main image */}
              <div className="relative z-0 overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/about-image.jpg"
                    alt="About RCode Technologies"
                    width={600}
                    height={600}
                    className="object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/80 to-transparent mix-blend-multiply" />
                </div>

                {/* Floating badge */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
                  }}
                  className="absolute -bottom-6 -right-6 bg-[#ff4d4d] text-white py-4 px-6 shadow-xl"
                >
                  <span className="text-sm uppercase tracking-wider font-medium">Since 2013</span>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-16">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={achievementVariants}
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
          </motion.div>

          <motion.div style={{ x: textX, opacity: textOpacity }} className="lg:w-1/2">
            <div className="space-y-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={titleVariants}
                className="inline-block"
              >
                <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
                  About Us
                </span>
              </motion.div>

              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={titleVariants}
                className="text-4xl md:text-5xl font-bold leading-tight"
              >
                We Are A Digital Agency With{" "}
                <span className="text-[#ff4d4d] relative">
                  5+ Years
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 100 5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0,2.5 Q25,4.5 50,2.5 Q75,0.5 100,2.5" fill="none" stroke="#ff4d4d" strokeWidth="1" />
                  </svg>
                </span>{" "}
                Of Innovation
              </motion.h2>

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={descriptionVariants}
                className="text-white/70 text-lg leading-relaxed"
              >
                Founded by Templeton DC in 2021, JOMIEZ is a leading digital solutions provider specializing in web
                development, mobile applications, blockchain technology, and custom software solutions. With over a
                decade of experience, we've helped businesses of all sizes transform their digital presence and achieve
                their goals through innovative technology and exceptional design. We embrace the latest technologies to
                create immersive digital experiences.
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
                    description:
                      "Our team of skilled professionals brings diverse expertise to every project we undertake.",
                  },
                  {
                    title: "Client-Focused Approach",
                    description:
                      "We prioritize your goals and work collaboratively to achieve exceptional results that exceed expectations.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={featureVariants}
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Link href="/learn-more">
                  <Button className="mt-6 bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-none px-8 py-6 text-sm uppercase font-medium tracking-wider shadow-lg shadow-[#ff4d4d]/20 group relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Learn More
                      <motion.span
                        initial={{ x: 0 }}
                        whilehover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                        className="ml-2"
                      >
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] to-[#ff4d4d] z-0"
                      initial={{ x: "100%" }}
                      whilehover={{ x: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
