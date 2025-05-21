"use client"

import type React from "react"

import { usePageLoading } from "./page-loading-provider"
import { motion, AnimatePresence } from "framer-motion"
import {
  AboutPageSkeleton,
  ServicesPageSkeleton,
  ProjectsPageSkeleton,
  TeamPageSkeleton,
  ContactPageSkeleton,
  BlogPageSkeleton,
  BlogPostSingleSkeleton,
  ResumePageSkeleton,
} from "./page-skeletons"

type PageType = "about" | "services" | "projects" | "team" | "contact" | "blog" | "blogPost" | "resume"

export default function PageSpecificWrapper({
  children,
  pageType,
}: {
  children: React.ReactNode
  pageType: PageType
}) {
  const { isLoading } = usePageLoading()

  const getSkeletonComponent = () => {
    switch (pageType) {
      case "about":
        return <AboutPageSkeleton />
      case "services":
        return <ServicesPageSkeleton />
      case "projects":
        return <ProjectsPageSkeleton />
      case "team":
        return <TeamPageSkeleton />
      case "contact":
        return <ContactPageSkeleton />
      case "blog":
        return <BlogPageSkeleton />
      case "blogPost":
        return <BlogPostSingleSkeleton />
      case "resume":
        return <ResumePageSkeleton />
      default:
        return <AboutPageSkeleton />
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {getSkeletonComponent()}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
