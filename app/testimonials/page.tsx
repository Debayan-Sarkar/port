import TestimonialsPage from "./TestimonialsPage"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

export const metadata = {
  title: "Client Testimonials | JOMIEZ",
  description: "Read what our clients have to say about their experience working with JOMIEZ Technologies.",
}

export default function Page() {
  return (
    <PageSpecificWrapper pageType="about">
      <TestimonialsPage />
    </PageSpecificWrapper>
  )
}
