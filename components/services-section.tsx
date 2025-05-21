"use client"

import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import { Code, Smartphone, Globe, Database, PenTool, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRef } from "react"

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["150px", "-150px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.5, 1, 1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  // Additional 3D perspective transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, 5])
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5])

  const services = [
    {
      icon: <Globe className="h-10 w-10" />,
      title: "Web3 Development",
      description:
        "We create decentralized applications and blockchain solutions that leverage the power of Web3 technologies.",
    },
    {
      icon: <Smartphone className="h-10 w-10" />,
      title: "AI-Powered Mobile Apps",
      description:
        "Native and cross-platform mobile applications with integrated AI capabilities for iOS and Android that deliver exceptional user experiences.",
    },
    {
      icon: <Code className="h-10 w-10" />,
      title: "Custom Software",
      description:
        "Tailored software solutions with machine learning integration designed to address your specific business challenges and requirements.",
    },
    {
      icon: <Database className="h-10 w-10" />,
      title: "Cloud & Edge Computing",
      description:
        "Scalable, secure cloud infrastructure with edge computing capabilities to optimize performance and reduce latency.",
    },
    {
      icon: <PenTool className="h-10 w-10" />,
      title: "Immersive UI/UX Design",
      description:
        "User-centered design with AR/VR capabilities that combines aesthetics with functionality to create engaging digital experiences.",
    },
    {
      icon: <BarChart className="h-10 w-10" />,
      title: "AI-Driven Analytics",
      description:
        "Advanced analytics and business intelligence solutions powered by artificial intelligence to drive data-informed decisions.",
    },
  ]

  // Enhanced animation variants with advanced effects
  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -30,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  }

  const descriptionVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: 0.1,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotateX: 20,
      rotateY: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 90,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const iconVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -45,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 15,
      },
    },
  }

  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: 0.3,
      },
    },
  }

  return (
    <section id="services" ref={sectionRef} className="py-24 relative overflow-hidden perspective">
      {/* Services illustration with 3D perspective transform */}
      <motion.div
        style={{ y, opacity, scale, rotateX, rotateY }}
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none transform-gpu"
      >
        <div className="w-full h-full max-w-6xl max-h-[800px] relative">
          <Image
            src="/services-illustration.png"
            alt="Services visualization"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#ff4d4d]/5 to-transparent rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                },
              },
            }}
            className="inline-block mb-4"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
              Our Services
            </span>
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            We Provide{" "}
            <span className="text-[#ff4d4d] relative inline-block">
              Cutting-Edge
              <motion.svg
                className="absolute -bottom-1 left-0 w-full"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                  transition: {
                    pathLength: { type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { duration: 0.5 },
                  },
                }}
                viewport={{ once: true }}
                viewBox="0 0 100 5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path d="M0,2.5 Q25,4.5 50,2.5 Q75,0.5 100,2.5" fill="none" stroke="#ff4d4d" strokeWidth="1" />
              </motion.svg>
            </span>{" "}
            Digital Solutions
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={descriptionVariants}
            className="text-white/70 text-lg"
          >
            Our comprehensive range of services is designed to help businesses thrive in the digital landscape. From web
            development to digital marketing, we've got you covered.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={cardVariants}
              custom={index}
              whilehover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="group relative h-full">
                {/* Glass card effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#151515]/80 to-[#1a1a1a]/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl transform transition-all duration-500 group-hover:border-[#ff4d4d]/30 group-hover:shadow-[#ff4d4d]/10"></div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Animated icon container */}
                  <motion.div
                    variants={iconVariants}
                    className="bg-gradient-to-br from-[#ff4d4d]/20 to-[#ff6b6b]/10 p-4 rounded-2xl mb-6 w-fit"
                    whilehover={{
                      rotate: [0, -10, 10, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    <div className="text-[#ff4d4d] group-hover:text-[#ff6b6b] transition-colors duration-300">
                      {service.icon}
                    </div>
                  </motion.div>

                  <motion.h3
                    className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: 0.1,
                          duration: 0.3,
                        },
                      },
                    }}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    className="text-white/70 group-hover:text-white/90 mb-6 flex-grow"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: 0.2,
                          duration: 0.3,
                        },
                      },
                    }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Animated line */}
                  <div className="mt-auto">
                    <motion.div
                      className="w-0 h-0.5 bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b]/50 group-hover:w-full transition-all duration-500"
                      variants={{
                        hidden: { width: 0 },
                        visible: {
                          width: "3rem",
                          transition: {
                            delay: 0.3,
                            duration: 0.4,
                          },
                        },
                      }}
                    />
                  </div>

                  {/* Hidden arrow that appears on hover */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whilehover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="#ff4d4d"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={buttonVariants}
          className="text-center mt-16"
        >
          <Button
            className="bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-full px-10 py-6 text-sm uppercase font-medium tracking-wider shadow-lg shadow-[#ff4d4d]/20 overflow-hidden relative"
            whilehover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whiletap={{ scale: 0.98 }}
          >
            {/* Animated background that moves on hover */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-[#ff3333] to-[#ff5555] z-0"
              initial={{ x: "100%" }}
              whilehover={{ x: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {/* Button text */}
            <span className="relative z-10">View All Services</span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
