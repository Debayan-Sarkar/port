import type { Metadata } from "next"
import BlockchainDemo from "@/components/blockchain-demo"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

export const metadata: Metadata = {
  title: "Blockchain Demo | RCode Technologies",
  description: "Interactive blockchain technology demonstration",
}

export default function BlockchainPage() {
  return (
    <PageSpecificWrapper pageType="projects">
      <BlockchainDemo />
    </PageSpecificWrapper>
  )
}
