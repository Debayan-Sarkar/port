"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.6, 1, 1, 0.6])

  const team = [
    {
      name: "Templeton DC",
      position: "CEO & Founder",
      image: "/team-member-4.jpg",
      slug: "templeton-dc",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        instagram: "#",
      },
    },
    {
      name: "Ruler Johnson",
      position: "Lead Developer",
      image: "/team-member-lead-dev.jpg",
      slug: "ruler-johnson",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        instagram: "#",
      },
    },
    {
      name: "Milo Alex",
      position: "UI/UX Designer",
      image: "/team-member-ux-designer.jpg",
      slug: "milo-alex",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        instagram: "#",
      },
    },
    {
      name: "Young Josh",
      position: "Project Manager",
      image: "/founder-image.jpg",
      slug: "young-josh",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        instagram: "#",
      },
    },
  ]

  return (
    <section id="team" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0a0a0a] to-transparent -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

      <motion.div style={{ y, opacity }} className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            viewport={{ once: true, amount: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
              Our Team
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Meet Our{" "}
            <span className="text-[#ff4d4d] relative inline-block">
              Expert
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
            Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-white/70 text-lg"
          >
            Our talented team of professionals brings diverse expertise and experience to every project, ensuring
            exceptional results for our clients.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 90, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="group"
            >
              <Link href={`/team/${member.slug}`} className="block">
                <div className="relative overflow-hidden rounded-lg bg-[#151515] border border-white/10 shadow-md transition-all duration-300 hover:shadow-[#ff4d4d]/20 hover:border-[#ff4d4d]/20">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Social icons */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-white/10 backdrop-blur-md text-white hover:bg-[#ff4d4d] hover:text-white rounded-full h-8 w-8"
                          asChild
                        >
                          <Link href={member.social.linkedin}>
                            <Linkedin className="h-4 w-4" />
                            <span className="sr-only">LinkedIn</span>
                          </Link>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-white/10 backdrop-blur-md text-white hover:bg-[#ff4d4d] hover:text-white rounded-full h-8 w-8"
                          asChild
                        >
                          <Link href={member.social.twitter}>
                            <Twitter className="h-4 w-4" />
                            <span className="sr-only">Twitter</span>
                          </Link>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-white/10 backdrop-blur-md text-white hover:bg-[#ff4d4d] hover:text-white rounded-full h-8 w-8"
                          asChild
                        >
                          <Link href={member.social.github}>
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                          </Link>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-white/10 backdrop-blur-md text-white hover:bg-[#ff4d4d] hover:text-white rounded-full h-8 w-8"
                          asChild
                        >
                          <Link href={member.social.instagram}>
                            <Instagram className="h-4 w-4" />
                            <span className="sr-only">Instagram</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-[#151515]">
                    <h3 className="text-lg font-bold group-hover:text-[#ff4d4d] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-[#ff4d4d] text-sm mt-1 group-hover:text-white/80 transition-colors duration-300">
                      {member.position}
                    </p>
                    <div className="mt-2 text-xs text-white/60">View Profile</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
