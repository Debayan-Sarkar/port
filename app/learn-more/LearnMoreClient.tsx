"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, Cpu, Globe, Lightbulb, Rocket, Users } from "lucide-react"

export default function LearnMoreClient() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-[#ff4d4d]/10 to-transparent rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#ff4d4d]/10 to-transparent rounded-full blur-[100px] -z-10" />

        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center text-center mb-16"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4">
              <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
                Our Story
              </span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Transforming Ideas Into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] to-[#ff8080]">
                Digital Reality
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Discover the journey, vision, and innovative approach that has made us a leading digital agency in the
              industry.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-[#0c0c0c]">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="lg:w-1/2">
              <div className="relative">
                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -top-8 -left-8 w-32 h-32 border-l-2 border-t-2 border-[#ff4d4d] z-10"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-8 -right-8 w-32 h-32 border-r-2 border-b-2 border-[#ff4d4d] z-10"
                />

                {/* Main image */}
                <div className="relative z-0 overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src="/founder-image.png"
                      alt="Templeton DC - Founder"
                      width={600}
                      height={600}
                      className="object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/80 to-transparent mix-blend-multiply" />
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="absolute -bottom-6 -right-6 bg-[#ff4d4d] text-white py-4 px-6 shadow-xl"
                  >
                    <span className="text-sm uppercase tracking-wider font-medium">Founder & CEO</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:w-1/2">
              <div className="space-y-6">
                <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold leading-tight">
                  Templeton DC
                </motion.h2>
                <motion.p variants={itemVariants} className="text-white/70 text-lg leading-relaxed">
                  With over 15 years of experience in the tech industry, Templeton DC founded JOMIEZ in 2013 with a
                  vision to bridge the gap between cutting-edge technology and practical business solutions. His
                  background in software engineering and design thinking has shaped our company's approach to digital
                  transformation.
                </motion.p>
                <motion.div variants={itemVariants} className="py-4 border-l-4 border-[#ff4d4d] pl-6 italic">
                  <p className="text-white/90 text-lg">
                    "Our mission is to empower businesses through technology that not only solves problems but creates
                    new opportunities for growth and innovation."
                  </p>
                </motion.div>
                <motion.div variants={itemVariants} className="flex gap-4 pt-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#151515] flex items-center justify-center text-white/70 hover:bg-[#ff4d4d] hover:text-white transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#151515] flex items-center justify-center text-white/70 hover:bg-[#ff4d4d] hover:text-white transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#151515] flex items-center justify-center text-white/70 hover:bg-[#ff4d4d] hover:text-white transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4">
              <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
                Our Approach
              </span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
              How We Deliver Exceptional Results
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/70 text-lg max-w-3xl mx-auto">
              Our methodology combines strategic thinking, technical expertise, and creative innovation to deliver
              solutions that exceed expectations.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Lightbulb className="h-8 w-8" />,
                title: "Strategic Planning",
                description:
                  "We begin with a deep understanding of your business goals and challenges to develop a strategic roadmap.",
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "Agile Development",
                description:
                  "Our iterative approach ensures flexibility, continuous improvement, and faster time-to-market.",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Collaborative Process",
                description:
                  "We work closely with you at every stage, ensuring your vision is realized through open communication.",
              },
              {
                icon: <Cpu className="h-8 w-8" />,
                title: "Cutting-Edge Technology",
                description: "We leverage the latest technologies and frameworks to build future-proof solutions.",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Scalable Solutions",
                description:
                  "Our solutions are designed to grow with your business, adapting to changing needs and opportunities.",
              },
              {
                icon: <Rocket className="h-8 w-8" />,
                title: "Continuous Innovation",
                description:
                  "We constantly explore new ideas and approaches to keep your digital presence ahead of the curve.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whilehover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-[#151515] p-8 rounded-lg hover:bg-gradient-to-br hover:from-[#1a1a1a] hover:to-[#252525] group transition-all duration-300"
              >
                <div className="p-4 bg-[#1e1e1e] rounded-lg inline-block mb-6 text-[#ff4d4d] group-hover:bg-[#ff4d4d] group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-[#ff4d4d] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0c0c0c] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#ff4d4d]/10 to-transparent rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#ff4d4d]/10 to-transparent rounded-full blur-[100px] -z-10" />

        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              Ready to Transform Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] to-[#ff8080]">
                Digital Presence
              </span>
              ?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/70 text-lg mb-8">
              Let's collaborate to create innovative solutions that drive your business forward. Our team is ready to
              bring your vision to life.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-lg text-lg font-medium transition-all duration-300 shadow-lg shadow-[#ff4d4d]/20 group"
              >
                Get In Touch
                <motion.span initial={{ x: 0 }} whilehover={{ x: 5 }} transition={{ duration: 0.3 }} className="ml-2">
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
