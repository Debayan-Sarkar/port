"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Download, Award, GraduationCap, Briefcase, Code, Star, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PageIllustration from "@/components/page-illustration"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { downloadCV } from "../actions/download"
import { Skeleton } from "@/components/ui/skeleton"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

const ExperienceSkeleton = () => (
  <div className="relative pl-8 border-l-2 border-[#333]">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#ff4d4d]" />
    <div className="bg-[#151515] p-6 rounded-lg border border-[#333]">
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-6 w-1/4 mb-2" />
      <ul>
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="flex items-start mb-2">
            <Skeleton className="h-5 w-5 mr-2" />
            <Skeleton className="h-4 w-full" />
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const SkillSkeleton = () => (
  <div className="bg-[#151515] p-6 rounded-lg border border-[#333]">
    <Skeleton className="h-8 w-1/2 mb-2" />
    <Skeleton className="h-2 w-full" />
  </div>
)

export default function ResumePageClient() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [activeTab, setActiveTab] = useState("experience")
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "success" | "error">("idle")
  const [downloadProgress, setDownloadProgress] = useState(0)
  const { toast } = useToast()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  // Handle CV download with animation
  const handleDownload = async () => {
    if (downloadState === "downloading") return

    try {
      setDownloadState("downloading")

      // Animate progress
      const progressInterval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 5
        })
      }, 100)

      // Call server action
      const result = await downloadCV()

      clearInterval(progressInterval)
      setDownloadProgress(100)

      if (result.success) {
        setDownloadState("success")
        toast({
          title: "Success!",
          description: "Resume downloaded successfully.",
          variant: "default",
        })

        // Trigger actual download
        const link = document.createElement("a")
        link.href = "/resume.pdf"
        link.download = "developer-resume.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Reset after animation completes
        setTimeout(() => {
          setDownloadState("idle")
          setDownloadProgress(0)
        }, 2000)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Download error:", error)
      setDownloadState("error")
      toast({
        title: "Download failed",
        description: "There was a problem downloading the resume. Please try again.",
        variant: "destructive",
      })

      // Reset after animation completes
      setTimeout(() => {
        setDownloadState("idle")
        setDownloadProgress(0)
      }, 2000)
    }
  }

  // Skills data with proficiency levels
  const skills = [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "UI/UX Design", level: 75 },
    { name: "GraphQL", level: 70 },
    { name: "Python", level: 65 },
    { name: "AWS", level: 60 },
  ]

  // Experience data
  const experiences = [
    {
      title: "Lead Frontend Developer",
      company: "TechInnovate Solutions",
      period: "2021 - Present",
      description:
        "Leading a team of 5 developers to build scalable web applications using React, Next.js, and TypeScript. Implemented CI/CD pipelines and improved performance by 40%.",
      achievements: [
        "Redesigned the company's flagship product, resulting in a 35% increase in user engagement",
        "Implemented a component library that reduced development time by 25%",
        "Mentored junior developers and conducted code reviews to maintain code quality",
      ],
    },
    {
      title: "Senior Frontend Developer",
      company: "Digital Crafters",
      period: "2018 - 2021",
      description:
        "Developed responsive web applications and progressive web apps for clients in various industries. Worked closely with designers and backend developers to deliver high-quality products.",
      achievements: [
        "Built an e-commerce platform that increased client's online sales by 50%",
        "Optimized application performance, reducing load time by 60%",
        "Implemented automated testing, reducing bugs in production by 30%",
      ],
    },
    {
      title: "Web Developer",
      company: "CreativeMinds Agency",
      period: "2016 - 2018",
      description:
        "Created websites and web applications for small to medium-sized businesses. Responsible for both frontend and backend development.",
      achievements: [
        "Developed over 20 websites for various clients",
        "Implemented responsive designs that worked across all devices",
        "Integrated payment gateways and CMS solutions",
      ],
    },
  ]

  // Education data
  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "Tech University",
      period: "2014 - 2016",
      description: "Specialized in Web Technologies and Human-Computer Interaction. Graduated with honors.",
      achievements: [
        "Thesis: 'Improving User Experience in Progressive Web Applications'",
        "Published 2 research papers in international conferences",
        "Recipient of the Outstanding Graduate Student Award",
      ],
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "State University",
      period: "2010 - 2014",
      description: "Focused on software development methodologies and programming fundamentals.",
      achievements: [
        "Graduated summa cum laude with a 3.9 GPA",
        "Led a team that won the university's annual hackathon",
        "Completed internship at a leading tech company",
      ],
    },
  ]

  // Certifications data
  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022",
      description: "Validated expertise in designing distributed systems on AWS.",
    },
    {
      name: "Google Professional Cloud Developer",
      issuer: "Google Cloud",
      date: "2021",
      description: "Demonstrated ability to build scalable applications using Google Cloud technologies.",
    },
    {
      name: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      date: "2020",
      description: "Expertise in Agile methodologies and Scrum framework implementation.",
    },
    {
      name: "React Advanced Concepts",
      issuer: "Frontend Masters",
      date: "2019",
      description: "Mastery of advanced React patterns and performance optimization techniques.",
    },
  ]

  // Button variants based on download state
  const getButtonContent = () => {
    switch (downloadState) {
      case "downloading":
        return (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Downloading...
          </>
        )
      case "success":
        return (
          <>
            <Check className="mr-2 h-4 w-4" />
            Downloaded!
          </>
        )
      case "error":
        return "Try Again"
      default:
        return (
          <>
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </>
        )
    }
  }

  // Button color based on download state
  const getButtonClass = () => {
    switch (downloadState) {
      case "downloading":
        return "bg-gradient-to-r from-[#ff4d4d]/80 to-[#ff6b6b]/80 hover:from-[#ff4d4d]/80 hover:to-[#ff6b6b]/80 text-white/90"
      case "success":
        return "bg-gradient-to-r from-[#4dff7c] to-[#6bff9d] hover:from-[#4dff7c] hover:to-[#6bff9d] text-black"
      case "error":
        return "bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white"
      default:
        return "bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white"
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0e0e0e] text-white">
        <Header />
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Skeleton className="h-4 w-40 mx-auto mb-4" />
              <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
              <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-8" />

              <Skeleton className="h-12 w-48 mx-auto rounded-full mb-12" />

              <Skeleton className="w-full max-w-md mx-auto aspect-[0.7/1] rounded-lg" />
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#0a0a0a]">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              {/* Tabs Skeleton */}
              <div className="flex justify-center mb-12">
                <Skeleton className="h-12 w-[500px] rounded-full" />
              </div>

              {/* Tab Content Skeleton - Experience */}
              <div className="space-y-12">
                {[1, 2, 3].map((i) => (
                  <ExperienceSkeleton key={i} />
                ))}
              </div>

              {/* Skills Skeleton (hidden but ready) */}
              <div className="hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <SkillSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#0e0e0e]">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Skeleton className="h-8 w-3/4 mx-auto mb-6" />
              <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-8" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Skeleton className="h-12 w-32 rounded-full" />
                <Skeleton className="h-12 w-32 rounded-full" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <PageSpecificWrapper pageType="resume">
      <div className="min-h-screen bg-[#0e0e0e] text-white">
        <Header />
        <main className="pt-24">
          {/* Resume content here */}
          {/* Hero Section */}
          <section className="pt-32 pb-20 relative overflow-hidden">
            <PageIllustration imageSrc="/skills-illustration-3d.png" altText="Resume" position="right" />

            <div className="container px-4 md:px-6 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-4"
                >
                  <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
                    Professional Background
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  Interactive <span className="text-[#ff4d4d]">Resume</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-white/70 text-lg mb-8"
                >
                  Explore my professional journey, skills, and qualifications in an interactive format.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative"
                >
                  <Button
                    className={`relative overflow-hidden rounded-full px-8 py-6 ${getButtonClass()}`}
                    onClick={handleDownload}
                    disabled={downloadState === "downloading"}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={downloadState}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center"
                      >
                        {getButtonContent()}
                      </motion.span>
                    </AnimatePresence>
                  </Button>

                  {/* Download progress indicator */}
                  {downloadState === "downloading" && (
                    <motion.div
                      className="absolute left-0 bottom-0 h-1 bg-white/30 w-full rounded-b-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: `${downloadProgress}%` }}
                        transition={{ ease: "easeInOut" }}
                      />
                    </motion.div>
                  )}

                  {/* Success animation */}
                  {downloadState === "success" && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.2, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4dff7c]/20 to-[#6bff9d]/20 rounded-full" />
                    </motion.div>
                  )}
                </motion.div>

                {/* CV Image Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-12 relative perspective"
                >
                  <div className="w-full max-w-md mx-auto relative">
                    <motion.div
                      className="rounded-lg shadow-xl border-2 border-[#ff4d4d] overflow-hidden"
                      whilehover={{
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(255, 77, 77, 0.2), 0 10px 10px -5px rgba(255, 77, 77, 0.1)",
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <img src="/cv-preview.jpeg" alt="CV Preview" className="w-full h-auto object-cover" />
                    </motion.div>
                  </div>

                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12 bg-[#ff4d4d]/10 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#ff4d4d]/10 rounded-full"
                    animate={{
                      y: [0, 10, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Resume Content Section */}
          <section ref={sectionRef} className="py-20 bg-[#0a0a0a] relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0e0e0e] to-transparent -z-10" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

            <div className="container px-4 md:px-6 relative z-10">
              <div className="max-w-5xl mx-auto">
                <Tabs defaultValue="experience" className="w-full" onValueChange={setActiveTab}>
                  <div className="flex justify-center mb-12 overflow-x-auto pb-2 no-scrollbar">
                    <TabsList className="bg-[#151515] p-1 rounded-full flex-nowrap">
                      <TabsTrigger
                        value="experience"
                        className={`rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === "experience" ? "bg-[#ff4d4d] text-white" : "text-white/70 hover:text-white"}`}
                      >
                        <Briefcase className="mr-1 sm:mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Experience</span>
                        <span className="sm:hidden">Exp</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="skills"
                        className={`rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === "skills" ? "bg-[#ff4d4d] text-white" : "text-white/70 hover:text-white"}`}
                      >
                        <Code className="mr-1 sm:mr-2 h-4 w-4" />
                        <span>Skills</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="education"
                        className={`rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === "education" ? "bg-[#ff4d4d] text-white" : "text-white/70 hover:text-white"}`}
                      >
                        <GraduationCap className="mr-1 sm:mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Education</span>
                        <span className="sm:hidden">Edu</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="certifications"
                        className={`rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === "certifications" ? "bg-[#ff4d4d] text-white" : "text-white/70 hover:text-white"}`}
                      >
                        <Award className="mr-1 sm:mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Certifications</span>
                        <span className="sm:hidden">Cert</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="experience" className="mt-0">
                    <div className="space-y-12">
                      {experiences.map((exp, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          className="relative pl-8 border-l-2 border-[#333]"
                        >
                          {/* Timeline dot */}
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#ff4d4d]" />

                          <div className="bg-[#151515] p-6 rounded-lg border border-[#333] hover:border-[#ff4d4d]/50 transition-colors duration-300">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                              <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                              <span className="text-[#ff4d4d] font-medium mt-1 md:mt-0">{exp.period}</span>
                            </div>
                            <p className="text-white/70 mb-2">{exp.company}</p>
                            <p className="text-white/80 mb-4">{exp.description}</p>

                            <h4 className="text-sm uppercase tracking-wider text-white/90 mb-2">Key Achievements:</h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start">
                                  <Star className="h-5 w-5 text-[#ff4d4d] mr-2 shrink-0 mt-0.5" />
                                  <span className="text-white/70">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          className="bg-[#151515] p-6 rounded-lg border border-[#333] hover:border-[#ff4d4d]/50 transition-colors duration-300"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">{skill.name}</h3>
                            <span className="text-[#ff4d4d] font-bold">{skill.level}%</span>
                          </div>
                          <Progress
                            value={skill.level}
                            className="h-2 bg-[#333]"
                            indicatorClassName="bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b]"
                          />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, amount: 0.2 }}
                      className="mt-12 bg-[#151515]/50 p-6 rounded-lg border border-[#333] text-center"
                    >
                      <p className="text-white/80">
                        In addition to these core skills, I have experience with various other technologies and
                        methodologies including Docker, Kubernetes, CI/CD pipelines, Agile development, and more.
                      </p>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="education" className="mt-0">
                    <div className="space-y-12">
                      {education.map((edu, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          className="relative pl-8 border-l-2 border-[#333]"
                        >
                          {/* Timeline dot */}
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#ff4d4d]" />

                          <div className="bg-[#151515] p-6 rounded-lg border border-[#333] hover:border-[#ff4d4d]/50 transition-colors duration-300">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                              <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                              <span className="text-[#ff4d4d] font-medium mt-1 md:mt-0">{edu.period}</span>
                            </div>
                            <p className="text-white/70 mb-2">{edu.institution}</p>
                            <p className="text-white/80 mb-4">{edu.description}</p>

                            <h4 className="text-sm uppercase tracking-wider text-white/90 mb-2">Highlights:</h4>
                            <ul className="space-y-2">
                              {edu.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start">
                                  <GraduationCap className="h-5 w-5 text-[#ff4d4d] mr-2 shrink-0 mt-0.5" />
                                  <span className="text-white/70">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="certifications" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {certifications.map((cert, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20, rotateY: 30 }}
                          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          className="bg-[#151515] p-6 rounded-lg border border-[#333] hover:border-[#ff4d4d]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#ff4d4d]/5"
                        >
                          <div className="flex items-start">
                            <Award className="h-10 w-10 text-[#ff4d4d] mr-4 shrink-0" />
                            <div>
                              <h3 className="text-lg font-bold text-white mb-1">{cert.name}</h3>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <p className="text-white/70">{cert.issuer}</p>
                                <span className="text-[#ff4d4d] text-sm font-medium mt-1 sm:mt-0">{cert.date}</span>
                              </div>
                              <p className="text-white/80">{cert.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 bg-[#0e0e0e] relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  Interested in working together?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="text-white/70 text-lg mb-8"
                >
                  Let's discuss how my skills and experience can help bring your project to life.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    className="bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-full px-8 py-6"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Contact Me
                  </Button>

                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6"
                    onClick={() => (window.location.href = "/projects")}
                  >
                    View Projects
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageSpecificWrapper>
  )
}
