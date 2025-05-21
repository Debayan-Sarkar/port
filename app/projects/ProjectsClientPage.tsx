"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import PageSpecificWrapper from "@/components/page-specific-wrapper"
import PageIllustration from "@/components/page-illustration"
import ProjectsSection from "@/components/projects-section"
import { useEffect } from "react"

export default function ProjectsClientPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <PageSpecificWrapper pageType="projects">
      <div className="min-h-screen bg-[#0e0e0e] text-white">
        <Header />
        <main className="pt-24">
          <PageIllustration
            title="Our Projects"
            description="View our portfolio of successful projects and case studies"
            imageSrc="/projects-illustration-3d.png"
          />
          <ProjectsSection showAll={true} />
        </main>
        <Footer />
      </div>
    </PageSpecificWrapper>
  )
}
