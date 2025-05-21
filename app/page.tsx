import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ExperienceSection from "@/components/experience-section"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import TeamSection from "@/components/team-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import StatsSection from "@/components/stats-section"
import ClientsSection from "@/components/clients-section"
import BlogSection from "@/components/blog-section"
import FaqSection from "@/components/faq-section"
import TechnologiesSection from "@/components/technologies-section"
import PageSpecificWrapper from "@/components/page-specific-wrapper"
import PricingSection from "@/components/pricing-section"

export const metadata: Metadata = {
  title: "Modern Developer Portfolio",
  description: "A modern portfolio showcasing development skills and projects",
}

export default function Home() {
  return (
    <PageSpecificWrapper pageType="home">
      <main className="min-h-screen bg-[#0e0e0e] text-white overflow-hidden">
        <Header />
        <HeroSection />
        <ClientsSection />
        <AboutSection />
        <StatsSection />
        <SkillsSection />
        <ServicesSection />
        <TechnologiesSection />
        <ExperienceSection />
        <ProjectsSection />
        <TeamSection />
        <TestimonialsSection />
        <BlogSection />
        <FaqSection />
        <PricingSection />
        <ContactSection />
        <Footer />
      </main>
    </PageSpecificWrapper>
  )
}
