import type { Metadata } from "next"
import JoinOurTeamClient from "./JoinOurTeamClient"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

export const metadata: Metadata = {
  title: "Join Our Team | Modern Portfolio",
  description: "Apply to join our talented team of professionals. Submit your resume and application today.",
}

export default function JoinOurTeamPage() {
  return (
    <PageSpecificWrapper pageType="team">
      <JoinOurTeamClient />
    </PageSpecificWrapper>
  )
}
