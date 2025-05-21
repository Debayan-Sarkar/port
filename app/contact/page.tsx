import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

export const metadata: Metadata = {
  title: "Contact Us | RCode Technologies",
  description: "Get in touch with our team for inquiries and project discussions",
}

export default function ContactPage() {
  return (
    <PageSpecificWrapper pageType="contact">
      <ContactPageClient />
    </PageSpecificWrapper>
  )
}
