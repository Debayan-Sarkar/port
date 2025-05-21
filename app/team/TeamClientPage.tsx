"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import TeamSection from "@/components/team-section"
import PageIllustration from "@/components/page-illustration"
import { useEffect } from "react"
import CompanyInstagramFeed from "@/components/company-instagram-feed"

export default function TeamClientPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <Header />
      <main className="pt-24">
        <PageIllustration
          title="Our Team"
          description="Meet our talented team of professionals and experts"
          imageSrc="/team-illustration-3d.png"
        />
        <TeamSection showAll={true} />

        {/* Company Instagram Feed Section */}
        <section className="py-16 bg-[#0a0a0a]">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Follow Our Journey</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Stay updated with our latest projects, team events, and behind-the-scenes moments on Instagram.
              </p>
            </div>
            <CompanyInstagramFeed />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
