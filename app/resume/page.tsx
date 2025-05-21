import type { Metadata } from "next"
import ResumePageClient from "./ResumePageClient"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

export const metadata: Metadata = {
  title: "Resume | Modern Developer Portfolio",
  description: "View my professional experience, skills, education, and certifications.",
}

export default function ResumePage() {
  return (
    <PageSpecificWrapper pageType="resume">
      <ResumePageClient />
    </PageSpecificWrapper>
  )
}
