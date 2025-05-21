"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { createPortal } from "react-dom"

export type Project = {
  id: number
  title: string
  category: string
  image: string
  description: string
  technologies: string[]
  demoUrl?: string
  caseStudyUrl?: string
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [project])

  if (!project) return null

  // Use portal to render modal at the root level of the DOM
  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "auto",
          }}
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 0 }}
          transition={{ duration: 0.4, type: "spring", damping: 25 }}
          className="bg-gradient-to-br from-[#151515]/95 to-[#1a1a1a]/95 backdrop-blur-lg w-[90%] max-w-md rounded-2xl border border-white/10 shadow-2xl z-[10000]"
          style={{
            position: "fixed",
            zIndex: 10000,
            pointerEvents: "auto",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
              className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-md text-white hover:bg-[#ff4d4d] rounded-full w-8 h-8 flex items-center justify-center"
              onClick={onClose}
              whilehover={{
                scale: 1.1,
                rotate: 90,
                transition: { duration: 0.2 },
              }}
              whiletap={{ scale: 0.9 }}
            >
              <X className="h-4 w-4" />
            </motion.button>

            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative h-48"
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent rounded-t-2xl" />

              {/* Category badge */}
              <div className="absolute top-4 left-4 bg-[#ff4d4d] text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {project.category}
              </div>
            </motion.div>

            <div className="p-5">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
              >
                {project.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-white/70 mb-4 text-sm leading-relaxed line-clamp-3"
              >
                {project.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mb-4"
              >
                <h3 className="text-sm font-semibold mb-2 text-white/90">Technologies</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05, duration: 0.2 }}
                      className="bg-white/10 backdrop-blur-md text-white/80 px-2 py-0.5 text-xs rounded-full border border-white/5"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 5 && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.2 }}
                      className="bg-white/10 backdrop-blur-md text-white/80 px-2 py-0.5 text-xs rounded-full border border-white/5"
                    >
                      +{project.technologies.length - 5} more
                    </motion.span>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="flex gap-3"
              >
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button
                      className="w-full bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-full overflow-hidden relative text-sm py-1.5 h-auto"
                      whilehover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      whiletap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center justify-center">
                        Live Preview
                        <ExternalLink className="ml-1.5 h-3 w-3" />
                      </span>
                    </Button>
                  </a>
                )}

                {project.caseStudyUrl &&
                  (project.caseStudyUrl.startsWith("http") ? (
                    <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10 rounded-full text-sm py-1.5 h-auto"
                        whilehover={{
                          scale: 1.05,
                          transition: { duration: 0.2 },
                        }}
                        whiletap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center justify-center">
                          Case Study
                          <ArrowRight className="ml-1.5 h-3 w-3" />
                        </span>
                      </Button>
                    </a>
                  ) : (
                    <Link href={project.caseStudyUrl} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10 rounded-full text-sm py-1.5 h-auto"
                        whilehover={{
                          scale: 1.05,
                          transition: { duration: 0.2 },
                        }}
                        whiletap={{ scale: 0.98 }}
                        onClick={onClose}
                      >
                        <span className="flex items-center justify-center">
                          Case Study
                          <ArrowRight className="ml-1.5 h-3 w-3" />
                        </span>
                      </Button>
                    </Link>
                  ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body,
  )
}
