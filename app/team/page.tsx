import type { Metadata } from "next"
import TeamClientPage from "./TeamClientPage"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

export const metadata: Metadata = {
  title: "Our Team | RCode Technologies",
  description: "Meet our talented team of professionals and experts",
}

export default function TeamPage() {
  return (
    <PageSpecificWrapper pageType="team">
      <TeamClientPage />
    </PageSpecificWrapper>
  )
}
