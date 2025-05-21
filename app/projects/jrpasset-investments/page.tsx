import type { Metadata } from "next"
import JRPassetInvestmentsDetail from "./JRPassetInvestmentsDetail"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

export const metadata: Metadata = {
  title: "JRPasset Investments | RCode Technologies",
  description: "Cryptocurrency and Gold Investment Platform - Portfolio Case Study",
}

export default function JRPassetInvestmentsPage() {
  return (
    <PageSpecificWrapper pageType="projects">
      <JRPassetInvestmentsDetail />
    </PageSpecificWrapper>
  )
}
