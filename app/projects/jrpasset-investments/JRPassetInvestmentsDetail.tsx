"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ExternalLink, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"

export default function JRPassetInvestmentsDetail() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollYProgress } = useScroll()

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0a0a0a] text-white pt-16">
        {/* Video Background Header */}
        <div className="relative h-[70vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />

          {/* Video */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ scale, y }}
            className="absolute inset-0 w-full h-full"
          >
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/jrpasset-demo.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-8 left-8 z-20"
          >
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 rounded-full group"
              onClick={() => router.back()}
            >
              <motion.span initial={{ x: 0 }} whilehover={{ x: -3 }} transition={{ duration: 0.2 }}>
                <ChevronLeft className="mr-2 h-4 w-4 group-hover:text-[#ff4d4d]" />
              </motion.span>
              Back to Projects
            </Button>
          </motion.div>

          {/* Project title overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#f7931a] to-[#ffb74d]"
            >
              JRPasset Investments
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/80 max-w-3xl"
            >
              Cryptocurrency and Gold Investment Platform
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8"
            >
              <a href="https://www.jrpassetinvestments.com/" target="_blank" rel="noopener noreferrer">
                <Button
                  className="bg-gradient-to-r from-[#f7931a] to-[#ffb74d] hover:from-[#e68a19] hover:to-[#f0a83c] text-white rounded-full px-8 py-6 group"
                  size="lg"
                  whilehover={{ scale: 1.05 }}
                  whiletap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    View Live Project
                    <motion.span initial={{ x: 0 }} whilehover={{ x: 3 }} transition={{ duration: 0.2 }}>
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </motion.span>
                  </span>
                </Button>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Project Content */}
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-6"
              >
                Project Overview
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/70 mb-6 text-lg leading-relaxed"
              >
                JRPasset Investments is a cutting-edge cryptocurrency and gold investment platform designed to provide
                users with lucrative profit opportunities. The platform offers a comprehensive suite of investment
                tools, real-time market data, and secure trading capabilities.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/70 mb-6 text-lg leading-relaxed"
              >
                Our team developed a responsive, user-friendly interface that caters to both novice and experienced
                investors. The platform features real-time cryptocurrency price tracking, portfolio management tools,
                and secure transaction processing.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/70 text-lg leading-relaxed"
              >
                With over 90 million users worldwide, JRPasset Investments has established itself as a trusted name in
                the cryptocurrency and gold investment space, offering fast trading, secure transactions, and continuous
                market updates.
              </motion.p>
            </div>

            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl font-semibold mb-4"
              >
                Project Details
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/8"
              >
                <div className="mb-4">
                  <span className="text-white/50 block mb-1">Client</span>
                  <span className="text-white">JRPasset Investments Ltd</span>
                </div>
                <div className="mb-4">
                  <span className="text-white/50 block mb-1">Timeline</span>
                  <span className="text-white">4 months</span>
                </div>
                <div className="mb-4">
                  <span className="text-white/50 block mb-1">Services</span>
                  <span className="text-white">Web Development, UI/UX Design, Backend Development</span>
                </div>
                <div>
                  <span className="text-white/50 block mb-1">Website</span>
                  <a
                    href="https://www.jrpassetinvestments.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f7931a] hover:text-[#ffb74d] flex items-center group"
                  >
                    jrpassetinvestments.com
                    <motion.span initial={{ x: 0 }} whilehover={{ x: 3 }} transition={{ duration: 0.2 }}>
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </motion.span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Technologies Used */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Express",
                "MongoDB",
                "WebSockets",
                "Chart.js",
                "Docker",
                "AWS",
                "Stripe API",
                "Cryptocurrency APIs",
              ].map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                  whilehover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Project Screenshots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whilehover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden shadow-lg shadow-black/30"
              >
                <Image
                  src="/jrpasset-homepage.png"
                  alt="JRPasset Investments Homepage"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                whilehover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden shadow-lg shadow-black/30"
              >
                <Image
                  src="/jrpasset-dashboard.png"
                  alt="JRPasset Investments Dashboard"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                whilehover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden shadow-lg shadow-black/30"
              >
                <Image
                  src="/jrpasset-mobile-view.png"
                  alt="JRPasset Investments Mobile View"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                whilehover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden shadow-lg shadow-black/30"
              >
                <Image
                  src="/jrpasset-desktop-view.png"
                  alt="JRPasset Investments Desktop View"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whilehover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#f7931a] to-[#ffb74d] rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Trading</h3>
                <p className="text-white/70">
                  Fast and secure cryptocurrency trading with real-time market data and instant execution.
                </p>
              </motion.div>
              <motion.div
                whilehover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#f7931a] to-[#ffb74d] rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
                <p className="text-white/70">
                  Advanced encryption and multi-factor authentication to protect user assets and data.
                </p>
              </motion.div>
              <motion.div
                whilehover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#f7931a] to-[#ffb74d] rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 2v8M4.93 10.93l1.41 1.41M2 18h2M20 18h2M19.07 10.93l-1.41 1.41M22 22H2M16 6l-4 4-4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Gold Investment</h3>
                <p className="text-white/70">
                  Innovative gold savings options with competitive returns and flexible investment terms.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mt-16"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Visit JRPasset Investments to discover how you can refine your gold and Bitcoin savings with lucrative
              profit opportunities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whilehover={{ scale: 1.05 }} whiletap={{ scale: 0.98 }}>
                <a href="https://www.jrpassetinvestments.com/" target="_blank" rel="noopener noreferrer">
                  <Button
                    className="bg-gradient-to-r from-[#f7931a] to-[#ffb74d] hover:from-[#e68a19] hover:to-[#f0a83c] text-white rounded-full px-8 py-6 group"
                    size="lg"
                  >
                    <span className="flex items-center">
                      Visit Website
                      <motion.span
                        initial={{ x: 0 }}
                        whilehover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        <ExternalLink className="ml-2 h-5 w-5" />
                      </motion.span>
                    </span>
                  </Button>
                </a>
              </motion.div>
              <motion.div whilehover={{ scale: 1.05 }} whiletap={{ scale: 0.98 }}>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 group"
                    size="lg"
                  >
                    <span className="flex items-center">
                      Contact Us
                      <motion.span
                        initial={{ x: 0 }}
                        whilehover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.span>
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
