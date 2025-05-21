"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export default function TechnologiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Define your technology categories and items
  const technologies = [
    {
      category: "Frontend",
      items: [
        { name: "React", icon: "/tech/react.svg" },
        { name: "Next.js", icon: "/tech/nextjs.svg" },
        { name: "TypeScript", icon: "/tech/typescript.svg" },
        { name: "Tailwind CSS", icon: "/tech/tailwind.svg" },
        { name: "Framer Motion", icon: "/tech/framer.svg" },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: "/tech/nodejs.svg" },
        { name: "Express", icon: "/tech/express.svg" },
        { name: "Python", icon: "/tech/python.svg" },
        { name: "Django", icon: "/tech/django.svg" },
        { name: "GraphQL", icon: "/tech/graphql.svg" },
      ],
    },
    {
      category: "Database",
      items: [
        { name: "MongoDB", icon: "/tech/mongodb.svg" },
        { name: "PostgreSQL", icon: "/tech/postgresql.svg" },
        { name: "Redis", icon: "/tech/redis.svg" },
        { name: "Supabase", icon: "/tech/supabase.svg" },
        { name: "Firebase", icon: "/tech/firebase.svg" },
      ],
    },
    {
      category: "DevOps",
      items: [
        { name: "Docker", icon: "/tech/docker.svg" },
        { name: "AWS", icon: "/tech/aws.svg" },
        { name: "Vercel", icon: "/tech/vercel.svg" },
        { name: "GitHub Actions", icon: "/tech/github.svg" },
        { name: "Kubernetes", icon: "/tech/kubernetes.svg" },
      ],
    },
    {
      category: "AI & ML",
      items: [
        { name: "TensorFlow", icon: "/tensorflow-abstract.png" },
        { name: "PyTorch", icon: "/pytorch-abstract.png" },
        { name: "Hugging Face", icon: "/hugging-face-community.png" },
        { name: "OpenAI API", icon: "/abstract-neural-network.png" },
        { name: "LangChain", icon: "/abstract-chains.png" },
      ],
    },
    {
      category: "Web3",
      items: [
        { name: "Ethereum", icon: "/placeholder.svg?height=48&width=48&query=Ethereum Logo" },
        { name: "Solidity", icon: "/placeholder.svg?height=48&width=48&query=Solidity Logo" },
        { name: "Web3.js", icon: "/placeholder.svg?height=48&width=48&query=Web3.js Logo" },
        { name: "IPFS", icon: "/placeholder.svg?height=48&width=48&query=IPFS Logo" },
        { name: "Hardhat", icon: "/placeholder.svg?height=48&width=48&query=Hardhat Logo" },
      ],
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

      <motion.div style={{ y, opacity }} className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
            Our Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4">Cutting-Edge Tech Stack</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            We leverage the latest technologies to build powerful, scalable, and future-proof digital solutions that
            keep you ahead of the competition.
          </p>
        </motion.div>

        <div className="space-y-16">
          {technologies.map((tech, categoryIndex) => (
            <div key={categoryIndex}>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold mb-8 flex items-center"
              >
                <span className="text-[#ff4d4d] mr-2">//</span> {tech.category}
              </motion.h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {tech.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: itemIndex * 0.1,
                      type: "spring",
                      stiffness: 50,
                    }}
                  >
                    <motion.div
                      whilehover={{ y: -8, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="bg-[#151515] p-6 rounded-lg flex flex-col items-center justify-center h-full text-center transform-gpu"
                    >
                      <div className="relative w-12 h-12 mb-4">
                        <Image
                          src={item.icon || `/placeholder.svg?height=48&width=48&query=${item.name} Logo`}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-sm font-medium text-white/80">{item.name}</p>

                      <motion.div
                        className="w-0 h-0.5 bg-[#ff4d4d] mt-3"
                        whilehover={{ width: "50%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
