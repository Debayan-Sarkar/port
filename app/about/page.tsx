import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

export const metadata: Metadata = {
  title: "About Us | RCode Technologies",
  description: "Learn about our company, our mission, and our team of experts",
}

export default function AboutPage() {
  return (
    <PageSpecificWrapper pageType="about">
      <AboutPageClient />
    </PageSpecificWrapper>
  )
}
