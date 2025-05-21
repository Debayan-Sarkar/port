"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import ProjectModal, { type Project } from "@/components/project-modal"

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isHoveringButton, setIsHoveringButton] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["150px", "-150px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  // 3D transforms for perspective effect
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, 5])
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  const projects: Project[] = [
    {
      id: 1,
      title: "JRPasset Investments",
      category: "Web Development",
      image: "/jrpasset-homepage.png",
      description:
        "A cutting-edge cryptocurrency and gold investment platform with real-time market data, secure trading capabilities, and lucrative profit opportunities. The platform features a responsive design, intuitive user interface, and comprehensive investment tools for both novice and experienced investors.",
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "WebSockets", "AWS"],
      demoUrl: "https://www.jrpassetinvestments.com/",
      caseStudyUrl: "/projects/jrpasset-investments",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "Mobile App",
      image: "/banking-app-project.jpg",
      description:
        "A secure and user-friendly mobile banking application with real-time transaction tracking and financial management tools. Features include biometric authentication, spending analytics, and investment tracking. This app provides users with a comprehensive view of their finances and enables them to make informed decisions about their money. The intuitive interface makes complex financial tasks simple and accessible.",
      technologies: ["React Native", "Firebase", "Redux", "Plaid API", "Biometric Authentication"],
      demoUrl: "https://example.com/banking-demo",
    },
    {
      id: 3,
      title: "Corporate Website Redesign",
      category: "Web Development",
      image: "/corporate-website-project.jpg",
      description:
        "A complete redesign of a corporate website with improved user experience, performance optimization, and content management system. Emphasized accessibility and mobile responsiveness. The new design reflects the company's brand identity while providing a modern, engaging experience for visitors. The CMS allows for easy content updates and maintenance, reducing the need for technical support.",
      technologies: ["React", "Tailwind CSS", "Sanity CMS", "Framer Motion", "Vercel"],
      demoUrl: "https://example.com/corporate-demo",
      caseStudyUrl: "https://example.com/corporate-case-study",
    },
    {
      id: 4,
      title: "Inventory Management System",
      category: "Software",
      image: "/inventory-system-project.jpg",
      description:
        "A robust inventory management system with barcode scanning, real-time stock tracking, and automated reordering capabilities. Includes supplier management and detailed reporting features. This system helps businesses optimize their inventory levels, reduce costs, and improve efficiency. The dashboard provides at-a-glance insights into inventory status and alerts for low stock items.",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Docker", "WebSockets"],
      demoUrl: "https://example.com/inventory-demo",
    },
    {
      id: 5,
      title: "Healthcare Patient Portal",
      category: "Web Development",
      image: "/healthcare-portal-project.jpg",
      description:
        "A secure patient portal for healthcare providers with appointment scheduling, medical record access, and telemedicine integration. Fully HIPAA compliant with encrypted data storage. This portal improves patient engagement and streamlines administrative processes for healthcare providers. The telemedicine feature enables remote consultations, expanding access to healthcare services.",
      technologies: ["Angular", "Node.js", "MongoDB", "Socket.io", "HIPAA Compliance"],
      caseStudyUrl: "https://example.com/healthcare-case-study",
    },
    {
      id: 6,
      title: "Fitness Tracking App",
      category: "Mobile App",
      image: "/fitness-app-project.jpg",
      description:
        "A comprehensive fitness tracking application with workout plans, progress monitoring, and social sharing features. Includes AI-powered form correction and personalized workout recommendations. This app helps users stay motivated and achieve their fitness goals through personalized guidance and community support. The AI features provide real-time feedback to improve workout effectiveness and prevent injuries.",
      technologies: ["Flutter", "Firebase", "Google Fit API", "Apple HealthKit", "Machine Learning"],
      demoUrl: "https://example.com/fitness-demo",
      caseStudyUrl: "https://example.com/fitness-case-study",
    },
  ]

  const categories = ["All", "Web Development", "Mobile App", "Software"]

  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

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

  const filterButtonVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: i * 0.1,
      },
    }),
  }

  const projectCardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.85,
      rotateX: 15,
      rotateY: -5,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 90,
        delay: i * 0.1,
      },
    }),
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      transition: { duration: 0.3 },
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
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(255, 77, 77, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 5px 15px -5px rgba(255, 77, 77, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-[#0a0a0a] relative overflow-hidden perspective">
      {/* Projects illustration */}
      <motion.div
        style={{ y, opacity, rotateX, rotateY, scale }}
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none transform-gpu"
      >
        <div className="w-full h-full max-w-6xl max-h-[800px] relative">
          <Image
            src="/projects-illustration.png"
            alt="Projects visualization"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0e0e0e] to-transparent -z-10" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
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
              Our Projects
            </span>
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Our{" "}
            <span className="text-[#ff4d4d] relative inline-block">
              Latest
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
            Work
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={descriptionVariants}
            className="text-white/70 text-lg"
          >
            Explore our portfolio of successful projects that showcase our expertise and commitment to delivering
            exceptional digital solutions for our clients.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true, amount: 0.2 }}
              variants={filterButtonVariants}
            >
              <Button
                variant="ghost"
                onClick={() => setFilter(category)}
                className={`
                  text-sm uppercase font-medium tracking-wider px-6 py-2 rounded-full border relative overflow-hidden
                  ${
                    filter === category
                      ? "bg-[#ff4d4d] text-white border-[#ff4d4d] hover:bg-[#ff3333]"
                      : "text-white/70 border-white/20 hover:text-white hover:border-white"
                  }
                `}
                whilehover={{ scale: 1.05 }}
                whiletap={{ scale: 0.98 }}
              >
                {filter === category && (
                  <motion.div
                    layoutId="activeFilterBackground"
                    className="absolute inset-0 bg-[#ff4d4d] -z-10"
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                )}
                {category}
              </Button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true, amount: 0.1 }}
                variants={projectCardVariants}
                whilehover={{ y: -10, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="relative h-80 overflow-hidden rounded-2xl">
                  {/* Glass effect overlay - always visible but more prominent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#151515]/70 to-[#1a1a1a]/70 backdrop-blur-sm border border-white/10 rounded-2xl z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-2xl"
                  />

                  {/* Content overlay - always visible */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
                    <div className="bg-[#ff4d4d] text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider self-start">
                      {project.category}
                    </div>

                    <div className="backdrop-blur-sm bg-black/50 p-4 rounded-xl border border-white/10 transform transition-all duration-300 group-hover:scale-105">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white/10 backdrop-blur-md px-2 py-1 rounded-full text-white/80"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs bg-white/10 backdrop-blur-md px-2 py-1 rounded-full text-white/80">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      <Button
                        className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white rounded-full w-full group overflow-hidden"
                        onClick={() => setSelectedProject(project)}
                        whilehover={{ scale: 1.05 }}
                        whiletap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          View Project
                          <motion.span initial={{ x: 0 }} whilehover={{ x: 5 }} transition={{ duration: 0.3 }}>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </motion.span>
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={buttonVariants}
          className="text-center mt-16"
        >
          <Link href="/projects">
            <motion.div
              className="inline-block"
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
              whilehover="hover"
              whiletap="tap"
              variants={buttonVariants}
            >
              <Button className="bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-full px-10 py-6 text-sm uppercase font-medium tracking-wider shadow-lg shadow-[#ff4d4d]/20 overflow-hidden relative">
                {/* Animated particles */}
                {isHoveringButton && (
                  <>
                    <motion.span
                      className="absolute w-1 h-1 rounded-full bg-white/80"
                      animate={{
                        x: [0, -20],
                        y: [0, -30],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                    />
                    <motion.span
                      className="absolute w-1 h-1 rounded-full bg-white/80"
                      animate={{
                        x: [0, 20],
                        y: [0, -20],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.2 }}
                    />
                    <motion.span
                      className="absolute w-1 h-1 rounded-full bg-white/80"
                      animate={{
                        x: [0, -10],
                        y: [0, -15],
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0],
                      }}
                      transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.4 }}
                    />
                  </>
                )}

                {/* Animated background that moves on hover */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#ff3333] to-[#ff5555] z-0"
                  initial={{ x: "100%" }}
                  animate={{ x: isHoveringButton ? 0 : "100%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />

                {/* Button text and icon */}
                <span className="relative z-10 flex items-center">
                  View All Projects
                  <motion.span animate={{ x: isHoveringButton ? 5 : 0 }} transition={{ duration: 0.3 }}>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
