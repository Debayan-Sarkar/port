"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import PageSpecificWrapper from "@/components/page-specific-wrapper"
import PageIllustration from "@/components/page-illustration"
import ContactSection from "@/components/contact-section"
import { useEffect } from "react"

export default function ContactPageClient() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <PageSpecificWrapper pageType="contact">
      <div className="min-h-screen bg-[#0e0e0e] text-white">
        <Header />
        <main className="pt-24">
          <PageIllustration
            title="Contact Us"
            description="Get in touch with our team for inquiries and project discussions"
            imageSrc="/contact-illustration-3d.png"
          />
          <ContactSection fullPage={true} />
        </main>
        <Footer />
      </div>
    </PageSpecificWrapper>
  )
}
