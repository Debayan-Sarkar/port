"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import PageSpecificWrapper from "@/components/page-specific-wrapper"
import AboutContent from "@/components/about-content"
import TimelineSection from "@/components/timeline-section"
import AboutIllustration from "@/components/about-illustration"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function AboutPageClient() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0e0e0e] text-white">
        <Header />
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <div className="text-center lg:text-left">
                  <Skeleton className="h-4 w-32 mb-4 mx-auto lg:mx-0" />
                  <Skeleton className="h-12 w-full mb-6" />
                  <Skeleton className="h-20 w-full max-w-2xl mx-auto lg:mx-0" />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <Skeleton className="h-[400px] w-full rounded-xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <Skeleton className="aspect-square max-w-md mx-auto md:mx-0 rounded-lg" />
              </div>

              <div className="md:w-1/2 space-y-6">
                <Skeleton className="h-8 w-64 mb-6" />
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <PageSpecificWrapper pageType="about">
      <div className="min-h-screen bg-[#0e0e0e] text-white">
        <Header />
        <main className="pt-24">
          <section className="pt-32 pb-20 relative overflow-hidden">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
                <div className="w-full lg:w-1/2">
                  <div className="text-center lg:text-left">
                    <span className="inline-block text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium mb-4">
                      About Us
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                      Learn about our <span className="text-[#ff4d4d]">company</span>
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto lg:mx-0">
                      Discover our mission, our team of experts, and how we can help bring your digital vision to life.
                    </p>
                  </div>
                </div>
                <AboutIllustration />
              </div>
            </div>
          </section>
          <AboutContent />
          <TimelineSection />
        </main>
        <Footer />
      </div>
    </PageSpecificWrapper>
  )
}
