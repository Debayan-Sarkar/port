import type { Metadata } from "next"
import LearnMoreClient from "./LearnMoreClient"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

export const metadata: Metadata = {
  title: "Learn More | RCode Technologies",
  description: "Discover more about our services, technologies, and approach",
}

export default function LearnMorePage() {
  return (
    <PageSpecificWrapper pageType="about">
      <LearnMoreClient />
    </PageSpecificWrapper>
  )
}
