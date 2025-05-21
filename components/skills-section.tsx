"use client"

import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import { Database, Globe, Layout, Server, Smartphone, Cpu, Cloud, GitBranch, PenTool } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  const skills = [
    {
      category: "Frontend",
      icon: <Layout className="h-8 w-8" />,
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: "Backend",
      icon: <Server className="h-8 w-8" />,
      items: ["Node.js", "Express", "Python", "Django", "GraphQL"],
    },
    {
      category: "Database",
      icon: <Database className="h-8 w-8" />,
      items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
    },
    {
      category: "Mobile",
      icon: <Smartphone className="h-8 w-8" />,
      items: ["React Native", "Flutter", "Expo", "iOS", "Android"],
    },
    {
      category: "DevOps",
      icon: <Cloud className="h-8 w-8" />,
      items: ["Docker", "Kubernetes", "AWS", "Vercel", "CI/CD"],
    },
    {
      category: "Tools",
      icon: <GitBranch className="h-8 w-8" />,
      items: ["Git", "GitHub", "VS Code", "Figma", "Postman"],
    },
    {
      category: "Web",
      icon: <Globe className="h-8 w-8" />,
      items: ["HTML5", "CSS3", "SEO", "Accessibility", "Performance"],
    },
    {
      category: "Design",
      icon: <PenTool className="h-8 w-8" />,
      items: ["UI/UX", "Wireframing", "Prototyping", "Design Systems", "Animation"],
    },
    {
      category: "Other",
      icon: <Cpu className="h-8 w-8" />,
      items: ["AI/ML Basics", "WebSockets", "Testing", "Agile", "Microservices"],
    },
  ]

  // Enhanced animation variants with multi-dimensional animations
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: 15,
      rotateY: -5,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
  }

  const iconVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -30,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  const descriptionVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  const listItemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  }

  const dotVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  }

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background skill illustration with parallax effect */}
      <motion.div
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
      >
        <div className="w-full h-full max-w-6xl max-h-[800px] relative">
          <Image src="/skills-illustration.png" alt="Skills visualization" fill className="object-contain" priority />
        </div>
      </motion.div>

      <div className="container px-4 md:px-6 relative z-10" ref={containerRef}>
        <div className="text-center mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={titleVariants}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500"
          >
            Technical Skills
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={descriptionVariants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            A comprehensive overview of my technical expertise and the technologies I work with to build modern,
            scalable applications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={cardVariants}
              className="bg-black/5 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              whilehover={{
                scale: 1.03,
                boxShadow: "0 15px 30px -5px rgba(124, 58, 237, 0.15), 0 10px 15px -5px rgba(124, 58, 237, 0.1)",
                transition: { duration: 0.3 },
              }}
            >
              {/* Card glow effect on hover */}
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10" />

              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  variants={iconVariants}
                  whilehover={{
                    rotate: [0, -10, 10, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                  className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-purple-500"
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-xl font-semibold">{skill.category}</h3>
              </div>
              <ul className="space-y-2">
                {skill.items.map((item, i) => (
                  <motion.li key={i} custom={i} variants={listItemVariants} className="flex items-center gap-2">
                    <motion.div
                      variants={dotVariants}
                      className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                    />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Decorative corner accent */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="absolute top-0 right-0 w-16 h-16 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-purple-500/30 border-r-transparent" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
