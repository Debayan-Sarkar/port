"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import PageSpecificWrapper from "@/components/page-specific-wrapper"
import PageIllustration from "@/components/page-illustration"
import ServicesSection from "@/components/services-section"
import { useEffect } from "react"

export default function ServicesPageClient() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <PageSpecificWrapper pageType="services">
      <div className="min-h-screen bg-[#0e0e0e] text-white">
        <Header />
        <main className="pt-24">
          <PageIllustration
            title="Our Services"
            description="Explore our comprehensive range of digital services and solutions"
            imageSrc="/services-illustration-3d.png"
          />
          <ServicesSection showAll={true} />
        </main>
        <Footer />
      </div>
    </PageSpecificWrapper>
  )
}
