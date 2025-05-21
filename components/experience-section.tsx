"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function ExperienceSection() {
  const experiences = [
    {
      id: 1,
      role: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2021 - Present",
      description:
        "Lead the frontend development team in building a SaaS platform used by over 50,000 customers. Implemented performance optimizations that improved page load times by 40%.",
      technologies: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS"],
      achievements: [
        "Architected and implemented a component library used across multiple products",
        "Reduced bundle size by 35% through code splitting and lazy loading",
        "Mentored junior developers and established frontend best practices",
      ],
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "InnovateSoft",
      period: "2019 - 2021",
      description:
        "Developed and maintained multiple web applications for clients in healthcare, finance, and e-commerce sectors.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "AWS"],
      achievements: [
        "Built a telemedicine platform that facilitated over 10,000 virtual appointments",
        "Implemented CI/CD pipelines that reduced deployment time by 70%",
        "Integrated payment processing systems for e-commerce platforms",
      ],
    },
    {
      id: 3,
      role: "Frontend Developer",
      company: "WebSolutions Ltd.",
      period: "2017 - 2019",
      description:
        "Worked on responsive web applications and collaborated with designers to implement pixel-perfect UI designs.",
      technologies: ["JavaScript", "Vue.js", "SCSS", "Webpack", "Jest"],
      achievements: [
        "Developed interactive data visualizations for a financial analytics dashboard",
        "Improved accessibility across all company products to meet WCAG standards",
        "Created reusable animation components that enhanced user experience",
      ],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="experience" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
            Professional Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the companies I've had the privilege to work with throughout my career.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 to-cyan-500 transform md:translate-x-[-0.5px]" />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={item}
                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 transform -translate-x-[10px] md:-translate-x-[12px] z-10">
                  <div className="absolute inset-1 rounded-full bg-background" />
                </div>

                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-10 md:pl-0`}>
                  <div className="bg-black/5 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <Badge className="mt-2 md:mt-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-500 border-purple-500/20 w-fit">
                        {exp.period}
                      </Badge>
                    </div>
                    <h4 className="text-lg font-medium text-purple-500 mb-4">{exp.company}</h4>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    <div className="mb-4">
                      <h5 className="text-sm font-semibold mb-2">Key Achievements:</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 mt-1.5 mr-2" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="bg-purple-500/5 text-purple-500 border-purple-500/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
