import type { Metadata } from "next"
import ServicesPageClient from "./ServicesPageClient"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

export const metadata: Metadata = {
  title: "Services | RCode Technologies",
  description: "Explore our comprehensive range of digital services and solutions",
}

export default function ServicesPage() {
  return (
    <PageSpecificWrapper pageType="services">
      <ServicesPageClient />
    </PageSpecificWrapper>
  )
}
